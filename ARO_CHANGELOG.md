# ARO — Product & Architecture Changelog

> **Purpose:** append-only record of meaningful ARO evolution. This is not implementation authority by itself; it records when the current direction changed and points to the documents that now define it.
>
> Do not rewrite history to make the project look cleaner. Add a new dated entry when a strategic, architectural, implementation-status, design, Trust, privacy, money or sequencing decision materially changes.

---

## 2026-08-28 — Q0 reliability and CI foundation

### Implemented

- eliminated the inherited 19 lint errors and 9 warnings without broad rule disablement;
- added a portable Vite/Chromium E2E harness with platform-aware child cleanup and a narrowly scoped Windows loopback-suspension retry;
- removed stale localStorage user impersonation journeys and replaced them with real signed-out, fail-closed and hostile-local-state contracts;
- added an explicit authenticated E2E gate that reports `BLOCKED_PREREQUISITE` until I0 supplies an approved isolated target and synthetic credentials;
- added stable GitHub `Quality / static` and `Quality / browser-smoke` jobs;
- made password recovery truthful and disabled without a backend, aligned the admin redirect with `/login`, fixed an inherited signup dark surface and repaired a corrupted footer separator.

### Verification

- lint PASS with zero warnings;
- unit PASS, 61/61;
- production build PASS, 2,602 modules;
- public/fail-closed E2E PASS, 16/16;
- 1440px live-Chrome visual audit PASS with no page error or framework overlay;
- main JS changed by only +0.04 kB minified/+0.04 kB gzip; no dependency changed.

### Status transition

- Q0: **SPEC-REQUIRED → IMPLEMENTED / AUTH-GATE BLOCKED**.
- I0 remains **SPEC-READY / IMPLEMENTATION BLOCKED**.
- P1 remains **SPEC-READY / BASELINE BLOCKED**.
- No provider, schema, domain, billing or production mutation occurred.

## 2026-08-28 — I0 isolated-infrastructure specification and provider baseline

### Added

- `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` 1.0.0 with local/Preview/Production boundaries, migration and secret contracts, failure analysis, cost gates, recovery strategy and requirement-level evidence;
- `artifacts/ARO-I0/BASELINE.md` with live read-only GitHub, Vercel, Supabase, domain and local-runtime evidence;
- `artifacts/ARO-I0/VERIFICATION.md` with requirement-level package evidence, 61 passing tests, passing build and the unchanged 19-error/9-warning lint baseline;
- an explicit $0 local Supabase path, currently blocked because this host has no Docker-compatible runtime.

### Provider truth

- Vercel `aro-club` is linked to `leonartist7/ARO.club`; `langgie` remains linked to `leonartist7/Tonguee`;
- M0 production deployment for `67d5c8d` is READY;
- Supabase Free still has two ACTIVE_HEALTHY projects: Tonguee and quarantined `aro-platform`;
- a new project currently quotes $0/month but cannot be created at the active-project limit;
- Preview branch compute currently quotes $0.01344/hour and remains unapproved;
- `aro.club` is not attached to the connected ARO Vercel project and currently serves a different Spanish-language site, so ownership/disposition is a founder gate.

### Security hygiene

Removed the literal legacy Tonguee browser anon key from `DEPLOYMENT.md` and replaced it with provider-neutral placeholders. SEC0 still requires no rotation or history rewrite solely for that publishable-key category.

### Status transition

- M0: **VERIFIED**.
- I0: **SPEC-READY / IMPLEMENTATION BLOCKED**.
- P1 remains **SPEC-READY / BASELINE BLOCKED**; no schema or provider mutation occurred.

## 2026-08-27 — Master Delivery Plan and cloud-task contract

### Decision

ARO now has one canonical durable delivery objective in `ARO_MASTER_DELIVERY_PLAN.md`: reach a production-ready, verified V1 opportunity loop through P5 with isolated infrastructure, deterministic quality gates, a measured platform/Next.js decision, an accessible experience foundation, governed AI architecture and a complete release/recovery audit.

### Added

- verifiable final stopping condition and definition of zero known release-blocking defects;
- autonomous-work and founder-only approval boundaries;
- enabling-package graph for M0, I0, Q0, N1, X1 and A1;
- detailed phase contracts through P5 and the final V1 audit;
- strict deferral of production 3D/AR, Seasons, P6, money providers and consequential autonomous AI;
- a copy-ready cloud-task starter prompt and package progress-log format;
- ADR-027 and mandatory discovery links from agent/status/build governance.

### Sequence clarification

