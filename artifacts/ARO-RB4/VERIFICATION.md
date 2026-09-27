# RB4 legacy fixture truth — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb4-fixture-truth-20260927`, stacked on RB3.

## Completed criteria and evidence

The public experience, teacher, map, favorites, recently viewed, compare and global missing-page routes now render `LegacyFixtureState`. Existing URLs still resolve; saved/recent storage is untouched. The old fixture views and sensitive booking/review code were not edited. New EN/FR/ES copy states that concept records do not establish real hosts, availability, reviews, bookings or verification. The state links to onboarding, honest Explore and host guidance.

`npm run lint`: pass. `npm run build`: pass, including TypeScript. `node scripts/verify-rb4.mjs`: seven direct route checks pass at 320–1440px in light/dark and EN/FR/ES. Fixture URLs return 200, unknown route returns 404. All show the preview link, with no horizontal overflow, page errors or non-GET requests (`browser.json`). Production Next/Chrome screenshots were captured after fonts and art decoded with reduced motion.

Representative captures: [RB3 honest Explore](../ARO-RB3/explore-360-light-en.png), [RB4 old experience URL at 320px](experience-exp1-320-light-en.png), [old teacher URL at 390px FR dark](teacher-t1-390-dark-fr.png), [map at desktop ES](map-1440-light-es.png), [saved-item route at 360px](favorites-360-light-en.png). The older catalogue did not have a captured detail-page baseline; `ExperienceDetailPage.jsx` is the source of its former booking/review presentation.

## Remaining and boundaries

- Authenticated legacy dashboards/profile/passport/bookings still need provenance review; RB4 covers the public fixture entrances only. No user storage was purged.
- A future verified-live inventory adapter and specialist-reviewed Auth, Trust, booking and payment gates are required before restoring any legacy details or transactional UI.
- Full route accessibility/localization, independent review, typography asset rights and release remain open.
