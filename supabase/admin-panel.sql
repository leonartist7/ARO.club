-- ============================================
-- Admin panel RLS (append-only; merged from claude/phase-a-tasks-tzg5ub)
--
-- The platform admin panel (src/pages/admin/*) needs read/write access on the
-- marketplace tables. Policies follow the trust-engine role model: an admin is
-- profiles.role = 'admin' (public.is_admin()), never a separate column.
-- The verified-only publish trigger (trg_enforce_verified_publish) still
-- guards every status change on experiences — admins cannot bypass it.
-- ============================================

-- Bookings: admins list, update statuses, and remove bad records.
DROP POLICY IF EXISTS "Admins view all bookings" ON bookings;
CREATE POLICY "Admins view all bookings"
  ON bookings FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins update bookings" ON bookings;
CREATE POLICY "Admins update bookings"
  ON bookings FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins delete bookings" ON bookings;
CREATE POLICY "Admins delete bookings"
  ON bookings FOR DELETE
  USING (public.is_admin());

-- Reviews: admins list and remove spam/abuse.
DROP POLICY IF EXISTS "Admins view all reviews" ON reviews;
CREATE POLICY "Admins view all reviews"
  ON reviews FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins delete reviews" ON reviews;
CREATE POLICY "Admins delete reviews"
  ON reviews FOR DELETE
  USING (public.is_admin());

-- Experiences: admins change status on any experience (the verified-publish
-- trigger still applies — publishing an unverified teacher's experience fails).
DROP POLICY IF EXISTS "Admins update experiences" ON experiences;
CREATE POLICY "Admins update experiences"
  ON experiences FOR UPDATE
  USING (public.is_admin());

-- Profiles: admins promote/demote the role flag. WITH CHECK keeps the write
-- admin-only and prevents an admin from locking themselves out via the panel.
DROP POLICY IF EXISTS "Admins update profiles" ON profiles;
CREATE POLICY "Admins update profiles"
  ON profiles FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
