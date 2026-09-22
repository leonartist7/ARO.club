# B1 disposable CI result — 2026-09-16

**Candidate head:** `998b39b7fc9af32d632882442a53dad47e8710ce`  
**Workflow runs:** Quality #161 / `35087707794`; Isolated database #158 / `35087707882`  
**State:** **REPAIR_REQUIRED** — workflows succeeded, but the retained browser artifact does not prove B1’s required authenticated applicant journey.

## Verified hosted evidence

- Both workflow runs completed successfully on the candidate head.
- Static, generic browser smoke and the disposable database platform job completed.
- Platform logs record `PASS pgTAP 86/86` twice, the application Auth/Trust phase passed, and cleanup passed.
- The disposable artifact `i0-2-authenticated-baseline` has ID `10442868379`, size 42,163 bytes and digest `sha256:1828ba87a6dac1e2523c04d2f88f919ded52f185c7188de63339a5853583a903`.
- Controller downloaded the artifact, independently reproduced its SHA-256 and inspected it without execution.

## Evidence gap preserved

The artifact contains exactly four files:

- `1440-dark-prototype-boundary.png`
- `360-dark-prototype-boundary.png`
- `1440-light-prototype-boundary.png`
- `360-light-prototype-boundary.png`

Those filenames and the platform log stage (`prototype-browser-boundary`) establish only the inherited prototype-boundary coverage. They do **not** establish the B1 packet’s named persisted journey: onboarding saves an editable draft, document collection before explicit submission, durable status/timestamp after explicit submit, visible failure/retry, and no fabricated success. Green workflow status is therefore insufficient for I02-R7.

## Required repair cycle 1

The original B1 writer must trace why the amended authenticated-browser path was not represented in the disposable artifact/log output, then repair only the existing B1 allowlist so the real authenticated journey executes and retains appropriately redacted synthetic evidence. No test may be weakened. After new immutable CI evidence, a separate security/privacy/Trust reviewer must review the finished diff; this document is not acceptance.
