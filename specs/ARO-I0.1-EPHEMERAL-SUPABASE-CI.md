# ARO-I0.1 — Ephemeral Supabase CI

## 0. Metadata

- Status: IMPLEMENTED / REVIEW PENDING; platform CI passes, security/operations review required before merge.
- Spec version: 1.0.0
- Owner/director: ARO founder/director
- Branch: `feat/aro-i0-ephemeral-ci`; PR [#27](https://github.com/leonartist7/ARO.club/pull/27).
- Depends on: SEC0, R1, M0; I0 1.0.0 CI authorization; Q0 implementation.
- Governing authority: `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_INFRASTRUCTURE.md`, `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` sections 8, 10 and 11, `ARO_ARCHITECTURE.md`, `ARO_DATA_MODEL.md`, `ARO_TRUST_SAFETY.md`, ADR-025–027.
- Reviewers: implementation self-review; security/operations review before merge. Founder remains required for hosted resources, cost and release decisions.
- Date: 2026-08-30

This subpackage implements the already-specified disposable CI lane. It does not replace the parent I0 acceptance criteria or open P1 automatically.

## 1. Problem

Hosted free capacity is exhausted. The local Windows host lacks a working container runtime. Neither permits safe authenticated database tests today. Existing SQL snapshots are not a reconciled migration history.

## 2. User outcome

Maintainers receive repeatable evidence that an isolated Supabase service can authenticate synthetic users, enforce a test-only ownership policy and erase its test data. No product user-facing behavior changes.

## 3. Why now

I0 explicitly permits clean local Supabase in CI. This can establish an executable verification environment while hosted capacity, application migration provenance and production gates remain unresolved.

## 4. Goals

- Pin CLI 2.116.0 and use a standard GitHub-hosted Ubuntu runner in the public repository.
- Run clean start/reset, nonempty pgTAP isolation tests, synthetic Auth API tests and a second reset.
- Prove the second reset removes accounts; prove cleanup removes this stack's containers, volumes and network.
- Reject hosted endpoints, credentials and linked projects before writes; bind published ports only to loopback.
- Record durations and redacted pass/fail evidence without adding application dependencies.

## 5. Non-goals

No hosted project, provider variable, domain, billing, branch-protection, product schema, app Auth flow, Trust rule, production data, P1 table, Google, Stripe, AI or application dependency change. No production dump/import. No claim of inherited-schema compatibility from an empty stack.

## 6. Invariants

- Tonguee `ybhecubqnhukgpvchjay` is untouched; `jjgccfrwjkwknyjtbtxa` remains QUARANTINED — KEEP.
- Dedicated workdir `tools/ci`, project `aro-i0-ci`, network `aro-i0-ci-net`.
- The destructive runner only accepts Linux GitHub-hosted CI, rejects existing project resources and linked-project state, and requires pinned CLI version.
- No `--linked`, `--db-url`, hosted `--project-ref`, login, push or production migration commands.
- No secrets are needed from GitHub settings. Capture CLI output privately; never upload raw status, tokens, mail or logs.
- `auto_expose_new_tables = false`. A test-only public probe is rolled back, with explicit grants, RLS, USING and WITH CHECK.
- Every failure is nonzero; cleanup failure also fails the job. Cancellation has a workflow cleanup step; runner disposal is the final containment boundary.

## 7. Personas and permissions

| Actor | Permission | Boundary |
|---|---|---|
| Maintainer / PR author | execute isolated CI | no hosted/provider authority |
| Synthetic Auth user | sign up/in, refresh, recover and change own password | disposable localhost only |
| Synthetic SQL owner | CRUD own test probe | database-enforced RLS |
| Other user / forged metadata admin | no other-user probe access | no application admin policy is introduced |
| Anonymous | no probe access | explicit grant denial |
| Service role | test-only bypass demonstration | never browser or logs |

## 8. Journeys

1. Validate host/version/workdir and absence of existing resources.
2. Create loopback-bound bridge and start healthy services without skipping health checks.
3. Reset locally, confirm empty Auth state, run transactional pgTAP tests.
4. Sign up two synthetic users; reject bad password; sign in; refresh session; retrieve own identity; deny admin API to ordinary user.
5. Request recovery email into local Mailpit, consume the recovery link only after validating localhost, set a new password, reject old password, sign in with new password, revoke session and prove refresh denial.
6. Reset again, confirm zero Auth users and prior credentials cannot sign in; rerun SQL tests.
7. Stop this project with disposable-volume removal; verify no matching containers/volumes/network remain.

Reruns start fresh; no unsafe retry of writes. Mail delivery polling is bounded and read-only. An unexpected target or existing resource stops before cleanup authority is acquired.

## 9. State machine

`PREFLIGHT → OWNED_NETWORK → RUNNING → RESET → SQL_PASS → AUTH_PASS → RESET_PROVEN → CLEANED`

CI is the actor. Every transition requires successful previous assertions. Failure after acquiring the network triggers exact-project cleanup and a failed job; preflight failure never destroys pre-existing resources. Evidence records phase and duration, never request bodies.

## 10. Data specification and migration strategy

Only synthetic Auth users and local recovery mail survive between test steps. The `public.i0_ci_probe(id integer primary key, owner_id uuid not null, value text not null)` fixture exists only inside a rolled-back SQL test transaction. It has no product semantics, user FK or migration entry. No application tables are imported.

The dedicated workdir intentionally has **zero product migrations**. Reset evidence proves platform reset, not migration application. A future reviewed I0 migration-baseline package must reconcile `schema.sql`, `clean-schema.sql`, extensions, Trust/admin SQL and live read-only schema before producing CLI-created append-only migrations. Existing snapshots remain unchanged. No no-op migration is used as a substitute for compatibility proof.

## 11. RLS matrix

Probe-only tests: owner SELECT/INSERT/UPDATE/DELETE succeed; other-user SELECT/UPDATE/DELETE affect zero rows; forged owner INSERT and owner reassignment fail; forged user-metadata admin sees no foreign rows; anonymous access fails at grants; service-role bypass is demonstrated explicitly. These test the CI engine, **not** deployed application Trust/RLS.

## 12. Privacy

Addresses use reserved `.invalid`; passwords are random per run. No real user data. CLI status and recovery payloads stay in process memory, errors expose phase/status only. Reset and stop erase disposable data. Only sanitized tests/durations are retained in GitHub logs.

## 13. Trust and safety

Stop on non-loopback bindings, hosted URL, linked config, unexpected pre-existing resources, real data, failed reset, missing isolation or cleanup failure. No application Trust claim follows from synthetic probe success.

## 14. Money

No hosted capacity or paid runner. Standard Ubuntu Actions in this public repository only; no larger runner, marketplace purchase or plan change. No product entitlements or transactions.

## 15. AI

N/A: no inference or provider integration.

## 16. API contract

Only built-in local Auth `/signup`, `/token`, `/user`, `/recover`, `/verify`, `/logout`, and an admin endpoint denial test. Local Mailpit API retrieves the synthetic recovery message. Bounded 15-second fetches; manual redirects prevent token forwarding to unvalidated hosts. Expected status and identity are asserted without printing sensitive response bodies.

## 17. Operational UX

Named phases report PASS/failure and duration. Operators fix the failing phase and rerun the PR check. No product UI changes; backend-unavailable pages remain intact. Raw service output is not public failure evidence.

## 18. Responsive

N/A: CI-only, no route or component touched. Existing Q0 browser check still runs.

## 19. Accessibility

N/A to CI; no claim of new application accessibility verification. Existing public smoke remains required.

## 20. Performance

Zero production bundle/dependency delta. Job timeout 25 minutes; start timeout 10 minutes, reset 3 minutes, SQL 2 minutes, cleanup 2 minutes, each HTTP request 15 seconds, mail polling at most 30 seconds. Record actual phase durations in first successful CI run. No health-check bypass for speed.

## 21. Failure analysis

| Failure | Detection | Recovery |
|---|---|---|
| wrong/linked target | preflight and strict URL validation | stop before writes |
| default public port binding | inspect network and every container binding | exact stack cleanup, fail |
| startup/image/network failure | bounded process exit | cleanup; explicit new run |
| Auth or RLS regression | named assertion / pgTAP nonzero | fix test or implementation against spec; no waived test |
| reset leaves data | privileged count plus old credential denial | fail, dispose runner |
| cleanup failure/cancellation | always cleanup step plus resource enumeration | fail; hosted runner disposal |

## 22. Measurement

Phase name, exit status, assertion count and duration only. No user analytics. No raw logs/artifacts.

## 23. Test matrix

Node unit tests cover target/redirect/host rejection and output sanitization. pgTAP covers nonempty schema/role/RLS matrix. Auth HTTP covers signup/signin/refresh/recovery/password update/logout/admin denial and reset. Full existing lint/unit/build/public browser CI must remain green. Failure injection in Node tests must show forbidden target cannot reach fetch.

## 24. Acceptance

| ID | Requirement | Evidence | Current state |
|---|---|---|---|
| CI-001 | pinned, hosted-free, isolated runner with no secrets | run 33325347032 + 6 boundary tests | PASS |
| CI-002 | loopback-only healthy start and clean reset | CI binding/reset assertions | PASS |
| CI-003 | nonempty hostile SQL matrix passes twice | 21/21 pgTAP assertions twice | PASS |
| CI-004 | real local Auth API lifecycle passes | named assertions | PASS |
| CI-005 | reset erases accounts; targeted cleanup is proven | count, credential denial, Docker enumeration | PASS |
| CI-006 | app unchanged and quality gates pass | local + Quality CI run 33325347076 SUCCESS | PASS |
| CI-007 | scope/limits/evidence/status synchronized | review + verification record | REVIEW PENDING |

## 25. Rollout

Branch and PR to ARO.club main. CI runs on PR and main, with read-only repository permission. Security/operations review precedes merge. No hosted deployment configuration changes. I0 remains incomplete; Q0 app Auth and P1 baseline remain blocked pending actual migration/Auth regression evidence.

## 26. Recovery

Dispose only the newly created CI project's resources. Never stop all projects or reset a linked target. Revert faulty CI changes through a normal PR. No production rollback exists because no production data changes.

## 27. Security review

Implementation self-review must cover exact target, credentials, grants/RLS, redirects, log redaction and cleanup ownership. Required pre-merge security/operations review remains pending and must be recorded honestly.

## 28. Design review

Not required: no product surface changes.

## 29. Definition of Done

All CI-001–007 pass with actual CI evidence, existing quality checks remain green, no high/critical finding remains, required review is recorded, and status documents distinguish CI infrastructure from hosted/application readiness.

## 30. Delivery record

See `artifacts/ARO-I0.1/VERIFICATION.md`. Package remains unverified until the specified real CI run and review are complete.
