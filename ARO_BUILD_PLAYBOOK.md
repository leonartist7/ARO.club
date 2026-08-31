# ARO — Build Playbook

> **2026-08-31 execution handoff:** I0.1 is **SHIPPED** through PR #27 at
> `467a11d`; main Isolated database and Quality CI passed. Next is
> [I0.2 application baseline proposal](specs/ARO-I0.2-APPLICATION-BASELINE.md),
> version 0.1.0, **SPEC-REQUIRED / DIRECTOR DECISION REQUIRED**.
> [Application audit](artifacts/ARO-I0.2/APPLICATION_BASELINE_AUDIT.md) records
> profile privacy, field authority, approval and booking conflicts.
> No repair is implemented. Isolated-only direction and reviewed exact contracts
> are required before runtime work; full I0/Q0/P1 gates remain in force.

## Operating contract

Read `AGENTS.md` first. The director authors product, design, data, Trust/Safety, money, and architecture decisions; an implementation agent executes one approved package. One package = one branch = one PR. Any unresolved security, privacy, Trust, money, legal, or materially different product decision stops for director review.

Terminology is locked by `DECISIONS.md`: **Opportunity** is the universal arrangement; **Circle** is its participant cohort/operating group; a Tonguee **Experience** is the first vertical format. “Teacher” and “learner” remain valid within Tonguee; “host” and “participant” are platform roles.

## Required order

1. P0/P0.1 — governance.
2. **ARO-SEC0 — Repository Secret Hygiene (must complete before P1).**
3. R1 — repository/provider separation and platform identity.
4. M0 → I0 → Q0 — master delivery governance, isolated infrastructure and deterministic reliability foundation.
5. P1 — Capability + Goal Foundation.
6. N1 → X1 — governed platform/Next.js decision and ARO experience foundation.
7. P2 — Explicit Intent + Demand Signals.
8. A1 — AI Runtime, Evaluation and Safety Foundation.
9. P3 → P4 → P5 in order.
10. P6 only after the V1 loop is reliable and its category gate is approved.

The semantic product dependency remains P1 → P2 → P3 → P4 → P5. M0, I0, Q0, N1, X1 and A1 are enabling packages defined by `ARO_MASTER_DELIVERY_PLAN.md`; none may implement downstream product behavior by implication.

Current enabling-state record (2026-08-28): M0 is **VERIFIED**; I0 is **SPEC-READY / IMPLEMENTATION BLOCKED**; Q0 is **IMPLEMENTED / AUTH-GATE BLOCKED** with local public gates passing. The real Auth/RLS suite still requires I0, and branch protection remains founder-authorized provider work.

No package authorizes the next package automatically. The director reviews delivery evidence and opens the next package.

I0 execution update (2026-08-30): `ARO-I0.1` is VERIFIED at `54e41b7` in PR #27, merged at 467a11d (SHIPPED). Actual platform CI passes and automated security/operations review findings are resolved. It tests platform infrastructure only, not application migration compatibility; no hosted or P1 gate is waived. Next technical gate is reviewed application-baseline reconciliation, including the live source Trust drift recorded in `artifacts/ARO-I0.1/MIGRATION_SOURCE_AUDIT.md`.

## P0 / P0.1 — Director Reset and Pack Completion

**Goal:** make ARO the unambiguous source of authority while preserving Tonguee and existing security discipline.

**Allowed scope:** governance documents only.

**Non-goals:** runtime, schema/RLS, dependencies, routes, UI, payments, or product features.
**Done:** all documents in the `AGENTS.md` hierarchy exist; P1–P6 are executable; legacy authority is visibly deprecated; ARO-SEC0 is routed; consistency audit passes.

## ARO-SEC0 — Repository Secret Hygiene

Execution record: `ARO_SEC0_REPORT.md`.

**Status: VERIFIED — 2026-08-26.** The founder confirmed only browser-facing Supabase URL/anonymous-key categories, accepted the documented historical exposure, selected the Tonguee Supabase project, and chose no history rewrite.

### Goal

Remove tracked environment configuration from the active tree safely and determine whether credential rotation or history cleanup is required—without printing secret values.

### User-visible result

None. The repository becomes safe for broader agent access and later financial integrations.

