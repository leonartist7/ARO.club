# Circle Builder Create baseline and budget
Version 1.0.0 · ARO-CB1-P · 2026-10-01

## Observed baseline
Unchanged runtime from main 2f06fa3ddaae0020d4bca7cd040669bb9ac42346. Measurement source 6b5a0052310c05112c85d7fa5117f8ef6b3ff2b9; [Quality run36909429501/job110528094934](https://github.com/leonartist7/ARO.club/actions/runs/36909429501/job/110528094934). All 18 samples passed route200, EN/light, no overflow/pageerrors/writes. The original viewport-only image list could be empty on phones; final instrumentation separately requires loaded, displayed artwork across the page.
Production Next/Chromium; 360x740 and1440x900; learn/share/gather; three fresh browser contexts per case; reducedmotion; no network/CPU throttling; one server started before measurement, no explicit route/asset warmup. Recordings end500ms after networkidle. First sample may include server/cache warmup. These are CI lab snapshots, not field WebVitals/slowphone/INP evidence.
The timing called renderedReadyMs includes networkidle's quiet window and two frames after fonts/heading readiness; it is not a user-perceived render metric.
The cls field sums non-recent-input shifts in the short observation window; it is a conservative shift budget, not full-session Web Vital CLS.
Raw per-sample resources, six screenshots and JSON are in cb1-create-baseline CI artifact (14-day retention). Durable numeric summary: ../../artifacts/ARO-CB1-P/BASELINE-SUMMARY.json. JS transfer is340715bytes (encoded335015),19 JS requests. Total resource entries34; one image per case. TransferSize/encodedBodySize are kept separately; zero-transfer entries remain in raw report. HTML transfer is separate.

| Width | Entry mode | Median encoded JS bytes | Median encoded image bytes | Median FCP ms | Median observed LCP ms | Maximum CLS | Median lab readiness ms |
|---|---|---:|---:|---:|---:|---:|---:|
| 360 | learn | 335015 | 62540 | 84.0 | 160.0 | 0.00460 | 747.2 |
| 360 | share | 335015 | 54702 | 52.0 | 148.0 | 0.00460 | 715.0 |
| 360 | gather | 335015 | 65630 | 80.0 | 80.0 | 0.00460 | 733.6 |
| 1440 | learn | 335015 | 157776 | 96.0 | 164.0 | 0.00341 | 761.3 |
| 1440 | share | 335015 | 123024 | 64.0 | 148.0 | 0.00341 | 727.9 |
| 1440 | gather | 335015 | 163214 | 64.0 | 172.0 | 0.00011 | 747.6 |

## Approved candidate budget for F2/F3/F4
This constrains later implementation; it is not a claim the builder is already measured. Independent design review accepts the comparison method and asset budgets. F4 must run fresh baseline and after measurements with the same harness/browser/settings and disclose source changes.
| Measure | Required bound | Reason / comparison |
|---|---|---|
| Initial encoded JS | <=367783bytes and <=32KiB over a paired current baseline |335015 observed +32768; use existing dependencies |
| Initial JS transfer | <=389867bytes and <=48KiB over paired baseline |340715 observed +49152; allow extra chunk headers |
| Initial resource count | <=38 and <=4 more than paired baseline |34 observed; no remote guide/font/telemetry |
| Initial guide requests | One active source at most; zero inactive sources | No eager fetching all guides/poses |
| 192px guide file | <=40KiB | Actual12174–14302bytes; 96px compact |
| 384px guide file | <=96KiB | Actual28474–33770bytes; desktop/high-density |
| Total initial encoded image bytes | <=paired case baseline +48KiB | Reserve dimensions; serve WebP, never originalPNG |
| CLS | Each sample<=0.01 | Existing maximum0.00460; reserve guide/preview space |
| FCP / observed LCP / lab readiness | Per-case three-sample median<=paired baseline + max(100ms,25%) | Compare repeatable lab changes, retain min/max variance |
| Input responsiveness | Measure F4's new interaction; no INP baseline exists in fixture | Synthetic latency reported separately; no field-INP claim |
| API/input network | No sketch-bearing request, no new data endpoint/write | Privacy boundary, no network operation |
| Dependencies/media | No new package/font/video/3D/animation runtime | Existing stack sufficient |

Paired case must keep viewport, initial entry mode, release flag, locale/theme, reducedmotion, Chromium revision, context/cache and observation window consistent. Do not compare a warm reused browser to this cold-context baseline. Record renderer/version/host and repeat three samples, retaining failures and outliers; do not discard an inconvenient first sample. If an unrelated main change alters baseline, name it and approve a revised budget; never relabel a regression as PASS.
These relative budgets are useful for regression, not a claim that163214 imagebytes or327KiBJS is globally optimal. Release performance additionally requires real route/focus/input tests at the specified phone widths. A low-end/throttled or field performance assertion needs its own evidence.

## Instrumentation review correction

Final PR review strengthened the harness: existing fixture artwork must include exactly one rendered loaded image, not an empty collection. Image budgets classify network responses by image Content-Type, including preload/link and CSS initiators. A real two-image synthetic preload/CSS probe verifies both request/byte accounting; it collects no user input. Generated exports, raw baseline and PNG/JSON fixture output are excluded from routine commits; selected durable WebPs/summary/manifest remain versioned.

The unchanged phone layout puts its illustration below the initial fold. Rendered-image validation therefore checks nonzero geometry/display/visibility/opacity across the document and a nonempty expected count. It preserves the original scroll position for the performance snapshot; this is not a promise of above-fold artwork. Raw report schema v2 records renderedImages and the preload/CSS probe.
