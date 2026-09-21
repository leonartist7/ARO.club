-- ARO I0.2 corrective repairs.
-- Append-only, synthetic disposable-CI scope only; no hosted or production target.

-- Applicants may prepare presentation details, but reputation remains server-derived.
revoke insert on public.teachers from authenticated;
grant insert (id,user_id,name,photo,languages,specialties,bio,tagline,years_teaching)
  on public.teachers to authenticated;

-- A reviewer may advance a permitted application state, never rewrite the
-- applicant's evidence or consent while doing so.
create or replace function app_private.reject_reviewer_application_field_changes()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if app_private.is_admin() and (
    new.display_name is distinct from old.display_name
    or new.headline is distinct from old.headline
    or new.bio is distinct from old.bio
    or new.languages is distinct from old.languages
    or new.experience_types is distinct from old.experience_types
    or new.cities is distinct from old.cities
    or new.teaches_online is distinct from old.teaches_online
    or new.teaches_in_person is distinct from old.teaches_in_person
    or new.social_links is distinct from old.social_links
    or new.background_check_consent is distinct from old.background_check_consent
    or new.agreed_to_standards is distinct from old.agreed_to_standards
  ) then
    raise exception using errcode = '42501', message = 'reviewer cannot change applicant-owned fields';
  end if;
  return new;
end
$$;

create trigger teacher_applications_reviewer_field_immutability
  before update on public.teacher_applications
  for each row execute function app_private.reject_reviewer_application_field_changes();

-- A review is attributed and timestamped by the database from the current
-- authenticated administrator, not by a browser-supplied identity or clock.
create or replace function app_private.canonicalize_teacher_application_review()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if not app_private.is_admin() then
    raise exception using errcode = '42501', message = 'review write denied';
  end if;
  new.reviewed_by := (select auth.uid());
  new.reviewed_at := statement_timestamp();
  return new;
end
$$;

create trigger teacher_application_reviews_canonicalize
  before insert or update on app_private.teacher_application_reviews
  for each row execute function app_private.canonicalize_teacher_application_review();

-- Submitted evidence remains private and owner-deletable only while the
-- application is still editable. Replace the inherited permissive policy.
drop policy aro_docs_owner_delete on storage.objects;
create policy aro_docs_owner_delete on storage.objects for delete to authenticated
  using (
    bucket_id in ('verification-docs','teacher-portfolio')
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.teacher_applications a
      where a.id::text = (storage.foldername(name))[2]
        and a.user_id = (select auth.uid())
        and a.status in ('draft','changes_requested')
    )
  );

revoke all on function app_private.reject_reviewer_application_field_changes()
  from public, anon, authenticated, service_role;
revoke all on function app_private.canonicalize_teacher_application_review()
  from public, anon, authenticated, service_role;
