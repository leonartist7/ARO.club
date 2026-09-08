# ARO-UX1 — Personal Field Visual Prototype

> September 8 publication note: historical working-tree and test statements below describe preparation, not current remote availability or complete acceptance. See ARO_CLOUD_HANDOFF.md and artifacts/ARO-H0/VERIFICATION.md for snapshot publication and fresh smoke evidence. Original package status remains partial; no runtime gate changes.

## 0. Metadata

- **Status:** IMPLEMENTED / PARTIAL VERIFICATION
- **Spec version:** 0.1.0
- **Owner/director:** ARO founder
- **Implementation branch:** `feat/aro-ux0-opportunity-prototype` working tree
- **Depends on:** R1 SHIPPED; UX0 IMPLEMENTED / CI VERIFIED
- **Blocks:** no semantic runtime package
- **Governing docs:** `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_DESIGN_SYSTEM.md`, `specs/ARO-P1-CAPABILITY-GOAL.md`
- **Required reviewers:** founder/product-design
- **Last updated:** 2026-09-07

## 1. Problem

ARO needs a credible visual expression for the person-side of the opportunity loop before P1's authenticated, private capability and goal foundation can safely begin. The existing profile reads as a conventional account dashboard rather than a living relationship between what a person seeks, brings, and protects.

## 2. User outcome

A preview visitor can open `/app/profile`, understand Maya's static personal field, select one of its visual signals to inspect it, see the intended privacy framing, and optionally open an Expression preview. No selection is written, shared, inferred, or used to form an opportunity.

## 3. Why now

The founder explicitly approved a frontend-first design track while P1 remains blocked by I0 and authenticated/RLS gates. This package lets the visual system progress without claiming product behavior.

## 4. Goals

- Replace the generic profile-dashboard treatment with an ARO-native Personal Field.
- Show static wants, contributions, time/context, and boundaries as relationships around a person rather than form fields or scores.
- Provide keyboard-accessible local focus states and a clear privacy explanation.
- Link to a separate local-only Express Your World preview without making personal expression a score, inventory, or purchase mechanic.
- Preserve the existing `/app/profile`, settings, Passport, dark-mode, and responsive shell routes.

## 5. Explicit non-goals

- No P1 database, Auth, Supabase, RLS, goal/capability CRUD, autosave, profile editing, outfit inventory, purchase, or onboarding behavior.
- No real intent, availability, location, matching, demand aggregation, AI, host eligibility, payment, booking, or public profile data.
- No claim that the static example is stored privately or that a user has a verified qualification.

## 6. Locked decisions and invariants

- The field uses deterministic fixture data already local to the prototype.
- Interaction is local visual focus only and resets on navigation/reload.
- The profile labels its contents as self-described preview material; verified host/qualification semantics are not created.
- Privacy copy must not promise storage, deletion, export, or access controls that this prototype does not implement.
- The existing Trust publish gate and all legacy routes remain untouched.

## 7. Personas and permissions

| Persona | Read | Change | Restriction |
|---|---|---|---|
| Preview visitor | static fixture and local focus state | active visual signal only | no persistence or account assumed |
| Other user/host/admin/service | N/A | N/A | no request is made |

## 8. User journeys

### Journey A — Read a personal field

1. Visitor opens Profile.
2. Visitor sees Maya at the center of four signal families.
3. Visitor selects a field node by pointer or keyboard.
4. Local detail changes to explain that signal family.

### Journey B — Understand privacy intent

1. Visitor opens the privacy explanation.
2. The page explains that a production P1 version will need explicit consent and owner-only data controls.
3. No record is created or changed.

## 9. State machine

```text
FIELD_DEFAULT ⇄ FIELD_NODE_FOCUSED
FIELD_DEFAULT / FIELD_NODE_FOCUSED ⇄ PRIVACY_EXPLAINER_OPEN
```

All transitions are client-local, synchronous, reversible, and have no side effects.

## 10. Data specification

No data entity, migration, or storage change. The existing `src/data/aroApp.js` fixture remains the sole source. Fixture values are presentation-only and reset with the page.

## 11. RLS and authorization matrix

N/A. No database/API request or protected data access exists in this package.

## 12. Privacy

- Purpose: demonstrate the intended personal-field visual language only.
- Data boundary: all visible values are synthetic static fixture content.
- Location: no new location read, write, or display precision is introduced.
- Retention/deletion/export: N/A because no record is created.
- Withdrawal: closing or reloading the page clears local focus state.

