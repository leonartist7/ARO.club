# CB1-F2 Phase 3 verification
2026-10-01 · package v1.0.0 · IMPLEMENTED / browser and final CI acceptance pending.

## Authority and scope
Base main742cb422, observed #102 merged and delivery tree47a637a matches accepted Phase2. Narrowed SPEC-READY F2 authority committed before source at a2a134f. Source PR#103 is the live exact-head CI/main integration receipt. 4 components, dictionary, bounded pure reducer corrections, 16 component/domain tests, isolated production Vite fixture, browser verifier and Quality upload. Production app routes do not import them; no auth/schema/data/dependency/provider change. ORG1#101 and AUTH3#98 untouched.

## Evidence currently observed
Local Linux Node24.19/npm11.9: lint, Next16.3.5 production build, type-check pass;239 tests pass in26files (43 builder cases, three existing skips). New16 cases cover all groups/locales/manual/example paths, trimmed UTF-16/category limits, cleared/touched preservation, named suggestion cancellation/acceptance, category cancellation/shared preservation, guide hide/fallback, no input I/O and invalid mutation rejection. jsdom uses a classic-JSX React global and native-dialog stub only; focus trap/Escape/inertness require actual browser proof.
Local Chromium1234 download returned invalid ZIP; no local browser pass claimed. Isolated fixture build itself passes. Hosted CI supplies the pinned actual browser/runtime checks.

## Required browser evidence
30 width/theme/locale combinations at320/360/390/768/1440; manual keyboard/validation/suggestion/category paths for3groups;12 actual Choose/Shape-component captures at360/1440 across3guides/lightdark; static-image failure and synthetic canary absent from requests, storage, URL and console. Contrast>=3:1 controls, >=16px essentials,44px targets, nooverflow, heading/error/trigger focus, native dialog trap/Escape. These are isolated screens, not connected app or F4 performance/exit certification.
Existing Create baseline must remain335015 encodedJS/19JS/34requests; guide192/384bytes keep40/96KiB bounds. F4 retains paired whole-route performance and complete canary/exit/navigation acceptance.

## Failure history and review fixes
Initial local component runs exposed classic JSX setup, queryAll handling, fireEvent focus semantics and a cleared-field test that had never typed before clearing. Test setup corrected to exercise real user behavior; all16 pass with assertions retained.
Local lint after synthetic fixture build scanned generated bundle output. Fixture output moved under existing ignored dist; no lint assertion/config weakened.
Initial hosted2f5c858 / Quality36932158240 browser failed immediate missing-art count (0!==1) after all30layouts/3keyboardgroups/12captures executed. Browser image-error state commits asynchronously; verifier now waits for the exact expected visible fallback, then retains exact1count. Failed head retained as historical evidence, not approval.
Design found inherited lowcontrastInput borders: scoped approved controltoken now applied to light/dark/hover/focus states; shared primitive unchanged. Browser asserts contrast against both interior/exterior; native focusring retained.

## Acceptance
| ID | Source/local evidence | Final gate |
|---|---|---|
|F2-01|three-group examples/manual/search/locales component cases PASS|hosted browser pending|
|F2-02|required/optional lengths, UTF-16, validation/preservation PASS|hosted focus pending|
|F2-03|explicit allowlisted proposals/category cancel and shared retention PASS|native browser pending|
|F2-04|single active optimized source/decorative contain/fallback implemented|captures/failure pending|
|F2-05|localized copy/scoped tokens/native keyboard semantics implemented|responsive/theme/contrast pending|
|F2-06|no runtime imports/no I/O; unit synthetic canary PASS|browser+production baseline pending|
|F2-07|local239tests/lint/types/build PASS|five exact-head CI jobs pending|

Independent privacy/Trust source review accepted isolated scope. Design source finding corrected; final image review pending. No acceptance row claims hosted PASS before observing it. Next phase is F3 Details/Review, only after founder request and actual F2 integration.
