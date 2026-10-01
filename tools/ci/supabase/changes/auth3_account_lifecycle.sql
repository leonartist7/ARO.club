-- AUTH3 append-only SQL. Generate a new migration with the pinned Supabase
-- CLI before copying this reviewed payload; never edit an existing migration.
create table app_private.account_eligibility (
  user_id uuid primary key references auth.users(id) on delete cascade,
  confirmed_at timestamptz not null default statement_timestamp(),
  terms_version text not null default '2026-10-01' check (terms_version = '2026-10-01')
);
create table app_private.account_deletion_jobs (
  request_id uuid primary key references public.account_deletion_requests(id) on delete cascade,
  receipt_hash text not null check (receipt_hash ~ '^[0-9a-f]{64}$'),
  -- Retained without an Auth FK until resolved-request purge, so orphan cleanup is possible.
  target_user_id uuid,
  receipt_ready boolean not null default false,
  storage_cleaned_at timestamptz,
  lease_token uuid,
  lease_until timestamptz,
  attempts integer not null default 0 check (attempts >= 0),
  error_code text check (error_code in ('bookings_review','trust_review','identity_review','storage_error','auth_error','worker_error'))
);
alter table app_private.account_eligibility enable row level security;
alter table app_private.account_deletion_jobs enable row level security;
revoke all on app_private.account_eligibility, app_private.account_deletion_jobs from public, anon, authenticated, service_role;
insert into app_private.account_deletion_jobs(request_id,target_user_id,receipt_hash)
  select id,user_id,encode(extensions.gen_random_bytes(32),'hex') from public.account_deletion_requests;
-- Old requests cannot process until the owner receives a usable receipt.

create function app_private.auth3_current_session() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from auth.sessions s
    where s.id::text = (select auth.jwt()->>'session_id')
      and s.user_id = (select auth.uid())
      and (s.not_after is null or s.not_after > statement_timestamp())
  ) and not exists (
    select 1 from public.account_deletion_requests r
    where r.user_id = (select auth.uid()) and r.status = 'processing'
  );
$$;
create function app_private.auth3_eligible(target_user uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from app_private.account_eligibility e where e.user_id = target_user)
    and not exists (select 1 from public.account_deletion_requests r where r.user_id=target_user and r.status='processing');
$$;
create function app_private.auth3_teacher_eligible(target_teacher uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.teachers t join app_private.account_eligibility e
    on e.user_id = t.user_id where t.id = target_teacher and app_private.auth3_eligible(t.user_id));
$$;
create function app_private.auth3_access_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('active',app_private.auth3_current_session(),
    'eligible',app_private.auth3_eligible((select auth.uid())),
    'deleting',exists(select 1 from public.account_deletion_requests r
      where r.user_id = (select auth.uid()) and r.status='processing'));
$$;
create function app_private.auth3_confirm_adult(birth_date date) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not app_private.auth3_current_session() then
    raise exception using errcode='42501', message='active session required';
  end if;
  if birth_date is null or birth_date > current_date - interval '18 years'
    or birth_date < current_date - interval '120 years' then
    raise exception using errcode='22023', message='adult eligibility required';
  end if;
  insert into app_private.account_eligibility(user_id) values ((select auth.uid()))
    on conflict (user_id) do nothing;
end;
$$;

