# ARO-I0.1 verification

Date: 2026-08-30. Spec: 1.0.0. Base: `87121a74bcf9d5db3b0dd41d0063c556fbe933af`.
Branch: `feat/aro-i0-ephemeral-ci`. PR: [#27](https://github.com/leonartist7/ARO.club/pull/27). Status: VERIFIED at runtime commit `54e41b7`; PR release pending.

## Baseline

- GitHub main matches local base (live `ls-remote`, 2026-08-30).
- Repository is public, default branch `main` (GitHub connector).
- No local Docker runtime is available. Earlier WSL audit also found virtualization unavailable; no local stack test is claimed.
- Existing lint: PASS, zero warnings. Existing unit: 61/61 PASS. Build: PASS, 2602 modules, 22.99 seconds; main JS 750.69 kB / 230.00 kB gzip and CSS 89.84 kB / 13.92 kB gzip, unchanged from Q0.
- Windows sandbox initially denied Vite/Vitest configuration access. Approved unsandboxed rerun passed; this was an environment limitation, not a hidden product regression.
- Existing bundle-size and browser-data freshness warnings remain; no dependency change made.
- Inherited `clean-schema.sql` includes DROP TABLE CASCADE statements and is excluded from CI. No ordered application migration history is claimed.

## Local implementation verification

- Boundary unit tests: 6/6 PASS, including forbidden-host failure before fetch and manual redirect enforcement.
- Node syntax checks for runner and Auth harness: PASS.
- Local runner invocation: expected `FAIL preflight: CI_ONLY`, nonzero, before any service mutation.
- New application dependencies: zero. Product source/schema changes: zero.
- Supabase skill affected implementation: pinned CLI and discovered help, explicit grants rather than implicit exposure, no user-metadata authority, no service-role browser use, no invented migration history.

## Acceptance evidence

| Criterion | Status | Evidence still required |
|---|---|---|
| CI-001 pinned isolated runner | PASS | run 33325347032, 6/6 boundary assertions |
| CI-002 start/reset/bindings | PASS | healthy start, all published ports loopback, clean reset |
| CI-003 hostile SQL twice | PASS | pgTAP 21/21 on both runs |
| CI-004 Auth lifecycle | PASS | signup/signin/refresh/recovery/change/logout/admin denial |
| CI-005 reset/cleanup | PASS | exactly two synthetic accounts before reset, zero after; prior password denied; no stack resources after cleanup |
| CI-006 unchanged app quality | PASS | local baseline + Quality run 33325347076 SUCCESS (static and browser-smoke) |
| CI-007 evidence/status/review | PASS | actual automated security/operations review completed; both minor findings resolved, fresh CI passes |

## Live CI evidence

Commit: `6a2c0daa9393b6bb5e935df4b5523fd27af9c7b2`.
[Isolated database run 33325347032](https://github.com/leonartist7/ARO.club/actions/runs/33325347032): SUCCESS, platform job 1m37s, 2026-08-30 17:28:26–17:30:03 UTC. This was an actual Docker/Supabase run, not a mocked result.

| Phase | Seconds | Result |
|---|---:|---|
| fresh runner | 0.19 | PASS |
| start + loopback binding inspection | 45.80 | PASS |
| initial reset + zero accounts | 12.84 | PASS |
| first SQL isolation matrix | 3.27 | 21/21 PASS |
| signup two users | 0.29 | PASS |
| bad password, signin, refresh, identity, admin denial | 0.32 | PASS |
| local mail recovery + password change + old-password denial | 0.44 | PASS |
| global logout + refresh denial | 0.05 | PASS |
| exactly two synthetic accounts | 0.05 | PASS |
| reset + zero accounts + prior credentials denied | 12.43 | PASS |
| second SQL isolation matrix | 1.16 | 21/21 PASS |
| targeted container/volume/network cleanup | 2.30 | PASS |
| workflow always-cleanup confirmation | 0.04 | PASS |

The synthetic resources were intentionally erased and are not recoverable; no user or hosted data was involved. Job duration is below the 25-minute budget. No skipped health checks or ignored failures. No raw keys, tokens, mail contents or service logs were uploaded. Existing checkout/setup-node Node20-to-24 deprecation annotation is non-blocking and recorded as maintenance debt.

[Quality run 33325347076](https://github.com/leonartist7/ARO.club/actions/runs/33325347076): SUCCESS, including lint/unit/build and public browser smoke. No application-source or dependency diff versus `87121a7`.

## Scope qualification

This is a platform fixture, not the application database. Passing it will not prove product migration compatibility, full app Auth, Trust publishing, hosted recovery or P1 readiness. Full I0 remains blocked by the unresolved hosted and application-baseline gates. Production variables, domains and both existing Supabase projects are unchanged.

## Review

Implementation self-review checks exact project/network ownership, localhost URLs and published ports, generated-data retention, no raw credentials in output, fail-closed checks, and cleanup on failure. CodeRabbit's initial automatic check skipped review; that SUCCESS is not review evidence. A [full security/operations review was explicitly requested](https://github.com/leonartist7/ARO.club/pull/27#issuecomment-5470193181); the bot confirmed review run `0c729a54-00c4-4786-9abf-8fe3616cf316` in progress. Review findings/sign-off remain pending; no independent human approval is claimed.

### Review findings and response

CodeRabbit completed the requested review of `6a2c0da` with two minor findings and no reported high/critical finding:

1. [Stale PR metadata](https://github.com/leonartist7/ARO.club/pull/27#discussion_r3890058826): already corrected in `9a83d0c`.
2. [Caller cancellation overwritten](https://github.com/leonartist7/ARO.club/pull/27#discussion_r3890058830): fixed by composing the caller's signal with the fixed request timeout. Two regression tests cover in-flight and already-aborted cancellation. Recovery polling now also uses a shared 30-second deadline signal, so an in-flight request cannot extend the polling budget.

Local boundary suite after the correction: 8/8 PASS. Runtime changes require a fresh CI run before verification/merge. The independent review is automated, not a human approval or a waiver of later hosted/founder gates. No additional paid review is requested.

### Final runtime verification

Runtime commit: `54e41b741159c552e0c9f7da9cae3796b62901b6`.

- [Isolated database run 33325803194](https://github.com/leonartist7/ARO.club/actions/runs/33325803194): SUCCESS, 8/8 boundary tests, 21/21 SQL assertions twice, all Auth/reset/cleanup assertions passed after the cancellation fix.
- Start/bindings 39.61s; initial reset 11.87s; first SQL 2.31s; recovery/password change 0.42s; reset-erasure 11.87s; second SQL 0.91s; cleanup 2.20s; always-cleanup confirmation 0.04s.
- [Quality run 33325803093](https://github.com/leonartist7/ARO.club/actions/runs/33325803093): SUCCESS, static and public browser checks.
- Both review threads are resolved in GitHub. No unresolved critical/high issue or required acceptance failure remains for I0.1's stated platform scope. Subsequent skipped automatic CodeRabbit statuses are not counted as additional reviews.
- Documentation-only evidence finalization does not change the tested runtime; its own PR checks must pass before merge.
- Read-only migration-source evidence is separately recorded in `MIGRATION_SOURCE_AUDIT.md`; it confirms why application baseline reconciliation is still necessary and does not authorize a live fix.
