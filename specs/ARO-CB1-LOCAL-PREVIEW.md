# ARO-CB1 — Local Circle Builder preview authority
Version 1.0.0 · 2026-10-01 · Owner: ARO founder

## Metadata and authority
Status: SPEC-READY for the bounded screen contract after CB1-P acceptance and integration. Implementation is split into F2/F3/F4; this document is not a runtime verification or a waiver of their source/release gates.
Depends on CB0 v0.1.1 and CB1-F1 v1.0.2 (main 2f06fa3), CB1-P reviewed screen/art/performance preparation. Governing authority: AGENTS → master delivery/build playbook → this package and its narrower F2/F3/F4 specs → architecture/data/design/experience/Trust and durable decisions.
Required reviews: privacy/Trust, product/design/accessibility; each implementation needs exact-head source/CI/review evidence. Preparation review dispositions: ../artifacts/ARO-CB1-P/REVIEWS.md.
Adopted references: ../docs/circle-builder/SCREEN-CONTRACT.md v1.0.0; ARTWORK.md v1.0.0; PERFORMANCE.md v1.0.0; SOURCE-RECONCILIATION.md v1.0.0; public/brand/circle-builder/manifest.json v1.0.0.

## Problem, outcome and goals
Current Create is presentation; pure registry/reducer are unconnected. A visitor should form a truthful local sketch through Choose, Shape, Details and Review, with optional category guide, preserved edits and readable completion. The preview is an incremental milestone of the recovered full MVP, not the full six-stage/draft/host/publication product.
Goals: one obvious action per screen; examples/manual parity; three automatic guides; explicitly accepted curated suggestions; People/Place/Time progressive details; editable actual-entered summary; cancellation-safe transitions; phone/desktop/theme/locale/accessibility parity; no input transmission or persistence.

## Locked scope
Only fields, constraints, navigation, focus and states literally named in SCREEN-CONTRACT. Do not reinterpret three guide groups as launched subject categories. Latest mapping: Tonguee/chameleon→Languages; Squilly/squirrel→Skills; Rockatoo/white cockatoo→Music. One static welcome pose each; no legacy Coco removal/rename.
Opportunity/Experience/Circle terminology and existing verified-host trigger/RLS stay authoritative. No certification, demand, fabricated participants/availability, bookings, money, save/publish/invite action or AI claim.
Source reconciliation preserves16 subject templates, lesson/prerequisites/materials/quizzes, private evidence, three attendance proposed gate, founding-host proposal, reviewed capacity, one cohost, session setup and outcomes for separate owning packages.

## Personas, state and data
Anonymous/signed-in/host/admin visitors have identical local sketch behavior. No cross-user read/write or service-role operation. State belongs to the active builder component/reducer; no persisted entity, schema, migration, index or backfill.
choose→shape→details→review→ready; Back/Edit preserve input; targeted edit returns directly to Review; confirmed category/reset/discard clear only declared fields; cancellation preserves everything. No undo/history promise. Guide/search/disclosures are separate UI state.
Category/title/outcome required; optional omitted logistics “To decide”. groupSize 1–4 is a sketch request, not approved capacity. Explicit date/time/timeZone never implies availability or computes a booked instant. F1 historical numeric1–50 needs an explicit F3 correction before connection.

## Privacy, permissions and Trust
Show memory-only/loss disclosure before editable input. No data in URL/localStorage/sessionStorage/Zustand persistence/logging/crash breadcrumbs/analytics/form GET/server actions/outgoing requests/beacons. Existing theme/language preferences persist only their authorized values.
Render user text as text. No contact, identity, credential, private address, live geolocation or money field. Adult public venue examples; no risky/minor/private-home/service-eligibility assertion. Later owner-only drafts/upload/retention/export/deletion/RLS/live category authority is separate.
Owned same-tab app/external navigation is discard-guarded; modified/new-tab/download behavior when document remains mounted is preserved. Browser reload/back/mobile termination protection is best-effort, disclosed; no private Next APIs/history traps/recovery promise. No network write follows completion.

## AI, API, money and analytics
N/A: deterministic curated text, no provider inference, endpoint/serveraction, remote save, price/payout/entitlement or event collection. Curated proposals require explicit acceptance and cannot overwrite touched/cleared fields automatically. All required functions work with help hidden.
Existing authorized app requests may continue; no request may contain sketch input. F4 canary audit covers headers/body/query/form/beacon/WebSocket/console/storage and every step/edit/exit/reload path.

