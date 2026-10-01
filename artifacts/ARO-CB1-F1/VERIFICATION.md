# ARO-CB1-F1 verification

## Current Phase 1 continuation — v1.0.1

Source status: VERIFIED at 094818d55ecbddab86255dbbf7d84b0be0c6a4e9, 2026-10-01. This final reconciliation changes documentation/evidence only and retains the preparation parent's review fixes. Its own exact-head checks remain a required main merge gate. Founder main integration authorization is recorded in ADR-CB-PHASES; actual integration is the live merged state of #99 then #100.

- [Quality 36898469817](https://github.com/leonartist7/ARO.club/actions/runs/36898469817): static, browser-smoke, public-website-redesign and english-light-release PASS. Installed Vitest passes 220 tests, including all 24 builder cases; 3 existing skips. Zero-warning lint, type-check and production build PASS.
- [Platform 36898469893](https://github.com/leonartist7/ARO.club/actions/runs/36898469893): PASS. Existing disposable Auth/Trust/RLS/Storage/browser/reset/cleanup fixture is unchanged. This is regression evidence, not new live-draft or category authorization.
- Remote readback of corrected registry/tests exactly matches the tested payload. Source diff contains only the unconnected builder registry/reducer/tests plus scoped governance/evidence. Existing routes, shell, assets, dependencies and provider files are unchanged.
- Two new regressions fail against the old registry and pass after the correction. Supplemental V8 executes 24/24 cases; installed Vitest above is the authoritative unit evidence. Supplemental detail: PHASE1-V8-CASES.json.
- getGuidance now requires a string step that is an own prompt-dictionary key; inherited names and non-string/coercion values return null. No reducer behavior or broader input/security boundary changed.

| Criterion | Evidence | Source result |
|---|---|---|
| F1-01 category/guide/species/locales/indoor examples | Registry, locale, search and mapping cases | PASS |
| F1-02 four-step manual paths/validation | All-category progression and validation cases | PASS |
| F1-03 manual/cleared-field/back/reset/category preservation | Example acceptance, confirmation and edit cases | PASS |
| F1-04 unknown/prototype/numeric/category inputs | Existing negatives plus both guidance-step regressions | PASS |
| F1-05 immutability/optional help/truthful summary | Frozen-state, minimize-guide and undecided-summary cases | PASS |
| F1-06 no consumers/dependency/UI/schema/external writes | Complete diff, unchanged route tree and payload readback | PASS |
| F1-07 repository/new Vitest/required CI | Source Quality and platform runs above | PASS |

Performance: no runtime consumer, route/media change or new dependency; no user-visible performance improvement is claimed. Actual screen baseline/budget and responsive/a11y/mascot/privacy/Trust evidence remain Phase 2–5 prerequisites. Screenshots do not apply to the unconnected foundation.

Local shell provisioning remains unavailable. No local npm/browser result is invented. Historical preparation failure BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_DARK remains in the execution plan; the unchanged fixture passed on subsequent source/platform runs. No existing assertion was weakened.

Next: complete dependency-ordered main merge with current exact-head checks; then Phase 2 precise screen/asset contract and measured Create baseline. CB1 UI, CB2 saved drafts, CB3 publishing and CB-AI are not implemented by this package.

## Original slice evidence — historical

The record below describes earlier source 6ccf4eb/550bb95 and their then-pending checks. Its pending statements are historical and superseded by the current source checkpoint above.

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
- This subsequent evidence update changes documentation only; source remains identical to 6ccf4eb. Newly triggered final-head checks remain a merge gate. No main merge or user-facing implementation is claimed.
