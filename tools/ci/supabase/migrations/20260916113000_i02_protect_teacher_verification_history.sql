-- ARO I0.2 protected teacher-verification history repair.
-- Append-only, synthetic disposable-CI scope only; no hosted or production target.

-- Direct owners may remove only unreviewed teacher drafts. Any verification
-- history, including suspended or banned history, stays protected for the
-- separate support/retention process.
create or replace function app_private.can_delete_teacher_without_verification_history(target_teacher uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.teachers teacher
    where teacher.id = target_teacher
      and teacher.user_id = (select auth.uid())
  )
  and not exists (
    select 1
    from app_private.teacher_verifications verification
    where verification.teacher_id = target_teacher
  );
$$;

revoke all on function app_private.can_delete_teacher_without_verification_history(uuid)
  from public, anon, authenticated, service_role;
grant execute on function app_private.can_delete_teacher_without_verification_history(uuid)
  to authenticated;

drop policy teachers_owner_delete on public.teachers;
create policy teachers_owner_delete on public.teachers for delete to authenticated
  using ((select app_private.can_delete_teacher_without_verification_history(id)));
