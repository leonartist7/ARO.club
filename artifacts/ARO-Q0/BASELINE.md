# ARO-Q0 Reliability Baseline

> Date: 2026-08-28
>
> Branch: `feat/aro-q0-reliability-foundation`
>
> Base: `3e66b60311ef7f660dbc0b25c41ad8e0c3d8fcdd`

## Automated state

| Gate | Baseline |
|---|---|
| Unit | 2 files / 61 tests PASS |
| Build | PASS, 2,601 modules |
| Main JS | 750.65 kB minified / 229.96 kB gzip; >500 kB warning |
| CSS | 89.84 kB minified / 13.92 kB gzip |
| Lint | FAIL: 19 errors / 9 warnings |
| Legacy E2E | FAIL: 11 passed / 18 failed after host workarounds |
| GitHub Actions | absent |
| Main branch protection | absent |

## Lint debt categories

- 10 Fast Refresh export-layout errors;
- 9 unused variable/argument errors;
- 9 React Hook dependency warnings.

The exact command output is preserved in `artifacts/ARO-P1-BASELINE/VERIFICATION.md` and the I0 verification rerun.

## E2E portability defects

1. `e2e/run.mjs` spawns `npm` directly and kills a negative process-group PID, which is not portable to Windows.
2. `e2e/harness.mjs` defaults to one hard-coded Linux Chromium path.
3. The legacy journey seeds `conversa-player` localStorage and treats it as authentication, but `ProtectedRoute` now uses real Supabase Auth and redirects signed-out users to `/login`.
4. The signed-out sweep still expects `/choose-role`.
5. Authenticated P1/Trust journeys cannot run until I0 supplies a safe isolated target and synthetic account.

## Scope boundary

Q0 may clean lint, portable process/browser discovery, public/fail-closed contracts and CI. It may not add an Auth bypass, change product authorization, add a dependency or create provider infrastructure.
