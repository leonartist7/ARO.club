# N1 reset diagnostic — authorized successor result

PR63: https://github.com/leonartist7/ARO.club/pull/63 (draft, not merged by this task).
Exact reviewed head: `0661589affcf54a1324e489b09afb213a1a4019f`.
GitHub merge candidate: `7329545a90cd81fbbea3a94b31d0e48a8e270468`.
Controller ledger v54 authorized this one successor following independent diagnostic acceptance at `d91e617063c348d506a22269c6fec91b74ff5ee9`.

| Workflow / job | Result |
|---|---|
| Quality35793098248 / static106966002258 | SUCCESS |
| Quality35793098248 / browser-smoke106966002674 | SUCCESS |
| Isolated database35793098393 / platform106966002781 | SUCCESS; API readback confirms attempt1 and exact reviewed head |

The platform log records every diagnostic marker in this order:

1. RESET_CLI_STARTED
2. RESET_CLI_COMPLETED
3. ZERO_USERS_STARTED
4. ZERO_USERS_COMPLETED
5. RESET_CREDENTIAL_REQUEST_STARTED
6. RESPONSE_RECEIVED
7. EXPECTED_STATUS_ACCEPTED
8. JSON_PARSE_COMPLETED
9. REMOVED_ACCOUNT_ASSERTION_PASSED

No diagnostic failure classifier was emitted. Exact five-account count passed, followed by reset, zero-user assertion and removed-account credential rejection (expected400 and no returned access token). First and repeated pgTAP91/91 passed. Four-context applicant browser matrix passed in73.15seconds; password/refresh, API Trust boundaries, recovery, global logout and both owned-resource cleanup checks passed. Reset phase took23.81seconds.

## Artifact integrity

- ID10722911475, `i0-2-authenticated-baseline`, 4011617bytes.
- Provider and independent local SHA256 match: `b8704c497ed5a5115903e5a62bfa33dc2e7b4f8eea6d6f6562d708c934d52cd5`.
- Local: `C:/Users/leona/Documents/Web dev/ARO/N1-reset-diagnostic-evidence-20260923/n1-reset-0661589-platform.zip`.
- GitHub: https://github.com/leonartist7/ARO.club/actions/runs/35793098393/artifacts/10722911475
- Provider expiry2026-09-29T22:38:51Z.
- Quality run has no workflow artifacts.

## Historical failure and limits preserved

Initial platform35791700725/job106961466694 on3075a891 remains FAILED at reset-removes-accounts with suppressed UNEXPECTED_FAILURE. Its original archive10722217174 and digest `d969991e0a937b30d133aff994b19c9bf4fc5381c06d47266a7ea96d7a182088` remain preserved under `N1-applicant-decision-evidence-20260923`. The successful diagnostic successor does not explain or retroactively pass that earlier run. No transient/network cause or corrective runtime effect is inferred.

No source changes or reruns after reviewed diagnostic push. No merge, manual deployment, provider operation or resumed V1 execution. Existing automatic Git integrations are not production release approval. Public-reason reviewer lifecycle, cross-user/private-note/real UI acceptance remains separately required in N1-V1. This result does not accept hosted Auth/SMTP, I02-08, F7 or P1.
