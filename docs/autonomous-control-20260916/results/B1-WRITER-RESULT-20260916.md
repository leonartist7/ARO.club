# B1 writer result bundle — 2026-09-16

**Task:** `B1-I02-repair-within-contract`  
**Claim:** `B1-20260916-001`  
**Base:** `79603ae1af60a30f86c105e0f2a4d841043eb727`  
**Local isolated head:** `155b2073fc85232e29455adb0d8c057b5a1a11c7`  
**Published candidate head:** `deb9db3f5e6937c48892b818740022e8b54421e3` on draft PR #51  
**Migration SHA-256:** `728784b17218a67ae8362f2520c481f6321ca29bf7165541dcca138713e1a52c`  
**State:** **REPAIR_REQUIRED** — not independently reviewed, accepted, merged or released.

## Scope validation

The controller ran `git diff --check` and validated that the candidate changes exactly these B1 allowlist paths:

1. `tools/ci/supabase/migrations/20260916103000_i02_corrective_repairs.sql`
2. `tools/ci/supabase/tests/application.test.sql`
3. `tools/ci/run.mjs`
4. `tools/ci/auth.mjs`
5. `tools/ci/browser.mjs`
6. `src/lib/teacherApplications.js`
7. `src/lib/teacherApplications.test.js`
8. `src/lib/admin.js`
9. `src/pages/TeacherOnboarding.jsx`
10. `src/pages/TeacherOnboarding.test.jsx`

R3 is not present in this candidate.

## Isolated checks

| Command | Result |
|---|---|
| `npm ci` | PASS |
| Focused Vitest B1 files | PASS (5/5) |
| `npm test -- --run` | PASS (136 passed; 3 skipped) |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `node --test tools/ci/boundary.test.mjs` | BLOCKED: expected two historic migrations; found permitted third append-only migration |
| `node tools/ci/run.mjs` | BLOCKED: `CI_ONLY` outside disposable CI |
| `node tools/ci/run.mjs --cleanup` | BLOCKED: `CI_ONLY` outside disposable CI |

The candidate is durable at draft PR #51. The original isolated evidence root is recorded in the ledger; selected raw-log SHA-256 values: boundary `b560bb4b6f3f5980a65708364fea56cbd2ddcce75a27624a74dad09c9dadd0e0`, full Vitest `de816fa0530a88d17ee71b114694223518f57daddb9e3314d374bd81765b6204`, lint `7d5b1fd11507ca8d4bd7e299117e58f66cb9ac94ad67ac9c60c360e23b508c7d`, build `6fcf5499ace505c1ec391700e1b2bddff82d9255fa9d8d3d0f397da5a9f247c4`.

## Exact next step

Apply and verify the one-file [B1 scope amendment](../B1-SCOPE-AMENDMENT-20260916.md). Then the controller must obtain disposable hosted-CI evidence and a final independent security/privacy/Trust review before any I02-08 status decision.
