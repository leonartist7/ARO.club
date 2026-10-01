begin;
create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;
select plan(17);

select has_table('public','account_deletion_requests','deletion request table exists');
select ok((select relrowsecurity from pg_class where oid='public.account_deletion_requests'::regclass),'RLS is enabled');
select ok(not has_table_privilege('anon','public.account_deletion_requests','SELECT'),'anonymous read is denied');
select ok(not has_table_privilege('authenticated','public.account_deletion_requests','UPDATE'),'client cannot process a request');
select ok(has_column_privilege('service_role','public.account_deletion_requests','status','UPDATE')
  and not has_column_privilege('service_role','public.account_deletion_requests','user_id','UPDATE')
  and not has_column_privilege('service_role','public.account_deletion_requests','processed_at','UPDATE')
  and not has_column_privilege('service_role','public.account_deletion_requests','requested_at','UPDATE'),
  'processor can update lifecycle state but not request identity or timestamp');
select ok(has_table_privilege('service_role','public.account_deletion_requests','DELETE'),
  'processor can purge resolved request records');

insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,
  raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
values (null,'00000000-0000-4000-8000-000000000011','authenticated','authenticated',
  'deletion@aro.invalid',crypt('Synthetic-pass-011',gen_salt('bf')),now(),'{}','{}',now(),now());

set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000011","role":"authenticated"}';
select lives_ok($$insert into public.account_deletion_requests(user_id)
  values ('00000000-0000-4000-8000-000000000011')$$,'owner can start a request');
select is((select count(*) from public.account_deletion_requests),1::bigint,'owner sees own request');
select throws_ok($$insert into public.account_deletion_requests(user_id)
  values ('00000000-0000-4000-8000-000000000011')$$,'23505',null,'duplicate open request is denied');
select throws_ok($$insert into public.account_deletion_requests(user_id)
  values ('00000000-0000-4000-8000-000000000012')$$,'42501',null,'other user request is denied');
select throws_ok($$insert into public.account_deletion_requests(user_id,status)
  values ('00000000-0000-4000-8000-000000000011','completed')$$,'42501',null,'client cannot forge completed status');

set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000012","role":"authenticated"}';
select is((select count(*) from public.account_deletion_requests),0::bigint,'other user cannot see request');

reset role;
delete from auth.users where id='00000000-0000-4000-8000-000000000011';
select ok((select user_id is null from public.account_deletion_requests),
  'request history does not block deletion of auth user');
set local role service_role;
select throws_ok($$delete from public.account_deletion_requests
  where user_id is null$$,'P0001',null,'pending request cannot be purged');
update public.account_deletion_requests
  set status='completed'
  where user_id is null;
select throws_ok($$delete from public.account_deletion_requests
  where user_id is null$$,'P0001',null,'recently resolved request cannot be purged');
reset role;
-- Simulate the passage of 31 days in this disposable transaction only.
update public.account_deletion_requests
  set processed_at=now()-interval '31 days' where user_id is null;
set local role service_role;
select lives_ok($$delete from public.account_deletion_requests
  where user_id is null$$,'processor can purge a resolved aged request');
select is((select count(*) from public.account_deletion_requests),0::bigint,
  'purged request leaves no orphaned record');
select * from finish();
rollback;
