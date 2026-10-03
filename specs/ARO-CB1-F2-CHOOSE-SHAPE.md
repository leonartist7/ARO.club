# ARO-CB1-F2 — Choose and Shape components
Version 1.0.0 · 2026-10-01 · Owner: ARO founder · Status: SPEC-READY
> Delivery: isolated source VERIFIED at`ed6ddcb1989b3697536f19d3d3079bd13429bafb` with bounded specialist reviews and all five source jobs. [PR#103](https://github.com/leonartist7/ARO.club/pull/103) records final-head checks and actual main integration. Evidence: ../artifacts/ARO-CB1-F2/VERIFICATION.md. No connected-route/full-CB1 claim.

Branch: codex/circle-builder-phase3-choose-shape-20261001

## 0–5. Authority, problem, outcome and scope
Founder requests Phase 3 after Phase 2 #102 merged at 742cb422. Depends on CB1-F1 v1.0.2, CB1-P v1.0.1 and CB1 local-preview v1.0.0. Governing: AGENTS, master delivery plan/build playbook, architecture/data/Trust/design/experience systems, ADR-CB-PHASES, SCREEN-CONTRACT v1.0.0, ARTWORK v1.0.0 and PERFORMANCE v1.0.0. This narrowed specification is committed before source edits.
Create lacks the isolated Choose/Shape screens needed for the complete local flow. Build reusable controlled components with localized search, category/example/manual paths, optional guide, field validation and explicit curated suggestion acceptance. No production route consumes them in F2. F3 owns Details/Review/ready/time/capacity; F4 owns full route/shell/exit integration and complete release verification.

## 6–8. Decisions, permissions and journeys
Three sketch guide groups only: Languages/Tonguee, Skills/Squilly, Music/Rockatoo. Every visitor has identical local behavior; no host authorization, save, publication, booking, money or AI. Show memory/loss and category eligibility disclosures before editable input.
Choose: search case/accent tolerant localized groups; Clear search on no results; labelled Example with explicit Use this example; equally available Start with my own idea; Shape my idea is the primary progression action. Either path preserves existing user input. Selection alone permits Shape; title/outcome belong to Shape.
Shape: title/outcome required, category answers optional; Add the details calls the parent's continuation only after valid Shape. Back preserves edits. Guide is optional; hiding it leaves all fields, instructions, errors and actions available. A proposed example can fill untouched empty fields; replacing a touched title/outcome requires a named confirmation with current/proposed text and Keep my answer / Apply suggestion. Declining changes nothing.
Returning Choose can request a different group. Nonempty incompatible answers require confirmation listing human labels; Keep category / Change category. Confirm retains shared/compatible edits and clears only F1-declared incompatible data/defaults. Cancellation preserves everything. These category dialogs are needed by F2 Back/Choose, adopted from the parent contract; F3 retains broader reset/review dialogs.

## 9–16. State, data, privacy, Trust, money, AI and API
Controlled screen props: state, dispatch, optional locale, onContinue(nextState). Shape Back uses BACK. State is the existing pure reducer, never persisted. Search, pending suggestion and focus targets are local UI state. No router/history adapter, form GET, server action, endpoint, analytics, logging, network write or storage for input. Render entered/proposed text as React text. No private address/contact/identity or location inference.
F2 reducer deltas: START_OWN_IDEA clears only ideaSource, preserves all fields; ACCEPT_SUGGESTION accepts only a known curated example's title/outcome in Shape, explicitly marks the affected field touched; Shape NEXT validates supplied active category answers as well as category/title/outcome. No new arbitrary suggestion source or mutation authority. Unknown IDs/fields/actions and pending-state writes remain rejected.
N/A database/RLS/retention/export/API/money/entitlement/AI: no durable entity, provider, transaction, model or privileged operation. Adult-safe public examples and existing server Trust/eligibility remain intact. Reload/unmount loses sketch; no recovery promise. F4 owns application-wide canary/exit tests; F2 isolates no-I/O component behavior with synthetic inputs.

## 17–19. UI, responsiveness, accessibility and states
Existing orange/ivory tokens, Manrope, Button/Input, LanguageContext and dark variants. No new dependency/font/style system. EN/FR/ES dictionary with English fallback; group data/examples/prompts use F1 registry. Scope files: src/features/circle-builder/{ChooseScreen,ShapeScreen,BuilderGuide,BuilderConfirmation}.jsx, builderMachine.js, component/reducer tests; src/i18n/circleBuilder.js; synthetic test fixture and scripts/verify-cb1-f2.mjs; package docs/status and a Quality verification/upload step.
320/360/390/768/1440 widths; wrapping pills, readable bounded form, compact guide 96px phone /160px desktop, one active image, contain/reserved square, 192/384 WebPs only. Stable labelled icon fallback. No looping motion or forced delays; existing button transitions disabled under reduced motion. No live preview/Details imitation in this slice.
44px targets, essential text>=16px, labels/aria-pressed, associated errors, polite validation status, first invalid focus, new heading focus after explicit Next/Back only. Typing/pill/suggestion focus stays at field/trigger. Native named modal with cancel initial focus, Escape cancellation, trapped focus and trigger restoration. No nested dialogs. Native forms prevent submission; pending modal blocks editing. State coverage: initial, selected, empty search, populated, invalid, proposed suggestion, pending category, guide hidden, image failure. Remote loading/retry/permission/expired states N/A (no operation); manual entry works offline after assets load.

## 20–22. Performance, reliability and measurement
Adopt CB1-P budgets. Baseline main Create:335015 encoded JS,19 JS/34 resource requests. F2 modules have zero runtime consumers, so active Create route bundle/assets must stay identical; verify production measurement. Synthetic fixture records source/viewport/art and input boundary evidence; not route WebVitals/INP. Guide limits40KiB192 /96KiB384, one active source, zero inactive fetches. Browser fixture uses existing Vite only as test tooling, never an app build/runtime dependency.
Missing asset shows stable fallback; unsupported locale defaults English; invalid optional answers block Next; preserved edits survive Back/help/example/category cancellation. No external writes, retries, idempotency or telemetry events. Only generated verification artifacts are ignored; selected durable evidence remains tracked.

## 23–24. Acceptance/evidence matrix
| ID | Requirement | Verification | Initial status |
|---|---|---|---|
| F2-01 | Three groups, localized accent search, empty reset, examples/manual | component and real keyboard/browser cases | Accepted ated6ddcb; final#103 gate |
| F2-02 | Title/outcome/category constraints, validation focus and preserved edits | reducer/component/browser boundary cases | Accepted ated6ddcb; final#103 gate |
| F2-03 | Explicit suggestions, touched/cleared protection, cancel/confirm category | reducer/component/native-dialog browser cases | Accepted ated6ddcb; final#103 gate |
| F2-04 | Optional guides, one optimized active image/full silhouette/fallback | phone/desktop light/dark captures and requests | Accepted ated6ddcb; final#103 gate |
| F2-05 | Locale/theme/reduced motion, labels/targets/focus/no overflow | EN/FR/ES, 320/360/390/768/1440 browser checks | Accepted ated6ddcb; final#103 gate |
| F2-06 | No input storage/transport/logging, no runtime consumer or app regression | synthetic canaries + consumer/diff scan + production baseline | Accepted ated6ddcb; final#103 gate |
| F2-07 | Existing/new quality and exact-head required CI | lint/types/tests/build, browser/platform checks | Accepted ated6ddcb; final#103 gate |

## 25–30. Delivery, recovery and review
No feature flag/rollout percentage: modules remain unconnected. Revert only this package if required, preserving newer main and all data. One package/branch/PR. Independent privacy/Trust and product/design/accessibility reviews required before merge under AGENTS self-review #8 and parent CB1 authority; no self-approval. Commit canonical specs/status/checklist/plan and append changelog/decision. VERIFIED requires all F2 rows and exact-head checks; integration truth is live PR merge receipt. F3 starts only on founder request after observed F2 merge. No claim CB1 whole flow or stores are production-ready.
