# ARO-RB8 — Shared loading and error states

## Authority and scope

- Status: **SPEC-READY**, version 1.0.0, 2026-09-28. Founder-approved orange rebrand and request to continue eligible UI/UX cleanup.
- Stacked on RB7. Presentation-only runtime scope: global Next loading and page error boundaries, their English/French/Spanish copy, retry action and related evidence. A test-harness adjustment may accept a browser navigation abort only after the expected route loads, or after a governed account-entry redirect reaches Login; every protected route must still prove the Login destination. No Auth, schema, Trust, payment, eligibility, release or F7 behavior change.

## Experience contract

Loading presents a quiet branded status with an accessible live announcement and reduced-motion support. Error presents a clear title, plain explanation, a working retry action and a safe route back to public Home. Use the existing ARO mark, palette, Manrope fallback and language context. Do not imply saved user data or a successful retry. Keep the error surface readable at 320px and in dark mode, with visible focus and 44px targets.

This package does not alter route-level legacy recovery or app-only missing states. If the language context itself cannot initialize, render an English fallback rather than throwing from the error boundary.

## Verification

- Render both components in EN/FR/ES; retry callback is invoked on click and Home points to `/`.
- Verify light/dark and 320px/desktop layouts in a running build where the states can be triggered safely. Confirm semantics, focus, no horizontal overflow and no write request from viewing/retrying the mock state.
- Run build, lint, type check and relevant tests. Record precise limits on browser evidence; do not claim full-route release acceptance.
