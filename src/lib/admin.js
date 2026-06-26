import { supabase } from './supabase';

/**
 * Admin data layer (verification side).
 *
 * Powers the Admin dashboard: the application queue, the review screen, and
 * the approve / request-changes / reject decisions that flip a teacher's
 * `verified` flag. All calls run as the signed-in admin and rely on the RLS
 * + is_admin() helper from supabase/trust-engine.sql.
 */

export const APPLICATION_STATUSES = [
  'submitted',
  'in_review',
  'changes_requested',
  'approved',
  'rejected',
];

export const RUBRIC_CRITERIA = [
  { key: 'language', label: 'Language proficiency' },
  { key: 'professionalism', label: 'Professionalism' },
  { key: 'safety', label: 'Safety & trust' },
  { key: 'portfolio', label: 'Portfolio quality' },
  { key: 'uniqueness', label: 'Uniqueness / culture' },
];

export const TIERS = [
  { value: 'verified', label: 'Verified', emoji: '🟢' },
  { value: 'pro', label: 'Pro', emoji: '🔵' },
  { value: 'elite', label: 'Top Tongue (Elite)', emoji: '🟣' },
];

/** Rejection / changes templates so admins decide fast and consistently. */
export const DECISION_TEMPLATES = {
  rejected: [
    'We could not verify your identity from the documents provided.',
    'Language proficiency did not meet our bar for this language.',
    'The intro video was missing or did not clearly show you teaching.',
    'Portfolio did not demonstrate enough relevant teaching experience.',
  ],
  changes_requested: [
    'Please re-upload a clearer copy of your government ID.',
    'Please add a 30-60s intro video introducing yourself.',
    'Please expand your bio to better describe your teaching style.',
    'Please add at least one teaching certificate or portfolio sample.',
  ],
};

/** Queue: list applications, optionally filtered by status. */
export async function listApplications({ status } = {}) {
  let query = supabase
    .from('teacher_applications')
    .select('*, profile:profiles!teacher_applications_user_id_fkey(name, email, photo)')
    .order('submitted_at', { ascending: true, nullsFirst: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  } else {
    query = query.in('status', APPLICATION_STATUSES);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/** Full application + its documents for the review screen. */
export async function getApplicationDetail(id) {
  const { data: application, error } = await supabase
    .from('teacher_applications')
    .select('*, profile:profiles!teacher_applications_user_id_fkey(name, email, photo)')
    .eq('id', id)
    .single();
  if (error) throw error;

  const { data: documents, error: docErr } = await supabase
    .from('teacher_documents')
    .select('*')
    .eq('application_id', id)
    .order('created_at', { ascending: true });
  if (docErr) throw docErr;

  return { application, documents: documents || [] };
}

/** Lightweight ops stats for the dashboard header. */
export async function getAdminStats() {
  const { data, error } = await supabase
    .from('teacher_applications')
    .select('status');
  if (error) throw error;

  const counts = { submitted: 0, in_review: 0, changes_requested: 0, approved: 0, rejected: 0 };
  (data || []).forEach((r) => {
    if (counts[r.status] !== undefined) counts[r.status] += 1;
  });
  counts.pendingReview = counts.submitted + counts.in_review;
  counts.total = (data || []).length;
  return counts;
}

async function logAudit(adminId, action, targetType, targetId, detail = {}) {
  // Best-effort; never block a decision on the audit insert.
  try {
    await supabase.from('admin_audit_log').insert({
      admin_id: adminId,
      action,
      target_type: targetType,
      target_id: targetId,
      detail,
    });
  } catch (e) {
    console.error('audit log failed', e);
  }
}

/** Claim an application for review (submitted -> in_review). */
export async function startReview(application, adminId) {
  const { data, error } = await supabase
    .from('teacher_applications')
    .update({ status: 'in_review', reviewed_by: adminId })
    .eq('id', application.id)
    .select()
    .single();
  if (error) throw error;
  await logAudit(adminId, 'start_review', 'application', application.id);
  return data;
}

/**
 * APPROVE: flip the teacher to verified + active, set tier, and stamp the
 * application. Upserts the teachers row in case onboarding already created it.
 */
export async function approveApplication(application, { adminId, tier, rubricScores, adminNotes }) {
  const now = new Date().toISOString();

  const { error: appErr } = await supabase
    .from('teacher_applications')
    .update({
      status: 'approved',
      tier,
      rubric_scores: rubricScores || {},
      admin_notes: adminNotes || null,
      reviewed_by: adminId,
      reviewed_at: now,
    })
    .eq('id', application.id);
  if (appErr) throw appErr;

  // Ensure the public teacher record exists and is now live.
  const { data: existingTeacher } = await supabase
    .from('teachers')
    .select('id')
    .eq('user_id', application.user_id)
    .maybeSingle();

  const teacherPayload = {
    user_id: application.user_id,
    name: application.display_name,
    bio: application.bio,
    tagline: application.headline,
    languages: application.languages || [],
    specialties: application.experience_types || [],
    verified: true,
    verification_date: now,
    status: 'active',
    tier,
    application_id: application.id,
  };

  if (existingTeacher) {
    const { error } = await supabase
      .from('teachers')
      .update(teacherPayload)
      .eq('id', existingTeacher.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('teachers').insert(teacherPayload);
    if (error) throw error;
  }

  // Make sure the profile is flagged as a teacher.
  await supabase
    .from('profiles')
    .update({ role: 'teacher', is_teacher: true })
    .eq('id', application.user_id);

  await logAudit(adminId, 'approve_application', 'application', application.id, { tier });
}

/** REJECT with a reason shown to the applicant. */
export async function rejectApplication(application, { adminId, reason, adminNotes }) {
  const { error } = await supabase
    .from('teacher_applications')
    .update({
      status: 'rejected',
      decision_reason: reason,
      admin_notes: adminNotes || null,
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', application.id);
  if (error) throw error;
  await logAudit(adminId, 'reject_application', 'application', application.id, { reason });
}

/** REQUEST CHANGES — sends it back to the applicant to edit and resubmit. */
export async function requestChanges(application, { adminId, reason, adminNotes }) {
  const { error } = await supabase
    .from('teacher_applications')
    .update({
      status: 'changes_requested',
      decision_reason: reason,
      admin_notes: adminNotes || null,
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', application.id);
  if (error) throw error;
  await logAudit(adminId, 'request_changes', 'application', application.id, { reason });
}
