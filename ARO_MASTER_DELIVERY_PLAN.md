# ARO — Master Delivery Plan

> **Status:** ACTIVE GOVERNED DELIVERY MAP
>
> **Approved by:** Founder, 2026-08-27
>
> **Current base:** `main` after M0 merge `67d5c8d`
>
> **Objective:** Deliver ARO's production-ready V1 opportunity loop through P5, with isolated infrastructure, a reliable application foundation, governed platform and AI architecture, verified user experience, operational recovery, and zero known release-blocking defects.

This is the canonical long-running delivery map for local and cloud agents. It coordinates packages; it does not replace their specifications. Every runtime, schema, provider, design-system, AI, Trust, payment or migration change still requires its own SPEC-READY package, branch, PR, evidence and release gate.

---

## 1. Verifiable stopping condition

The master delivery objective is achieved only when all of the following are true:

1. P1 through P5 are **VERIFIED** in sequence and the approved V1 release is **SHIPPED**.
2. ARO.club uses an isolated approved backend; Tonguee remains a preserved vertical/recovery boundary and `aro-platform` remains governed by its quarantine decision.
3. The application has no known release-blocking defects in required unit, integration, E2E, accessibility, security/RLS, performance and production smoke gates.
4. The governed Next.js/platform decision is completed with parity and rollback evidence, whether the result is migrate, stage incrementally or remain temporarily on Vite.
5. AI behavior has explicit authority limits, structured contracts, evaluation thresholds, cost/latency controls, failure handling, auditability and human approval for consequential actions.
6. Mobile/desktop, light/dark, keyboard, screen-reader, reduced-motion, empty/loading/error/retry/success states pass for every shipped V1 journey.
7. Vercel, Supabase, GitHub, domain/Auth callbacks, environment scopes, observability, backups and recovery procedures are verified without secrets in Git.
8. Status ledgers, specifications, decisions, evidence and changelog match production truth.

“Zero known release-blocking defects” is an evidence standard, not a claim that software can never contain a defect. A release blocker is any known issue that compromises required behavior, data integrity, authorization, privacy, safety, accessibility, recovery or an approved performance budget.

---

## 2. Operating model for autonomous agents

### Safe autonomous work

Agents may continue without founder interruption when the action is reversible and inside an approved package, including:

- read-only audits, repository/provider inspection and documentation reconciliation;
- scoped branch creation, local edits, tests, builds and browser verification;
- implementation literally authorized by a SPEC-READY package;
- preview deployment and non-production verification where the provider target is already approved;
- defect repair required to satisfy the active package without expanding behavior;
- evidence capture, PR creation and status synchronization.

### Founder approval remains mandatory

Stop before:

- purchases, plan upgrades, paid providers or new recurring cost;
- production database migrations, destructive data operations or irreversible provider changes;
- merging/releasing a package whose spec requires founder review;
- changing product scope, brand doctrine, stack, public/private visibility, AI authority, Trust rules, money behavior or category availability beyond an approved package;
- pausing, deleting, transferring or repurposing Tonguee or quarantined `aro-platform`;
- enabling Stripe, Google OAuth, precise location, autonomous outreach, public intent, AR or regulated categories without their explicit gates.

### Package loop

Every phase runs this loop:

`audit → specify → approve → baseline → implement → self-review → verify → preview → release gate → ship → observe → synchronize`

Required delivery record:

| Requirement | Implementation | Automated test | Operational/visual evidence | Status |
|---|---|---|---|---|
| package criterion | file/migration/function | named test | screenshot/query/log/metric | PASS/FAIL |

No FAIL may be hidden by changing the acceptance criterion after implementation.

---

## 3. Governed dependency graph

```text
R1 SHIPPED
   |
   +--> M0 Master Delivery Governance
           |
           +--> I0 Isolated Infrastructure
                   |
                   +--> Q0 Reliability Foundation
                           |
                           +--> P1 Capability + Goal
                                   |
                                   +--> N1 Platform / Next.js Decision
                                           |
                                           +--> X1 Experience Foundation
                                                   |
                                                   +--> P2 Intent + Demand
                                                           |
                                                           +--> A1 AI Foundation
                                                                   |
                                                                   +--> P3 Catalyst
                                                                           |
                                                                           +--> P4 Commitment
                                                                                   |
                                                                                   +--> P5 Proof + Passport
                                                                                           |
                                                                                           +--> V1 Release Audit
```

