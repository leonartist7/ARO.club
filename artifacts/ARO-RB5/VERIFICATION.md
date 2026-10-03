# RB5 public story and help — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb5-public-support-20260927`, stacked on RB4.

## Completed and checked

About, How it Works, For Teachers and FAQ share a responsive EN/FR/ES presentation with the approved promise, task entrances and RB2 art. Host copy distinguishes self-declared skills, verification and publishing authorization. Contact explicitly says no inbox is connected, saves only on this device and retains existing drafts. The footer removes placeholder social links and a speculative leaderboard entrance. Old invented statistics, earnings, fees, addresses, phone number and response time are absent from these public entries.

`npm run build`, `npm run lint`, `npm run type-check` and `npm test -- --maxWorkers=2 --fileParallelism=false src/components/layout/Header.test.jsx` pass. `node scripts/verify-rb5.mjs` passes six production Next/Chrome routes at 320–1440px across light/dark and EN/FR/ES. Checks include no horizontal overflow, placeholder footer links, former unsupported claims, page errors or non-GET requests, plus Contact on-device save/reload. Browser results are in [browser.json](browser.json).

Visual captures: [About at 320px](about-320-light-en.png), [About desktop dark French](about-1440-dark-fr.png), [How it Works Spanish](how-it-works-390-light-es.png), [For Teachers dark](for-teachers-360-dark-en.png), [FAQ French](faq-768-light-fr.png), [Contact Spanish dark](contact-390-dark-es.png). The [RB1 Home baseline](../ARO-RB1/home-320-light-en.png) and [RB3 Home](../ARO-RB3/home-320-light-en.png) show the preceding rebrand layers.

## Remaining

This is presentation and local draft behavior, not live support, onboarding or hosted authentication. Existing stored drafts remain on-device. Authenticated legacy surfaces, live supply, full accessibility and localization review, independent PR review and release gates remain open. The stacked RB3 browser assertions were updated to check the retained local prototype boundary in its new location. RB0 has unresolved review threads and RB2 still requires independent privacy/security review before the stack can merge to protected `main`.
