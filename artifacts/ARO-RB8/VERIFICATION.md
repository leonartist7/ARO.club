# ARO-RB8 — Shared supporting states evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb8-supporting-states-20260928`, stacked on RB7. Not merged or released.

## Changed

- Replaced the unstyled global route-loading text with a branded, screen-reader announced status in EN/FR/ES. Motion stops under reduced-motion preference.
- Replaced the unstyled global error boundary with a localized message, working boundary retry callback and public Home link. The language hook has a safe English fallback when the provider is unavailable.
- Reused the controlled SVG wordmark and brand tokens. No generated assets, account data writes or new runtime destinations were added.

## Evidence

Rendered in the production build through temporary visual fixture routes, removed before commit: [320px dark French loading](loading-state-320-dark-fr.png), [390px light Spanish error](error-state-390-light-es.png), [1440px dark English error](error-state-1440-dark-en.png). All returned 200 with no page exceptions or horizontal overflow; see [browser matrix](browser.json). The fixture routes are absent from the final build.

The component interaction test covers EN/FR/ES, retry callback, Home destination, loading announcement and context fallback. Final build, ESLint and `npm run type-check` pass after fixture removal. The full Vitest suite passes: 20 files, 179 tests, 3 skipped. `git diff --check` passed.

## Limits

The screenshots verify rendering of the actual state components inside the app shell and providers. They do not demonstrate a real production exception, network outage or successful retry. Root HTML Suspense fallback remains an English boot message before stored language is available; live route loading uses the localized state. Auth, privacy, payment, F7 and release boundaries are unchanged.
