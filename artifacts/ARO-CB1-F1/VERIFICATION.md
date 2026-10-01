# ARO-CB1-F1 verification

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
