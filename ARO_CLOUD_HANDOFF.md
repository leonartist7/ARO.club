# ARO cloud audit handoff

Date: 2026-09-08. Package: ARO-H0, snapshot publication and audit dispatch only.

## Publication authority and limits

The founder requested: “ensure you push all to master github so the agents got all the info necessary and we are working on a clean up to date version”. GitHub's default branch is `main`, not `master`. This authorizes publishing the existing static prototype and supporting documents through the normal reviewed PR process. It is not a completed founder visual review, approval of FV-1, certification of UX1–UX3, or permission to implement runtime work. Older statements that snapshot publication is awaiting permission are superseded only for this publication; outstanding design and infrastructure gates remain open.

This package collects the previously local work without adding runtime APIs, schemas or dependencies. Wider `/app` scaffolding has incomplete package attribution and verification. Publishing it preserves an auditable baseline, not retrospective feature approval. Reports below must distinguish observed facts, historical reports, assumptions and recommendations.

## Dispatcher contract

After merge, resolve `origin/main` once and give every task the same full immutable `AUDIT_SHA`, an isolated `CHECKOUT_ROOT`, and a separate `AUDIT_OUTPUT_ROOT` outside the tracked checkout. Verify the checkout's HEAD equals that SHA and all required input files exist. A local commit or cached remote-tracking ref alone does not establish remote availability. Stop on missing inputs, differing revisions, credentials or a required human decision. Never edit the founder's checkout. No schedules are created by this package.

Repository: `https://github.com/leonartist7/ARO.club`. Source branch for publication: `codex/aro-cloud-audit-handoff`. Use the merged `main` SHA, not this moving branch, for dispatch. Record the actual SHA in every report and evidence filename manifest.

All tasks read in order: AGENTS.md; ARO_MASTER_DELIVERY_PLAN.md; ARO_CURRENT_STATE.md; ARO_INFRASTRUCTURE.md; ARO_SPEC_INDEX.md; ARO_IMPLEMENTATION_STATUS.md; ARO_AUTONOMOUS_WORKBOARD.md; ARO_BUILD_PLAYBOOK.md; DECISIONS.md; ARO_FRONTEND_VISUAL_CONTINUATION_PLAN.md; specs/ARO-UX0-OPPORTUNITY-FORMATION-PROTOTYPE.md; specs/ARO-UX1-PERSONAL-FIELD-VISUAL-PROTOTYPE.md; specs/ARO-UX2-SEED-STUDIO-VISUAL-PROTOTYPE.md; specs/ARO-UX3-LIVED-MOMENTS-ASSET-PROTOTYPE.md; then task-specific inputs. AGENTS and narrower package specifications govern; strategy and mockups do not confer implementation authority.

Minimum setup for A1–A3 in an isolated workspace: Node 24; `npm ci`; `npm run lint -- --max-warnings=0`; `npm test`; `npm run build`; `npx playwright install --with-deps chromium`; `npm run test:e2e`. Inspect scripts first. Run a unique loopback server/port if another server exists, setting E2E_BASE accordingly. Build/browser files are disposable evidence, never source modifications. A4, S1, lead and C1 do not require application dependencies by default.

Minimum access: read repository and public research sources, dependency registry and browser binaries where needed. No provider dashboards, secrets, production databases, deploy permissions, signing credentials, Git push permissions or messaging permissions. Do not run authenticated Auth/provider tests as part of these audits.

## Current gates and known audit findings

- I0 remains blocked on literal Preview target-value matching, Auth/callback/recovery posture, domain ownership/disposition and required independent baseline review. Scope-name inspection and disposable CI success do not close those gates.
- P1 remains SPEC-READY / BASELINE BLOCKED. P2–P5, payments, AI, real location, 3D maps, AR, Seasons and Beacons remain ineligible for autonomous implementation.
- UX0 CI evidence exists; founder visual certification is still outstanding. UX1–UX3 remain IMPLEMENTED / PARTIAL VERIFICATION. Historical PASS entries must be corroborated, not promoted by this publication.
- The local app contains synthetic people, prices and commitment states; it is not a live marketplace. Inert notification/settings controls, invalid-ID fallback, Create/Close behavior and capacity copy need A1/A4 classification. No real reservation, verification or payment can be inferred from fixture text.
- The actual commit route is `/app/opportunities/:id/commit`. Wider Home/World/opportunity/Circle/Insights/Passport/Library/Settings scaffolding is not fully specified by UX1. Navigation doctrine versus current tabs is an unresolved design decision for FV-1.
- Nine new PNGs total 20,369,032 bytes. A3 must establish delivery budgets before recommending optimization. Browser smoke is not full accessibility or performance certification.
- ARO_INFRASTRUCTURE's September 3 provider observations and older I0/Q0 evidence are historical. Do not interpret their recorded commit as today's remote main or treat old blocked rows as newly tested results.
- DECISIONS ADR-024 must be read with ADR-026's later narrowed target. Legacy DESIGN_EXECUTION_PLAN.md, PROJECT_MASTER_PLAN.md and UI_UX_ENHANCEMENT_COMPLETE.md are historical, not ARO implementation authority.
- Build Playbook phase outlines are not executable P1–P6 specifications. Full UX1–UX3 responsive/performance evidence and reconciled acceptance checklists remain audit work.
- Shipaton drafts and metrics are planning material, not submitted entries, qualifying revenue, account readiness or approved SDK packages. “its the first time” establishes first-release intent only; accounts, devices, Mac access, age/residence and store eligibility remain unknown.

