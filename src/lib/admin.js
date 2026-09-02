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

  const { data: review, error: reviewErr } = await supabase
    .schema('api')
    .from('teacher_application_reviews')
    .select('*')
    .eq('application_id', id)
    .maybeSingle();
  if (reviewErr) throw reviewErr;

  const signedDocuments = await Promise.all((documents || []).map(async (document) => {
    const bucket = document.doc_type === 'id' ? 'verification-docs' : 'teacher-portfolio';
    const { data: signed, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(document.object_path, 60 * 10);
    if (signedError) throw signedError;
    return { ...document, url: signed.signedUrl };
  }));

  return { application: { ...application, ...(review || {}) }, documents: signedDocuments };
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

async function saveReview(applicationId, review) {
  const table = supabase.schema('api').from('teacher_application_reviews');
  const { data: existing, error: readError } = await table
    .select('application_id')
    .eq('application_id', applicationId)
    .maybeSingle();
  if (readError) throw readError;
  const request = existing
    ? table.update(review).eq('application_id', applicationId)
    : table.insert({ application_id: applicationId, ...review });
  const { data, error } = await request.select().single();
  if (error) throw error;
  return data;
}

/** Claim an application for review (submitted -> in_review). */
export async function startReview(application, adminId) {
  await saveReview(application.id, { reviewed_by: adminId, reviewed_at: new Date().toISOString() });
  const { data, error } = await supabase
    .from('teacher_applications')
    .update({ status: 'in_review' })
    .eq('id', application.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * APPROVE: flip the teacher to verified + active, set tier, and stamp the
 * application. Upserts the teachers row in case onboarding already created it.
 */
export async function approveApplication(application, { adminId, tier, rubricScores, adminNotes }) {
  const now = new Date().toISOString();

  await saveReview(application.id, {
    tier,
    rubric_scores: rubricScores || {},
    admin_notes: adminNotes || null,
    decision_reason: null,
    reviewed_by: adminId,
    reviewed_at: now,
  });

  const { error: appErr } = await supabase
    .from('teacher_applications')
    .update({ status: 'approved' })
    .eq('id', application.id);
  if (appErr) throw appErr;
}

/** REJECT with a reason shown to the applicant. */
export async function rejectApplication(application, { adminId, reason, adminNotes }) {
  await saveReview(application.id, {
    admin_notes: adminNotes || null,
    decision_reason: reason,
    reviewed_by: adminId,
    reviewed_at: new Date().toISOString(),
  });
  const { error } = await supabase
    .from('teacher_applications')
    .update({ status: 'rejected' })
    .eq('id', application.id);
  if (error) throw error;
}

/** REQUEST CHANGES — sends it back to the applicant to edit and resubmit. */
export async function requestChanges(application, { adminId, reason, adminNotes }) {
  await saveReview(application.id, {
    admin_notes: adminNotes || null,
    decision_reason: reason,
    reviewed_by: adminId,
    reviewed_at: new Date().toISOString(),
  });
  const { error } = await supabase
    .from('teacher_applications')
    .update({ status: 'changes_requested' })
    .eq('id', application.id);
  if (error) throw error;
}

/**
 * Platform admin layer (merged from claude/phase-a-tasks-tzg5ub, adapted to
 * the trust-engine role model: admins = profiles.role = 'admin', audit log =
 * admin_audit_log). Backed by the admin policies in supabase/admin-panel.sql.
 */

export const ADMIN_PAGE_SIZE = 20;

/** Platform overview stats. Client-side counts (the old RPC is not shipped). */
export async function getPlatformStats() {
  const [usersRes, expRes, bookRes, revenueRes] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('experiences').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('total_price'),
  ]);
  const totalRevenue = (revenueRes.data || []).reduce(
    (sum, b) => sum + (Number(b.total_price) || 0),
    0
  );
  return {
    data: {
      totalUsers: usersRes.count ?? 0,
      totalExperiences: expRes.count ?? 0,
      totalBookings: bookRes.count ?? 0,
      totalRevenue,
    },
    error: usersRes.error || expRes.error || bookRes.error || revenueRes.error || null,
  };
}

export async function getAllUsers(page = 1, limit = ADMIN_PAGE_SIZE, search = '') {
  const from = (page - 1) * limit;
  let q = supabase
    .from('profiles')
    .select('id, name, email, photo, is_admin:role, is_teacher, points, created_at', {
      count: 'exact',
    })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
  const safe = search.trim().replace(/[%_(),]/g, '');
  if (safe) {
    q = q.or(`name.ilike.%${safe}%,email.ilike.%${safe}%`);
  }
  return q;
}

export async function updateUserAdminFlag(userId, isAdmin) {
  const result = await supabase
    .from('profiles')
    .update({ role: isAdmin ? 'admin' : 'student' })
    .eq('id', userId)
    .select()
    .single();
  if (!result.error) {
    const { data: authData } = await supabase.auth.getUser();
    await supabase.from('admin_audit_log').insert({
      admin_id: authData?.user?.id ?? null,
      action: isAdmin ? 'promote_admin' : 'demote_admin',
      target_type: 'user',
      target_id: userId,
      detail: { role: isAdmin ? 'admin' : 'student' },
    });
  }
  return result;
}

const EXPERIENCE_SORT_COLS = ['created_at', 'date', 'price', 'title'];

export async function getAllExperiences(page = 1, limit = ADMIN_PAGE_SIZE, opts = {}) {
  const { search = '', status = '', sortBy = 'created_at', asc = false } = opts;
  const from = (page - 1) * limit;
  const sortCol = EXPERIENCE_SORT_COLS.includes(sortBy) ? sortBy : 'created_at';
  let q = supabase
    .from('experiences')
    .select(
      `id, title, language, city, status, price, date, created_at,
       teacher:teachers(name)`,
      { count: 'exact' }
    )
    .order(sortCol, { ascending: asc })
    .range(from, from + limit - 1);
  if (status) q = q.eq('status', status);
  const safe = search.trim().replace(/[%_(),]/g, '');
  if (safe) q = q.or(`title.ilike.%${safe}%,city.ilike.%${safe}%`);
  return q;
}

export async function updateExperienceStatus(id, status) {
  return supabase
    .from('experiences')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
}

export async function bulkUpdateExperienceStatus(ids, status) {
  return supabase.from('experiences').update({ status }).in('id', ids).select('id');
}

const BOOKING_SORT_COLS = ['booking_date', 'total_price', 'status'];

export async function getAllBookings(page = 1, limit = ADMIN_PAGE_SIZE, opts = {}) {
  const { status = '', sortBy = 'booking_date', asc = false } = opts;
  const from = (page - 1) * limit;
  const sortCol = BOOKING_SORT_COLS.includes(sortBy) ? sortBy : 'booking_date';
  let q = supabase
    .from('bookings')
    .select(
      `id, total_price, status, payment_status, booking_date,
       student:profiles(name, email),
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .order(sortCol, { ascending: asc })
    .range(from, from + limit - 1);
  if (status) q = q.eq('status', status);
  return q;
}

export async function deleteBooking(id) {
  return supabase.from('bookings').delete().eq('id', id).select('id');
}

export async function updateBookingStatus(id, status) {
  return supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
}

export async function bulkDeleteBookings(ids) {
  return supabase.from('bookings').delete().in('id', ids).select('id');
}

export async function getPendingBookingsCount() {
  const { count, error } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');
  return { count: count ?? 0, error };
}

const REVIEW_SORT_COLS = ['created_at', 'rating'];

export async function getAllReviews(page = 1, limit = ADMIN_PAGE_SIZE, opts = {}) {
  const { search = '', sortBy = 'created_at', asc = false } = opts;
  const from = (page - 1) * limit;
  const sortCol = REVIEW_SORT_COLS.includes(sortBy) ? sortBy : 'created_at';
  let q = supabase
    .from('reviews')
    .select(
      `id, rating, comment, student_name, created_at,
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .order(sortCol, { ascending: asc })
    .range(from, from + limit - 1);
  const safe = search.trim().replace(/[%_(),]/g, '');
  if (safe) q = q.or(`student_name.ilike.%${safe}%,comment.ilike.%${safe}%`);
  return q;
}

export async function deleteReview(id) {
  return supabase.from('reviews').delete().eq('id', id).select('id');
}

export async function bulkDeleteReviews(ids) {
  return supabase.from('reviews').delete().in('id', ids).select('id');
}

export async function getAllTeachers(page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('teachers')
    .select('id, name, email, verified, bio, languages, specialties, created_at', {
      count: 'exact',
    })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}

export async function updateTeacherVerified(id, verified) {
  return supabase
    .from('teachers')
    .update({ verified })
    .eq('id', id)
    .select('id, verified')
    .single();
}

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export async function getRevenueOverTime(weeks = 8) {
  const w = Math.min(Math.max(weeks, 1), 52);
  const { data, error } = await supabase.from('bookings').select('total_price, booking_date');
  if (error) return { data: null, error };
  const buckets = new Array(w).fill(null).map((_, i) => {
    const start = new Date(Date.now() - (w - 1 - i) * 7 * 86400000);
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);
    return {
      start: start.getTime(),
      end: end.getTime(),
      label: `${MONTH_LABELS[start.getUTCMonth()]} ${String(start.getUTCDate()).padStart(2, '0')}`,
      revenue: 0,
    };
  });
  (data || []).forEach((b) => {
    const t = new Date(b.booking_date).getTime();
    for (const bucket of buckets) {
      if (t >= bucket.start && t < bucket.end) {
        bucket.revenue += Number(b.total_price) || 0;
        break;
      }
    }
  });
  return {
    data: buckets.map(({ label, revenue }) => ({ label, revenue })),
    error: null,
  };
}

export async function getAdminEvents(limit = 20) {
  return supabase
    .from('admin_audit_log')
    .select(
      `id, action, table_name:target_type, record_id:target_id, details:detail, created_at,
       admin:profiles!admin_id(name, email)`
    )
    .order('created_at', { ascending: false })
    .limit(limit);
}

export async function logAdminEvent(action, tableName, recordId = null, details = null) {
  const { data: authData } = await supabase.auth.getUser();
  return supabase.from('admin_audit_log').insert({
    admin_id: authData?.user?.id ?? null,
    action,
    target_type: tableName || null,
    target_id: recordId || null,
    detail: details || {},
  });
}

export async function getAdminEventsPaged(page = 1, limit = ADMIN_PAGE_SIZE, opts = {}) {
  const { action = '', table = '' } = opts;
  const from = (page - 1) * limit;
  let q = supabase
    .from('admin_audit_log')
    .select(
      `id, action, table_name:target_type, record_id:target_id, details:detail, created_at,
       admin:profiles!admin_id(name, email)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
  if (action) q = q.eq('action', action);
  if (table) q = q.eq('target_type', table);
  return q;
}

export async function getUserById(id) {
  return supabase
    .from('profiles')
    .select(
      'id, name, email, photo, bio, is_admin:role, is_teacher, points, level, level_name, created_at'
    )
    .eq('id', id)
    .single();
}

export async function getBookingsByStudent(studentId, page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('bookings')
    .select(
      `id, total_price, status, payment_status, booking_date,
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .eq('student_id', studentId)
    .order('booking_date', { ascending: false })
    .range(from, from + limit - 1);
}

export async function getReviewsByStudent(studentId, page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('reviews')
    .select(
      `id, rating, comment, created_at,
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}

export async function getTeacherById(id) {
  return supabase
    .from('teachers')
    .select(
      `id, user_id, name, email, photo, bio, tagline, languages, specialties,
       verified, verification_date, rating, total_reviews, total_sessions,
       hourly_rate, created_at`
    )
    .eq('id', id)
    .single();
}

export async function getExperiencesByTeacher(teacherId, page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('experiences')
    .select('id, title, language, city, status, price, date, created_at', {
      count: 'exact',
    })
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}
