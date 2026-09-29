# RB13 integrated visual candidate — 29 September 2026

**Status:** IMPLEMENTED / PARTIAL VERIFICATION. Source branch `codex/rb13-integrated-visual-release-20260929` starts at PR #84 `2b809927` and merges RB11/RB12 source `670954f` by normal ancestry. No upstream owner branch, protected F7 evidence, database or release setting was rewritten. This is an English/light visual candidate, not a live service or store build.

## What changed

- Preserved RB11's opt-in English/light release presentation and RB12's orange field, ivory mark and adult scene art on the latest RB6/RB10 source. The Home merge retains the updated gathering destination and explicit formation preview disclosure. The story merge retains the language-teaching scene and FAQ guidance/privacy links.
- On short phones, onboarding scenes 1–2 now show accepted scene art before the primary action and keep the input-retention notice before teaser choices. Public Explore and story pages use the same orange/ivory image-led hierarchy as Home, with the primary action and scene visible in the first viewport.
- App Home uses the approved orange invitation and removes a redundant preview/notification row; the app shell still states fictional preview. Opportunity examples appear before inactive search/filter mock controls. Their copy explicitly says the examples are fictional and the controls are inactive. Page-level headings are now semantic `h1` on app list, settings and supporting views.
- No image was generated for RB13. The accepted RB2 WebPs are reused; the controlled SVG wordmark and local licensed Manrope remain the brand masters. Polymath assets are still absent.

## Visual evidence

Reference: [founder-approved image](../../docs/rebrand/reference/ARO-approved.png). Earlier text-led examples: [RB3 Home](../ARO-RB3/home-320-light-en.png), [RB2 onboarding](../ARO-RB2/320-light-en-learn-intro.png), [RB5 About](../ARO-RB5/about-320-light-en.png). Current production-build examples: [Home phone](release-candidate/home-320.png), [Home desktop](release-candidate/home-1440.png), [onboarding phone](release-candidate/onboarding-320.png), [Explore phone](release-candidate/explore-320.png), [About phone](release-candidate/about-320.png), [teacher story phone](release-candidate/teachers-320.png), [app Home phone](release-candidate/app-home-320.png), [opportunities phone](release-candidate/opportunities-320.png), [Create phone](release-candidate/create-320.png), [settings phone](release-candidate/settings-320.png).

The orange field, open-O geometry, Manrope hierarchy, first action and adult activity art were inspected in those captures. The `320×620` onboarding primary action ends at pixel 610; Home, Explore, About and teacher-story art begins within the same first viewport. The Home desktop crop keeps all four adults and the portal visible. App World and Create retain their intentional spatial/charcoal treatment; they are not represented as live data.

## Checks run on the integrated source

| Check | Result |
| --- | --- |
| `NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light npm run build` | PASS, 54 generated route entries, TypeScript pass |
| Ordinary `npm run build` | PASS, existing theme/localization build retained |
| `npm run lint`; `npm run type-check` | PASS |
| `node node_modules/vitest/vitest.mjs run --configLoader runner` | PASS after updating the truthful opportunity preview assertion; 187 pass, 3 existing skips |
| `FV1_BROWSER_EVIDENCE=true` with installed Chrome and Vitest runner | PASS after aligning the browser expectation with the visible fictional-opportunity intro and accessible inactive-control labels; 40 observations across five widths, light/dark and four app routes, 44px minimum targets, 16px minimum essential copy, zero horizontal overflow and zero create-network side effects |
| `ARO_BROWSER_EXECUTABLE=<installed Chrome> node scripts/verify-rb13.mjs` | PASS: [16 screenshot/viewport results](release-candidate/browser.json), [40 route checks](release-candidate/route-sweep.json), no page exceptions, horizontal overflow or non-GET requests in the sampled walkthroughs |
| Ordinary build plus `scripts/verify-rb13-ordinary.mjs` | PASS: [Spanish/dark and French/light results](ordinary-preferences/browser.json); stored preferences and normal UI behavior survive the opt-in release flag |

The direct `npm test` invocation on this Windows sandbox could not bundle `vitest.config.js` because esbuild was denied access while traversing `C:/`. Vitest's supported `--configLoader runner` completed the same 21 test files. Local Edge headless launch closed immediately; installed Chrome produced the saved browser results. The first hosted browser run exposed a stale test expectation after the opportunity-copy change; the test now asserts the visible new intro and the accessible, inactive search/filter previews. Hosted CI on the corrected branch remains required.

Mobile reused art is 65,630 bytes (connect), 62,540 bytes (learn) and 54,702 bytes (language-teaching) from [measured files](release-candidate/asset-bytes.json), each below the existing 250 KB first-illustration budget. The approved reference is evidence only and is not used as a raster logo. Orange/charcoal contrast is 4.58:1, orange/ivory large-heading contrast 3.21:1, and action-orange/white contrast 4.88:1. This is a color-pair calculation, not full-route accessibility certification.

## Open gates

RB0 review conversations, RB2 independent privacy/eligibility/security and Trust review, RB4 Trust review, RB5 SPEC-REQUIRED Contact draft retention/deletion privacy review, final-head protected CI and independent design/accessibility review remain open. Live profile/age onboarding, production Auth/SMTP/backend review, authenticated host/admin visual acceptance and native iOS/Android packaging are separate approved-package work. The current preview must not be described as real inventory, bookings, earnings or a submitted app. The 40-route sweep checks route response and basic browser health; it does not certify every protected journey or screen-reader path.

## Responsive image-fit follow-up — 2026-09-29

The app imagery correction is a follow-up to integrated candidate source `5ef96e52abeb333d5eec52c06a1296136bfab008`. App Home, World, opportunity list/detail, Circle room, Insights and Passport now pair artwork with its source aspect ratio and use `object-contain`; text that previously covered the scene now sits beside or below it. Profile portraits and small history thumbnails keep their intentional circular/square crops. No new image asset or dependency was added.

Checks against the image-fit source: production build, lint, type-check and all 21 unit-test files passed (187 passed, 3 existing skips). The browser matrix is pending. Playwright Chromium revision 1234 repeatedly downloaded as a truncated archive (missing ZIP central directory), so this environment could not render screenshots or run the expanded 80-case browser matrix. The browser screenshots and 40 observations above remain evidence for the earlier integrated candidate and do not verify this image-fit follow-up. Keep RB13 at IMPLEMENTED / PARTIAL VERIFICATION until browser checks and independent design/accessibility review run on the updated source.

### Onboarding introduction fit correction

The three onboarding introduction scenes now use a 4:3 frame matching the 640×480 source artwork and `object-contain`, including the compact mobile placements. This removes the short fixed-height frames that cropped the illustrations. The RB13 browser check now records computed fit and frame/image ratios, and fails if onboarding artwork does not remain uncropped. Production build, lint, type-check and the full unit suite pass on this update (187 passed, 3 existing skips). The updated browser check could not be executed here because Chromium is unavailable after the truncated browser download; screenshots for this source remain unverified.
