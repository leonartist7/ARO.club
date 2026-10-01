# Circle Builder implementation checklist

Prepared 2026-10-01. Authority: CB0 v0.1.1; reviewed CB1-P v1.0.1 and CB1 local-preview v1.0.0. This checklist distinguishes accepted preparation/foundation from later implemented runtime.

## Milestones

1. CB0: document the flow and founder's mascot mapping.
2. CB1: implement and verify an explicitly local guided preview.
3. CB2: authenticated private drafts, separately specified.
4. CB3: approved publishing, separately specified.
5. CB-AI: optional generative assistance after A1 and an approved bounded AI specification.

CB1 can validate the experience without enabling CB2/CB3. Category choice and guide art never confer hosting authority.

## CB1 build sequence

- [x] **1. Reconcile exact source and package authority — Phase 2 contract accepted**
  Spec ref: CB0 sections 0, 25, 28.
  Build: inspect current remote main/active owner branches, read governing chain, reconcile the original brief when accessible, register a CB1 package and its durable decision.
  Acceptance: correct current base, approved field/boundary review, versioned SPEC-READY spec before runtime edits.
  Verify: source SHA and dependency/evidence table.

- [x] **2. Confirm guide assets and performance budget — Phase 2 evidence accepted**
  Spec ref: CB0 sections 6, 19, 20.
  Build: original/licensed Tonguee chameleon, Squilly squirrel, Rockatoo white cockatoo assets in one visual family; record dimensions/rights/poses; measure existing Create.
  Acceptance: reviewed source assets and measurable route/media budget; no legacy Coco rename.
  Verify: asset manifest, mobile full-silhouette preview and baseline report.

- [x] **3. Implement category and curated guidance registries — unconnected F1 source VERIFIED**
  Spec ref: CB0 sections 6, 10, 15.
  Build: three stable category IDs, category-specific questions/examples, guide IDs and deterministic suggestions; keep music discovery separate from eligibility.
  Acceptance: correct mapping, indoor examples, explicit custom-idea boundary, unknown-ID recovery.
  Verify: category/guide mapping and suggestion tests.

- [x] **4. Implement local builder reducer — unconnected F1 v1.0.2 source VERIFIED**
  Spec ref: CB0 sections 8-10, 12, 21.
  Build: four editable steps plus sketch-ready state; validation, back/edit, preserve compatible fields, category-change confirmation and reset.
  Acceptance: edits survive transitions, optional logistics stay undecided and no data is persisted/transmitted.
  Verify: meaningful transition/validation/loss-prevention tests.

- [ ] **5. Build Choose and Shape screens**
  Spec ref: CB0 sections 8, 15, 17.
  Build: wrapping searchable pills, curated ideas/manual start, compact guide, title/outcome inputs and explicit suggestion acceptance.
  Acceptance: one obvious action; manual path equivalent; suggestions never silently overwrite.
  Verify: example/manual paths for all three categories; minimized-guide and keyboard cases.

- [ ] **6. Build progressive Details and live sketch**
  Spec ref: CB0 sections 8, 17-19.
  Build: expandable People / Place / Time groups, category extras, indoor/public venue examples and responsive preview.
  Acceptance: no long mandatory form, no fabricated venue/time/participants; progress represents sketch completeness.
  Verify: short-phone keyboard, reduced-motion and undecided-details cases.

- [ ] **7. Build Review and local completion**
  Spec ref: CB0 sections 8, 9, 17.
  Build: readable summary with targeted Edit links, Finish my sketch, truthful completion, restart/discard controls.
  Acceptance: completion never claims saved or published; review edits preserve other answers.
  Verify: complete/edit/restart walkthrough and copy assertions.

- [ ] **8. Integrate shell, localization and recovery**
  Spec ref: CB0 sections 17-19, 21.
  Build: coordinate central Create/World exit with discard flow; preserve legacy mode query compatibility, theme/language contexts and bottom-nav safe areas.
  Acceptance: full guide art, stable asset-failure fallback, no hidden focused input; EN/FR/ES and themes remain usable.
  Verify: 320/360/390/768/1440 layouts, keyboard and light/dark captures.

