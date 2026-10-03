# N1-RESET-DIAG-20260923-001 — local diagnostic candidate

Status: IMPLEMENTED / PURE CHECKS PASSED / INDEPENDENT FINISHED-DIFF REVIEW PENDING.

- Checkout: `C:/Users/leona/Documents/Web dev/ARO/ARO-n1-applicant-decision-repair-20260923`
- Branch: `codex/n1-applicant-decision-repair-20260923` (existing PR63 owner).
- Base: `3075a89111e03519312bdc57ad96196f4ec1d794`.
- Local candidate: `0661589affcf54a1324e489b09afb213a1a4019f`.
- Governing spec: controller `5ee756f80d5482dcce44d4163124155948ea7838`, `specs/ARO-N1-RESET-DIAGNOSTIC.md`, blob `db1287e17075c9aefe10706adbfad7576549f554`.
- Exact diagnostic diff: `tools/ci/run.mjs`, `tools/ci/auth.mjs`, `tools/ci/reset-diagnostic.test.mjs`; three files, 188 insertions / 10 deletions.

## Behavior

Fixed markers surround original reset CLI, exact zero-account assertion, the one original password request, response receipt, expected-status check, JSON parsing and removed-account assertion. A closed-vocabulary diagnostic emits last stage plus exactly one of TIMEOUT/ABORT/TRANSPORT/JSON_PARSE/ASSERTION/OTHER on failure. Duplicate reporting between confirmation and runner catch is suppressed, but original exception is rethrown; runner exit and mandatory cleanup remain unchanged.

No error message, stack, cause, response/body, URL, credentials or key is interpolated into diagnostic output. No optional HTTP value was added. Classification indicates a safe exception type or operation stage, not a proven root cause. Non-diagnostic Auth calls emit no reset markers. The removed-account request remains one POST/password request expecting400 and asserting no access token. No retry, health probe, wait, status expansion, timeout change or assertion weakening.

## Checks

| Command | Result |
|---|---|
| `node --test tools/ci/reset-diagnostic.test.mjs tools/ci/boundary.test.mjs` | exit0, **25/25**:14 new diagnostic cases +11 existing boundaries |
| `node --check tools/ci/auth.mjs` | exit0 |
| `node --check tools/ci/run.mjs` | exit0 |
| `node --check tools/ci/reset-diagnostic.test.mjs` | exit0 |
| `npm run lint` | exit0 |
| `npm run build` | exit0; Next production compilation and TypeScript passed |
| `git diff --check` / staged check | exit0 |

Pure tests cover normal400 JSON rejection and ordered markers, request TypeError/timeout/abort/unknown exception, unexpected200/401/403/500, malformed JSON, body-read rejection, returned token, non-diagnostic Auth behavior and marker allowlisting. Sentinel secret values remain absent from diagnostics. Tests exercise exported module behavior with mocked fetch; no real network/Auth/SQL/browser calls occur. New pure test file was not added to workflows, which remain unchanged.

## Preservation and limits

All product files are byte-identical to reviewed3075a891. Boundary helper, SQL/config/migrations, dependencies, workflow, original account counts,91SQL assertions/repeat, timeout settings and browser matrix are unchanged. Paused V1 files and previous failure archive were not touched. Worktree clean after local commit.

No push, successor CI, local database/platform harness, browser execution, provider operation, merge or deployment. PR63 remains at previous pushed3075a891 until controller approval after independent review. Original platform run35791700725 failure remains unexplained; this instrumentation is not a fix. Even a passing successor would not explain the historical failure. Controller must authorize the single diagnostic successor attempt separately.
