begin;
create extension if not exists pgtap with schema extensions;
set local search_path = public, app_private, extensions;
select plan(70);

-- 01-10: required objects and boundaries exist.
select has_table('public','profiles','01 private profiles table exists');
select has_table('public','profile_cards','02 public presentation table exists');
select has_table('public','teacher_applications','03 applications table exists');
select has_table('app_private','teacher_application_reviews','04 reviews are separated');
select has_table('app_private','teacher_verifications','05 verification is separated');
select has_table('app_private','admin_audit_log','06 audit is private');
select has_trigger('public','experiences','trg_enforce_verified_publish','07 publish trigger exists');
select ok((select relrowsecurity from pg_class where oid='public.profiles'::regclass),'08 profile RLS enabled');
select ok((select relrowsecurity from pg_class where oid='app_private.teacher_verifications'::regclass),'09 verification RLS enabled');
select ok((select relrowsecurity from pg_class where oid='public.bookings'::regclass),'10 booking RLS enabled');

-- 11-16: explicit grants deny broad/profile/money authority.
select ok(not has_table_privilege('anon','public.profiles','SELECT'),'11 anon cannot select private profiles');
select ok(has_table_privilege('anon','public.profile_cards','SELECT'),'12 anon can select profile cards');
select ok(not has_table_privilege('authenticated','public.bookings','INSERT'),'13 client cannot insert booking');
select ok(not has_table_privilege('authenticated','public.bookings','UPDATE'),'14 client cannot update booking');
select ok(not has_table_privilege('authenticated','public.profiles','UPDATE'),'15 no broad profile update grant');
select ok(has_column_privilege('authenticated','public.profiles','name','UPDATE')
  and not has_column_privilege('authenticated','public.profiles','points','UPDATE'),
  '16 profile grants distinguish editable and protected fields');
select ok(
  not has_column_privilege('authenticated','public.teachers','rating','INSERT')
  and not has_column_privilege('authenticated','public.teachers','total_reviews','INSERT')
  and not has_column_privilege('authenticated','public.teachers','total_sessions','INSERT'),
  '17 applicants lack INSERT authority for teacher reputation fields');

insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,
  raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
values
 (null,'00000000-0000-4000-8000-000000000001','authenticated','authenticated',
  'owner@aro.invalid',crypt('Synthetic-pass-001',gen_salt('bf')),now(),'{}','{"name":"Owner"}',now(),now()),
 (null,'00000000-0000-4000-8000-000000000002','authenticated','authenticated',
  'other@aro.invalid',crypt('Synthetic-pass-002',gen_salt('bf')),now(),'{}','{"name":"Other"}',now(),now()),
 (null,'00000000-0000-4000-8000-000000000003','authenticated','authenticated',
  'admin@aro.invalid',crypt('Synthetic-pass-003',gen_salt('bf')),now(),'{}','{"name":"Admin"}',now(),now());
update app_private.user_roles set role='admin'
  where user_id='00000000-0000-4000-8000-000000000003';

-- 17-19: Auth trigger creates exactly the private/public/role records.
select is((select count(*) from public.profiles),3::bigint,'17 signup creates profiles');
select is((select count(*) from public.profile_cards),3::bigint,'18 signup creates cards');
select is((select count(*) from app_private.user_roles),3::bigint,'19 signup creates roles');

set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';

-- 20-31: owner privacy, column authority and application transitions.
select is((select count(*) from public.profiles),1::bigint,'20 owner reads own profile');
select is((select count(*) from public.profiles
  where id='00000000-0000-4000-8000-000000000002'),0::bigint,'21 owner cannot read other profile');
select lives_ok($$update public.profiles set name='Owner Edited'
  where id='00000000-0000-4000-8000-000000000001'$$,'22 permitted profile edit works');
select throws_ok($$update public.profiles set points=999
  where id='00000000-0000-4000-8000-000000000001'$$,'42501',null,
  '23 protected profile field is denied');
select lives_ok($$insert into public.teacher_applications(id,user_id,display_name)
  values('10000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000001','Owner Teacher')$$,'24 owner creates draft');
select throws_ok($$insert into public.teacher_applications(id,user_id,status)
  values('10000000-0000-4000-8000-000000000009',
  '00000000-0000-4000-8000-000000000001','approved')$$,'42501',null,
  '26 owner cannot insert approved application');
select throws_ok($$insert into public.teachers(id,user_id,name,rating,total_reviews,total_sessions)
  values('30000000-0000-4000-8000-000000000009',
  '00000000-0000-4000-8000-000000000001','Forged reputation',4.99,999,999)$$,
  '42501',null,'27 owner cannot insert fabricated teacher reputation');
