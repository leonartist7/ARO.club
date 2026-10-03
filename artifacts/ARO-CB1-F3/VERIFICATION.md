# CB1-F3 Phase 4 verification
2026-10-03 · v1.0.0 · IMPLEMENTED / PARTIAL VERIFICATION.

Phase3#103 merged1f3d403/tree279ce458 matches finalca05a50 tested merge; allfive checks observed PASS. F3 authority committed before code atd3b90c427b9270e52171eecc2f5f5a7fdc480d2f. One bounded branch/PR; no route/schema/auth/dependency/provider or input transport change. ORG1#101/AUTH3#98 untouched.

Local Windows Node24.19/Vitest4.1.10: baseline43 builder cases PASS; current full258tests in27files PASS,62buildercases (19new), three existing skips. Lint, type-check and Next16.3.5 production build PASS. Historical F1 size50 success expectation corrected to4; Edit→Back now expects Review per approved targeted-return contract. Assertions retained with new boundary/recovery cases. Browser/hosted gates pending.

Source reviews identified and corrected: error-state rerenders stealing input focus (consume explicit validation ref only); numeric keyboard unsuitable for date/time separators (text mode); modern Intl accepting fixed offsets (reject signed offsets); invalid retained Shape edits blocking Details invisibly (route/focus correct editor with Review-return intent). Meaningful domain/component regression coverage includes the invalid edit chain and reciprocal invalid Details completion recovery. Both specialists accept corrected source conditionally on browser/exact-head evidence. Receipts in REVIEWS.md.

Initial local production fixture browser failed waiting for Languages before any case completed; diagnostics showed no page runtime errors. Cause: fixture HTTP directory boundary used a Linux slash against Windows paths, rejecting every fixture request403. The new F3 verifier now uses platform path.sep with the same directory guard; no verification assertion weakened. Chromium1234 exists locally. Fresh browser evidence remains required.

|Criterion|Evidence required|Current|
|---|---|---|
|F3-01|exact optional constraints/calendar/time/zone|domain/component PASS; browser pending|
|F3-02|single group/live actual text/undecided|component PASS; browser/captures pending|
|F3-03|targeted return/firstinvalid/summaryfocus|component PASS; browser pending|
|F3-04|truthful Ready/native reset/cancel/confirm|component PASS; native browser pending|
|F3-05|themes/locales/widths/manual/art/a11y|component/source PASS;30cases/36captures pending|
|F3-06|no I/O/Trust/current route baseline|source/canary unit PASS; hosted audit/baseline pending|
|F3-07|quality/independent reviews/exact-head CI|local258/lint PASS; remaining gates pending|

The test-only Vite fixture is a production build using existing tools, no Next route. Phase5 retains full route/shell/unload/legacyquery/performance release acceptance. No connected app, field WebVitals/INP, save/publish or complete MVP claim.