## Public launch baseline for S1 to recheck

Official rules: https://revenuecat-shipaton-2026.devpost.com/rules . September 8 review found July 31, 2026 08:00 PDT through September 30, 2026 23:45 PDT; organizer guide wording about August 1 differs. Apply official rule precedence and record discrepancies. Standard entries require a first eligible public store release in the submission window and the specified RevenueCat purchase/Ads integration. Web-only history does not itself disqualify a first store release. NextGen has distinct student/open-source/demo eligibility and store exceptions; do not apply standard store requirements to it indiscriminately.

Submission guide: https://www.shipaton.com/blog/how-to-submit-your-app-for-shipaton . Recheck video, artwork, accessible premium features, Project ID, submission completion and judging access requirements. Awards require real category-specific evidence; draft plans are not evidence of integrations or campaigns.

Google: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en-GB . For applicable personal accounts created after November 13, 2023, production access requires at least 12 testers continuously opted in for 14 days followed by an application/review. Production-access review and app review are separate. A September 8 testing start reaches 14 days on September 22; that does not guarantee approval by the competition deadline. Launch feasibility is separate from cloud audit readiness.

## Copy-paste audit prompts

Each prompt below incorporates the dispatcher contract and read order above. Supply actual paths and SHA when dispatching. If they are omitted, stop and request them. Each task may return its report in the task response and save evidence only to its own named directory under AUDIT_OUTPUT_ROOT. Source write authority is NONE. No commits, branches, PRs, deployments, provider changes, scheduled tasks, secrets, external messages or feature implementation. A1–A4 and S1 may run independently at the same SHA; their output directories do not overlap.

### A1 — route and navigation audit

Run A1 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, src/lib/routes.jsx, src/components/app, src/pages/App*.jsx, src/data/aroApp.js and existing UX0 evidence. Scope: trace Home → World → detail → Commit → Circle, Create, Profile, Express, Passport, Library, Insights and Settings; test back/forward, direct entry and invalid IDs. Distinguish static limitations from defects against adopted specifications. Evidence: route inventory, reproducible steps, source locations, screenshots and console/network failures, all keyed to AUDIT_SHA. Output: AUDIT_OUTPUT_ROOT/A1/report.md and associated evidence. Non-goals: implementing dead controls, persistence, Auth, payments, AI or redesign. Stop at missing inputs, credential requests, real mutations or scope requiring new authority. Estimate: 60–120 minutes. Dependencies: dispatcher contract only; no other audit. Return top three actionable findings and untested areas.

### A2 — responsive and accessibility audit

Run A2 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, adopted design/accessibility requirements, app routes/components and existing screenshots. Scope: 360/390/430/768/1440px, light/dark where supported, keyboard order/focus, labels, text scaling, contrast, touch targets, reduced motion and overflow. Evidence: exact viewport/theme/route, reproduction, screenshots and measured values; no blanket WCAG certification from spot checks. Output: AUDIT_OUTPUT_ROOT/A2/report.md and associated evidence. Non-goals: CSS/code fixes, new dependencies, redesign or runtime features. Stop at shared contract boundaries or unavailable browser capability; report coverage gaps. Estimate: 2–4 hours. Dependencies: dispatcher contract only; independent of A1.

### A3 — asset and performance audit

