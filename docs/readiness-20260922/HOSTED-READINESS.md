# Hosted readiness — exact environment gap and rollout packet

2026-09-22 read-only observations. **PREPARED / NOT EXECUTED.** N1 remains owning package. This record does not authorize SQL copied from a disposable fixture to run on a hosted target.

## Observed state

- ARO.club Staging `mibydnerayobemhnlfyl`, region ca-central-1, ACTIVE_HEALTHY. No separate ARO production project appears in the connector inventory. Other projects remain untouched.
- Migration history: `20260903072838 application_trust_baseline`, `20260903074227 lock_public_default_privileges` only.
- Read-only catalogue: authenticated table INSERT on teachers=true; rating-column INSERT=true. Functions reject_reviewer_application_field_changes(), canonicalize_teacher_application_review(), can_delete_teacher_without_verification_history(uuid) are all absent.
- `aro_docs_owner_delete` checks bucket + owner path only; `teachers_owner_delete` checks owner + not currently eligible. These are the pre-corrective policies.
- Security advisor returned an empty lint list; catalogue evidence still proves the missing corrections.
- Dashboard Site URL: https://aro-club-git-codex-nextjs-vercel-rollout-lionovart.vercel.app. Exactly two redirects: `/auth/callback` and `/auth/callback?next=/auth/reset-password` at that origin. No wildcard.
- Dashboard Emails → SMTP Settings: custom SMTP toggle OFF. No provider password/key read. No authentication email sent or account created.
- Production alias aro-club.vercel.app maps to READY deployment dpl_9yTw523u4SEYYSLUEmWFnz3vV35E at f37dc084. This proves deployment, not enabled accounts or hosted acceptance.

## Staging rollout contract to bind in the next N1 package

1. Pin accepted main, target project and current migration history; compare baseline object/grant/function definitions against the actual hosted schema. Migration names differ between CI and hosted, so name equality is not a parity check. Read catalogues only, not customer rows.
2. Bind exactly the two append-only corrective SQL bodies from tools/ci/supabase/migrations/20260916103000_i02_corrective_repairs.sql and 20260916113000_i02_protect_teacher_verification_history.sql, with Git-blob byte hashes. Do not edit those historical files or replay the baseline against staging.
3. Independently review target prerequisites, existing synthetic-data handling, hosted backup/forward-recovery method and explicit target-specific application authority. Existing CI-only comments do not grant hosted authority. Resolve those gates before apply_migration.
4. Apply in original order through tracked hosted migrations only after gate acceptance. Do not use ad-hoc DDL or a production target. Stop after any mismatch/failure; inspect current migration/catalogue state before retry.
5. Re-read grants/functions/policies. Confirm teacher reputation INSERT denied; reviewer evidence immutable; review identity/time database-authored; submitted object deletion denied; all verification-history states protected. Run separately reviewed transactional synthetic hostile tests and retain rollback/cleanup proof. No raw 91-test fixture replay against hosted data.
6. Only then execute hosted applicant/reviewer journeys with labelled synthetic data and approved inboxes. Real user access remains closed until release acceptance.

## Hosted authentication matrix

Use the existing approved staging branch alias, two disposable synthetic identities and separate browser contexts. Keep credentials, email bodies, tokens and signed URLs out of evidence.

| Case | Required result |
|---|---|
| Signup/confirmation | Verified delivery; intended account established; session survives refresh |
| Unconfirmed/invalid credentials | Honest denial, no unauthorized protected content |
| Recovery | Delivered link establishes only intended recovery flow; changed password works; prior password fails |
| Expired/replayed callback | Local actionable error, no session, no external redirect |
| Sign out/refresh revocation | Protected navigation denied; refresh token rejected; private state cleared |
| Account switch / parallel contexts | No previous identity's profile, application, documents or cached state |
| Provider failure | Recoverable unavailable/error state; no success or alternate backend fallback |

A CUA password-change step requires human entry under the browser tool's handoff rule; a package-authorized synthetic API harness can instead verify the existing Auth contract without exposing credentials. Neither path is evidence until executed.

## Production packet

Existing approved initial origin: aro-club.vercel.app. Select the organization and obtain current quoted project cost before provisioning a separate backend. Preserve staging and all excluded refs. Provision reviewed schema without copying accounts/content. Configure verified sender and exact production callback URLs. Configure Production-only URL/key/ref and activation flag only after target tests and security review. Build with Production configuration; never promote a staging-compiled artifact. Verify direct routes, account isolation and fail-closed rollback.

Founder input needed: verified sending provider/domain (not secrets), organization/cost decision when quoted, and controlled test inbox/device access. No provider change or purchase was performed by READY1.
