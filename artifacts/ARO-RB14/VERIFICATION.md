# RB14 — Theme and language control simplification evidence

**Status:** IMPLEMENTED / PARTIAL VERIFICATION on `codex/rb14-theme-language-controls-20260929`. No merge or production release is claimed.

## Source

- Parent: RB13 exact head `5ef96e52abeb333d5eec52c06a1296136bfab008`.
- Package spec: [ARO-RB14-THEME-LANGUAGE-CONTROLS.md](../../specs/ARO-RB14-THEME-LANGUAGE-CONTROLS.md).

## Implemented behavior

- Replaced the gear-based combined Preferences popover with two direct controls: language dropdown + icon-only sun/moon theme toggle.
- Public desktop and phone headers use the same controls; mobile controls stay outside the navigation drawer.
- Onboarding and app Settings reuse the same component.
- App shell exposes the same controls; non-actionable search/notification preview icons are hidden below the small breakpoint to preserve narrow-phone geometry.
- Existing ThemeContext/LanguageContext and storage keys are preserved. No backend, account, Trust, payment or eligibility authority changed.
- Fixed 44px control geometry avoids rem-amplified button growth under the existing 200% text-scaling checks.

## Verification plan

The package updates focused component tests and the existing RB7 production browser verifier to cover:
- language menu selection and persistence;
- theme toggle persistence;
- keyboard Escape + focus return;
- outside pointer dismissal;
- unavailable localStorage;
- 320–1440px layouts;
- 200% text scaling;
- public, onboarding, app Settings and 320px app shell paths.

Final-head lint, type-check, build, hosted browser and platform statuses remain required before promotion beyond PARTIAL VERIFICATION.
