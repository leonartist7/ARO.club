# ARO — Build Playbook

## Operating rule

The director writes product, data, security, economic, and design specifications. An implementation agent executes one approved package at a time. Read `AGENTS.md` first. An unresolved security, money, privacy, trust, or product decision stops for director review.

## P0 — Director Reset (this package)

**Goal:** make ARO the unambiguous source of product authority while preserving Tonguee and its security discipline.

**Allowed changes:** governance documents only: `AGENTS.md` and the ARO Director Pack.

**Forbidden changes:** product UI, routes, database/schema/RLS, auth, payments, dependencies, branding assets, and data migration.

**Done when:** vision, V1 scope, architecture, data principles, opportunity lifecycle, migration map, and future work order are documented; `AGENTS.md` points to them and preserves Trust/security gates.

## Future packages and gates

| Package | Objective | Prerequisites / director gate |
|---|---|---|
| ARO-P1 | Profile, capability, and learning-goal foundation | approved UX + data minimization/RLS spec |
| ARO-P2 | Opt-in intent signal | approved data model, privacy notice, retention, RLS, abuse/safety review |
| ARO-P3 | Language-vertical opportunity suggestions | P1/P2, explainability, human-approval UX |
| ARO-P4 | Commitment and viability testing | cancellation, notifications, support, and payment/security specs where money is involved |
| ARO-P5 | Outcome/Proof loop | source-of-truth, dispute, moderation, retention policy |
| ARO-P6 | Adjacent vertical pilot | category-specific Trust, operations, economics spec |

## Legacy Tonguee work

`BUILD_PLAYBOOK.md` remains a historical/vertical reference. Do not execute its phases automatically. A director must map a task into an ARO package or explicitly authorize it as Tonguee maintenance.

## Required delivery evidence

- Acceptance criteria checked one by one.
- Build, lint, and relevant unit/E2E tests.
- Diff audit proving only authorized files changed.
- Screenshots for user-facing work where a browser is available.
- Director-review request before merge for security, privacy, Trust, schema, or money work.