Run A3 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, public assets, references in src, package scripts, build output and prior compatible measurements. Scope: image inventory, byte sizes/dimensions, crop/loading/alt treatment, route JS and image delivery, layout shift and loading priorities. Separate measured results from recommendations; establish a comparable baseline and proposed budget before calling anything optimized. Evidence: commands, environment, route, measured values and source locations. Output: AUDIT_OUTPUT_ROOT/A3/report.md and associated evidence. Non-goals: asset replacement, compression, remote media, dependency or runtime changes. Stop at missing inputs or network/provider requirements beyond public local assets. Estimate: 90–180 minutes. Dependencies: dispatcher contract only.

### A4 — Living Opportunity OS product-flow critique

Run A4 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, ARO_EXPERIENCE_SYSTEM.md, actual static participant/creator routes and fixture data. Scope: evaluate whether the current flow explains a person's intent, opportunity formation, threshold, commitment preview, Circle and return value. Identify exactly three highest-value changes with user consequence, route/file evidence and specification boundary. Separate aspiration, approved behavior and unapproved scaffold. Output: AUDIT_OUTPUT_ROOT/A4/report.md. Non-goals: generic redesign, runtime specifications, payment promises, inferred founder approval or editing source. Stop at consequential product decisions and identify the owner; continue independent critique. Estimate: 60–120 minutes. Dependencies: dispatcher contract only.

### S1 — Shipaton feasibility and eligibility audit

Run S1 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, ARO_SHIPATON.md, SHIPATON_MASTER_PLAN.md, SHIPATON_METRICS.md, DEVPOST_FINAL_SUBMISSION.md, SHIPATON_DEMO_SCRIPT.md, BUILD_IN_PUBLIC_LOG.md, DESIGN_AWARD_EVIDENCE.md, HAMM_EVIDENCE.md, ONESIGNAL_AWARD_EVIDENCE.md, shipaton/AWARD_MATRIX.md and shipaton/evidence. Scope: recheck public official rules, dates/timezones, entry/category exceptions, submission and Google Play testing requirements; build a dependency calendar separating cloud readiness from launch feasibility. Evidence: exact source links, access date, short supported findings, inaccessible sources, account/device unknowns and owner/action/stop conditions. Output: AUDIT_OUTPUT_ROOT/S1/report.md. Non-goals: contacting providers, credentials, account creation, store submissions, SDK installation, campaigns or purchases. Stop dependent conclusions where eligibility/accounts/devices cannot be verified; continue public research. Estimate: 90–180 minutes. Dependencies: dispatcher contract only.

### Lead — synthesis and proposed FV-1

Run lead synthesis only under ARO_CLOUD_HANDOFF.md's dispatcher contract after A1–A4 and S1 finish at the identical AUDIT_SHA. Inputs: all five reports/evidence, shared ordered documents, specs/PACKAGE_TEMPLATE.md and narrower governing specs. Scope: resolve duplicates/conflicts, rank evidence-supported issues, separate prototype limits, approved-scope defects, uncovered scaffold and launch blockers. Produce a proposed FV-1 specification with goals/non-goals, exact exclusive write paths, dependencies, measurable acceptance, baseline/budget, rollout/rollback, stop conditions and independent verifier. Output: AUDIT_OUTPUT_ROOT/lead/report.md and proposed-ARO-FV-1.md only; do not create an authoritative repository spec or update status. Non-goals: implementation, new architecture/SDKs, scheduling, self-approval. Stop if reports are absent or revisions conflict. Mark FV-1 SPEC-REQUIRED until founder/product-design approval is recorded in the repository. Estimate: 90–180 minutes. Dependencies: A1, A2, A3, A4 and S1 completed and compatible. No writing implementation task may be selected or scheduled before approval.

### C1 — recurring documentation-health audit

Run C1 only under ARO_CLOUD_HANDOFF.md's dispatcher contract. Inputs: shared ordered documents, changelog, active package evidence, current immutable AUDIT_SHA, externally supplied LAST_AUDITED_SHA and previous report. Scope: compare authority, status, required input availability, evidence, gates, task ownership and proposed schedule scope. Output: AUDIT_OUTPUT_ROOT/C1/<AUDIT_SHA>/report.md with agreement matrix, exact file-level corrections, founder actions and observed remote availability. Non-goals: edits, PRs, checkpoint writes to source, task self-selection or scheduling other work. Stop on unavailable inputs or permissions; if no prior baseline exists, explicitly produce a first audit without inventing a comparison. Estimate: 20–45 minutes incremental, up to 90 minutes initial. Dependencies: published snapshot; no dependency on A1–S1 unless citing them. Dispatcher stores checkpoints outside source. Notify only on meaningful changes, failures or required user action; remain quiet when unchanged. No source-writing exception is authorized.
