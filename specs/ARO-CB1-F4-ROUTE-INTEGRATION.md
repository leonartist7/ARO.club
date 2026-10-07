# ARO-CB1-F4 — Guided Create route integration

## Metadata and authority
Version 1.0.0 · 2026-10-07 · Status: SPEC-READY for implementation; release acceptance pending.
Owner: ARO founder. Branch: codex/cb1-f4-integration-20261007.
The founder requested continued building and scheduled autonomous work on 2026-10-07. This narrows the already SPEC-READY CB1 local-preview contract, without adding data or product authority.
Base: f7adc10a40fa5388b8b1956bd80160b7f72cc990; Phase 4 #104 is merged at this SHA (delivery d376251a5b87490655d1d61146de06a11af76942).
Governing documents: AGENTS, master delivery/build playbook, ARO-CB1-LOCAL-PREVIEW, CB1-F1/F2/F3, architecture/data/design/experience/Trust, docs/circle-builder/SCREEN-CONTRACT and PERFORMANCE. Required release reviews: independent privacy/Trust and product/design/accessibility.

## Problem, outcome and dependencies
Accepted Choose/Shape/Details/Review/Ready screens are unreachable from Create. Connect them as one memory-only journey after the observed F2/F3 main integration. Reuse their reducer, validation, guides, dialogs and summaries.
Users can form, edit, review and finish a local sketch; completion explicitly says it is unsaved and unpublished. Search, guide visibility and disclosure toggles alone are not meaningful sketch edits.

## Locked scope and state
Choose → Shape → Details → Review → Ready, with existing Back, targeted Edit, confirmed category/reset and current field limits. No draft/save/publish/account/schema/provider/dependency/analytics/money or category launch. All personas use identical component-local state. No entity, API, migration, retention/export service or AI inference is introduced.
Legacy mode=learn maps only to the Languages sketch group. mode=share maps only to Skills. mode=gather and absent/invalid modes start at Choose with no selected category, because gathering does not imply Music. No examples or user answers are automatically populated; no URL is written.
Keep shell central Create→World behavior and existing explicit World exits. Keep EN/FR/ES and dark/reduced-motion infrastructure. All existing F2/F3 field, guide and accessibility contracts remain unchanged.

## Navigation and privacy boundary
A single scoped navigation guard covers owned document anchors and shared adapter programmatic navigation. Ordinary same-tab links trigger Keep editing / Discard sketch after meaningful selection/input. Cancel restores trigger focus and all state; confirm releases the guard before one navigation. Same-document fragment links, modified/new-tab/download links retain browser semantics. External HTTP(S) links use the same confirmation then location assignment. Unhandled browser Back/Forward/mobile termination is best effort; beforeunload applies only with meaningful state and is removed on reset/unmount. No history traps, private Next APIs, recovery copy or leave beacon.
One confirmation at a time: ignore navigation requests while another native dialog is open. Guard ownership cleanup cannot remove a newer registered guard. Existing app navigation without a guard behaves as before.
Render entered text as text. Never send/persist input in URLs, storage, requests, logs, analytics or server actions. Only authorized theme/language preferences persist. No new remote calls.

## Files and reliability
Exclusive runtime paths: src/views/AppCreatePage.jsx, src/features/circle-builder/BuilderExitGuard.jsx, src/lib/navigationGuard.ts, src/lib/navigation.tsx, src/i18n/circleBuilder.js. Tests: new route/guard tests and scoped Create portions of AppDiscovery.test.jsx; scripts/verify-cb1-f4.mjs as a dedicated production-route browser harness; its Quality job step, generated-output ignore rule and an explicit guided-route mode in scripts/measure-cb1-create.mjs. The baseline measurement keeps its original count/loaded-image assertion when the flag is absent; guided mode requires exactly the selected guide or zero guides on an unselected entry. Existing app shell, field/reducer contracts, auth/Trust/RLS and dependencies stay unchanged.
Navigation guard failures must preserve edits and block the attempted transition; completion performs no write. Reverting this package restores previous Create and navigation without reverting unrelated main work.

## Acceptance and evidence
| ID | Criterion | Required verification |
|---|---|---|
| F4-01 | All five steps reachable; all three manual/example flows; actual summary, targeted edits and reset | Component regressions and production browser |
| F4-02 | Legacy modes follow exact mapping; one central shell action | Route regressions, shell assertions |
| F4-03 | Cancel/confirm shell and external exits; modified/download/fragment semantics; no nested dialogs; unload cleanup | Adapter/route regressions and production browser |
| F4-04 | No entered text in transport/storage/logs across steps/edit/reset/exit/reload | Unique canary audit including requests/headers/body/WebSocket/console/storage |
| F4-05 | Responsive 320/360/390/768/1440, short phone, EN/FR/ES, themes, guide failure, keyboard and reduced motion | Actual production-route captures and browser report |
| F4-06 | No new dependencies; performance within unchanged CB1-P budgets | Paired three-sample baseline/current route report |
| F4-07 | Existing lint/types/build/unit/browser/platform gates retained | Exact-head CI and independent reviews |

Source implementation and local verification can advance autonomously. Do not mark VERIFIED/SHIPPED or merge until all required review/browser/performance/final-head gates pass. Test selectors describing the replaced Seed Studio UI may follow the new contract; retain their local-only/reversible/no-network assertions and all unrelated tests.

## Delivery and scheduled continuation
Deliver one draft PR, actual head/checks, changed-file inventory, criterion/evidence matrix, remaining gates and restart packet. Reconcile current state/spec/status/changelog and builder plan factually. Scheduled implementation uses a fresh checkout, resumes the same package/PR, checks for another writer before editing and processes one bounded package per invocation; daily quality work is read-only. Preserve the existing C1 schedule and historical audit/controller evidence. No automatic provider activation or invented independent acceptance.
