# ARO-RB14 — Theme and language control simplification

## Authority and scope

- Status: **SPEC-READY / implementation active**, version 1.0.0, 2026-09-29.
- Founder direction: replace the visually heavy Light/Dark + language preference treatment with a simple sun/moon theme toggle and a responsive language dropdown, consistently across the public website, onboarding and app surfaces.
- Base: exact RB13 integrated visual candidate `5ef96e52abeb333d5eec52c06a1296136bfab008`.
- This is presentation and local preference behavior only. No Auth, schema, RLS, Trust, payments, eligibility, account-role, inventory or location behavior changes.

## Experience contract

1. Theme
   - Use one icon-only control with a minimum 44×44 CSS-pixel target.
   - In light mode the control shows a moon and switches to dark.
   - In dark mode the control shows a sun and switches to light.
   - Clicking the control creates an explicit light/dark preference through the existing ThemeContext and keeps the existing storage key.
   - Existing stored `system` values remain readable for backward compatibility, but System is no longer exposed as a primary UI choice.

2. Language
   - Use one compact dropdown control showing the current language code.
   - The menu lists English, Français and Español using full names.
   - Selection updates through the existing LanguageContext and storage key.
   - The menu must open on the selected item, close on selection, outside pointer, blur or Escape, and restore focus to its trigger after Escape.
   - The menu must remain within the viewport on phone, tablet and desktop widths.

3. Placement
   - Public desktop header: theme + language controls remain directly available.
   - Public phone header: theme + language controls remain directly available next to the menu trigger; do not bury them in the navigation drawer.
   - Onboarding preview header: use the same controls.
   - App Settings: reuse the same controls.
   - App shell: expose the same controls. At narrow widths, visually suppress only the existing non-actionable search/notification preview icons when necessary to preserve usable preference controls and profile access.
   - The RB11 `english-light` opt-in release scope may continue hiding unfinished preference controls when that explicit build flag is enabled; ordinary builds retain the full controls.

## Accessibility and responsive requirements

- Every trigger has a semantic accessible name and visible focus treatment.
- Language trigger uses `aria-haspopup="menu"`, `aria-expanded`, unique `aria-controls`; choices use `menuitemradio` and `aria-checked`.
- Theme control exposes localized action labels such as “Switch to dark mode,” not just an icon name.
- Keep 44×44 minimum targets while allowing text to scale to 200%.
- Verify at 320, 360, 390, 430, 768 and 1440 widths without horizontal overflow.
- Reduced motion remains respected; no decorative animation loop is introduced.

## Verification

- Focused Vitest coverage for persistence, language selection, theme toggling, unavailable storage, outside dismissal, Escape and unique menu IDs.
- Public Header and AppShell regressions.
- Production browser path checks for public mobile/desktop, onboarding, app Settings and app shell mobile.
- Repeat the compact-control matrix at 100% and 200% text scaling.
- Run lint, type-check, production build and required hosted CI. This package remains PARTIAL until final-head CI and visual/accessibility review complete.
