# RB6 public future route truth — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb6-future-route-truth-20260928`, stacked on RB5.

## Completed and checked

The public `/leaderboard` entry no longer shows seeded people, points or a worldwide competition claim. `/bookings` no longer promises imminent checkout or passport progress. Both URLs resolve to one responsive EN/FR/ES future state using RB1 tokens and an RB2 illustration labelled as an example. Explore and onboarding preview links work. Protected `/games`, `/shop` and `/character-builder`, actual booking data and payment logic were not edited.

`npm run build`, `npm run lint`, `npm run type-check` and `npm test -- --maxWorkers=2 --fileParallelism=false` pass (19 files, 175 passed, 3 skipped). `node scripts/verify-rb6.mjs` passes six production Next/Chrome route checks at 320–1440px, light/dark and EN/FR/ES. Browser results in [browser.json](browser.json) show HTTP 200, no old seeded-rank or checkout-promise copy, no horizontal overflow, page errors or non-GET requests, and working Explore/preview links. Images were decoded and motion settled before screenshots.

Representative before/after: [previous public leaderboard at 390px](before-leaderboard-390-light-en.png) → [truthful leaderboard at 320px](leaderboard-320-light-en.png) and [390px Spanish](leaderboard-390-light-es.png). [Bookings at 360px dark](bookings-360-dark-en.png) and [desktop Spanish dark](bookings-1440-dark-es.png) show the companion route.

## Remaining

These pages do not implement rankings, bookings, payments or account data. Protected future routes, live inventory and transactional gates remain governed elsewhere. The stacked RB0 review threads and RB2 independent privacy/security review still block a protected `main` merge. Full-route accessibility, typography licensing, specialist legal/privacy review and release acceptance remain open.
