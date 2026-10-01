# N1-R1 reset diagnostic
Version1.0.0 — SPEC-READY, 2026-09-23. Existing N1/I0.2 disposable verification authority; founder readiness execution instruction. No product/provider behavior change.

Base3075a89111e03519312bdc57ad96196f4ec1d794, existing PR63 branch owner only. Claim N1-RESET-DIAG-20260923-001 requires ledger readback before work. Original platform35791700725/job106961466694 failure and cleanup retained in results/N1-R1-CI-FAILURE-20260923.md. Independent reviewer /root/ready1_trust_review recommends this bounded diagnostic; root cause unknown.

Exact code allowlist: tools/ci/run.mjs, tools/ci/auth.mjs, new tools/ci/reset-diagnostic.test.mjs. No product/boundary.mjs/SQL/config/dependency/workflow changes. Controller owns spec/ledger/evidence.

Emit fixed allowlisted markers: RESET_CLI_STARTED/COMPLETED; ZERO_USERS_STARTED/COMPLETED; RESET_CREDENTIAL_REQUEST_STARTED; RESPONSE_RECEIVED; EXPECTED_STATUS_ACCEPTED; JSON_PARSE_COMPLETED; REMOVED_ACCOUNT_ASSERTION_PASSED. Instrument existing request only when confirmReset invokes diagnostic mode, no duplicate implementation or request. On failure emit only last stage and one fixed classifier TIMEOUT/ABORT/TRANSPORT/JSON_PARSE/ASSERTION/OTHER determined from known exception types or fixed stage. No arbitrary message/cause/stack/object body/property logging. Optional HTTP status integer100–599 only. Untrusted values never form diagnostic strings.

Preserve one actual password request, expected400, no returned access token; exact zero-user assertion, repeat91SQL, existing timeouts, failure exit/resource ownership/mandatory cleanup. No health poll,retry,delay,timeout increase,status expansion, suppressed failure or product fix.

Pure tests: normal400JSON rejection yields ordered markers; request rejection/timeout safe category; unexpectedHTTP still fails; malformedJSON/body read failure still fails with stage evidence; returned token fails RESET_ACCOUNT_SURVIVED; sentinel secrets in errors/bodies/URLs/credentials never appear; non-diagnostic Auth calls unchanged. Use module behavior tests, not copied logic. Syntax and relevant pure guard tests, lint/build per governing contract. No real database/browser/provider/local harness execution.

Owner implements and returns immutable candidate, exact diff and pure test results before push. Independent finished-diff review required before a single diagnostic successor CI attempt. Stop on unexpected scope/semantics. Passing successor does not explain prior failure. No second automatic attempt, merge or deployment.
