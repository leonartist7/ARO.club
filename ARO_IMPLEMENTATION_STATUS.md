# ARO — Implementation Status Ledger

> **2026-09-03 execution handoff:** I0.2 merged through PR #28 at `5976928`.
> Its isolated database and Quality workflows passed, including 81 SQL
> assertions, synthetic Auth/API/Storage/recovery/reset exercises and the
> authenticated responsive browser matrix. I0.2 and Q0 are **IMPLEMENTED / CI
> VERIFIED** in the disposable lane. GitHub `main` protection now requires the
> three stable CI checks. Isolated hosted capacity now exists; parent I0's
> remaining gates and I0.2's independent-review follow-up remain explicit. UX0
> is SPEC-READY as a synthetic frontend-only prototype and does not unlock P1.

> **Status as of September 3, 2026.**
>
> This file answers one question unambiguously: **what exists, what has been verified, what is blocked, and what comes next?**
>
> Update this ledger in every package PR that changes program status. Do not rely on chat history for completion state. Use `ARO_CURRENT_STATE.md` for the concise current strategic snapshot and `ARO_CHANGELOG.md` for evolution history.

---

## 1. Executive status

### Program state

**ARO R1 is shipped; I0.2 and Q0 CI gates pass; UX0 is the next eligible
frontend-only package; P1 remains pre-implementation at its parent-I0 gate.**

The master vision, product boundaries, architecture, migration strategy, trust/safety, money, growth, design, Shipathon scope and P1–P6 sequence have been recovered and preserved in GitHub. `ARO_MASTER_DELIVERY_PLAN.md` is the canonical durable objective and cloud-task handoff through the verified P5 V1 loop.

The latest Living Opportunity OS experience direction and Seasons/AR strategy are also preserved as **strategic/spec-gated layers**, not as completed runtime features.

The existing Tonguee product provides a significant working vertical foundation. ARO does **not** restart from zero. The ARO runtime now lives in `leonartist7/ARO.club`; the original Tonguee repository and production providers remain preserved.

### Current gate

**ARO-R1 — Platform Rebrand and Repository Separation** is SHIPPED. PR #22 merged into `main` as `494817f`, and its Vercel production deployment reached `READY`. Public routes render while account actions fail closed with truthful copy when no backend is configured.

### Current enabling package

**ARO-I0.2 + ARO-Q0** are **IMPLEMENTED / CI VERIFIED**. PR #28 merged at
`5976928` with passing disposable migration/Auth/RLS/Storage/recovery/reset and
authenticated 360px/1440px light/dark browser evidence, plus Quality CI. The
parent I0 now has an active isolated hosted target; hosted SQL hardening and CI
reset equivalence pass. Preview literal-value matching, Auth/recovery and domain
gates remain separate. Branch protection passed on 2026-09-02.

### Next eligible runtime package

I0.1 update: the disposable Supabase CI subpackage is **VERIFIED** at `54e41b7`, PR #27 merged at 467a11d (SHIPPED) (`specs/ARO-I0.1-EPHEMERAL-SUPABASE-CI.md`, `artifacts/ARO-I0.1/VERIFICATION.md`). Real CI platform/Auth/RLS-probe/reset/cleanup and Quality checks pass; automated security/operations review findings are resolved. No product schema or hosted environment is established by this fixture. Q0 authenticated app regression and P1 remain gated; live source Trust drift is recorded in `artifacts/ARO-I0.1/MIGRATION_SOURCE_AUDIT.md`.

**ARO-UX0 — Opportunity Formation Prototype** is **SPEC-READY**. It may begin
after its specification PR merges and may change only the synthetic frontend.
Its signature interaction joins what a person wants, what they can bring, and
people · place · time into one immediately updating, explainable opportunity.
It cannot add backend semantics or waive any I0/P1 gate.

### Next semantic product package

**ARO-P1 — Capability and Goal Foundation**

P1 is **SPEC-READY** and is not yet IN-PROGRESS. Its executable baseline is recorded under `artifacts/ARO-P1-BASELINE/VERIFICATION.md`, but the gate did not pass. Isolated hosted capacity now exists at `mibydnerayobemhnlfyl`, and the founder accepted the protected CI reset/replay/cleanup lane as I0-004. Parent-I0 Preview literal-value matching, Auth/recovery and domain gates remain. Tonguee production remains evidence-only and `aro-platform` remains quarantined and untouched.

