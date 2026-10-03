# ARO-CB1-P Phase 2 verification
2026-10-01 · Preparation v1.0.1 · PR[#102](https://github.com/leonartist7/ARO.club/pull/102)

## Delivery scope
Preparation authority committed first at c37af4126e1fe4722acc86da4ab0e5c2ae2e8860. Baseline main 2f06fa3ddaae0020d4bca7cd040669bb9ac42346 includes accepted Phase 1 #99/#100 and unconnected F1 v1.0.2.
Current Create/app/reducer/schema/auth/dependencies/provider settings remain unchanged. Source original art088ae57; web exports28ed1e2; compact captures 279462e6. Current final delivery head/checks and resulting main merge SHA are recorded in the live PR receipt; do not invent a future merge SHA.
Local shell provisioning remains unavailable. All executable checks below ran on hosted production builds using repository dependencies, not an unverified local environment.

## Acceptance evidence
| Criterion | Result | Evidence |
|---|---|---|
| P-01 current base/ownership | PASS | main 2f06fa3 pinned; separate ORG1#101 retained; no auth lane edit |
| P-02 recovered brief | PASS | SOURCE-RECONCILIATION.md; original Page sequence 0 and immutable ORG1 reference 7614cc7 |
| P-03 screen/privacy/Trust/navigation contract | PASS | SCREEN-CONTRACT; bounded reviews8e72703; same-tab external loss finding fixed |
| P-04 consistent reviewed art/manifest | PASS | originals; six WebPs; JSON provenance/dimensions/bytes/hashes; four rendered96/160 light/dark captures; review279462e6 |
| P-05 measured baseline/budget | PASS |18 samples; six width/mode cases; committed BASELINE-SUMMARY; reviewed PERFORMANCE |
| P-06 unchanged regression checks | PASS at source 7bae9a94; final-head gate retained | Quality 36910633034; platform 36910632929; required final head in #102 |
| P-07 synchronized durable handoff | Delivery readback/diff gate | LOCAL-PREVIEW authority; plan/checklist/canonical ledgers/changelog; final audit in #102 |

## Hosted source checks
[Quality 36910633034](https://github.com/leonartist7/ARO.club/actions/runs/36910633034) at 7bae9a94b0eb029b3fb738aa0481967869445398: static, browser-smoke, public-website-redesign and english-light-release PASS.
[Platform 36910632929](https://github.com/leonartist7/ARO.club/actions/runs/36910632929): platform PASS. Existing auth/Trust/database fixtures remain regression coverage; no new live eligibility/RLS certification.
Static: lint zero warnings, types/build PASS,223 unit tests PASS including27 builder cases;3 existing skips.
Browser:18 route measurements PASS;4 art theme/size fixtures PASS; RB13 four footer cases; RB16 28 screenshots/36 supporting routes;32 focused view tests;17 preferences cases;25 E2E checks PASS. Assertions retained.
Earlier baseline source 6b5a005: all five jobs PASS; Quality 36909429501, platform 36909429401.
Initial source 5e3a9fd measurement failed at “JS entries must be observable” in Quality 36905978461. Cause: incorrectly escaped JS-extension regex in new harness. Fixed at a4d23ece; assertion preserved. Baseline then passed. No runtime/fixture weakening or unrelated auth fix.
Final delivery makes encoder verification stronger by checking committed WebP bytes against deterministic exports and labels the measurement source reference accurately; it requires a fresh exact-head run, not inherited source PASS.

## Metrics and visual evidence
18 unthrottled production samples, cold browser contexts, running server without explicit route/asset warmup. EncodedJS335015B, transfer340715B,19JS/34total resource entries in every case. Observed layout-shift sum maximum0.00460. Median observed LCP80–172ms. These are short CI observation windows, not field WebVitals or INP/low-end-phone evidence.
WebPs:192px12174–14302B;384px28474–33770B. Original 1254-square transparent PNGs stay in provenance artifacts and must not enter app markup.
[Phone ivory](art-review/guides-360-light.webp) · [Phone dark](art-review/guides-360-dark.webp) · [Desktop ivory](art-review/guides-1440-light.webp) · [Desktop dark](art-review/guides-1440-dark.webp).
These are synthetic artwork fixtures, not screenshots of completed Create screens. CI fullPNG/rawreports have14-day retention; durable WebPcaptures/numeric summary/manifest/review receipts are committed.

## Boundaries and next phase
No input-collecting route connected. Reviewed four-screen authority is SPEC-READY; future F2/F3/F4 need their narrower source specs and runtime acceptance.
Phase 3 F2 implements isolated Choose/Shape/dictionary/examples/manual/guide components; Phase 4 F3 completes Details/Review/recovery; Phase 5 F4 integrates the whole local flow only after full verification. Full-source catalog/content/persistence/eligibility/evidence/cohost/publishing/booking/outcome packages remain explicitly mapped.
BrowserBack/reload/mobile-loss protection is best-effort as disclosed; no recovery/autosave promise. Existing F1group bound1–50 is narrowed to1–4 only under futureF3 authority before connection.

## Final PR tooling review

Four findings addressed: P-03 approval status reconciled; rendered-art assertion rejects an empty list; image accounting includes response-MIME preload/CSS resources with a real two-image probe; generated local export/raw/PNG outputs excluded while selected durable evidence remains tracked. These strengthen synthetic verification only and require fresh final-head CI. Source7bae/5f4e716 full green runs remain historical evidence; #102 carries the corrected exact-head receipt.

Instrumentation failure d4e1f64 / Quality36914988498: the new above-fold-only assertion found zero images at360px. Actual unchanged AppCreatePage places its composition illustration after its stacked chooser. Corrected the harness to require one displayed/loaded page illustration without scrolling the performance snapshot. The count is retained, not weakened to a vacuous every(). Probe stylesheet uses a same-origin synthetic response to respect production CSP.


Instrumentation failure be65296 / Quality36915760492: all18 Create samples passed, but replacing an already loaded document with setContent exposed only one resource timing entry in the synthetic two-image probe. The probe now navigates a fresh context to its own intercepted same-origin HTML/CSS fixture with an explicit self-only CSP. It uses the same response classifier/readMetrics and retains the two-image/css+link assertions; no app response or source changes.
