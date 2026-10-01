# ARO-AUTH2 — Account deletion request entry

## 0. Metadata

- **Status:** SPEC-READY for the request-entry scope only under the founder's 2026-10-01 approval; PR #97 implementation and isolated CI are verified, independent security/privacy follow-up pending. Production release blocked.
- **Spec version:** 1.0.0, 2026-10-01
- **Owner:** ARO founder
- **Depends on:** AUTH1 hosted email and Google verification; existing I0 Auth/RLS baseline
- **Governing documents:** `AGENTS.md`, `DECISIONS.md` ADR-032, `ARO_BUILD_PLAYBOOK.md`, `ARO_TRUST_SAFETY.md`, `ARO_DATA_MODEL.md`, `specs/ARO-AUTH1-ACCOUNT-ENTRY.md`
- **Required review:** independent security/privacy review before implementation merge and production migration

## 1. Problem and outcome

Production web signup exists, but the site offers no account deletion request. A store app needs a discoverable in-app deletion path and a public deletion web resource. The repository presently contains a Next.js web app, with no iOS or Android application to test.

The outcome for this bounded package is that a signed-in user can initiate one account deletion request and see its status from a public web entry point or account settings. This is the initiation step, not automatic erasure or an assertion of store readiness.

## 2. Baseline evidence (read-only, 2026-09-30)

- Existing project: `mibydnerayobemhnlfyl`; two auth users, zero bookings and zero Storage objects at inspection time. Do not treat those counts as a permanent deletion guarantee.
- `profiles.id` cascades from `auth.users.id`, but `bookings.student_id` restricts profile deletion. Several teacher records cascade; audit reviewer IDs become null. Storage ownership can block Supabase user deletion. Unexpired JWTs may remain valid after deleting an auth user.
- `/signup` accepts name, email, password or Google; the age question in the onboarding preview is local-only. `/settings` is a synthetic preview, and `/privacy` says account deletion requests are not yet available.
- Supabase security advisor warns that leaked-password protection is disabled. The dashboard setting requires separate configuration and verification.
- AUTH1-04 through AUTH1-06 remain pending hosted journey and independent review evidence.

## 3. Locked scope, permissions and behavior

1. A public `/account/delete` page explains the request and links an unauthenticated visitor to sign-in. A signed-in user checks a confirmation box, submits once, and can return to read the open request's status. The account settings page links to it. It must never claim that account data has already been erased.
2. A new `public.account_deletion_requests` row contains only a generated request ID, user ID, status, request time and optional processing time. No free-text reason, date of birth, email copy, analytics event, or new client dependency. A partial unique index permits at most one pending/processing request per user.
3. RLS permits authenticated owners to insert their own pending request and select their own rows. Column grants prevent client-supplied status/timestamps. Other users and anonymous callers cannot read, update, or process a request. Only a privileged server operator can change its status. Auth user deletion must not be blocked by the request row. A privileged operator may purge resolved records only after 30 days; the processing package must schedule and monitor that purge. Any legal retention exception needs a separate approved basis and controlled archive, not indefinite retention in this table.
4. The public privacy notice accurately describes request initiation and possible dependency/retention review. A request is not a deletion guarantee. No production schema or public promise is released until processing ownership and independent review are in place.

## 4. Explicit next packages and release gates

| ID | Decision | Proposed default | Why it matters |
|---|---|---|---|
| G1 | Adult eligibility | A separate server-enforced email and Google eligibility package must specify pre/post-OAuth behavior and existing-user migration. A browser checkbox alone is insufficient. |
| G2 | Actual deletion processing | A privileged worker and operator must resolve bookings, teacher/Storage files, audit/legal retention, revocation, retry, completion notification, and a monitored purge of resolved request rows after 30 days. `bookings.student_id ON DELETE RESTRICT` prevents naive deletion. |
| G3 | Operations | A monitored request queue and published processing timeframe must exist before releasing this UI to production. The current contact page saves an unsent draft only. |
| G4 | Store builds | Identify the iOS/Android application; verify native OAuth callback, deletion path, store metadata, and Apple's equivalent login requirement for iOS Google sign-in. |
| G5 | AUTH1 and OAuth return | Complete hosted email confirmation/recovery and Google callback tests and independent security review. Allowlist the exact production `/auth/callback?next=%2Faccount%2Fdelete` redirect in Supabase before relying on Google return to this page. |

## 5. Security and reliability acceptance

| ID | Requirement and test evidence | Status |
|---|---|---|
| AUTH2-01 | Owner insert/select, duplicate, forged owner/status, anonymous/other-user denial, Auth user deletion compatibility and purge guard in disposable database | 16 assertions locally added; exact-head isolated CI pending |
| AUTH2-02 | Public route and settings link show loading, signed-out, confirmation, pending, and recoverable error states | IMPLEMENTED; local unit/build and Quality run `36843716537` pass; hosted authenticated journey pending |
| AUTH2-03 | Privacy copy matches actual request behavior and makes no immediate erasure promise | IMPLEMENTED; independent privacy acceptance pending |
| AUTH2-04 | Production queue owner, processing path and timeframe, hosted request test, independent review | PENDING |

## 6. Rollout boundary

Keep AUTH1 and AUTH2 statuses separate. Build in this isolated branch with disposable Supabase data and an append-only migration. Apply the migration before releasing the UI. On failure, roll back the UI and keep submitted requests for processing; never drop the table to roll back. Do not apply a live migration or claim store readiness until AUTH2-04 and G1–G5 are resolved. A temporary public-signup pause, if approved and applied, does not replace these requirements.
