# N1 staging Auth checkpoint — 2026-09-26

This is a verification checkpoint, not an Auth release approval.

## Provider state

- Supabase project: `ARO.club Staging` (`mibydnerayobemhnlfyl`), active.
- Email sign-in and signups enabled; email confirmation required. Anonymous sign-ins and manual account linking disabled.
- Resend custom SMTP already delivered signup confirmation and password recovery emails to `hello@aro-club.app` (see `ARO-email-setup/artifacts/ARO-EMAIL0/VERIFICATION.md` in the sibling worktree).
- Test Auth user `hello@aro-club.app` exists, remains unconfirmed, and has a profile created by the database trigger.
- Google provider disabled; client ID and secret empty. The app's Google buttons are disabled and its handler returns a disabled message.
- Supabase Site URL and both redirect URLs still target the removed N1 Vercel preview (HTTP 410). Valid email links cannot complete against it.
- Two exact local test callbacks are also now allowed in Staging: `http://localhost:5173/auth/callback` and `http://localhost:5173/auth/callback?next=/auth/reset-password`. The Site URL still points to the removed preview; the N1 app supplies an explicit redirect URL for signup and recovery.
- Supabase Security Advisor reports `auth_leaked_password_protection` as WARN; leaked-password protection is disabled.

## Local browser checks

Ran the N1 checkout with `npm run dev:staging` on `http://localhost:5173`, using its existing ignored staging environment file.

| Check | Result |
| --- | --- |
| `/signup` shows enabled email form and disabled Google button | PASS |
| Invalid credentials on `/login` | PASS: `Invalid login credentials` |
| Invalid `/auth/callback?code=invalid` | PASS: `/auth/error` with recovery action |
| Anonymous `/admin` | PASS: redirected to `/login?next=%2Fadmin` |
| `npm run type-check` | PASS |
| `npm run build` and `npm run lint` | PASS |
| Targeted callback Vitest run | PASS: 6 tests, run with filesystem access after the sandbox denied Vitest's config read |

## Confirmed account and callback repair

- The founder signed up as `support@aro-club.app`. Supabase confirms this user has a verified email address, a successful sign-in, and an automatically created `public.profiles` row. The email/password login and protected `/profile` route open.
- The original confirmation email used `{{ .ConfirmationURL }}`. Supabase confirmed the email, then the local Next.js callback returned `/auth/error` when its server-side exchange failed. The local Node process was running inside a network sandbox that later produced `EACCES` on a direct Supabase request; this explains the callback failure while browser email/password login still worked. The original exchange was not independently retried after restoring network access.
- Supabase Staging confirmation and recovery templates now link directly to the app callback using `{{ .RedirectTo }}?token_hash={{ .TokenHash }}` with `type=email` or `type=recovery`. The recovery request in the app now sets its redirect to `/auth/callback` without an existing query string. The callback's own failure log records only an error name/code/status. Next.js development access logs can still contain request URLs and must not be published with live one-time tokens.
- A fresh recovery email was delivered by Resend to the Zoho alias. Its link used the new local callback and `type=recovery`. With the local Next.js server allowed to reach Supabase, the first visit opened `/auth/reset-password`; the second visit to the same one-time link opened `/auth/error` as expected. No password was changed during this verification.
- The first attempt with the corrected recovery template still failed because the shell sandbox denied outbound Node requests (`fetch failed`, `EACCES`). The same read-only Supabase health request succeeded outside that network sandbox (HTTP 401 without credentials), and restarting only the local staging server with network access resolved the callback test failure. This is a local test-environment restriction, not an Auth provider outage.
- `npm run type-check`, `npm run lint`, `npm run build`, and all 6 targeted callback tests pass after the repair. A new signup confirmation link was not issued; the callback's `type=email` path is covered by a targeted test, while hosted signup remains unverified.
- A separate profile-role lookup currently reports `PGRST106` because the `api` schema is not exposed by the staging Data API. The account is authenticated and its profile row exists, but full role-aware app behavior is not verified. Do not expand Data API schema exposure without its own security review.

## Remaining gates

1. Complete a fresh signup-confirmation callback and the final password-change/login step with a founder-controlled staging account. The founder enters or changes the test password and accepts the app's terms personally. Preserve the now-verified single-use recovery behavior.
2. Obtain a stable live N1 staging URL and align Supabase Site URL plus exact signup/recovery callback allow-list with it before hosted verification. Do not use `aro-club.app` or the production Supabase project for this test.
3. Create a dedicated Google OAuth package and Google Cloud web OAuth client, configure the staging Supabase Google provider, wire the app handler, and verify the account/profile/role behavior. Google Cloud currently requires owner password re-verification before setup can continue.
4. Repair the staging role lookup/Data API exposure boundary, review the Security Advisor password-protection warning, and obtain the required independent security/privacy review before merge.

## 2026-09-26 N1/F7 gate audit

- The separate governed N1 rollout PR #54 is already merged. This local `codex/nextjs-migration` checkout remains an uncommitted, partially verified implementation; its local Auth results do not establish that a Vercel staging deployment uses these bytes.
- The intended `api.current_user_role` view is `security_invoker=true`; `app_private.user_roles` has owner/admin SELECT policies. Staging Data API exposes only `public, graphql_public`, causing the app's `api` role request to fail with `PGRST106`. The `api` schema also contains admin review, teacher verification, and application decision views. Do not expose that entire schema as a quick role-lookup repair; review all view grants and backing RLS first. `public.profiles.user_type` is user-updateable and cannot replace the authoritative role.
- F7 belongs to FV-1, not the N1 Auth package. PR #48 is still draft/conflicting and records no F7 measurement. Its prerequisite docs PR #47 is open. The first #47 `platform` run failed at `BROWSER_DOCUMENT_RETRY_CHOOSER_1440_DARK`; one failed-job retry was triggered on 2026-09-26. Retry attempt 2 passed the 91/91 pgTAP SQL assertions but failed at `reset-removes-accounts: UNEXPECTED_FAILURE`. Required `platform` CI is still red. No further rerun, merge, F7 measurement, or release claim was made.
