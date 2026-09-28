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

No backend account creation, sign-in or password email was exercised by this visual package. Live Auth, hosted signup/recovery, callback review, privacy/security review and release remain governed separately. The inherited hosted platform lane continues to fail at the teacher-onboarding language-skip step and is not waived by this package.
