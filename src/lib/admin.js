import { supabase } from './supabase';

const PAGE_SIZE = 20;

export async function getAdminStats() {
  const [users, experiences, bookings] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('experiences').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('total_price', { count: 'exact' }),
  ]);

  const error = users.error || experiences.error || bookings.error;
  if (error) return { data: null, error };

  const revenue = (bookings.data ?? []).reduce(
    (sum, b) => sum + (b.total_price ?? 0),
    0
  );

  return {
    data: {
      totalUsers: users.count ?? 0,
      totalExperiences: experiences.count ?? 0,
      totalBookings: bookings.count ?? 0,
      totalRevenue: revenue,
    },
    error: null,
  };
}

export async function getAllUsers(page = 1, limit = PAGE_SIZE) {
  const from = (page - 1) * limit;
  return supabase
    .from('profiles')
    .select('id, name, email, photo, is_admin, is_teacher, points, created_at', {
      count: 'exact',
    })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);
}

export async function updateUserAdminFlag(userId, isAdmin) {
  return supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();
}

export async function getAllExperiences(page = 1, limit = PAGE_SIZE) {
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

export async function getAllBookings(page = 1, limit = PAGE_SIZE) {
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
  return supabase.from('bookings').delete().eq('id', id);
}