The semantic product dependency remains P1 → P2 → P3 → P4 → P5. Enabling packages prepare infrastructure, reliability, platform, experience and AI boundaries; they cannot smuggle downstream product behavior into an earlier phase.

### Status transition

- M0 Master Delivery Governance: **ACTIVE / GOVERNANCE-READY**.
- I0: **SPEC-REQUIRED / BLOCKED** on isolated Supabase capacity.
- Q0, N1, X1 and A1: **SPEC-REQUIRED** at their named dependency gates.

## 2026-08-27 — R1 production release and P1 baseline gate

### Released

- merged R1 PR #22 into `main` as `494817f`;
- verified Vercel production deployment `dpl_DKCbYy8LvJAWP3tAzCA43oGGJUA2` as `READY`;
- preserved fail-closed account behavior while no ARO.club backend is configured.

### P1 baseline evidence

- captured the exact base SHA, 61 passing unit tests, passing production build, bundle sizes and inherited lint/E2E failures;
- captured eight 360px/1440px light/dark protected-route gate screenshots with no overflow, browser errors, blank state, error overlay or unnamed controls;
- completed a read-only Tonguee grants, RLS, function and advisor audit without mutating production;
- confirmed broad legacy grants/policies and advisor debt make dedicated private P1 tables mandatory.

### Environment gate

The founder approved a $0/month `ARO.club Staging` project in `lionovart's Org`. Supabase rejected creation because the account already has the maximum two active free projects. No project or charge was created. Tonguee remains preserved, and `aro-platform` remains **QUARANTINED — KEEP**. P1 runtime work remains prohibited until isolated capacity exists.

### Status transition

- ARO-R1: **VERIFIED / not SHIPPED → SHIPPED**.
- ARO-P1: **SPEC-READY → SPEC-READY / BASELINE BLOCKED**.

## 2026-08-26 — ARO.club repository separation and platform rebrand

### Decision

ARO now has an independent runtime repository, `leonartist7/ARO.club`. The original Tonguee repository, deployment and Supabase project remain preserved as the first language vertical and recovery path.

### Implemented

- integrated governed ARO history through `9394cb7` into the copied repository;
- introduced the ARO orbit mark, editorial typography and Bone/Ink/Vermilion/Saffron platform palette;
- replaced the universal shell, homepage, metadata and public platform language with ARO identity;
- preserved Tonguee explicitly as the first live language path, including existing teachers, experiences, bookings, Passport and Trust foundations;
- removed false platform-scale implications and labelled the wider Opportunity Engine as future capability;
- recorded four breakpoint/theme screenshots, 61 passing tests, a passing production build, responsive/accessibility evidence and inherited lint debt in `artifacts/ARO-R1/VERIFICATION.md`.

### Infrastructure boundary

- no provider configuration, schema, RLS, Trust, auth, payment, Stripe or Google mutation was made by the package;
- after the R1 branch was pushed, Vercel initially created a Preview deployment through inherited project `lionovart/langgie`, exposing the hosting-separation issue;
- the founder then created independent Vercel project `aro-club`, which successfully deployed safe copied-main commit `ce291193` as its Production baseline;
- ARO.club has no approved Supabase runtime target yet;
- Tonguee production must not be used silently;
- `aro-platform` (`jjgccfrwjkwknyjtbtxa`) remains **QUARANTINED — KEEP**.

### Status transition

- ARO-R1: **SPEC-READY / IN-PROGRESS → VERIFIED locally / PROVIDER-SEPARATED; not SHIPPED**.
- ARO-P1: remains **SPEC-READY**, gated by an isolated ARO.club environment and execution baseline.

### Preview resilience correction

The first independent preview revealed that the legacy Supabase client threw before React mounted when Vercel variables were absent. R1 v1.0.1 now permits public review routes to render without backend configuration. Authentication and account creation fail closed with explicit preview-state copy. No database credentials, provider configuration or production data were added.

---

## 2026-08-25 — Living Opportunity OS + Seasons / AR strategic expansion

### Why this changed

The initial recovered mobile/UI concepts were judged too visually generic and too close to a polished marketplace/event application. ARO needs an experience language that communicates its unique product thesis: opportunity **forming around a person**, not listings being served to them.

### Added

- `ARO_EXPERIENCE_SYSTEM.md`
- `ARO_SEASONS_AR.md`
- `ARO_CURRENT_STATE.md`
- `ARO_CHANGELOG.md`

### Experience direction

ARO is now explicitly framed as a **Living Opportunity OS**.

New signature concepts preserved as current strategic direction:

- ARO Field;
- Orbit;
- Portal;
- Path;
- Constellation;
- Opportunity Radar;
- Commitment Orbit;
- Circle formation;
- Passport constellation / Life Map;
- generative ARO Director surface;
- warm mineral/editorial visual identity rather than generic AI-purple UI.

### Visual-brand direction

Primary direction:

- Living Red / Vermilion;
- Bone / Warm Ivory;
- Ink / Near Black;
- Saffron / Warm Gold;
- Moss / Mineral Green;
- Clay / Terracotta;
- Night Plum;
- Mineral Sky Blue.

The O in ARO becomes a core visual primitive that can represent possibility, gathering, threshold, Circle and completion.

### Engagement direction

ARO should be emotionally compelling because it increases real-world possibility, not because it traps users in the screen.

Desired statement:

> “I keep opening ARO because my life gets more interesting.”

Explicit anti-patterns include endless feeds, punitive streaks, fake scarcity, paid randomness, pay-to-win Trust and manipulative notification loops.

### Seasons / game layer

Added strategic direction for:

- ARO Seasons;
- Personal Sparks;
- Weekly Quests;
- Opportunity Quests;
- Community Quests;
- Big Quests;
- Expeditions;
- ARO Sparks collectibles tied to real outcomes;
- future optional Season+ value layer.

Core idea:

> **Your city becomes the game board. Your life becomes the progression system.**

### AR / place layer

Added strategic direction for:

- ARO Beacons;
- Opportunity Trails;
- Travel Mode Expeditions;
- private Personal Life Map;
- future camera AR overlays for approved public opportunities/places.

AR is explicitly an amplifier after the 2D opportunity/place/privacy system works, not a prerequisite for the core loop.

### Monetization direction

Preserved potential future revenue layers:

- Season+;
- Host Pro;
- marketplace/service fees;
- Business Beacons;
- disclosed Sponsored Quests;
- premium Expeditions;
- creator Season revenue sharing;
- partner rewards;
- city/tourism programs.

Money remains governed by `ARO_MONEY.md` and future approved specs. No native speculative token is required.

### Shipathon narrative

The preferred demo is now a single complete loop:

`demand → composition → opportunity → commitment orbit → real-world Circle → Proof → Passport → Season progress`

with the memorable formation moment:

> **The Circle is real.**
>
> **It’s happening.**

### Status

These additions are **approved strategic direction** but remain **SPEC-REQUIRED / EXPLORATORY** for runtime work. They do not bypass SEC0 or the P1–P6 build sequence.

---

## 2026-08-25 — Spec-driven operating system added

ARO added a canonical spec/status vocabulary and package template so implementation no longer begins from chat instructions or brainstorm documents.

Key files:

- `ARO_SPEC_INDEX.md`
- `ARO_IMPLEMENTATION_STATUS.md`
- `specs/PACKAGE_TEMPLATE.md`

Required chain:

`Vision → durable decision → governing spec → package spec → implementation → tests → evidence → status update`

---

## 2026-08-25 — Obsidian + Graphify project brain added

ARO added two repository-only knowledge layers:

- Obsidian for human-readable linked specs/decisions;
- Graphify for machine-queryable relationships across code/docs/SQL/config.

Neither graph is implementation authority.

Key files:

- `ARO_HOME.md`
- `.obsidian/`
- `.agents/skills/graphify/SKILL.md`
- `tools/knowledge/`
- `specs/ARO-KNOWLEDGE-TOOLS.md`

---

## 2026-08-24/25 — Deleted-master recovery consolidated

The missing ARO vision was reconstructed from surviving generated artifacts, project context and the existing repository Director Pack.

Recovered/preserved areas include:

- Human Opportunity Network thesis;
- five universal primitives;
- original 12-system model;
- 40-point defensibility/evolution vision;
- economic flywheel;
- Personal Opportunity Agent;
- Passport;
- Human Composability / GUILD → ARO Teams lineage;
- Trust architecture;
- Shipathon loop;
- Tonguee as first ARO vertical;
- P0–P6 migration sequence.

Key files:

- `ARO_MASTER.md`
- `ARO_RECOVERY_STATUS.md`

---


## 2026-08-26 — SEC0 repository secret hygiene verified

### Decision

The founder confirmed that the historical environment file contained only browser-facing Supabase project URL and anonymous client key categories. No Stripe or Google configuration was present. The Tonguee Supabase project remains the canonical backend for the ARO migration.

### Repository remediation