select is((select count(*) from public.teacher_applications),1::bigint,'28 owner sees own application');
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select is((select count(*) from public.teacher_applications),0::bigint,'29 other user sees no application');
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select lives_ok($$update public.teacher_applications
  set bio='Synthetic bio',agreed_to_standards=true
  where id='10000000-0000-4000-8000-000000000001'$$,'30 draft edit works');
select lives_ok($$update public.teacher_applications set status='submitted'
  where id='10000000-0000-4000-8000-000000000001'$$,'31 valid submit works');
select results_eq($$with changed as (
  update public.teacher_applications set bio='late edit'
  where id='10000000-0000-4000-8000-000000000001' returning id)
  select count(*) from changed$$,array[0::bigint],'32 submitted application is immutable to owner');
select results_eq($$with changed as (
  update public.teacher_applications set status='approved'
  where id='10000000-0000-4000-8000-000000000001' returning id)
  select count(*) from changed$$,array[0::bigint],'33 owner cannot approve');

-- 32-41: legitimate reviewer performs one atomic, audited approval.
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000003","role":"authenticated"}';
select is((select count(*) from public.teacher_applications),1::bigint,'34 admin sees application');
select throws_ok($$update public.teacher_applications set agreed_to_standards=false
  where id='10000000-0000-4000-8000-000000000001'$$,'42501',null,
  '35 reviewer cannot alter applicant consent');
select lives_ok($$insert into app_private.teacher_application_reviews(
  application_id,tier,reviewed_by,reviewed_at)
  values('10000000-0000-4000-8000-000000000001','verified',
  '00000000-0000-4000-8000-000000000002','2000-01-01T00:00:00Z')$$,'36 admin creates canonical review');
select ok((select reviewed_by='00000000-0000-4000-8000-000000000003'
  and reviewed_at > '2000-01-01T00:00:00Z'::timestamptz
  from app_private.teacher_application_reviews
  where application_id='10000000-0000-4000-8000-000000000001'),
  '37 review identity and time are server-canonical');
select lives_ok($$update public.teacher_applications set status='in_review'
  where id='10000000-0000-4000-8000-000000000001'$$,'38 admin starts review');
select lives_ok($$update public.teacher_applications set status='approved'
  where id='10000000-0000-4000-8000-000000000001'$$,'39 admin approves');
select is((select count(*) from public.teachers),1::bigint,'40 approval creates teacher');
select ok((select rating=0 and total_reviews=0 and total_sessions=0
  from public.teachers where user_id='00000000-0000-4000-8000-000000000001'),
  '41 approval exposes only server-default reputation values');
select is((select count(*) from app_private.teacher_verifications
  where verified and status='active'),1::bigint,'42 approval creates eligibility');
select is((select role from app_private.user_roles
  where user_id='00000000-0000-4000-8000-000000000001'),'teacher','43 approval changes contextual role');
select is((select count(*) from app_private.admin_audit_log),1::bigint,'44 approval is audited');
select ok((select app_private.is_admin()),'45 server-derived admin is true');
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select count(*) from app_private.teacher_application_reviews),0::bigint,
  '46 applicant cannot read reviewer-private row');

-- 47-53: verified publication succeeds; unverified direct creation cannot publish or surface.
select lives_ok($$insert into public.experiences(
  id,teacher_id,title,language,city)
  select '20000000-0000-4000-8000-000000000001',id,'French circle','fr','Calgary'
  from public.teachers where user_id='00000000-0000-4000-8000-000000000001'$$,
  '47 verified owner creates draft');
select lives_ok($$update public.experiences set status='published'
  where id='20000000-0000-4000-8000-000000000001'$$,'48 verified owner publishes');
set local role anon;
set local request.jwt.claims='{}';
select is((select count(*) from public.experiences),1::bigint,'49 anon sees eligible publication');
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select lives_ok($$insert into public.teachers(id,user_id,name)
  values('30000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000002','Unverified')$$,'50 user can prepare teacher draft');
set local role anon;
set local request.jwt.claims='{}';
select is((select count(*) from public.teachers),1::bigint,'51 public sees only verified teacher');
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select lives_ok($$insert into public.experiences(
  id,teacher_id,title,language,city)
  values('20000000-0000-4000-8000-000000000002',
  '30000000-0000-4000-8000-000000000002','Unverified circle','fr','Calgary')$$,
  '52 unverified owner can prepare draft');
select throws_ok($$update public.experiences set status='published'
  where id='20000000-0000-4000-8000-000000000002'$$,'42501',null,
  '53 unverified publish is denied by trigger');

