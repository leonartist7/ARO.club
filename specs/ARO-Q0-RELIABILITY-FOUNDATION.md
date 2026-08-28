# ARO-Q0 — Reliability and CI Foundation

## 0. Metadata

- **Status:** IMPLEMENTED / AUTH-GATE BLOCKED
- **Spec version:** 1.0.0
- **Owner/director:** ARO founder/director
- **Implementation branch:** `feat/aro-q0-reliability-foundation`
- **PR:** pending
- **Depends on:** M0 VERIFIED; I0 specification merged; repository/provider boundary preserved
- **Blocks:** reliable P1 regression detection; later platform and release gates
- **Governing docs:** `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_BUILD_PLAYBOOK.md`, `ARO_INFRASTRUCTURE.md`, `ARO_TRUST_SAFETY.md`, `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md`
- **Required reviewers:** engineering/reliability; security for Auth-test boundary; founder only for branch-protection/provider mutations
- **Last updated:** 2026-08-28

## 1. Problem

The inherited app builds and has 61 passing unit tests, but lint fails with 19 errors and 9 warnings. The custom E2E runner hard-codes a Linux Chromium path, launches `npm` in a Windows-incompatible way and encodes pre-Supabase localStorage authentication journeys that no longer match the application. There is no GitHub Actions workflow or required branch protection. This makes regressions hard to distinguish from known debt.

## 2. User outcome

Contributors receive deterministic, cross-platform feedback before merge. Public and fail-closed account journeys are browser-tested without bypassing Auth. Authenticated/RLS journeys become an explicit gated suite that cannot falsely pass until I0 supplies a safe target.

## 3. Why now

P1 will add private data and RLS. It must start from a clean lint/unit/build/public-E2E baseline and an honest distinction between runnable tests and infrastructure-blocked Auth tests.

## 4. Goals

- Make `npm run lint` pass with zero warnings without broad rule disablement.
- Keep all 61 unit tests passing and add targeted tests where behavior changes.
- Make the E2E server/browser harness portable across Windows, Linux and CI.
- Replace stale fake-auth journey assertions with current signed-out/fail-closed contracts.
- Define a separate authenticated suite that fails clearly when required environment/test-account inputs are absent; never bypass Auth.
- Add GitHub CI for install, lint, unit, build and public browser smoke.
- Record bundle and route-smoke baselines and prevent unexplained regression.
- Keep backend/provider/schema/product behavior unchanged.

## 5. Explicit non-goals

- Supabase project creation, migration or RLS changes.
- Synthetic Auth bypasses, localStorage user impersonation or production test hooks.
- Completing authenticated P1/Tonguee journeys before I0 is operational.
- Product redesign, Next.js migration, new dependency, browser-data upgrade or bundle rewrite.
- Google, Stripe, AI, money, location, AR or downstream product scope.

## 6. Locked decisions and invariants

1. Tests never weaken or bypass real Supabase Auth/ProtectedRoute behavior.
2. Missing backend configuration is a supported, truthful fail-closed state.
3. A skipped/blocked authenticated suite is not reported as PASS.
4. CI uses the committed lockfile and `npm ci`.
5. Lint fixes preserve behavior; scoped rule configuration may recognize named hook exports but cannot broadly disable React Hooks, unused-code or Fast Refresh checks.
6. Existing R1/P1 visual evidence and Trust boundaries remain unchanged.
7. No dependency versions change in Q0.
8. Required CI must be green before this package merges; branch protection is configured only after the stable check names exist.

## 7. Personas and permissions

| Role | Can run public gates | Can run authenticated gates | Can modify CI | Can change branch protection |
|---|---:|---:|---:|---:|
| Contributor/agent | yes | only with approved synthetic credentials/target | package-authorized | no without explicit provider authority |
| CI | yes | only in approved protected environment | workflow execution only | no |
| Founder/admin | yes | yes | yes | yes |
| Browser user | N/A | N/A | no | no |

## 8. Journeys

### Journey A — Local verification

1. `npm ci` installs the lockfile.
2. `npm run lint`, `npm test`, `npm run build` pass.
3. `npm run test:e2e` starts its own Vite server portably, selects an available Chromium and runs public/fail-closed suites.
4. The runner always terminates the server it owns.

### Journey B — Pull request

1. GitHub checks out the PR and installs Node/dependencies.
2. Static/unit/build checks run.
3. Chromium installs in CI and public E2E runs.
4. Any required failure blocks merge.

### Journey C — Authenticated verification

