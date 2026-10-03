# ARO-RB11 — English/light release-scope presentation

**Status:** IMPLEMENTED / PARTIAL VERIFICATION on branch · version 1.0.0 · 2026-09-28. Founder direction: English and light mode first, with existing theme/localization architecture retained and unfinished choices absent from the release UI. Branch stacked on RB10 at `e272fccc2da80330d98485fe963558286446ca1a`. See `artifacts/ARO-RB11/VERIFICATION.md`.

## Scope

An explicit `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light` build selects English/light regardless of stored language, theme or device theme. The release build hides language/appearance controls in the public header/menu, onboarding preview and app Settings, and explains current availability in Settings. Preserve stored preferences without overwriting them so a later reviewed language/theme package can restore the controls. Without this build setting, the existing EN/FR/ES and Light/Dark/System experience and RB7 tests remain unchanged. Public Home also gives the approved human scene a short mobile crop immediately after the first action, with its preview disclosure following the image; desktop hierarchy remains intact.

This is presentation scope only. Do not change Auth, account profile/age writes, Trust, host authorization, payments, backend inventory, legal text, vertical identity, native packaging or protected F7 evidence. The flag is not authorization to deploy or submit a store build.

## Acceptance

1. In an English/light build, stored Spanish/dark settings and a dark device preference do not change displayed language or theme. Storage is preserved and no preference option is exposed in the public menu, onboarding or app Settings.
2. Onboarding and public first actions remain reachable at short phone heights; Settings accurately describes unavailable account controls. No horizontal overflow, browser exception or non-GET request in sampled routes.
3. The ordinary preview build retains RB7 language/theme controls and its regression suite; build, lint, type and unit checks pass.
4. Hosted Chromium retains mobile and desktop English/light screenshots and machine results; compare with `docs/rebrand/reference/ARO-approved.png` and report gaps. Samples are not full-route accessibility acceptance.

## Release and recovery

The flag is a build-time choice. Removing it restores ordinary theme/language behavior and stored choices. The first store candidate requires a separately approved native packaging specification and store/privacy/eligibility reviews. RB0 conversations, RB2 independent review, final stack checks and hosted Auth gates remain open. Merge in stack order only after required checks and reviews pass.
