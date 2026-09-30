# ARO-AUTH2 — Account eligibility and deletion (proposal)

## 0. Metadata

- **Status:** SPEC-REQUIRED; founder decisions and independent security/privacy review pending. No runtime or production configuration change is authorized by this draft.
- **Spec version:** 0.1.0, 2026-09-30
- **Owner:** ARO founder
- **Depends on:** AUTH1 hosted email and Google verification; existing I0 Auth/RLS baseline
- **Governing documents:** `AGENTS.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_TRUST_SAFETY.md`, `ARO_DATA_MODEL.md`, `specs/ARO-AUTH1-ACCOUNT-ENTRY.md`
- **Required review:** founder for decisions below; independent security/privacy review before implementation merge

## 1. Problem and outcome

Production web signup exists, but the site offers no account deletion request, no effective adult eligibility control, and no verified end-to-end email or Google journey. A store app would also need a discoverable in-app deletion path and a public deletion web resource. The repository presently contains a Next.js web app, with no iOS or Android application to test.

The desired outcome is an adult user who can create and use an email or Google account, revoke it through a clear in-app flow, and understand any data retained for a stated reason. A store submission must be verified on the actual mobile build; web readiness alone does not certify it.

## 2. Baseline evidence (read-only, 2026-09-30)

- Existing project: `mibydnerayobemhnlfyl`; two auth users, zero bookings and zero Storage objects at inspection time. Do not treat those counts as a permanent deletion guarantee.
- `profiles.id` cascades from `auth.users.id`, but `bookings.student_id` restricts profile deletion. Several teacher records cascade; audit reviewer IDs become null. Storage ownership can block Supabase user deletion. Unexpired JWTs may remain valid after deleting an auth user.
- `/signup` accepts name, email, password or Google; the age question in the onboarding preview is local-only. `/settings` is a synthetic preview, and `/privacy` says account deletion requests are not yet available.
- Supabase security advisor warns that leaked-password protection is disabled. The dashboard setting requires separate configuration and verification.
- AUTH1-04 through AUTH1-06 remain pending hosted journey and independent review evidence.

## 3. Proposed bounded behavior for approval

1. Present an explicit 18+ self-declaration before either signup path. A browser checkbox alone is insufficient: the server must enforce the eligibility decision for email and OAuth entry and for protected account routes. Do not store date of birth unless a reviewed purpose and retention rule requires it. Existing users need a migration/eligibility decision before protected access.
2. Provide a discoverable account deletion path from the authenticated account UI and a public web resource that can initiate the request without reinstalling an app. Reauthenticate for a destructive action. Show what will be deleted, what may be retained, timing, and an acknowledgement.
3. Use a server-only privileged deletion worker after authorization. It must inventory bookings, owned Storage files, teacher documents, and references before attempting `auth.admin.deleteUser`. Prevent retries from duplicating destructive work. Revoke active sessions as far as the platform permits and ensure any remaining JWT cannot access ARO protected data.
4. Keep public deletion contact/request handling operational and verifiable, with no fictional email address. Update the privacy disclosure and store metadata to match implementation.
5. Complete hosted synthetic email signup, confirmation, login, recovery, logout and deletion tests; complete Google consent/callback with a designated test account; test both paths in the actual store builds. For an iOS build using Google as primary social login, review and implement the equivalent login option required by Apple's current guideline.

## 4. Decisions required before SPEC-READY

| ID | Decision | Proposed default | Why it matters |
|---|---|---|---|
| D1 | Adult eligibility method and jurisdictions | 18+ self-declaration, enforced server-side for both entry methods | Google OAuth does not supply ARO's age declaration; a pre-OAuth checkbox can be bypassed unless the callback/session boundary enforces it. Age verification requirements vary by market. |
| D2 | Active/completed bookings and financial records upon deletion | Freeze self-service completion when a booking, dispute or lawful retention obligation exists; accept and track the request, resolve obligations, then erase or de-identify on a documented schedule | `bookings.student_id ON DELETE RESTRICT` prevents naive user deletion. Financial/legal retention periods need review. |
| D3 | Teacher credentials and moderation/audit evidence | Remove published personal data and Storage files, preserve only explicitly reviewed audit/legal records with access and retention limits | Cascades, shared experiences and audit references have different consequences. |
| D4 | Request handling and timing | Self-service for accounts without dependencies; a monitored request queue with a stated completion window for exceptions | The current contact page is a local draft, and no working deletion inbox or queue was verified. |
| D5 | Mobile distribution architecture | Identify the actual iOS/Android project and decide native login/deep-link handling before store claim | No mobile build or Apple developer provider configuration is present in this repository. |

## 5. Security and reliability acceptance

| ID | Requirement and test evidence | Status |
|---|---|---|
| AUTH2-01 | Email and Google creation cannot reach a protected session without approved adult eligibility; bypass/replay tests and existing-user migration test | PENDING |
| AUTH2-02 | Owner only may request deletion; CSRF, fresh-auth, rate-limit, duplicate and other-user tests | PENDING |
| AUTH2-03 | Deletion succeeds for an account without dependencies; removes profile and owned Storage; stale JWT is denied protected reads | PENDING |
| AUTH2-04 | Booking/teacher/audit dependencies follow the approved retention rule; failed or partial attempts reconcile without losing the request | PENDING |
| AUTH2-05 | In-app and public web deletion paths work; privacy/store disclosures match the actual handling | PENDING |
| AUTH2-06 | Hosted email and Google tests, mobile device tests, Supabase advisor review, independent security/privacy review | PENDING |

## 6. Rollout boundary

Keep AUTH1 and AUTH2 statuses separate. Build in an isolated branch with disposable Supabase data, append-only migrations, and explicit production rollback/forward-recovery notes. Do not apply a live migration, publish a deletion promise, or claim store readiness until D1–D5 are approved and all acceptance evidence passes. If public signup is paused as a temporary safety measure, record its exact setting, effect on new Google/email users, and restoration gate; it does not replace the deletion implementation.
