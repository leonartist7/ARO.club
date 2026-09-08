# ARO — Autonomous Workboard

> September 8 snapshot publication: see `ARO_CLOUD_HANDOFF.md` for the founder's default-branch publication request, fixed-SHA audit prompts and unresolved evidence gaps. Older release-permission wording is superseded only for this static snapshot. Founder visual certification, I0 gates and all runtime restrictions remain open.

**Status:** ACTIVE / COORDINATION MAP
**Version:** 0.1.0
**Last updated:** 2026-09-08
**Purpose:** make it safe to hand bounded ARO work to separate cloud or local tasks without relying on chat history.

## Authority and scope

This is a dispatch board, not an implementation specification. It summarizes what may be reviewed, prepared or implemented next; `AGENTS.md`, the Master Delivery Plan, the Build Playbook and the relevant package spec remain authoritative.

Use status documents to select a task, then read the package spec before changing code. A workboard row never converts **BLOCKED**, **SPEC-REQUIRED**, or founder-only work into an autonomous task.

## Source visibility rule

Cloud tasks only see the repository, branch and files made available to them. They cannot safely continue uncommitted local work. Before dispatching a cloud task, commit or otherwise make the current governing documents, package spec, assets and intended base branch accessible to that task.

Each implementation task gets one branch, one package, one PR and one verifier. Read-only review tasks may run in parallel; writing tasks must have exclusive file ownership.

## Current program truth

| Area | Current state | What this means for autonomous work |
|---|---|---|
| UX0 Opportunity Formation | IMPLEMENTED / CI VERIFIED / founder Preview/Production approval pending | Founder must review before merge/release; no cloud task can make that approval. |
| UX1 Personal Field, UX2 Seed Studio, UX3 Lived Moments | IMPLEMENTED / PARTIAL VERIFICATION, static/local only | Visual evidence and design review may proceed; they do not unlock product runtime. |
| I0 Isolated Infrastructure | IN-PROGRESS / GATES BLOCKED | Some evidence needs founder-owned provider access and decisions. |
| P1 Capability + Goal | SPEC-READY / BASELINE BLOCKED | Do not start runtime code until parent I0 and authenticated/RLS gates are verified. |
| P2 → P5 | SPEC-REQUIRED / dependency-blocked | Do not create speculative runtime implementation tasks. |
| Seasons, AR, Beacons, 3D city data, money expansion | EXPLORATORY | No autonomous implementation work. |

## Dispatch lanes

### Lane A — Visual quality evidence

**Eligible now after the visual work is available to the task.** These tasks are read-only and may run together.

| ID | Task | Output | Writes |
|---|---|---|---|
| A1 | Route and navigation audit | route-by-route dead-end/state findings for `/app`, `/app/world`, opportunity, commit, Circle, profile, create, Passport and settings | none |
| A2 | Responsive and accessibility audit | reproducible findings at 360/390/430/768/1440px, light/dark, keyboard and reduced-motion paths | none |
| A3 | Asset and visual-performance audit | image dimensions/weight/crop/loading recommendations and visual hierarchy findings | none |
| A4 | Product-flow critique | the three highest-value changes to make the participant loop feel like a Living Opportunity OS | none |

The lead combines A1–A4 and S1 into a proposed `ARO-FV-1` specification outside the tracked checkout. The lead has no repository write authority. No implementation task may be selected or scheduled until founder/product-design approval is recorded and the package becomes **SPEC-READY**. Use the complete bounded prompts in `ARO_CLOUD_HANDOFF.md`.

### Lane B — Bounded visual implementation

**Not eligible until FV-1 is SPEC-READY.** Work in this order:

1. **FV-1:** responsive, accessibility and image-evidence corrections.
2. **FV-2:** participant-loop continuity: `Home → World → detail → Commit → Circle`.
3. **FV-3:** creator/host proposal-preview continuity in Seed Studio.
4. **FV-4:** meaningful return loop: Insights, Passport and Library.
5. **FV-5:** static trust/settings/system states.
6. **FV-6:** one clearly synthetic Shipathon click-through.

FV-2 and FV-3 may be prepared in parallel as read-only design notes, but must not write shared routes or navigation concurrently. All FV work stays static/local unless a later semantic package explicitly says otherwise.

### Lane C — Governance and evidence hygiene

**Eligible now, read-only by default.** Run after a PR merges, before starting a new package, or on a weekly cadence.

- Compare `ARO_CURRENT_STATE.md`, `ARO_SPEC_INDEX.md`, `ARO_IMPLEMENTATION_STATUS.md`, the master plan and the relevant package spec for status drift.
- Confirm every claimed PASS links to a test, screenshot, log, query or deployment record.
- Identify uncommitted or unpublished package documents that a cloud task would not be able to see.
- Report inconsistencies; do not rewrite status history or upgrade a status without evidence.

