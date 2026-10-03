# ARO.club integration source ledger — 2026-09-27

Target: `leonartist7/ARO.club` only. Caffi.pro is outside this audit. The starting GitHub `main` was `e1ad70529d292879b5f1f29915df18fbf63f5948` (merged PR #47). After protected squash merge of R2 PR #69, GitHub `main` was fetched and verified at `dc73daaef13810cb7e4da80a8ff7eeb539f9dfc3`. The old local `ARO.club/main` is `606d06b` and must not be pushed over GitHub main.

Method: inventory local worktrees, working-tree status, stashes, commits, GitHub branches and open PRs; compare commit ancestry **and** changed files with current main so squash merges and older copies are not mistaken for missing work. Task/status documents supplied authority and intended scope; actual Git diffs determined whether content was present. The clean `ARO-main-audit-20260927` worktree is pinned to refreshed main. All source checkouts remain intact. The snapshot directories here contain each dirty checkout's `HEAD.txt`, `status.txt`, binary `tracked.patch`, and copies of untracked files.

## Reconciled packages awaiting governed merge

| Package and source | Disposition and diff | Validation | Remaining gate |
| --- | --- | --- | --- |
| EMAIL0: `ARO-email-setup` at `ddde33e` plus dirty verification notes | [PR #68](https://github.com/leonartist7/ARO.club/pull/68), `46b1ef5`, draft; seven documentation/evidence files, no provider write | local build/lint and required GitHub static/platform/browser-smoke pass on original base | Independent security review; hosted signup/callback/password cycle; sender-auth evidence. Automatic approval review rejected its merge while those gates remain open. Refresh against new main after closing them. |
| R2 yellow brand: older `ARO.club` dirty tree and assets | [PR #69](https://github.com/leonartist7/ARO.club/pull/69), `9b375fe`, **MERGED** as `dc73daa`; 50 brand/token/font/UI/evidence files reconstructed on then-current main. Did not copy older FV1 pages over current ones. | local build/lint, 175 tests pass (3 skipped); mobile/desktop light/dark browser check and screenshots; required GitHub static/platform/browser-smoke pass. Fresh visual inspection of all five saved screenshots found readable text, intact navigation/content, responsive light/dark treatment. | Production deployment/release and full-route accessibility were not part of the GitHub merge. |
| N1 Auth callback/recovery: older `ARO.club` dirty tree | [PR #70](https://github.com/leonartist7/ARO.club/pull/70), `4397d04`, draft; callback, context, test, error copy and reconciliation evidence. Older auth config/proxy files were deliberately excluded because they would reverse current production-account safeguards. | local lint; focused 9/9 tests; build exit 0 with disk-full cache warning; required GitHub static/platform/browser-smoke pass | Hosted signup/recovery/password cycle, role lookup (`PGRST106` from unexposed `api` schema), security/privacy review. |

Each package has its own branch/PR and has been attached to the Codex task. #68 and #70 were based on the prior main and now require current-main refresh before any future merge. Inspect the final diff and rerun required checks after such a refresh. No direct or force push to main is authorized by this ledger.

## Local sources and decisions

| Source | Disposition |
| --- | --- |
| `ARO.club` local `codex/nextjs-migration` at `606d06b` with extensive uncommitted files | Preserved under `ARO.club/` snapshot here. Core Next migration is already on GitHub main through PR #47. Newer dirty R2 and Auth work is represented in #69/#70. The RevenueCat preview remains excluded below. Never wholesale merge this older tree: it would regress current FV1 and auth protections. |
| `FV1-docs` at `d0c6fdb` plus dirty files | Commit is the head of merged PR #41. Dirty migration copies largely precede current main. Four novel untracked baseline artifacts are preserved in its snapshot for later F7/verification use; they are not evidence that F7 passed. |
| `ARO-email-setup` at `ddde33e` plus dirty files | Five unmerged documentation commits and local verification notes reconciled in #68; source retained. |
| `ARO-n1-v1-resume-20260923` at `0661589` plus three tracked edits and four untracked `tools/ci` files | **In progress, excluded from merge.** This is a substantial provider-dependent synthetic applicant/reviewer reliability extension wired into CI. The ten isolated `node --test tools/ci/reliability.test.mjs` tests pass; no disposable hosted end-to-end result or independent security review exists. Preserved in its snapshot. Its package authority and CI interaction must be reconciled separately before a PR. |
| `ARO-n1-remaining-verification-20260922` | Two untracked `reliability-fixtures.mjs`/`reliability.test.mjs` files are an earlier subset of the V1 work above. Retain source; do not apply twice. |
| `ARO-vercel-rollout` at `66d77df` | Exact PR #54 head; merge content already on main (`b44c82f`). |
| `ARO-auto0-nextjs-compat`, `ARO-merge-reconciliation`, `ARO-n1-applicant-decision-repair`, `ARO-ci-readiness`, `ARO-pr47-reconcile`, `ARO-shipaton-sprint` | Branch tips are main-contained, or their remaining work is represented by the separate open PRs below. No additional commit transfer from these tips. |
| `ARO-pr48-reconcile` at `eb2e76b` | Separate F7 draft [PR #48](https://github.com/leonartist7/ARO.club/pull/48); held by exact-browser/runtime acceptance, independent and human review. Passing generic CI does not mark F7 accepted. |
| Local stashes | None found in inspected active worktrees. Original working trees and snapshot copies remain recoverable. |

RevenueCat preview files in the older migration tree (`src/app/app/subscription`, `src/lib/revenuecat`, `docs/REVENUECAT_SETUP.md`, draft RC1 spec) are **experimental/excluded**: `specs/ARO-RC1-DIGITAL-PURCHASES-DRAFT.md` is not SPEC-READY and the AGENTS contract forbids live money work without the approved package. Provider/dashboard state is outside Git and was not promoted.

## Open GitHub PR inventory at refresh

The following PRs are not silently absorbed by #68–#70. They retain their existing owners, branches and gates. A green generic CI result alone does not override a draft, specialist review, dirty/behind base, or blocked package acceptance.

| PRs | Source state / next integration condition |
| --- | --- |
| [#67](https://github.com/leonartist7/ARO.club/pull/67), [#65](https://github.com/leonartist7/ARO.club/pull/65), [#64](https://github.com/leonartist7/ARO.club/pull/64) | Stacked Season art / experience-foundation reconciliation / frontend handoff drafts. Stacked bases, failing platform (and #67 browser) checks; dependency and approval review required. |
| [#62](https://github.com/leonartist7/ARO.club/pull/62), [#61](https://github.com/leonartist7/ARO.club/pull/61), [#60](https://github.com/leonartist7/ARO.club/pull/60) | READY1/PV1/EF1 drafts. #62 is behind main; #60 is dirty with failing platform; #61 is stacked on #60. Rebase/reconcile dependency chain and hosted gates before merge. |
| [#59](https://github.com/leonartist7/ARO.club/pull/59) | Money-strategy docs, non-draft but behind main; verify founder-approved scope, specialist money review and refreshed diff before merge. No runtime money behavior is accepted. |
| [#55](https://github.com/leonartist7/ARO.club/pull/55) | Shipaton/controller draft stacked on the controller branch; requires its governed acceptance. |
| [#53](https://github.com/leonartist7/ARO.club/pull/53), [#52](https://github.com/leonartist7/ARO.club/pull/52), [#51](https://github.com/leonartist7/ARO.club/pull/51), [#50](https://github.com/leonartist7/ARO.club/pull/50), [#49](https://github.com/leonartist7/ARO.club/pull/49) | I0/Trust corrective and controller/handoff drafts. #53/#52/#51/#49 are merge-dirty; #53/#52 platform fail; #50 behind. Reconcile each against present main and preserve independent Trust/security review. |
| [#48](https://github.com/leonartist7/ARO.club/pull/48) | F7 blocked acceptance evidence; exact execution/browser and human gates remain. |
| [#36](https://github.com/leonartist7/ARO.club/pull/36), [#17](https://github.com/leonartist7/ARO.club/pull/17), [#16](https://github.com/leonartist7/ARO.club/pull/16), [#15](https://github.com/leonartist7/ARO.club/pull/15) | Older tool/spec/security/harness PRs. #36 behind; #17/#16/#15 merge-dirty; #15 verify check failed. Require current-main diff/content audit and package authority before use. |
| [#8](https://github.com/leonartist7/ARO.club/pull/8), [#7](https://github.com/leonartist7/ARO.club/pull/7), [#6](https://github.com/leonartist7/ARO.club/pull/6), [#5](https://github.com/leonartist7/ARO.club/pull/5) | Legacy Tonguee/phase stack on non-main branches. Historical candidates, not approved ARO main packages; #5 dirty. Preserve as source, do not cascade-merge. |

## Delivery boundary

After the documentation-only ledger/status PR #71 passed all required checks and merged, the final fetched GitHub main is `fdda8106fc2c0df472f4349728da000ea5af65fe`. EMAIL0 #68 and N1 Auth #70 remain draft with explicit review/provider gates. The next executor should use this ledger and the original worktrees as sources, close those gates, refresh remote state, merge each eligible package through branch protection in dependency order, and verify the resulting GitHub main SHA. Caffi.pro requires a separate audit.
