# ARO-CB1-F1 verification

## Current Phase 1 — version 1.0.2

Source status: VERIFIED at 8b72790543707a634f532cb65bf2d95050ade8f6, 2026-10-01. The final evidence/status commit changes documentation/JSON only; its own exact-head checks remain a main merge gate. Preparation #99 merged at b9a6347fa911188786942ec06f9a4d16931272be. Actual foundation integration is the live merged state of #100.

- [Quality 36901014899](https://github.com/leonartist7/ARO.club/actions/runs/36901014899): static, browser-smoke, public-website-redesign and english-light-release PASS. Installed Vitest passes 223 tests, including all 27 builder cases; 3 existing skips. Zero-warning lint, TypeScript and production build PASS.
- [Platform 36901014997](https://github.com/leonartist7/ARO.club/actions/runs/36901014997): PASS, including the unchanged isolated Auth/Trust/RLS/Storage/browser/reset/cleanup fixture. These tests do not authorize live drafts or category launch.
- getGuidance rejects inherited names and non-string/coercion step values. Two regressions fail against the original registry and pass after correction.
- Category switching retains destination-allowlisted answers and their touched markers, including deliberately cleared compatible answers. Confirmation lists only incompatible nonempty answers. Three regressions fail against the original reducer and pass after correction.
- Supplemental V8 runs all 27 current cases with an assertion adapter; installed Vitest above is authoritative. Details: PHASE1-V8-CASES.json (v1.0.1) and PHASE1-COMPATIBILITY-V8-CASES.json (v1.0.2).
- All changed source payloads were read back and matched exactly. Complete source scope is the unconnected registry/reducer/test files. Routes, shell, assets, Auth, dependencies, providers and schema remain unchanged. Final reconciliation is Markdown/JSON only.

| Criterion | Evidence | Source result |
|---|---|---|
| F1-01 category/guide/species/locales/indoor examples | Registry mapping, locale, search, example cases | PASS |
| F1-02 four-step manual paths/validation | All-category progression and required/length/numeric/venue cases | PASS |
| F1-03 manual/cleared-field/back/reset/category preservation | Existing cases plus all three compatible-answer regressions | PASS |
| F1-04 unknown/prototype/numeric/category inputs | Existing negatives plus both guidance-step regressions | PASS |
| F1-05 immutability/optional help/truthful summary | Frozen-state, guide-minimize, undecided-summary cases | PASS |
| F1-06 no runtime consumers/dependency/UI/schema/external writes | Complete diff, unchanged route tree and remote payload readback | PASS |
| F1-07 repository/new Vitest/required CI | Corrected-source Quality and platform runs above | PASS |

Performance: no runtime consumer or route/media/dependency change, so no user-visible speed improvement is claimed. The real screen baseline/budget, mascot artwork, responsive/a11y evidence and privacy/Trust/design preparation remain Phase 2–5 prerequisites. UI screenshots do not apply to this unconnected foundation.

Review dispositions: the three preparation documentation findings and both foundation findings have concrete corrections and resolved threads. Code corrections had their package amendments committed before source edits. No input/data/eligibility boundary, existing assertion or unrelated source was changed.

Local execution provisioning remains unavailable; no local npm/browser result is invented. Historical preparation run 36887604608 failed BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_DARK and had a cancelled English/light job. Fresh reviewed preparation head 8f78f76 passes all five jobs (Quality 36899374910, platform 36899375014) before #99 merged. Earlier foundation 094818d also passes its five jobs, but it does not verify the later compatibility delta; the current-source runs above do.

Next checkpoint: accept the final documentation-only head checks and merge #100 with the expected head/current main. After its merged state is confirmed, Phase 2 starts from actual main: exact field/navigation/artwork contract and measured Create baseline. CB1 screens, CB2 drafts, CB3 publishing and CB-AI remain unimplemented.

## Original first-slice record — historical

The record below applies to the original first slice and its evidence-only update. Its then-pending statements are superseded by the current v1.0.2 evidence above.

Date: 2026-10-01. Status: IMPLEMENTED / PARTIAL VERIFICATION. Parent preparation PR #99; foundation spec and ADR-CB-F1 precede source edits.

## Supplemental logic execution

All 22 cases in `src/features/circle-builder/builderMachine.test.js` passed using actual registry/reducer source in the available V8 executor. Only module import/export declarations were removed for evaluation; describe/it callbacks and an assertion adapter executed the test bodies. The adapter implements Object.is for toBe, recursive own-key equality for toEqual, null and undefined assertions. This does not execute the installed Vitest runner or replace repository CI. Results: `V8-CASES.json`.

Coverage includes exact guide mapping, locale/indoor examples, accent search, unknown/prototype inputs, immutable state, all-category four-step journeys, trimmed/length/numeric/venue validation, category confirmation, reset cancellation, manual/cleared-field preservation, obsolete example clearing, edit/back and optional guidance.

## Scope

Only new unconnected JavaScript modules and tests plus package/governance/evidence Markdown/JSON. Existing routes, shell, old formation state machine, assets, dependencies and providers remain unchanged. No screen reads personal input through these modules. UI screenshots, privacy input review and performance budgets are not applicable to this unconnected slice and remain prerequisites for the later screen package.

## Pending verification

Local `exec_command` fails before process creation because workspace provisioning is unavailable. npm build/lint/type-check/Vitest and browser verification have not run locally. Hosted checks provide the source evidence recorded below. Do not mark VERIFIED or merge on supplemental V8 evidence alone. Update this record with actual run IDs/results once available.

## Next screen work

Connect a separately approved CB1 interface with category pills, guide rendering, the four-screen flow and responsive preview. Original/licensed mascot artwork, privacy/Trust/design boundary review and measured route budget remain open. Live draft saving, AI and publishing stay separately specified.

## Hosted evidence on source commit 6ccf4eb

- [Quality run 36892903177](https://github.com/leonartist7/ARO.club/actions/runs/36892903177): static PASS, including lint with zero warnings, type-check, production build, 218 unit tests passed and 3 existing skips. The new builder file passed all 22 cases in installed Vitest. Public website redesign and English/light release jobs PASS. Browser-smoke is still running at Chromium installation; it is not accepted as passed.
- [Isolated database run 36892903391](https://github.com/leonartist7/ARO.club/actions/runs/36892903391): platform PASS, including 91 SQL assertions, repeated isolation, Auth/Storage/browser baseline and reset/cleanup.
- Complete compare against preparation parent: exactly 11 files, with three new source/test files and documentation/evidence. All three source files were read back from GitHub and matched the tested payload.
- The original evidence-only commit 550bb95 retained the source from 6ccf4eb; later corrections have distinct source/test payloads and separate verification. Newly triggered final-head checks remain a merge gate. No main merge or user-facing implementation is claimed.
