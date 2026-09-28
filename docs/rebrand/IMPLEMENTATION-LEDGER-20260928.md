# Orange rebrand implementation ledger — 28 September 2026

> **Latest reconciliation (2026-09-28):** RB7–RB10 incorporate exact RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main `721b2b7` / PR #83 local Manrope. Final local build/lint/types and 185 tests pass (3 existing skips). Fresh hosted checks remain required; current RB7 platform fails the teacher-document retry chooser (details below). Prior-head results are historical. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent review and release gates remain open.

At the final cloud read, GitHub `main` is `721b2b7fdd3dda0072d189e43d717ef00c7723b2` (advanced externally during this task; this task did not update `main`). RB0–RB10 are stacked, unmerged review branches. No package is SHIPPED. This ledger supplements the [actual route classification](BASELINE-20260927.md), package specifications and per-package browser evidence; it does not override release or specialist gates.

| Package | Scope and evidence | Status / PR |
| --- | --- | --- |
| RB0 | Founder-approved palette, open-O/dot identity, route/asset baseline, ADR-031 | IMPLEMENTED / PARTIAL VERIFICATION [#72](https://github.com/leonartist7/ARO.club/pull/72); review threads open |
| RB1 | Shared tokens, controlled SVG mark, locally served Manrope fallback, shared primitives | IMPLEMENTED / PARTIAL VERIFICATION [#73](https://github.com/leonartist7/ARO.club/pull/73) |
| RB2 | Three illustrated, skippable scenes and in-memory learner/host/both result preview; [art manifest](../../public/brand/onboarding-manifest.json) | IMPLEMENTED / PARTIAL VERIFICATION [#74](https://github.com/leonartist7/ARO.club/pull/74); independent privacy/security review open |
| RB3 | Home/Explore/Create first actions and truthful no-verified-supply state | IMPLEMENTED / PARTIAL VERIFICATION [#75](https://github.com/leonartist7/ARO.club/pull/75) |
| RB4 | Legacy fixture deep links recover without invented hosts, reviews or bookings | IMPLEMENTED / PARTIAL VERIFICATION [#76](https://github.com/leonartist7/ARO.club/pull/76) |
| RB5 | About, How, For Teachers, FAQ, Contact draft and public footer | SPEC-REQUIRED / independent contact-draft privacy review pending; provisional implementation [#77](https://github.com/leonartist7/ARO.club/pull/77) |
| RB6 | Public leaderboard/bookings become truthful preview states | IMPLEMENTED / PARTIAL VERIFICATION [#78](https://github.com/leonartist7/ARO.club/pull/78) |
| RB7 | Quiet Preferences, Light/Dark/System, EN/FR/ES app shell, mobile navigation | IMPLEMENTED / PARTIAL VERIFICATION [#79](https://github.com/leonartist7/ARO.club/pull/79); inherited hosted failure repaired; see cloud evidence below |
| RB8 | Branded localized loading/error states, retry/Home, redirect-safe route sweep | IMPLEMENTED / PARTIAL VERIFICATION [#80](https://github.com/leonartist7/ARO.club/pull/80); inherited hosted failure repaired; see cloud evidence below |
| RB9 | Controlled 1200×630 OpenGraph/Twitter image and metadata | IMPLEMENTED / PARTIAL VERIFICATION [#81](https://github.com/leonartist7/ARO.club/pull/81); inherited hosted failure repaired; see cloud evidence below |
| RB10 | Login/Signup/Forgot Password localized presentation and truthful disabled preview | IMPLEMENTED / PARTIAL VERIFICATION [#82](https://github.com/leonartist7/ARO.club/pull/82); fresh reconciled-head hosted checks required; prior results below |

## Coverage and remaining work

- **Public:** Home, Explore, story/help, legacy recovery, future-route states, signed-out account entry, shared navigation and metadata have scoped changes. Legal text keeps its existing meaning. Protected `/games`, `/shop` and `/character-builder` remain future only.
- **App:** Home/Create/discovery and shared shell have scoped changes. Accepted FV-1 F1–F6 World, opportunity, commitment, Circles, messages, profile, library, insights and settings semantics remain; RB7 makes settings preferences functional. Full fixture-content localization, authenticated visual matrix and app-wide accessibility acceptance remain open.
- **Host and admin:** Existing screens inherit shared brand tokens. Teacher application, verification, publishing and admin data/Trust flows were deliberately not changed. Their authenticated visual audit depends on the separately governed hosted Auth/review lane. F7 ownership and immutable evidence remain untouched.
- **Onboarding:** RB2 is a nonpersistent preview. Live name/age/city/interest/profile writes, eligibility, one-account mode semantics and publishing authorization require a privacy/eligibility specification and independent review. Illustrative examples remain labelled fictional; no new verified status or live inventory is claimed.
- **Assets:** Onboarding scene originals/provenance are in `artifacts/ARO-RB2/` and responsive exports in `public/brand/`. The RB9 share image is generated from controlled SVG geometry. Licensed Polymath web assets are absent; Manrope 700 remains the approved heading fallback. Full asset/performance and social crawler acceptance remain open.

## Active gates and next actions

1. A reviewer resolves RB0's open conversations after inspecting the addressed changes; do not self-resolve or bypass branch protection.
2. RB4 Trust review remains open. An independent privacy/security reviewer assesses RB2 before merge and before any live age/profile implementation. RB5 is also SPEC-REQUIRED pending independent privacy review of browser-local contact draft retention/deletion; do not merge past either gate. Prepare the live eligibility specification with that review.
3. The hosted language-skip failure is diagnosed and repaired in RB7: fixed-height selection cards let the footer intercept the button after bottom-tab padding was removed. Minimum-height wrappers retain content in normal flow. RB7 and propagated RB10 source checks pass; require all checks on the final evidence/merge HEADs before protected merge. No assertion or security boundary was waived.
4. Obtain valid licensed Polymath web files if the founder wants the display face; continue using Manrope 700 meanwhile.
5. After dependent PRs pass all required checks and independent reviews, merge in stack order through protected GitHub `main`, then perform the full route/theme/language accessibility, hosted Auth and release checks. Do not label any branch VERIFIED or SHIPPED before those gates pass.


## Cloud continuation evidence — 2026-09-28

Started from the requested remote branch at exact `31118262783728db55a21c9e138537b52f7aebf1`, with clean working tree and matching PR #82/remote HEAD. No reconstruction from main or private plan was used. Package specs, governing documents and approved visual reference were read before implementation.

- RB7 owns diagnostic `c39d0f7`, repair `a7334b1`, test-readiness correction `bbd1b2b`, and retained evidence `1960c79`. Five preference interaction tests cover real providers, persistence, device theme, unavailable storage and keyboard/pointer dismissal. Unique IDs, selected-choice focus, 44px close target and a bounded scrollable panel improve the existing quiet preferences.
- Root-cause run [36406063605](https://github.com/leonartist7/ARO.club/actions/runs/36406063605) measured the button at y=756–800 beneath a footer beginning y=736, with pointer interception. Only selection-wrapper height changed in existing student/teacher flows. No new live onboarding was implemented.
- RB7 tested source `bbd1b2b`: [Quality 36407355886](https://github.com/leonartist7/ARO.club/actions/runs/36407355886) and [platform 36407355888](https://github.com/leonartist7/ARO.club/actions/runs/36407355888) pass. Browser evidence includes 32 existing component checks, 16 preferences scenarios and all 25 existing E2E checks. Platform includes the authenticated browser matrix, Auth/Trust boundaries, 91/91 pgTAP twice and cleanup.
- Propagated RB10 tested source `add2a418617e435d5a0a1a58085aa53940c1ce96`: [Quality 36407547820](https://github.com/leonartist7/ARO.club/actions/runs/36407547820) and [platform 36407547856](https://github.com/leonartist7/ARO.club/actions/runs/36407547856) pass. Local build/lint/type checks pass; 184 unit tests pass, with 3 existing browser-gated skips. Local browser startup was blocked by this container; hosted Chromium supplied the browser evidence.
- [Retained RB7 evidence](../../artifacts/ARO-RB7/VERIFICATION.md#retained-hosted-evidence-cloud-continuation) includes original screenshots, hashes and all 16 machine results. Reviewed mobile/desktop, light/dark, Spanish/French settings and 320px 200% text samples. Text scaling is not native browser-zoom certification. This remains sampled acceptance, not full-route accessibility/localization or F7 certification.
- Evidence propagation uses normal merge commits: RB8 `2c4a292`, RB9 `37fbd34`, and this RB10 ledger/evidence merge. Original commits and PR bases remain in the stack; no force-push or main merge. Final documentation/evidence HEAD checks run separately and remain required; the green runs above identify the precise tested source.

Smallest founder action: arrange an independent reviewer for RB0's open conversations and RB2 privacy/security review. No fresh direction approval or private original plan is needed for this work. Live profile/age onboarding stays blocked. Full app localization/accessibility, broader authenticated visual acceptance, asset/crawler acceptance and protected release checks remain open. No package is promoted to VERIFIED/SHIPPED.


## Local review-fix handoff reconciliation — 2026-09-28

Remote handoff heads were confirmed before editing: RB1 #73 `4c5f91d`, RB2 #74 `a7d1745`, RB3 #75 `a3f7d41`, RB4 #76 `d66f85e`, RB5 #77 `406cba0`, RB6 #78 `8799e78`; RB0 #72 `8c33cf7`. PR #84 remains owner-controlled at `7e3f9568202b37b7aeb420f9b642efb80121b1a2`; its existing Quality 36425029309 and platform 36425029413 passed. This task did not merge #84 or alter its source-plan documents.

Incoming RB6 Quality 36436067479 failed two stale tests expecting a Create self-link instead of the reviewed World exit. The reconciliation keeps the incoming behavior and checks both the World exit inside Create and Create entry outside it. RB7 conflicts were limited to Header, AppShell and the append-only changelog: preserve the xl breakpoint with quiet Preferences/scrolling menu; preserve localized labels with the incoming central action; preserve both changelog histories. Existing cloud card-height repair, preference accessibility, diagnostics, screenshots and their hashes remain intact.

Normal merge chain: RB6 `8799e78` → RB7 `c7dfd8f` → RB8 `1ea6280` → RB9 `f95ed1b` → this RB10 reconciliation commit. Each original cloud branch head remains an ancestor. No force-push, main merge, independent-review closure or release occurred. RB7 local build/lint/type checks and 181 unit tests pass (3 existing browser-gated skips). New-head hosted checks run separately; earlier green runs and screenshots above are historical, not certification of this reconciliation. Upstream RB1–RB6 test fixes are left to their owner; the compatible navigation assertions reside in RB7.

Release gates remain: open review conversations for independent recheck, RB2 independent privacy/security review, RB5 SPEC-REQUIRED contact-draft retention/deletion review, and protected-branch checks. No VERIFIED/SHIPPED promotion. The next source-plan owner should reconcile #84 with the new RB10 head before proceeding.

### New hosted blocker after reconciliation

Published heads: RB7 c7dfd8f, RB8 1ea6280, RB9 f95ed1b, RB10 7f9eb6e. GitHub reported all four conflict-free (mergeable=true); that is only Git conflict status, not review/check/release approval.

RB7 platform run [36436884165](https://github.com/leonartist7/ARO.club/actions/runs/36436884165), job 108977002931, failed `BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT`. Initial 91/91 pgTAP, signup/password and Auth/Trust boundary checks passed; cleanup passed. This is a new downstream failure, not the repaired language-skip failure. Static job 108977002132 passed; browser-smoke and descendant checks were still running at this checkpoint.

Source inspection establishes a routing collision introduced by the incoming RB4 repair: `src/proxy.ts` matches `/teacher/application` as `/teacher/:id`, finds that `application` is not a fixture teacher ID, and rewrites to a 404 before reaching the existing Auth-refresh path. The real static route `src/app/(public)/teacher/application/page.tsx` calls `requireUser('/teacher/application')`, and TeacherOnboarding navigates there after draft creation. The platform stage includes the draft POST and this navigation, so its stage name alone does not establish a failed database write.

Required next owner action: RB4/Auth owners should narrowly exclude reserved static teacher routes from fixture-ID recovery, preserve the existing requireUser/Auth behavior, and test the known/unknown fixture routes plus authenticated application transition. This reconciliation does not alter Auth routing or waive assertions to hide the defect. RB1–RB6 owners also need the navigation assertion alignment recorded in RB7 before their checks can pass. RB2 and RB5 independent review gates remain blocking. No protected merge or release is authorized by conflict-free status.

RB7 browser-smoke run 36436884161 completed: all 32 browser component checks and the 16-scenario Preferences step passed; E2E finished 22 passed / 3 failed. Two failures concern /teacher/dashboard not redirecting to Login, consistent with the same reserved-static-route collision (a 404 is not evidence of authenticated data exposure). The third is a strict-mode duplicate-text match for French UX0 provenance, `Une introduction illustrée. Aucune réservation ni paiement ici.`; its scoped copy/selector resolution belongs with the incoming public-copy review. Preserve provenance visibility and the assertion rather than disabling it. RB8/RB9 platform checks also report failure; RB10 checks were still running at this checkpoint. Hosted static checks passed on all four reconciliation source heads. Latest RB10 documentation commits do not change runtime; their new checks remain required.


### Corrected handoff — RB6 95ec421

Remote heads confirmed: RB1 `00aeb90df313693e8a7b8ed34b0bcbd16693a5a9`, RB2 `42ae32d0178ac8327b24865775643ed84df7c42b`, RB3 `0fbb1541f9ffc58ec5eadab11db38bbc7d7863bb`, RB4 `b21a53bc2b9f596fbcfdf48fc422ef6a10f2d934`, RB5 `2a1711fe143290403826dc8aef53be10b17d0e4c`, RB6 `95ec42139f83ac171bc5362527ce21ebec652426`. This correction supersedes the earlier request for upstream navigation-test repair: that repair is now present.

Only the two test files changed between RB6 8799e78 and 95ec421. Adopted the upstream versions exactly when resolving their overlap with the equivalent cloud test fix. Targeted verification: 15 tests pass, 1 existing browser-gated skip. Both Create entry and the intentional World exit remain asserted. No runtime code or cloud screenshot/evidence hashes changed in this correction.

Normal merge propagation: RB6 95ec421 → RB7 f7b88e5 → RB8 7b6f5db → RB9 b66368a → this RB10 merge. Prior cloud and reconciliation history remain ancestors. Incoming RB6 Quality 36437639390 and platform 36437639397 were running when checked; new descendant checks are separate and must not be inferred green. The reserved teacher-route collision and French provenance locator failures described above are unaffected by a test-only correction. RB2 independent privacy/security review and RB5 SPEC-REQUIRED contact-retention/deletion review remain blocking. PR #84 remains unchanged and owner-controlled.


### RB6 5e22dcc review-copy reconciliation — 2026-09-28

Confirmed incoming RB6 `5e22dccb0fd268a9212e874a11e27d321efad493` and existing cloud heads before editing. The incoming diff from 95ec421 changes only RB3 formation-preview copy in EN/FR/ES, the capture assertion and refreshed RB3 evidence. It supplies distinct copy for the prior French strict-text ambiguity; this is an implemented candidate repair, with new-head hosted confirmation still required. The reserved teacher-route proxy collision is not modified by this diff.

Conflict-free normal merge chain: RB6 5e22dcc → RB7 1c9731c → RB8 e20be91 → RB9 3c991c7 → this RB10 merge. Original cloud commits, Preferences behavior, legacy-card height repair, diagnostics, screenshot hashes and prior handoff history remain preserved. No force-push, main merge, review-thread resolution or release. Lower-stack CI remains with its owner; incoming RB6 Quality 36439588629 and platform 36439588600 were in progress at intake.

RB7 local unit tests: 180 pass, 3 existing browser-gated skips. New-head hosted checks run separately. RB5 remains **SPEC-REQUIRED** pending independent privacy review of browser-local contact draft retention/deletion; it is not approved and no merge may cross that gate. RB2 independent privacy/security review and remaining review conversations stay open. PR #84 remains owner-controlled and untouched.


### RB6 1c4c2a1 protected-route repair — 2026-09-28

Verified current remote RB7–RB10 heads and exact incoming RB6 `1c4c2a192710a5be6d99d82caeb9873b232f7b3b` before editing. The incoming diff from 5e22dcc changes only `src/proxy.ts` and RB4 evidence: `application` and `dashboard` are reserved teacher-account route names and no longer trigger the unknown legacy fixture rewrite. Existing Auth-refresh logic and route-level requireUser guards are unchanged. This supersedes the prior statement that the collision has no source fix; hosted acceptance remains pending.

Conflict-free normal merge chain: RB6 1c4c2a1 → RB7 573afa4 → RB8 29e162d → RB9 a6ba481 → this RB10 merge. Cloud work, original ancestry, layout/preferences repairs, diagnostics, visual evidence and all prior handoff history remain preserved. Incoming RB6 Quality 36440596588 and platform 36440596255 were running at intake. New descendant checks must independently pass; no prior run is relabelled.

RB5 remains **SPEC-REQUIRED** pending independent privacy review of browser-local contact draft retention/deletion. RB2 independent privacy/security review and review conversations remain open. No force push, protected-branch merge, release or VERIFIED/SHIPPED promotion. PR #84 remains owner-controlled and untouched.

Local integrated build/lint/type and 184 unit tests pass (3 existing browser-gated skips). Production response inspection shows Login meta redirects for both reserved teacher routes, 404 for an unknown teacher ID and 200 for known fixture t1. Next streams the protected-route redirect with initial HTTP 200, so a status-only 3xx check is insufficient; the route-level redirect markup was inspected. This is bounded response evidence, not hosted authenticated-browser acceptance.


### Verified CI / independent re-review checkpoint — 2026-09-28

GitHub remote heads and workflow results were read directly before recording this checkpoint.

| PR | Tested source | Quality | Isolated database |
|---|---|---|---|
| #75 | `1e334dc2fcf625965aaee1eac9b463a4a9570bf0` | [success: 36439322061](https://github.com/leonartist7/ARO.club/actions/runs/36439322061) | [success: 36439321994](https://github.com/leonartist7/ARO.club/actions/runs/36439321994) |
| #76 | `bedf27e32744dd96d76c7b7c67d6366df6e333c7` | [success: 36440370173](https://github.com/leonartist7/ARO.club/actions/runs/36440370173) | [success: 36440369730](https://github.com/leonartist7/ARO.club/actions/runs/36440369730) |
| #77 | `ca828a48e2e3f8b6402984540943c486a5995868` | [success: 36440544853](https://github.com/leonartist7/ARO.club/actions/runs/36440544853) | [success: 36440544718](https://github.com/leonartist7/ARO.club/actions/runs/36440544718) |
| #78 | `1c4c2a192710a5be6d99d82caeb9873b232f7b3b` | [success: 36440596588](https://github.com/leonartist7/ARO.club/actions/runs/36440596588) | [success: 36440596255](https://github.com/leonartist7/ARO.club/actions/runs/36440596255) |
| #79 | `573afa4881634fec31cb9c37dfcaffc61ba6ea8c` | [failure: 36440747183](https://github.com/leonartist7/ARO.club/actions/runs/36440747183) | [success: 36440747181](https://github.com/leonartist7/ARO.club/actions/runs/36440747181) |
| #80 | `29e162df0c76f793f53faae6558e139bf1351b15` | [success: 36440795276](https://github.com/leonartist7/ARO.club/actions/runs/36440795276) | [success: 36440795465](https://github.com/leonartist7/ARO.club/actions/runs/36440795465) |
| #81 | `a6ba481e851b752abf13fc4ea7d27f1e4e010c8e` | [success: 36440837284](https://github.com/leonartist7/ARO.club/actions/runs/36440837284) | [failure: 36440837374](https://github.com/leonartist7/ARO.club/actions/runs/36440837374) |
| #82 | `7b458017457d28b9019153dbd972f7d7756c15e1` | [success: 36441081849](https://github.com/leonartist7/ARO.club/actions/runs/36441081849) | [success: 36441081371](https://github.com/leonartist7/ARO.club/actions/runs/36441081371) |

RB7 browser-smoke job 108990266606 fails the public-route content check for `/choose-role` (12 characters); its protected-route rejection checks pass. RB9 platform job 108990577680 fails `BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_DARK`; cleanup passes. These distinct failures are not attributed to the repaired legacy-route collision without evidence, and no retry or assertion change was performed in this status-only update. Green descendant runs do not waive failed intermediate-head checks.

Founder reports all six lower-stack local worktrees clean and pushed, RB4 green after one isolated-browser retry, and fresh independent Codex re-reviews requested for #72–#78/#84. Cloud independently confirms remote heads/results above; it does not claim access to the local worktrees or completion/approval of those reviews. Existing conversations remain for independent recheck.

RB2 specialist privacy/security review remains open. RB5 stays **SPEC-REQUIRED**, pending independent privacy acceptance of browser-local contact draft retention/deletion. No main merge, release, review-thread resolution or VERIFIED/SHIPPED promotion. This status-only commit changes no runtime; its fresh CI is separate from the tested source heads above.


## Latest local Manrope reconciliation — 2026-09-28

The 52295e9 handoff was incorporated in RB7 `16120355bbb83bb1903138f33d8e5411708cb94e`, then superseded by exact remote RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`. Verified main `721b2b7fdd3dda0072d189e43d717ef00c7723b2` is its ancestor. Normal two-parent merges preserve all cloud commits, the original 3111826 baseline, package ownership and lower-stack fixes; no force-push or main update. PR #83's local Manrope fonts/license and RB0/RB1 baseline updates propagate unchanged. No F7 evidence was overwritten.

The single Header conflict was resolved in RB7: compact Favorites/Passport and role-gated Admin remain, while future-only Games/Leaderboard stay omitted as required by RB7. A new regression test covers compact real destinations and omission of future-only links. Other package merges were conflict-free. Prior minimum-height onboarding repair, quiet accessible preferences, metadata, supporting states and account-entry presentation remain intact.

| PR | Reconciled source / provenance | Latest hosted checkpoint |
|---|---|---|
| #78 | `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd` | Quality 36450742796 in progress; Isolated database 36450743091 success |
| #79 | `2e3b03894cd15f586c33d172e396e9958af84a97` | Quality 36450917791 / Isolated 36450917657 in progress |
| #80 | `27ac05ecf1c0d36a8c1c54c6fc877fb82a28462c` | Quality 36450984408 / Isolated 36450984422 in progress |
| #81 | `af6796b3326f95892d2b32165cb1e17b528dffb3` | Quality 36451048492 / Isolated 36451048543 in progress |
| #82 | This merge of prior `601545c10a6aed2e938e0defe94d9aee5e8eb628` and RB9 above | Fresh hosted runs required after publication |

Verification of the combined RB10 source: production build, lint, type-check and unit suite pass (21 files, 185 passed, 3 existing browser-gated skips). [Production HTTP font evidence](../../artifacts/ARO-RB10/reconciliation-2ea1fed/font-http.json) confirms all six WOFF2 files return HTTP 200 with source-identical hashes, all six faces are referenced by built CSS, and the sampled Home HTML/CSS has no Google Fonts reference. This does not claim browser network or typography acceptance. Local browser/visual recheck is blocked: bundled Chromium is absent and `npx playwright install chromium` repeatedly returned an invalid/truncated archive (central-directory signature missing). Prior images remain historical and were not overwritten. Fresh hosted browser preferences/platform checks and representative local-font screenshots remain required. No new performance claim or relaxation of existing budgets/assertions.

Historical intermediate checkpoint, before 2ea1fed: RB5 ad4a6d1 and RB6 52295e9 passed both workflows. RB4 238cbbe passed Quality 36449928091 but isolated 36449927999 failed `BROWSER_DOCUMENT_INITIAL_CHOOSER_360_DARK` (cleanup passed). Older RB7 `/choose-role` and RB9 document-chooser failures above are retained; new-head results must establish their current status, not inferred descendant success.

PR #84 remains at `7e3f9568202b37b7aeb420f9b642efb80121b1a2`, with mergeability false when checked. Its source-plan file, historical banner, English/light priority and RB0 source link are now on GitHub; earlier unavailable-private-attachment statements describe the original task, not current availability. The source-plan branch stays with its owner and must be reconciled on the latest RB10; old green checks do not prove that integration. English/light priority does not waive working dark/FR/ES behavior or any specialist boundary. Its automated review conversations remain unresolved.

RB2 privacy/eligibility, RB4 Trust, RB5 **SPEC-REQUIRED** contact-draft retention/deletion privacy, independent reviews and release gates are all OPEN. RB2 remains a nonpersistent preview; Auth/teacher verification/payment/Trust/F7 boundaries remain. No self-resolved conversations, protected merge, release or VERIFIED/SHIPPED promotion. Next owner action: reconcile PR #84 with the published RB10 head and obtain the outstanding independent reviews; hosted checks must finish on every final merge head.


### Post-publication hosted checkpoint

Published RB10 integration source is `2a50454a70480142fff90eab13ab7e00b84fe5f5`; its parents are 601545c and af6796b. Remote RB7–RB10 heads match the published stack and GitHub reports conflict-free mergeability, which is not review/check approval. Local working tree was clean and ancestry checks confirm both RB6 2ea1fed and the original 3111826 baseline.

RB6 2ea1fed now passes both Quality 36450742796 and Isolated database 36450743091. RB7 2e3b038 passes Quality 36450917791 but fails isolated 36450917657, job 109025144664, at `BROWSER_DOCUMENT_RETRY_CHOOSER_360_DARK`; cleanup passed. The stage follows keyboard focus/style checks and the initial upload-error flow; the log does not establish the filechooser failure's root cause. No upload/teacher/Trust behavior or assertions were changed, and no retry was used to relabel it. The previously observed `/choose-role` Quality failure did not recur on this RB7 run. RB8 27ac05e isolated 36450984422 passes with Quality still running. RB9 af6796b and RB10 2a50454 workflows remain in progress. This documentation checkpoint requires its own new-head checks after publication.

PR #84 remains unmergeable at 7e3f956 and unchanged. Independent privacy/eligibility, Trust, draft-retention/privacy, review and release gates remain OPEN. Fresh visual verification remains blocked by the Chromium download error described above.
