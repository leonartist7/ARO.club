# RB16 English/light coherence — verification

**Base:** `codex/rb15-main-integration-20260929` at `a0cef112380f34f9c47c2a7e160fbbe4561fcf2e` (PR #90). Remote head checked before branching; no newer commit at intake. **Status:** IMPLEMENTED / PARTIAL VERIFICATION. The RB16 PR targets RB15 and remains unmerged.

## Visual comparison and changes

The approved `docs/rebrand/reference/ARO-approved.png` leads with an ivory ARO mark on orange, human scenes, a yellow portal, large Manrope fallback type and the Learn · Earn · Connect invitation. The integrated Home and onboarding already use the accepted artwork and full-image `contain` on onboarding. This pass changes the diverging inner routes:

| Surface | Before | After | Finding |
| --- | --- | --- | --- |
| Create, 360 / 1440 | [phone](before-create-360.webp) · [desktop](before-create-1440.webp) | [phone](after-create-360.webp) · [desktop](after-create-1440.webp) | Charcoal consumed the whole light-mode task screen; now ivory canvas, orange first path, white choices, clear question, with the darker local composition reserved as a preview scene. |
| App Explore, 360 / 1440 | [phone](before-app-explore-360.webp) · [desktop](before-app-explore-1440.webp) | [phone](after-app-explore-360.webp) · [desktop](after-app-explore-1440.webp) | Reading cards, title and labels now use the rounded ivory/white hierarchy and larger text. Existing contained source art stays fully visible. |
| Opportunity detail, 360 / 1440 | [phone](before-detail-360.webp) · [desktop](before-detail-1440.webp) | [phone](after-detail-360.webp) · [desktop](after-detail-1440.webp) | Replaced a dark secondary block with light orange/ivory context, marked the fixture host fictional, removed its unsupported verification icon/text, and localized the fit heading. |
| Onboarding, 360 / 1440 | [phone](before-onboarding-360.webp) · [desktop](before-onboarding-1440.webp) | [phone](after-onboarding-360.webp) · [desktop](after-onboarding-1440.webp) | Retained the already-matched adult scene, contained image and disclosure; no privacy or input behavior change. |
| App Home, 360 / 1440 | [phone](before-app-home-360.webp) · [desktop](before-app-home-1440.webp) | [phone](after-app-home-360.webp) · [desktop](after-app-home-1440.webp) | Spot check: orange invitation and ivory shell retained. Portal scene remains an older visual metaphor. |

Public Home, public Explore and signed-out login were also captured at [mobile](after-home-360.webp) and [desktop](after-home-1440.webp), [Explore mobile](after-explore-360.webp) / [desktop](after-explore-1440.webp), and [login mobile](after-login-360.webp) / [desktop](after-login-1440.webp). They retain the shared wordmark, Manrope and preview boundary. No new raster asset, dependency, backend operation, live account, supply, booking or payment behavior was added.

## Local checks

- `npm ci --ignore-scripts`; `npm run lint`; `npm run type-check`; `npm test -- --run`: 22 files, 189 passed, three existing skips. Ordinary and `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light` production builds passed with 54 generated pages each.
- Playwright Chromium revision 1234, production English/light build: `browser-checks.json` records 36/36 assertions across 320×620, 390×844, 768×900 and 1440×900: Create ivory canvas and no overflow, fictional detail/loaded image, onboarding loaded `object-fit: contain` image and CTA, no non-GET requests or uncaught page errors. Full-page screenshots captured at 360×740 and 1440×900. The ordinary production build additionally passed 38/38 assertions in `browser-checks-ordinary.json`, including language-menu and theme-toggle interaction. A 36-route public/account/app/host/support HTTP and overflow sweep at 390/1440px passed; the host application and dashboard correctly route to signed-out account entry. FR Home copy and dark mode were also exercised (`route-sweep.json`). The production builds were used for interactions because local Next dev HMR in this sandbox yielded nonresponsive click checks; that dev-server result is not reported as a product pass.
- Browser screenshots are representative, not a full accessibility audit. The public/account/host/support survey is still bounded to rendered routes and a signed-out host entry; an independent visual and accessibility review is required.

## Remaining issues and gates

1. The composition field still uses an abstract dark diagram, and app Home uses older portal art. Their source imagery differs from the approved human scene; any new imagery requires its own reviewed asset/provenance pass. The fictional field and counts are still synthetic, clearly labelled and do not represent inventory or demand.
2. Fixture descriptions, names and place/time strings in core app examples remain English even when the language menu selects French/Spanish. Dark and non-English visual polish, authenticated host/admin walkthroughs, full keyboard/screen-reader/zoom acceptance, font/image transfer budgets, social crawler checks and native store packaging remain open.
3. RB0 conversations, RB2 privacy/eligibility/security and Trust review, RB4 Trust review, RB5 Contact draft retention/deletion privacy specification, independent combined design/accessibility decisions, F7 evidence and protected-stack release checks remain open. Signup, bookings and payments remain disabled in this preview; no production-readiness assertion is made.
4. CodeRabbit and exact-head hosted CI status are tracked on the PR after publication. A skipped draft review cannot count as a pass.
