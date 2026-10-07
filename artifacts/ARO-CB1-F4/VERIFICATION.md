# CB1-F4 verification and restart checkpoint

Status: IMPLEMENTED / PARTIAL LOCAL VERIFICATION. No production merge/release acceptance.
Base: f7adc10a40fa5388b8b1956bd80160b7f72cc990. Prior Phase4 #104 is actually merged at this base; its head was d376251a5b87490655d1d61146de06a11af76942.
Runtime authority was committed locally before source (cb6c416, then b1b6490 scope clarification) and published remotely before runtime at 038881c73ded7e3fb20e6b4bfbf9fb85c72bb4ad. Branch: codex/cb1-f4-integration-20261007. SOURCE-MANIFEST.json identifies exact local payloads; source/head integration and hosted checks must be read from the live PR.

## Implemented behavior
Connected Create reuses accepted Choose/Shape/Details/Review/Ready modules, optional guides and actual entered summaries. EN/FR/ES exit confirmation, component-only state, targeted edits and reset remain. Legacy learn→Languages/share→Skills; gather/unknown→unselected Choose. There is one existing central shell World exit. Selected group/input installs a navigation guard for owned same-tab anchors/shared programmatic navigation; cancel keeps data/focus, confirm releases before one navigation. Modified/new-tab/download/fragment behavior is preserved. Beforeunload is conditional and removed on reset/unmount. Browser Back/Forward/mobile termination remain disclosed best-effort loss.

## Actual local checks — 2026-10-07 UTC / Oct8 Paris
- npm ci --ignore-scripts --no-audit --no-fund: passed, lockfile unchanged.
- npm run build: passed, all 54 generated routes; inherited caniuse-lite age warning recorded, no dependency update.
- npm run lint -- --max-warnings=0: passed.
- npm run type-check: passed.
- npm test -- --maxWorkers=2: 267 passed, 3 existing browser-evidence skips, 29 test files passed; 9 new connected-route/navigation cases. The first run failed only because the new profile selector used case-sensitive /Profile/; corrected to /profile/i and full suite passed. Failure retained here.
- node --check scripts/verify-cb1-f4.mjs and git diff --check: passed.
- node --test tools/autonomy/core.test.mjs: all 24 tests passed; existing audit-only tooling and C1 semantics remain unchanged.
- Required Chromium151.0.7922.34/revision1234 was absent. npx playwright install chromium failed: downloaded archives were invalid/truncated (End of central directory record signature not found). Installer attempted its own mirrors; no substitute browser/version was used. No local production-browser capture or performance PASS is claimed.

## Criterion matrix
| Criterion | Evidence | State |
|---|---|---|
| Five-step flow, manual three-group completion, actual summary/edit/reset | AppCreatePage.test.jsx + retained F2/F3 regressions | Local component PASS; real browser pending |
| Legacy modes and shell action | entry-state regression + retained AppShell/explicit World-exit assertions | Local PASS |
| Cancel/discard/header/programmatic guard, dialog exclusion, owner cleanup and unload | route/guard unit regressions | Local PASS; actual external/new-tab/reload/back evidence pending |
| No entered text transported/persisted | component fetch/storage regressions; real route canary harness prepared | Partial, browser canary pending |
| Phone/desktop/theme/locale/a11y/guide failure | unchanged accepted modules + new 30-case route harness wired into CI | Pending actual execution/captures and extended keyboard/failure review |
| Paired performance budget | current measurement explicitly selects guided mode, preserves original baseline mode/image accounting | BLOCKED on browser; fresh paired immutable-base measurement still required |
| Exact-head hosted checks and independent reviews | actual draft PR controls execution | Pending; self-review is not independent acceptance |

No RLS, schema, account, provider, Trust, payment or dependency payload changed. Replaced Create-only fixture selectors follow the declared new UI while retaining reversible/no-network/reload assertions. Other discovery assertions remain intact. Generated browser output is ignored; CI retains it for review. No current report claims the prepared browser script has run.

## Scheduled handoff
Founder requested recurring implementation on Oct7. ARO Build Continuation is enabled around08:00/19:00 Europe/Paris; ARO Quality Check is enabled around15:00, with flexible execution within an hour. Existing C1 schedule remains unchanged. Build task:6ac6c0d8d6188191bf44fb7942c05e62; read-only quality:6ac6c0da6bb48191adb2c0335c19eeef. These are scheduler receipts, not evidence future work has executed.

## Resume
1. Read current remote main and this branch/PR, governing spec, source manifest, actual required checks/reviews and writer activity. Resume this PR; preserve AUTH2#97/AUTH3#98/ORG1#101.
2. Acquire the pinned browser through a working authorized environment; execute existing + new route/browser gates. Retain failures and fix root causes. Add/verify external/modified/download/fragment links, real reload/back, guide failure, short-phone keyboard and all category paths.
3. Build and measure a clean immutable base separately and current payload with identical browser/harness/settings, three samples per case. Compare unchanged PERFORMANCE budgets; do not compare current metrics only to stale historical numbers.
4. Required independent privacy/Trust and product/design/a11y review, exact-head all checks, then normal protected integration and deployment/flow readback. No self-accepted release.
5. Only then advance dependency-satisfied saved-draft/account/scanner packages. Scanner source: ARO_CAFFI_Restaurant_Scanner_Implementation_Spec.md in the user’s files, libfile_a1581b0a0708819189e9183fe29bf4b6. SCAN-00 contracts/integration qualification precede SCAN-01 website collectors; no simulated scores or paid-provider activation.
