# B1A boundary acknowledgement result — 2026-09-16

**Task / claim:** `B1A-I02-boundary-acknowledgement` / `B1A-20260916-001`  
**Base candidate:** `deb9db3f5e6937c48892b818740022e8b54421e3`  
**Verified head:** `998b39b7fc9af32d632882442a53dad47e8710ce`  
**Changed path:** `tools/ci/boundary.test.mjs` only  
**Result:** VERIFIED for the B1A guard acknowledgement only. This does not verify B1’s database/API/browser criteria and does not change I02-08.

## Guarded change

The expected append-only migration list now contains exactly:

1. `20260831235206_application_trust_baseline.sql`
2. `20260903074000_lock_public_default_privileges.sql`
3. `20260916103000_i02_corrective_repairs.sql`

All prior boundary assertions remain present.

## Isolated verification

A fresh clone at the verified head was clean. The correctly rooted command passed:

```bash
node --test tools/ci/boundary.test.mjs
```

Raw output SHA-256: `4d9560b913ada654ce09c70e7d9cf9d1f0c946d6f05a177d0cf27d215b60db40`.

For transparency, the controller’s first invocation ran from the parent directory and returned “Could not find tools/ci/boundary.test.mjs”; it did not run a repository test or change source. The rerun above used the fresh source root and is the authoritative result.

## Remaining gate

B1 remains **REPAIR_REQUIRED** until disposable hosted CI proves pgTAP 86, Auth/Storage and actual browser journeys. Only after that immutable evidence exists may an independent security/privacy/Trust reviewer inspect the finished diff.
