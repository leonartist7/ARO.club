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

export async function getAllExperiences(page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('experiences')
    .select(
      `id, title, language, city, status, price, date, created_at,
       teacher:teachers(name)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}

export async function updateExperienceStatus(id, status) {
  return supabase
    .from('experiences')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
}

export async function getAllBookings(page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('bookings')
    .select(
      `id, total_price, status, payment_status, booking_date,
       student:profiles(name, email),
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .order('booking_date', { ascending: false })
    .range(from, from + limit - 1);
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

export async function getAllReviews(page = 1, limit = ADMIN_PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('reviews')
    .select(
      `id, rating, comment, student_name, created_at,
       experience:experiences(title)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}

export async function deleteReview(id) {
  return supabase.from('reviews').delete().eq('id', id).select('id');
}