-- Restrictive policies add to, and never replace, existing owner/Trust rules.
do $$ declare tab text; begin
  foreach tab in array array['public.profiles','public.profile_cards','public.teacher_applications',
    'public.teacher_application_decisions','public.teacher_documents','public.teachers',
    'public.experiences','public.bookings','app_private.user_roles',
    'app_private.teacher_application_reviews','app_private.teacher_verifications','app_private.admin_audit_log',
    'storage.objects'] loop
    execute format('create policy auth3_live_adult on %s as restrictive for all to authenticated
      using ((select app_private.auth3_current_session()) and (select app_private.auth3_eligible(auth.uid())))
      with check ((select app_private.auth3_current_session()) and (select app_private.auth3_eligible(auth.uid())))',tab);
  end loop;
end $$;
create policy auth3_live_deletion on public.account_deletion_requests as restrictive
  for all to authenticated using ((select app_private.auth3_current_session()))
  with check ((select app_private.auth3_current_session()));
create policy auth3_public_adult_cards on public.profile_cards as restrictive
  for select to anon, authenticated using (app_private.auth3_eligible(id));
create policy auth3_public_adult_teachers on public.teachers as restrictive
  for select to anon, authenticated using (app_private.auth3_eligible(user_id));
create policy auth3_public_adult_experiences on public.experiences as restrictive
  for select to anon, authenticated using (app_private.auth3_teacher_eligible(teacher_id));

create function app_private.auth3_request_deletion(receipt_hash text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare req_id uuid;
begin
  if not app_private.auth3_current_session() or not exists (
    select 1 from auth.sessions s where s.id::text=(select auth.jwt()->>'session_id')
      and s.user_id=(select auth.uid()) and s.created_at > statement_timestamp()-interval '15 minutes'
  ) then raise exception using errcode='42501',message='recent sign-in required'; end if;
  if receipt_hash is null or receipt_hash !~ '^[0-9a-f]{64}$' then
    raise exception using errcode='22023',message='invalid receipt';
  end if;
  -- Serialize repeats for one user, including requests created by AUTH2.
  perform pg_advisory_xact_lock(hashtextextended((select auth.uid())::text,33));
  select r.id into req_id from public.account_deletion_requests r
    where r.user_id=(select auth.uid()) and r.status in ('pending','processing') for update;
  if req_id is null then
    insert into public.account_deletion_requests(user_id) values ((select auth.uid())) returning id into req_id;
  end if;
  insert into app_private.account_deletion_jobs(request_id,target_user_id,receipt_hash,receipt_ready)
    values(req_id,(select auth.uid()),receipt_hash,true) on conflict (request_id)
      do update set receipt_hash=excluded.receipt_hash,receipt_ready=true;
  return req_id;
end;
$$;
-- Direct owner INSERT was AUTH2's temporary entry. AUTH3 requires the checked RPC.
revoke insert (user_id) on public.account_deletion_requests from authenticated;

create function app_private.auth3_claim_deletion(target_request uuid default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare job record; refusal text; token uuid;
begin
  select r.id,r.user_id,r.status,j.target_user_id,j.storage_cleaned_at into job from public.account_deletion_requests r
    join app_private.account_deletion_jobs j on j.request_id=r.id
    where r.status in ('pending','processing') and j.receipt_ready and (target_request is null or r.id=target_request)
      and (j.lease_until is null or j.lease_until <= statement_timestamp())
    order by r.requested_at limit 1 for update of j,r skip locked;
  if not found then return null; end if;
  if job.user_id is null and job.storage_cleaned_at is not null then
    update public.account_deletion_requests set status='completed' where id=job.id;
    update app_private.account_deletion_jobs set lease_token=null,lease_until=null,error_code=null where request_id=job.id;
    return jsonb_build_object('request_id',job.id,'completed',true);
  end if;
  if job.target_user_id is null then
    update app_private.account_deletion_jobs set error_code='identity_review',attempts=attempts+1,
      lease_until=statement_timestamp()+interval '1 day' where request_id=job.id;
    return jsonb_build_object('request_id',job.id,'blocked',true);
  end if;
  if exists(select 1 from public.bookings b where b.student_id=job.target_user_id
    or b.experience_id in (select e.id from public.experiences e join public.teachers t
      on t.id=e.teacher_id where t.user_id=job.target_user_id)) then refusal:='bookings_review';
  elsif exists(select 1 from app_private.teacher_verifications v join public.teachers t
      on t.id=v.teacher_id where t.user_id=job.target_user_id)
    or exists(select 1 from app_private.user_roles where user_id=job.target_user_id and role='admin')
    or exists(select 1 from app_private.admin_audit_log a where a.admin_id=job.target_user_id
      or a.target_id=job.target_user_id
      or a.target_id in (select id from public.teacher_applications where user_id=job.target_user_id)
      or a.target_id in (select id from public.teachers where user_id=job.target_user_id))
    or exists(select 1 from app_private.teacher_application_reviews v
      where v.reviewed_by=job.target_user_id or v.application_id in
        (select id from public.teacher_applications where user_id=job.target_user_id))
    then refusal:='trust_review';
  end if;
  if refusal is not null then
    update app_private.account_deletion_jobs set error_code=refusal,attempts=attempts+1,
      lease_until=statement_timestamp()+interval '1 day' where request_id=job.id;
    return jsonb_build_object('request_id',job.id,'blocked',true);
  end if;
  token:=gen_random_uuid();
  update app_private.account_deletion_jobs set lease_token=token,attempts=attempts+1,
    error_code=null,lease_until=statement_timestamp()+interval '10 minutes' where request_id=job.id;
  update public.account_deletion_requests set status='processing' where id=job.id;
  delete from auth.sessions where user_id=job.target_user_id;
  return jsonb_build_object('request_id',job.id,'user_id',job.target_user_id,'lease_token',token);
end;
$$;
create function app_private.auth3_deletion_objects(target_request uuid,token uuid)
returns table(bucket_id text,name text) language plpgsql stable security definer set search_path = '' as $$
begin
  if not exists(select 1 from app_private.account_deletion_jobs j
    join public.account_deletion_requests r on r.id=j.request_id
    where j.request_id=target_request and j.lease_token=token
      and j.lease_until>statement_timestamp() and r.status='processing') then
    raise exception using errcode='42501',message='deletion lease expired';
  end if;
  return query select o.bucket_id,o.name from storage.objects o
    join public.account_deletion_requests r on r.id=target_request
    join app_private.account_deletion_jobs j on j.request_id=r.id
    where j.lease_token=token and j.lease_until>statement_timestamp() and r.status='processing'
      and (o.owner_id=j.target_user_id::text or
        (o.bucket_id in ('verification-docs','teacher-portfolio') and split_part(o.name,'/',1)=j.target_user_id::text
          and (o.owner_id is null or o.owner_id=j.target_user_id::text)))
    order by o.bucket_id,o.name limit 100;
end;
$$;
create function app_private.auth3_mark_storage_clean(target_request uuid,token uuid) returns void
language plpgsql security definer set search_path = '' as $
begin
  -- Inventory verifies the lease and must find no remaining owned objects.
  if exists(select 1 from app_private.auth3_deletion_objects(target_request,token)) then
    raise exception using errcode='23514',message='storage cleanup incomplete';
  end if;
  update app_private.account_deletion_jobs set storage_cleaned_at=statement_timestamp()
    where request_id=target_request and lease_token=token and lease_until>statement_timestamp();
end;
$;
create function app_private.auth3_owner_status() returns jsonb
language sql stable security definer set search_path = '' as $
  select jsonb_build_object('status',r.status,'requested_at',r.requested_at,
    'processed_at',r.processed_at,'needs_confirmation',not j.receipt_ready)
  from public.account_deletion_requests r join app_private.account_deletion_jobs j on j.request_id=r.id
  where r.user_id=(select auth.uid()) and r.status in ('pending','processing')
    and app_private.auth3_current_session();
$;
create function app_private.auth3_finish_deletion(target_request uuid,token uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform 1 from app_private.account_deletion_jobs where request_id=target_request
    and lease_token=token and lease_until>statement_timestamp() for update;
  if not found then raise exception using errcode='42501',message='deletion lease expired'; end if;
  if exists(select 1 from public.account_deletion_requests where id=target_request and user_id is not null)
    then raise exception using errcode='23514',message='account still exists'; end if;
  if not exists(select 1 from app_private.account_deletion_jobs where request_id=target_request and storage_cleaned_at is not null)
    then raise exception using errcode='23514',message='storage cleanup unconfirmed'; end if;
  update public.account_deletion_requests set status='completed' where id=target_request;
  update app_private.account_deletion_jobs set lease_token=null,lease_until=null,error_code=null where request_id=target_request;
end;
$$;
create function app_private.auth3_fail_deletion(target_request uuid,token uuid,failure_code text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if failure_code not in ('storage_error','auth_error','worker_error') then
    raise exception using errcode='22023',message='invalid failure code'; end if;
  update app_private.account_deletion_jobs set error_code=failure_code,
    lease_until=statement_timestamp()+interval '10 minutes'
    where request_id=target_request and lease_token=token and lease_until>statement_timestamp();
end;
$$;
create function app_private.auth3_receipt_status(receipt_hash text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('status',r.status,'requested_at',r.requested_at,'processed_at',r.processed_at)
  from public.account_deletion_requests r join app_private.account_deletion_jobs j on j.request_id=r.id
  where j.receipt_hash=$1;
$$;
create function app_private.auth3_queue_health() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'waiting', count(*),
    'blocked', count(*) filter (where j.error_code in ('bookings_review','trust_review','identity_review')),
    'awaiting_receipt', count(*) filter (where not j.receipt_ready),
    'failed', count(*) filter (where j.error_code in ('storage_error','auth_error','worker_error')),
    'overdue', count(*) filter (where r.requested_at < statement_timestamp()-interval '29 days'))
  from public.account_deletion_requests r join app_private.account_deletion_jobs j on j.request_id=r.id
  where r.status in ('pending','processing');
$$;
create function app_private.auth3_purge_deletions() returns integer
language plpgsql security definer set search_path = '' as $$
declare removed integer;
begin
  delete from public.account_deletion_requests where status in ('completed','rejected')
    and processed_at<=statement_timestamp()-interval '30 days';
  get diagnostics removed=row_count;
  return removed;
end;
$$;

-- Publicly exposed API wrappers are invoker functions; privileged logic stays private.
create function api.account_deletion_owner_status() returns jsonb language sql security invoker set search_path='' as $ select app_private.auth3_owner_status(); $;
create function api.mark_account_deletion_storage_clean(target_request uuid,token uuid) returns void language sql security invoker set search_path='' as $ select app_private.auth3_mark_storage_clean(target_request,token); $;
create function api.account_access_status() returns jsonb language sql security invoker set search_path='' as $$ select app_private.auth3_access_status(); $$;
create function api.confirm_adult_eligibility(birth_date date) returns void language sql security invoker set search_path='' as $$ select app_private.auth3_confirm_adult(birth_date); $$;
create function api.request_account_deletion(receipt_hash text) returns uuid language sql security invoker set search_path='' as $$ select app_private.auth3_request_deletion(receipt_hash); $$;
create function api.claim_account_deletion(target_request uuid default null) returns jsonb language sql security invoker set search_path='' as $$ select app_private.auth3_claim_deletion(target_request); $$;
create function api.account_deletion_objects(target_request uuid,token uuid) returns table(bucket_id text,name text) language sql security invoker set search_path='' as $$ select * from app_private.auth3_deletion_objects(target_request,token); $$;
create function api.finish_account_deletion(target_request uuid,token uuid) returns void language sql security invoker set search_path='' as $$ select app_private.auth3_finish_deletion(target_request,token); $$;
create function api.fail_account_deletion(target_request uuid,token uuid,failure_code text) returns void language sql security invoker set search_path='' as $$ select app_private.auth3_fail_deletion(target_request,token,failure_code); $$;
create function api.account_deletion_receipt_status(receipt_hash text) returns jsonb language sql security invoker set search_path='' as $$ select app_private.auth3_receipt_status(receipt_hash); $$;
create function api.purge_account_deletions() returns integer language sql security invoker set search_path='' as $$ select app_private.auth3_purge_deletions(); $$;
create function api.account_deletion_queue_health() returns jsonb language sql security invoker set search_path='' as $$ select app_private.auth3_queue_health(); $$;

do $$ declare fn record; begin
  for fn in select p.oid::regprocedure as signature from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where (n.nspname='app_private' and p.proname like 'auth3_%') or
      (n.nspname='api' and p.proname in ('account_access_status','confirm_adult_eligibility','request_account_deletion',
        'claim_account_deletion','account_deletion_objects','finish_account_deletion','fail_account_deletion',
        'account_deletion_receipt_status','purge_account_deletions','account_deletion_queue_health',
        'account_deletion_owner_status','mark_account_deletion_storage_clean')) loop
    execute format('revoke all on function %s from public,anon,authenticated,service_role',fn.signature);
  end loop;
end $$;
grant usage on schema app_private to anon;
grant execute on function app_private.auth3_current_session(),app_private.auth3_access_status(),
  app_private.auth3_confirm_adult(date),app_private.auth3_request_deletion(text),
  api.account_access_status(),api.confirm_adult_eligibility(date),api.request_account_deletion(text),
  app_private.auth3_owner_status(),api.account_deletion_owner_status() to authenticated;
grant execute on function app_private.auth3_eligible(uuid),app_private.auth3_teacher_eligible(uuid) to anon,authenticated;
grant execute on function app_private.auth3_claim_deletion(uuid),app_private.auth3_deletion_objects(uuid,uuid),
  app_private.auth3_finish_deletion(uuid,uuid),app_private.auth3_fail_deletion(uuid,uuid,text),
  app_private.auth3_receipt_status(text),app_private.auth3_purge_deletions(),
  api.claim_account_deletion(uuid),api.account_deletion_objects(uuid,uuid),api.finish_account_deletion(uuid,uuid),
  api.fail_account_deletion(uuid,uuid,text),api.account_deletion_receipt_status(text),api.purge_account_deletions(),
  app_private.auth3_queue_health(),api.account_deletion_queue_health(),
  app_private.auth3_mark_storage_clean(uuid,uuid),api.mark_account_deletion_storage_clean(uuid,uuid) to service_role;
