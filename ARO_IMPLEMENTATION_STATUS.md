# ARO — Implementation Status Ledger

> **2026-10-01 Circle Builder Phase 1 review repair:** Preparation #99 is merged at `b9a6347fa911188786942ec06f9a4d16931272be`. Foundation [#100](https://github.com/leonartist7/ARO.club/pull/100) remains unmerged. CB1-F1 v1.0.2 is SPEC-READY for retaining destination-compatible category answers and their touched markers; the earlier Skills/Music switch incorrectly discarded experienceLevel. Source 094818d passes 220 tests (24 builder cases) and all five CI jobs, but this newly reproduced review finding reopens package acceptance. Next: commit three preservation regressions and the narrow reducer correction, run fresh exact-head CI and merge #100 on current main. Guide-key correction and reviewed preparation are preserved; UI/artwork/privacy/design/performance/live gates remain open.

> **2026-10-01 CB0 preparation:** Circle Builder flow and the founder's three category mascots are specified as a documentation draft on `codex/circle-builder-preparation-20261001`. **SPEC-REQUIRED; no runtime implementation, tests or release claimed.** The existing Create remains Learn/Share/Gather examples. See `specs/ARO-CB0-CIRCLE-BUILDER-PREPARATION.md` and `docs/circle-builder/IMPLEMENTATION-CHECKLIST.md`; CB1 assets/spec/privacy/Trust/performance preparation and later live dependencies remain open.