Q0, N1, X1 and A1 are enabling packages. They do not reorder the semantic dependency P1 → P2 → P3 → P4 → P5 and may not smuggle downstream product behavior into infrastructure work.

---

## 4. Phase M0 — Master delivery governance

### Outcome

Every new cloud/local task can discover the current objective, package order, authority, blockers and stopping condition from GitHub without relying on chat history.

### Required outputs

- this plan linked from `AGENTS.md` and the canonical document map;
- sequence/status synchronized in the build playbook, spec index and implementation ledger;
- durable sequencing decision recorded;
- cloud-task starter prompt maintained below.

### Gate

**PASSED.** Documentation consistency checks passed and PR #24 reached `main` as `67d5c8d`.

---

## 5. Phase I0 — Isolated infrastructure

### Goal

Provide a safe ARO.club development, migration, Preview and Production boundary without mutating Tonguee production or quarantined `aro-platform`.

### Required specification

`ARO-I0 — Isolated Infrastructure and Provider Boundary`

### Work

- obtain isolated Supabase capacity through an explicitly approved free or paid path;
- inventory Vercel Preview/Production variables by name and scope without exposing values;
- verify ARO.club repository/project linkage, production branch, domains and deployment protection;
- configure Supabase Site URL and allow-listed Auth callbacks for approved environments;
- define database backup, migration, seed/test-account and recovery strategy;
- define secrets, publishable/browser keys and server-only credentials;
- verify GitHub branch protection and required checks;
- preserve Tonguee and `aro-platform` boundaries.

### Acceptance

- safe migration target exists and is named in `ARO_INFRASTRUCTURE.md`;
- test accounts contain no founder/customer personal data;
- Preview cannot access Tonguee production accidentally;
- rollback and recovery are tested read-only or in the isolated environment;
- cost and ownership are recorded.

### Current blocker

`specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` is SPEC-READY and `artifacts/ARO-I0/BASELINE.md` records the live boundary. Supabase rejected the approved $0/month `ARO.club Staging` project because the founder account already has two active free projects. The $0 local Supabase path is also blocked on this host because no Docker-compatible runtime is installed. No charge or project was created. Resolution requires a compatible local runtime and/or founder-approved hosted capacity; neither existing active project may be touched under current authority.

---

## 6. Phase Q0 — Reliability foundation

I0 execution update (2026-08-30): the disposable GitHub-hosted Supabase CI lane in PR #27 (`specs/ARO-I0.1-EPHEMERAL-SUPABASE-CI.md`) is VERIFIED at runtime commit `54e41b7`; release pending. Real platform/Auth/SQL/reset/cleanup and Quality checks pass, and automated review findings are resolved. It needs no hosted capacity or local Windows runtime. This fixture does not resolve application migration provenance, hosted capacity or full I0/P1 gates; source Trust drift requires reviewed baseline reconciliation.

### Goal

Make the inherited application baseline deterministic enough that new P1 regressions are distinguishable from legacy debt.

### Required specification

`ARO-Q0 — Reliability and CI Foundation`

### Work

- make the E2E harness portable across Windows and CI;
- replace stale authentication/onboarding journey assumptions with current contracts;
- repair current lint failures and review warnings without behavior expansion;
- establish required CI checks for unit, lint, build and scoped browser smoke;
- add route/error-overlay/blank-page checks;
- set bundle, request, query and Core Web Vitals baselines;
- document test-data and authenticated-test-account handling;
- retain R1 responsive/theme/accessibility evidence.

### Acceptance

- clean lint gate or a narrowly approved time-bounded exception ledger;
- E2E launches without host-specific workarounds;
- required baseline journeys pass deterministically;
- build contains no new critical warning and dependency/lockfile state is reproducible;
- CI blocks merge when a required gate fails.

### Current status — 2026-08-28

`specs/ARO-Q0-RELIABILITY-FOUNDATION.md` is implemented. Local lint, 61 unit tests, production build and 16 public/fail-closed browser checks pass; `.github/workflows/quality.yml` defines the stable PR checks. Q0 remains **IMPLEMENTED / AUTH-GATE BLOCKED** until I0 provides an approved isolated Auth/RLS target and founder-authorized branch protection is configured. Evidence: `artifacts/ARO-Q0/VERIFICATION.md`.

---

## 7. Phase P1 — Capability + Goal Foundation

Authority: `specs/ARO-P1-CAPABILITY-GOAL.md` plus its approved implementation revision.

### Outcome

