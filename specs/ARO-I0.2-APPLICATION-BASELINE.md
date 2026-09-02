# ARO-I0.2 — Application Database and Trust Baseline

## 0. Metadata

- Status: **IMPLEMENTED / CI VERIFIED**; independent implementation review follow-up remains
- Version: 1.0.0; implementation authority for isolated I0.2 only
- Owner: ARO founder/director
- Branch: `spec/aro-i0-application-baseline`
- PR: [#28](https://github.com/leonartist7/ARO.club/pull/28), merged into `main` at `5976928`
- Depends on: I0 specification and SHIPPED I0.1
- Blocks: real application Auth/Trust baseline for Q0/P1
- Governing docs: AGENTS.md, ARO_MASTER_DELIVERY_PLAN.md, ARO_BUILD_PLAYBOOK.md,
  ARO_INFRASTRUCTURE.md, ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md,
  ARO_TRUST_SAFETY.md, ARO_MONEY.md, ARO_MIGRATION.md, ADR-025–027
- Required review: director, security/privacy/Trust and operations
- Updated: 2026-09-02; source audit dated 2026-08-30 and CI verification dated 2026-09-02

## 1. Problem

Neither the live source nor a blind combination of inherited SQL establishes
the mandatory application privacy and Trust contract. See
[audit F1–F7](../artifacts/ARO-I0.2/APPLICATION_BASELINE_AUDIT.md).

## 2. User outcome

In a synthetic isolated test environment, a real account can save permitted
profile data and submit a teacher application. Only a legitimate reviewer can
approve it; only an eligible verified teacher can publish. Private records,
review notes and documents cannot leak to another user.

## 3. Why now

I0.1 proves disposable platform infrastructure, not the app. P1 depends on real
profile/onboarding/Trust regression evidence, which the present fixture lacks.

## 4. Proposed goals

Reconcile an append-only application baseline; repair the observed Auth/Trust
contracts; exercise it in disposable CI; preserve required journeys and record
remaining legacy gaps without calling a partial baseline complete.

## 5. Non-goals

Hosted/production rollout; customer-data migration; provider purchases; changes
to Tonguee or quarantined aro-platform; P1 feature code; payments/Stripe/Google;
Next.js or dependency changes; new gamification, AI, precise location or AR.

## 6. Director decision and authorization

Approve **isolated ARO-only** remediation of the following inherited behaviour:

1. Full profiles become private to their owner and specifically authorized
   administrators. Required presentation reads use minimal field contracts;
   no email, learning state or booking history becomes public.
2. Roles, teacher verification and review outcomes are server-controlled.
   Applicant transitions, reviewer-private notes, document ownership and
   approval/audit atomicity are repaired without changing qualification tiers.
3. Client money/paid-state writes are denied in the isolated baseline. Booking
   fixtures are synthetic read evidence, not a new payment or booking service.
4. Necessary existing-client changes may accompany those contracts, including
   truthful persistence/error handling. Local player state is not promoted to
   verified learning, payment or Proof data.

The founder approved this exact bounded direction on 2026-08-31 in
[PR #28](https://github.com/leonartist7/ARO.club/pull/28#issuecomment-5486409684).
That approval authorizes isolated migration, client reconciliation, tests and
evidence only. It does not authorize a hosted or production mutation, spending,
Tonguee changes, `aro-platform` changes, P1 feature code, Stripe or Google.
Any further consequential choice returns to the director.

## 7. Personas and permissions

Proposed: owner manages permitted own profile/application fields; other users
receive only approved presentation data; reviewers have explicitly scoped Trust
operations; anonymous callers receive only eligible published content.
Service role is synthetic fixture setup only and never a browser credential.

## 8. Required journeys

Real signup/profile creation → edit/reload → sign out/sign in; applicant
draft/edit/submit → reviewer request changes/resubmit/approve/reject; private
document upload/review; eligible publish/ineligible deny; suspension hides
public content; denied cross-user access; recoverable network/partial failure.
Existing Profile, Passport, chat-card and leaderboard consumers must be checked
against any visibility change, not silently removed from regression scope.

## 9. State machine

The application states are `draft`, `submitted`, `in_review`,
`changes_requested`, `approved` and `rejected`. An applicant may create only a
draft, edit/delete a draft, submit a draft or requested-change record, and edit
then resubmit requested changes. An administrator may move submitted to review,
changes, rejection or approval; review may move to changes, rejection or
approval. All other transitions and ownership changes are denied. Submission
and review timestamps are server-set. A decision requires a complete review row
owned by the acting administrator and atomically creates the applicant decision,
teacher/verification/role changes when approved, and immutable audit event.

## 10. Data specification

The CLI-generated migration owns these contracts:

- `public.profiles`: private identity/onboarding row; owner/admin read, owner
  updates only named presentation/onboarding columns. Email, points and level are
  protected. `profile_cards` exposes only id, name, photo, avatar, points, level.
- `app_private.user_roles`: server-controlled participant/teacher/admin role.
- `teacher_applications`: owner draft data and server-enforced state machine;
  unique non-rejected application per user.
- private reviews and audit live in `app_private`; applicants receive only tier,
  reason and reviewed time through `teacher_application_decisions`.
- `teacher_documents` stores a constrained owner/application object path—never
  a signed URL. The two buckets are private, MIME/size bounded and owner/admin
  policy protected.
- `teachers` contains presentation data. Verification/status/tier live only in
  `app_private.teacher_verifications`; public eligibility is derived server-side.
- `experiences` may publish only for an active verified teacher. Suspension
  immediately removes teacher and experience from public reads.
- `bookings` uses integer minor units plus ISO currency and is client read-only;
  no browser mutation or payment authority exists in I0.2.

Every identifier is UUID-backed; relationships, enums/checks, timestamps and
frequent authorization/filter indexes are declared in the migration. No import
of snapshots, legacy root SQL, seed-data, customer data or localStorage occurs.

## 11. RLS and authorization matrix

Tests must cover owner/other/anon/admin/service, field escalation, forged
metadata, ownership transfer, direct API calls, function EXECUTE grants,
unauthorized review, document/application mismatch and publication reassignment.
Explicit minimum grants plus RLS; no blanket ALL. UPDATE has explicit USING and
WITH CHECK. A narrower admin policy cannot cancel a permissive owner policy.

## 12. Privacy

Synthetic data only. Identity-document test files are clearly synthetic, never
real identity scans. Persist object paths rather than long-lived signed tokens;
authorize access when issuing ten-minute URLs. CI retains synthetic rows/files
only for the job and destroys the exact owned database, storage and network at
cleanup. Production retention/export/deletion remains a separate rollout gate.
CI cleanup erases test users, database and storage resources. No private rows,
tokens, signed URLs or user emails in uploaded evidence.

## 13. Trust and safety

Preserve one canonical verified-publish trigger plus RLS. Check status and
teacher changes; account suspension must remove public eligibility. No self-
verification, universal Trust score, new qualification tiers or minor access.
Do not repair the live Tonguee source under this package.

## 14. Money and entitlements

No financial implementation. Proposed restricted synthetic booking fixtures do
not authorize charges, paid state, refunds, payouts, prices or subscriptions.
Any required real booking mutation remains a separately approved money gate.

## 15. AI

N/A: no model, provider, inference or external agent action.

## 16. API/server contract

The Data API exposes `public` plus the reviewed `api` schema; `app_private` is
never exposed. Anonymous access is select-only for profile cards and eligible
teachers/experiences. Authenticated callers use owner-filtered profile,
application, document and booking queries. `api.current_user_role` exposes only
the caller's role; review, verification and audit views remain admin-only under
security-invoker RLS. Applicant decisions contain only application id, tier,
reason and reviewed time. Profile/application/teacher/experience writes use
column grants plus RLS. Review status changes invoke one database transaction;
there is no client audit write, verification write or booking write. Authorization
derives from `auth.uid()` and the private server role, never user metadata.

## 17. UI/UX

Preserve current visual language. Changes are limited to required data
contracts and truthful loading/empty/error/retry/pending/success/denied states.
Do not report successful persistence on a rejected database request. Refresh
and re-login must verify durable data, not cached Zustand state.

## 18. Responsive

Affected journeys: 360px and 1440px, light/dark; larger phone/tablet if a changed
layout warrants it. No new design system or visual redesign.

## 19. Accessibility

Keyboard completion, labels, focus, error/status announcements, contrast and
reduced-motion regression evidence. Existing screenshots are references, not
evidence for a new authenticated flow.

## 20. Performance

Record migration/reset duration and Auth/data requests. The implementation adds
no runtime dependency and must not increase the measured 750.83 kB main chunk
by more than 10 kB minified or 5 kB gzip. Local Auth/data calls remain under
1 s at p95 on the disposable runner. Authorization joins
must use declared foreign-key/filter indexes; any slower query requires a plan.

## 21. Reliability

Test duplicate draft/submit/approval, concurrent decisions, partial failures,
stale tokens, reviewer revocation, expired document access and interrupted
uploads. Recovery must not duplicate teachers or lose audit evidence.

## 22. Measurement

No product analytics. Retain sanitized assertions, timings and schema/grant
inventory only. Never upload test credentials, Auth mail bodies or private data.

## 23. Test matrix

- Migration from empty CI twice; expected schema, constraints, grants/functions.
- Actual Auth → application profile trigger → durable own-profile assertions.
- Application transitions and atomic reviewer decisions, including retries.
- Hostile database/API/Storage cases listed in section 11.
- Existing 61 unit tests, lint/build, public E2E and expanded authenticated E2E.
- Required existing Profile/Passport/onboarding/teacher regressions.
- Changed-surface responsive/theme/accessibility and request/performance evidence.
- Targeted reset/cleanup, no hosted target or private evidence leakage.

## 24. Acceptance/evidence

| ID | Criterion | Verification | Current state |
|---|---|---|---|
| I02-01 | Source/client conflicts inventoried | audit F1–F7 and catalog checks | RECORDED |
| I02-02 | Direction and exact contracts approved | founder PR comment and v1.0 spec | PASS |
| I02-03 | Clean application reset reproducible | two passing CI runs with schema/grant assertions | PASS |
| I02-04 | Private data and privileged fields protected | passing hostile SQL/API/Storage tests | PASS |
| I02-05 | Real Auth/onboarding/Trust journeys persist correctly | passing expanded API/Auth plus browser evidence | PASS |
| I02-06 | Approval/publication/suspension atomic and enforced | passing transactional and bypass tests | PASS |
| I02-07 | Compatibility/accessibility/performance budgets pass | responsive light/dark evidence, semantic label and bounded browser checks | PASS |
| I02-08 | Review and cleanup complete; status truthful | CI cleanup passed; independent review remains follow-up | IMPLEMENTED / REVIEW FOLLOW-UP |

## 25. Rollout

Audit/direction approval → exact contracts/review → SPEC-READY → implement only
in isolated CI → evidence/review. ARO production remains fail-closed. No automatic
hosted cutover, parent-I0 completion or P1 gate waiver.

## 26. Recovery

This draft changes no runtime. Future CI migrations reset only the exact owned
fixture; retain original SQL untouched. Recover app changes through a reviewed
PR. Never use destructive production rollback or copy customer data.

## 27. Security/privacy/Trust review

Audit by Codex, 2026-08-30; design review updated 2026-08-31. Findings F1–F7
are addressed by explicit grants, fixed-search-path functions, private schemas,
RLS and hostile tests. Founder repair approval is recorded. PR #28 merged after
the CI evidence passed; independent implementation review remains a follow-up
because CodeRabbit skipped review for this OSS repository.

## 28. Product/design review

Founder approval is recorded in PR #28. No visual redesign is proposed.

## 29. Verification condition

All I02 criteria, reviewed exact contracts, real data/role/browser tests,
operational evidence and applicable quality budgets must pass. Documentation or
a green platform probe alone does not verify this package or P1.

## 30. Delivery record

Version 1.0.0 implementation merged through PR #28 at `5976928`. Two passing
CI runs prove the append-only migration, client contract repairs, hostile
SQL/API/Storage tests, Auth/recovery/reset and responsive authenticated browser
evidence. Independent implementation review remains a named follow-up. No
hosted/runtime provider change occurred.
