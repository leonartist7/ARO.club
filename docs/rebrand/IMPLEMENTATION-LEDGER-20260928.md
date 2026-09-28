# Orange rebrand implementation ledger — 28 September 2026

GitHub `main` is `fdda8106fc2c0df472f4349728da000ea5af65fe`. RB0–RB10 are stacked, unmerged review branches. No package is SHIPPED. This ledger supplements the [actual route classification](BASELINE-20260927.md), package specifications and per-package browser evidence; it does not override release or specialist gates.

| Package | Scope and evidence | Status / PR |
| --- | --- | --- |
| RB0 | Founder-approved palette, open-O/dot identity, route/asset baseline, ADR-031 | IMPLEMENTED / PARTIAL VERIFICATION [#72](https://github.com/leonartist7/ARO.club/pull/72); review threads open |
| RB1 | Shared tokens, controlled SVG mark, Manrope fallback, shared primitives | IMPLEMENTED / PARTIAL VERIFICATION [#73](https://github.com/leonartist7/ARO.club/pull/73) |
| RB2 | Three illustrated, skippable scenes and in-memory learner/host/both result preview; [art manifest](../../public/brand/onboarding-manifest.json) | IMPLEMENTED / PARTIAL VERIFICATION [#74](https://github.com/leonartist7/ARO.club/pull/74); independent privacy/security review open |
| RB3 | Home/Explore/Create first actions and truthful no-verified-supply state | IMPLEMENTED / PARTIAL VERIFICATION [#75](https://github.com/leonartist7/ARO.club/pull/75) |
| RB4 | Legacy fixture deep links recover without invented hosts, reviews or bookings | IMPLEMENTED / PARTIAL VERIFICATION [#76](https://github.com/leonartist7/ARO.club/pull/76) |
| RB5 | About, How, For Teachers, FAQ, Contact draft and public footer | IMPLEMENTED / PARTIAL VERIFICATION [#77](https://github.com/leonartist7/ARO.club/pull/77) |
| RB6 | Public leaderboard/bookings become truthful preview states | IMPLEMENTED / PARTIAL VERIFICATION [#78](https://github.com/leonartist7/ARO.club/pull/78) |
| RB7 | Quiet Preferences, Light/Dark/System, EN/FR/ES app shell, mobile navigation | IMPLEMENTED / PARTIAL VERIFICATION [#79](https://github.com/leonartist7/ARO.club/pull/79); hosted platform check red |
| RB8 | Branded localized loading/error states, retry/Home, redirect-safe route sweep | IMPLEMENTED / PARTIAL VERIFICATION [#80](https://github.com/leonartist7/ARO.club/pull/80); hosted platform check red |
| RB9 | Controlled 1200×630 OpenGraph/Twitter image and metadata | IMPLEMENTED / PARTIAL VERIFICATION [#81](https://github.com/leonartist7/ARO.club/pull/81); hosted platform check red |
| RB10 | Login/Signup/Forgot Password localized presentation and truthful disabled preview | IMPLEMENTED / PARTIAL VERIFICATION [#82](https://github.com/leonartist7/ARO.club/pull/82); static/browser-smoke pass, hosted platform check red |

## Coverage and remaining work

- **Public:** Home, Explore, story/help, legacy recovery, future-route states, signed-out account entry, shared navigation and metadata have scoped changes. Legal text keeps its existing meaning. Protected `/games`, `/shop` and `/character-builder` remain future only.
- **App:** Home/Create/discovery and shared shell have scoped changes. Accepted FV-1 F1–F6 World, opportunity, commitment, Circles, messages, profile, library, insights and settings semantics remain; RB7 makes settings preferences functional. Full fixture-content localization, authenticated visual matrix and app-wide accessibility acceptance remain open.
- **Host and admin:** Existing screens inherit shared brand tokens. Teacher application, verification, publishing and admin data/Trust flows were deliberately not changed. Their authenticated visual audit depends on the separately governed hosted Auth/review lane. F7 ownership and immutable evidence remain untouched.
- **Onboarding:** RB2 is a nonpersistent preview. Live name/age/city/interest/profile writes, eligibility, one-account mode semantics and publishing authorization require a privacy/eligibility specification and independent review. Illustrative examples remain labelled fictional; no new verified status or live inventory is claimed.
- **Assets:** Onboarding scene originals/provenance are in `artifacts/ARO-RB2/` and responsive exports in `public/brand/`. The RB9 share image is generated from controlled SVG geometry. Licensed Polymath web assets are absent; Manrope 700 remains the approved heading fallback. Full asset/performance and social crawler acceptance remain open.

## Active gates and next actions

1. A reviewer resolves RB0's open conversations after inspecting the addressed changes; do not self-resolve or bypass branch protection.
2. An independent privacy/security reviewer assesses RB2 before merge and before any live age/profile implementation. Prepare the live eligibility specification with that review.
3. Diagnose the hosted `platform` failure at `BROWSER_ONBOARDING_LANGUAGE_SKIP_360_LIGHT` on RB7 and descendants, including RB10. The same step failed twice on RB7; a local 360px component/browser reproduction passed. The hosted cause is not established. RB8–RB10 browser-smoke lanes are green; this does not waive `platform`.
4. Obtain valid licensed Polymath web files if the founder wants the display face; continue using Manrope 700 meanwhile.
5. After dependent PRs pass all required checks and independent reviews, merge in stack order through protected GitHub `main`, then perform the full route/theme/language accessibility, hosted Auth and release checks. Do not label any branch VERIFIED or SHIPPED before those gates pass.
