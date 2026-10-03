# ARO-RB6 — Public future and booking states

## Authority

- Status: **SPEC-READY**, version 1.0.0, 2026-09-28. Founder-approved rebrand and truthful preview direction.
- Separate branch/PR stacked on RB5. `AGENTS.md`, the rebrand baseline, `ARO_TRUST_SAFETY.md`, payment and release boundaries govern.
- Scope: public `/leaderboard` and `/bookings` presentation only. Preserve route URLs and navigation. Do not change protected `/games`, `/shop`, `/character-builder`, Auth, booking, reward, database or payment behavior.

## Outcome

`/leaderboard` currently ranks seeded student records and adds local player points as if a real worldwide community exists. Replace its public entry with a clear future state; no names, standings, points, review or engagement claims. `/bookings` currently promises imminent checkout and passport progress. Replace it with an honest empty state that explains no confirmed booking is shown and points to Explore and the introduction. Neither page may imply that a user has booked, paid, earned status or joined an active leaderboard.

Use RB1 tokens/components and RB2 art only where it clarifies the next action. Provide EN/FR/ES, light/dark, focus visibility, semantic headings, responsive layout and short-phone behavior. Avoid generated user/host evidence. Existing deep links still resolve.

## Acceptance

1. Both routes return 200 and display accurate preview status and working task links.
2. No seeded ranking, fake progress or checkout promise appears on the public route.
3. Browser checks cover 320–1440px, light/dark, EN/FR/ES, navigation, no overflow/errors/non-GET requests. Build, lint, type and focused relevant tests pass.
4. Document screenshots, remaining protected future routes and release/review limits. Do not claim live booking, reward or release acceptance.
