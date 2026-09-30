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
| Existing Create art added request | [Production response measurements](create-image-browser.json): 320/390 choose 640px assets (Learn 62,540 B; Share 54,702 B; Gather 65,630 B). 768/1440 choose 1280px assets (Learn 157,776 B; Share 123,024 B; Gather 163,214 B). RB16 Create had no image in this composition, so these are added per-route requests. No generated image or font added. All 12 mode/viewport checks focused the updated result and had no overflow. |
| RB12 website verifier after CI correction | English/light production build and `node scripts/verify-rb12.mjs` PASS for nine viewports/routes. [Machine result](rb12-browser.json). The verifier now checks the visible `#how-it-works` hero destination. |

Production browser checks covered public Home, app Home, Explore, Create, onboarding and signed-out `/choose-role`. The ordinary theme and EN/FR/ES architecture was preserved by source and 190 unit tests; a final dark and translated visual acceptance remains for independent review. RB17 changes no Auth, data, RLS, payment, location, Trust or F7 runtime. The earlier RB16 F7 evidence remains on the parent branch.

## Open before any release claim

- Account creation, personalized onboarding/profile, interest tags, real city/map, real supply, search/filter, host class drafting/publishing, checkout and coins need separate reviewed packages. See `docs/rebrand/PRODUCTION-PATH-20260929.md`.
- The app Home's portal art, fictional Calgary/counts, Explore's informational filter facsimile and Create's static class sketch still differ from the supplied app references. The onboarding preview is nonpersistent and not connected to a live account.
- Full dark/FR/ES visual acceptance, short-height and authenticated host/admin walkthrough, independent design/accessibility, RB2 privacy, RB4 Trust, RB5 Contact privacy, protected CI and corrective-head CodeRabbit/release reviews remain open. PR #92's corrective-head CodeRabbit review was rate limited even though its CI passed.
- First PR #94 hosted Quality run 36637738083 failed the old RB12 `#formation` hero-anchor assertion after the hero link intentionally moved to `#how-it-works`. The assertion was corrected and passed locally. First isolated database run 36637738138 failed the inherited intermittent `BROWSER_DOCUMENT_RETRY_CHOOSER_1440_LIGHT` authenticated-browser case; no database/Auth/chooser source changed here. Fresh exact-head CI is required.
- Codex PR review found three valid issues: result focus after mode selection, measured 1280px image responses, and an auditable SPEC-READY approval record. The first two have runtime/browser corrections and the third is explicitly recorded in the package spec with the founder's visual authorization and the working-tree timing. No specialist approval is inferred.
- The second-head isolated database run 36638381301 passed on `363fd902`. Its Quality run 36638382588 remained in progress when the review corrections were prepared. These runs do not validate the later focus/evidence correction head; final-head checks remain required.
- This branch should stay unmerged until review and final-head checks pass; `main` still serves the older released site.

## 2026-09-30 onboarding choice follow-up

The founder requested removal of the repeated refresh notice, more icon-led Learn interests, and more Earn skill tags. The revised introduction has nine selectable interests with distinct icons and six language-activity examples. The same choices carry into the later local selection and result; EN/FR/ES strings are aligned. A short nonpersistence disclosure remains where name and age are entered. This is still a local adult-only preview, with no additional teaching category or publishing authorization.

On the revised source, `npm run lint` passed, `npm test` passed 190 tests with 3 existing skips, `npm run type-check` passed, `npm run build` passed, and `git diff --check` passed. The RB2 browser verifier was updated for the shorter disclosure and the last Earn choice, but could not run here: the pinned Playwright Chromium revision 1234 is absent and its CDN download returned an invalid empty archive. Capture and inspect the deployed mobile and desktop route on the corrective head; recheck CI and CodeRabbit before merging. Earlier screenshots above show the prior RB17 head, not this follow-up.