1. Operator supplies an approved isolated base URL and synthetic account through secret storage.
2. The suite signs in through the real UI/Auth provider.
3. Protected route/profile/onboarding checks run.
4. Credentials are never logged; cleanup is idempotent.
5. Until I0 provides this environment, the gate is **BLOCKED**, not green.

## 9. Verification state machine

```text
NOT_RUN → RUNNING → PASS
                 ↘ FAIL
                 ↘ BLOCKED_PREREQUISITE
```

Required public checks may not use `BLOCKED_PREREQUISITE`; their prerequisites are installed in CI. Authenticated checks remain blocked until I0 evidence exists.

## 10. Data specification

No database entities or migrations. Browser tests use public content, localStorage preferences and synthetic identifiers only. Authenticated test data will be specified in I0/P1 and must not include founder/customer data.

## 11. Authorization matrix

No RLS change. Q0 verifies that signed-out protected routes redirect to `/login`, backend-unavailable forms are disabled/truthful and no localStorage player object grants Supabase authorization.

## 12. Privacy

- CI logs contain no environment values, Auth tokens, emails or personal data.
- Public E2E uses no real account.
- Future authenticated tests use synthetic accounts in the isolated target.
- Screenshots and traces are retained only on failure and must be reviewed for redaction before publication.

## 13. Trust & safety

Failing open, fake Auth, silent skips and green checks that omit required security journeys are prohibited. Test fixtures never present a synthetic host as verified live supply.

## 14. Money / entitlement implications

None. No Stripe/provider purchase or paid test service.

## 15. AI specification

N/A.

## 16. Commands and CI contract

| Command | Contract |
|---|---|
| `npm run lint` | zero errors and zero warnings |
| `npm test` | all unit tests pass once, non-watch |
| `npm run build` | production bundle succeeds |
| `npm run test:e2e` | portable public/fail-closed browser gate |
| `npm run test:e2e:auth` | real isolated Auth gate; exits non-zero with a clear prerequisite message until configured |

CI job/check names must remain stable once branch protection references them.

## 17. UI / UX specification

No new user interface. Browser tests cover public content, nonblank routes, error-overlay absence, responsive overflow, dark-mode regressions, signed-out redirects and backend-unavailable copy/action state.

## 18. Responsive requirements

Public route sweeps include 390px and 768px widths; the release evidence baseline remains 360px and 1440px where prescribed. Q0 may add 1440px smoke but does not replace package-specific screenshots.

## 19. Accessibility

Browser smoke checks meaningful content/landmarks and obvious unnamed interactive controls where deterministic. Existing keyboard/screen-reader/manual audits remain package-specific; Q0 does not claim full WCAG conformance from automation.

## 20. Performance budget

- Main JS baseline: 750.65 kB minified / 229.96 kB gzip.
- CSS baseline: 89.84 kB minified / 13.92 kB gzip.
- Q0 runtime-code delta target: negligible; no new dependency.
- Public E2E must finish within CI's bounded timeout and may not use unbounded waits.
- Bundle warning remains recorded; X1/N1 or a later focused performance package owns architectural splitting.

## 21. Reliability and failure analysis

| Failure | Impact | Detection | Recovery | Consistency |
|---|---|---|---|---|
| dev server cannot spawn | E2E unavailable | runner exit + stderr | launch Vite through Node executable | no data |
| browser missing | E2E unavailable | candidate/default launch error | CI installs Chromium; local message names remedy | no data |
| stale Auth assumption | false failure/false confidence | contract assertions | test real signed-out behavior; separate Auth suite | no data |
| child server leak | occupied port/process | runner cleanup test/manual process check | platform-aware kill | no data |
| lint warning ignored | future defect hidden | zero-warning gate | fix cause or approved scoped config | no data |
| external font/image failure | flaky smoke | filter named network noise only | keep runtime/page errors fatal | no data |
| missing Auth target | security journey omitted | explicit non-zero BLOCKED result | complete I0 then rerun | no false PASS |

## 22. Analytics / measurement

No product analytics. CI records duration, pass/fail and artifact metadata only.

## 23. Test matrix

### Static/unit/build

- [x] lint zero errors/warnings;
- [x] 61+ unit tests pass;
- [x] production build passes;
- [x] bundle sizes recorded.

### Public browser

- [x] runner self-starts on Windows;
- [x] browser discovery works without a hard-coded single OS path;
- [x] public route crash/blank sweep;
- [x] protected signed-out redirect contract;
- [x] backend-unavailable login/signup/recovery contract;
- [x] responsive overflow and dark-mode smoke;
- [x] owned server stops after pass and fail.

