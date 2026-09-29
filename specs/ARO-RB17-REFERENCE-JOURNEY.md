# ARO-RB17 — Reference-led first journey

**Status:** IMPLEMENTED / PARTIAL VERIFICATION · version 1.0.0 · 2026-09-29. Founder authorization: six supplied visual references and request to execute. Branch `codex/rb17-reference-journey-20260929` starts at merged RB15 `28f0170` (PR #92). Target RB15; no `main` merge.

## Outcome and authority

The English/light public Home, app Home, Explore and Create first steps should read as one warm, human journey. The website must move from its hero to a human outcome and concise steps, with the detailed opportunity prototype lower on the page. App previews should put the next action and image-led class context before diagrams or fictional metrics. Existing onboarding and detail routes remain connected and clearly labelled. The supplied images are visual direction, not proof of actual inventory, cities, hosts, conversations or payments.

Governing: `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, RB0–RB16 specs, `docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md`, and the six founder references. Existing licensed ARO logo, typography, imagery and tokens govern implementation.

## Scope and boundaries

Reorder and simplify presentation, copy and existing navigation in `/`, `/app`, `/app/opportunities` and `/app/create`. Preserve EN/FR/ES and theme controls, browser history, routes, F7 evidence and existing fixture semantics. No dependency or newly generated image, schema, RLS, Auth, eligibility, personal data persistence, geolocation, map, host publishing, real search, booking, coins, payment, analytics or external write. Create may reuse an existing onboarding image and must measure the added request. This package has no new entity, permission, API, AI or money state. Fictional examples remain explicitly identified at point of use. Existing read-only and local preview interactions remain local. All roles retain current permissions.

Onboarding persistence, personal tags, real location, supply, checkout and credits are separately SPEC-REQUIRED and require privacy, Trust, security and money reviews. Image 6's social proof and member count cannot appear as live evidence. Rollback reverts this presentation branch without migration.

## UX, accessibility and performance

At 320/390/768/1440 widths, hero → human story → three concise paths → optional formation explainer should have one dominant action in each section. App Home should disclose fixture context before cards; Explore should show example cards and plain limitations without live controls. Create should let users choose Learn/Share/Gather and understand the selected example with a clear return path. Preserve 44px controls, 16px body copy, semantic headings, visible focus, reduced motion, dark support and zero horizontal overflow. No new font requests; compare first viewport and transferred image bytes against RB16 evidence.

## Acceptance and release

| ID | Requirement | Evidence |
| --- | --- | --- |
| RB17-1 | Public Home hierarchy and primary path match reference intent | Before/after mobile and desktop browser captures |
| RB17-2 | App Home, Explore and Create show a coherent, truthful next step | Browser walkthrough and route assertions |
| RB17-3 | EN/FR/ES and theme remain usable; short phone and keyboard work | Focused browser checks, unit suite |
| RB17-4 | Build, lint, types, relevant tests and final-head CI pass | Exact commands and PR checks in `artifacts/ARO-RB17/VERIFICATION.md` |

Independent design/accessibility, privacy, Trust and protected release reviews are still required. Mark IMPLEMENTED / PARTIAL VERIFICATION after local checks; never infer production readiness from this package.
