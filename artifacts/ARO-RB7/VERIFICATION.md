# ARO-RB7 — Preferences and navigation evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb7-preferences-navigation-20260928`, stacked on RB6. This branch is not merged or released.

## Changed

- Replaced persistent public and onboarding language/theme buttons with one Preferences control. Phone public controls are inside the scrollable menu; keyboard Escape returns focus.
- Added full language names, Light/Dark/System choice, stored preference recovery and device-theme changes. Existing `theme` and `conversa-language` storage keys remain.
- Made app Settings language/appearance controls functional and translated shared app navigation and semantic labels.
- Removed the duplicate public bottom navigation and future-only Games/Leaderboard account-menu entries. Direct URLs remain intact.

## Evidence

Before: [RB5 public About at desktop width](../ARO-RB5/about-1440-dark-fr.png). After: [desktop Preferences](about-preferences-1440-dark-es.png), [phone Home](home-320-light-en.png), [phone menu](menu-320-dark-fr.png), [onboarding](onboarding-preferences-390-light-es.png), [app Settings](app-settings-768-dark-fr.png).

Production-build browser checks: `node scripts/verify-rb7.mjs` on 320×620 EN/light → FR/dark and reload; 1440×900 ES/dark → System/light; 390×844 onboarding EN → ES; 768×900 app Settings FR/light → dark. All four routes returned 200, with no horizontal overflow, page exceptions or non-GET requests. Public bottom tabs were absent. Focus returned after Escape and language/theme values persisted. See [machine results](browser.json).

Build, ESLint and `npm run type-check` passed. The full Vitest suite passed: 19 files, 175 tests, 3 skipped. Focused Header/AppShell/AppReturn tests passed after the shell-label update. `git diff --check` passed. No new raster assets or font license claims were introduced. This visual sample is bounded; it does not certify every route, all accessibility criteria, Auth, privacy or a production release.

## Remaining

- Independent RB0 review threads and RB2 privacy/security review gate the stacked rebrand merge. Live onboarding data/eligibility integration and the wider rebrand route matrix remain separate work.
- Full-route localization and accessibility acceptance, responsive polish beyond these sampled screens, production release and Vercel confirmation remain open.

## Cloud continuation — hosted failure diagnosis (2026-09-28)