An authenticated adult can create, review, edit and delete private ARO learning goals and self-declared capabilities.

### Non-negotiable verification

- append-only dedicated tables;
- explicit least-privilege grants;
- owner-only SELECT/INSERT/UPDATE/DELETE policies;
- UPDATE uses both `USING` and `WITH CHECK`;
- hostile owner/other-user/anon/admin/service-path tests;
- self-declared never presented as verified;
- account deletion/export/retention behavior;
- mobile/desktop and light/dark empty/populated/validation/error evidence;
- performance within package budget;
- no public demand, matching, AI, money, location, Google or Stripe scope.

---

## 8. Phase N1 — Platform and Next.js decision

### Goal

Decide and, if approved, execute an incremental migration that improves server boundaries, AI readiness, SEO and Vercel integration without losing working ARO/Tonguee behavior.

### Required specification

`ARO-N1 — Next.js Platform Foundation`

### Decision evidence

- route/component/data/auth parity inventory;
- Vite-versus-Next benefit, risk, effort and rollback analysis using current official documentation;
- App Router and Server/Client Component boundary;
- Supabase SSR session/cookie model and server-only credential boundary;
- API/route-handler/Server Action authority rules;
- caching, revalidation, metadata and static/dynamic rendering policy;
- Tailwind/design-system and asset migration plan;
- E2E parity and bundle/Core Web Vitals comparison;
- incremental cutover and rollback.

### Gate

The package may conclude “remain on Vite for now” if measured evidence does not justify migration. Architecture evidence—not fashion—decides.

---

## 9. Phase X1 — ARO experience foundation

### Goal

Turn the Living Opportunity OS direction into reusable, accessible implementation primitives without prematurely building the future world.

### Required specification

`ARO-X1 — Experience System Foundation`

### Work

- semantic color, typography, spacing, elevation, motion and state tokens;
- Field, Orbit, Portal, Path and Constellation primitives;
- loading, empty, error, retry, validation, pending and success patterns;
- mobile-first navigation and wide spatial layouts;
- keyboard, screen reader, contrast, touch target and reduced-motion contracts;
- asset/image/font pipeline and performance budgets;
- optional feature-flagged 3D technical spike with static and reduced-motion fallback.

### Boundary

No production 3D world, AR, Beacons, precise location, Seasons or expensive asset pipeline ships from X1. A spike must prove device performance and accessibility before a later package can adopt it.

---

## 10. Phase P2 — Explicit Intent + Demand Signals

### Outcome

Participants can express, revise, pause and delete explicit intent while ARO exposes only safe, thresholded aggregate demand.

### Required controls

- private intent lifecycle and provenance;
- purpose, retention, consent and visibility controls;
- coarse locality and freshness semantics;
- minimum aggregation thresholds and anti-reidentification tests;
- honest distinction between interest, conditional commitment and booking;
- no public individual-intent feed or precise location;
- owner and aggregate query performance budgets.

---

## 11. Phase A1 — AI platform foundation

### Goal

Create a provider-neutral, observable and evaluable AI layer before P3 depends on it.

### Required specification

`ARO-A1 — AI Runtime, Evaluation and Safety Foundation`

### Required decisions

- Vercel AI SDK/Gateway or alternative based on measured requirements;
- server-only provider credentials and environment isolation;
- typed structured-output contracts and schema validation;
- prompt/version registry and reproducibility;
- generation IDs, permitted persistence and deletion;
- token, latency and monetary budgets plus rate limits;
- provider failure, timeout, retry, fallback and circuit-breaking behavior;
- input/output minimization and prohibited sensitive context;
- offline eval dataset, graders, thresholds and regression policy;
- traces/logs with privacy-safe redaction;
- human approval for messages, publication, visibility, booking and money actions.

### Gate

No AI feature ships because a demo looks impressive. It must beat the approved deterministic baseline on the named evaluation while respecting cost, latency, privacy and safety thresholds.

---

## 12. Phase P3 — ARO Catalyst

### Outcome

ARO produces explainable language-opportunity suggestions from permitted P1/P2 data and existing verified Tonguee supply.

### Required controls

- deterministic eligibility/viability rules before AI composition;
- clear “why this” explanation and uncertainty;
- Trust/category/verified-publish gates;
- evaluation against useful, unsafe, irrelevant and privacy-leaking cases;
- no invented people, demand, availability, qualification or location;
- human approval before outreach, publication or booking;
- observable failure/fallback states and bounded costs.

---

