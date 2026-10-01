# AUTH3 verification - 2026-10-01

Status: IMPLEMENTED and verified in disposable CI; production verification PARTIAL and production/store release BLOCKED. PR #98 is stacked on PR #97; ADR-033 and AUTH3 v1.0.1 authorize implementation, not release certification.

| Evidence | Result | Provenance |
|---|---|---|
| Original local full unit suite | 221 passed, 3 existing skips | Snapshot of PR97 plus initial AUTH3 implementation; Windows worktree |
| Local lint / types / optimized build | Passed | Zero-warning lint; Next 16.3.5 webpack build |
| Original isolated SQL/Trust/auth/browser regression | Passed: 149 assertions twice, real password/refresh/recovery/global-logout and stale JWT denial | d180af7; [Isolated database 36862527548](https://github.com/leonartist7/ARO.club/actions/runs/36862527548) |
| Original full hosted Quality | Passed all four jobs | d180af7; [Quality 36862527545](https://github.com/leonartist7/ARO.club/actions/runs/36862527545) |
| Expanded context/screens/server regression | 236 passed, 3 existing skips; static checks/build passed | 9b2fc79; [Quality 36863466964](https://github.com/leonartist7/ARO.club/actions/runs/36863466964) |
| Processing-account listing regression | Isolated run passed; 150 SQL assertions | 9b2fc79; [Isolated database 36863466669](https://github.com/leonartist7/ARO.club/actions/runs/36863466669) |
| Actual worker removes Storage then Auth | Passed on ec6c641 with reviewed cleanup/receipt/Trust corrections | [Committed migration run 36867759956](https://github.com/leonartist7/ARO.club/actions/runs/36867759956); no credentials persisted |
| Enabled account screens at 360/1440, light/dark, EN/FR/ES | Passed on ec6c641 with reviewed corrections | [Enabled browser matrix 36867759956](https://github.com/leonartist7/ARO.club/actions/runs/36867759956); 24 account-screen captures |
| Committed migration after review fixes | Passed: 165/165 assertions before and after reset, actual worker, enabled browser matrix and cleanup | ec6c641; [Isolated database 36867759956](https://github.com/leonartist7/ARO.club/actions/runs/36867759956) |
| Full Quality after review fixes | Passed all four jobs; 240 unit tests plus 3 existing skips | ec6c641; [Quality 36867759902](https://github.com/leonartist7/ARO.club/actions/runs/36867759902) |
| Confirmation resend/correction and password clearance | Passed at 97103ee: 244 tests, 3 existing skips; all Quality jobs and isolated DB run passed | [Quality 36869057559](https://github.com/leonartist7/ARO.club/actions/runs/36869057559), [Isolated database 36869057740](https://github.com/leonartist7/ARO.club/actions/runs/36869057740); hosted inbox still unverified |
| Real hosted SMTP confirmation/recovery and Google consent | Not verified | Existing provider configuration evidence is not an inbox/provider journey |
| Live migration, worker credentials/cron and staffed exception review | Not performed | Live SQL tool requires approval unavailable under this session's policy; independent review pending |
| Native iOS/Android and store acceptance | Not verified | Repository supplies a web application; native/provider/store evidence remains necessary |

The local checkout recovered all 41 changed text blobs at PR97 head 48bd618 exactly. Seven unrelated RB17 binary screenshots were retained by the remote base tree, not reconstructed locally. Remote commits preserve normal ancestry on 48bd618; no branch was force-pushed. Synced project files were untouched. After local command execution became unavailable, subsequent changes were written to the isolated GitHub branch and verified by hosted CI; the scratch checkout is not the final authoritative head.

Review corrections verified at ec6c641: committed CLI migration provenance, capacity exhaustion signals, preserved cleanup targets/stages after external Auth deletion, owner-held receipt handoff for AUTH2 requests, in-progress applicant review protection and accurate irreversible-erasure consent. CI caught and corrected SQL dollar-quote corruption and a mock-order assertion error. The orphan-inventory test now rolls back its metadata fixture instead of deleting protected Storage metadata. A prior run had the repository's intermittent document-retry file-chooser failure at 1440 dark; the final committed-migration run passed that same unchanged browser assertion. No assertion or Trust control was weakened.

Changes under test: no client authority from editable age/admin metadata; recent sign-in/explicit confirmation; cross-tab owner assertion; live session/RLS denial; asynchronous account-state isolation; global logout failure; recovery cleanup retry; leased worker refusal/retry/reconciliation; private completion receipts; resolved 30-day purge. Every migration test rolls back, and the isolated runner resets synthetic accounts and removes its owned containers/network/volumes.

Operational and business limits are explicit in RUNBOOK.md. Existing booking/Trust/admin/audit accounts require a reviewed disposition process before public rollout. Daily pilot capacity and monitoring are release gates. The self-declared birth date is discarded; this is not age verification.

Supabase security advisor still reports disabled leaked-password protection. No existing personal account was erased. Neither web deletion initiation nor passing CI certifies App Store/Play compliance.

Committed migration provenance: the pinned CLI generated `20261001130907_auth3_account_lifecycle.sql` in isolated run 36866297763. Payload SHA-256: `ad62d13af058052f733657a246dc315e6c12a0d6ac42d25364451db04efc5166`. Commit ec6c641 includes this exact file in the deployment chain; CI now verifies the committed migration matches the review payload and never generates a deployment file transiently. The source-controlled migration outlives the 30-day artifact copy.

Live migration inventory (read-only): only application_trust_baseline and lock_public_default_privileges are listed. Reconcile/apply the existing I0.2 corrective/verification-history migrations before AUTH2/AUTH3. Production flags, credentials, cron and exception disposition remain gated. Seven original PR98 review findings have implementation corrections; independent acceptance of the final head remains pending.

Earlier runtime verification: `97103eea4ffd34e9b92b372865497baa1a5b1b49` passed all four Quality jobs in run [36869057559](https://github.com/leonartist7/ARO.club/actions/runs/36869057559), including 244 unit tests (3 existing skips), lint, types, production build and browser regressions. Isolated run [36869057740](https://github.com/leonartist7/ARO.club/actions/runs/36869057740) passed 165 SQL assertions twice, authenticated locale/theme/size screens, real Storage/Auth erasure, recovery/logout, stale JWT denial, reset and cleanup. The evidence update at c9ab6ef changed documentation only; the continuation below introduces the later AUTH3 v1.0.1 runtime repairs.

## 2026-10-01 continuation from c9ab6ef

Recovered PR #97 and the newer PR #98 before publishing any repair. PR #99 Circle Builder preparation is a separate lane; none of its files are modified.

Baseline exact head c9ab6ef passed all four Quality jobs in [36870505325](https://github.com/leonartist7/ARO.club/actions/runs/36870505325). Isolated [36870505482](https://github.com/leonartist7/ARO.club/actions/runs/36870505482) failed at BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_DARK. This is the observed stage, not proof of a root cause. No assertion, timeout or file chooser interaction is weakened.

AUTH3 v1.0.1 defect repairs: verified PKCE recovery metadata overrides stale navigation; malformed navigation cookies cannot reject valid account exchanges; profile responses match both account and request generation, including same-account eligibility changes; neutral signup/recovery copy avoids claiming an account/email action the provider deliberately conceals. Focused regression cases cover those boundaries. No dependency, SQL, migration, worker, retention or payment change.

Local exec still cannot start (sandbox provisioning failed). Verification therefore uses repository CI. Runtime commit `526774b0cbacc86f814e3d533aadef5311ee7843` passed all four Quality jobs in [36894695807](https://github.com/leonartist7/ARO.club/actions/runs/36894695807): 249 unit tests with 3 existing skips, zero-warning lint, TypeScript, production build and browser regressions. Isolated run [36894695790](https://github.com/leonartist7/ARO.club/actions/runs/36894695790) passed 165 SQL assertions before and after reset, password/refresh/recovery/logout boundaries, actual Storage/Auth erasure, the authenticated locale/theme/size matrix and cleanup. The unchanged document chooser assertion passed. This follow-up records evidence only; runtime/migration are unchanged. Exact-head documentation checks are tracked on PR #98, and independent final-head security/privacy acceptance is still pending. Production erasure was not invoked. Read-only table/advisor tools confirm the selected backend is healthy with RLS and no booking/teacher records at inspection; leaked-password protection remains disabled. Arbitrary SQL inspection was rejected because approval is unavailable; table/advisor inspection worked. This does not authorize bypassing live migration review.

Official requirements reviewed on 2026-10-01: [Apple account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/), [Google Play account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), and [Apple login services](https://developer.apple.com/app-store/review/guidelines/#login-services). Both account deletion completion/associated data and native/provider/store evidence remain applicable release gates.


## Hosted deployment configuration correction

The runtime repair's automatic Vercel preview `dpl_7ZvpXsEK5VdQAqx5mHc4gwKwMUnJ` failed with `STATIC_BUILD_NO_OUT_DIR`; deployment metadata confirms the project's inherited framework was `vite`, expecting `dist`, while `package.json` builds Next.js. Repository `vercel.json` explicitly selects `nextjs` and `.next` using [Vercel's documented framework/output overrides](https://vercel.com/docs/project-configuration/vercel-json). The existing daily account-deletion cron is preserved; feature flags, credentials and live migration/activation are unchanged. Resulting preview and exact-head checks are tracked on PR #98. No hosted inbox/provider/native readiness is implied by a successful build.
