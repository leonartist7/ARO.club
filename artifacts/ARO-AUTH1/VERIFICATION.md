# ARO-AUTH1 verification — 2026-09-29

## Verified locally and through read-only provider probes

- Existing ARO Supabase project `mibydnerayobemhnlfyl`: ACTIVE_HEALTHY; `auth/v1/settings` reports Google and email enabled. The Google authorize endpoint redirects to `accounts.google.com` with a client ID and the project's own `/auth/v1/callback` URI.
- Database has two auth users and profiles, no experiences, bookings or teacher applications. Two migrations are recorded. No data or provider settings were changed.
- `npm ci --ignore-scripts`, `npm run lint`, `npm run type-check`, ordinary and production-flag `npm run build` pass. Full Vitest: 192 pass, 3 existing skips. Focused auth/callback/config: 10 pass.
- Headless Chromium against a local Next production build with the existing project and preview-scoped variables: `/login` and `/signup` show enabled Google and email controls with no unavailable disclosure. Clicking Google requests Supabase OAuth with the exact local same-origin `/auth/callback` redirect. The provider request is observed, not completed with a Google identity.
- `allowedAuthTarget` tests assert that the existing ARO ref is denied by default in production, enabled only with the explicit promotion switch and exact match, and quarantined refs remain denied.

## Still required for a production claim

- Verify Supabase Site URL and exact callback/recovery allowlist, Google client audience and consent, and SMTP sender through authenticated dashboard access.
- Add Production-scoped Vercel environment variables and rebuild; the connected Vercel tool exposes deployments but cannot manage environment variables, while the dashboard browser is at a sign-in wall.
- Test email confirmation/recovery delivery, password login, Google consent/callback, session refresh, logout and role/RLS behavior on the hosted public origin. No live identity or inbox was used in local tests.
- Independent security/privacy review and the newer rebrand stack's open release review gates remain pending before `main` release.
