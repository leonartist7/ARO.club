-- Phase A1 – Admin column + is_admin() RLS function
-- Run in Supabase SQL Editor once.

-- 1. Admin flag on profiles ------------------------------------------------
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- 2. Stable helper function -------------------------------------------------
-- Returns true when the calling user's profile has is_admin = true.
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

-- 4. Admin UPDATE/DELETE on profiles so they can grant/revoke admin flag ---
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (is_admin());
