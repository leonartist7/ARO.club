# ARO — Implementation Status Ledger

> **Status as of August 24, 2026.**
>
> This file answers one question unambiguously: **what exists, what has been verified, what is blocked, and what comes next?**
>
> Update this ledger in every package PR that changes program status. Do not rely on chat history for completion state.

---

## 1. Executive status

### Program state

**ARO is in governed foundation / pre-P1 implementation state.**

The master vision, product boundaries, architecture, migration strategy, trust/safety, money, growth, design, Shipathon scope and P1–P6 sequence have been recovered and preserved in GitHub.

The existing Tonguee product provides a significant working vertical foundation. ARO does **not** restart from zero.

### Current blocker

**ARO-SEC0 — Repository Secret Hygiene** is the active gate before P1.

A remediation branch and PR exist. The repository-side change is prepared, but founder/provider review is still required to determine credential rotation/restriction and whether historical Git cleanup is required.

### Next runtime package

After SEC0 is closed or its remaining risk is explicitly accepted and documented:

**ARO-P1 — Capability and Goal Foundation**

---

## 2. Status legend

- **VERIFIED** — package acceptance/evidence completed for its intended scope.
- **IMPLEMENTED** — working implementation exists, but may need targeted ARO regression verification.
- **IN-PROGRESS** — active branch/PR exists.
- **BLOCKED** — named unresolved gate prevents progression.
- **SPEC-REQUIRED** — direction exists but implementation specification is not yet approved.
- **EXPLORATORY** — future idea only.
- **DEPRECATED** — retained for historical/compatibility context.

---

## 3. ARO program packages

| Package | Status | What exists | Verification / evidence | Next action |
|---|---|---|---|---|
| Recovery of deleted master vision | **VERIFIED** | `ARO_MASTER.md`, `ARO_RECOVERY_STATUS.md`; original strategic artifacts catalogued | recovery PR merged into director branch | keep synchronized with decisions |
| P0 — Director reset | **VERIFIED** | ARO-first operating authority and migration direction | `ARO_P0_AUDIT.md` | none |
| P0.1 — Director Pack completion | **VERIFIED** | design, trust/safety, money, growth, Shipathon, decisions, executable playbook | governance-only scope preserved | none |
| SEC0 — secret hygiene | **IN-PROGRESS / BLOCKED** | branch `agent/aro-sec0-secret-hygiene`; PR #9; tracked `.env` removal prepared; report added | repo-side checks recorded in `ARO_SEC0_REPORT.md` | founder/provider credential decision + history decision |
| P1 — capability + goal foundation | **BLOCKED** | package definition in build playbook | no runtime implementation yet under ARO package | close SEC0; write/approve package spec |
| P2 — explicit intent + demand signal | **SPEC-REQUIRED** | package definition and privacy principles | no ARO implementation | P1 verified; approve intent/aggregation/RLS spec |
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
- **Points/streak/badges/player state:** IMPLEMENTED.
- **Shop/loadout/gamification loop:** IMPLEMENTED foundation.
- **Review/couple/badge reachability fixes:** IMPLEMENTED.

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

This table prevents the recovered long-term vision from being mistaken for current implementation.

| Capability | Current state |
|---|---|
| Intent Graph | P1/P2 foundation pending |
| Capability Graph | P1 foundation pending |
| Demand Ledger / Demand Signals | P2 pending |
| Opportunity Compiler / ARO Catalyst | P3 pending |
| Pre-Commit Markets / ARO Commit | P4 pending |
| Proof of Outcome / ARO Proof | P5 pending |
| Contextual Trust Graph | partial vertical foundation exists; platform generalization pending |
| Human Composability | exploratory after core loop |
| Business Capacity Graph / Spaces | exploratory after core loop/category/business specs |
| Personal Opportunity Agent | vision/architecture; no autonomous consequential action |
| Life Passport | Tonguee Passport implemented; platform expansion pending P5+ |
| City Intelligence | strategic/growth direction; not implemented as general engine |
| Wish Markets | exploratory |
| Opportunity Unlocks | exploratory mechanism; commitment foundation first |
| Bounties | exploratory |
| ARO Teams | exploratory; GUILD concept preserved |
| Travel Mode | exploratory |
| Community Mode | exploratory/business-capacity future |
| Creator Guild Leaders | growth vision |
| Brand-funded opportunities | growth vision with disclosure/trust constraints |
| ARO Wallet | exploratory/future regulated infrastructure only |
| Stablecoin rails | exploratory infrastructure only |
| Agent-to-agent commerce | long-term vision only; human approval invariant locked |

---

## 6. Required verification before P1 implementation

Before P1 code begins:

1. Close or explicitly accept/document SEC0 provider/history risk.
2. Confirm P1 package spec exists and is marked SPEC-READY.
3. Audit current auth/profile/public-profile/RLS behavior that P1 will touch.
4. Define the exact private data model, retention/deletion behavior and provenance for goal/capability records.
5. Produce the owner/other-user/admin RLS matrix.
6. Establish current mobile/desktop/light/dark baseline screenshots for affected journeys.
7. Run relevant existing unit/E2E suites and record baseline failures separately from package regressions.
8. Set measurable performance/accessibility budgets for the affected surfaces.

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

`SEC0 decision → P1 spec → P1 implementation → P1 verification → P2 spec`

Do not parallelize downstream packages in a way that invents schema or assumptions P1/P2 are supposed to establish.

The fastest path is not maximum simultaneous coding. It is **maximum parallelism inside a stable specification boundary**.
