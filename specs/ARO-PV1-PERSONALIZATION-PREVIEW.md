# ARO-PV1 — Personalization visual preview

## Metadata and authority
- Version: 1.0.0; 2026-09-22.
- Status: SPEC-READY for isolated synthetic frontend implementation; production systems remain blocked.
- Founder instruction: “Ok build the pages now beautiful best guidelines UI UX layout responsive and attractive on brand iphone and android phones.”
- Approved input: the preceding Your Little World creative brief and displayed artwork.
- Base: f37dc084d7172415f581a41e90d2edd9ba3738b9.
- Branch: codex/aro-personalization-preview-20260922.
- Scope interpretation: the founder now authorizes building the proposed visual pages. This does not authorize payments, real inventory, Seasons progression, backend changes or release.
- Governing: AGENTS.md, master delivery plan, build playbook, ARO design/experience systems and ARO_SEASONS_AR.md. Preserve all F7/I0/P1 and independent/human release gates.

## Problem and outcome
The approved profile/character/shop/space/Season concepts exist as images only. Deliver connected responsive pages with truthful sample content and working local preview controls.

## Ownership and dependencies
Add only src/app/app/personalize/**, src/components/personalization/**,
src/data/personalization/**, src/i18n/personalization/**,
public/personalization/**, specs/ARO-PV1-PERSONALIZATION-PREVIEW.md,
docs/personalization-preview/** and e2e/personalization-preview.mjs.
Append package-only entries to ARO_SPEC_INDEX.md, ARO_IMPLEMENTATION_STATUS.md,
ARO_CURRENT_STATE.md and ARO_CHANGELOG.md after verification.
No shared shell/profile/legacy store, F7 files, dependency, provider or controller-ledger changes.
Read-only PR inventory found existing F7 owners and a separate monetization documentation PR; no overlapping personalization implementation PR. Pin/read current remote status before publication.

## Locked behavior
- Routes: /app/personalize (profile), /app/personalize/character, /app/personalize/shop, /app/personalize/space, /app/personalize/season.
- Preserve AppShell and every existing route. New subnavigation only inside these pages.
- Sample persona Maya; clear sample-preview label. No founder personal information.
- Local React context holds saved preview and independent drafts within the mounted preview area. Reload/reset restores defaults. No inventory/localStorage/backend writes.
- Character: original supplied/generated avatar; try/remove hat; accessory kit preview separately where fitted layers do not exist; stage atmosphere preview; save/cancel distinct.
- Shop: Featured/Wear/Decorate/Memory filters; search; item sheet; preview routes to the correct editor. No price, purchase, balance or entitlement mutation.
- Space: fixed image stage, five explicit placement zones; compatible-item selection, replace/remove, undo, cancel/save. All reachable without dragging.
- Season: four static chapters with readable details; free/Season+ comparison sheet; no claim button, progress awards, checkout, timer or fabricated verified state.
- Existing theme and language contexts, English/French/Spanish copy. Reduced-motion parity.

## State, privacy, authorization and reliability
Editing: saved -> draft -> apply (in-memory) or cancel (restore saved).
Navigation away from editor discards draft; saved session preview survives preview-subroute navigation.
Items are a demo kit, not owned or purchased goods. Server, RLS, schema, identity,
public visibility, AI, analytics, money, location, persistence, notifications: N/A;
there are no new operations in these domains.
Image failure renders named fallback with retry. Empty search supports clear.
Native dialog traps focus, Escape closes and focus returns to trigger.
Reset requires explicit confirmation and resets preview only.
Invalid/unsupported section returns notFound; arbitrary item IDs never enter state.

## UI and brand contract
Redesign-preserve / isolated extension. Vermilion, bone, ink, saffron, moss and sky from existing tokens; existing display/system fonts and AroMark.
Asset-forward hierarchy, airy editorial headings, restrained rounded controls, no new global CSS.
Design dials: variance 6/10, motion 3/10, density 4/10, imagery 9/10, fidelity 10/10.
Phones: 360/390/430px; tablet 768; desktop 1440. 44px controls,
16px body, no horizontal page overflow, safe-area-aware space above existing bottom nav.
Do not draw replacement characters/scenes in CSS. Use original art.
Animated transform/opacity only, no perpetual movement. Theme contrast AA.

## Baseline and performance
Run unmodified-base lint/build before source changes. Existing UX0 behavior is the baseline.
Media targets: object thumb <60KB; stage <250KB; generated source art is export input,
not loaded in catalog. Lazy load below-fold art, intrinsic dimensions.
Measure actual build and media bytes; no performance-lab/F7 claim.

## Acceptance and verification
| ID | Requirement | Evidence |
|---|---|---|
| PV1-01 | Five routes render with real artwork and correct navigation | Browser route matrix |
| PV1-02 | Character draft/save/cancel separated; no purchase | Interaction test |
| PV1-03 | Shop filters/search/detail/preview and empty state work | Interaction test |
| PV1-04 | Compatible placement/remove/undo/save/cancel work | Model and browser tests |
| PV1-05 | Season chapters/comparison work without reward/money writes | Browser and source checks |
| PV1-06 | 360/390/430/768/1440 light/dark, keyboard, reduced motion | Browser matrix/screenshots |
| PV1-07 | Language copy and clear sample status | EN/FR/ES spot checks |
| PV1-08 | Build/lint pass; new state model tests pass | Command results |
| PV1-09 | No new provider requests or persistence; old surfaces unchanged | Network/diff audit |
| PV1-10 | Media budget and reproducible artifact provenance | Asset manifest |

## Rollout/recovery and reviewers
Reviewable branch/draft PR only. No merge or deployment. Remove the added route
tree and components to roll back; no data migration. Founder visual review and
normal repository merge gates remain. Specialist review is required before any
future real inventory, reward, money or privacy integration. This visual-only
package cannot certify those systems.

## Delivery record
To be recorded in docs/personalization-preview/VERIFICATION.md with exact results,
limitations, route links, assets, baseline and release posture.

### Visual review continuation — 2026-09-22
The existing GitHub integration created a protected Vercel branch preview automatically. Inspecting that existing preview is authorized review, not a production release. A static `/personalization/review.html` harness inside the existing owned public tree embeds the actual app at exact 360/390/430/768/1440 CSS widths. This reviewer-only page is not linked from product navigation, does not impersonate mobile browsers, and changes no platform configuration. Hosted review found an incorrectly placed hat; correcting its anchor is within PV1 acceptance scope.
