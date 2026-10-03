# ARO-RB6 — Public future and booking states

## Authority

- Status: **SPEC-READY for public presentation**, version 1.1.0, 2026-09-28. Founder-approved rebrand and truthful preview direction.
- Owner/director: ARO founder; implementation engineer: Codex. Branch `codex/rb6-future-route-truth-20260928`, PR #78. Depends on RB5 PR #77; blocks no protected transactional package.
- Required reviewers: independent design/accessibility and code review; Trust/privacy/payment review if any scope crosses into protected data or terms. No reviewer sign-off is recorded here.
- `AGENTS.md`, `specs/PACKAGE_TEMPLATE.md`, the rebrand baseline, `ARO_TRUST_SAFETY.md`, payment and release boundaries govern.
- Scope: public `/leaderboard` and `/bookings` presentation only. Preserve route URLs and navigation. Do not change protected `/games`, `/shop`, `/character-builder`, Auth, booking, reward, database or payment behavior.

## Outcome

`/leaderboard` currently ranks seeded student records and adds local player points as if a real worldwide community exists. Replace its public entry with a clear future state; no names, standings, points, review or engagement claims. `/bookings` currently promises imminent checkout and passport progress. Replace it with an honest empty state that explains no confirmed booking is shown and points to Explore and the introduction. Neither page may imply that a user has booked, paid, earned status or joined an active leaderboard.

Use RB1 tokens/components and RB2 art only where it clarifies the next action. Provide EN/FR/ES, light/dark, focus visibility, semantic headings, responsive layout and short-phone behavior. Avoid generated user/host evidence. Existing deep links still resolve.

## Acceptance

1. Both routes return 200 and display accurate preview status and working task links.
2. No seeded ranking, fake progress or checkout promise appears on the public route.
3. Browser checks cover 320–1440px, light/dark, EN/FR/ES, navigation, no overflow/errors/non-GET requests. Build, lint, type and focused relevant tests pass.
4. Document screenshots, remaining protected future routes and release/review limits. Do not claim live booking, reward or release acceptance.

## Problem, goals and exclusions

The existing public entries imply real standings and an imminent transaction, which can mislead visitors before the app has verified supply, booking and payment evidence. RB6 follows RB5 to make those two existing URLs truthful while keeping an immediate Explore or onboarding next action. Goals are honest preview wording, preserved deep links, responsive branded composition, and keyboard-operable destinations. Non-goals are rankings, reward accrual, booking creation, checkout, payment, passport progress, protected `/games`/`/shop`/`/character-builder`, role changes and real host inventory.

## Personas, permissions, journeys and state

Anonymous and signed-in visitors can read `/leaderboard` and `/bookings` and follow Explore or onboarding preview links. Hosts, admins and service roles gain no additional read, create, update or delete permission. Existing Auth/RLS remain unchanged. A visitor opens either route, sees a labelled future/empty state, then may navigate to Explore or the preview; browser Back returns to the original deep link. Both entries have one local `FUTURE_EMPTY` presentation state. Pending booking, paid, ranked, success and populated states are deliberately absent; the existing route shell handles load/error and unknown-route recovery. There are no server transitions, concurrency writes, duplicate submissions or idempotency keys.

## Data, privacy, Trust, money, AI and analytics

No entity, migration, RLS policy, endpoint, persisted preference, localStorage key, analytics event, AI input/output, precise location or new personal field is introduced. This package reads only existing language/theme contexts for localized presentation. Synthetic people and art are decorative examples, never actual hosts, users or booking evidence. No price, fee, refund, payout, balance, subscription entitlement or payment-provider interaction is created. The protected booking and publication gates stay authoritative. Privacy, Trust category, money, AI and server-service matrices are N/A to this static public presentation for these explicit reasons; any live expansion needs its own specialist-approved package.

## UI, accessibility and failure recovery

Each route has one main landmark, one clear heading, an explicit non-live/empty disclosure and two working task links. Keep visible focus, 44px targets, readable text, semantic link names and reduced-motion equivalence. Test 320/360/390/768/1440px, short phones, EN/FR/ES and light/dark. If illustration or optional font fails to load, live HTML copy and links remain usable. If a destination is unavailable, the retained site route recovery must show a safe next action; the browser verification follows both links and checks destination responses. No new mutation can fail or be retried, and no stored data can become inconsistent.

## Performance, rollout and evidence

Reuse the existing RB1 tokens and RB2 compressed WebP scene with explicit dimensions; add no new third-party request or initial-route dependency. Record any JS/image transfer delta in `artifacts/ARO-RB6/VERIFICATION.md`; LCP/INP/CLS need a measured production baseline before a numeric improvement claim. API latency, cache invalidation, pagination, realtime and AI cost are N/A. Roll out only after the parent PRs and independent review; rollback reverts the two public route components without modifying protected booking/payment state. Keep the URLs stable throughout.

| Criterion | Evidence and required gate |
|---|---|
| RB6-1: truthful entries and links | `artifacts/ARO-RB6/browser.json` HTTP/heading/link navigation and responsive screenshots |
| RB6-2: no fictional ranks, bookings or payment promise | Source and browser text assertions; independent Trust/design review |
| RB6-3: accessible themes/locales/responsive behavior | Six-route Chrome matrix, keyboard focus check, manual screen-reader review before VERIFIED |
| RB6-4: no protected/data/payment regression | Diff audit, hosted Quality/isolated database checks, build/lint/type/relevant tests |

Definition of done: link each criterion to a passing artifact, record actual asset costs and remaining limitations, and obtain the required independent reviews. `SPEC-READY` authorizes this bounded presentation implementation; it does not mean VERIFIED, SHIPPED, or approved to merge through RB5's privacy gate.
