import { supabase } from './supabase';

/**
 * Teacher Application data layer (applicant side).
 *
 * A teacher's path to going live:
 *   draft -> submitted -> in_review -> approved | changes_requested | rejected
 *
 * Backed by the `teacher_applications` + `teacher_documents` tables and the
 * `verification-docs` / `teacher-portfolio` storage buckets created in
 * supabase/trust-engine.sql.
 */

// Fields the applicant fills in. Used for the completeness meter.
export const REQUIRED_FIELDS = [
  'display_name',
  'headline',
  'bio',
  'languages',
  'experience_types',
];

export const PORTFOLIO_REQUIREMENTS = [
  { docType: 'intro_video', label: 'Intro video', required: true },
  { docType: 'id', label: 'Government ID', required: true },
  { docType: 'certification', label: 'Teaching certificate', required: false },
  { docType: 'portfolio_image', label: 'Portfolio photos', required: false },
];

/** Get the signed-in user's application (or null). */
export async function getMyApplication(userId) {
  const { data, error } = await supabase
    .from('teacher_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Get an existing draft/changes_requested application or create a fresh draft. */
export async function getOrCreateDraft(userId, initial = {}) {
  const existing = await getMyApplication(userId);
  if (existing && existing.status !== 'rejected') return existing;

  const { data, error } = await supabase
    .from('teacher_applications')
    .insert({ user_id: userId, status: 'draft', ...initial })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Patch application fields (only allowed while draft/changes_requested via RLS). */
export async function updateApplication(id, updates) {
  const { data, error } = await supabase
    .from('teacher_applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Submit the application for admin review. */
export async function submitApplication(id) {
  const { data, error } = await supabase
    .from('teacher_applications')
    .update({ status: 'submitted', submitted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** List a user's uploaded documents for an application. */
export async function getDocuments(applicationId) {
  const { data, error } = await supabase
    .from('teacher_documents')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return Promise.all((data || []).map(async (document) => {
    const bucket = document.doc_type === 'id' ? 'verification-docs' : 'teacher-portfolio';
    const { data: signed, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(document.object_path, 60 * 10);
    if (signedError) throw signedError;
    return { ...document, url: signed.signedUrl };
  }));
}

/**
 * Upload a portfolio/verification file to private storage and record it.
 * ID documents go to the sensitive `verification-docs` bucket; everything
 * else to `teacher-portfolio`. Path is namespaced by user id so RLS lets only
 * the owner (and admins) read it.
 */
export async function uploadDocument({ userId, applicationId, docType, file, label }) {
  const bucket = docType === 'id' ? 'verification-docs' : 'teacher-portfolio';
  const ext = file.name?.split('.').pop() || 'bin';
  const path = `${userId}/${applicationId}/${docType}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from('teacher_documents')
    .insert({
      application_id: applicationId,
      user_id: userId,
      doc_type: docType,
      label: label || docType,
      object_path: path,
    })
    .select()
    .single();
  if (error) throw error;
  const { data: signed, error: signedError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 10);
  if (signedError) throw signedError;
  return { ...data, url: signed.signedUrl };
}

/** 0-100 completeness score for the meter / "ready to submit" gating. */
export function computeCompleteness(application, documents = []) {
  if (!application) return 0;
  const fieldChecks = REQUIRED_FIELDS.map((f) => {
    const v = application[f];
    return Array.isArray(v) ? v.length > 0 : Boolean(v);
  });
  const docTypes = new Set(documents.map((d) => d.doc_type));
  const docChecks = PORTFOLIO_REQUIREMENTS.filter((r) => r.required).map((r) =>
    docTypes.has(r.docType)
  );
  const consentChecks = [
    application.agreed_to_standards,
    application.background_check_consent,
  ];

  const all = [...fieldChecks, ...docChecks, ...consentChecks];
  const done = all.filter(Boolean).length;
  return Math.round((done / all.length) * 100);
}