### Dependencies and locked decisions

- Runs after P0.1 and before P1.
- `.env` was tracked on the P0/P0.1 base and is removed from the active tree by SEC0.
- Do not expose values in terminals, logs, commits, issues, PRs, or chat.
- Founder decision recorded: no history rewrite; the classified browser-facing historical exposure is accepted.

### Allowed scope

- Git tracking state, `.gitignore`, `.env.example`, security documentation, and credential/provider inventory using names only.
- Remove `.env` from tracking while preserving the founder’s local file when safe.
- Determine rotation and history-cleanup needs; perform rotations only through an explicitly authorized provider workflow.

### Explicit non-goals

- Feature work, schema/RLS changes, provider migration, or casual history rewriting.
- Reading or printing `.env` contents for ordinary inspection.

### Likely files/systems

`.gitignore`, `.env.example`, tracked-file metadata, deployment/provider configuration, and a security runbook. Confirm exact files before editing.

### Schema, Trust, and money implications

No schema change. Treat any possibly exposed auth, database, storage, email, analytics, payment, or service credential as a security incident until safely classified. Financial credentials require immediate provider-specific escalation.

### Acceptance criteria

- [x] `.env` is no longer tracked on the branch, without deleting the founder’s necessary local configuration unintentionally.
- [x] `.gitignore` covers expected local environment variants.
- [x] `.env.example` contains names and non-secret placeholders only; validation never prints values.
- [x] Credential categories and owners are inventoried by variable/provider name only.
- [x] Rotation requirements and completed founder actions are documented without values.
- [x] Git-history exposure is assessed; the founder accepted the documented browser-facing exposure and chose no rewrite.
- [x] Repository and CI searches confirm no other obvious secret-bearing files are tracked, with secret values redacted by tooling/output handling.

### Tests and verification

`git ls-files` confirms environment files are not tracked; ignore checks pass; application configuration documentation remains usable. No browser screenshots required.

### Director gate and roles

Security reviewer mandatory before merge. Suggested roles: implementation agent for Git/config changes; security specialist for exposure/rotation assessment; director/founder for provider actions and any history rewrite.

### Definition of Done

Acceptance criteria pass, no values were exposed, required rotations are completed or explicitly block further access, founder actions are recorded, and the security reviewer approves.

## ARO-P1 — Capability and Goal Foundation

### Goal

Let an authenticated adult describe what they can offer and the language-related outcome they want, using explicit, editable, private-by-default data.

### User-visible result

A participant can review and edit a compact ARO foundation profile: learning goal plus selected capabilities. Existing Tonguee profiles and verified teacher data continue to work.

### Dependencies

- P0.1 and ARO-SEC0 complete.
- Current profile, onboarding, auth, RLS, teacher application, dark-mode, i18n, and test patterns inspected.
- A package-specific field/RLS/retention specification approved before migration.

### Locked architecture decisions

- Intent and Capability are separate concepts.
- P1 records a learning goal, not the full P2 intent lifecycle.
- Self-declared capability is not verified qualification.
- Private inputs are not exposed through existing public profile policies.
- Extend additively; do not rename `teachers`, `experiences`, or existing vertical UI globally.

### Allowed scope

Authenticated profile/onboarding UX, minimal data library/hooks, append-only migration and least-privilege RLS, validation, i18n, tests, analytics events approved for P1.

### Explicit non-goals

Opportunity generation, public demand, matching, commitment, payment, new category launch, credential verification, public ARO rebrand, or broad page redesign.

### Likely files/systems

Supabase append-only migration, profile/onboarding pages, auth context usage, profile data library/hooks, translations, reusable inputs/state components, Vitest and Playwright journeys. Confirm names before implementation.

### Schema implications

Prefer dedicated private records or a demonstrably safe separation from publicly readable `profiles`. Define allowed values, provenance (`self_declared`), timestamps, deletion/export, indexes, and RLS. Do not store precise location or availability in P1.

### Security/Trust implications

Owner-only write/read unless a specific approved use requires otherwise. Never display self-declared capability as verified. Preserve Trust Engine policies and admin authorization.

### Money implications

None.

### Acceptance criteria

