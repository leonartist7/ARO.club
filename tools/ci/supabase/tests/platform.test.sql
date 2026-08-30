-- CI-engine probe only: all fixture DDL/data rolls back. Not application RLS evidence.
begin;
create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;
select plan(21);
select has_table('auth', 'users', 'Auth schema exists');
select ok((select relrowsecurity from pg_class where oid = 'auth.users'::regclass), 'Auth users has RLS');
select ok(not has_table_privilege('anon', 'auth.users', 'SELECT'), 'Anon cannot read Auth users');
select is((select count(*) from auth.users), 0::bigint, 'Reset contains no Auth users');

create table public.i0_ci_probe (id integer primary key, owner_id uuid not null, value text not null);
select ok(not has_table_privilege('anon', 'public.i0_ci_probe', 'SELECT'), 'New table has no implicit anon grant');
select ok(not has_table_privilege('authenticated', 'public.i0_ci_probe', 'SELECT'), 'New table has no implicit authenticated grant');
select ok(not has_table_privilege('service_role', 'public.i0_ci_probe', 'SELECT'), 'New table has no implicit service grant');
alter table public.i0_ci_probe enable row level security;
revoke all on public.i0_ci_probe from public, anon, authenticated, service_role;
grant select, insert, update, delete on public.i0_ci_probe to authenticated, service_role;
create policy probe_owner on public.i0_ci_probe for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
select ok((select relrowsecurity from pg_class where oid = 'public.i0_ci_probe'::regclass), 'Probe RLS enabled');

set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$insert into public.i0_ci_probe values (1, auth.uid(), 'synthetic')$$, 'Owner insert succeeds');
select is((select count(*) from public.i0_ci_probe), 1::bigint, 'Owner reads own row');
select lives_ok($$update public.i0_ci_probe set value = 'edited' where id = 1$$, 'Owner update succeeds');
select throws_ok($$insert into public.i0_ci_probe values (2, '00000000-0000-4000-8000-000000000002', 'forged')$$,
  '42501', null, 'Forged owner insert denied');
select throws_ok($$update public.i0_ci_probe set owner_id = '00000000-0000-4000-8000-000000000002' where id = 1$$,
  '42501', null, 'Owner reassignment denied');

set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select is((select count(*) from public.i0_ci_probe), 0::bigint, 'Other user sees no rows');
select results_eq($$with changed as (update public.i0_ci_probe set value = 'forged' returning id) select count(*) from changed$$,
  array[0::bigint], 'Other user updates zero rows');
select results_eq($$with changed as (delete from public.i0_ci_probe returning id) select count(*) from changed$$,
  array[0::bigint], 'Other user deletes zero rows');
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated","user_metadata":{"role":"admin"}}';
select is((select count(*) from public.i0_ci_probe), 0::bigint, 'Forged metadata admin gains no access');

set local role anon;
set local request.jwt.claims = '{}';
select throws_ok($$select * from public.i0_ci_probe$$, '42501', null, 'Anon probe read denied');
set local role service_role;
select is((select count(*) from public.i0_ci_probe), 1::bigint, 'Service bypass is explicit and server-only');
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$delete from public.i0_ci_probe where id = 1$$, 'Owner delete succeeds');
select is((select count(*) from public.i0_ci_probe), 0::bigint, 'Owner deletion removes row');
reset role;
select * from finish();
rollback;
