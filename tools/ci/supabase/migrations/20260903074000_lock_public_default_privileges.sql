-- ARO I0 hosted-baseline hardening.
-- Repository migrations run as postgres and must grant client/service access
-- explicitly after enabling RLS. Provider-owned role defaults are not changed.

alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke all on functions from anon, authenticated, service_role;
