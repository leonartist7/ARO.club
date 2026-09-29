# RB17 reference-led first journey — verification

Source: `codex/rb17-reference-journey-20260929` from remote RB15 `28f017092608f2ce159927b9e52bd9eb77ca914c`, which merged PR #92. This is a presentation review candidate, not a production release. The six founder attachments informed the hierarchy; no reference image containing synthetic members or money claims was installed as site content.

## Visual comparison

The exact starting branch's captures are [public Home 390](../ARO-RB16/after/public-home-390.png), [public Home 1440](../ARO-RB16/after/public-home-1440.png), [app Home 390](../ARO-RB16/after/home-390.png) and [Create 390](../ARO-RB16/after/create-390.png). Final production render: [public Home 390](after-home-390.webp), [public Home 1440](after-home-1440.webp), [app Home 390](after-app-home-390.webp), [Explore 390](after-app-explore-390.webp), [Create 390](after-create-390.webp), [Create 1440](after-create-1440.webp), [onboarding 390](after-onboarding-390.webp).

Observed: the Home's human gathering section now comes immediately after the hero and before the three paths; the prototype diagram remains reachable lower on the page. On app Home, the primary action is a single orange Find a class button, the repeat destination panels and decorative synthetic member initials are removed. Create uses existing human ARO art, keeps the selected Learn/Share/Gather state and removes a duplicate navigation row. The app still has the portal image, static Calgary fixtures and preview language. The images are closer in warmth and hierarchy to references 1–5, not identical screen reproductions or real session cards.

## Executed checks

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run type-check` | PASS |
| `npm test -- --run` | 190 passed, 3 existing skips |
| `npm run build` | PASS, 54 static pages generated |
| `npm run test:e2e` (development server) | 24 passed, 1 failed: `/choose-role` was observed with 43 body characters or still loading during the broad sweep. The production route later rendered 200 with 585 characters; this intermittent development timing failure remains open. |
| Production Chromium, 390/1440 renders | 8/8 routes returned 200, no horizontal overflow, broken images or non-GET requests. Home story order asserted before formation. `/choose-role` was nonblank. |
| Existing Create art added request | Selected Share 640px asset is 54,702 bytes; Learn 62,540, Gather 65,630. No generated image or font added. |

Production browser checks covered public Home, app Home, Explore, Create, onboarding and signed-out `/choose-role`. The ordinary theme and EN/FR/ES architecture was preserved by source and 190 unit tests; a final dark and translated visual acceptance remains for independent review. RB17 changes no Auth, data, RLS, payment, location, Trust or F7 runtime. The earlier RB16 F7 evidence remains on the parent branch.

## Open before any release claim

- Account creation, personalized onboarding/profile, interest tags, real city/map, real supply, search/filter, host class drafting/publishing, checkout and coins need separate reviewed packages. See `docs/rebrand/PRODUCTION-PATH-20260929.md`.
- The app Home's portal art, fictional Calgary/counts, Explore's informational filter facsimile and Create's static class sketch still differ from the supplied app references. The onboarding preview is nonpersistent and not connected to a live account.
- Full dark/FR/ES visual acceptance, short-height and authenticated host/admin walkthrough, independent design/accessibility, RB2 privacy, RB4 Trust, RB5 Contact privacy, protected CI and corrective-head CodeRabbit/release reviews remain open. PR #92's corrective-head CodeRabbit review was rate limited even though its CI passed.
- This branch should stay unmerged until review and final-head checks pass; `main` still serves the older released site.