## 13. Trust & safety

- No public discovery, contact, host eligibility, verified claim, rating, or ranking is added.
- Signal families use self-described wording and never function as a qualification badge.
- ARO's real P1 privacy/RLS and Trust requirements remain deferred to `ARO-P1-CAPABILITY-GOAL.md`.

## 14. Money / entitlement implications

N/A. No price, payment, subscription, entitlement, payout, or earning claim exists.

## 15. AI specification

N/A. No inference, generation, ranking, or provider call exists.

## 16. API / server contract

N/A. The page makes no API request and must remain usable with Supabase unavailable.

## 17. UI / UX specification

- A full-bleed Personal Field uses Orbit, Path, and Signal geometry with Maya at the center.
- Four signal nodes explain wants, contributions, context, and boundaries.
- The supporting detail panel describes the selected node without presenting data-entry controls.
- A privacy explainer makes the prototype boundary visible without dominating the experience.
- At least one interaction must be keyboard-complete and use native button semantics.

## 18. Responsive requirements

- 360px: field remains readable without horizontal scrolling; controls are at least 44px.
- 1440px: the field holds its spatial composition while supporting details remain within a readable width.
- Light and dark modes preserve contrast and hierarchy.

## 19. Accessibility

- Native buttons with `aria-pressed` identify the selected signal.
- Focus is visible, reading order is logical, and explanatory detail is not color-only.
- Decorative field paths are hidden from assistive technology.
- Motion uses transition-only effects with `motion-reduce` fallback classes.

## 20. Performance budget

- No new dependency. The contextual portrait asset is governed by UX3 and served locally from `public/`.
- The profile field is local CSS/SVG plus that local portrait; it makes no remote media request.
- `npm run build` and `npm run lint` must pass.

## 21. Reliability and failure analysis

| Failure | User-visible behavior | Recovery |
|---|---|---|
| Script/runtime reload | active node resets to default | choose a signal again |
| Fixture unavailable in a future refactor | page should use a local fallback description | visual review before merge |

## 22. Analytics / measurement

None. No analytics event is added.

## 23. Test matrix

- lint and production build;
- browser route smoke for `/app/profile`;
- browser route smoke and local interaction check for `/app/express`;
- keyboard selection of each field node;
- mobile/desktop visual check in light and dark modes;
- verify zero new network/API calls from this surface.

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Status |
|---|---|---|---|
| UX1-001 | Profile is an ARO-native Personal Field, not a generic account dashboard | live visual/semantic review | PASS |
| UX1-002 | Four signal families can be focused locally by keyboard/pointer | live browser interaction | PASS |
| UX1-003 | Prototype and privacy limits are clear and truthful | copy review | PASS |
| UX1-004 | No Auth, API, persistence, money, AI, matching, or location behavior is added | static scope audit | PASS |
| UX1-005 | Route remains responsive and accessible in light/dark | full visual matrix | pending dedicated matrix |
| UX1-006 | Build and lint pass | `npm run lint`, `npm run build` | PASS |

## 25. Rollout

Local Preview only. This package does not authorize Preview/Production release, P1 implementation, or any semantic package progression.

## 26. Rollback / forward recovery

Revert the visual page change. No data migration or persisted state requires recovery.

## 27. Security / privacy / Trust review

No new data, endpoint, role, or money behavior. The static-only boundary is subject to a hostile diff and browser network review before marking this prototype implemented.

## 28. Product / design review

Founder direction: design ARO's complete frontend experience in deliberate phases before P1–P5 are connected. This slice adopts the Personal Field and Profile principles from `ARO_EXPERIENCE_SYSTEM.md` without authorizing P1 semantics.

## 29. Definition of Done

UX1 is fully VERIFIED only when the outstanding light/dark responsive matrix is captured. It is IMPLEMENTED with live interaction, local-only scope, lint, and production-build evidence; it remains a visual prototype rather than P1 implementation.

## 30. Delivery record

Package: ARO-UX1
Spec version: 0.1.0
Branch: `feat/aro-ux0-opportunity-prototype` working tree
Browser: live Profile route; wants/contributions nodes and privacy explainer checked
Scope audit: no fetch, Supabase, storage, Stripe, geolocation, or AI reference in the page
Lint: PASS
Build: PASS
Status: IMPLEMENTED / PARTIAL VERIFICATION
