-- Phase C – Teacher verification, revenue chart, audit log
-- All CREATE statements wrapped in idempotent DO blocks or OR REPLACE.

-- 1. Revenue over time RPC
CREATE OR REPLACE FUNCTION public.get_revenue_over_time(weeks int DEFAULT 8)
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
    ORDER BY gs.week_start
  ) t;
$$;

REVOKE EXECUTE ON FUNCTION public.get_revenue_over_time FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_revenue_over_time TO authenticated;

-- 2. Admin audit log table
CREATE TABLE IF NOT EXISTS admin_events (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id    uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  action      text        NOT NULL,
  table_name  text        NOT NULL,
  record_id   uuid,
  details     jsonb,
  created_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE admin_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Admins can view audit log"
    ON admin_events FOR SELECT
    USING (is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. log_admin_event — SECURITY DEFINER bypasses RLS for safe inserts
CREATE OR REPLACE FUNCTION public.log_admin_event(
  p_action      text,
  p_table_name  text,
  p_record_id   uuid   DEFAULT NULL,
  p_details     jsonb  DEFAULT NULL
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO admin_events (admin_id, action, table_name, record_id, details)
  VALUES (auth.uid(), p_action, p_table_name, p_record_id, p_details);
$$;

REVOKE EXECUTE ON FUNCTION public.log_admin_event FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.log_admin_event TO authenticated;
