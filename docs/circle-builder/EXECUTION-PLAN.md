# Circle Builder phased execution plan

Version 1.0.1 · 2026-10-01 · Owner: ARO founder
Status: ACTIVE. Phase 1 source VERIFIED; delivery checkpoint is the live merge state of PR #99 then PR #100. Phase 2 is next after #100 merges.
Authority: founder requested small sequential phases, durable progress records and integration into main on 2026-10-01. ADR-CB-PHASES records that request.

## Execution contract

Work one phase at a time. Before each phase, recheck remote main, the active branch, open authentication/design ownership and the governing package. Commit its scoped SPEC-READY authority before runtime edits. Keep one package/branch/PR, preserve ancestor work, map criteria to evidence and update the canonical status records. Every integrated phase must pass its exact-head required checks and applicable reviews; founder main-integration authorization does not turn missing evidence into PASS.

The written mascot requirements remain Tonguee/chameleon for Languages, Squilly/squirrel for Skills and Rockatoo/white cockatoo for Music. The uploaded MVP attachment remains inaccessible and must be reconciled when available; do not invent its requirements.

## Phases and main checkpoints

| Phase | Package and work | Acceptance checkpoint | Main integration |
|---|---|---|---|
| 1 | CB0 preparation plus CB1-F1 v1.0.1 foundation repair; executable plan; reject inherited/invalid guidance keys; regression coverage; current evidence | Parent and foundation checks pass; exact scope/consumer audit; no app screen, data, provider or dependency change | Merge #99 first, then retarget and merge #100 with normal ancestry |
| 2 | CB1 preparation: exact field/navigation contract, mascot assets/manifest, existing Create baseline, route/media budget, product/design/accessibility and privacy/Trust review | Versioned CB1 screen authority is SPEC-READY; reviewed consistent art; measured budget; attachment limitation retained/reconciled | Documentation/assets only within approved package; no input-collecting route until review accepts the boundary |
| 3 | CB1-F2 Choose/Shape screen modules and UI dictionary; category search, example/manual paths, compact optional guide, explicit suggestion acceptance | Each category works with keyboard; user edits survive; components verified in isolation; current Create remains usable | Scoped screen modules may land without changing the active route |
| 4 | CB1-F3 Details/Review/completion modules; People/Place/Time groups, live sketch, targeted Edit/return-to-review, undecided logistics | Complete in-memory flow; truthful completion; category/reset/exit dialogs preserve edits; no saved/published claim | Integrate complete screen modules under approved CB1 authority |
| 5 | CB1-F4 route/shell integration and release verification | 320/360/390/768/1440 widths; short-phone/focus/safe areas; accessible/reduced-motion states; asset failure; locales/themes; no input in URL/storage/network; regression/performance/required reviews pass | Connect /app/create only when the complete local flow is accepted; preserve legacy mode query compatibility |
| 6 | CB2 authenticated owner-only private drafts | Dedicated SPEC-READY data/privacy package; server validation; hostile RLS matrix; revisions/conflicts; save/resume/edit/delete/retry/session recovery; export/retention/account deletion integration | Separate reviewed migration/runtime package; coordinate with AUTH2/AUTH3 readiness |
| 7 | CB3 publishing | Dedicated SPEC-READY publishing package; Opportunity/Experience/Circle mapping; server host/category eligibility; explicit approval; idempotency; moderation/operations; truthful pending/error/success | Publish only eligible approved categories; do not infer Skills/Music live launch from their preview pills |
| Optional 8 | CB-AI after A1: generative mascot suggestions | Minimal consented inputs, structured output, evaluation/cost/latency/failure controls, manual fallback, explicit acceptance | Separate package; never autonomous publishing, booking, contact, location exposure or payment |

Phase 1 integrates reusable foundation code. It does not switch the Create interface. Phases 3–4 allow small reviewable deliveries while phase 5 is the complete user-visible route checkpoint. Saving and publishing are explicit later outcomes, not features of the local preview.

## Phase 1 task list

- [x] Pin current main: 97d9086b1bfb6946653f6ee6baea481cbdc894c5.
- [x] Locate preparation #99 at e9b61701d64db052684f853c99cb739c2c397fae and foundation #100 at 550bb956c47e00d4125a3bdf730791606b3131df.
- [x] Inspect source, specs, original tests and current CI; confirm app routes do not consume builder modules.
- [x] Reproduce inherited guidance-key defect in actual registry source.
- [x] Verify foundation head's static/browser-smoke/platform/public-website-redesign/english-light-release jobs pass.
- [x] Commit phase authority, foundation correction and additional regression coverage on PR #100; source 094818d55ecbddab86255dbbf7d84b0be0c6a4e9.
- [x] Verify foundation source 094818d: all five main CI jobs pass; synchronize its criteria/evidence. Final delivery-head checks remain a merge gate.
- [ ] Merge preparation first and foundation second, without bypassing required checks.
- [ ] Verify main contains the accepted foundation and record its SHA and next phase.

Historical preparation CI failure: run 36887604608 failed BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_DARK; English/light was cancelled. Preserve this failure. Foundation run 36893719678 subsequently passed the unchanged platform fixture; fresh preparation evidence is required before its merge. No assertion is weakened and no unrelated auth/browser change is authorized by Phase 1.

## Durable recovery record

Active preparation PR: https://github.com/leonartist7/ARO.club/pull/99
Active foundation PR: https://github.com/leonartist7/ARO.club/pull/100
Foundation authority: ../../specs/ARO-CB1-F1-LOGIC-FOUNDATION.md
Product flow: ../../specs/ARO-CB0-CIRCLE-BUILDER-PREPARATION.md
Build checklist: IMPLEMENTATION-CHECKLIST.md
Evidence: ../../artifacts/ARO-CB1-F1/VERIFICATION.md

If a chat stops, read this plan, AGENTS.md, the canonical current-state/spec/status chain and the active package. Fetch actual heads rather than assuming the recorded SHA is still latest. Continue the earliest incomplete task; retain test failures, pending reviews and newer authentication work. Never restart the builder from an older main snapshot.

## Phase delivery record

Every phase records: package/version, branch and source SHA, changed files, criteria/test/evidence matrix, CI run links, relevant screenshots/metrics/review dispositions, deviations, main merge SHA, remaining blockers and the next executable task.

Current next task: complete Phase 1 foundation correction and hosted verification. After its accepted main integration, Phase 2 starts with the Create baseline and the precise screen/asset contract.

## Preparation review dispositions

- Durable phase decision: ADR-CB-PHASES now exists in this preparation tree; the plan no longer depends on a descendant-only record.
- Active owner/status: current-state, spec-index and implementation-status records identify PR #100, v1.0.1 source, the reproduced/corrected defect, actual CI results, pending checks and next task. This tree does not contain or claim merged runtime code.
- Destructive actions: CB0 v0.1.1 distinguishes preserving navigation/edits from explicit confirmed discard. There is no undo/history promise; cancellation preserves input. Foundation source remains unchanged by this clarification.

## Source checkpoint and next phase

Source 094818d55ecbddab86255dbbf7d84b0be0c6a4e9 is VERIFIED by Quality 36898469817 and platform 36898469893. All five main jobs pass. The final documentation-only reconciliation must pass its own required checks before merging; do not treat the source result as permission to bypass those checks.

Live #99/#100 merge state is authoritative for the remaining integration checkboxes. Once #100 is merged, Phase 1 is complete and the next executable task is Phase 2: baseline current /app/create and commit the exact field/navigation/mascot-asset contract with its review and performance evidence. The next phase updates the merge SHAs and checks these remaining integration rows; it must not repeat completed foundation work.
