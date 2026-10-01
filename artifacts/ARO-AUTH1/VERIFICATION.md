# ARO-AUTH1 verification — 2026-09-30

## Verified locally and through read-only provider probes

- Existing ARO Supabase project `mibydnerayobemhnlfyl`: ACTIVE_HEALTHY; `auth/v1/settings` reports Google and email enabled. The Google authorize endpoint redirects to `accounts.google.com` with a client ID and the project's own `/auth/v1/callback` URI.
- Database has two auth users and profiles, no experiences, bookings or teacher applications. Two migrations are recorded. No data or provider settings were changed.
- `npm ci --ignore-scripts`, `npm run lint`, `npm run type-check`, ordinary and production-flag `npm run build` pass. Full Vitest: 192 pass, 3 existing skips. Focused auth/callback/config: 10 pass.
- Headless Chromium against a local Next production build with the existing project and preview-scoped variables: `/login` and `/signup` show enabled Google and email controls with no unavailable disclosure. Clicking Google requests Supabase OAuth with the exact local same-origin `/auth/callback` redirect. The provider request is observed, not completed with a Google identity.
- `allowedAuthTarget` tests assert that the existing ARO ref is denied by default in production, enabled only with the explicit promotion switch and exact match, and quarantined refs remain denied.

## Production configuration inspected on 2026-09-30

- The Vercel `aro-club` project serves `aro-club.app` from `main`. Five Production-scoped variables were saved: the production account switch, exact existing project ref, explicit promotion switch, Supabase URL and active publishable key. Existing Preview variables are separate. Vercel confirms a new deployment is needed for changes to take effect.
- Supabase's existing project has Site URL `https://aro-club.app`; exact production `/auth/callback` was already allowed. The exact recovery callback with `?next=/auth/reset-password` was added, though AUTH1 now uses the query-free callback for reset requests so the email template can append its token safely.
- Supabase allows signups, requires email confirmation, and shows Email and Google enabled. The Google provider has a web client ID and the expected `https://mibydnerayobemhnlfyl.supabase.co/auth/v1/callback`; skip-nonce checks remain off.
- Custom SMTP is enabled with Resend host `smtp.resend.com`, port 465, sender `notifications@aro-club.app`, sender name ARO. The sending domain is verified in Resend and account emails were delivered on 2026-09-26. Confirmation and recovery templates use `{{ .RedirectTo }}?token_hash={{ .TokenHash }}` with matching email/recovery types.
- The recovered template exposed an integration bug: a reset redirect with its own `?next=` produces a malformed query when the template appends `?token_hash=`. AUTH1 now supplies a query-free callback; the route already redirects verified `type=recovery` tokens to the password form. Focused auth/callback tests (8), lint, type check and a merged RB17+AUTH1 Next production build pass.
- Supabase's leaked-password protection is disabled and its dashboard says the control is available only on Pro and above; this project is on Free. Do not describe this advisor as cleared.

## Still required for a production claim

- Verify Google consent/audience in the Google Console and finish a real provider callback. Provider configuration alone does not prove this journey.
- Merge the corrected AUTH1 branch after the new required GitHub checks pass, then let Vercel rebuild Production with the saved variables.
- Test email confirmation/recovery delivery, password login, Google consent/callback, session refresh, logout and role/RLS behavior on the hosted public origin. No live identity or inbox was used in local tests.
- Independent Codex review findings were addressed in `a31bf96`; the newer recovery fix and merged main tree await fresh CI/review. Hosted and privacy/security sign-off remains pending for a VERIFIED claim.
