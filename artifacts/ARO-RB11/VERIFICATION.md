# RB11 — English/light release presentation evidence

**Status:** IMPLEMENTED / PARTIAL VERIFICATION on stacked PR #85. Source screenshots and machine results were captured by hosted Chromium from `e486c8b2d0db6d93e04ef87a9347bb7661d71b7a`, Quality run [36411953290](https://github.com/leonartist7/ARO.club/actions/runs/36411953290). The final evidence-only head needs its own required checks. No merge, deployment, native build or store submission is asserted.

## Source and checks

- Base RB10 `e272fccc` descends from the founder-supplied `3111826`. PR #82's final-head `static`, `browser-smoke`, `platform` and Vercel statuses passed before RB11 started.
- Local `npm run lint -- --max-warnings=0`, `npm run type-check`, `npm test` (184 pass, three existing skips) and `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light npm run build` pass.
- Hosted `english-light-release` passes five 320–1440px checks with a dark device preference and stored Spanish/dark values. All render English/light, preserve stored values, contain no visible preference groups, overflow, page exceptions or writes. The 320px Home menu also contains no unfinished preferences. [Machine results](hosted/browser.json).
- The ordinary preview build retains the RB7 preferences browser suite. Required final-head browser-smoke/platform results remain the merge gate; no assertion is waived.

## Reviewed screenshots

| Route | Screenshot | Visual observation |
| --- | --- | --- |
| Public Home, 320×620 | [mobile](hosted/home-320-light-en.png), [open menu](hosted/home-menu-320-light-en.png) | First action is visible; the approved human scene begins at y≈544. Orange, ivory, open-O/dot and the yellow portal read consistently. The rest of the illustration requires scrolling on this short phone. |
| Public Home, 1440×900 | [desktop](hosted/home-1440-light-en.png) | Warm group scene and open yellow portal match the approved art direction, with live text and three clear task links. |
| Onboarding, 360×640 | [mobile](hosted/onboarding-360-light-en.png) | Preview disclosure, skip, progress, first action and illustration remain legible; no account or booking claim. |
| Settings | [320px](hosted/settings-320-light-en.png), [1440px](hosted/settings-1440-light-en.png) | English/light and preview-only status are explicit; language/theme controls are absent in the release build. Bottom navigation occupies the expected safe-area edge. |

The approved reference is [`docs/rebrand/reference/ARO-approved.png`](../../docs/rebrand/reference/ARO-approved.png). It is an art-direction image with embedded copy, not a production screen. The desktop composition preserves its palette, mark motif and human setting; the mobile composition gives the action priority and only previews the scene before a scroll. These captures sample layout, not keyboard, screen-reader or full-route certification.

## Repair history and limits

The initial screenshot run captured Home during its fade and could not support visual review; the capture now waits for the settled page. An intermediate Home edit duplicated the preview sentence in the DOM, causing the ordinary exact-text E2E check to fail. The final source uses one disclosure; the original check remains intact. Neither failed run is treated as acceptance evidence.

This branch does not make the account, inventory, host, commitment, Circle or message preview live. RB0 review conversations, RB2 independent privacy/security review, authenticated full-route acceptance, production Auth/eligibility, native packaging and store review remain open. The Google Fonts import remains a separate F7 frozen-network issue.