> **2026-09-29 RB17:** The founder’s six reference images drive a scoped Home/app first-journey presentation package on merged RB15 `28f0170` (PR #92). Website story order, app Home action hierarchy and Create imagery/navigation are IMPLEMENTED / PARTIAL VERIFICATION. Local lint, types, 190 tests, build and bounded production browser checks pass; one broad development E2E `/choose-role` timing failure remains recorded. No live account, map, supply or money behavior is enabled. See `specs/ARO-RB17-REFERENCE-JOURNEY.md`, `artifacts/ARO-RB17/VERIFICATION.md` and `docs/rebrand/PRODUCTION-PATH-20260929.md`. Independent reviews and exact-head CI remain open.

> **2026-09-29 AUTH1:** Google OAuth initiation and enabled account controls are IMPLEMENTED / LOCAL VERIFIED on `codex/aro-auth-production-20260929` from RB15 `28f0170`. Existing Supabase advertises Google/email and the authorize endpoint reaches Google. Hosted signup/recovery/login, production environment, callback completion and independent security review remain pending; see `specs/ARO-AUTH1-ACCOUNT-ENTRY.md` and `artifacts/ARO-AUTH1/VERIFICATION.md`.

> **2026-09-29 RB16:** English/light visual coherence is IMPLEMENTED / PARTIAL VERIFICATION on `codex/rb16-visual-coherence-20260929`, scoped directly to RB15 `a0cef112`. Create, app Home, opportunity list/detail and shared headings/preferences receive bounded presentation corrections. Before/after renders and local checks are in `artifacts/ARO-RB16/VERIFICATION.md`; exact-head hosted CI, CodeRabbit and independent release decisions remain required. No main merge or live transaction enablement.

> **RB15 hosted reconciliation — 2026-09-29:** RB15 exact-head hosted Quality `36593625126` and isolated-database `36593625117` succeeded on `a0cef112380f34f9c47c2a7e160fbbe4561fcf2e`. The platform passed after one failed-job rerun; the intermittent document chooser root cause remains unresolved. Independent privacy/Trust/design/accessibility, protected merge and release gates remain open.

> **2026-09-29 RB15 website integration:** RB13 visual source, RB14 controls and the compact footer are combined on `codex/rb15-main-integration-20260929`. The Circle's unsent-preview copy meets the 16px browser contract and its return target meets 44px; F6 acceptance checks the already-approved full-image fit. Local lint, type-check, 189 tests, both builds and bounded F4/F6 browser matrices pass. Status is IMPLEMENTED / PARTIAL VERIFICATION; hosted checks, independent reviews, specialist gates and `main` merge remain open. Evidence: `artifacts/ARO-RB15/VERIFICATION.md`.

> **2026-09-29 RB14 compact preference controls:** The ordinary ARO experience now uses one sun/moon theme toggle plus one language dropdown instead of the gear popover and Light/Dark/System choice cards. Public mobile/desktop headers, onboarding, app Settings and the app shell share the same controls; the app shell hides only its non-actionable search/notification preview icons below `sm` to protect narrow-phone geometry. Focused tests and responsive browser verification are updated; final-head hosted checks remain required. Status is **IMPLEMENTED / PARTIAL VERIFICATION**, unmerged and unreleased. See `specs/ARO-RB14-THEME-LANGUAGE-CONTROLS.md` and `artifacts/ARO-RB14/VERIFICATION.md`.

> **2026-09-29 RB13 integrated visual candidate:** Latest PR #84 onboarding fixes and preserved source plan are combined with RB11 English/light presentation and RB12 public redesign by normal ancestry. Home, onboarding, Explore, app Home and opportunity previews received focused visual corrections. Production-build evidence covers 16 screenshots, a 40-route browser sweep, ordinary Spanish/dark and French/light regression, build/lint/type and unit tests. Status is **IMPLEMENTED / PARTIAL VERIFICATION** on a review branch; no `main` merge or release is claimed. See `specs/ARO-RB13-INTEGRATED-VISUAL-CANDIDATE.md` and `artifacts/ARO-RB13/VERIFICATION.md`.

> **RB11 branch (2026-09-28):** English/light release-scope presentation is IMPLEMENTED / PARTIAL VERIFICATION on a separate stacked branch. Hosted mobile/desktop screenshots and machine results are retained at `artifacts/ARO-RB11/`; final-head checks and reviews remain gates. No merge, native binary or store submission is claimed; see `specs/ARO-RB11-ENGLISH-LIGHT-RELEASE-SCOPE.md` and `docs/rebrand/STORE-READINESS-20260928.md`.

> **RB10 branch update (2026-09-28):** Signed-out Login, Signup and Forgot Password now use the ARO promise and EN/FR/ES copy, with readable dark mode and truthful disabled preview forms. Six production-browser scenarios pass; live Auth remains under its separate gates. RB10 is IMPLEMENTED / PARTIAL VERIFICATION on a stacked branch, not merged or released. See `artifacts/ARO-RB10/VERIFICATION.md` and the [current rebrand ledger](docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md).

> **RB9 branch update (2026-09-28):** A controlled orange-led share image now renders at `/opengraph-image`, and OpenGraph/Twitter tags advertise its 1200×630 PNG. Local production response and visual evidence pass. RB9 is IMPLEMENTED / PARTIAL VERIFICATION on a stacked branch, not merged or released. See `artifacts/ARO-RB9/VERIFICATION.md`.

> **RB8 branch update (2026-09-28):** Global route loading and page error states now use the approved brand and EN/FR/ES copy, with accessible status/retry/Home paths. Scoped visual fixtures show 320–1440px light/dark compositions and were removed before final build. RB8 is IMPLEMENTED / PARTIAL VERIFICATION on a stacked branch, not merged or released. See `artifacts/ARO-RB8/VERIFICATION.md`.

> **RB7 branch update (2026-09-28):** Public/onboarding theme and language controls now live in a compact Preferences entry; mobile public navigation has one scrollable menu without the duplicate bottom bar. App Settings has working local language and Light/Dark/System controls, and shared app chrome translates with them. Build, lint, type-check, focused tests and four production-browser scenarios pass. RB7 is IMPLEMENTED / PARTIAL VERIFICATION on a stacked branch, not merged or released. See `artifacts/ARO-RB7/VERIFICATION.md`.

> **RB6 branch update (2026-09-28):** Public `/leaderboard` and `/bookings` now have localized, truthful preview states in a scoped branch. Seed rankings and an unsupported checkout promise no longer render on those routes. Build/lint/type and six production-browser checks pass; protected future routes, independent review, merge and release remain open. See `artifacts/ARO-RB6/VERIFICATION.md`.

> **RB5 branch update (2026-09-28):** Public About, How it Works, For Teachers, FAQ and Contact have provisional approved-story implementations. The footer has working destinations and no placeholder social links. Contact saves an on-device draft without sending it. The package is **SPEC-REQUIRED / independent privacy review pending** because local draft retention and deletion need acceptance; it cannot merge or release yet. Earlier build/lint/type, focused tests and six production-browser route checks passed for the pre-review commit; refreshed new-head evidence is pending. See `specs/ARO-RB5-PUBLIC-STORY-HELP.md` and `artifacts/ARO-RB5/VERIFICATION.md`.

> **RB4 branch update:** Legacy public fixture recovery is IMPLEMENTED / PARTIAL VERIFICATION on a separate stacked branch. Direct fixture URLs remain navigable but no longer render old invented host/review/booking claims. This does not certify authenticated legacy or live supply routes. See `artifacts/ARO-RB4/VERIFICATION.md`.

> **RB3 branch update:** Public promise/task paths, truthful Explore empty state, app first action and removal of fictional progress are IMPLEMENTED / PARTIAL VERIFICATION. The branch is unmerged and not released; legacy fixture deep links, remaining surfaces and full accessibility/release review are open. See `artifacts/ARO-RB3/VERIFICATION.md`.

> **RB2 branch update:** The three-scene public onboarding preview is IMPLEMENTED / PARTIAL VERIFICATION on `codex/rb2-onboarding-preview-20260927`. It is not merged, live onboarding, VERIFIED or SHIPPED. Browser path screenshots and test evidence are in `artifacts/ARO-RB2/VERIFICATION.md`; privacy/eligibility review still gates live data collection.

> **RB1 branch update:** Shared orange foundation is IMPLEMENTED / PARTIAL VERIFICATION on `codex/rb1-orange-foundation-20260927`; it is not merged, VERIFIED or SHIPPED. Build/lint/unit and sampled browser evidence are in `artifacts/ARO-RB1/VERIFICATION.md`. RB2 preview remains the next vertical slice.

> **2026-09-28 RB0:** Orange-led direction and route/asset baseline are IMPLEMENTED / PARTIAL VERIFICATION on the RB0 branch. RB2 preview exists on its separate branch but cannot merge before independent privacy/security review and category-limit correction. Live age/profile/Auth integration remains SPEC-REQUIRED and separately gated. See ADR-031 and `docs/rebrand/BASELINE-20260927.md`.

> **2026-09-27 R2:** The rebrand is **IMPLEMENTED / MERGED** to GitHub `main` as `dc73daa` via PR #69. Tests, focused browser checks, and the founder-delegated visual review passed. This does not claim production release or full-route accessibility acceptance. See [spec](specs/ARO-R2-YELLOW-BRAND.md) and [evidence](artifacts/ARO-R2/VERIFICATION.md).

> **2026-09-21 reconciliation:** See [latest-work record](docs/merge-reconciliation-20260921/README.md) and the live controller-owned ledger on `codex/aro-overnight-controller-20260916`. N1 is merged at b44c82f; older Vite/infrastructure/ownership statements below are dated history where superseded. Hosted/human/F7/P1 and release gates remain open. MERGE1 only reconciles tooling and evidence.


> **2026-09-21 production extension:** The founder authorized production readiness and release under [N1 rollout v1.2](specs/ARO-N1-VERCEL-ROLLOUT.md). Initial public origin is aro-club.vercel.app. Production auth configuration is implemented and locally verified but remains disabled pending a separate backend, verified SMTP/hosted auth and security review. Staging callback URLs are repaired. See [provider evidence](artifacts/ARO-N1/PRODUCTION-READINESS.md).

> **2026-09-24 FV-1 F7 v0.2.4 approved documentation amendment:** Founder approval is persisted at controller commit `c145ebd52395a9e8a0104cdaa5ddd78a4672ff35`. PR #47 now records the isolated Next production-build launch/environment contract and remains documentation-only on MERGE1 `main` `f37dc084d7172415f581a41e90d2edd9ba3738b9`. Its normal merge commit C will be `F7_APPROVED_SPEC_SHA`. F1–F6 remain accepted predecessors; PR #48 / `codex/fv1-f7-acceptance-evidence` remains exclusively owned with immutable F6 `F7_TASK_BASE_SHA` `79603ae1af60a30f86c105e0f2a4d841043eb727`. F7 is **BLOCKED** pending C, exact-head reviewed Next-runtime reconciliation, and lockfile-managed Chromium 151.0.7922.34 revision 1234 installation plus headless launch. The 8272CL exception and every frozen §20 network/budget/privacy/human/release gate remain unchanged.

> September 8 snapshot publication: see `ARO_CLOUD_HANDOFF.md` for the founder's default-branch publication request, fixed-SHA audit prompts and unresolved evidence gaps. Older release-permission wording is superseded only for this static snapshot. Founder visual certification, I0 gates and all runtime restrictions remain open.

> **2026-09-03 execution handoff:** I0.2 merged through PR #28 at `5976928`.
> Its isolated database and Quality workflows passed, including 81 SQL
> assertions, synthetic Auth/API/Storage/recovery/reset exercises and the
> authenticated responsive browser matrix. I0.2 and Q0 are **IMPLEMENTED / CI
> VERIFIED** in the disposable lane. GitHub `main` protection now requires the
> three stable CI checks. Isolated hosted capacity now exists; parent I0's
> remaining gates and I0.2's independent-review follow-up remain explicit. UX0
> is SPEC-READY as a synthetic frontend-only prototype and does not unlock P1.

> **2026-09-05 UX0 update:** the package branch implements the full synthetic
> formation interaction and passes local unit/browser/responsive/accessibility/
> network/performance evidence. All required PR #35 checks are green, so nine of
> eleven rows pass; founder Preview/Production release approval remains pending.

> **Status as of September 5, 2026.**
>
> This file answers one question unambiguously: **what exists, what has been verified, what is blocked, and what comes next?**
>
> Update this ledger in every package PR that changes program status. Do not rely on chat history for completion state. Use `ARO_CURRENT_STATE.md` for the concise current strategic snapshot and `ARO_CHANGELOG.md` for evolution history.

---

## 1. Executive status

### Program state

**ARO R1 is shipped; I0.2, Q0 and UX0 CI gates pass; UX0 is implemented pending
Preview/Production release approval; UX1–UX3 are implemented static visual
packages pending their visual evidence pass; P1 remains pre-implementation at
its parent-I0 gate.**

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

**ARO-UX0 — Opportunity Formation Prototype** is **IMPLEMENTED / CI VERIFIED /
FOUNDER PREVIEW/PRODUCTION APPROVAL PENDING**. Its exact 27-combination fixture interaction
joins what a person wants, what they can bring, and people · place · time into
one immediately updating, explainable prototype possibility. Nine of eleven
criteria pass. Founder Preview/Production approval remains; it adds no backend
semantics and cannot waive any I0/P1 gate.

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
| UX0 — opportunity formation frontend prototype | **IMPLEMENTED / CI VERIFIED / FOUNDER PREVIEW/PRODUCTION APPROVAL PENDING** | deterministic 27-combination field, local state machine, translated result/provenance, original imagery and fail-closed source mode | `artifacts/ARO-UX0/VERIFICATION.md`; 73 unit tests, focused browser matrix, zero-Supabase audit and required PR #35 checks pass | founder Preview + Production release decision |
| UX1 — Personal Field visual prototype | **IMPLEMENTED / PARTIAL VERIFICATION** | local-only Profile redesign around static wants, contributions, context and boundaries | `specs/ARO-UX1-PERSONAL-FIELD-VISUAL-PROTOTYPE.md`; live interaction, lint/build pass | complete light/dark responsive evidence; it does not implement P1 |
| UX2 — Seed Studio visual prototype | **IMPLEMENTED / PARTIAL VERIFICATION** | local-only Create redesign around static Learn/Share/Gather seed modes | `specs/ARO-UX2-SEED-STUDIO-VISUAL-PROTOTYPE.md`; live interaction, lint/build pass | complete visual-track release review; it does not implement P2/P3 |
| UX3 — Lived Moments asset prototype | **IMPLEMENTED / PARTIAL VERIFICATION** | original local portrait/persona, opportunity scenes, Life Map, and season cover for static ARO surfaces | `specs/ARO-UX3-LIVED-MOMENTS-ASSET-PROTOTYPE.md`; route/browser interaction, static scope audit, lint/build pass | complete responsive/image-performance review; it does not implement media, identity, inventory, or runtime behavior |
| ARO Seasons / real-life progression | **EXPLORATORY / SPEC-REQUIRED** | `ARO_SEASONS_AR.md` | strategy preserved | wait for reliable P5 Proof/Passport base, then specify lightweight progression |
| ARO AR / Beacons / Trails / Expeditions | **EXPLORATORY** | `ARO_SEASONS_AR.md` | strategy preserved | prove place/privacy/safety model before AR |
| P0 — Director reset | **VERIFIED** | ARO-first operating authority and migration direction | `ARO_P0_AUDIT.md` | none |
| P0.1 — Director Pack completion | **VERIFIED** | design, trust/safety, money, growth, Shipathon, decisions, executable playbook | governance-only scope preserved | none |
| SEC0 — secret hygiene | **VERIFIED** after finalization PR merge | branch `agent/aro-sec0-finalize`; `.env` removed; ignore rules hardened; founder decision recorded | `ARO_SEC0_REPORT.md` | keep deployment/local configuration outside Git |
| R1 — repository separation + platform rebrand | **SHIPPED** | independent ARO.club repository and Vercel project, ARO shell/home/metadata, preserved Tonguee vertical | `specs/ARO-R1-FULL-REBRAND.md`, `artifacts/ARO-R1/VERIFICATION.md`, merged PR #22 | monitor production; keep backend fail-closed until approved |
| I0 — isolated infrastructure | **IN-PROGRESS / GATES BLOCKED** | active $0 isolated staging target, CI reset equivalence, both migrations applied, hosted 21+60 SQL assertions pass, active branch protection; later status observations record Preview-only variable scopes and READY deployment | `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` v1.1.0, `artifacts/ARO-I0/VERIFICATION.md`; current snapshot in `ARO_INFRASTRUCTURE.md` | verify Preview values in a dedicated I0 package; complete Auth/recovery and domain gates |
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

`M0 governance → I0 isolated capacity → Q0 reliability → UX0 synthetic frontend prototype (Preview/Production release approval pending) → UX1–UX3 / FV static visual continuation (partial verification; no runtime unlock) → P1 → N1 platform decision → X1 experience foundation → P2 → A1 AI foundation → P3 → P4 → P5 → V1 release audit`

UX0 may proceed while the remaining parent-I0 gates are deferred, but it does
not satisfy them or authorize P1.

Do not parallelize downstream packages in a way that invents schema or assumptions P1/P2 are supposed to establish.

Do not move Seasons/AR into runtime simply because the strategic direction is now documented. The fastest path is not maximum simultaneous coding. It is **maximum parallelism inside a stable specification boundary**.

## 2026-09-08 — H0 publication handoff

The existing local prototype and supporting plans are packaged under `specs/ARO-H0-CLOUD-AUDIT-HANDOFF.md`. Fresh delivery checks and their limits are in `artifacts/ARO-H0/VERIFICATION.md`. Use `ARO_CLOUD_HANDOFF.md` for task dispatch; do not infer complete visual acceptance from smoke tests.

## AUTO0 — autonomous execution foundation

IMPLEMENTED / VERIFICATION IN PROGRESS. Repository tooling only; no product runtime, schema, dependency or paid model API changes. Specification: `specs/ARO-AUTO0-AUTONOMY-FOUNDATION.md`; execution map: `ARO_AUTONOMY.md`; evidence: `artifacts/ARO-AUTO0/VERIFICATION.md`. Cloud schedules are independently verified through the cloud coordinator.

## 2026-09-28 — RB7 cloud continuation

RB7 remains IMPLEMENTED / PARTIAL VERIFICATION on PR #79. Hosted diagnostic
`c39d0f7` confirmed footer interception of the legacy onboarding Skip action.
A presentation-only intrinsic-height repair and short-viewport/keyboard
Preferences improvements are prepared with local build/lint/type and 180 unit
tests passing (3 existing skips). Hosted browser/visual verification is pending.
See `artifacts/ARO-RB7/VERIFICATION.md`. No Auth, persistence, Trust, payment,
RB2 independent-review, F7 or release gate changed.


### 2026-09-28 — Hosted rebrand regression repaired

RB7's fixed-height onboarding cards were overlapped by the public footer. The bounded minimum-height repair and quiet-preferences accessibility polish are propagated through the existing RB7–RB10 stack. RB7 source bbd1b2b passes Quality 36407355886 and platform 36407355888; RB10 source add2a41 passes Quality 36407547820 and platform 36407547856. Original assertions, Auth/Trust/RLS, privacy/eligibility, payment and F7 boundaries remain intact. Retained screenshots and machine results are in artifacts/ARO-RB7/cloud-continuation. The implementation ledger records exact source/evidence provenance and final-HEAD check requirements. Status remains IMPLEMENTED / PARTIAL VERIFICATION, unmerged; RB0 conversations and independent RB2 review remain gates.


### 2026-09-28 — Reviewed RB6 propagated through RB7–RB10

Reconciled RB6 8799e78 with cloud RB7–RB10 using normal merge ancestry, preserving both review fixes and cloud evidence. Local navigation assertions now match the incoming reviewed World exit. New-head hosted checks remain required. RB2 independent privacy/security review and RB5 SPEC-REQUIRED contact-draft retention/deletion review are blocking; existing conversations stay open. No main merge or release. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — Corrected RB6 handoff incorporated

RB6 95ec421 supersedes 8799e78 and includes the upstream navigation-test repair. Its exact test versions are propagated through RB7–RB10 with cloud runtime/evidence preserved. The previously requested upstream assertion repair is satisfied; hosted reserved teacher-route/provenance failures and independent RB2/RB5 review gates remain. See the rebrand implementation ledger for exact heads and check provenance.


### 2026-09-28 — RB6 5e22dcc review-copy update propagated

RB7–RB10 now incorporate exact RB6 5e22dcc, including distinct RB3 formation-preview copy and refreshed owner evidence. Cloud work and normal ancestry are preserved; new-head hosted checks must confirm the strict-text repair. The teacher-route collision is unchanged. RB5 remains SPEC-REQUIRED pending independent retention/deletion privacy review; RB2 independent review and conversations remain open. No approval, protected merge or release. See the rebrand implementation ledger.


### 2026-09-28 — RB6 1c4c2a1 protected-route fix propagated

RB7–RB10 incorporate exact RB6 1c4c2a1. Incoming RB4 exemptions preserve the existing Auth path for /teacher/dashboard and /teacher/application; the earlier collision now has a source repair, pending new-head hosted confirmation. Cloud work and evidence are preserved. RB5 remains SPEC-REQUIRED pending independent contact-draft retention/deletion privacy review; RB2 and review conversations remain open. No merge approval or release. See the rebrand implementation ledger.


### 2026-09-28 — Hosted CI and fresh independent review checkpoint

Confirmed RB3–RB6, RB8 and RB10 source heads pass hosted Quality and Isolated database. RB7 Quality (/choose-role content check) and RB9 platform (1440px dark document chooser) remain red; exact heads/runs are in docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md. Founder reports clean/pushed lower worktrees and fresh independent Codex re-reviews requested for #72–#78/#84. Requests are not approvals: RB2 specialist privacy/security and RB5 SPEC-REQUIRED retention/deletion privacy gates remain open. No protected merge or release.


### 2026-09-28 — RB6 2ea1fed and local Manrope propagated

RB7–RB10 incorporate exact RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main 721b2b7 / PR #83 local Manrope. Normal merge ancestry preserves cloud work and F7 evidence. The Header resolution retains compact real account destinations and RB7's future-only link omissions. Final local build/lint/types pass; 185 tests pass with 3 existing skips. Production font HTTP/hash checks pass; fresh visual recheck is blocked by invalid Chromium downloads and remains pending with new-head hosted CI. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft-retention/privacy, independent review and release gates remain open. PR #84 stays with its owner and needs reconciliation onto the latest RB10; its earlier green checks are not integration approval. Exact sources, checks and limits: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — Final RB6 8a8e5e2 handoff

RB7–RB10 now incorporate exact RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`, superseding 2ea1fed. Only RB6 verifier waits and owner screenshots/evidence changed; tested runtime, local Manrope and cloud work are preserved. Fresh hosted checks are running, not accepted. Prior teacher-document chooser failures are not declared fixed. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent-review and release gates remain open; PR #84 needs owner reconciliation on latest RB10. Details and exact source/check provenance: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 ff1c7b6 review repairs propagated

RB7–RB10 incorporate exact RB6 `ff1c7b65cc23958b66754f0d75faffae736a7e7d` with normal conflict-free ancestry. RB1/RB6 presentation contracts, corrected RB2 dependency wording and RB3 composition focus-ring/capture repairs are preserved; cloud work and branch ownership remain intact. All four previous cloud heads passed both hosted workflows; fresh merge-head CI remains required. RB5 stays SPEC-REQUIRED and unmerged pending independent on-device Contact draft retention/deletion privacy approval. RB2 privacy/eligibility, RB4 Trust, independent review and release gates remain open. No F7 evidence change or self-approval. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md for exact sources, test evidence and limitations.


### 2026-09-28 — RB6 13e2571 reconciled; PR84 owner plan

RB7–RB10 incorporate exact RB6 `13e257107b5726e911210a1eb8048ce3d42143ac`. Shell localization conflict is reconciled using the incoming dictionary/44px target with cloud navigation behavior preserved; onboarding short-screen and host-boundary repairs propagate intact. Local webpack build/lint/types and 187 tests pass (3 existing skips). RB6 hosted Quality fails an ambiguous Aperçus selector already scoped to a heading in cloud; its separate platform chooser failure remains open. Fresh cloud-head CI is pending. PR #84 remains untouched; docs/rebrand/PR84-RECONCILIATION-PLAN-20260928.md gives its owner the ledger-conflict and source-preservation plan. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED draft privacy, independent review and release gates remain OPEN. Exact sources and limits: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 327c681 selector correction incorporated

RB7–RB10 now include exact RB6 `327c6812f390a726b885dfda06fc9524d66a6cb2`. The test-only selector repair matches the already-preserved cloud assertion; no runtime/test behavior change. Previous local 187-test/build/lint/type evidence remains applicable, while exact-head hosted checks remain pending. PR #84 owner plan is updated to this base; its branch remains untouched. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED contact privacy, independent review and release gates stay OPEN. See the rebrand implementation ledger for exact heads and historical failures.


### 2026-09-28 — RB6 9eb4e15 preview repairs propagated

RB7–RB10 incorporate exact RB6 `9eb4e15d2435eb08787a0b8db10ae601987f5053` with conflict-free normal ancestry. Adult language-practice art, early nonpersistence disclosure, preference CTA flow and the required-CI six-path RB2 verifier propagate without losing cloud work. Pinned WebP reproduction passes. Owner's Windows full E2E OOM is recorded as a failed run; cloud fresh browser acceptance remains unavailable. Prior RB10 platform rerun remained red at the document retry chooser. PR #84 is now 91a3ceb on old RB10 and stays with its owner for another reconciliation. All privacy/Trust/contact-retention, independent-review and release gates remain OPEN. Exact checks and sources: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 1184639 mobile preference repair propagated

RB7–RB10 incorporate exact RB6 `1184639f47eeaecebcb6a5b754ad7f7974d9d144` with conflict-free ancestry. Bounded scrollable mobile choices, sticky CTA and stronger viewport/separation/focus assertions propagate without losing cloud work. Corrected provenance: old pottery WebPs remain public but unused, not removed. Prior RB7/RB9/RB10/#84 heads pass both hosted workflows; RB8's document-chooser failure stays recorded. Fresh merge-head checks and independent privacy/Trust/contact-retention/review/release gates remain required. PR #84 stays with its owner for the next reconciliation. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md for exact sources, results and limits.
