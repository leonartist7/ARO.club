Implement approved FV-1 v0.2.0 using Terra, high reasoning.

Repository: https://github.com/leonartist7/ARO.club
Documentation PR #40 is merged with required checks passing.
MERGED_BASE_SHA = APPROVED_SPEC_SHA = F1_TASK_BASE_SHA =
606d06bcded8e0afde0f2f4eca35a4986650ce5d

Governing spec at that exact revision:
specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md
https://github.com/leonartist7/ARO.club/blob/606d06bcded8e0afde0f2f4eca35a4986650ce5d/specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md

Section 28 records founder approval against v0.2.0 candidate commit
a576640cc5b9828486d8bdd0f970636b3ff07138, also reviewed at
78005892071b7996917f8f10d04e5cd601f124d2. Implementation is SPEC-READY.
Product merge and release approval remain WITHHELD.

Read AGENTS.md and its governing chain, then the spec and all seven packets
at MERGED_BASE_SHA. These files contain the binding dependencies, permitted
files, behavior/non-goals, acceptance tests/evidence and stop conditions:

F1 — Responsive media: docs/fv1-recovery/tasks/F1.md
F2 — Shell/navigation/recovery: docs/fv1-recovery/tasks/F2.md
F3 — Opportunity/Circle state: docs/fv1-recovery/tasks/F3.md
F4 — Discovery/Create: docs/fv1-recovery/tasks/F4.md
F5 — Profile/Express: docs/fv1-recovery/tasks/F5.md
F6 — Return/Library/Settings: docs/fv1-recovery/tasks/F6.md
F7 — Acceptance/evidence/review: docs/fv1-recovery/tasks/F7.md

Execution:
1. Fetch and verify the exact merged SHA, SPEC-READY approval record and
   documentation manifest. Use an isolated checkout/worktree. Create or
   safely resume only codex/fv1-visual-release-evidence and ONE implementation
   PR. Preserve existing work; never start from floating main or the old
   product baseline. Record these bound SHAs in that PR before F1 writes.
   This handoff binds the intentionally null packet base fields per §25;
   no additional planning infrastructure or approval request is needed.
2. Run F1→F7 serially, one writer at a time. Each later TASK_BASE_SHA is the
   full accepted predecessor commit; APPROVED_SPEC_SHA stays fixed above.
   Record each handoff, focused tests and retrievable evidence in the same
   PR. Respect each finite allowlist; return corrections to its owner serially.
3. Recheck F1's encoder versions/synthetic hash before writing: cloud Python
   3.12.13, Pillow 12.3.0, libwebp 1.6.0 already passed. Follow §20 budgets and
   performance profile exactly. F7 may provision the specified lockfile-managed
   Chromium in its external cache; no new dependency or lockfile change.
4. Reuse all five validated saved audits; do not rerun audits or synthesis.
   Implement only the approved fictional/local prototype corrections. No
   backend/runtime expansion, paid model API, new coordinator or release.
5. Run packet acceptance and required lint/unit/build/CI; consolidate F7
   evidence at the specified tracked paths with retrievable large artifacts.
   Stop for wrong SHA/dirty or unowned work, interface conflict, unlisted
   changes, failed budget/test, missing required capability or scope drift.
6. Obtain independent nonwriting review of the exact finished diff. Keep
   full verification pending until that review, human NVDA testing and the
   founder's visual review are complete. Missing human evidence need not
   block authorized earlier slices. Never self-certify those gates. Do not
   merge the product PR, deploy, release or claim VERIFIED/SHIPPED prematurely.

Start F1 after the preflight and base checks; continue sequentially within
this authority. Return the ONE PR, accepted slice SHAs, evidence and any
remaining review/human gates. Release permission must be requested separately.
