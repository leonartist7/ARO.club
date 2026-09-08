# ARO — Frontend Visual Continuation Plan

> September 8 snapshot publication: see `ARO_CLOUD_HANDOFF.md` for the founder's default-branch publication request, fixed-SHA audit prompts and unresolved evidence gaps. Older release-permission wording is superseded only for this static snapshot. Founder visual certification, I0 gates and all runtime restrictions remain open.

**Status:** ACTIVE / DESIGN-ONLY CONTINUATION MAP
**Version:** 0.1.0
**Last updated:** 2026-09-07
**Scope:** local static visual prototype only; this document does not authorize runtime work.

## Why this exists

This is the handoff map for continuing ARO's frontend visual work without relying on chat history. It turns the current visual direction into a safe sequence of small reviewable packages.

The experience is a **Living Opportunity OS**, not a generic class directory, social feed, dashboard, or marketplace. ARO should make a person's nearby world feel alive: a meaningful opening is visible, understandable, and easy to move toward.

This plan supplements the master plan; it never overrides product gates, package order, privacy, money, trust, or runtime requirements.

## Required reading order

Before reviewing or changing visual work, read:

1. `AGENTS.md`
2. `ARO_MASTER_DELIVERY_PLAN.md`
3. `ARO_CURRENT_STATE.md`
4. `ARO_SPEC_INDEX.md`
5. `ARO_IMPLEMENTATION_STATUS.md`
6. `ARO_EXPERIENCE_SYSTEM.md`
7. The relevant approved `specs/ARO-UX*.md` package
8. This continuation plan

The inherited `DESIGN_EXECUTION_PLAN.md`, `PROJECT_MASTER_PLAN.md`, and `UI_UX_ENHANCEMENT_COMPLETE.md` describe historical Tonguee/Conversa work. They are not authority for ARO visual continuation.

## Locked visual DNA

- **Feeling:** warm, lucid, editorial, imaginative, locally grounded and human—not glossy AI futurism.
- **Palette:** Ivory/Bone field; Ink typography; Vermilion for action; Saffron for warmth/possibility; Moss for grounded place.
- **Type:** expressive editorial serif for the invitation or moment; clear sans-serif for decisions, labels and navigation.
- **Geometry:** the ARO **O** is a field, orbit, portal, path and constellation. It can guide attention but must not become empty decoration.
- **World:** a living miniature or illustrative field conveys place and nearby possibility. It is not an unlicensed Google Maps clone, a production 3D map, or a real-time location claim.
- **Controls:** native-feeling, simple, tactile. Use real icons only when they clarify an action.
- **Imagery:** use it when it carries context, place, mood or identity. Do not add stock-style visual noise.
- **Engagement:** guide people back into life. No feed mechanics, dark patterns, meaningless streaks, or leaderboard pressure.

## Current visual route map

All of the following are local, synthetic interface demonstrations unless a later approved runtime package says otherwise.

| Route | Visual role | Current state |
|---|---|---|
| `/app` | Home / personal portal into the nearby world | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/world` | Living miniature, local signals and forming opportunities | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/opportunities` | Opportunity browsing composition | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/opportunities/:id` | Opportunity detail and the reason it matters | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/opportunities/:id/commit` | Commitment / booking preview | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/circles` and `/app/circles/:id` | Circle discovery and room | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/create` | Seed Studio: Learn, Share, Gather formation preview | UX2 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/profile` | Personal Field / identity and growth context | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/express` | Full-body local expression preview | UX3 — IMPLEMENTED / PARTIAL VERIFICATION |
| `/app/insights`, `/app/passport`, `/app/library`, `/app/settings` | Return, memory, trust and supporting views | UX1 — IMPLEMENTED / PARTIAL VERIFICATION |

`UX0` is separately IMPLEMENTED / CI VERIFIED, with founder Preview/Production approval still pending. It is an opportunity-formation prototype and does not authorize P1 runtime work.

## What the prototype does **not** contain

- P1 profiles, authentication, database, RLS or persistent user state
- P2 intent capture or density/demand computation
- P3 recommendations, matchmaking, AI, location, notifications or real-world availability
- P4 payments, inventory, cancellation, capacity control or actual commitments
- P5 proof, credentials, outcomes or Passport claims
- Production 3D city data, Google Maps-derived geometry, Blender pipelines, AR, Seasons or Beacons

Interface labels, participant counts, progress, prices, places and imagery are design content. Do not present them as live product evidence.

## Visual continuation sequence

Every wave below needs a small approved `specs/ARO-FV-*.md` package before UI implementation, unless it is strictly evidence capture for an already-approved UX package. Each package must name its routes, files, states, non-goals and verification evidence.

### FV-1 — Visual release evidence and asset discipline

Goal: make the existing visual prototype reliably reviewable before adding more screens.

- Capture the core routes at 360, 390, 430, 768 and 1440px.
- Check light/dark treatment, keyboard path, visible focus, reduced motion, readable contrast and no clipped/overflowing content.
- Review image dimensions, compression, responsive loading and crop behavior; keep imagery purposeful.
- Record the results as visual evidence, not as semantic product verification.

