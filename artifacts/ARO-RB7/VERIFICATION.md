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