- [ ] Authenticated adult can add, edit, and remove a language-learning goal and capability selections.
- [ ] User sees privacy/purpose copy before saving.
- [ ] Self-declared and verified information are visually and semantically distinct.
- [ ] Another ordinary user cannot query private P1 records directly.
- [ ] Existing teacher application, teacher profile, Passport, auth, and onboarding journeys do not regress.
- [ ] Validation, retry, loading, empty, error, and success states are complete.
- [ ] Light/dark, keyboard, screen-reader, reduced-motion, mobile, and desktop requirements pass.

### Tests and screenshots

Unit tests for validation/mapping; data/RLS tests for owner/other/admin roles; E2E create/edit/remove and regression journeys. Screenshots: 360px and 1440px, light and dark, including empty, populated, validation, and error/retry states.

### Director gate and roles

Director plus privacy/security review required for migration/RLS before merge. Suggested roles: product-capable implementation model; security reviewer for data/RLS; visual reviewer for responsive/accessibility evidence.

### Definition of Done

All criteria, tests, screenshots, migration review, and hostile diff review pass; no public demand or opportunity generation exists.

## ARO-P2 — Explicit Intent and Demand Signal

### Goal

Let an authenticated adult express a revocable language-learning intent with bounded constraints and consent to privacy-preserving aggregation.

### User-visible result

A user can create, pause, edit, expire, or delete an intent and understand how it may contribute to an aggregate demand signal. No person-level intent becomes public.

### Dependencies

P1 complete; approved lifecycle, privacy notice, aggregation threshold, retention, abuse/safety, analytics, and RLS spec.

### Locked architecture decisions

- Intent is explicit and time-bounded; inference is never presented as declared intent.
- Interest is not commitment.
- Demand Signals are aggregate and must meet a minimum privacy threshold.
- Precise location is excluded; use approved coarse Calgary geography.

### Allowed scope

Intent lifecycle UX, owner-only records, safe aggregate query/service, consent/withdrawal, relevant notification preference, analytics, tests.

### Explicit non-goals

Host outreach, automatic matching/publication, commitment/payment, precise location, public user lists, new verticals, or AI-authored opportunities.

### Likely files/systems

Append-only migration/RLS, authenticated intent pages/components, data library/server function or secured query, translations, analytics, admin visibility only if explicitly specified.

### Schema implications

Define desired outcome, language/category, coarse area, broad availability, optional budget band, lifecycle state, expiry, consent version, timestamps, and deletion. Aggregation must suppress small cohorts and private attributes.

### Security/Trust implications

Owner-only raw intent; least-privilege aggregate access; abuse/rate limits; no identity leakage through filters/combinations; auditable admin access if any.

### Money implications

Budget/willingness-to-pay is nonbinding research data, clearly labeled; no payment authorization.

### Acceptance criteria

- [ ] Create/edit/pause/delete/expiry work with clear consent and purpose.
- [ ] Raw intent is inaccessible to another ordinary user.
- [ ] Demand Signal reveals no identity and is hidden below the approved threshold.
- [ ] Interest, waitlist, and commitment terminology are not conflated.
- [ ] Withdrawal removes the intent from future aggregation within the specified processing window.
- [ ] Abuse controls, analytics definitions, and retention behavior are tested.
- [ ] P1/Tonguee/Trust journeys remain intact.

### Tests and screenshots

Unit lifecycle/validation tests; RLS role matrix; aggregation threshold/privacy tests; E2E intent lifecycle. Screenshots at 360px/1440px in light/dark for consent, form, active, paused, expired/empty, and error states.

### Director gate and roles

Privacy, security, and Trust/Safety reviewers mandatory before merge. Suggested roles: data-aware implementer; security reviewer; product/copy reviewer.

### Definition of Done

Intent is useful, revocable, private by default, safely aggregated, and fully evidenced; no opportunity is generated yet.

## ARO-P3 — Language Opportunity Suggestion

### Goal

Prove that ARO can combine approved language intent, aggregate demand, verified Tonguee capability, and existing experience context into a transparent opportunity proposal.

### User-visible result

A qualified Tonguee host sees a proposed language Opportunity, why it may be viable, and can accept, edit, or decline it. No proposal is published or messaged automatically.

### Dependencies

