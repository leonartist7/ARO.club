# Orange rebrand implementation ledger — 28 September 2026

At the final cloud read, GitHub `main` is `721b2b7fdd3dda0072d189e43d717ef00c7723b2` (advanced externally during this task; this task did not update `main`). RB0–RB10 are stacked, unmerged review branches. No package is SHIPPED. This ledger supplements the [actual route classification](BASELINE-20260927.md), package specifications and per-package browser evidence; it does not override release or specialist gates.

| Package | Scope and evidence | Status / PR |
| --- | --- | --- |
| RB0 | Founder-approved palette, open-O/dot identity, route/asset baseline, ADR-031 | IMPLEMENTED / PARTIAL VERIFICATION [#72](https://github.com/leonartist7/ARO.club/pull/72); review threads open |
| RB1 | Shared tokens, controlled SVG mark, Manrope fallback, shared primitives | IMPLEMENTED / PARTIAL VERIFICATION [#73](https://github.com/leonartist7/ARO.club/pull/73) |
| RB2 | Three illustrated, skippable scenes and in-memory learner/host/both result preview; [art manifest](../../public/brand/onboarding-manifest.json) | IMPLEMENTED / PARTIAL VERIFICATION [#74](https://github.com/leonartist7/ARO.club/pull/74); independent privacy/security review open |
| RB3 | Home/Explore/Create first actions and truthful no-verified-supply state | IMPLEMENTED / PARTIAL VERIFICATION [#75](https://github.com/leonartist7/ARO.club/pull/75) |
| RB4 | Legacy fixture deep links recover without invented hosts, reviews or bookings | IMPLEMENTED / PARTIAL VERIFICATION [#76](https://github.com/leonartist7/ARO.club/pull/76) |
| RB5 | About, How, For Teachers, FAQ, Contact draft and public footer | IMPLEMENTED / PARTIAL VERIFICATION [#77](https://github.com/leonartist7/ARO.club/pull/77) |
| RB6 | Public leaderboard/bookings become truthful preview states | IMPLEMENTED / PARTIAL VERIFICATION [#78](https://github.com/leonartist7/ARO.club/pull/78) |
| RB7 | Quiet Preferences, Light/Dark/System, EN/FR/ES app shell, mobile navigation | IMPLEMENTED / PARTIAL VERIFICATION [#79](https://github.com/leonartist7/ARO.club/pull/79); inherited hosted failure repaired; see cloud evidence below |
| RB8 | Branded localized loading/error states, retry/Home, redirect-safe route sweep | IMPLEMENTED / PARTIAL VERIFICATION [#80](https://github.com/leonartist7/ARO.club/pull/80); inherited hosted failure repaired; see cloud evidence below |
| RB9 | Controlled 1200×630 OpenGraph/Twitter image and metadata | IMPLEMENTED / PARTIAL VERIFICATION [#81](https://github.com/leonartist7/ARO.club/pull/81); inherited hosted failure repaired; see cloud evidence below |
| RB10 | Login/Signup/Forgot Password localized presentation and truthful disabled preview | IMPLEMENTED / PARTIAL VERIFICATION [#82](https://github.com/leonartist7/ARO.club/pull/82); tested continuation source passes static/browser-smoke/platform; see below |

## Coverage and remaining work

- **Public:** Home, Explore, story/help, legacy recovery, future-route states, signed-out account entry, shared navigation and metadata have scoped changes. Legal text keeps its existing meaning. Protected `/games`, `/shop` and `/character-builder` remain future only.
- **App:** Home/Create/discovery and shared shell have scoped changes. Accepted FV-1 F1–F6 World, opportunity, commitment, Circles, messages, profile, library, insights and settings semantics remain; RB7 makes settings preferences functional. Full fixture-content localization, authenticated visual matrix and app-wide accessibility acceptance remain open.
- **Host and admin:** Existing screens inherit shared brand tokens. Teacher application, verification, publishing and admin data/Trust flows were deliberately not changed. Their authenticated visual audit depends on the separately governed hosted Auth/review lane. F7 ownership and immutable evidence remain untouched.
- **Onboarding:** RB2 is a nonpersistent preview. Live name/age/city/interest/profile writes, eligibility, one-account mode semantics and publishing authorization require a privacy/eligibility specification and independent review. Illustrative examples remain labelled fictional; no new verified status or live inventory is claimed.
- **Assets:** Onboarding scene originals/provenance are in `artifacts/ARO-RB2/` and responsive exports in `public/brand/`. The RB9 share image is generated from controlled SVG geometry. Licensed Polymath web assets are absent; Manrope 700 remains the approved heading fallback. Full asset/performance and social crawler acceptance remain open.

## Active gates and next actions

1. A reviewer resolves RB0's open conversations after inspecting the addressed changes; do not self-resolve or bypass branch protection.
2. An independent privacy/security reviewer assesses RB2 before merge and before any live age/profile implementation. Prepare the live eligibility specification with that review.
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