---

## 2. Status legend

- **VERIFIED** — package acceptance/evidence completed for its intended scope.
- **IMPLEMENTED** — working implementation exists, but may need targeted ARO regression verification.
- **IN-PROGRESS** — active branch/PR exists.
- **BLOCKED** — named unresolved gate prevents progression.
- **SPEC-REQUIRED** — direction exists but implementation specification is not yet approved.
- **EXPLORATORY** — future idea only.
- **VISION** — long-term direction only.
- **DEPRECATED** — retained for historical/compatibility context.

---

## 3. ARO program packages

| Package | Status | What exists | Verification / evidence | Next action |
|---|---|---|---|---|
| Recovery of deleted master vision | **VERIFIED** | `ARO_MASTER.md`, `ARO_RECOVERY_STATUS.md`; original strategic artifacts catalogued | recovery PR merged into director branch | keep synchronized with decisions |
| Current-state/changelog governance | **VERIFIED** | `ARO_CURRENT_STATE.md`, `ARO_CHANGELOG.md`, `AGENTS.md` sync rules | documentation contract exists | update on every material strategy/status PR |
| M0 — master delivery governance | **VERIFIED** | durable objective, phase graph, autonomy boundaries, V1 stopping condition and cloud starter prompt | `ARO_MASTER_DELIVERY_PLAN.md`, ADR-027, merged PR #24 | synchronize every material package/release transition |
| Living Opportunity OS experience direction | **SPEC-REQUIRED** | `ARO_EXPERIENCE_SYSTEM.md` | strategic doctrine preserved | adopt selectively inside package specs; validate accessibility/performance |
| UX0 — opportunity formation frontend prototype | **SPEC-READY** | founder-approved frontend-first boundary; real-time deterministic three-point interaction | `specs/ARO-UX0-OPPORTUNITY-FORMATION-PROTOTYPE.md`, `artifacts/ARO-UX0/HANDOFF.md`; no runtime yet | implement on a new branch/PR; Preview-only founder review |
| ARO Seasons / real-life progression | **EXPLORATORY / SPEC-REQUIRED** | `ARO_SEASONS_AR.md` | strategy preserved | wait for reliable P5 Proof/Passport base, then specify lightweight progression |
| ARO AR / Beacons / Trails / Expeditions | **EXPLORATORY** | `ARO_SEASONS_AR.md` | strategy preserved | prove place/privacy/safety model before AR |
| P0 — Director reset | **VERIFIED** | ARO-first operating authority and migration direction | `ARO_P0_AUDIT.md` | none |
| P0.1 — Director Pack completion | **VERIFIED** | design, trust/safety, money, growth, Shipathon, decisions, executable playbook | governance-only scope preserved | none |
| SEC0 — secret hygiene | **VERIFIED** after finalization PR merge | branch `agent/aro-sec0-finalize`; `.env` removed; ignore rules hardened; founder decision recorded | `ARO_SEC0_REPORT.md` | keep deployment/local configuration outside Git |
| R1 — repository separation + platform rebrand | **SHIPPED** | independent ARO.club repository and Vercel project, ARO shell/home/metadata, preserved Tonguee vertical | `specs/ARO-R1-FULL-REBRAND.md`, `artifacts/ARO-R1/VERIFICATION.md`, merged PR #22 | monitor production; keep backend fail-closed until approved |
| I0 — isolated infrastructure | **IN-PROGRESS / GATES BLOCKED** | active $0 isolated staging target, CI reset equivalence, both migrations applied, hosted 21+60 SQL assertions pass, active branch protection, Preview-only Supabase variable scopes and READY deployment | `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` v1.1.1, `artifacts/ARO-I0/VERIFICATION.md` | verify Preview values; complete Auth/recovery and domain gates |
| I0.2 — application/Auth/Trust baseline | **IMPLEMENTED / CI VERIFIED** | PR #28 merged `5976928`; disposable migration/Auth/RLS/Storage/recovery/reset/browser matrix | `specs/ARO-I0.2-APPLICATION-BASELINE.md`, PR #28 | obtain required independent implementation review; preserve isolated scope |
| Q0 — reliability foundation | **IMPLEMENTED / CI VERIFIED** | zero-warning lint, portable browser runner, public and authenticated isolated CI, stable required checks on protected `main` | `specs/ARO-Q0-RELIABILITY-FOUNDATION.md`, `artifacts/ARO-Q0/VERIFICATION.md`, PR #28 | parent-I0 hosted configuration/recovery remains separate |
| P1 — capability + goal foundation | **SPEC-READY / BASELINE BLOCKED** | approved package spec plus executed repository/provider baseline | `artifacts/ARO-P1-BASELINE/VERIFICATION.md`; no runtime implementation | complete parent-I0 and authenticated/RLS gates |
| N1 — platform / Next.js decision | **SPEC-REQUIRED** | measured-decision contract exists in master plan | no implementation | P1 verified; author parity, SSR/auth, cutover and rollback spec |
| X1 — experience foundation | **SPEC-REQUIRED** | Living Opportunity OS direction plus bounded foundation contract | no implementation | N1 decision complete; specify reusable accessible primitives |
| P2 — explicit intent + demand signal | **SPEC-REQUIRED** | package definition and privacy principles | no ARO implementation | P1 verified; approve intent/aggregation/RLS spec |
| A1 — AI runtime, evaluation + safety | **SPEC-REQUIRED** | provider/eval/cost/authority contract exists in master plan | no runtime implementation | P2 verified; approve AI foundation spec before P3 |
| P3 — language opportunity suggestion | **SPEC-REQUIRED** | Catalyst/Opportunity Engine boundaries | no ARO implementation | P2 verified; AI/evaluation/Trust package spec |
| P4 — commitment + booking | **SPEC-REQUIRED** | commitment and money boundaries | existing Tonguee bookings are foundation, not P4 completion | P3 verified; approve state/money/concurrency spec |
| P5 — Proof + outcomes + Passport | **SPEC-REQUIRED** | Proof/Passport direction; existing Passport foundation | existing Passport is not full ARO Proof | P4 verified; approve outcome evidence spec |
| P6 — adjacent vertical | **SPEC-REQUIRED** | category-gated expansion direction | none | core loop proven + explicit category gate |

