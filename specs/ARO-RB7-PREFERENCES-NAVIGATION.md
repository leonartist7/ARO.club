# ARO-RB7 — Quiet navigation and accessible preferences

## Authority and scope

- Status: **SPEC-READY**, version 1.0.0, 2026-09-28. Founder-approved rebrand plus the explicit request to clean the UI and move persistent theme/language controls out of the main view.
- Scoped PR stacked on RB6. Reuse `ThemeContext`, `LanguageContext`, current storage keys and UI primitives. No Auth, schema, Trust, payment or account role change.
- Public header, standalone onboarding preview header, public layout and app settings presentation are in scope. Keep deep links and keyboard navigation.

## Experience contract

The public header prioritizes the brand, primary discovery action and navigation. A single labelled Preferences control opens language and appearance choices on desktop. On phones, the same controls live inside the menu. The onboarding preview uses the compact Preferences control. The app Settings route presents real language/appearance controls where it currently says they are unavailable. Use full language names and explicit Light/Dark/System choices; system follows device preference until the person chooses otherwise. Keep existing stored `theme` values compatible.

The public marketing layout no longer mounts the app-style bottom tab bar: it duplicates navigation and advertises gated Games/Profile routes while covering content on short phones. The authenticated app retains its own navigation. Remove Games and Leaderboard from the public header account menu, since those are governed future-only routes, while preserving their direct URLs.

## Verification

- EN/FR/ES and light/dark/system choices work, persist and restore through the existing contexts.
- Preferences open/close with pointer and keyboard; Escape closes and returns focus; labels, focus rings and selected states are semantic. At 320px with a short viewport, the menu scrolls and the next action remains reachable. Reduced motion is respected.
- Check representative public, onboarding and app-settings screens at phone and desktop widths in both themes and all supported languages. Confirm public footer/header navigation and deep links, no horizontal overflow or page errors.
- Run build, lint, type checks and focused interaction tests. Do not claim full-route accessibility or release acceptance from this package.