- Removed `.env` from the active Git tree.
- Hardened `.gitignore` for `.env.*` while preserving `.env.example`.
- Recorded the classification and decision in `ARO_SEC0_REPORT.md`.
- Preserved Vercel deployment configuration outside Git.

### Risk decision

The founder accepted the documented historical exposure and chose no Git history rewrite. No rotation is required solely for the classified browser-facing categories. RLS and API exposure remain mandatory P1 baseline review items.

### Status transition

- ARO-SEC0: **BLOCKED / IN-PROGRESS → VERIFIED** after finalization PR merge.
- ARO-P1: **BLOCKED → SPEC-REQUIRED**.
- Next gate: approve the P1 private data/RLS/retention package spec and capture baselines before runtime implementation.

---


## 2026-08-26 — P1 capability and goal specification approved

### Decision

ARO-P1 is now **SPEC-READY**. The package contract defines one private language-learning goal plus bounded, self-declared language capabilities for an authenticated adult. It does not authorize P2 intent, public demand, matching, AI, location, money, Google, Stripe, new verticals or a broad redesign.

### Data and privacy direction

- New P1 data belongs in dedicated owner-private tables rather than publicly readable profiles.
- Self-declared capability remains separate from verified teacher evidence.
- No automatic backfill from local Zustand state or legacy profile fields is allowed.
- Anon and other users receive no access; admins receive no default access.
- Exact RLS, grants, retention, deletion and regression requirements are locked in the package spec.

### Repository discovery

The current learner experience persists onboarding/profile state primarily through a local Zustand player store with best-effort profile mirroring. The connected Tonguee Supabase project remains the canonical backend and reports an existing RLS-enabled marketplace foundation but no recorded migration history through the connector. Repository Trust SQL exists; the execution baseline must verify which Trust controls are applied live.

### Added

- specs/ARO-P1-CAPABILITY-GOAL.md
- specs/ARO-P1-BASELINE.md

### Status transition

- ARO-P1: **SPEC-REQUIRED → SPEC-READY**.
- Runtime: not IN-PROGRESS.
- Next gate: capture the exact pre-code Git, test, build, visual, accessibility, performance and Supabase baseline, then open one P1 implementation branch.

---


## 2026-08-26 — Infrastructure and environment registry added

### Why

GitHub, Vercel, environment-variable and Supabase decisions were distributed across security reports, PRs and chat context. Agents need one no-secret operational map before changing providers, branches or production state.

### Added

- ARO_INFRASTRUCTURE.md
- agent read-order and authority-map links
- ADR-025 for the secondary Supabase project quarantine
- founder-only and agent-only TODO checklists

### Locked operational state

- leonartist7/Tonguee remains the repository.
- main remains the current production/default branch.
- feat/aro-p0-director-reset remains the governed ARO integration branch.
- Vercel remains connected to the Tonguee repository; its exact Production/Preview environment mapping requires founder dashboard confirmation.
- Supabase Tonguee ref ybhecubqnhukgpvchjay remains the canonical ARO backend.
- Supabase aro-platform ref jjgccfrwjkwknyjtbtxa is **QUARANTINED — KEEP** because five auth accounts remain, despite empty public-table estimates and no storage objects.
- Stripe and Google provider configuration remain out of scope.
- No provider, deployment, schema, auth or runtime state changed in this documentation package.

### Next gate

Complete the human Vercel/Supabase dependency checks in ARO_INFRASTRUCTURE.md, while the program proceeds only to the documented P1 pre-code execution baseline.

---


## 2026-08-26 — Main/ARO branch topology verified

A post-merge comparison reports main and feat/aro-p0-director-reset as diverged. The governed ARO branch is three commits ahead and one commit behind. The main-only commit ce291193 is an empty documentation-promotion commit: its comparison with parent 931f2614 contains no changed files.

This is a Git ancestry difference, not missing runtime or documentation content. The P1 execution baseline must record it and may reconcile ancestry safely if needed, but must not overwrite newer SEC0, P1 or infrastructure governance.

---

## Changelog rule

For future entries include, when relevant:

- **why** the change happened;
- what was added/removed/deprecated;
- status transition (`VISION`, `EXPLORATORY`, `SPEC-REQUIRED`, `SPEC-READY`, `IN-PROGRESS`, `IMPLEMENTED`, `VERIFIED`, `SHIPPED`);
- affected canonical documents;
- migration or compatibility implication;
- security/Trust/privacy/money consequence;
- next gate.

This file is append-only evidence of evolution; `ARO_CURRENT_STATE.md` remains the concise answer to what is true now.
