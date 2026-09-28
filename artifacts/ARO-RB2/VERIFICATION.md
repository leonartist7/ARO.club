# RB2 onboarding preview — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb2-onboarding-preview-20260927`, stacked on RB1. This is an in-memory sample, not live signup or eligibility collection.

## Completed criteria and evidence

| Criterion | Evidence |
|---|---|
| Three brief scenes, skip, choice of Find / Teach / Both | `src/views/OnboardingPreview.jsx`; six browser path runs in `browser.json`; intro/teach/choice captures below |
| Name, age, coarse manual city, interests or language activity | Field validation and learner/host result captures; host drafts use only three fixed language/community fixtures. The six-path browser matrix and captures were rerun after this correction. |
| Useful, honest result | Learner idea and editable host draft shown as examples, no inventory/earning/booking/verification claim; result captures |
| One account, changeable starting intent | “Both” starts in discovery and switches to a class draft in the browser run; no role or publish permission is written |
| Localization, themes, widths | Browser matrix: 320×620 EN light; 360×700 FR light; 390×844 ES dark; 430×740 EN light; 768×900 FR dark; 1440×900 EN light. Zero horizontal overflow or page errors |
| Privacy and navigation | Browser run records zero non-GET requests, no sample name/city in local storage, and reset on refresh. Existing authenticated onboarding routes remain present in build output |
| Assets | `public/brand/onboarding-manifest.json`; 640/1280 WebP each, 52–66 KB mobile and 126–163 KB desktop. Originals and generator references preserved |

Initial RB2 checks: `npm run lint`: pass; `npm test -- --maxWorkers=2 --fileParallelism=false`: 19 files, 175 passed, 3 skipped; `npm run build`: pass, including TypeScript and route generation. After the category correction, the stacked RB5 production build and lint pass and `node scripts/verify-rb2.mjs` passes six paths against that production build. Screenshots were recaptured after image decode and font readiness, with reduced motion. The remaining earlier scene captures may include the local Next development overlay; the new preference/result captures use production Next.

Representative before/after: [previous Home at 360px](../ARO-R2/home-360-light.png), [brand-foundation Home at 390px](../ARO-RB1/home-390-light-fr.png), [new onboarding scene 1 at 1440px](1440-light-en-host-intro.png), [choice at 1440px](1440-light-en-host-choice.png), [learner result at 320px](320-light-en-learn-result.png), [host result at 390px dark](390-dark-es-host-result.png). The previous branch had no equivalent onboarding preview route; the Home images show the visual baseline and shared-brand change.

## Remaining and blockers

- Independent privacy/security review of the preview's name/age, consent and minor handling is required before RB2 merge. Live persistence and eligibility also require a separate reviewed privacy/Trust/Auth spec. Existing student/teacher routes retain their contracts.
- RB3 onward must recompose Home, Explore/World/Create/opportunity and remaining actual routes, then run full accessibility/localization/performance regression. RB2 samples do not certify the whole product.
- Polymath and locally pinned Manrope need valid licensed assets before final typography acceptance. Independent design/accessibility review, asset rights review and production release gates remain open.

## 28 September review repair

The RB2 review identified a closed food-preparation learner topic, a headline that implied unverified demand, stale translated validation messages, silent name/age/city errors, missing long-city wrapping, and a choice that did not show the saved intent after Back. The preview now excludes food preparation in EN/FR/ES, uses conditional teaching language, renders validation from active-locale error identifiers with alert semantics, wraps an 80-character city, and restores the selected choice. The fixed host fixtures and nonpersistent boundary remain unchanged.

`scripts/verify-rb2.mjs` now uses the repository's portable browser launcher. Its six-case matrix exercises Skip, Back, retained intent, empty name/age/city/preference validation, Edit, both-mode host switching, refresh reset and the destination link. It records overflow at intro, teach, choice, details, city, preference and result stages; compares **both localStorage and sessionStorage** before/after preview input; and records non-GET requests and page errors. All six cases passed locally with zero stage overflow, storage change, non-GET request or page error. The 320px result case also tested an 80-character unbroken city before restoring a normal display value. The refreshed full-page captures in this directory hide only the Next.js development indicator; the app itself was not altered to hide content.

`scripts/export-onboarding-art.py --check` now enforces CPython 3.12.14, Pillow 12.3.0 and libwebp 1.6.0 before encoding. All six regenerated WebP byte streams matched the committed files exactly; the profile is recorded in `public/brand/onboarding-manifest.json`.

Verification on this repair: `npm run lint` passed; `npm run build` passed including TypeScript and route generation; Vitest passed 19 files / 175 tests with 3 existing skips; the six-case browser matrix passed; `git diff --check` passed. The independent privacy/security review required by the RB2 specification remains open, so this evidence does not mark RB2 VERIFIED or authorize merge, live identity collection, or release.
