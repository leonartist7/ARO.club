import { supabase } from './supabase';

export const ADMIN_PAGE_SIZE = 20;

export async function getAdminStats() {
  const { data, error } = await supabase.rpc('get_admin_stats');
  if (error) return { data: null, error };
  return { data, error: null };
}

export async function getAllUsers(page = 1, limit = ADMIN_PAGE_SIZE, search = '') {
  const from = (page - 1) * limit;
  let q = supabase
    .from('profiles')
    .select('id, name, email, photo, is_admin, is_teacher, points, created_at', {
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
  return supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();
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

// ── Experiences bulk (C2) ─────────────────────────────────────────────────────

export async function bulkUpdateExperienceStatus(ids, status) {
  return supabase.from('experiences').update({ status }).in('id', ids).select('id');
}

// ── Bookings bulk (C2) ────────────────────────────────────────────────────────

export async function bulkDeleteBookings(ids) {
  return supabase.from('bookings').delete().in('id', ids).select('id');
}

// ── Pending count for real-time badge (C5) ────────────────────────────────────

export async function getPendingBookingsCount() {
  const { count, error } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');
  return { count: count ?? 0, error };
}

// ── Teachers (C1) ─────────────────────────────────────────────────────────────

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

// ── Revenue chart (C3) ────────────────────────────────────────────────────────

export async function getRevenueOverTime(weeks = 8) {
  const { data, error } = await supabase.rpc('get_revenue_over_time', { weeks });
  if (error) return { data: null, error };
  return { data, error: null };
}

// ── Audit log (C4) ────────────────────────────────────────────────────────────

export async function getAdminEvents(limit = 20) {
  return supabase
    .from('admin_events')
    .select(
      `id, action, table_name, record_id, details, created_at,
       admin:profiles!admin_id(name, email)`
    )
    .order('created_at', { ascending: false })
    .limit(limit);
}

export async function logAdminEvent(action, tableName, recordId = null, details = null) {
  return supabase.rpc('log_admin_event', {
    p_action: action,
    p_table_name: tableName,
    p_record_id: recordId || undefined,
    p_details: details || undefined,
  });
}

export async function getAdminEventsPaged(page = 1, limit = ADMIN_PAGE_SIZE, opts = {}) {
  const { action = '', table = '' } = opts;
  const from = (page - 1) * limit;
  let q = supabase
    .from('admin_events')
    .select(
      `id, action, table_name, record_id, details, created_at,
       admin:profiles!admin_id(name, email)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
  if (action) q = q.eq('action', action);
  if (table) q = q.eq('table_name', table);
  return q;
}

// ── Detail views (D1) ─────────────────────────────────────────────────────────

export async function getUserById(id) {
  return supabase
    .from('profiles')
    .select(
      'id, name, email, photo, bio, is_admin, is_teacher, points, level, level_name, created_at'
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
