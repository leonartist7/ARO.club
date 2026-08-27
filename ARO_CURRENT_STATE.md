# ARO — Current State

> **Canonical current snapshot.** Read this before using old chat history, generated concepts or recovery artifacts.
>
> **Last strategic update:** 2026-08-27
>
> This file answers: **What is ARO now? What is actually implemented? What is active? What is only strategic? What changed most recently?**
>
> Every PR that materially changes product direction, package status, implementation status, active blockers, design doctrine or major strategic systems must update this file and append an entry to `ARO_CHANGELOG.md`.

---

## 1. What ARO is

**ARO — The Human Opportunity Network**

**AI for a more human world.**

ARO connects human intent, capability, demand, people, places, time, Trust and real-world outcomes so meaningful opportunities can form.

Core question:

> **What meaningful thing can exist in this person’s real life because ARO connected the right intent, capability, people, place and moment?**

Core inversion:

`intent → commitment → composition → opportunity → real-world outcome → better future opportunity`

Core primitives:

**Intent · Capability · Commitment · Composition · Outcome**

Master loop:

**KNOW → SENSE → COMPOSE → QUALIFY → COMMIT → DIRECT → LIVE → PROVE → BECOME → COMPOUND**

**AI organizes. Humans approve. Real life happens.**

---

## 2. Canonical document map

### Read first

1. `AGENTS.md` — operating contract and conflict rules.
2. `ARO_MASTER_DELIVERY_PLAN.md` — durable objective, complete phase graph and cloud-task starter prompt.
3. `ARO_CURRENT_STATE.md` — current truth snapshot.
4. `ARO_INFRASTRUCTURE.md` — repository, branch, deployment, environment and Supabase operational truth.
5. `ARO_SPEC_INDEX.md` — canonical package/status registry.
6. `ARO_IMPLEMENTATION_STATUS.md` — implementation ledger.
7. `ARO_BUILD_PLAYBOOK.md` — package sequence/gates.
8. Assigned package spec.

### Master context

- `ARO_MASTER.md` — recovered/optimized master vision up to the recovery pass.
- `ARO_EXPERIENCE_SYSTEM.md` — latest Living Opportunity OS, UI/UX and visual-brand doctrine.
- `ARO_SEASONS_AR.md` — latest Seasons, quests, AR, Beacons, city gameplay and progression strategy.
- `ARO_VISION.md` — concise vision.
- `DECISIONS.md` — durable accepted decisions.

### Specialist authority

- `ARO_ARCHITECTURE.md`
- `ARO_DATA_MODEL.md`
- `ARO_OPPORTUNITY_ENGINE.md`
- `ARO_DESIGN_SYSTEM.md`
- `ARO_TRUST_SAFETY.md`
- `ARO_MONEY.md`
- `ARO_GROWTH.md`
- `ARO_SHIPATON.md`
- `ARO_MIGRATION.md`

### Provenance/history

- `ARO_RECOVERY_STATUS.md`
- `ARO_CHANGELOG.md`

---

## 3. Current implementation state

ARO is **not starting from zero**.

The existing Tonguee vertical contains implemented foundations including:

- React/Vite/Tailwind app shell;
- Supabase Auth/Postgres/Storage patterns;
- Trust Engine;
- verified-only publishing;
- teacher application/document verification;
- admin tooling and audit-log foundation;
- experiences;
- bookings;
- reviews;
- Passport foundation;
- dark mode;
- i18n;
- Vitest;
- Playwright;
- mobile/responsive foundations.

These are **IMPLEMENTED foundations**, not automatic proof that every legacy path is production-certified for future ARO packages.

---

## 4. Active program gate

### ARO-SEC0 — Repository Secret Hygiene

**State:** VERIFIED after finalization PR merge

The founder confirmed that the historical environment file contained only browser-facing Supabase URL/anonymous-key categories, accepted the documented historical exposure, and chose no Git history rewrite. Tonguee was the then-selected migration backend; ADR-026 now preserves it as the original production source while the separated ARO.club target remains unassigned. The active tree removes `.env` and ignores local environment variants.

### ARO-R1 — Repository separation and platform rebrand

**State:** SHIPPED

