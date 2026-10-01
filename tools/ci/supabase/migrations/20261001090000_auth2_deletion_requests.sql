-- AUTH2: an authenticated owner may initiate and inspect an account deletion
-- request. Processing is a separate privileged operation after dependency
-- and retention review; the client cannot mark its own request complete.
create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'rejected')),
  requested_at timestamptz not null default now(),
  processed_at timestamptz
);

create unique index account_deletion_requests_open_user_idx
  on public.account_deletion_requests(user_id)
  where status in ('pending', 'processing');

alter table public.account_deletion_requests enable row level security;

create policy account_deletion_requests_owner_select
  on public.account_deletion_requests for select to authenticated
  using ((select auth.uid()) = user_id);

create policy account_deletion_requests_owner_insert
  on public.account_deletion_requests for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and status = 'pending'
    and processed_at is null
  );

revoke all on public.account_deletion_requests from public, anon, authenticated, service_role;
grant select on public.account_deletion_requests to authenticated;
grant insert (user_id) on public.account_deletion_requests to authenticated;
grant select on public.account_deletion_requests to service_role;
grant update (status, processed_at) on public.account_deletion_requests to service_role;