The continuation first verified RB10 remote HEAD and clean checkout at
`31118262783728db55a21c9e138537b52f7aebf1`, then isolated RB7's owning branch at
`eb2d51bae1cf6d20164ed18bd9109bb1df168ed8`. PR #82 platform run
[36404033802](https://github.com/leonartist7/ARO.club/actions/runs/36404033802)
passes 91 SQL assertions and initial Auth/Trust checks before failing at
`BROWSER_ONBOARDING_LANGUAGE_SKIP_360_LIGHT`. This is legacy teacher onboarding,
not RB2 preview or the preference language selector.

A bounded failure diagnostic records only button/main/footer geometry and
pointer interception, plus a synthetic screenshot after credential-input
absence is asserted. Original click, failure propagation, Auth, SQL, cleanup,
journey and performance assertions are unchanged. Suspected cause is footer
interception after removal of public bottom-tab padding; not yet established.

Baseline RB10 build/lint and 179 unit tests passed (3 skipped). Local browser
verification is blocked: Playwright CDN returned an invalid archive; the official
Chrome for Testing 151.0.7922.34 download succeeded, but startup failed with
`socket() failed: Operation not permitted`. No browser flag, security gate or F7
lab requirement was changed. Hosted evidence is required before claiming a fix.

### Cause established; repair candidate

Diagnostic commit `c39d0f77cd680bc5980915a71b94b4f2af009515` / run
[36406063605](https://github.com/leonartist7/ARO.club/actions/runs/36406063605)
reproduced the failure. At the click attempt, the button occupied y=756–800 and
the footer began at y=736; `receivesPointer=false`,
`interceptedByFooter=true`. Artifact `10961693842` retains the synthetic failure
screenshot. The card's fixed 600px wrapper lets its selected-state action escape
normal layout. RB7's removal of bottom-tab padding exposed that overflow.

The repair changes only the two selection-card wrappers in each existing
student/teacher onboarding view from fixed height to minimum height. They can
grow with text and selected-state controls. No fields, values, eligibility,
Auth, application persistence, submission, categories or verification changed.
The diagnostic remains on failure; original CI assertions and budgets remain.

Preferences additionally uses unique panel IDs, focuses the selected language,
closes when keyboard focus leaves, provides a 44px close target, and scrolls
within a short viewport. Five focused real-provider interaction tests pass,
covering language/theme persistence, device-theme changes, unavailable storage,
Escape, outside pointer and keyboard dismissal. Hosted browser regression now
runs the portable existing RB7 script against a production build, retaining
public/onboarding/settings and 320–1440px short-height/200% text evidence in
`rb7-preferences`. No F7 script, lab, budget or immutable evidence is modified.

Candidate local verification: build, lint, type check and 180 unit tests PASS
(3 existing browser-gated tests skipped). Hosted visual and authenticated
acceptance remains pending on the repair commit; local browser startup remains
blocked by the container. The temporary local presentation fixture was removed.

### Hosted continuation result and test readiness correction

- Candidate `a7334b1`: platform run [36406677640](https://github.com/leonartist7/ARO.club/actions/runs/36406677640), job 108876975355 **passed**. The full authenticated browser matrix, Auth/Trust boundaries, 91/91 pgTAP twice, recovery/logout, reset and cleanup all passed. The original language-skip failure is repaired without weakening its assertion.
- Quality run 36406677636: static passed; the added preferences matrix stopped at Settings because its readiness selector incorrectly required an h1. Settings uses the existing AppSectionHeading h2. Corrected readiness to the first accessible heading, retaining every scenario/assertion, and write partial results in finally for diagnostics. Re-run pending; this is not a VERIFIED/SHIPPED claim.

### Retained hosted evidence (cloud continuation)

Tested source `bbd1b2b1ec458690bddc03fcb9786badeb25bdb0`:
- Quality run [36407355886](https://github.com/leonartist7/ARO.club/actions/runs/36407355886): static and the added preferences step pass. Ordinary E2E is still running at this evidence checkpoint; do not infer final job success.
- Platform run [36407355888](https://github.com/leonartist7/ARO.club/actions/runs/36407355888): passed again on the corrected test source.
- [Machine results](cloud-continuation/browser.json): all 16 scenarios return 200, without page errors, horizontal overflow or non-GET requests. All twelve short-height cases keep the panel inside the viewport, reach System by keyboard and restore focus with Escape. The 2x cases enlarge root text to 200%; this is text scaling, not a claim of native browser-zoom certification.
- Visually inspected and retained: [320px dark, 200% text, scrolled to System](cloud-continuation/onboarding-preferences-320-dark-en-2x.png), [1440px light Spanish](cloud-continuation/onboarding-preferences-1440-light-es-1x.png), [desktop dark Spanish](cloud-continuation/about-preferences-1440-dark-es.png), [768px French Settings](cloud-continuation/app-settings-768-dark-fr.png). Labels, selected states and preview disclosures remain clear in these samples.
- Hosted layout evidence: [before, footer intercepts language skip](cloud-continuation/before-language-skip-360-light.png) from diagnostic run 36406063605; [after, subsequent ready step reachable](cloud-continuation/after-onboarding-ready-360-light.png) from passing platform run 36406677640. The after image is a later journey step, not the identical selection state. Existing synthetic account fields are test evidence only.
- Export provenance: preferences artifact 10962574585, SHA-256 `85ad56a898dc01d6e8de6474cf02e342f7355070aa7ee4f695ce2fdc5bbb481b`; platform artifact 10963080391; diagnostic artifact 10961693842. Selected originals and machine results are committed with [file hashes](cloud-continuation/SHA256.json). Hosted ZIPs expire 2026-10-05.

Self-review: only layout sizing, preference accessibility, bounded diagnostics, portable regression execution and evidence changed. No dependency, Auth handler, schema, RLS, privacy/eligibility flow, Trust, payment or F7 evidence changed. Manrope and approved brand direction remain. Performance budgets and original assertions were not relaxed; no new performance improvement claim is made. Full-route accessibility/localization and independent review/release gates remain open.

## Local review-fix stack reconciliation — 2026-09-28

Merged reviewed RB6 `8799e785b523c178eee7c1596bf9be0d3fe568a2` into cloud RB7 `1960c797b67bc78a5ee9e2ffb612a4d5800832c4` using normal two-parent ancestry. Header conflicts retain the incoming xl breakpoint together with quiet Preferences and the scrollable menu. AppShell keeps localized labels and the incoming orange central action / Back to World exit. Changelog entries from both parents are preserved. Existing onboarding minimum-height repair, preference accessibility, diagnostics and retained cloud evidence remain intact.

Incoming RB6 Quality run 36436067479 failed two stale Create-destination assertions. Reconciled tests now assert the reviewed World exit inside Create and retain an explicit Create entry check outside it; no test was skipped or disabled. Local build, lint, type checks and 181 unit tests pass (3 existing browser-gated skips). Hosted checks on this new merge commit are pending; previous screenshots remain historical evidence, not new visual acceptance.

RB2 independent privacy/security review remains required. RB5 is SPEC-REQUIRED pending independent privacy review of browser-local contact-draft retention/deletion. Existing review conversations remain open. No main merge, release, gate closure, Auth/Trust/payment/F7 change or VERIFIED/SHIPPED claim. PR #84 source-plan head was confirmed at 7e3f9568202b37b7aeb420f9b642efb80121b1a2 and left with its owner.

### Corrected local handoff incorporated

The founder superseded RB6 8799e78 with `95ec42139f83ac171bc5362527ce21ebec652426`. The only incoming changes are the two navigation test files. Adopted the upstream owner's versions exactly: both Create entry and World exit remain asserted. This replaces the equivalent temporary cloud assertion repair; runtime and cloud evidence are unchanged. Targeted shell/discovery tests pass (15 passed, 1 existing browser-gated skip). New-head hosted checks are required. The reserved teacher-route proxy collision and French provenance E2E ambiguity recorded in the descendant ledger remain unresolved, as do RB2/RB5 independent gates.
