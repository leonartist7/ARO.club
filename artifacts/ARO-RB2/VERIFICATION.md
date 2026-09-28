# RB2 onboarding preview — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb2-onboarding-preview-20260927`, stacked on RB1. This is an in-memory sample, not live signup or eligibility collection.

## Completed criteria and evidence

| Criterion | Evidence |
|---|---|
| Three brief scenes, skip, choice of Find / Teach / Both | `src/views/OnboardingPreview.jsx`; six browser path runs in `browser.json`; intro/teach/choice captures below |
| Name, age, coarse manual city, interests or language activity | Field validation and learner/host result captures; the follow-up limits host drafts to three fixed language/community fixtures. Re-run screenshots after this change before accepting visual evidence. |
| Useful, honest result | Learner idea and editable host draft shown as examples, no inventory/earning/booking/verification claim; result captures |
| One account, changeable starting intent | “Both” starts in discovery and switches to a class draft in the browser run; no role or publish permission is written |
| Localization, themes, widths | Browser matrix: 320×620 EN light; 360×700 FR light; 390×844 ES dark; 430×740 EN light; 768×900 FR dark; 1440×900 EN light. Zero horizontal overflow or page errors |
| Privacy and navigation | Browser run records zero non-GET requests, no sample name/city in local storage, and reset on refresh. Existing authenticated onboarding routes remain present in build output |
| Assets | `public/brand/onboarding-manifest.json`; 640/1280 WebP each, 52–66 KB mobile and 126–163 KB desktop. Originals and generator references preserved |

`npm run lint`: pass. `npm test -- --maxWorkers=2 --fileParallelism=false`: 19 files, 175 passed, 3 skipped. `npm run build`: pass, including TypeScript and route generation. Browser script: `node scripts/verify-rb2.mjs`: pass. Screenshots were captured after image decode and font readiness, with reduced motion. The development overlay in those screenshots is from the local Next server, not application UI.

Representative before/after: [previous Home at 360px](../ARO-R2/home-360-light.png), [brand-foundation Home at 390px](../ARO-RB1/home-390-light-fr.png), [new onboarding scene 1 at 1440px](1440-light-en-host-intro.png), [choice at 1440px](1440-light-en-host-choice.png), [learner result at 320px](320-light-en-learn-result.png), [host result at 390px dark](390-dark-es-host-result.png). The previous branch had no equivalent onboarding preview route; the Home images show the visual baseline and shared-brand change.

## Remaining and blockers

- Independent privacy/security review of the preview's name/age, consent and minor handling is required before RB2 merge. Live persistence and eligibility also require a separate reviewed privacy/Trust/Auth spec. Existing student/teacher routes retain their contracts.
- RB3 onward must recompose Home, Explore/World/Create/opportunity and remaining actual routes, then run full accessibility/localization/performance regression. RB2 samples do not certify the whole product.
- Polymath and locally pinned Manrope need valid licensed assets before final typography acceptance. Independent design/accessibility review, asset rights review and production release gates remain open.
