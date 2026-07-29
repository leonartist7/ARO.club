-- Phase A1 – Admin column + is_admin() RLS function
-- Run in Supabase SQL Editor once.

-- 1. Admin flag on profiles ------------------------------------------------
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- 2. Stable helper function -------------------------------------------------
-- Returns true when the calling user's profile has is_admin = true.
-- SECURITY DEFINER runs as the function owner (bypasses RLS on profiles)
-- so the self-lookup never recurses.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
      AND is_admin = true
  );
$$;

-- Restrict execute to authenticated users only (not anonymous / public).
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 3. Admin-bypass SELECT policies ------------------------------------------
-- Admins can read every row regardless of other filters.

-- profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- teachers
CREATE POLICY "Admins can view all teachers"
  ON teachers FOR SELECT
  USING (is_admin());

-- experiences (admins see all statuses)
CREATE POLICY "Admins can view all experiences"
  ON experiences FOR SELECT
  USING (is_admin());

-- bookings
CREATE POLICY "Admins can view all bookings"
  ON bookings FOR SELECT
  USING (is_admin());

-- reviews
CREATE POLICY "Admins can view all reviews"
  ON reviews FOR SELECT
  USING (is_admin());

-- 4. Admin UPDATE on profiles so they can grant/revoke is_admin flag -------
-- WITH CHECK ensures the resulting row still satisfies is_admin() on the
-- caller's own profile — so a revoked admin cannot sneak through mid-request.
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- 5. Aggregate stats function (avoids client-side revenue summation) --------
-- Called from src/lib/admin.js via supabase.rpc('get_admin_stats').
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'totalUsers',       (SELECT COUNT(*)       FROM profiles),
    'totalExperiences', (SELECT COUNT(*)       FROM experiences),
    'totalBookings',    (SELECT COUNT(*)       FROM bookings),
    'totalRevenue',     (SELECT COALESCE(SUM(total_price), 0) FROM bookings)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.get_admin_stats() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;