## UI, responsive and accessibility
Adopt exact primary actions, disclosure hierarchy, focus/error/dialog/success/art failure states from SCREEN-CONTRACT. Reuse existing tokens/typography/LanguageContext/ThemeContext/lucide/framer-motion; no new dependency/font/animation runtime.
320/360/390/768/1440px, short phone/keyboard and safe areas. Desktop readable side sketch; compact phone preview disclosure. Art contain/reserved geometry/full silhouette/adjacent label; failure keeps guide text and manual path.
44px targets, >=16px essentials, AA, semantic labels/aria-pressed/errors, keyboard complete, heading focus after explicit step change, first invalid focus, named modal with focus trap, Escape cancellation and trigger restoration, no destructive initial focus. Reducedmotion equivalent, no looping/nagging/autoplay or forced waits.

## Performance, reliability and tests
Adopt PERFORMANCE measured budgets and method unchanged; use paired three-sample per-case comparisons, disclose updatedsource/browser/environment. Active art only; optimizedsources40/96KiB caps; no original PNG in markup. CLS<=0.01; fixed initialJS/request/timing budgets. No field Web Vitals/INP claim from synthetic fixture.
Manual/offline local interaction, empty search, validation, cancelled suggestion/category/reset/exit, partial logistics, review edit, complete/restart and assetfailure are required. Browser unload loss is a stated limitation, not fake recovery.
Unit/component cases cover state/field constraints, touched preservation, destinationcompatibility, numeric/date/zone validation, review target and suggestions. Production browser covers examples/manual path for3groups, hide guide, keyboard/focus/dialogs, legacyentryquery, shell, short phone, themes and locales and no-input network/storage audit. Existing full lint/types/build/223tests and platform/auth/Trust regressions remain mandatory; changed counts must be reported at actual source.
No criterion is PASS without its implementation evidence.

## Acceptance matrix and phased implementation
| ID | Requirement | Package | Evidence required | Current runtime status |
|---|---|---|---|---|
| CB1-01 | Choose/Shape, category search/examples/manual, optional guide and dictionary | F2 | component+keyboard+3groupcases | F2 integrated via#103 at1f3d403; exact finalca05a50 checks and tested tree accepted; F4 connection remains gated |
| CB1-02 | Detailsfields, 1–4, dates/zone, live actual sketch | F3 | transition/validation/partialplan/mobile | IMPLEMENTED / PARTIAL VERIFICATION; F3 gates |
| CB1-03 | Reviewtarget/return, ready, reset and category dialogs | F3 | complete/edit/cancel/confirmcases | IMPLEMENTED / PARTIAL VERIFICATION; F3 gates |
| CB1-04 | Whole flow/shell guard/legacy query, responsive/themes/locales | F4 | fullproductionbrowser/lightdark/phone/desktop | NOT IMPLEMENTED |
| CB1-05 | Privacy/Trust boundary and no-inputtransport | F4 | canary request/storage/log audit and specialist review | NOT IMPLEMENTED |
| CB1-06 | Artifactfallback/a11y/reduced motion/performance | F4 | actual UI captures+keyboard+budget | NOT IMPLEMENTED |
F2/F3 may land isolated modules without changing Create. Before each source phase, commit its narrower SPEC-READY spec naming exact files/criteria/deltas. F4 connects /app/create only after complete F2/F3 modules and release evidence accepted; no partially-connected flow on main.

## Rollout, recovery and delivery
One branch/PR per subpackage, preserve concurrent auth/design, no database rollback. Revert only bounded UI integration to the existing Create if release regression; never revert unrelated newer main.
Statusrecords+changelog+plan+source, test, review, CI and merge SHAs updated at each checkpoint. CB1 VERIFIED only with all implementation rows accepted, no unresolved high findings and exact-head checks. SHIPPED means accepted route integration on main, not private drafts/publication/store readiness.
Current source package: F3 Details/Review/Ready; nextF4 route/shell integration; futureCB-TAX/CB-CONTENT/CB2/eligibility/evidence/cohost/CB3/P4/P5/A1 remain separatelygated.
