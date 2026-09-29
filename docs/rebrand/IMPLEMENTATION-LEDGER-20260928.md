# Orange rebrand implementation ledger — 28 September 2026

**Current founder priority:** Prepare an English, light-mode initial release first; schedule dark-mode and French/Spanish polish after that scope. Preserve existing theme/localization behavior and all review, privacy, Trust, security, payment and store gates. The [original planning document](reference/ARO-Rebranding-Implementation-Plan-2026-09-27.md) is historical source context, not a claim of release readiness.

> **Latest reconciliation (2026-09-28):** RB7–RB10 incorporate exact RB6 `1184639f47eeaecebcb6a5b754ad7f7974d9d144`, with bounded mobile preference choices above the sticky action row and stronger browser assertions. Cloud work/ownership are preserved; new-head hosted checks remain required. Old pottery WebP derivatives remain public but unused. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED contact privacy, independent review and release gates remain OPEN.

> **Integrated visual candidate (2026-09-29):** RB11 English/light presentation and RB12 orange-led public redesign are being reconciled on the latest PR #84 source in a separate branch. Their earlier hosted screenshots and checks apply to their original heads only. The integrated branch requires fresh visual, build, browser and review evidence before merge.

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
| RB11 | English/light release presentation with existing preferences preserved | IMPLEMENTED / PARTIAL VERIFICATION [#85](https://github.com/leonartist7/ARO.club/pull/85); original-head [hosted evidence](../../artifacts/ARO-RB11/VERIFICATION.md) |
| RB12 | Orange-led public Home and story redesign | IMPLEMENTED / PARTIAL VERIFICATION on its source branch; [integrated visual evidence](../../artifacts/ARO-RB13/VERIFICATION.md) |
| RB13 | Latest source plus RB11/RB12 integration and English/light visual convergence | IMPLEMENTED / PARTIAL VERIFICATION on isolated branch; independent review and release gates open |

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


## Final RB6 8a8e5e2 handoff incorporated

Verified exact remote RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`. Its diff from 2ea1fed contains two explicit destination-heading waits in `scripts/verify-rb6.mjs`, six refreshed RB6 screenshots and the owner's production-verification note; no runtime change. Normal conflict-free merges propagate it through RB7 `0016b1f649435a46a4919ef1f3ed6c93c482ef58`, RB8 `04942890087be787a357327e66565502e645070c`, RB9 `ee8902604298c038d70120c320207c4017affadb` and this RB10 merge (parents d75396a / ee89026). Package ownership, prior cloud repairs, ledger history and F7 evidence remain intact.

Source comparison confirms final `src`, `app`, `public` and dependency manifests match the previously tested RB10 runtime exactly. The local 185-test, lint/type/build and font HTTP results therefore remain applicable without claiming a fresh browser run. Inspected the supplied RB6 320px light leaderboard and 360px dark bookings captures: headings, truthful empty-state copy and action labels are readable with local Manrope. They show RB6's older header/tabs and do not certify the later RB7 quiet-preferences navigation. Cloud final-stack visual acceptance remains pending because Chromium installation is blocked as recorded above.

Hosted checkpoint on these exact heads: RB6 Quality 36451531506 / isolated 36451531760; RB7 Quality 36451753931 / isolated 36451753914; RB8 Quality 36451818787 / isolated 36451819101; RB9 Quality 36451869687 / isolated 36451869528 are all in progress. RB10 requires fresh runs after this publication. The previous teacher-document retry-chooser failure is not asserted fixed by the unrelated RB6 navigation-verifier repair. PR #84 remains untouched and must be reconciled onto this latest RB10. All specialist, independent-review and release gates remain OPEN; no main merge or release claim.


## RB6 ff1c7b6 review repair reconciliation — 2026-09-28

Verified exact remote RB6 `ff1c7b65cc23958b66754f0d75faffae736a7e7d` and matching clean RB7–RB10 heads before editing. Incoming diff from 8a8e5e2 is five files: RB1 v1.1.0 presentation contract, removal of the premature RB3 dependency from RB2 metadata, RB6 v1.1.0 public-presentation contract, Create composition focus-ring classes and corresponding browser capture assertions. Governing operating documents are unchanged. No new feature, role, persistence, Auth, Trust, money, AI authority or F7 evidence change.

Normal conflict-free merges preserve all cloud work and package ownership: RB7 `b4d8d9e01cbc96eba0c3ad510738c143022f4ab2`, RB8 `860c33a5fc4831a284d85dd3c1ed20317dfd181e`, RB9 `04664c22016b418846bfd5b93ad24616f0e5648b`, and this RB10 merge (parents 20c73de / 04664c2). No force-push or protected merge. The sole incoming runtime change is the reviewed Create composition focus-ring class list; its upstream version is retained exactly.

Before reconciliation, GitHub confirmed both workflows green for RB7 0016b1f (Quality 36451753931 / isolated 36451753914), RB8 0494289 (36451818787 / 36451819101), RB9 ee89026 (36451869687 / 36451869528), and RB10 20c73de (36451993136 / 36451993086). The prior teacher-document chooser failures did not recur on those source runs; their root cause is not asserted fixed. Green previous heads do not certify this new reconciliation. Incoming RB6 Quality 36454486065 and isolated 36454485998 were running at the initial checkpoint.

The founder reports passing 320px dark / 1440px light focus browser checks and a combined production webpack build. Those are owner-reported, not a new cloud visual run. This cloud environment's previously recorded Chromium download blocker remains; no fresh visual acceptance or performance claim is made. PR #84 remains at 7e3f956 and unmergeable when checked, untouched and owned separately; its owner must reconcile it on the newest RB10.

RB5 remains intentionally unmerged and **SPEC-REQUIRED** pending independent approval of on-device Contact draft retention/deletion. RB2 privacy/eligibility, RB4 Trust, independent review conversations, protected checks and release gates remain OPEN. No self-approval, conversation resolution or VERIFIED/SHIPPED promotion.


Cloud combined-source verification for the ff1c7b6 reconciliation: production webpack build, lint, type-check and 185 unit tests pass (21 files; 3 existing browser-gated skips). The first build stopped on stale `.next` output with ENOTEMPTY; moving generated output aside allowed a clean successful build, without dependency/config changes. The incoming capture script passes syntax validation; no cloud browser run is claimed. New RB7 Quality 36454702561 / isolated 36454702546, RB8 36454753803 / 36454753636, RB9 36454799395 / 36454799423 are in progress; fresh RB10 runs are required after publishing this merge.


## RB6 13e2571 localization and short-screen reconciliation

Verified remote RB6 `13e257107b5726e911210a1eb8048ce3d42143ac` plus matching clean cloud heads before editing. Operating/governing documents are unchanged; RB2's spec adds the sticky safe-area action and removes the legacy host-marketing destination from the allowed preview journey. Incoming changes include localized shell labels/status/accessibility names, 44px linked wordmarks, Manrope v20/OFL provenance, dark-safe foregrounds, sticky setup actions, host publishing-boundary copy and refreshed owner evidence. No F7 evidence was changed.

RB7's sole conflict was overlapping AppShell localization. Adopted upstream AppShell and shell dictionary together to retain equivalent EN/FR/ES wording, avoid duplicate keys/punctuation, preserve Create→World navigation and gain the wordmark target. Added two French/Spanish semantic navigation/status/skip-link tests; all six AppShell tests pass. Cloud quiet Preferences, onboarding minimum-height repair and compact account links remain intact. RB8/RB9/RB10 merge without conflicts.

| Package | Reconciled source |
|---|---|
| RB7 | `7c82ccf27e3836cead0c44f6f7c9367b59ef0551` |
| RB8 | `042b5934bdedd56ea9ab2ccc8524da7b332a8617` |
| RB9 | `fc4b08ed9eaff233b2001dc2590f11a8e51d7ebb` |
| RB10 | This merge, parents b28fc9f / fc4b08e |

Combined local production webpack build, lint, type-check and unit suite pass: 21 files, 187 passed, 3 existing browser-gated skips. Inspected incoming owner screenshots `320-light-en-learn-preference.png` and `390-dark-es-host-result.png`: visible sticky action/copy and explicit nonpersistent publishing boundary. These are lower-stack captures with its older header, not a new cloud preferences or keyboard interaction run. Owner reports six production-browser paths; fresh cloud browser acceptance remains pending because the previously recorded Chromium download blocker remains. No new performance claim.

Incoming RB6 hosted Quality 36457826579 fails both static and browser-smoke at the broad `getByText('Aperçus')` assertion in `src/views/AppReturn.test.jsx`: the newly localized navigation also contains that text. Existing cloud RB7 already uses `getByRole('heading', { name: 'Aperçus' })`, retained here and passing locally. Lower-stack owner should apply that semantic selector in its owned branch; no lower branch was edited by this cloud task. RB6 isolated 36457827149 separately fails `BROWSER_DOCUMENT_RETRY_CHOOSER_1440_LIGHT` (job 109048577110); cleanup passes. Do not attribute that to the text assertion or claim it fixed.

Prior cloud RB7 b4d8d9e (Quality 36454702561 / isolated 36454702546), RB8 860c33a (36454753803 / 36454753636), and RB10 b28fc9f (36455029442 / 36455029746) passed both workflows. Prior RB9 04664c2 passed Quality 36454799395 but isolated 36454799423 failed `BROWSER_DOCUMENT_INITIAL_CHOOSER_1440_LIGHT`, cleanup passed. Fresh RB7 36458167610 / 36458167611, RB8 36458218375 / 36458218656, and RB9 36458271224 / 36458270960 were running at the checkpoint. RB10 needs fresh checks after this publication. These exact-source records do not waive failed intermediate checks.

PR #84 remains unchanged at 7e3f956 and unmergeable. [Owner reconciliation plan](PR84-RECONCILIATION-PLAN-20260928.md) records the read-only ledger-conflict preview, preservation of its original plan/hash/banner and English/light priority, exact conflict-resolution policy, documentation-only audit, and independent re-review/check requirements. Execute it against the latest published RB10; do not substitute an old ledger or main.

RB2 independent privacy/eligibility and Trust, RB4 Trust, RB5 **SPEC-REQUIRED** on-device Contact draft retention/deletion privacy, independent review and release gates remain OPEN. No self-approval, resolved review conversations, protected merge or release. Smallest next owner actions: repair the lower-stack heading selector, investigate the independent chooser failure, then reconcile #84 on the new RB10 and obtain required specialist approvals.


## Superseding RB6 327c681 selector repair

Confirmed exact remote RB6 `327c6812f390a726b885dfda06fc9524d66a6cb2`. Diff from 13e2571 is only `src/views/AppReturn.test.jsx`: the heading-specific Aperçus assertion and final newline, both already present in cloud. Normal conflict-free merges incorporate it into RB7 `cc0a5ebda2657cc7ddbee28e031ddd8d3da0e4a6`, RB8 `70dff315efa510aee184b43dad865c414db2c5a1`, RB9 `23ca471f84acee099d094794ff3eb643a112177b`, and this RB10 merge (parents d894c35 / 23ca471). Comparison against d894c35 confirms source, app, public assets, scripts and dependency manifests unchanged. Prior combined local production webpack build/lint/types and 187 tests remain applicable; this is not a fresh browser acceptance claim.

The lower-stack selector source repair is now incorporated, superseding the previous requested owner action. New-head CI must confirm it. The independent teacher-document chooser failure remains recorded without an asserted fix. The PR #84 owner plan now targets the newest RB10 on this corrected base, preserving its original plan/banner/hash, English/light priority and current ledger history. Its branch remains untouched and requires separate re-review and checks. All privacy/eligibility, Trust, contact-draft privacy, independent-review and release gates remain OPEN; no protected merge or self-approval.


## RB6 9eb4e15 teaching-scene and required-verifier reconciliation

Confirmed remote RB6 `9eb4e15d2435eb08787a0b8db10ae601987f5053` and clean matching cloud heads before editing. Read the incoming changelog/evidence, asset manifest/exporter, runtime and E2E changes; AGENTS and the required governing documents/specs have no changes in this handoff. All four normal merges are conflict-free. Preserved cloud preferences, translated shell, account/navigation behavior, metadata, supporting states and retained evidence. No F7 evidence change or protected merge.

| Package | New source |
|---|---|
| RB7 | `362787a070fdd856dba8cbdd5530a5d17b41055f` |
| RB8 | `965bedc46e11f6b35f28bf7f14bc83a35ef7e174` |
| RB9 | `fdda59ebd2a1adb7d27101caca34ec14cfbc464b` |
| RB10 | This merge; parents 8ee50c4 / fdda59e |

Scene 2 and For Teachers both use the new adult public-room conversational-language art. The old pottery original/exports remain provenance only; reviewed runtime consumers no longer reference them. Inspected the new 640px illustration: adult people, blank practice cards, warm public-room scene and approved portal direction, with no in-image pricing/verified-host claim. Inspected the supplied 320px preference capture: choices precede the CTA in normal flow without the prior overlay. These are incoming owner assets/captures, not fresh screenshots of the cloud preferences header. Preview input remains nonpersistent; its notice now precedes opening/teaching teaser choices.

Required `test:e2e` now spawns `scripts/verify-rb2.mjs` against the same BASE, waits for it and counts nonzero/startup failure as a suite failure. No assertion is disabled. Syntax checks pass for both changed JavaScript scripts. The pinned Python/Pillow/libwebp `--check` succeeds locally and reproduces the committed WebPs, including the new 54,702-byte/123,024-byte pair. Owner reports six local browser paths passing; its full Windows dev E2E run failed during the broad /passport sweep with OOM/ERR_INSUFFICIENT_RESOURCES and remains explicitly NOT a pass. The cloud has no bundled or system Chrome executable at this checkpoint; no fresh cloud browser/full-E2E result is claimed and no prior captures are overwritten by this task.

At the initial hosted checkpoint, prior RB7 cc0a5eb passes Quality 36458758205 and isolated 36458758319. Prior RB8 70dff31 passes Quality 36458789598 but isolated 36458789689 fails `BROWSER_DOCUMENT_RETRY_CHOOSER_1440_LIGHT`. Prior RB9 23ca471 passes Quality 36458813897 but isolated 36458813861 fails `BROWSER_DOCUMENT_RETRY_CHOOSER_360_DARK`. Prior RB10 8ee50c4 passes Quality 36458958867; the founder-started failed-job retry of isolated 36458958897 also failed, at `BROWSER_DOCUMENT_RETRY_CHOOSER_360_DARK` (job 109056413521). PR #84 91a3ceb passes Quality 36460038677 but isolated 36460038704 fails `BROWSER_DOCUMENT_INITIAL_CHOOSER_360_DARK`. Cleanup passes in all four inspected failed platform jobs. No extra retry was triggered, and these different exact-source failures are not claimed repaired by RB2's unrelated changes.

PR #84 is now owner-reconciled at `91a3ceb51a1c50ef37372588f7abb3fe6b72f0e2`, based on prior RB10 8ee50c4, with both English/light priority and cloud history retained. It was mergeable against that head at inspection, not approved. The owner will reconcile it again after this publication; [the plan](PR84-RECONCILIATION-PLAN-20260928.md) now records this state and the latest base. No #84 branch write was made here.

RB2 independent privacy/eligibility and Trust, RB4 Trust, RB5 SPEC-REQUIRED on-device Contact draft retention/deletion privacy, independent review and release gates remain OPEN. No self-approval, conversation resolution, protected merge, VERIFIED/SHIPPED promotion or release claim.


Final combined cloud verification for 9eb4e15: production webpack build, lint, type-check and 187 unit tests pass (21 files; 3 existing browser-gated skips). Pinned WebP reproduction and changed-script syntax checks pass. Latest incoming RB6 Quality 36462888502 and isolated 36462888187 both pass. New cloud RB7 Quality 36463151418 / isolated 36463151430, RB8 36463191470 / 36463191557, and RB9 36463219500 / 36463219308 remain in progress at this checkpoint; new RB10 checks are required after publication. No new visual/browser acceptance or gate closure is implied.


## RB6 1184639 bounded mobile preference reconciliation

Verified exact remote RB6 `1184639f47eeaecebcb6a5b754ad7f7974d9d144` and clean matching cloud heads before editing. Incoming eleven-file diff contains OnboardingPreview layout, verifier assertions, refreshed owner screenshots/results and evidence correction; AGENTS and governing specs/docs are unchanged. The four normal merges are conflict-free and preserve cloud quiet preferences, navigation, translated shell, supporting states, metadata, account entry and historical evidence. No F7 changes or protected merge.

| Package | New source |
|---|---|
| RB7 | `b4e25c89a8a521dec6a83d31f0df81cd70794b4a` |
| RB8 | `13aa84cac1d901be3faee12aa1a387e5262ed1c2` |
| RB9 | `d02c72e1c7b5343ddda9c205d810bfd136be54c7` |
| RB10 | This merge; parents 2a6fafd / d02c72e |

The preference stage now bounds learner/host choice regions with mobile overflow scrolling and restores the safe-area sticky action; desktop retains normal layout. The required-CI six-case RB2 verifier asserts the action lies in the viewport, the region does not intersect it at mobile widths, and the last choice scrolls into the region when programmatically focused. That last assertion is not a claim that a full keyboard-Tab or assistive-technology audit was performed. Inspected incoming 320px light learner and 390px dark Spanish host captures: bounded choice regions and separated visible CTA are shown. They are owner captures, not fresh cloud browser screenshots; final cloud-header integration needs hosted/browser acceptance. Existing local browser-executable/download limitation remains, and the historical Windows full-E2E OOM remains NOT a passing run.

Asset evidence correction supersedes earlier shorthand: the old pottery PNG and WebP derivatives remain committed, and the WebP files remain deployable under public/brand even though current UI consumers do not use them. Nothing in this task deletes or removes those public files; cleanup requires separate authorization.

Previous-head hosted checkpoint: RB7 362787a passed Quality 36463151418 and isolated 36463151430; RB9 fdda59e passed 36463219500 / 36463219308; RB10 2a6fafd passed 36463557460 / 36463557603; PR #84 d0a9548 passed 36464043462 / 36464043461. RB8 965bedc passed Quality 36463191470 but isolated 36463191557 failed `BROWSER_DOCUMENT_INITIAL_CHOOSER_360_DARK` (job 109070291268), cleanup passed. Later green runs do not establish a root-cause repair for intermittent chooser failures or waive intermediate checks. Incoming RB6 1184639 Quality 36465732673 / isolated 36465732630 were running at the initial checkpoint; new cloud merge heads require fresh results.

PR #84 remains owner-controlled at `d0a954874e04ae7675c7c5347f882553e1392e16`, based on previous RB10 2a6fafd. Its original plan/banner/hash, English/light priority and cloud history remain preserved there. Owner will reconcile it again on the new RB10; [the plan](PR84-RECONCILIATION-PLAN-20260928.md) now identifies this base. No #84 branch write or review resolution by this task.

RB2 independent privacy/eligibility and Trust, RB4 Trust, RB5 SPEC-REQUIRED contact-draft retention/deletion privacy, independent review and release gates remain OPEN. No self-approval, protected merge or VERIFIED/SHIPPED promotion.


Final combined local checks for the 1184639 reconciliation: production webpack build, lint, type-check, 187 unit tests (21 files; 3 existing browser-gated skips), verifier syntax and diff checks pass. No local browser run is claimed. New RB7 Quality 36466008821 / isolated 36466008811, RB8 36466045257 / 36466045212 and RB9 36466071928 / 36466071454 are in progress; fresh RB10 checks are required after publication.

## 2026-09-29 — RB13 integrated English/light visual candidate

The separate `codex/rb13-integrated-visual-release-20260929` branch starts at PR #84 `2b809927` and normally merges RB11/RB12 source `670954f`. This preserves the latest RB6 mobile preference repair, PR #84 source-plan evidence, RB11 opt-in English/light presentation and RB12 public redesign without changing their owner branches or F7. Three merge conflicts were resolved in Home, public story and this ledger. Home keeps the latest gathering destination and preview disclosure; public story keeps the accepted language-teaching scene and FAQ guidance/privacy links.

RB13 then corrects the integrated first view of onboarding, Explore, story pages, app Home and opportunity examples, and adds missing page-level headings on app supporting views. [Verification](../../artifacts/ARO-RB13/VERIFICATION.md) has before/after links, 16 production-build screenshots, a 40-route browser sweep, ordinary Spanish/dark and French/light regression, build/lint/type and unit results, and mobile asset weights. No new raster image, dependency, backend, account, Trust or payment behavior was added.

The branch is **IMPLEMENTED / PARTIAL VERIFICATION**, not merge-approved or shipped. RB0 review conversations, RB2 independent privacy/eligibility/security and Trust review, RB4 Trust review, RB5 SPEC-REQUIRED Contact draft retention/deletion privacy review, final-head hosted CI, independent design/accessibility review, live Auth/onboarding and native store packaging remain open. Merge approved packages through protected `main` in dependency order; the integrated branch is the single visual review candidate, not a shortcut around those gates.


### 2026-09-29 — Compact shared footer follow-up

The separate `codex/rb13-compact-footer-20260929` review branch started on RB13 `5ef96e5` and now carries the owner's later exact head `1f64da7` by normal merge; the owner branch remains unchanged. It reduces the shared footer's height, removes the repeated generic trust banner, retains all public/legal destinations, and uses one native keyboard-operable mobile navigation disclosure with 44px targets. Desktop keeps the three link groups visible. The added browser-smoke verifier covers 320/390/768/1440px, light/dark, disclosure interaction, route links, touch targets, overflow and screenshots uploaded as `rb13-footer`.

Local evidence: focused footer tests 2/2; full suite 189 passed / 3 existing skipped; lint, type-check, standard build and English/light build pass. Chromium revision 1234 could not be downloaded in this cloud checkout (invalid zero-byte CDN archive), so local screenshot acceptance is not claimed. The first hosted RB12 check exposed a global FAQ `<details>` count that included this footer disclosure; it now scopes the unchanged five-FAQ assertion to `<main>`. The exact-head hosted footer browser check and retained screenshots remain pending. Existing upstream privacy, Trust, independent review, protected merge and release gates remain unchanged.
