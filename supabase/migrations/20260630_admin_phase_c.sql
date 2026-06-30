-- Phase C – Teacher verification, revenue chart, audit log, real-time
-- Idempotent: safe to re-run. All functions use CREATE OR REPLACE; table and
-- policy creation are guarded. Every SECURITY DEFINER function checks is_admin()
-- so a non-admin cannot call it directly via PostgREST to read or forge data.

-- ──────────────────────────────────────────────────────────────────────────────
-- 0. Harden the Phase A stats RPC (was callable by any authenticated user)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS json
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = 'insufficient_privilege';
  END IF;
  RETURN (
    SELECT json_build_object(
      'totalUsers',       (SELECT COUNT(*) FROM profiles),
      'totalExperiences', (SELECT COUNT(*) FROM experiences),
      'totalBookings',    (SELECT COUNT(*) FROM bookings),
      'totalRevenue',     (SELECT COALESCE(SUM(total_price), 0) FROM bookings)
    )
  );
END;
$$;

-- ──────────────────────────────────────────────────────────────────────────────
-- 1. Revenue over time RPC (C3)
-- booking_date is timestamptz; AT TIME ZONE 'UTC' yields a plain timestamp that
-- matches the timestamp buckets produced by generate_series below.
-- ──────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_revenue_over_time(weeks int DEFAULT 8)
RETURNS json
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = 'insufficient_privilege';
  END IF;
  IF weeks < 1 THEN weeks := 1; END IF;
  IF weeks > 52 THEN weeks := 52; END IF;
  RETURN (
    SELECT COALESCE(json_agg(row_to_json(t) ORDER BY t.week_start), '[]'::json)
    FROM (
      SELECT
        gs.week_start::date                       AS week_start,
        TO_CHAR(gs.week_start, 'Mon DD')          AS label,
        COALESCE(SUM(b.total_price), 0)::float    AS revenue
      FROM generate_series(
        date_trunc('week', NOW() AT TIME ZONE 'UTC') - ((weeks - 1) || ' weeks')::interval,
        date_trunc('week', NOW() AT TIME ZONE 'UTC'),
        '1 week'::interval
      ) AS gs(week_start)
      LEFT JOIN bookings b
        ON date_trunc('week', b.booking_date AT TIME ZONE 'UTC') = gs.week_start
      GROUP BY gs.week_start
    ) t
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_revenue_over_time FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_revenue_over_time TO authenticated;

-- ──────────────────────────────────────────────────────────────────────────────
-- 2. Admin audit log table (C4)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_events (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id    uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  action      text        NOT NULL,
  table_name  text        NOT NULL,
  record_id   uuid,
  details     jsonb,
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_events_created_at ON admin_events (created_at DESC);

ALTER TABLE admin_events ENABLE ROW LEVEL SECURITY;

-- Only admins can read the log. There is intentionally no INSERT/UPDATE/DELETE
-- policy: writes happen exclusively through log_admin_event() (SECURITY DEFINER),
-- so the log is effectively append-only and tamper-resistant from the client.
DO $$ BEGIN
  CREATE POLICY "Admins can view audit log"
    ON admin_events FOR SELECT
    USING (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ──────────────────────────────────────────────────────────────────────────────
-- 3. log_admin_event — guarded SECURITY DEFINER insert
-- ──────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.log_admin_event(
  p_action      text,
  p_table_name  text,
  p_record_id   uuid   DEFAULT NULL,
  p_details     jsonb  DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = 'insufficient_privilege';
  END IF;
  INSERT INTO admin_events (admin_id, action, table_name, record_id, details)
  VALUES (auth.uid(), p_action, p_table_name, p_record_id, p_details);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.log_admin_event FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.log_admin_event TO authenticated;

-- ──────────────────────────────────────────────────────────────────────────────
-- 4. Real-time (C5)
-- postgres_changes only delivers events for tables in the supabase_realtime
-- publication, which is empty by default. Add bookings and reviews so the admin
-- sidebar badges receive live INSERT events. RLS still applies: only admins
-- (who have SELECT policies on both tables) receive the rows.
-- ──────────────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
EXCEPTION
  WHEN duplicate_object THEN NULL;   -- already in publication
  WHEN undefined_object THEN NULL;   -- publication absent (non-Supabase Postgres)
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