ARO now has an independent `leonartist7/ARO.club` repository and Vercel project `aro-club`. R1 PR #22 merged into `main` as `494817f`, and Vercel production deployment `dpl_DKCbYy8LvJAWP3tAzCA43oGGJUA2` reached `READY`. The ARO shell, metadata, public homepage and universal copy use the approved editorial/orbit identity, while Tonguee remains the first live language vertical. Tests, build, route smoke, responsive light/dark screenshots and an accessibility spot check are recorded under `artifacts/ARO-R1/VERIFICATION.md`.

### Active next gate — isolated P1 environment

**State:** BASELINE EXECUTED; GATE NOT PASSED

The repository, test/build, visual/accessibility and live read-only Trust evidence is recorded in `artifacts/ARO-P1-BASELINE/VERIFICATION.md`. The approved $0/month `ARO.club Staging` creation was rejected because the founder account already owns/administers the maximum two active free projects. Tonguee production remains preserved and `aro-platform` remains **QUARANTINED — KEEP**, so neither may be used to clear the limit. P1 runtime work remains prohibited until safe isolated capacity exists.

### Active master objective

`ARO_MASTER_DELIVERY_PLAN.md` now governs the autonomous, spec-driven path through the verified P5 V1 loop. It inserts isolated-infrastructure, reliability, platform/Next.js, experience-system and AI-foundation packages at explicit dependency gates without reordering P1 → P2 → P3 → P4 → P5 or authorizing exploratory 3D/AR runtime work.

---

## 5. Runtime build sequence

Current governed sequence:

1. **SEC0** — secret hygiene (**VERIFIED**).
2. **R1** — repository separation + ARO platform rebrand (**SHIPPED**).
3. **M0 / I0 / Q0** — master governance, isolated infrastructure and reliability foundation.
4. **P1** — Capability + Goal foundation (**SPEC-READY; baseline gate waiting on isolated Supabase capacity**).
5. **N1 / X1** — governed platform/Next.js decision and experience-system foundation.
6. **P2** — Explicit Intent + privacy-preserving Demand Signals.
7. **A1** — AI Runtime, Evaluation and Safety Foundation.
8. **P3** — ARO Catalyst / language Opportunity Suggestions.
9. **P4** — Commitment + minimum viability + booking mechanics; money remains separately gated.
10. **P5** — ARO Proof + outcomes + Passport evolution.
11. **P6** — carefully gated adjacent vertical after the V1 release audit.

Do not skip the sequence because a future concept is exciting.

---

## 6. Latest experience direction — Living Opportunity OS

ARO should no longer be designed as a premium-looking generic marketplace.

The approved strategic experience direction is documented in `ARO_EXPERIENCE_SYSTEM.md`.

### Key principles

- ARO is a **Living Opportunity OS**.
- The interface reveals possibility forming around a person.
- Home is an **Opportunity Radar**, not an infinite feed.
- Every major screen should contain an ARO-native element.
- Signature metaphors: **Field, Orbit, Portal, Path, Constellation**.
- The `O` in ARO is a reusable visual grammar for possibility, commitment and completion.
- Opportunity should visually **form**, not just appear as a card.
- Commit becomes a collective **Commitment Orbit**.
- Circle Room is a digital foyer around a physical experience.
- Passport becomes a constellation / Life Map of lived moments.
- ARO Director is a generative composition surface, not a chatbot form.

### Current palette direction

- ARO Vermilion / Living Red;
- Bone / Warm Ivory;
- Ink / Near Black;
- Saffron / Warm Gold;
- Moss / Mineral Green;
- Clay / Terracotta;
- Night Plum;
- Mineral Sky Blue.

Avoid generic neon-purple AI branding as the primary visual identity.

### Core voice

- “People near you want what you know.”
- “Bring something to life.”
- “One more person makes this real.”
- “The Circle is real.”
- “It’s happening.”
- “You made this happen.”
- “Your life, becoming visible.”

---

## 7. Latest strategic expansion — ARO Seasons + real-life game layer

`ARO_SEASONS_AR.md` preserves the newest strategic direction.

### Thesis

> **Your city becomes the game board. Your life becomes the progression system.**

ARO can use game-design psychology to increase meaningful participation without optimizing for compulsive screen time.

### ARO Seasons

Potential product framing:

**ARO Season — A new chapter of real life.**

Seasons can contain:

- Personal Sparks;
- weekly quests;
- Opportunity Quests;
- Community Quests;
- Big Quests;
- Expeditions;
- Passport progress;
- meaningful rewards;
- future optional Season+ value layer.

No pay-to-win Trust, fake reputation, paid randomness or punitive streak mechanics.

### Real-life progression