- [ ] **9. Verify boundaries and performance**
  Spec ref: CB0 sections 12, 16, 20, 23-24.
  Build: acceptance evidence for routes, reducer, no builder input in URL/storage/network, existing auth/Trust regressions and performance.
  Acceptance: package budget and all relevant tests pass without weakening existing assertions.
  Verify: `npm run lint`, `npm run type-check`, `npm run test`, `npm run build`, focused repository browser harness and exact-head required CI.

- [ ] **10. Review and deliver the bounded preview**
  Spec ref: CB0 sections 24-30.
  Build: hostile self-review, required independent review, exact criterion/evidence mapping, canonical status/changelog updates and scoped PR.
  Acceptance: every reported PASS has evidence; no pending live behavior is marketed as implemented.
  Verify: final diff, evidence matrix, review dispositions and permitted preview walkthrough.

## Candidate integration surfaces

Existing: `src/app/app/create/page.tsx`, `src/views/AppCreatePage.jsx`, `src/components/app/AppShell.jsx`, `src/views/AppDiscovery.test.jsx`, current LanguageContext/ThemeContext and approved UI/brand primitives.

Proposed after CB1 specification: `src/features/circle-builder/` for the reducer, category/guidance registry, question/guide/preview components and focused tests; a dedicated dictionary in the existing i18n system. File names are suggestions, not a requirement for a second framework or schema.

## Later live packages

CB2 must specify authenticated owner-only drafts, server validation, record revisions/conflicts, retention/export/deletion, AUTH account-lifecycle integration, migration provenance, reauthentication and failure recovery. Do not write drafts into public profiles or browser preferences.

CB3 must map the draft into approved Opportunity/Experience/Circle semantics, enforce verified-host and category policy on the server, revalidate publishing, use idempotency and truthful pending/success states, define moderation/operations and money rules where applicable. Skills/music category visibility in CB1 does not authorize their live launch.

CB-AI must use consented minimal inputs, structured suggestions, evaluations and a manual fallback; humans approve any application of consequential suggestions. No autonomous publication, booking, contact, precise-location exposure or charge.

## Handoff instruction

Implement only after the relevant package becomes SPEC-READY. Start by rechecking main and active work; preserve newer auth and design work. Use the founder's exact guide mapping and four-screen flow. Deliver CB1 as a truthful local preview with no external writes, keep help optional, preserve user input, and record verification honestly. Do not merge an unverified implementation merely because a previous chat requested main publication.

## Phase 1 checkpoint

Items 3–4 are verified as unconnected foundation modules at source 8b72790 (CB1-F1 v1.0.2, 27 builder tests). These checks do not claim user-facing CB1 acceptance. Items 1–2 have accepted Phase 2 contracts/assets/baseline/review evidence under CB1-P; #102 controls final checks/main integration. Items 5–10 remain the actual screen/connection/release implementation, followed by explicit full-source/live packages. Follow EXECUTION-PLAN.md and current #99/#100 merge state to resume without repeating the foundation.

## Phase 2 checkpoint

Phase 1 main:2f06fa3. Source brief recovered and mapped in SOURCE-RECONCILIATION.md. Exact SCREEN-CONTRACT, ARTWORK, PERFORMANCE and local-preview authority versioned. Three originals, six 192/384 WebPs and four 96/160 ivory/dark fixtures retained; independent privacy/Trust and design reviews accepted. Eighteen baseline samples and numeric budgets recorded. Preparation source 7bae9a94 passes all five jobs; final delivery-head/readback/merge state is live #102. No new builder screen is connected.

Next: Phase 3 F2, commit a narrowed SPEC-READY Choose/Shape spec before source changes. Keep full 16 subject taxonomy, lesson/content/uploads/quiz, owner drafts, eligibility/evidence/capacity/cohost, publishing/booking/outcomes and optionalAI in their owning packages; no requirement disappears because the preview has four screens.
