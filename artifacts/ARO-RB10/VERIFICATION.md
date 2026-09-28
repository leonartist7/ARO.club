# ARO-RB10 — Account entry presentation evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb10-account-entry-presentation-20260928`, stacked on RB9. Not merged or released.

## Changed

- Replaced English-only, Tonguee-specific introductions on Login, Signup and Forgot Password with the ARO promise and EN/FR/ES copy through the existing language context.
- Localized labels, validation, preview-disabled notices, pending and success guidance, with dark-theme text/links and reduced-motion handling. Removed the nonfunctional “Remember me” checkbox. Signup’s email field now shares the existing disabled preview boundary with its other form fields.
- Kept Auth calls, safe return path, provider-supplied errors, callback/recovery logic, link destinations and server gating unchanged. N1 Auth PR #70 remains separately owned.

## Evidence

Before: [320px dark French Login](before-login-320-dark-fr.png), [390px light Spanish Signup](before-signup-390-light-es.png). After: [320px dark French Login](login-320-dark-fr.png), [390px light Spanish Signup](signup-390-light-es.png), [320px dark French Signup](signup-320-dark-fr.png), [390px light Spanish Recovery](forgot-password-390-light-es.png). Additional [desktop Spanish Login](login-1440-light-es.png) and [768px dark English Recovery](forgot-password-768-dark-en.png) captures are included.

The [production-browser matrix](browser.json) covers six 320–1440px cases across EN/FR/ES and light/dark. All routes returned 200 with the expected translated heading and theme, no horizontal overflow, page exceptions or non-GET requests. In preview mode every form input and submit button stayed disabled. Login, Signup, Recovery and legal destinations remained in the DOM. Final build, ESLint, TypeScript and the full Vitest suite passed (20 files, 179 passed, 3 skipped). The full local E2E suite passed all 25 checks, including account fail-closed behavior and protected-route rejection.

## Limits

No backend account creation, sign-in or password email was exercised by this visual package. Live Auth, hosted signup/recovery, callback review, privacy/security review and release remain governed separately. GitHub static, browser-smoke and Vercel preview checks pass for PR #82; the hosted platform lane fails at the inherited `BROWSER_ONBOARDING_LANGUAGE_SKIP_360_LIGHT` step and is not waived by this package.


## 2026-09-28 cloud continuation

The original platform limitation above is superseded by the confirmed RB7 layout repair, inherited through RB8/RB9 without changes to RB10 Auth presentation or backend boundaries. Tested source `add2a418617e435d5a0a1a58085aa53940c1ce96` passes [Quality 36407547820](https://github.com/leonartist7/ARO.club/actions/runs/36407547820) and [platform 36407547856](https://github.com/leonartist7/ARO.club/actions/runs/36407547856). Local build/lint/type checks and 184 unit tests pass (3 existing browser-gated skips). Hosted browsers provide the visual/interaction evidence because this container cannot start Chromium. See [RB7 retained screenshots/results](../ARO-RB7/VERIFICATION.md#retained-hosted-evidence-cloud-continuation) and [updated ledger](../../docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md). The final evidence-only merge must still pass its own required checks; independent reviews, live eligibility specification and release remain open. No VERIFIED/SHIPPED claim.


## Reviewed upstream reconciliation — 2026-09-28

Merged reconciled RB9 f95ed1b in order, retaining original cloud RB10 e272fcc and reviewed RB6 8799e78 ancestry. Account-entry source and cloud evidence remain preserved. Updated ledger records conflict decisions, exact incoming heads, stale upstream test diagnosis, PR #84 ownership and both independent-review gates. New-head hosted checks are pending, and historical green runs must not be represented as current acceptance. No main merge, release or VERIFIED/SHIPPED claim.

Local reconciliation checks: production build, lint with zero warnings, type check and 185 unit tests pass (3 existing browser-gated skips). `git diff --check` passes. RB10's additional changelog conflict was resolved by retaining both cloud and reconciliation entries. No new visual acceptance is claimed from this integration-only task.

Post-publish hosted checkpoint: GitHub reports #79–#82 conflict-free. RB7 platform 36436884165 fails at BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT; the incoming RB4 proxy guard collides with the reserved /teacher/application Auth route. Initial SQL/Auth/Trust checks and cleanup pass. See the implementation ledger for exact source diagnosis and RB4/Auth owner action. This is not a green integration acceptance; independent review gates remain.

Additional RB7 hosted result: 32 browser component checks and Preferences matrix pass; E2E has 22 passes and 3 failures (reserved /teacher/dashboard Login redirects, plus an ambiguous duplicate French provenance-text locator). These are recorded in the ledger for upstream owners; no protected-access assertion is weakened and no authenticated exposure is inferred from a missing redirect alone.
