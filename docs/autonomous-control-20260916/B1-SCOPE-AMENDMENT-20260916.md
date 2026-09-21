# B1 scope amendment — boundary migration acknowledgement

**Task ID:** B1A-I02-boundary-acknowledgement  
**Status:** APPROVED bounded repair under the existing I0.2 corrective authority; ready only after a guarded claim  
**Prepared:** 2026-09-16  
**Candidate dependency:** draft PR #51, base `79603ae1af60a30f86c105e0f2a4d841043eb727`, candidate head `deb9db3f5e6937c48892b818740022e8b54421e3`

## Why this amendment is necessary

B1 adds the permitted append-only migration `20260916103000_i02_corrective_repairs.sql`. The required `node --test tools/ci/boundary.test.mjs` currently hard-codes the prior two-file migration list and fails solely because that new file is not listed. The observed failure is retained in B1 evidence: the actual list contains the two historic migrations plus `20260916103000_i02_corrective_repairs.sql`.

This amendment does not alter a product, Trust, retention, authorization, UX, provider, or release decision. It restores the existing boundary test's ability to verify the already-authorized append-only migration. It is authorized by the founder's existing bounded-repair authorization and the direct instruction to proceed with the approved recommendation.

## Exact scope

Add exactly one path to B1's write allowlist:

- `tools/ci/boundary.test.mjs`

The only permitted semantic edit is to add `20260916103000_i02_corrective_repairs.sql` to the expected disposable migration list, while retaining:

- both historic migration names;
- append-only and destructive-operation checks;
- prohibited hosted-project identifiers check;
- disposable hosted-runner enforcement; and
- the existing Data API and private-document boundary assertions.

No other source, workflow, dependency, migration, test policy, CI environment, or status file may change.

## Verification and stop rules

1. Revalidate PR #51 head and the ledger claim before writing.
2. Run `node --test tools/ci/boundary.test.mjs`; it must pass without weakening an assertion.
3. Re-run only relevant static verification (`npm run lint` and the focused B1 Vitest files) if the actual head changed.
4. Do not call the disposable CI command from a non-CI runner except to retain the existing truthful `CI_ONLY` stop. The required hosted disposable CI still must run `node tools/ci/run.mjs` and `node tools/ci/run.mjs --cleanup` after this change.
5. At most one repair edit for this amendment. Any additional file, change to a guard beyond the new filename, base drift, failed test, or CI/environment bypass is BLOCKED.

## Acceptance

- The boundary test recognizes exactly the three append-only disposable migrations and passes.
- The B1 candidate remains draft/REPAIR_REQUIRED until hosted disposable CI proves pgTAP 86, Auth/Storage and actual browser journeys.
- No independent final acceptance review is requested before those proofs exist.
