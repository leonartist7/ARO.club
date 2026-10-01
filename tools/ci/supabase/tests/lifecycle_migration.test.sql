begin;
create extension if not exists pgtap with schema extensions;
set local search_path=public,extensions;
select plan(14);
insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,
  raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
select null,('00000000-0000-4000-8000-0000000000'||n)::uuid,'authenticated','authenticated',
  'migration-'||n||'@aro.invalid',crypt('Synthetic-pass-032',gen_salt('bf')),now(),'{}','{}',now(),now()
from generate_series(32,35) n;
insert into auth.sessions(id,user_id,created_at,updated_at) select id,id,now(),now() from auth.users;
insert into app_private.account_eligibility(user_id) select id from auth.users;
-- Emulate AUTH2's backfilled request: no owner-held secret yet.
insert into public.account_deletion_requests(id,user_id) values('10000000-0000-4000-8000-000000000032','00000000-0000-4000-8000-000000000032');
insert into app_private.account_deletion_jobs(request_id,target_user_id,receipt_hash)
values('10000000-0000-4000-8000-000000000032','00000000-0000-4000-8000-000000000032',repeat('c',64));
set local role authenticated;
set local request.jwt.claims='{"sub":"00000000-0000-4000-8000-000000000032","session_id":"00000000-0000-4000-8000-000000000032","role":"authenticated"}';
select is((api.account_deletion_owner_status()->>'needs_confirmation')::boolean,true,'legacy owner must obtain a receipt');
set local role service_role;
select ok(api.claim_account_deletion('10000000-0000-4000-8000-000000000032') is null,'worker cannot erase legacy request without user receipt');
set local role authenticated;
select lives_ok($$select api.request_account_deletion(repeat('d',64))$$,'legacy owner receives a fresh receipt idempotently');
select is((api.account_deletion_owner_status()->>'needs_confirmation')::boolean,false,'receipt handoff is now ready');
set local role service_role;
select is(api.account_deletion_receipt_status(repeat('d',64))->>'status','pending','handed-off receipt authorizes status');
reset role;
-- An external Auth removal must not skip orphaned Storage inventory.
set local role authenticated;
set local request.jwt.claims='{"sub":"00000000-0000-4000-8000-000000000033","session_id":"00000000-0000-4000-8000-000000000033","role":"authenticated"}';
select api.request_account_deletion(repeat('e',64));
reset role;
insert into storage.objects(bucket_id,name,owner_id) values('verification-docs','00000000-0000-4000-8000-000000000033/orphan.png','00000000-0000-4000-8000-000000000033');
delete from auth.users where id='00000000-0000-4000-8000-000000000033';
set local role service_role;
create temporary table orphan_claim as select api.claim_account_deletion((select (api.account_deletion_receipt_status(repeat('e',64))->>'unused')::uuid)) as payload;
-- Explicitly select the orphan request via its private receipt, rather than the older live request.
reset role;
delete from orphan_claim;
set local role service_role;
insert into orphan_claim select api.claim_account_deletion((select r.id from public.account_deletion_requests r where r.user_id is null));
select is((select payload->>'user_id' from orphan_claim),'00000000-0000-4000-8000-000000000033','durable target survives external identity deletion');
select is(api.account_deletion_receipt_status(repeat('e',64))->>'status','processing','missing Auth does not imply completed cleanup');
select is((select count(*) from api.account_deletion_objects((select (payload->>'request_id')::uuid from orphan_claim),(select (payload->>'lease_token')::uuid from orphan_claim))),1::bigint,'orphaned objects remain discoverable');
select throws_ok($$select api.mark_account_deletion_storage_clean((select (payload->>'request_id')::uuid from orphan_claim),(select (payload->>'lease_token')::uuid from orphan_claim))$$,'23514',null,'cannot stamp cleanup while files remain');
select throws_ok($$select api.finish_account_deletion((select (payload->>'request_id')::uuid from orphan_claim),(select (payload->>'lease_token')::uuid from orphan_claim))$$,'23514',null,'missing identity cannot bypass cleanup stage');
reset role;
-- Transaction-only SQL inventory fixture; no external Storage bytes exist here.
delete from storage.objects where owner_id='00000000-0000-4000-8000-000000000033';
set local role service_role;
select lives_ok($$select api.mark_account_deletion_storage_clean((select (payload->>'request_id')::uuid from orphan_claim),(select (payload->>'lease_token')::uuid from orphan_claim))$$,'empty orphan inventory records cleanup');
select lives_ok($$select api.finish_account_deletion((select (payload->>'request_id')::uuid from orphan_claim),(select (payload->>'lease_token')::uuid from orphan_claim))$$,'completion follows verified orphan cleanup');
reset role;
-- A private review of this owner's application is protected before any decision.
insert into public.teacher_applications(id,user_id,display_name) values('10000000-0000-4000-8000-000000000034','00000000-0000-4000-8000-000000000034','Synthetic applicant');
update app_private.user_roles set role='admin' where user_id='00000000-0000-4000-8000-000000000035';
set local request.jwt.claims='{"sub":"00000000-0000-4000-8000-000000000035","session_id":"00000000-0000-4000-8000-000000000035","role":"authenticated"}';
insert into app_private.teacher_application_reviews(application_id,tier) values('10000000-0000-4000-8000-000000000034','verified');
set local role authenticated;
set local request.jwt.claims='{"sub":"00000000-0000-4000-8000-000000000034","session_id":"00000000-0000-4000-8000-000000000034","role":"authenticated"}';
select api.request_account_deletion(repeat('f',64));
reset role;
create temporary table reviewed_claim as select api.claim_account_deletion((select id from public.account_deletion_requests where user_id='00000000-0000-4000-8000-000000000034')) as payload;
select is((select payload->>'blocked' from reviewed_claim),'true','in-progress applicant Trust work blocks erasure');
select is((select count(*) from app_private.teacher_application_reviews),1::bigint,'private review history remains intact');
select * from finish();
rollback;