## 13. Phase P4 — Commitment + operating loop

### Outcome

People can make clear, reversible commitments and understand what makes an Opportunity real.

### Required controls

- commitment state machine, thresholds, deadlines and expiry;
- idempotency, concurrency and reconciliation;
- withdrawal, cancellation, no-show and safety-cancellation behavior;
- notification preferences and anti-pressure copy;
- booking integration and audit evidence;
- accessible Commitment Orbit representation with non-visual equivalent.

Money is a separate founder-approved package. No Stripe, charge, payout, refund or financial commitment ships merely because P4 exists.

---

## 14. Phase P5 — Proof + Passport

### Outcome

ARO records meaningful real-world outcomes with clear provenance and evolves Passport from legacy progress into trusted lived evidence.

### Required controls

- distinguish participant report, host report, system record and verified evidence;
- attendance/outcome lifecycle, disputes, correction and deletion;
- contextual Trust updates without a universal social score;
- privacy and visibility controls;
- anti-fraud/anti-gaming behavior;
- meaningful, non-manipulative progression;
- Passport mobile/desktop, light/dark and accessibility evidence;
- retention, export and recovery tests.

---

## 15. Final V1 release audit

### Functional journeys

- account creation/sign-in/recovery under approved providers;
- P1 goal/capability CRUD;
- P2 intent lifecycle and safe aggregate demand;
- P3 suggestion explanation/approval/fallback;
- P4 commitment/cancellation/threshold behavior;
- experience discovery, host Trust, booking foundation and notifications;
- P5 outcome/Proof/Passport;
- admin/Trust regression coverage.

### Required audit lanes

- unit, integration, E2E and production smoke;
- hostile RLS and authorization matrix;
- dependency, secret and security-advisor review;
- WCAG-oriented keyboard/screen-reader/contrast/motion review;
- mobile/desktop and light/dark visual regression;
- Core Web Vitals, bundle, query, AI latency/cost and request budgets;
- error tracking, logs, traces, alerts and privacy redaction;
- backup/restore and rollback drill;
- truthful copy and no fabricated intelligence/economics;
- status, decision, architecture, data, Trust, money and changelog synchronization.

### Release posture

Use preview → canary/controlled production → observation → full release. Any release-blocking failure returns to the owning package; do not waive it by relabeling the package.

---

## 16. Deferred until after the V1 gate

- P6 adjacent vertical;
- production 3D home/world;
- Seasons, Season+, Quests and Sparks;
- AR, Beacons, Trails, Expeditions and precise-location systems;
- Sponsored Quests and creator/city monetization;
- wallet, stablecoin or agent-to-agent commerce;
- regulated/high-risk categories.

Each remains preserved strategic direction and requires its own legal, privacy, Trust, safety, accessibility, performance and economics specification.

---

## 17. Cloud task starter prompt

Use this in a new cloud task:

> Read `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_CURRENT_STATE.md`, `ARO_INFRASTRUCTURE.md`, `ARO_SPEC_INDEX.md`, `ARO_IMPLEMENTATION_STATUS.md`, `ARO_BUILD_PLAYBOOK.md`, `DECISIONS.md`, and the active package specification. Continue the first incomplete phase of the Master Delivery Plan autonomously. Work spec-first; use one package, branch and PR; preserve Tonguee production and quarantined `aro-platform`; do not add cost, dependencies, providers, money, public/private visibility changes or consequential AI authority without the required approval. Run all applicable tests, browser/accessibility/performance/security checks, record evidence, update status documents and stop only for a genuinely founder-only decision. Do not claim completion while any required gate fails.

If the active blocker is unchanged, continue safe documentation, test, architecture, design-system or audit work that does not invent downstream product authority. Never bypass an infrastructure or security gate to appear productive.

---

## 18. Progress log format

Each package PR appends or updates a compact record:

```text
Package:
Status: SPEC-REQUIRED | SPEC-READY | IN-PROGRESS | IMPLEMENTED | VERIFIED | SHIPPED | BLOCKED
Branch / PR:
Base commit:
Spec version:
Acceptance: passed / total
Tests:
Security / RLS:
Accessibility / visual:
Performance / cost:
Deployment:
Recovery:
Known non-blocking follow-ups:
Founder action required:
Next authorized package:
```

The current plan is intentionally ambitious, but it is not permission to perform unrelated work in one branch. Autonomous delivery comes from a durable objective, explicit boundaries and repeatable verification—not from removing governance.
