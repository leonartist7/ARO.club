# ARO-I0.2 — Application Database and Trust Baseline

## 0. Metadata

- Status: **SPEC-REQUIRED / DIRECTOR DECISION REQUIRED**
- Version: 0.1.0, proposal only; not runtime authority
- Owner: ARO founder/director
- Branch: `spec/aro-i0-application-baseline`
- PR: [#28](https://github.com/leonartist7/ARO.club/pull/28), draft; not merged
- Depends on: I0 specification and SHIPPED I0.1
- Blocks: real application Auth/Trust baseline for Q0/P1
- Governing docs: AGENTS.md, ARO_MASTER_DELIVERY_PLAN.md, ARO_BUILD_PLAYBOOK.md,
  ARO_INFRASTRUCTURE.md, ARO_ARCHITECTURE.md, ARO_DATA_MODEL.md,
  ARO_TRUST_SAFETY.md, ARO_MONEY.md, ARO_MIGRATION.md, ADR-025–027
- Required review: director, security/privacy/Trust and operations
- Updated: 2026-08-31; source audit and local test baseline dated 2026-08-30

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

## 6. Director decision required before implementation

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

This is a proposal, not an accepted decision. Founder approval of direction is
followed by exact field/API contracts and security review before SPEC-READY.
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

Preserve the named application states draft, submitted, in_review,
changes_requested, approved and rejected. Specify allowed actors, old/new
values, server timestamps, concurrency and retry behavior for every transition
in the implementation revision. Applicant approval and owner reassignment are
always denied; reviewer decisions must be atomic with their audit event.

## 10. Data specification

Reconcile profiles and onboarding columns, teachers, experiences, applications,
private review records, document metadata and audit records first. Inventory all
remaining extension consumers and classify their migration/exposure explicitly.
No automatic import of snapshots, seed-data.sql, customer data or localStorage.
Use CLI-generated append-only migrations and fixed-path privileged functions.
Exact columns, constraints, indexes, fixture order and export/delete contracts
are required in the implementation revision; this draft does not invent them.

## 11. RLS and authorization matrix

Tests must cover owner/other/anon/admin/service, field escalation, forged
metadata, ownership transfer, direct API calls, function EXECUTE grants,
unauthorized review, document/application mismatch and publication reassignment.
Explicit minimum grants plus RLS; no blanket ALL. UPDATE has explicit USING and
WITH CHECK. A narrower admin policy cannot cancel a permissive owner policy.

## 12. Privacy

Synthetic data only. Identity-document test files are clearly synthetic, never
real identity scans. Persist object paths rather than long-lived signed tokens;
authorize access when issuing bounded URLs. Full lifecycle, retention duration,
orphan cleanup and approved public fields must be fixed before implementation.
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

Before SPEC-READY, enumerate profile update/presentation queries, application
draft/edit/submit, reviewer decision, document access/delete and audit reads.
Specify fields, errors, actor derivation, idempotency, concurrency and limits.
Privileged decisions run as one authorized transaction; browser checks alone
and best-effort audit inserts are not sufficient.

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

Record migration/reset duration, Auth/data requests and query plans. Establish
affected-route budgets before implementation. Current bundle baseline is in the
audit; no dependency or bundle expansion is authorized by this draft.

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
| I02-02 | Direction and exact contracts approved | director decision and reviewed spec revision | BLOCKED |
| I02-03 | Clean application reset reproducible | two CI runs with schema/grant assertions | NOT RUN |
| I02-04 | Private data and privileged fields protected | hostile SQL/API/Storage tests | NOT RUN |
| I02-05 | Real Auth/onboarding/Trust journeys persist correctly | expanded E2E plus database assertions | NOT RUN |
| I02-06 | Approval/publication/suspension atomic and enforced | concurrency and bypass tests | NOT RUN |
| I02-07 | Compatibility/accessibility/performance budgets pass | named journey evidence | NOT RUN |
| I02-08 | Review and cleanup complete; status truthful | review/CI/recovery record | NOT RUN |

## 25. Rollout

Audit/direction approval → exact contracts/review → SPEC-READY → implement only
in isolated CI → evidence/review. ARO production remains fail-closed. No automatic
hosted cutover, parent-I0 completion or P1 gate waiver.

## 26. Recovery

This draft changes no runtime. Future CI migrations reset only the exact owned
fixture; retain original SQL untouched. Recover app changes through a reviewed
PR. Never use destructive production rollback or copy customer data.

## 27. Security/privacy/Trust review

Audit by Codex, 2026-08-30. Findings F1–F7 recorded. Repair approval: **no**.
Independent required implementation review has not occurred.

## 28. Product/design review

Visibility and denied legacy writes require director decision. No approval is
inferred from the master goal; no visual redesign proposed.

## 29. Verification condition

All I02 criteria, reviewed exact contracts, real data/role/browser tests,
operational evidence and applicable quality budgets must pass. Documentation or
a green platform probe alone does not verify this package or P1.

## 30. Delivery record

Documentation/audit only, version 0.1.0. No migration/runtime/provider change.
Fresh lint, 61 unit tests and build pass. Application integration/RLS/E2E repairs
not implemented. Status: SPEC-REQUIRED / DIRECTOR DECISION REQUIRED.
