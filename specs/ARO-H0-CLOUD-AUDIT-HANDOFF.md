# ARO-H0 — Cloud audit snapshot publication

## Metadata and authority

- Version: 1.0.0; date: 2026-09-08.
- Scope status: SPEC-READY for packaging and documentation only, under the founder's explicit request to publish all existing work to GitHub's default branch. Delivery results: `artifacts/ARO-H0/VERIFICATION.md`.
- Branch: `codex/aro-cloud-audit-handoff`; one snapshot PR to `main`.
- Governing inputs: AGENTS.md, ARO_MASTER_DELIVERY_PLAN.md, ARO_BUILD_PLAYBOOK.md, existing UX0–UX3 specifications and ARO_CLOUD_HANDOFF.md.
- Owner: founder; implementer: publication agent; independent verification: repository CI and normal PR review.

## Problem, outcome and bounded scope

Cloud tasks cannot see local governance, Shipaton planning, prototype source or images. Preserve that existing work in a reviewed snapshot, make its limitations discoverable, and synchronize the founder's checkout with the remote default branch. Correct factual documentation and task-authority gaps necessary for audit dispatch. No new product behavior is authorized. This is not FV-1 implementation or retrospective approval of uncovered prototype scope.

Exclusive write ownership: the snapshot's existing modified/untracked documentation, `src/lib/routes.jsx`, `src/components/app/*`, `src/data/aroApp.js`, `src/pages/App*.jsx`, nine named `public/aro-*-v1.png` assets, this specification, ARO_CLOUD_HANDOFF.md, and `artifacts/ARO-H0/*`. Existing prototype source is packaged as found; no feature expansion. Historical-document banners are documentation-only corrections. Dependencies, lockfile, provider configuration, schema and authentication implementation remain unchanged by H0.

## Invariants and non-goals

Synthetic mode stays source-controlled and enabled. No live bookings, user records, payments, AI, location, 3D, AR, Seasons or Beacons. No secret values in source or evidence. Do not upgrade UX1–UX3 partial verification, close I0 or unlock P1. No schedules. No force-push, history rewriting or bypass of required GitHub checks. Stop if publication requires additional provider permissions or a security-sensitive change.

New personas, entities, permissions, transitions, APIs, RLS, retention, AI, entitlements and analytics: N/A because this package introduces none. Existing fixture states remain prototype-only. Native store launch and eligibility are separate and unresolved. Existing prototype accessibility/performance requirements remain subject to A1–A4 and design review; publishing a baseline does not certify them.

## Acceptance and evidence

| ID | Requirement | Verification |
|---|---|---|
| H0-1 | All intended source/docs/assets visible in remote main | Reviewed path manifest, merged revision and remote ref comparison |
| H0-2 | Gates and known limitations remain explicit | Self-review of handoff, registries and workboard; no runtime status promotion |
| H0-3 | A1–A4/S1/lead/C1 have bounded independent contracts | Handoff includes scope, inputs, non-goals, authority, evidence/output, stops, duration and dependencies |
| H0-4 | No detected build or smoke regression | Fresh strict lint, unit tests, build and existing browser suite; targeted app route load checks |
| H0-5 | Clean synchronized founder checkout | Post-merge status and local/remote main SHA equality |
| H0-6 | No secret/config accidentally included | Review paths and scan candidate text with redacted findings; ignore local environment files |

## Rollout, recovery and review

Push a feature branch, open a reviewable PR, wait for required checks and address actionable findings, then merge normally to `main`. Default-branch publication may trigger the existing Vercel deployment. The founder's publication request authorizes this static snapshot release only; visual certification remains pending. Follow-up audit findings require separately approved packages. Recovery is a reviewed revert of the snapshot merge if needed; no database rollback applies. Final delivery records actual merge SHA and CI results without embedding a self-referential commit in the snapshot.
