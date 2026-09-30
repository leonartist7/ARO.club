# ARO-AUTH1 — Email and Google account entry

## 0. Metadata

- **Status:** SPEC-READY (founder approval 2026-09-29); implementation review in progress; production release BLOCKED pending hosted verification and independent security review
- **Spec version:** 1.0.0
- **Owner/director:** ARO founder, explicit account and production request on 2026-09-29
- **Implementation branch:** `codex/aro-auth-production-20260929`
- **Depends on:** N1 Next.js callback and isolated I0.2 Auth/RLS baseline
- **Governing docs:** `AGENTS.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_INFRASTRUCTURE.md`, `specs/ARO-N1-VERCEL-ROLLOUT.md`, `ARO_TRUST_SAFETY.md`
- **Required reviewers:** independent security/privacy reviewer before production merge and release

## 1–5. Problem, outcome, timing, goals and non-goals

The public account screen currently disables Google sign-in even though the existing ARO Supabase project advertises Google and email providers. Production account access also fails closed because the project was registered as staging. Users must be able to start Google OAuth or use email/password, receive confirmation/recovery links, and reach an authenticated session on the public origin. The founder chose `aro-club.app` as the final production domain in the 2026-09-29 account setup conversation; it supersedes N1's initial `aro-club.vercel.app` origin for this account release. Include both origins in the Supabase allowlist if the Vercel origin remains reachable, and test the canonical `aro-club.app` journey.

This package enables account entry on the existing ARO project by explicit production environment switches. It does not create another backend, add a new dependency, change schema/RLS/Trust, copy accounts, introduce payments, or release fictional experiences as live supply. The founder's 2026-09-29 request explicitly expands N1's earlier Google exclusion for this package.

## 6–15. Decisions, permissions and data boundaries

- The existing project `mibydnerayobemhnlfyl` stays the selected backend. Production requires **both** `NEXT_PUBLIC_ENABLE_PRODUCTION_ACCOUNTS=true` and `NEXT_PUBLIC_PROMOTE_EXISTING_ARO=true`, plus an exact URL/ref match and a publishable key. Other quarantined refs remain denied. Preview still requires its staging switch.
- Google uses Supabase's PKCE OAuth redirect to the same-origin `/auth/callback`. The server exchanges the one-time code and redirects to a validated relative path. No Google client secret enters the browser or Git.
- Email/password uses the existing Supabase sign-up, password, confirmation and recovery APIs. Email links return to the same callback. Supabase and server RLS remain authoritative for accounts, profile and roles.
- Users may read/update only data permitted by existing RLS; anonymous visitors cannot gain authenticated privileges through UI state. Google-created users have ordinary participant access until server-side roles say otherwise.
- Existing `auth.users` and `public.profiles` persist. No migration, new analytics, AI, money, retention or Trust behavior is introduced. Existing privacy/terms links remain visible. The existing backend has two accounts; production use shares that account store.

## 16–21. Journey, UI, accessibility, performance and failure behavior

1. The enabled `/login` and `/signup` screens offer Google and email actions. A disabled backend keeps all account actions unavailable with an explanatory message.
2. Google starts OAuth; the provider returns to `/auth/callback`; the server exchanges the code, writes a cookie session and returns to `/explore`. Invalid/expired callbacks land on `/auth/error`.
3. Email sign-up sends a confirmation link to the same callback. Password login redirects locally. Recovery uses the existing reset route. Provider errors remain visible and retryable.
4. Controls remain keyboard accessible with visible focus and existing responsive/light/dark behavior. The Google button has a descriptive accessible name and disabled state while pending.
5. No new client dependency or network request occurs until the user selects an account action. Existing account boundaries must remain fail closed if any production variable mismatches.

## 22–24. Measurement, tests and acceptance

No new analytics event is collected. Verify provider configuration without copying credentials or personal data.

| ID | Requirement | Verification | Evidence |
|---|---|---|---|
| AUTH1-01 | Google/email controls enabled only with valid environment | auth config tests and browser smoke on `/login`, `/signup` | `artifacts/ARO-AUTH1/VERIFICATION.md` |
| AUTH1-02 | Google begins OAuth on exact callback | provider mock test and live authorize redirect probe | `artifacts/ARO-AUTH1/VERIFICATION.md` |
| AUTH1-03 | Callback exchanges code, rejects external destinations/errors | existing callback tests | `artifacts/ARO-AUTH1/VERIFICATION.md` |
| AUTH1-04 | Email signup, confirmation, recovery, login and logout work on `aro-club.app` | hosted synthetic account and inbox browser journey | PENDING |
| AUTH1-05 | Google consent returns an authenticated session on `aro-club.app` | hosted human test on selected Google account | PENDING |
| AUTH1-06 | RLS, provider settings, and email delivery reviewed for public use | security review, advisors, SMTP/provider checks | PENDING |

## 25–30. Rollout, recovery and sign-off

Build with Production-scoped URL, publishable key, exact project ref and both production switches. Configure the Supabase Site URL `https://aro-club.app` and exact callback/recovery redirect URLs; the Google client must register `https://mibydnerayobemhnlfyl.supabase.co/auth/v1/callback`. Test signup/confirmation/recovery and Google consent on a nonpersonal synthetic account before release. If auth fails after deployment, revert production environment switches and redeploy the last verified build; preserve account records. Inspect auth errors without logging tokens or email addresses.

Independent security/privacy review and hosted proof are **PENDING**. This package cannot be marked VERIFIED or SHIPPED based on build/unit results alone.