---

## 4. Existing Tonguee implementation foundation

The following implementation predates the new ARO package sequence and is intentionally reused. Classify it as **IMPLEMENTED foundation** until its dependent ARO package performs targeted regression verification.

### Product and platform

- **React/Vite/Tailwind application:** IMPLEMENTED.
- **Routing and reusable UI primitives:** IMPLEMENTED.
- **Supabase Auth/Postgres/Storage patterns:** IMPLEMENTED.
- **Persisted player/product state patterns:** IMPLEMENTED.
- **Responsive/mobile experience:** IMPLEMENTED baseline.

### Trust and administration

- **Teacher application and verification workflow:** IMPLEMENTED.
- **Private teacher documents/storage foundation:** IMPLEMENTED.
- **Verified-only publishing protection:** IMPLEMENTED and architecturally mandatory.
- **Admin role/protected routes:** IMPLEMENTED.
- **Admin application review tooling:** IMPLEMENTED.
- **Admin users/teachers/experiences/bookings/reviews tooling:** IMPLEMENTED.
- **Audit-log foundation:** IMPLEMENTED.
- **Admin analytics/revenue tooling:** IMPLEMENTED foundation.

### Marketplace and experience loop

- **Teacher/host profiles:** IMPLEMENTED in language vertical.
- **Experiences catalogue/detail:** IMPLEMENTED.
- **Booking flow:** IMPLEMENTED foundation.
- **Reviews:** IMPLEMENTED.
- **Favourite/chat/supporting marketplace journeys:** IMPLEMENTED foundation.

### Identity, progress and gamification

- **Passport:** IMPLEMENTED language-vertical foundation.
- **Points/streak/badges/player state:** IMPLEMENTED legacy foundation.
- **Shop/loadout/gamification loop:** IMPLEMENTED legacy foundation.
- **Review/couple/badge reachability fixes:** IMPLEMENTED.

Important: legacy gamification does **not** equal ARO Seasons implementation. Any future ARO progression system must follow the ethical engagement and real-world verification direction in `ARO_EXPERIENCE_SYSTEM.md` / `ARO_SEASONS_AR.md` and an approved package spec.

### Quality baseline

- **Dark mode:** IMPLEMENTED with regression checks.
- **i18n:** IMPLEMENTED foundation.
- **Vitest:** IMPLEMENTED.
- **Playwright E2E:** IMPLEMENTED.
- **Mobile overflow/regression testing patterns:** IMPLEMENTED.

