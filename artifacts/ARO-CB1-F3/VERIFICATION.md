# CB1-F3 Phase 4 verification
2026-10-03 · v1.0.0 · VERIFIED isolated source; final delivery/main gate in [PR #104](https://github.com/leonartist7/ARO.club/pull/104).

Phase 3 #103 merged at 1f3d4038334c7d3f7b95e7a9dc389954fc121746 with accepted tree 279ce458662e98cdea524b226b16f0bf07f2d9bd. F3 SPEC-READY authority was committed before code at d3b90c427b9270e52171eecc2f5f5a7fdc480d2f. Accepted implementation source: d8e5146554a207e7766b22f76580e74b13bc6d36; source tree a75a6bf8b4131b57b9ab8b498a8225c255e7e860. GitHub's tested synthetic merge tree a75a6bf8b4131b57b9ab8b498a8225c255e7e860 equals that source tree. One bounded branch/PR. ORG1 #101 and AUTH3 #98 remain untouched.

## Local and hosted quality
Windows Node 24.19 / Vitest 4.1.10: full 258 tests in 27 files PASS, including 62 builder cases (19 new); three existing skips. Full lint with zero warnings, type-check and Next 16.3.5 production build PASS. Historical F1 size50 success is narrowed to4 and Edit/Back expects Review per approved targeted-return contract; all other existing assertions retained. Hosted static/platform and existing website/browser/auth/Trust regression gates pass at the accepted source.

|Source check|Observed job|Result|
|---|---|---|
|english-light-release|[111086916398](https://github.com/leonartist7/ARO.club/actions/runs/37082848044/job/111086916398)|PASS|
|platform|[111086916159](https://github.com/leonartist7/ARO.club/actions/runs/37082848061/job/111086916159)|PASS|
|browser-smoke|[111086916114](https://github.com/leonartist7/ARO.club/actions/runs/37082848044/job/111086916114)|PASS|
|public-website-redesign|[111086916098](https://github.com/leonartist7/ARO.club/actions/runs/37082848044/job/111086916098)|PASS|
|static|[111086915897](https://github.com/leonartist7/ARO.club/actions/runs/37082848044/job/111086915897)|PASS|
Quality run: https://github.com/leonartist7/ARO.club/actions/runs/37082848044
Platform run: https://github.com/leonartist7/ARO.club/actions/runs/37082848061

## Actual browser and visual evidence
Local Windows and hosted Linux production Vite fixtures both pass 30 full-flow cases: widths320/360/390/768/1440 × light/dark × EN/FR/ES. Browser 151.0.7922.34; Playwright 1.62 / Chromium1234. Cases cover example/manual, hidden guide, single active group, actual entered summary, 1–4 planned seats, calendar/time/named-zone and explicit-zone validation, invalid field preservation/focus, all named edit/direct return/summary focus, cross-section invalid edit recovery, truthful Ready, Edit sketch and native reset modal trap/Escape/cancel/focus restoration/confirmation. Additional date-only partial planning and failed Music art remain usable. Zero page errors, canary leakage or network writes.

Local actual pixels and hashes: BROWSER-REPORT.json and captures/*.webp, 36 captures (3 guides ×360/1440 ×light/dark ×Details/Review/Ready). Phone360 native; desktop resized720 for review. Full PNGs/raw hosted output remain in cb1-f3-isolation CI artifacts for14days. HOSTED-BROWSER-REPORT.json independently records the hosted source/merge/browser/cases/hash result; its pixels can differ by OS. Both reports preserve evidence provenance. Independent design review inspected all36 committed local captures. Root sampled phone Details/Review and desktop Details/Ready: readable text, complete artwork, no clipping/overlap. No screenshot coverage claim for other widths; those have browser geometry/interaction assertions.

Existing Create measurement remains 18 cold-browser-context samples:335015 encoded JS bytes /19 JS requests /34 resources; image bytes unchanged. No app route imports these new modules. Fixture production measurements do not claim field Web Vitals/INP. Connected Create/shell/exit/reload/legacy queries and whole-route paired performance budgets remain Phase5 CB1-F4.

## Review and correction history
Both required specialists accepted final bounded source/evidence; REVIEWS.md records scope and dispositions. Corrected four findings: typing focus stolen by error rerenders; numeric keyboard unable to enter date/time separators; modern Intl accepting signed fixed offsets; retained invalid Shape edits blocking Details invisibly. Explicit focus refs, text keyboard, signed-offset rejection and routing to the owning invalid editor are regression-covered in both directions.

Initial local browser attempts failed waiting for Languages before any case completed; no runtime page errors. Fixture HTTP guard used Linux slash against Windows paths and rejected requests403. Platform path.sep fixed the same containment guard; fresh30/36 passed. No assertion weakened. Initial npm cache EPERM was resolved using a writable cache; existing dependencies/lock unchanged. No historical failed attempt is reported as a pass.

## Acceptance
|Criterion|Accepted evidence|Source result|
|---|---|---|
|F3-01|exact optional limits,1–4, calendar/time/zone domain/component/browser|PASS|
|F3-02|one group, actual text, omissions To decide; component/browser/captures|PASS|
|F3-03|named edits, direct return, first-invalid/summary focus and preserved edits|PASS|
|F3-04|unsaved/unpublished Ready and native cancel/confirm/reset/focus|PASS|
|F3-05|30 themes/locales/width cases,36 actual captures, manual/art fallback/a11y|PASS|
|F3-06|no input I/O, public/coarse place, adult helper, no capacity/availability claims, unchanged route baseline|PASS isolated F3|
|F3-07|258 tests, lint/types/build, source five jobs, both independent reviews and durable evidence|PASS source; final delivery gate #104|

Automated Codex review subsequently identified three P2 corrections: stale zone-required after clearing date/time, invisible length limits while errors replace helpers, and missing collapsed aria-controls targets. The delivery includes bounded repairs: clear only obsolete dependent zone-required, include the localized helper/limit in overlength error text, and retain hidden target containers while their fields remain unmounted. Existing19 new domain/component cases and all30 browser flows now assert these repairs. Both independent specialists re-reviewed and renewed bounded approval; prior normal36 visual reviews remain applicable. Corrected local19 focused cases and lint pass; the full corrected local/browser outcomes are recorded in the final PR receipt and updated local report. The original d8e5146 hosted receipt is historical source evidence; the corrected delivery requires its own five passing checks.

Corrected delivery local full258 tests/27files/62buildercases and lint PASS. Fresh corrected production browser30cases/36captures PASS with zero errors/leakage/writes; BROWSER-REPORT.json records working-tree repair provenance. All36 capture hashes exactly equal the previously reviewed committed images, so the visual approvals remain applicable. HOSTED-BROWSER-REPORT.json intentionally retains the original d8e5146 hosted source/merge receipt; the corrected hosted report and exact final checks are recorded in#104's final delivery receipt/CI artifacts.

#104's live checks and merge receipt are the final integration authority; do not invent a future merge SHA or inherit old head checks. Verify main and accepted delivery tree after normal expected-head merge. This avoids a self-referential evidence commit loop.

No connected-app, whole CB1 release, draft/save/publish, schema/auth/provider/dependency or input-transport claim. Next Phase5 only on founder request.