P2 complete; approved proposal fields, viability semantics, AI/provider/data boundary, prompt/evaluation, explainability, failure-mode, moderation, and human-approval spec.

### Locked architecture decisions

- Opportunity is universal; Tonguee Experience is the format created after host approval.
- Circle is the cohort, not a synonym for Opportunity.
- ARO Catalyst proposes; human host approves.
- Trust/RLS verified-publish gate remains final enforcement.
- Scores are estimates with inputs/freshness, never guarantees.

### Allowed scope

Language-only proposal generation/retrieval, host review/edit/decline, minimal Radar surface for approved users, transparent rationale, moderation, audit, analytics, tests.

### Explicit non-goals

Autonomous publication/outreach, pricing guarantees, commitment/payment, generalized category engine, public raw demand, new vertical, or full ARO Director.

### Likely files/systems

Server-side proposal orchestration, append-only proposal/audit storage if approved, host dashboard/Radar/detail UI, existing experience creation path, Trust/admin hooks, analytics and tests. Confirm exact files.

### Schema implications

If persisted, proposals distinguish source inputs, model/rule version, generated fields, rationale, status, host edits, consent provenance, expiry, and publication link. Raw prompts/private intent are not copied into public records.

### Security/Trust implications

Only eligible verified/active language hosts receive proposals; server rechecks authorization and publication eligibility; rate limits and moderation apply; privileged actions audited.

### Money implications

Economics may be an explicitly labeled estimate based on approved inputs. No charge, hold, payout, or guaranteed earnings.

### Acceptance criteria

- [ ] Eligible host receives a language proposal based only on permitted inputs.
- [ ] Rationale, freshness, assumptions, and uncertainty are understandable.
- [ ] Host can edit/accept/decline; every consequential action requires confirmation.
- [ ] Declined/expired proposals do not publish or contact users.
- [ ] Accepted proposal uses the existing verified publication boundary.
- [ ] Ineligible/unverified hosts cannot publish through UI, API, or direct DB path.
- [ ] AI/provider failure has a recoverable, honest state and does not corrupt data.

### Tests and screenshots

Unit composition/rationale tests; authorization/RLS and verified-publish regression; deterministic provider mocks; E2E proposal → edit → approve and decline paths. Screenshot Radar, proposal rationale, editor, confirmation, error, and declined state at 360px/1440px light/dark.

### Director gate and roles

Architecture, AI/data, Trust/Safety, privacy, and design review mandatory. Suggested roles: senior full-stack implementer; independent AI/evaluation reviewer; security reviewer; visual reviewer.

### Definition of Done

One credible language opportunity can be suggested and human-approved safely, with no autonomous external action and complete evidence.

## ARO-P4 — Commitment, Booking, and Minimum Viability

### Goal

Let participants make a clear, revocable commitment to a language Opportunity and convert a viable Circle into an approved booking/payment path.

### User-visible result

Participants understand threshold, deadline, price/trigger, cancellation, and status; the host accepts; the Circle becomes confirmed only when approved conditions are met.

### Dependencies

P3 complete; founder-approved commitment states and threshold policy; cancellation/support/notification/dispute spec; updated ARO marketplace payment spec; current Stripe and RevenueCat responsibilities verified. Digital subscription may be a separately scoped subpackage.

### Locked architecture decisions

- Interest, conditional commitment, confirmed booking, and paid state are distinct.
- Humans approve meaningful financial actions.
- RevenueCat handles eligible digital subscription entitlements only.
- Marketplace amounts/refunds/payouts are server-authoritative and separate.

### Allowed scope

Commitment lifecycle, threshold status, host acceptance, notifications, booking conversion, and approved marketplace payment flow. An explicitly approved RevenueCat entitlement slice may be included but must remain separately tested/accounted.

### Explicit non-goals

Crypto, wallet, autonomous negotiation/charge, multiple verticals, opaque dynamic pricing, guaranteed demand/earnings, or replacing Trust gates.

### Likely files/systems

Append-only commitment/payment migrations, secured server functions/webhooks, Opportunity/Circle detail, booking/host dashboard, notification service, entitlement integration if approved, admin/support/audit, tests.

### Schema implications

