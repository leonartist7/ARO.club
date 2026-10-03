# ARO-CB1-P — Circle Builder Phase 2 preparation

## 0. Metadata
- Status: SPEC-READY for preparation tooling/documents/assets only. Reviewed screen authority is recorded in ARO-CB1-LOCAL-PREVIEW.md v1.0.0; F2/F3/F4 still need narrowed source specs and their own verification. Preparation source/evidence is accepted; final #102 delivery-head CI/main integration is enforced by its live PR state.
- Spec version: 1.0.1
- Owner/director: ARO founder; execution requested 2026-10-01.
- Branch: codex/circle-builder-phase2-preparation-20261001
- Depends on: CB0 v0.1.1; CB1-F1 v1.0.2 integrated through #99/#100.
- Baseline: main 2f06fa3ddaae0020d4bca7cd040669bb9ac42346, tree 901c646e46c6cb4de6930584b4d2c4a931cf36fa.
- Blocks: F2/F3/F4 input-collecting screen and route integration.
- Governing docs: AGENTS, MASTER_DELIVERY_PLAN, CURRENT_STATE, INFRASTRUCTURE, SPEC_INDEX, IMPLEMENTATION_STATUS, AUTONOMOUS_WORKBOARD, BUILD_PLAYBOOK, ARCHITECTURE, DATA_MODEL, DESIGN_SYSTEM, EXPERIENCE_SYSTEM, TRUST_SAFETY, DECISIONS; CB0 and F1 specs.
- Required reviewers: independent privacy/Trust; product/design/accessibility; repository PR review.
- Updated: 2026-10-01.

## 1–5. Problem, outcome, timing, goals and scope
Phase 1 provides unconnected logic. It lacks exact UI contracts, reviewed artwork and a measured route budget. This preparation makes the next screen packages executable without collecting inputs or changing the current app.
Deliver a field/navigation authority, reconciled source requirements, mascot manifest, repeatable baseline and evidence-linked handoff.
Authorized edits: this spec, circle-builder documentation, review/evidence artifacts, original guide assets/manifest, a synthetic production-browser measurement script, a package-scoped Quality step and canonical ledgers.
No app source, reducer, schema, auth, provider, live data, new dependency, analytics, publication, save, booking or charging change. Later screens require their own SPEC-READY subpackage, adopting the accepted screen contract.

## 6. Locked invariants
Latest explicit mapping wins over older brief names: Languages → Tonguee/chameleon; Skills → Squilly/squirrel; Music → Rockatoo/white cockatoo. Existing Tonguee/Coco identity remains.
Four-screen memory-only preview is an incremental milestone, not delivery of the full six-stage MVP. Original brief is recovered from Page sequence 0 through ORG1's immutable repository reference. Account/attendance/capacity policy remains proposed, not approved live behavior.
Opportunity is the arrangement, Circle its participant cohort and Experience the lesson format. No new competing backend entity.
Only deterministic suggestions, explicitly accepted; no inference provider. No host certification or commercial promise.
Existing categories are three preview guide groups, not the full 16-subject catalog or live eligibility. Catalog expansion needs its own template/taxonomy package.

## 7–11. Personas, journeys, state and data boundaries
This preparation changes no user permission, endpoint, persisted entity, migration or RLS policy. Anonymous/ordinary/host/admin users retain existing behavior. Service role is unused.
Future CB1 users may edit only their transient component state. Details are specified in SCREEN-CONTRACT.md.
Future legal transitions: choose → shape → details → review → ready; Back preserves inputs. Review Edit targets Shape or a named Details group and returns directly to Review after successful validation. Category selection preserves shared and destination-compatible fields; incompatible nonempty answers require cancellation-safe confirmation. Reset and leave discard require explicit confirmation.
Browser measurement visits only fixture /app/create variants and saves synthetic metrics/screenshots. No account identity, input collection or backend write.

## 12. Privacy
Before the first editable input: “This sketch stays here while you build it. It isn't saved or published. Leaving or reloading clears it.”
Keep builder state in component/reducer memory only. No values in URL, local/session storage, persistence middleware, logs, telemetry, crash breadcrumbs, form GET, server actions or outgoing request. Input text renders as text. Do not send a beacon on exit.
Existing authorized theme/language preferences may persist without builder data. No clipboard/share/export/history feature in CB1.
No identity, contact, precise/private address, geolocation, credentials, availability inference or financial field. Optional user-entered date/time is a sketch, not a booking or public availability signal.
Unloading clears state; same-app navigation uses a discard guard. Browser beforeunload is best-effort native protection, not a guaranteed recovery mechanism, especially on mobile.

## 13. Trust and safety
Adult public-place examples only. Do not show fabricated attendance, qualifications, approvals, host cap, permissions, demand or venue availability.
Source's four-learner ceiling informs the preview field constraint (1–4), without authorizing a server policy. F1's historical 1–50 bound must be narrowed under F3's explicit authority before route integration. No automatic founding-host exception or three-attendance gate.
Sensitive categories, children, risky activities and precise meeting instructions require their later specialist packages. Guide text does not certify safety, venue permission or competence.

