# ARO-UX2 — Seed Studio Visual Prototype

> September 8 publication note: historical working-tree and test statements below describe preparation, not current remote availability or complete acceptance. See ARO_CLOUD_HANDOFF.md and artifacts/ARO-H0/VERIFICATION.md for snapshot publication and fresh smoke evidence. Original package status remains partial; no runtime gate changes.

## 0. Metadata

- **Status:** IMPLEMENTED / PARTIAL VERIFICATION
- **Spec version:** 0.1.0
- **Owner/director:** ARO founder
- **Implementation branch:** `feat/aro-ux0-opportunity-prototype` working tree
- **Depends on:** R1 SHIPPED; UX0 IMPLEMENTED / CI VERIFIED; UX1 Personal Field design direction
- **Blocks:** no semantic runtime package
- **Governing docs:** `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_DATA_MODEL.md`
- **Required reviewers:** founder/product-design
- **Last updated:** 2026-09-07

## 1. Problem

ARO's Create entry point currently presents a menu of conventional actions. The Living Opportunity OS needs an earlier, more human moment: a person should be able to feel the difference between wanting something, contributing something, and gathering people before a real P2/P3 workflow exists.

## 2. User outcome

A preview visitor can open `/app/create`, choose one static seed direction, and see a local visual composition of its possible ingredients. The interaction is exploratory only: no intent, request, opportunity, demand signal, message, or publication is created.

## 3. Why now

The founder approved a frontend-first design track while P1–P5 remain governed by their dependencies. UX2 makes the future P2/P3 transition legible without creating those semantics early.

## 4. Goals

- Replace the generic Create action list with a spatial Seed Studio.
- Distinguish three human starting points: learn, share, and gather.
- Make selected static ingredients visibly converge into a possible shape.
- Maintain truthful static-preview and no-persistence language.

## 5. Explicit non-goals

- No user text collection, stored intent, demand aggregation, AI, matching, host approval, creation, publication, notification, booking, payment, or location behavior.
- No claim that a cluster represents real nearby people or live demand.
- No modification of P2/P3 scope, data model, privacy rules, or package sequence.

## 6. Locked decisions and invariants

- All mode descriptions and composition ingredients are deterministic local fixtures.
- Buttons change only local visual state and reset on navigation/reload.
- “Possible shape” is explicitly a design preview, not an Opportunity proposal.
- No action button routes to publication or has side effects.

## 7. Personas and permissions

| Persona | Read | Change | Restriction |
|---|---|---|---|
| Preview visitor | local seed modes and static composition | active visual mode only | no stored profile or account assumed |
| Other user/host/admin/service | N/A | N/A | no request is made |

## 8. User journeys

1. Visitor opens Seed Studio.
2. Visitor chooses Learn, Share, or Gather.
3. Local ingredient nodes and example composition update.
4. Visitor can return to the World; no external action occurs.

## 9. State machine

```text
LEARN ⇄ SHARE ⇄ GATHER
```

Every transition is local, reversible, and side-effect free.

## 10. Data / RLS / API

No new data entity, migration, RLS policy, API, Auth check, or network request. Static fixtures live in the page module and are not a source of product truth.

## 11. Privacy, Trust, money, and AI

- Privacy: no new personal data is read or collected.
- Trust: no host qualification or public listing is implied.
- Money: N/A; no price or earning estimate.
- AI: N/A; no model/inference/provider call.

## 12. UI / UX specification

- The page presents an Orbit/Portal Seed Studio rather than form fields.
- Mode selection uses native buttons and `aria-pressed`.
- A composition map connects four static ingredients to a local example outcome.
- Copy explicitly states that it is a design preview and no signal is being sent.

## 13. Responsive, accessibility, and performance

- 360px and 1440px layouts remain single-flow/readable with 44px controls.
- Light/dark variants must preserve contrast.
- Decorative SVG is hidden from assistive technology; focus is visible; reduced motion disables nonessential transition.
- No new dependency, asset, or request. Build and lint must pass.

## 14. Reliability and analytics

Mode state resets on navigation/reload; that is expected. No analytics is added.

## 15. Acceptance criteria

| ID | Requirement | Verification | Status |
|---|---|---|---|
| UX2-001 | Create becomes an ARO-native Seed Studio | live visual/semantic review | PASS |
| UX2-002 | Learn, Share, and Gather update local composition accessibly | live browser interaction | PASS |
| UX2-003 | The prototype does not imply live demand or creation | copy review | PASS |
| UX2-004 | No Auth/API/persistence/AI/location/money behavior is added | static scope audit | PASS |
| UX2-005 | Lint and build pass | `npm run lint`, `npm run build` | PASS |

## 16. Rollout, recovery, and reviews

Local Preview only. Revert the visual page to recover; there is no stored state. Founder/product-design review is required before any production release. P2/P3 privacy, AI, Trust, and data reviews remain mandatory for their future runtime packages.

## 17. Definition of Done

UX2 is IMPLEMENTED when its acceptance rows have evidence and project status documents identify the result as a local visual prototype, not P2/P3 implementation. Full light/dark responsive capture remains part of the visual-track release review.

## 18. Delivery record

Package: ARO-UX2
Spec version: 0.1.0
Browser: live Create route; Learn and Share local compositions checked
Scope audit: no fetch, Supabase, storage, Stripe, geolocation, or AI reference in the page
Lint: PASS
Build: PASS
Status: IMPLEMENTED / PARTIAL VERIFICATION
