# AUTH3 verification - 2026-10-01

Status: PARTIAL; production/store release BLOCKED. PR #98 is stacked on PR #97; ADR-033 and AUTH3 v1.0.0 authorize implementation, not release certification.

| Evidence | Result | Provenance |
|---|---|---|
| Original local full unit suite | 221 passed, 3 existing skips | Snapshot of PR97 plus initial AUTH3 implementation; Windows worktree |
| Local lint / types / optimized build | Passed | Zero-warning lint; Next 16.3.5 webpack build |
| Original isolated SQL/Trust/auth/browser regression | Passed: 149 assertions twice, real password/refresh/recovery/global-logout and stale JWT denial | d180af7; [Isolated database 36862527548](https://github.com/leonartist7/ARO.club/actions/runs/36862527548) |
| Original full hosted Quality | Passed all four jobs | d180af7; [Quality 36862527545](https://github.com/leonartist7/ARO.club/actions/runs/36862527545) |
| Expanded context/screens/server regression | 236 passed, 3 existing skips; static checks/build passed | 9b2fc79; [Quality 36863466964](https://github.com/leonartist7/ARO.club/actions/runs/36863466964) |
| Processing-account listing regression | Isolated run passed; 150 SQL assertions | 9b2fc79; [Isolated database 36863466669](https://github.com/leonartist7/ARO.club/actions/runs/36863466669) |
| Actual worker removes Storage then Auth | Verification added; final run pending | tools/ci/deletion.mjs uses disposable API clients and the real TypeScript worker, with no credentials persisted |
| Enabled account screens at 360/1440, light/dark, EN/FR/ES | Verification added; final run pending | Disposable authenticated browser matrix captures empty eligibility and deletion confirmation states |
| Real hosted SMTP confirmation/recovery and Google consent | Not verified | Existing provider configuration evidence is not an inbox/provider journey |
| Live migration, worker credentials/cron and staffed exception review | Not performed | Live SQL tool requires approval unavailable under this session's policy; independent review pending |
| Native iOS/Android and store acceptance | Not verified | Repository supplies a web application; native/provider/store evidence remains necessary |

The local checkout recovered all 41 changed text blobs at PR97 head 48bd618 exactly. Seven unrelated RB17 binary screenshots were retained by the remote base tree, not reconstructed locally. Remote commits preserve normal ancestry on 48bd618; no branch was force-pushed. Synced project files were untouched. After local command execution became unavailable, subsequent changes were written to the isolated GitHub branch and verified by hosted CI; the scratch checkout is not the final authoritative head.

Changes under test: no client authority from editable age/admin metadata; recent sign-in/explicit confirmation; cross-tab owner assertion; live session/RLS denial; asynchronous account-state isolation; global logout failure; recovery cleanup retry; leased worker refusal/retry/reconciliation; private completion receipts; resolved 30-day purge. Every migration test rolls back, and the isolated runner resets synthetic accounts and removes its owned containers/network/volumes.

Operational and business limits are explicit in RUNBOOK.md. Existing booking/Trust/admin/audit accounts require a reviewed disposition process before public rollout. Daily pilot capacity and monitoring are release gates. The self-declared birth date is discarded; this is not age verification.

Supabase security advisor still reports disabled leaked-password protection. No existing personal account was erased. Neither web deletion initiation nor passing CI certifies App Store/Play compliance.