**Exit:** a reviewer can open each core route and understand its role on desktop and phone without seeing a broken, generic or overly dense composition.

### FV-2 — Participant loop cohesion

Goal: make the primary journey feel like one coherent invitation:

`Home → World → Opportunity detail → Commit → Circle`

- Strengthen visual continuity between the field, a signal, its meaning, a decision and the resulting Circle.
- Make the selected/preview/pending states explicit in UI copy and visual hierarchy.
- Preserve the Home and World as imaginative spatial experiences, rather than replacing them with a conventional list page.

**Non-goal:** no real joining, availability, payment, capacity or persistence.

### FV-3 — Creator / host proposal preview

Goal: complete the complementary entry point from an idea to a legible opportunity shape.

- Continue `Seed Studio` from a seed to a clear static proposal composition.
- Show what a potential participant would understand: purpose, format, place mood, timing shape and next action.
- Keep creator tools calm and editorial; do not turn the page into an admin form.

**Non-goal:** no object creation, moderation workflow, demand matching, AI generation or publishing.

### FV-4 — Meaningful return loop

Goal: refine `Insights → Passport → Library` so progress feels like lived experience, not gamification.

- Use reflections, moments, connections and paths rather than score-heavy dashboards.
- Add static empty, gathering and returning states where the visual story needs them.
- Keep proof-looking language out until P5 is independently specified and verified.

### FV-5 — Trust, settings and system-state compositions

Goal: make supporting states feel as intentional as the hero screens.

- Refine static Settings, privacy and safety surfaces.
- Design loading, empty, error, review and pending compositions for the visual system.
- Use neutral trust language; never simulate verification, safety guarantees or account persistence.

### FV-6 — Shipathon visual walkthrough

Goal: leave one excellent, presentable local click-through for discussion and feedback.

- Choose one synthetic story and follow it through the participant loop.
- Mark it clearly as a local visual prototype wherever that context is needed.
- Keep the walkthrough focused on product feeling and interaction choreography, not claims of product readiness.

## Recommended resume point

Start with **FV-1**. The app has enough visual surface area for a real fidelity pass; more screens or more generated art should follow only after responsive, accessibility and asset evidence reveal the highest-value gaps.

Then choose either **FV-2** (participant-first Shipathon story) or **FV-3** (creator-first story). Do not build both in parallel unless their file ownership is fully separated.

## Swarm handoff model

Use a swarm to reduce blind spots, not to multiply overlapping edits.

For task eligibility, founder-only gates and reusable cloud/local prompts, use
`ARO_AUTONOMOUS_WORKBOARD.md` alongside this visual plan.

### First pass: parallel read-only review

Assign four independent reviewers. They do not change files.

| Role | Reviews | Returns |
|---|---|---|
| Route auditor | Route map, navigation, dead ends and state clarity | prioritized journey gaps with route evidence |
| Mobile/accessibility reviewer | responsive layouts, focus order, labels, contrast and motion | reproducible viewport/accessibility findings |
| Asset/performance reviewer | image intent, dimensions, weight, crop and loading behavior | targeted asset recommendations |
| Product-flow critic | whether the UI still feels like a Living Opportunity OS | top three coherence improvements, not generic redesigns |

### Second pass: one scoped implementation package

The lead synthesizes the review into one `ARO-FV-*` spec. Workers may then implement only disjoint files or components. The lead owns shared routes, navigation, documentation and final integration.

- Never assign two agents the same file.
- Do not let a worker widen the package into runtime features.
- Keep generated assets traceable to their intended route and accessibility treatment.
- Use an independent verifier after integration.

### Starter prompt for a continuation agent

> Read `AGENTS.md`, `ARO_CURRENT_STATE.md`, `ARO_SPEC_INDEX.md`, `ARO_IMPLEMENTATION_STATUS.md`, `ARO_EXPERIENCE_SYSTEM.md`, the relevant `specs/ARO-UX*.md`, and `ARO_FRONTEND_VISUAL_CONTINUATION_PLAN.md`. Stay within static visual prototype scope. Do not add APIs, Auth, persistence, real location, AI, payments, actual proof, inventory, or production 3D/AR. Your role is **[role]**. Return concrete file/route evidence and a prioritized handoff; do not make broad redesign claims.

## Verification gate for every FV package

- Run lint and build.
- Perform browser visual review on the named routes and target viewports.
- Test keyboard navigation, focus visibility, text scaling, contrast and reduced motion where relevant.
- Audit the diff for `fetch`, Supabase, persistence, storage, payment, geolocation and other out-of-scope runtime additions.
- Update the package spec and current-state documentation with evidence and accurate status language.

## Founder choices to make later

- Which synthetic story should be the first Shipathon walkthrough: participant-first or creator-first?
- Should the Expression view remain a visual layer until a later P1 preference model is approved?
- Which core mobile composition should set the approval bar before optional art variants are explored?

These are product-direction choices. They do not block FV-1 evidence work.

## Continuation boundary

This document organizes frontend visual work only. Any request that adds real user identity, data, intent, opportunities, matching, payments, proof, 3D geographic data, AR or automation must stop here and begin with the governing package/spec process.