### Important qualification

These statements mean the assets exist in the repository and were part of prior verified development. They do **not** certify every legacy flow for production under future ARO requirements. Every ARO package must re-test the foundations it depends on and record evidence.

---

## 5. Master-plan capability status

This table prevents the recovered/current long-term vision from being mistaken for current implementation.

| Capability | Current state |
|---|---|
| Intent Graph | P1/P2 foundation pending |
| Capability Graph | P1 foundation pending |
| Demand Ledger / Demand Signals | P2 pending |
| Opportunity Compiler / ARO Catalyst | P3 pending |
| Pre-Commit Markets / ARO Commit | P4 pending |
| Commitment Orbit visual/interaction language | strategic direction; P4 package must specify |
| Proof of Outcome / ARO Proof | P5 pending |
| Contextual Trust Graph | partial vertical foundation exists; platform generalization pending |
| Human Composability | exploratory after core loop |
| Business Capacity Graph / Spaces | exploratory after core loop/category/business specs |
| Personal Opportunity Agent | vision/architecture; no autonomous consequential action |
| Life Passport | Tonguee Passport implemented; platform expansion pending P5+ |
| Passport constellation / Life Map | exploratory after Proof/Passport + privacy specification |
| City Intelligence | strategic/growth direction; not implemented as general engine |
| Wish Markets | exploratory |
| Opportunity Unlocks | exploratory mechanism; commitment foundation first |
| Bounties | exploratory |
| ARO Teams | exploratory; GUILD concept preserved |
| Travel Mode | exploratory |
| ARO Seasons | exploratory/spec-required after Proof loop is reliable |
| Season+ | exploratory; no monetization package approved |
| Quests / Big Quests / Expeditions | exploratory |
| ARO Sparks | exploratory memory/progression object |
| ARO Beacons | exploratory place/business primitive |
| Opportunity Trails | exploratory |
| AR opportunity overlays | exploratory; location/privacy/safety layer not yet specified |
| Community Mode | exploratory/business-capacity future |
| Creator Guild Leaders / Creator Seasons | growth vision |
| Brand-funded opportunities / Sponsored Quests | growth vision with disclosure/trust constraints |
| ARO Wallet | exploratory/future regulated infrastructure only |
| Stablecoin rails | exploratory infrastructure only |
| Agent-to-agent commerce | long-term vision only; human approval invariant locked |

---

## 6. Required verification before P1 implementation

Before P1 code begins:

1. **Satisfied:** SEC0 provider/history risk is classified, accepted, documented and remediated in the active tree.
2. Confirm P1 package spec exists and is marked SPEC-READY.
3. Audit current auth/profile/public-profile/RLS behavior that P1 will touch.
4. Define the exact private data model, retention/deletion behavior and provenance for goal/capability records.
5. Produce the owner/other-user/admin RLS matrix.
6. Establish current mobile/desktop/light/dark baseline screenshots for affected journeys.
7. Run relevant existing unit/E2E suites and record baseline failures separately from package regressions.
8. Set measurable performance/accessibility budgets for the affected surfaces.
9. Decide which portions of `ARO_EXPERIENCE_SYSTEM.md` are explicitly adopted by the P1 package; do not implement unrelated future visual mechanics by implication.

Only then move P1 to **IN-PROGRESS**.

---

## 7. Package completion ledger format

Every completed package appends a record like this:

```text
Package: ARO-P1
Status: VERIFIED
Branch/PR: ...
Spec version: ...
Migrations: ...
Acceptance: 12/12 PASS
Unit: PASS
E2E: PASS
RLS matrix: PASS
A11y: PASS
Mobile/Desktop: PASS
Light/Dark: PASS
Performance: PASS against package budget
Security/Privacy reviewer: approved
Known follow-ups: ...
Released: no/yes + environment
```

Do not delete older records; status history is useful operational evidence.

---

## 8. Immediate next sequence

`M0 governance → I0 isolated capacity → Q0 reliability → P1 → N1 platform decision → X1 experience foundation → P2 → A1 AI foundation → P3 → P4 → P5 → V1 release audit`

Do not parallelize downstream packages in a way that invents schema or assumptions P1/P2 are supposed to establish.

Do not move Seasons/AR into runtime simply because the strategic direction is now documented. The fastest path is not maximum simultaneous coding. It is **maximum parallelism inside a stable specification boundary**.
