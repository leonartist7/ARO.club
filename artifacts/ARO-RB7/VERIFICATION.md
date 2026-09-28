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