-- Seed a server-authorized booking; clients remain read-only.
reset role;
insert into public.bookings(id,experience_id,student_id,total_minor,currency)
values('40000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000002',2500,'CAD');

-- 54-60: booking visibility/authority and suspension.
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select is((select count(*) from public.bookings),1::bigint,'54 participant reads own booking');
select throws_ok($$insert into public.bookings(experience_id,student_id,total_minor,currency)
  values('20000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000002',1,'CAD')$$,'42501',null,
  '55 participant cannot create money record');
select throws_ok($$update public.bookings set payment_status='paid'
  where id='40000000-0000-4000-8000-000000000001'$$,'42501',null,
  '56 participant cannot self-assert payment');
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select is((select count(*) from public.bookings),1::bigint,'57 host reads booking for own experience');
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000003","role":"authenticated"}';
select lives_ok($$update app_private.teacher_verifications
  set verified=false,status='suspended'
  where application_id='10000000-0000-4000-8000-000000000001'$$,'58 admin can suspend');
set local role anon;
set local request.jwt.claims='{}';
select is((select count(*) from public.experiences),0::bigint,'59 suspension hides publication');
select is((select count(*) from public.teachers),0::bigint,'60 suspension hides teacher');

-- 61-65: document relationship and storage boundary.
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000002","role":"authenticated"}';
select lives_ok($$insert into public.teacher_applications(id,user_id,display_name)
  values('10000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000002','Other Teacher')$$,'61 second owner creates draft');
select lives_ok($$insert into public.teacher_documents(
  application_id,user_id,doc_type,object_path)
  values('10000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000002','id',
  '00000000-0000-4000-8000-000000000002/10000000-0000-4000-8000-000000000002/id.pdf')$$,
  '62 matching document metadata works');
select throws_ok($$insert into public.teacher_documents(
  application_id,user_id,doc_type,object_path)
  values('10000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000002','id',
  '00000000-0000-4000-8000-000000000002/10000000-0000-4000-8000-000000000001/id.pdf')$$,
  '42501',null,'63 cross-owner document metadata is denied');
reset role;
select is((select count(*) from storage.buckets where id in (
  'verification-docs','teacher-portfolio') and not public),2::bigint,'64 both buckets are private');
select is((select count(*) from pg_policies where schemaname='storage'
  and tablename='objects' and policyname like 'aro_docs_%'),4::bigint,'65 four storage policies exist');

-- 66-70: direct owner deletion preserves every verification-history state.
reset role;
insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,
  raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
values
 (null,'00000000-0000-4000-8000-000000000004','authenticated','authenticated',
  'unreviewed@aro.invalid',crypt('Synthetic-pass-004',gen_salt('bf')),now(),'{}','{"name":"Unreviewed"}',now(),now());
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000004","role":"authenticated"}';
insert into public.teachers(id,user_id,name)
values('30000000-0000-4000-8000-000000000004',
  '00000000-0000-4000-8000-000000000004','Unreviewed teacher');
select results_eq($$with deleted as (
  delete from public.teachers
  where id='30000000-0000-4000-8000-000000000004'
  returning id
)
select count(*) from deleted$$,array[1::bigint],
  '66 owner with no verification history can delete teacher');

reset role;
update app_private.teacher_verifications
set verified=true,status='active'
where application_id='10000000-0000-4000-8000-000000000001';
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq($$with deleted as (
  delete from public.teachers
  where user_id='00000000-0000-4000-8000-000000000001'
  returning id
)
select count(*) from deleted$$,array[0::bigint],
  '67 verified owner cannot delete teacher with verification history');

reset role;
update app_private.teacher_verifications
set verified=false,status='suspended'
where application_id='10000000-0000-4000-8000-000000000001';
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq($$with deleted as (
  delete from public.teachers
  where user_id='00000000-0000-4000-8000-000000000001'
  returning id
)
select count(*) from deleted$$,array[0::bigint],
  '68 suspended owner cannot delete teacher with verification history');

reset role;
update app_private.teacher_verifications
set verified=false,status='banned'
where application_id='10000000-0000-4000-8000-000000000001';
set local role authenticated;
set local request.jwt.claims =
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}';
select results_eq($$with deleted as (
  delete from public.teachers
  where user_id='00000000-0000-4000-8000-000000000001'
  returning id
)
select count(*) from deleted$$,array[0::bigint],
  '69 banned owner cannot delete teacher with verification history');
-- The final integrity assertion is an auditor read, not an owner privilege.
reset role;
select is((select count(*) from app_private.teacher_verifications
  where application_id='10000000-0000-4000-8000-000000000001'),1::bigint,
  '70 denied owner deletes preserve verification history');

select * from finish();
rollback;