Commitment state machine, threshold/deadline, terms version, participant consent, opportunity/Circle link, expiry/cancellation, and idempotency. Money schema follows the approved ARO payment addendum; do not copy legacy SQL blindly.

### Security/Trust implications

Authorization and capacity enforced server-side; verified host required; signed/idempotent webhooks; privacy threshold maintained; abuse/no-show/support/admin controls; secret hygiene complete.

### Money implications

Founder must approve currency, take rate, processing/chargeback allocation, refund tiers, payout timing, taxes, and subscription price/entitlements. All projections labeled; no “escrow” claim without legal approval.

### Acceptance criteria

- [ ] User sees commitment type, threshold, deadline, amount/trigger, cancellation, and withdrawal terms before confirmation.
- [ ] Conditional commitment does not charge unless the approved flow explicitly authorizes and revalidates the trigger.
- [ ] Threshold/capacity transitions are atomic, concurrency-safe, and idempotent.
- [ ] Host acceptance and participant confirmation produce an auditable Circle state.
- [ ] Marketplace and RevenueCat transaction/entitlement records cannot be confused.
- [ ] Refund/cancellation/no-show/support paths work under approved rules.
- [ ] Client cannot alter price, fee, capacity, entitlement, payout, or state authority.
- [ ] Verified-host and RLS gates remain effective.

### Tests and screenshots

State-machine/unit tests; concurrency/idempotency; webhook/signature mocks; RLS/role matrix; refund/cancellation cases; E2E threshold → host accept → booking/payment test mode and subscription restore if included. Screenshots at 360px/1440px light/dark for forming, almost unlocked, confirmed, expired, cancelled, payment/entitlement error, and refund states.

### Director gate and roles

Money, security, Trust/Safety, legal/compliance, and director review mandatory before merge or live keys. Suggested roles: senior payment implementer; independent security/money reviewer; product/design reviewer.

### Definition of Done

The approved commitment-to-confirmation loop works in test mode, all calculations and authority are server-side, complete audit evidence exists, and no live financial exposure is introduced without explicit approval.

## ARO-P5 — Proof, Outcomes, and Passport

### Goal

Close the loop with trustworthy evidence of attendance, completion, value, and learning while improving Passport and future suggestions.

### User-visible result

After a Circle, participants and hosts confirm what happened, resolve discrepancies, and see appropriate verified progress in Passport.

### Dependencies

P4 complete; approved evidence taxonomy, check-in/completion source of truth, dispute/appeal, moderation, retention, derived-metric, Passport, and analytics specification.

### Locked architecture decisions

- Outcome sources remain distinct: participant, host, system, verified evidence.
- Passport reflects lived progress, not a universal social score.
- Outcome data may improve suggestions only within disclosed consent and retention boundaries.

### Allowed scope

Check-in/completion evidence, post-Circle reflection, host/participant confirmation, discrepancy/admin review, Passport outcome surfaces, aggregate analytics, tests.

### Explicit non-goals

Opaque reputation scoring, public safety allegations, addictive streak punishment, unverifiable earnings claims, broad AI training consent, or new vertical launch.

### Likely files/systems

Append-only outcome/evidence schema, check-in/server functions, booking/Circle state, review/reflection UI, Passport, admin dispute/audit, analytics, tests.

### Schema implications

Store source, subject, opportunity/Circle, evidence type, verification status, timestamps, visibility, dispute state, retention, and audit references. Derived metrics are reproducible/versioned and never overwrite source evidence.

### Security/Trust implications

Only eligible participants/hosts/admin can submit/view appropriate evidence; sensitive reports remain private; dispute and correction paths exist; safety reporting follows `ARO_TRUST_SAFETY.md`.

### Money implications

Outcome/completion may make payout eligible only under the approved P4 money state machine and dispute window. Proof UI cannot itself authorize payout.

### Acceptance criteria

- [ ] Eligible participant and host can submit the approved outcome evidence once with controlled correction.
- [ ] System, host, participant, and verified evidence are distinguishable.
- [ ] Conflicts route to an auditable review/dispute state; safety reports stay private.
- [ ] Passport displays only approved, attributable progress and respects visibility/deletion rules.
- [ ] Completion cannot bypass payment/payout or Trust policies.
- [ ] Outcome analytics definitions are reproducible and exclude test/refunded/cancelled records as specified.
- [ ] Future suggestion use is disclosed and revocable where required.

