# ARO-I0.1 verification

Date: 2026-08-30. Spec: 1.0.0. Base: `87121a74bcf9d5db3b0dd41d0063c556fbe933af`.
Branch: `feat/aro-i0-ephemeral-ci`. Status: IN-PROGRESS; CI and required review pending.

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
| CI-001 pinned isolated runner | IMPLEMENTED | actual GitHub execution |
| CI-002 start/reset/bindings | NOT RUN | live CI assertions |
| CI-003 hostile SQL twice | NOT RUN | 21 assertions each run |
| CI-004 Auth lifecycle | NOT RUN | signup/signin/refresh/recovery/change/logout/admin denial |
| CI-005 reset/cleanup | NOT RUN | zero accounts, old credentials denied, no resources |
| CI-006 unchanged app quality | LOCAL PASS / CI PENDING | PR Quality jobs |
| CI-007 evidence/status/review | IN-PROGRESS | completed evidence and security/operations review |

## Scope qualification

This is a platform fixture, not the application database. Passing it will not prove product migration compatibility, full app Auth, Trust publishing, hosted recovery or P1 readiness. Full I0 remains blocked by the unresolved hosted and application-baseline gates. Production variables, domains and both existing Supabase projects are unchanged.

## Review

Implementation self-review checks exact project/network ownership, localhost URLs and published ports, generated-data retention, no raw credentials in output, fail-closed checks, and cleanup on failure. Independent security/operations review has not been claimed and remains required before merge.
