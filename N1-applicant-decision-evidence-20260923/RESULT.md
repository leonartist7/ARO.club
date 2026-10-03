# N1-R1-20260923-001 — local candidate

Status: IMPLEMENTED / LOCALLY VERIFIED / INDEPENDENT REVIEW PENDING. No push, CI, merge, deployment or provider operation.

- Checkout: `C:/Users/leona/Documents/Web dev/ARO/ARO-n1-applicant-decision-repair-20260923`
- Branch: `codex/n1-applicant-decision-repair-20260923`
- Base: `f37dc084d7172415f581a41e90d2edd9ba3738b9`
- Candidate: `3075a89111e03519312bdc57ad96196f4ec1d794`
- Governing specification: `specs/ARO-N1-APPLICANT-DECISION-REPAIR.md` v1.0.0, controller commit `6a08786f45eb508f2c2d9db6b6bd6ea306a3729c`, blob `93bb120c522d524beb681485bd47f5313dcd1e70`.
- Exclusive claim: N1-R1-20260923-001, ledger v51 dispatch.

## Behavior and exact diff

Four files only, 205 insertions and 7 deletions:

1. `src/lib/teacherApplications.js`: load latest owned application; only when it exists, fetch public decision using its returned ID with explicit `application_id, decision_reason` projection. Map only reason. Null decision is no reason; application and decision errors propagate. No private review read or decision spread.
2. `src/lib/teacherApplications.test.js`: add six data mapping/error/projection cases. Existing seven submission/upload-cleanup cases retain their assertions unchanged.
3. `src/views/teacher/TeacherApplicationStatus.jsx`: separate load failure from upload/action errors; visible alert and real Retry precede empty state. Clear application/documents during loading and publish them together only after both reads succeed. Version and loaded-owner guards prevent stale loads from being displayed for a later identity. Existing changes-requested/rejected-only reason rendering and upload handling remain unchanged.
4. `src/views/teacher/TeacherApplicationStatus.test.jsx`: thirteen component cases cover intended/hidden reason states, application/decision/document load failure and recovery, honest empty state, resubmission, upload-error separation and stale identity response.

Tracked worktree clean after commit. Exact changed-name list proves no SQL/migration/RLS, dependencies, configuration, workflows, Auth settings, CI harness or other product edits. Separate paused N1-V1 source and reproduction were not edited by this task.

## Commands and results

| Command | Exit / evidence |
|---|---|
| `git ls-remote https://github.com/leonartist7/ARO.club.git refs/heads/main` | 0; authorized base matched |
| Initial `npm ci --ignore-scripts --no-audit --no-fund` | 1; ENOSPC, incomplete install; no source changes |
| Initial sandboxed focused Vitest | 1 at startup; sandbox directory access denial, no test result |
| Focused Vitest with required subprocess permissions | 0; 26/26 on the partial install |
| Initial `npm run lint` | 1; incomplete installation had not linked eslint |
| Completed `npm ci --ignore-scripts --no-audit --no-fund` | 0; 580 packages; unchanged lockfile |
| `npm test -- src/lib/teacherApplications.test.js src/views/teacher/TeacherApplicationStatus.test.jsx src/views/TeacherOnboarding.test.jsx` | 0; three files, **27/27** including original onboarding caller; 30.44 seconds |
| `npm run lint` | 0 |
| `npm run build` | 0; Next.js 16.3.5, successful compilation, TypeScript, page generation |
| `npm run type-check` | 0; route type generation and tsc --noEmit |
| `git diff --cached --check` before commit | 0 |
| `git diff --name-only BASE HEAD` | exactly four allowed files above |

Environment observations: Node v24.11.0/npm11.6.1 produced existing jsdom30 engine warning (requires newer Node). Actual focused tests completed successfully, but this is not a supported-engine certification. Existing Browserslist data-age warning appeared during build; dependencies were not changed. Initial disk-space/install and sandbox failures are retained above, not relabeled as product test failures or hidden.

## Limits and handoff

Module/component tests use deterministic mocks. They do not prove Auth, RLS, Storage, cross-user denial, actual browser rendering or hosted behavior. Real authenticated API/UI owner/cross-user/private-note/reload evidence remains required through resumed N1-V1 after independent review and controller authorization. No new SQL91, four-context matrix or hosted run occurred here. No I02-08, F7, P1 or production acceptance is claimed. Independent reviewer must review this immutable candidate before any push/CI; the current claim grants neither.