### Tests and screenshots

Unit evidence/metric tests; role/RLS matrix; duplicate/concurrency/dispute tests; E2E check-in → outcome → Passport and conflict path. Screenshots at 360px/1440px light/dark for reflection, verified outcome, pending/conflict, private safety route, Passport, empty/error states.

### Director gate and roles

Privacy, Trust/Safety, data, money, and design review mandatory. Suggested roles: data/full-stack implementer; independent privacy/security reviewer; analytics reviewer; visual reviewer.

### Definition of Done

The signature loop produces trustworthy, contestable Proof and meaningful Passport value without exposing sensitive data or inventing a universal score.

## ARO-P6 — One Adjacent-Vertical Pilot

### Goal

Prove the architecture can support exactly one approved adjacent low-risk vertical without weakening Tonguee or duplicating the platform.

### User-visible result

Calgary users can express intent, qualify a host, form, commit to, complete, and record an outcome for one additional approved format using shared ARO primitives and category-specific rules.

### Dependencies

P5 reliable; Shipathon priority reviewed; founder selects the category; full Category Policy Engine specification/addendum, legal/insurance/operations review, economics, support capacity, and launch stop conditions approved.

### Locked architecture decisions

- New verticals reuse Opportunity/Circle/Intent/Capability/Commitment/Outcome.
- Vertical vocabulary and presentation may differ without forking core state machines.
- Launch fails closed when category evidence is missing.

### Allowed scope

One low-risk Calgary pilot, its category policy/configuration, minimal format-specific fields/UI, shared platform generalization, admin/analytics/tests.

### Explicit non-goals

Multiple categories/cities, pet care, fitness/food/outdoor moderate-risk launch without their gates, regulated services, minors, global marketplace, wholesale Tonguee rename, or premature generic framework rewrite.

### Likely files/systems

Shared domain/data services, one category policy/config, onboarding/qualification, Radar/detail/Director/commitment/Proof surfaces, admin/analytics, append-only migrations, tests. Confirm after category decision.

### Schema implications

Prefer shared tables plus validated category-specific metadata/configuration. Avoid sparse universal tables and copy-pasted vertical schemas. Index and RLS changes require measured need and review.

### Security/Trust implications

Implement the approved category gate, evidence expiry, venue/equipment rules, reporting/escalation, insurance if applicable, and fail-closed enforcement. Existing Tonguee verified publish control remains intact.

### Money implications

Category pricing, tax, cancellation, payout, insurance, and commission require explicit approval; do not assume Tonguee economics transfer.

### Acceptance criteria

- [ ] Exactly one founder-approved low-risk category is enabled in Calgary.
- [ ] Category eligibility is enforced server-side and fails closed.
- [ ] Shared primitives/state machines are reused without Tonguee regression.
- [ ] Category-specific disclosures, reporting, cancellation, support, and stop conditions work.
- [ ] Analytics distinguish category/city while preserving privacy.
- [ ] End-to-end signature loop completes for the pilot and for Tonguee regression.
- [ ] No closed/high-risk category becomes discoverable or publishable.

### Tests and screenshots

Unit category-policy tests; RLS/authorization; failure/expiry; end-to-end pilot and Tonguee regression; operational tabletop for incident/cancellation. Screenshots of the complete pilot at 360px/1440px light/dark plus admin/category-blocked states.

### Director gate and roles

Founder category decision plus architecture, Trust/Safety, legal/compliance, operations, money, and design approval mandatory. Suggested roles: senior architecture implementer; independent category/security reviewer; operations reviewer; visual reviewer.

### Definition of Done

One safe adjacent vertical proves reuse and real-world value without weakening Tonguee, expanding prohibited scope, or duplicating core architecture.

## Delivery evidence for every implementation package

- Acceptance criteria checked individually with evidence.
- Build, lint, unit, integration/RLS, and relevant E2E results.
- Diff audit confirming package scope only.
- Mobile/desktop and light/dark screenshots for every touched user-facing state.
- Explicit deviations and director approval references.
- Mandatory review evidence for security, privacy, Trust, schema, AI, legal, or money changes.
