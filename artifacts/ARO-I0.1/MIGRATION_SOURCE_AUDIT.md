# Read-only migration-source audit

Date: 2026-08-30. Source project: Tonguee `ybhecubqnhukgpvchjay`, **not an ARO runtime target**. Method: Supabase connector SELECTs against PostgreSQL catalogs plus `list_migrations`. No DDL, writes, user records, credentials or personal data were accessed.

## Observations

- Eight public tables, all with RLS enabled: bookings, contact_messages, experiences, notifications, profiles, reviews, teachers, user_badges.
- Connector migration history: empty.
- `public.teacher_applications`, `public.teacher_documents`, `public.admin_audit_log`: absent.
- `public.profiles.role`: absent.
- `trg_enforce_verified_publish`: absent. The **only noninternal trigger** on public.experiences is enabled `update_experiences_updated_at`, calling `update_updated_at_column`.
- Public functions: handle_new_user (SECURITY DEFINER), handle_updated_at, update_updated_at_column. None has a configured fixed search_path. No is_admin or enforce_verified_publish function appears in the public schema.
- Experience SELECT permits published rows or the owning teacher's rows. INSERT/UPDATE/DELETE check teacher ownership. None of these policy expressions checks teacher verification/active status; UPDATE has no separately declared WITH CHECK.

## Consequence

The repository Trust Engine is an implemented source asset, **not a verified live control in this source database**. Copying either the live schema or old setup scripts blindly would not establish the governed ARO Trust contract. SEC0's repository-hygiene VERIFIED status does not certify live Trust enforcement.

I0.1's platform probe deliberately does not import this incomplete application schema or claim to remediate Tonguee. A subsequent reviewed migration-baseline package must:

1. inventory source code expectations and both conflicting schema snapshots;
2. reconcile application tables, Auth profile creation, explicit grants, role authority and Trust enforcement;
3. preserve original SQL as evidence and create append-only migrations through the CLI;
4. test a clean synthetic reset and hostile role/publication cases in disposable CI;
5. run actual app Auth/onboarding/profile/teacher/Passport regressions and protected-surface evidence;
6. pass security/privacy/operations review before any hosted rollout.

No production fix, live migration or provider change is authorized by this audit. Tonguee stays untouched and `aro-platform` remains QUARANTINED — KEEP. The finding was surfaced to the founder; any live Tonguee remediation needs a separately approved scope.

## Reproducible metadata checks

Run only as read-only inspection against the named evidence source (or a separately approved isolated target); no row contents are needed:

```sql
select c.relname, c.relrowsecurity
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by c.relname;

select t.tgname, t.tgenabled, p.proname
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where n.nspname = 'public' and c.relname = 'experiences' and not t.tgisinternal;

select policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'experiences';

select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'profiles' and column_name = 'role';
```

The actual connector queries additionally returned `to_regclass` existence checks and public-function security/search-path metadata as structured JSON. This is catalog evidence, not an exploit test or production write test.