### Authenticated browser

- [ ] real sign-in/recovery/onboarding/profile contract;
- [ ] owner/other-user/RLS journeys;
- [ ] no credentials in output;
- [ ] BLOCKED until I0 target exists.

### CI

- [ ] clean GitHub runner passes required public gates;
- [ ] failure blocks PR;
- [ ] stable checks can be selected for branch protection.

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Evidence | Status |
|---|---|---|---|---|
| Q0-001 | lint is clean without broad disables | `npm run lint -- --max-warnings=0` | `artifacts/ARO-Q0/VERIFICATION.md` | PASS |
| Q0-002 | unit/build baseline passes | npm commands | `artifacts/ARO-Q0/VERIFICATION.md` | PASS |
| Q0-003 | E2E runner is cross-platform and cleans up | Windows local + CI | `artifacts/ARO-Q0/VERIFICATION.md` | PASS |
| Q0-004 | public/fail-closed contracts pass | `npm run test:e2e` | `artifacts/ARO-Q0/VERIFICATION.md` | PASS 16/16 |
| Q0-005 | stale fake-auth assumptions are removed | hostile source/test review | `artifacts/ARO-Q0/VERIFICATION.md` | PASS |
| Q0-006 | authenticated suite is explicit and honest | prerequisite and real-target runs | `artifacts/ARO-Q0/VERIFICATION.md` | BLOCKED ON I0 |
| Q0-007 | GitHub CI enforces public gates | PR check results | PR #26, `.github/workflows/quality.yml` | PASS |
| Q0-008 | branch protection references stable checks | GitHub API | future Q0 verification | TODO / PROVIDER GATE |
| Q0-009 | bundle/performance baseline is not regressed | build output | `artifacts/ARO-Q0/VERIFICATION.md` | PASS (+0.04 kB main JS) |
| Q0-010 | no provider/schema/product expansion | diff and provider audit | `artifacts/ARO-Q0/VERIFICATION.md` | PASS |

## 25. Rollout

1. Land lint/test harness/CI on one Q0 branch.
2. Verify locally and on Vercel/GitHub PR.
3. Merge after required public checks pass.
4. Configure branch protection against stable checks if authorized.
5. Keep Q0 **IMPLEMENTED / AUTH-GATE BLOCKED** until I0 enables the authenticated suite.

## 26. Rollback / forward recovery

Revert through a normal PR. CI failures do not mutate data. If the runner leaks a process, terminate only the recorded child PID/group. Never kill broad Node/system process sets. Restore the previous workflow only long enough to diagnose; do not permanently waive required checks.

## 27. Security / privacy / Trust review

- **Reviewer:** Codex Q0 implementation review
- **Date:** 2026-08-28
- **Findings:** fake localStorage Auth in legacy journeys is prohibited; no Auth bypass may be added
- **Resolution:** separate public and real isolated Auth gates
- **Approved:** implementation passes local public/security gates; Auth verification remains blocked on I0

## 28. Product / design review

- **Reviewer:** not required for intended behavior-preserving reliability work
- **Date:** 2026-08-28
- **Findings:** public/fail-closed UI contract is current authority
- **Resolution:** no visual/product redesign
- **Approved:** yes for Q0 scope

## 29. Definition of Done

Q0 is fully VERIFIED only when:

- [ ] spec/version and acceptance evidence are complete;
- [ ] lint, unit, build and public E2E pass locally and in CI;
- [ ] authenticated suite passes against the approved I0 target;
- [ ] required branch protection is active or a founder-approved exception is recorded;
- [ ] no unresolved critical/high security/reliability finding;
- [ ] no dependency/provider/schema/product scope expansion;
- [ ] status/current-state/changelog evidence matches truth.

Until I0 exists, the maximum truthful status is **IMPLEMENTED / AUTH-GATE BLOCKED**.

## 30. Delivery record

```text
Package: ARO-Q0
Spec version: 1.0.0
Branch: feat/aro-q0-reliability-foundation
PR: #26
Commit: 464e0b8 plus evidence finalization
Acceptance: local public gates pass; Auth/branch-protection gates blocked
Unit: 61/61 PASS
Integration: public/fail-closed PASS; real Auth BLOCKED_PREREQUISITE
E2E: 16/16 PASS
RLS/security: no mutation; authenticated gate blocked on I0
A11y: public smoke only; package audits preserved
Performance: baseline 750.65 kB JS / 89.84 kB CSS
Evidence: artifacts/ARO-Q0/
Status: IMPLEMENTED / AUTH-GATE BLOCKED
```
