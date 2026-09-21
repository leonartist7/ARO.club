# B2 initial candidate result — 2026-09-19

- Task: B2-I02-R3-protected-Trust-repair
- Claim: B2-20260919-001
- Base: fd169e43d481c9ee25c0ed051659adb7736265b2
- Local candidate: 7f86f07f0d4d8ec7c523f8c4f95e9fa780fefb1f
- Migration SHA-256: f1073b36c2819856fad0287feb5262a2666082be6b6c90251270bbb7cddb2513
- Writer bundle SHA-256: 594bcac44138951c3391719dde4b966a083461cc7c2590f6d3c5199e71d47de4

## Candidate scope

Only the claimed B2 files changed:

- new append-only migration 20260916113000_i02_protect_teacher_verification_history.sql;
- application pgTAP tests;
- CI runner expected count, 86 to 91.

The policy function is fixed-search-path SECURITY DEFINER and permits direct deletion only by the matching owner with no teacher_verifications row. Tests cover no-history allow, verified/suspended/banned denial, and verification-row preservation.

## Controller verification

Passed:

- diff scope is exactly the three B2-allowlisted files;
- git diff --check;
- node --check tools/ci/run.mjs;
- migration checksum matches writer report;
- test-plan count 70 + 21 = runner count 91.

Blocked before publication:

```
node --test tools/ci/boundary.test.mjs
application baseline is append-only and isolated in the disposable workdir
expected migration list lacks 20260916113000_i02_protect_teacher_verification_history.sql
```

This guard failure is retained. It does not permit CI or independent review yet. The smallest follow-up is a B2A test-guard acknowledgement changing only tools/ci/boundary.test.mjs to append the new migration filename; no SQL/product/authorization/retention behavior may change. Frontend lint/test/build were not run in the fresh checkout because dependencies were absent; hosted CI must verify them after a valid candidate is published.