Potential dimensions:

- Real-Life Hours;
- People/Connections;
- Skills;
- Contribution;
- Exploration;
- Creation;
- legitimate Economic Progress;
- meaningful firsts and milestones.

### ARO Sparks

Exploratory collectible memory objects tied to verified real-world milestones. They are not speculative assets or investment products.

---

## 8. AR and place layer

Long-term ARO AR can reveal human opportunity attached to real places.

Key concepts:

### ARO Beacons

Approved strategic primitive for participating public/partner places where opportunity can concentrate.

### Opportunity Trails

Meaningful routes through a city.

### Expeditions / Travel Mode

Opt-in city chapters for visitors and locals.

### Personal Life Map

A private/personal visual map of lived experiences, not a public location history.

### AR rule

AR is an amplifier, **not a prerequisite**.

2D opportunity, place, safety and privacy systems should prove themselves before camera-based spatial overlays are implemented.

Never expose private live user location merely to make AR feel magical.

---

## 9. Monetization direction

Potential long-term revenue layers include:

- marketplace/service fees;
- Host Pro;
- ARO Season+;
- Business Beacons;
- disclosed Sponsored Quests;
- premium Expeditions;
- creator Season revenue sharing;
- partner rewards;
- city/tourism/institutional programs.

Strategic rule:

> **ARO should monetize useful real-world activity rather than attention for its own sake.**

All money behavior remains subordinate to `ARO_MONEY.md` and approved package specs.

No speculative native token is required.

---

## 10. Ethical engagement rule

ARO may be emotionally magnetic, but the goal is **meaningful life momentum**, not dependency.

Desired outcome:

> **“I keep opening ARO because my life gets more interesting.”**

Avoid:

- endless feeds;
- fake scarcity;
- punitive streaks;
- gambling mechanics;
- pay-to-win;
- manipulative notification loops;
- screen-time optimization as the primary success metric.

The product succeeds when it gives the user a reason to **leave the app and go live something**.

---

## 11. Shipathon story now

The strongest current demonstration is one closed loop:

1. **People near you want what you know.**
2. ARO makes intent + demand + capability + place + time visible.
3. ARO composes an Opportunity.
4. People commit.
5. Commitment Orbit closes.
6. **The Circle is real.**
7. People meet in real life.
8. ARO Proof records the outcome.
9. Passport evolves.
10. Optional Season quest completes.
11. Long-term: place becomes part of a Life Map / Beacon / Expedition layer.

Closing:

# **ARO**

## **AI for a more human world.**

---

## 12. Strategic vs implementation status

### Approved strategic direction, not yet runtime authority

- Living Opportunity OS visual language;
- ARO Field;
- Orbit/Portal/Path/Constellation geometry;
- ARO Seasons;
- Quests;
- Sparks;
- Beacons;
- Opportunity Trails;
- Life Map;
- AR overlays;
- Season+;
- Sponsored Quests;
- creator/city Season systems.

These ideas are **preserved, intentional and current**, but remain **SPEC-REQUIRED or EXPLORATORY** until scheduled into the build sequence.

### Runtime authority

Runtime work still follows `AGENTS.md`, `ARO_SPEC_INDEX.md`, `ARO_BUILD_PLAYBOOK.md`, specialist docs and approved package specs.

---

## 13. Always-current protocol

This file is deliberately short enough to maintain.

Every meaningful project PR must ask:

1. Did the definition of ARO change?
2. Did current implementation/package status change?
3. Did the active blocker or next package change?
4. Did a strategic concept become accepted, rejected, deprecated or implemented?
5. Did the design/brand doctrine materially change?
6. Did monetization, Trust, privacy, AI authority or product sequencing change?

If **yes** to any:

- update `ARO_CURRENT_STATE.md`;
- append `ARO_CHANGELOG.md`;
- update `ARO_SPEC_INDEX.md` and/or `ARO_IMPLEMENTATION_STATUS.md` when status changed;
- update `DECISIONS.md` if a durable decision changed;
- update specialist docs when their domain changed;
- refresh Graphify locally when available.

This is how ARO stops depending on chat history.

---

## 14. Current north star

> **ARO should feel like a beautiful living map of human possibility — warm, intelligent, cinematic, spatial and constantly transforming intention into reality.**

And the game/AR layer should obey one final rule:

> **ARO uses game design to make real life more discoverable, social, rewarding and memorable — not to keep people staring at the game.**
