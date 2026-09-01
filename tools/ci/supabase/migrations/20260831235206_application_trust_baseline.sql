-- ARO I0.2 application/Auth/Trust baseline.
-- Synthetic disposable CI only. No production data or provider target.

create extension if not exists pgcrypto with schema extensions;

create schema if not exists app_private;
create schema if not exists api;
revoke all on schema app_private from public, anon, authenticated;
revoke all on schema api from public, anon, authenticated;
grant usage on schema app_private to authenticated, service_role;
grant usage on schema api to authenticated, service_role;

create table app_private.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'participant'
    check (role in ('participant', 'teacher', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function app_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from app_private.user_roles
    where user_id = (select auth.uid()) and role = 'admin'
  );
$$;
revoke all on function app_private.is_admin() from public, anon, authenticated, service_role;
grant execute on function app_private.is_admin() to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null check (char_length(name) between 1 and 100),
  photo text,
  bio text check (bio is null or char_length(bio) <= 1000),
  avatar jsonb not null default '{}'::jsonb check (jsonb_typeof(avatar) = 'object'),
  user_type text check (user_type in ('student', 'teacher')),
  goal text check (goal in ('casual', 'regular', 'serious', 'intense')),
  goal_minutes integer not null default 5 check (goal_minutes between 1 and 1440),
  interests text[] not null default '{}',
  languages_learning jsonb not null default '[]'::jsonb
    check (jsonb_typeof(languages_learning) = 'array'),
  experience_types text[] not null default '{}',
  onboarding_completed boolean not null default false,
  points integer not null default 0 check (points >= 0),
  level integer not null default 1 check (level >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_cards (
  id uuid primary key references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  photo text,
  avatar jsonb not null default '{}'::jsonb check (jsonb_typeof(avatar) = 'object'),
  points integer not null default 0 check (points >= 0),
  level integer not null default 1 check (level >= 1),
  updated_at timestamptz not null default now()
);

create table public.teacher_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft'
    check (status in ('draft','submitted','in_review','changes_requested','approved','rejected')),
  display_name text check (display_name is null or char_length(display_name) <= 100),
  headline text check (headline is null or char_length(headline) <= 160),
  bio text check (bio is null or char_length(bio) <= 2000),
  languages jsonb not null default '[]'::jsonb check (jsonb_typeof(languages) = 'array'),
  experience_types text[] not null default '{}',
  cities text[] not null default '{}',
  teaches_online boolean not null default false,
  teaches_in_person boolean not null default true,
  social_links jsonb not null default '{}'::jsonb check (jsonb_typeof(social_links) = 'object'),
  background_check_consent boolean not null default false,
  agreed_to_standards boolean not null default false,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index teacher_applications_one_open_per_user_idx
  on public.teacher_applications(user_id)
  where status not in ('rejected');
create index teacher_applications_user_id_idx on public.teacher_applications(user_id);
create index teacher_applications_status_idx on public.teacher_applications(status);

create table app_private.teacher_application_reviews (
  application_id uuid primary key references public.teacher_applications(id) on delete cascade,
  tier text check (tier in ('verified','pro','elite')),
  rubric_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(rubric_scores) = 'object'),
  admin_notes text check (admin_notes is null or char_length(admin_notes) <= 5000),
  decision_reason text check (decision_reason is null or char_length(decision_reason) <= 2000),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index teacher_application_reviews_reviewer_idx
  on app_private.teacher_application_reviews(reviewed_by);

create table public.teacher_application_decisions (
  application_id uuid primary key references public.teacher_applications(id) on delete cascade,
  tier text check (tier in ('verified','pro','elite')),
  decision_reason text check (decision_reason is null or char_length(decision_reason) <= 2000),
  reviewed_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create table public.teacher_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.teacher_applications(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  doc_type text not null
    check (doc_type in ('id','certification','intro_video','portfolio_image','sample_lesson')),
  label text check (label is null or char_length(label) <= 160),
  object_path text not null check (
    object_path = user_id::text || '/' || application_id::text || '/' || split_part(object_path, '/', 3)
    and split_part(object_path, '/', 3) <> ''
  ),
  created_at timestamptz not null default now(),
  unique (application_id, object_path)
);
create index teacher_documents_application_id_idx on public.teacher_documents(application_id);
create index teacher_documents_user_id_idx on public.teacher_documents(user_id);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  photo text,
  languages jsonb not null default '[]'::jsonb check (jsonb_typeof(languages) = 'array'),
  specialties text[] not null default '{}',
  bio text check (bio is null or char_length(bio) <= 2000),
  tagline text check (tagline is null or char_length(tagline) <= 160),
  rating numeric(3,2) not null default 0 check (rating between 0 and 5),
  total_reviews integer not null default 0 check (total_reviews >= 0),
  total_sessions integer not null default 0 check (total_sessions >= 0),
  years_teaching integer not null default 0 check (years_teaching between 0 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index teachers_user_id_idx on public.teachers(user_id);

create table app_private.teacher_verifications (
  teacher_id uuid primary key references public.teachers(id) on delete cascade,
  application_id uuid unique references public.teacher_applications(id) on delete restrict,
  verified boolean not null default false,
  status text not null default 'pending' check (status in ('pending','active','suspended','banned')),
  tier text check (tier in ('verified','pro','elite')),
  verification_date timestamptz,
  updated_at timestamptz not null default now(),
  check ((verified and status = 'active' and verification_date is not null and tier is not null)
    or not verified)
);
create index teacher_verifications_eligibility_idx
  on app_private.teacher_verifications(teacher_id)
  where verified and status = 'active';

create or replace function app_private.is_teacher_eligible(target_teacher uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from app_private.teacher_verifications
    where teacher_id=target_teacher and verified and status='active'
  );
$$;
revoke all on function app_private.is_teacher_eligible(uuid)
  from public, anon, authenticated, service_role;
grant execute on function app_private.is_teacher_eligible(uuid) to anon, authenticated;

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  description text check (description is null or char_length(description) <= 5000),
  language text not null check (char_length(language) between 2 and 40),
  city text not null check (char_length(city) between 1 and 100),
  status text not null default 'draft'
    check (status in ('draft','published','cancelled','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index experiences_teacher_id_idx on public.experiences(teacher_id);
create index experiences_public_idx on public.experiences(city, language, created_at)
  where status = 'published';

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete restrict,
  student_id uuid not null references public.profiles(id) on delete restrict,
  num_people integer not null default 1 check (num_people between 1 and 20),
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled','completed')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending','paid','refunded','failed')),
  total_minor integer not null check (total_minor >= 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index bookings_student_id_idx on public.bookings(student_id);
create index bookings_experience_id_idx on public.bookings(experience_id);

create table app_private.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null check (char_length(action) between 1 and 100),
  target_type text not null check (char_length(target_type) between 1 and 100),
  target_id uuid,
  detail jsonb not null default '{}'::jsonb check (jsonb_typeof(detail) = 'object'),
  created_at timestamptz not null default now()
);
create index admin_audit_log_admin_id_idx on app_private.admin_audit_log(admin_id);
create index admin_audit_log_target_idx on app_private.admin_audit_log(target_type, target_id);

create or replace function app_private.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = statement_timestamp(); return new; end
$$;

create or replace function app_private.sync_profile_card()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profile_cards(id,name,photo,avatar,points,level,updated_at)
  values (new.id,new.name,new.photo,new.avatar,new.points,new.level,statement_timestamp())
  on conflict (id) do update set
    name=excluded.name, photo=excluded.photo, avatar=excluded.avatar,
    points=excluded.points, level=excluded.level, updated_at=excluded.updated_at;
  return new;
end
$$;

create or replace function app_private.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  safe_name text := left(coalesce(nullif(trim(new.raw_user_meta_data->>'name'),''),'New member'),100);
  safe_photo text := nullif(left(coalesce(new.raw_user_meta_data->>'photo',''),2048),'');
begin
  insert into public.profiles(id,email,name,photo)
    values(new.id,new.email,safe_name,safe_photo);
  insert into app_private.user_roles(user_id) values(new.id);
  return new;
end
$$;

create or replace function app_private.validate_application_transition()
returns trigger language plpgsql security definer set search_path = '' as $$
declare admin_actor boolean := app_private.is_admin();
begin
  if new.user_id <> old.user_id then
    raise exception using errcode='42501', message='application owner is immutable';
  end if;
  if admin_actor then
    if not (
      new.status = old.status
      or (old.status='submitted' and new.status in ('in_review','changes_requested','rejected'))
      or (old.status='in_review' and new.status in ('changes_requested','approved','rejected'))
    ) then raise exception using errcode='42501', message='invalid reviewer transition'; end if;
  elsif old.user_id = (select auth.uid()) then
    if not (
      (old.status in ('draft','changes_requested') and new.status=old.status)
      or (old.status in ('draft','changes_requested') and new.status='submitted')
    ) then raise exception using errcode='42501', message='invalid applicant transition'; end if;
    if new.status='submitted' and old.status<>new.status then
      new.submitted_at=statement_timestamp();
    end if;
  else
    raise exception using errcode='42501', message='application transition denied';
  end if;
  return new;
end
$$;

create or replace function app_private.apply_review_decision()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  review app_private.teacher_application_reviews%rowtype;
  teacher_uuid uuid;
begin
  if new.status=old.status or new.status not in ('approved','rejected','changes_requested') then
    return new;
  end if;
  if not app_private.is_admin() then
    raise exception using errcode='42501', message='review decision denied';
  end if;
  select * into review from app_private.teacher_application_reviews
    where application_id=new.id for update;
  if not found or review.reviewed_by <> (select auth.uid()) or review.reviewed_at is null then
    raise exception using errcode='23514', message='complete review record required';
  end if;
  if new.status='approved' and review.tier is null then
    raise exception using errcode='23514', message='approval tier required';
  end if;
  if new.status='approved' then
    insert into public.teachers(user_id,name,languages,specialties,bio,tagline)
    values(new.user_id,coalesce(new.display_name,'Approved teacher'),new.languages,new.experience_types,new.bio,new.headline)
    on conflict(user_id) do update set
      name=excluded.name,languages=excluded.languages,specialties=excluded.specialties,
      bio=excluded.bio,tagline=excluded.tagline,updated_at=statement_timestamp()
    returning id into teacher_uuid;
    insert into app_private.teacher_verifications(
      teacher_id,application_id,verified,status,tier,verification_date,updated_at)
    values(teacher_uuid,new.id,true,'active',review.tier,statement_timestamp(),statement_timestamp())
    on conflict(teacher_id) do update set
      application_id=excluded.application_id,verified=true,status='active',
      tier=excluded.tier,verification_date=excluded.verification_date,
      updated_at=excluded.updated_at;
    update app_private.user_roles set role='teacher',updated_at=statement_timestamp()
      where user_id=new.user_id and role<>'admin';
  end if;
  insert into public.teacher_application_decisions(
    application_id,tier,decision_reason,reviewed_at,updated_at)
  values(new.id,review.tier,review.decision_reason,review.reviewed_at,statement_timestamp())
  on conflict(application_id) do update set
    tier=excluded.tier,decision_reason=excluded.decision_reason,
    reviewed_at=excluded.reviewed_at,updated_at=excluded.updated_at;
  insert into app_private.admin_audit_log(admin_id,action,target_type,target_id,detail)
    values((select auth.uid()),'application_'||new.status,'teacher_application',new.id,
      jsonb_build_object('from',old.status,'to',new.status));
  return new;
end
$$;

create or replace function app_private.enforce_verified_publish()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status='published' and not exists (
    select 1 from app_private.teacher_verifications
    where teacher_id=new.teacher_id and verified and status='active'
  ) then raise exception using errcode='42501', message='teacher is not verified and active'; end if;
  return new;
end
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function app_private.touch_updated_at();
create trigger profiles_sync_card after insert or update of name,photo,avatar,points,level
  on public.profiles for each row execute function app_private.sync_profile_card();
create trigger auth_user_profile after insert on auth.users
  for each row execute function app_private.handle_new_user();
create trigger teacher_applications_touch before update on public.teacher_applications
  for each row execute function app_private.touch_updated_at();
create trigger teacher_applications_transition before update on public.teacher_applications
  for each row execute function app_private.validate_application_transition();
create trigger teacher_applications_decision after update of status on public.teacher_applications
  for each row execute function app_private.apply_review_decision();
create trigger teachers_touch before update on public.teachers
  for each row execute function app_private.touch_updated_at();
create trigger experiences_touch before update on public.experiences
  for each row execute function app_private.touch_updated_at();
create trigger trg_enforce_verified_publish before insert or update of status,teacher_id
  on public.experiences for each row execute function app_private.enforce_verified_publish();
create trigger bookings_touch before update on public.bookings
  for each row execute function app_private.touch_updated_at();

revoke all on all tables in schema public from public, anon, authenticated, service_role;
revoke all on all tables in schema app_private from public, anon, authenticated, service_role;
grant select,insert,update,delete on all tables in schema public to service_role;
grant select,insert,update,delete on all tables in schema app_private to service_role;

grant select on public.profile_cards,public.teachers,public.experiences to anon;
grant select on public.profiles,public.profile_cards,public.teacher_applications,
  public.teacher_application_decisions,public.teacher_documents,public.teachers,
  public.experiences,public.bookings to authenticated;
grant insert on public.teacher_applications,public.teacher_documents,public.teachers,
  public.experiences to authenticated;
grant update(name,photo,bio,avatar,user_type,goal,goal_minutes,interests,
  languages_learning,experience_types,onboarding_completed) on public.profiles to authenticated;
grant update(display_name,headline,bio,languages,experience_types,cities,teaches_online,
  teaches_in_person,social_links,background_check_consent,agreed_to_standards,status)
  on public.teacher_applications to authenticated;
grant update(name,photo,languages,specialties,bio,tagline,years_teaching)
  on public.teachers to authenticated;
grant update(title,description,language,city,status,teacher_id)
  on public.experiences to authenticated;
grant delete on public.teacher_applications,public.teacher_documents,
  public.teachers,public.experiences to authenticated;
grant select,insert,update on app_private.teacher_application_reviews to authenticated;
grant select on app_private.user_roles to authenticated;
grant select,update on app_private.teacher_verifications to authenticated;
grant select on app_private.admin_audit_log to authenticated;

create view api.teacher_application_reviews
with (security_invoker=true) as
select application_id,tier,rubric_scores,admin_notes,decision_reason,
  reviewed_by,reviewed_at,updated_at
from app_private.teacher_application_reviews;
create view api.my_application_decisions
with (security_invoker=true) as
select application_id,tier,decision_reason,reviewed_at
from public.teacher_application_decisions;
create view api.teacher_verifications
with (security_invoker=true) as
select teacher_id,application_id,verified,status,tier,verification_date,updated_at
from app_private.teacher_verifications;
create view api.admin_audit_log
with (security_invoker=true) as
select id,admin_id,action,target_type,target_id,detail,created_at
from app_private.admin_audit_log;
create view api.current_user_role
with (security_invoker=true) as
select user_id,role from app_private.user_roles;
revoke all on all tables in schema api from public,anon,authenticated,service_role;
grant select,insert,update on api.teacher_application_reviews to authenticated;
grant select on api.my_application_decisions,api.teacher_verifications,
  api.admin_audit_log,api.current_user_role to authenticated;

alter table public.profiles enable row level security;
alter table public.profile_cards enable row level security;
alter table public.teacher_applications enable row level security;
alter table public.teacher_application_decisions enable row level security;
alter table public.teacher_documents enable row level security;
alter table public.teachers enable row level security;
alter table public.experiences enable row level security;
alter table public.bookings enable row level security;
alter table app_private.user_roles enable row level security;
alter table app_private.teacher_application_reviews enable row level security;
alter table app_private.teacher_verifications enable row level security;
alter table app_private.admin_audit_log enable row level security;

create policy profiles_owner_select on public.profiles for select to authenticated
  using ((select auth.uid())=id);
create policy profiles_admin_select on public.profiles for select to authenticated
  using ((select app_private.is_admin()));
create policy profiles_owner_update on public.profiles for update to authenticated
  using ((select auth.uid())=id) with check ((select auth.uid())=id);
create policy profile_cards_public_select on public.profile_cards for select to anon,authenticated
  using (true);
create policy user_roles_owner_select on app_private.user_roles for select to authenticated
  using ((select auth.uid())=user_id);
create policy user_roles_admin_select on app_private.user_roles for select to authenticated
  using ((select app_private.is_admin()));

create policy applications_owner_select on public.teacher_applications for select to authenticated
  using ((select auth.uid())=user_id);
create policy applications_admin_select on public.teacher_applications for select to authenticated
  using ((select app_private.is_admin()));
create policy applications_owner_insert on public.teacher_applications for insert to authenticated
  with check ((select auth.uid())=user_id and status='draft');
create policy applications_owner_update on public.teacher_applications for update to authenticated
  using ((select auth.uid())=user_id and status in ('draft','changes_requested'))
  with check ((select auth.uid())=user_id and status in ('draft','changes_requested','submitted'));
create policy applications_admin_update on public.teacher_applications for update to authenticated
  using ((select app_private.is_admin())) with check ((select app_private.is_admin()));
create policy applications_owner_delete on public.teacher_applications for delete to authenticated
  using ((select auth.uid())=user_id and status='draft');

create policy reviews_admin_all on app_private.teacher_application_reviews
  for all to authenticated using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));
create policy decisions_owner_select on public.teacher_application_decisions
  for select to authenticated using (exists (
    select 1 from public.teacher_applications a
    where a.id=application_id and a.user_id=(select auth.uid())
  ));
create policy decisions_admin_select on public.teacher_application_decisions
  for select to authenticated using ((select app_private.is_admin()));
create policy docs_owner_select on public.teacher_documents for select to authenticated
  using ((select auth.uid())=user_id);
create policy docs_admin_select on public.teacher_documents for select to authenticated
  using ((select app_private.is_admin()));
create policy docs_owner_insert on public.teacher_documents for insert to authenticated
  with check ((select auth.uid())=user_id and exists (
    select 1 from public.teacher_applications a
    where a.id=application_id and a.user_id=(select auth.uid())
      and a.status in ('draft','changes_requested')
  ));
create policy docs_owner_delete on public.teacher_documents for delete to authenticated
  using ((select auth.uid())=user_id and exists (
    select 1 from public.teacher_applications a
    where a.id=application_id and a.user_id=(select auth.uid())
      and a.status in ('draft','changes_requested')
  ));

create policy teachers_public_select on public.teachers for select to anon,authenticated
  using ((select app_private.is_teacher_eligible(id)));
create policy teachers_owner_select on public.teachers for select to authenticated
  using ((select auth.uid())=user_id);
create policy teachers_owner_insert on public.teachers for insert to authenticated
  with check ((select auth.uid())=user_id);
create policy teachers_owner_update on public.teachers for update to authenticated
  using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy teachers_owner_delete on public.teachers for delete to authenticated
  using ((select auth.uid())=user_id and not (select app_private.is_teacher_eligible(id)));
create policy teachers_admin_all on public.teachers for all to authenticated
  using ((select app_private.is_admin())) with check ((select app_private.is_admin()));

create policy experiences_public_select on public.experiences for select to anon,authenticated
  using (status='published' and (select app_private.is_teacher_eligible(teacher_id)));
create policy experiences_owner_select on public.experiences for select to authenticated
  using (exists(select 1 from public.teachers t where t.id=teacher_id and t.user_id=(select auth.uid())));
create policy experiences_admin_select on public.experiences for select to authenticated
  using ((select app_private.is_admin()));
create policy experiences_owner_insert on public.experiences for insert to authenticated
  with check (status='draft' and exists(
    select 1 from public.teachers t where t.id=teacher_id and t.user_id=(select auth.uid())
  ));
create policy experiences_owner_update on public.experiences for update to authenticated
  using (exists(select 1 from public.teachers t where t.id=teacher_id and t.user_id=(select auth.uid())))
  with check (exists(select 1 from public.teachers t where t.id=teacher_id and t.user_id=(select auth.uid())));
create policy experiences_owner_delete on public.experiences for delete to authenticated
  using (exists(select 1 from public.teachers t where t.id=teacher_id and t.user_id=(select auth.uid())));
create policy experiences_admin_update on public.experiences for update to authenticated
  using ((select app_private.is_admin())) with check ((select app_private.is_admin()));

create policy bookings_owner_select on public.bookings for select to authenticated
  using ((select auth.uid())=student_id);
create policy bookings_host_select on public.bookings for select to authenticated
  using (exists (
    select 1 from public.experiences e join public.teachers t on t.id=e.teacher_id
    where e.id=experience_id and t.user_id=(select auth.uid())
  ));
create policy bookings_admin_select on public.bookings for select to authenticated
  using ((select app_private.is_admin()));
create policy verifications_admin_select on app_private.teacher_verifications for select to authenticated
  using ((select app_private.is_admin()));
create policy verifications_admin_update on app_private.teacher_verifications for update to authenticated
  using ((select app_private.is_admin())) with check ((select app_private.is_admin()));
create policy audit_admin_select on app_private.admin_audit_log for select to authenticated
  using ((select app_private.is_admin()));

revoke all on function app_private.touch_updated_at() from public,anon,authenticated,service_role;
revoke all on function app_private.sync_profile_card() from public,anon,authenticated,service_role;
revoke all on function app_private.handle_new_user() from public,anon,authenticated,service_role;
revoke all on function app_private.validate_application_transition() from public,anon,authenticated,service_role;
revoke all on function app_private.apply_review_decision() from public,anon,authenticated,service_role;
revoke all on function app_private.enforce_verified_publish() from public,anon,authenticated,service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values
 ('verification-docs','verification-docs',false,10485760,array['image/jpeg','image/png','application/pdf']),
 ('teacher-portfolio','teacher-portfolio',false,52428800,array['image/jpeg','image/png','video/mp4','application/pdf'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

create policy aro_docs_owner_insert on storage.objects for insert to authenticated
  with check (
    bucket_id in ('verification-docs','teacher-portfolio')
    and (storage.foldername(name))[1]=(select auth.uid())::text
    and exists (
      select 1 from public.teacher_applications a
      where a.id::text=(storage.foldername(name))[2]
        and a.user_id=(select auth.uid())
        and a.status in ('draft','changes_requested')
    )
  );
create policy aro_docs_owner_select on storage.objects for select to authenticated
  using (
    bucket_id in ('verification-docs','teacher-portfolio')
    and (storage.foldername(name))[1]=(select auth.uid())::text
  );
create policy aro_docs_admin_select on storage.objects for select to authenticated
  using (bucket_id in ('verification-docs','teacher-portfolio') and (select app_private.is_admin()));
create policy aro_docs_owner_delete on storage.objects for delete to authenticated
  using (
    bucket_id in ('verification-docs','teacher-portfolio')
    and (storage.foldername(name))[1]=(select auth.uid())::text
  );
