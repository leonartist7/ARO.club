# N1-R1 initial CI — stop on reset failure

PR: https://github.com/leonartist7/ARO.club/pull/63 (draft, unmerged)
Exact reviewed/pushed head: `3075a89111e03519312bdc57ad96196f4ec1d794`
Base: `f37dc084d7172415f581a41e90d2edd9ba3738b9`
GitHub generated merge candidate: `9d7af04546d4697467165bb8421784fb3e94ac58`

Controller v52 authorized exact candidate push and one initial normal CI attempt following independent acceptance. No source changes, retries or reruns performed after review. No merge, manual deployment or provider change performed. Existing Vercel integration reported a successful status automatically; that is not production/Auth acceptance.

| Workflow / job | Result |
|---|---|
| Quality `35791700701`, static `106961466555` | SUCCESS; full unit suite 175 passed / 3 skipped; lint, type-check, build and tooling checks passed |
| Quality `35791700701`, browser-smoke `106961466807` | SUCCESS |
| Isolated database `35791700725`, platform `106961466694` | FAILURE at `reset-removes-accounts`: `UNEXPECTED_FAILURE` (service details intentionally suppressed) |

Platform phases explicitly passing before failure: fresh ownership, startup/loopback, initial reset, first pgTAP91/91, signup five users, password/refresh, application Auth/Trust boundaries, four-context authenticated browser matrix, recovery/password change, global logout/refresh denial, exact synthetic account count. Authenticated browser phase took 62.75 seconds.

The reset-removes-accounts phase did not pass. This record does not infer whether failure occurred during reset, zero-count verification or the credential recheck. Repeat SQL91 was not reached. Do not certify 91 assertions twice or completed reset/credential rejection from this run.

Primary finally cleanup passed (6.13 seconds). Separate always-run `node tools/ci/run.mjs --cleanup` also passed. These prove owned resource cleanup checks, not the failed reset phase's acceptance.

## Artifact

- ID: `10722217174`
- Name: `i0-2-authenticated-baseline`
- Run: `35791700725`
- Bytes: `4009832`
- SHA-256, provider digest and independently downloaded bytes match: `d969991e0a937b30d133aff994b19c9bf4fc5381c06d47266a7ea96d7a182088`
- Local archive: `C:/Users/leona/Documents/Web dev/ARO/N1-applicant-decision-evidence-20260923/n1-r1-3075a89-platform.zip`
- GitHub: https://github.com/leonartist7/ARO.club/actions/runs/35791700725/artifacts/10722217174
- Provider expiry: 2026-09-29T22:23:04Z.
- Quality run returned no workflow artifacts.

Status: initial CI FAILED / controller diagnosis required. No root cause, flakiness or product culpability is claimed from the suppressed error. No automatic retry/fix. Real reviewer lifecycle and new public-reason API/UI evidence remain outstanding in N1-V1. Preserve this result even if a later separately authorized run succeeds.