## 14–16. Money, AI, API
N/A: no marketplace amounts, entitlements, provider inference or API writes. No price, paid claim or fake AI/saving state. Curated examples remain labelled examples. Existing app GETs are baseline context, not permission to transmit sketch text.

## 17–19. UI, responsive and accessibility
SCREEN-CONTRACT.md is the exact future implementation reference. It covers empty/search/validation/confirmation/minimized guide/art failure/undecided/review/ready states.
One dominant action; contextual optional guide; desktop side sketch and phone disclosure. Existing orange-led tokens/type and themes/locales, 44px targets, >=16px essential text, AA contrast, labelled inputs/errors, logical focus, keyboard dialogs and reduced-motion equivalents.
Verify 320/360/390/768/1440; short-height phone and keyboard; persistent shell footer safe-area clearance. Artwork shows full silhouettes with reserved dimensions, contain sizing and stable labelled fallback.

## 20. Performance
Measure current unchanged Create before final thresholds. Script uses installed Playwright and production-server helper, no dependency.
For 360x740 and 1440x900, take three new-context cold-browser samples each of learn/share/gather at EN/light. This is a single-running-server/cold-browser unthrottled CI lab baseline (no explicit route/asset warmup), not field Web Vitals or a low-end device claim.
Record same-origin/all resource counts and transferred/encoded JS and image bytes, DOMContentLoaded/load, FCP/LCP observed by 500ms after network idle, CLS, rendered readiness, errors/writes and screenshot. Count non-resource navigation separately; record entries rather than treating transferSize=0 as absent resources. No INP claim from an unedited fixture.
Same harness/settings required for F4 before/after comparison. Final thresholds and measurement limitations go in PERFORMANCE.md after baseline exists.
No video/3D/new font/remote avatar/animation runtime. Inactive guides not fetched eagerly; reserve art dimensions.

## 21–22. Reliability and measurement
Artwork failure → labelled static category icon, all fields usable, no endless retry. No image loading blocks progression.
Empty search → clear search, keep manual fallback. Validation → preserve input and focus first invalid field. Cancel discard/category/reset → preserve state and restore trigger focus.
Offline local editing after initial load remains usable. Reload is disclosed loss, not save failure.
No new product analytics. Baseline is synthetic measurement only; CI artifacts expire after 14 days, final numeric/source report committed durably.

## 23–24. Tests, acceptance and evidence
| ID | Requirement | Verification | Evidence | Status |
|---|---|---|---|---|
| P-01 | Current main/ownership and Phase 1 integration pinned | GitHub branch/PR metadata | VERIFICATION.md | PASS: 2f06fa3; concurrent ORG1 #101 preserved |
| P-02 | Original brief reconciled field by field | Immutable Page-reference copy; mapping review | SOURCE-RECONCILIATION.md | PASS: source mapping independently reviewed |
| P-03 | Exact field/navigation and privacy/Trust contract | Independent specialist review | SCREEN-CONTRACT.md; REVIEWS.md | PASS: bounded independent review at 8e72703; runtime verification excluded |
| P-04 | Consistent art/provenance/manifest reviewed | Full silhouettes/theme/mobile review | manifest; ARTWORK.md; art-review captures | PASS: independent review at 279462e6 |
| P-05 | Existing route measured and budget derived | Production Playwright 18 samples | BASELINE-SUMMARY.json; PERFORMANCE.md | PASS: 6b5a005, reviewed budget |
| P-06 | Existing regression gates unchanged and exact head passes | Quality/platform jobs | VERIFICATION.md; live #102 | PASS at 7bae9a94; final delivery-head checks required |
| P-07 | Durable next package gates and status synchronized | Final diff/readback | ledgers; execution plan; #102 | PASS at 5f4e716: 18 exact payload/six binary readbacks and 35-file scope audit; corrected-head readback/CI enforced in #102 |
SPEC-READY screen handoff requires P-02–P-07 accepted, including artwork and independent boundary/design review. Green CI alone is insufficient.

## 25–26. Rollout and recovery
One preparation branch/PR into main after checks/review. Current Create remains unchanged; no runtime flag/migration needed. A preparation revert removes only added tooling/docs/assets and restores Quality step; no user records to recover. Do not revert unrelated concurrent auth/design work.
F2 can implement isolated Choose/Shape after authority is accepted. F3 completes Details/Review/recovery. F4 alone connects the fully verified route.

## 27–28. Required review
Independent privacy/Trust and product/design/accessibility review must inspect the final contract/assets and source reconciliation. Review receipts are recorded in artifacts/ARO-CB1-P/REVIEWS.md: privacy/Trust at 8e72703; complete design/art/compact-theme/budget at 279462e6. Approval is bounded preparation acceptance; actual runtime, accessibility, navigation and input boundary remain later verification. Founder direction is not approval of unseen artwork.
AGENTS self-review item 8 requires specialist review before merge of privacy/Trust work.

## 29–30. Delivery
Preparation VERIFIED only with all P rows PASS, exact-head required CI, no unresolved high findings, final minimal diff/readback and updated ledgers. Screen packages and full MVP stay distinct.
Delivery record belongs in artifacts/ARO-CB1-P/VERIFICATION.md, with separate source, delivery and main SHAs and no invented future merge receipt.