### Lane D — Founder-only gates

These are reminders and checklists, not cloud implementation assignments.

- Review UX0 Preview and decide whether the Production release may occur.
- Confirm I0 Preview literal values match the approved staging project without exposing secrets.
- Approve Auth callback/recovery posture and resolve `aro.club` ownership/disposition.
- Approve any new FV package before its UI implementation begins.
- Approve all later money, AI authority, public visibility, privacy, Trust, location and category decisions.

## Explicitly blocked work

- P1 code, migrations, Auth, RLS or persistent capability/goal behavior.
- P2 intent/demand, P3 AI suggestions, P4 commitments/payments and P5 proof/outcomes.
- Real location, Google Maps-derived worlds, production 3D/Blender pipelines, AR, Seasons and Beacons.
- Any work that requires secrets, provider dashboard actions, payment keys or domain ownership outside the task's granted scope.

If a task reaches one of these boundaries, it must record the evidence, name the exact founder action required and stop.

## Task contract

Every scheduled or cloud task prompt must state:

1. **Task ID and lane.**
2. **Exact branch/base commit and package/spec files to read.**
3. **Read-only, documentation-only, or implementation authority.**
4. **Exclusive file ownership** when writing.
5. **Acceptance evidence** expected at the end.
6. **Non-goals and stop conditions.**
7. **Whether it may create a PR or only return a report.**

Use this shared opening in task prompts:

> Read `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_CURRENT_STATE.md`, `ARO_INFRASTRUCTURE.md`, `ARO_SPEC_INDEX.md`, `ARO_IMPLEMENTATION_STATUS.md`, `ARO_AUTONOMOUS_WORKBOARD.md`, `ARO_BUILD_PLAYBOOK.md`, `DECISIONS.md`, and the named package spec. Do not infer authority from this task alone. Preserve Tonguee production and quarantined `aro-platform`. Stop at founder-only gates. Use precise status vocabulary and return evidence, not assumptions.

## Ready-to-use task prompts

### A1 — Route audit

> Run Lane A1 only. Do not edit files. Review the named static ARO app routes in desktop and mobile layouts. Trace navigation from Home through World, opportunity detail, Commit, Circle, Profile, Create, Passport and Settings. Report broken or unclear transitions, misleading runtime-looking claims and the three most important route-flow improvements with screenshots or route/file evidence. Do not propose APIs, Auth, payments, AI, persistence, 3D/AR or data-model changes.

### A2 — Accessibility and responsive audit

> Run Lane A2 only. Do not edit files. Verify 360, 390, 430, 768 and 1440px in light and dark themes where supported. Check overflow, touch target size, keyboard order, visible focus, semantic labels, contrast, text scaling and reduced motion. Return reproducible findings ranked by user impact. Treat the app as a static visual prototype; do not upgrade status or implement fixes.

### A3 — Asset/performance audit

> Run Lane A3 only. Do not edit files. Inspect local image usage, dimensions, compression, crop behavior, loading priority and alt-text treatment across the static ARO routes. Recommend the smallest concrete improvements that preserve the warm editorial visual language. Do not introduce remote media, image APIs, generated icons, user uploads or dependencies.

### C1 — Documentation health check

> Run Lane C only. Do not edit source files, create PRs or broaden scope. Return proposed corrections only under the C1 contract in `ARO_CLOUD_HANDOFF.md`. Compare the current-state, spec index, implementation ledger, master plan, workboard and active package specs. Return a compact matrix of agreement, drift, unpublished work and founder actions. Never rewrite historical entries or call anything VERIFIED without evidence.

## Scheduling guidance

- Run A1–A4 once as a parallel review set whenever a visual batch is ready for critique.
- Run C1 after each merged package and weekly while multiple cloud tasks are active.
- Create a new standalone task for independent audits. Use a task attached to an existing conversation only when continuity with that exact decision history matters.
- Use an isolated worktree for any task that writes files; never let a scheduled task modify a founder's active local checkout.
- Test each prompt manually before scheduling it. Keep default sandbox permissions as narrow as possible.

## Completion and handoff format

Every task returns:

```text
Task ID / lane:
Authority read:
Base commit and branch:
Scope performed:
Evidence:
Files changed (or “none”):
Acceptance result:
Out-of-scope findings:
Founder action required:
Next eligible task:
```

The lead returns proposed status corrections only. A separately authorized documentation package may update the registry after review. Audit tasks never write shared status files.

## AUTO0 dispatcher implementation

Use `ARO_AUTONOMY.md` and `tools/autonomy/README.md` to provision worker paths and validate report bundles. ChatGPT cloud workers may consume verified GitHub browser captures when their own browser runtime is unavailable; they must identify coverage gaps and may not promote source inspection into browser acceptance. The collector is not an AI worker or an audit-completion signal. Schedules and complete report retrieval remain coordinator-verified.
