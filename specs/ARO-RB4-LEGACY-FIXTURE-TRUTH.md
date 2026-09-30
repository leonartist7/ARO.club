# ARO-RB4 — Legacy fixture truth and deep-link recovery

## Authority and scope

- Status: **SPEC-READY**, version 1.0.0, founder-approved rebrand and explicit no-fabricated-demand/reviews/bookings boundary, 2026-09-27.
- Stacked on RB3 in a separate branch/PR. Governing: `AGENTS.md`, `ARO_TRUST_SAFETY.md`, `ARO_DESIGN_SYSTEM.md`, RB0 adoption and existing Auth/booking contracts.
- Scope: legacy public fixture consumers: experience/teacher deep links, map, saved/recent/compare and not-found recommendations. No schema, Auth, payment, user booking, review submission, publication or admin semantics.

## Outcome

The older `experiences.json`, `teachers.json` and `reviews.json` are illustrative fixtures with past dates, invented counts and portrait/venue claims. No public route should show them as live supply, real hosts, ratings, demand, bookings or verified status. Existing URL destinations remain valid and provide a graceful, localized explanation and useful paths to the onboarding preview, honest Explore state and host guidance. Saved/recent identifiers are retained where stored but must not be rendered as live cards. An explicit verified-live provenance marker is required before any future supply is rendered; adding such data requires its own reviewed integration.

## UX and technical contract

Use a shared responsive unavailable state with the RB1 tokens, accessible heading, honest wording, no fabricated count, and working links. EN/FR/ES and light/dark. Do not delete user storage or rewrite deep links. Do not call booking, share, favorites, review or recently-viewed side effects for fixture IDs. Map is a non-live illustration until location/inventory authority exists. Preserve existing sensitive code paths for a later reviewed migration, but prevent fixtures from entering them.

## Verification

Test representative fixture IDs and unknown IDs, saved/recent/compare/map states, no booking/review/verified claims, navigation, responsive screenshots and keyboard focus. Build/lint/type and relevant regressions. Independent Trust/privacy/security and release review remain separate gates.
