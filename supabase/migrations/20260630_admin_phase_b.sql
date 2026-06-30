-- Phase B1 – Admin mutation policies
-- These policies were missing from Phase A, causing silent RLS failures for
-- updateExperienceStatus, deleteBooking, and any new booking/review mutations.
--
-- Wrapped in DO blocks so re-running the migration is safe (idempotent).

-- experiences: admin UPDATE (enables updateExperienceStatus)
DO $$ BEGIN
  CREATE POLICY "Admins can update any experience"
    ON experiences FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- bookings: admin UPDATE (enables updateBookingStatus)
DO $$ BEGIN
  CREATE POLICY "Admins can update any booking"
    ON bookings FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- bookings: admin DELETE (enables deleteBooking)
DO $$ BEGIN
  CREATE POLICY "Admins can delete any booking"
    ON bookings FOR DELETE
    USING (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- reviews: admin DELETE (enables deleteReview)
DO $$ BEGIN
  CREATE POLICY "Admins can delete any review"
    ON reviews FOR DELETE
    USING (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- teachers: admin UPDATE (enables teacher verification in Phase C)
DO $$ BEGIN
  CREATE POLICY "Admins can update any teacher"
    ON teachers FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
