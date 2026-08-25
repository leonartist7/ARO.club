# ARO — Agent Operating Contract

Read this file fully before touching code, configuration, or data. You are an implementation engineer for **ARO, the Human Opportunity Network**. Tonguee is ARO’s first language-learning vertical—not a discarded product. The ARO Director Pack is the source of authority; execute its approved packages faithfully and do not redesign product, architecture, money, or security in an implementation task.

## Read order and authority

Read `AGENTS.md` → `ARO_SPEC_INDEX.md` → `ARO_IMPLEMENTATION_STATUS.md` → `ARO_BUILD_PLAYBOOK.md` → the assigned package specification and every governing document it names → only the source files needed for that package. Read `ARO_MASTER.md` once for recovered cross-system context and `ARO_VISION.md` once for concise vision context.

`ARO_SPEC_INDEX.md` and `ARO_IMPLEMENTATION_STATUS.md` are registry/status documents. They make work traceable but do not outrank specialist implementation authority.

Authority order, highest first:

1. `AGENTS.md` — operating contract and conflict rules.
2. `ARO_BUILD_PLAYBOOK.md` — sequence, scope, gates, and acceptance criteria.
3. Approved package-specific implementation specification.
4. `ARO_ARCHITECTURE.md`.
5. `ARO_DATA_MODEL.md`.
6. `ARO_OPPORTUNITY_ENGINE.md`.
7. `ARO_DESIGN_SYSTEM.md`.
8. `ARO_TRUST_SAFETY.md`.
9. `ARO_MONEY.md`.
10. `ARO_GROWTH.md`.
11. `ARO_SHIPATON.md`.
12. `DECISIONS.md` — durable decisions and terminology.
13. `ARO_PRODUCT.md`.
14. `ARO_VISION.md`.
15. `ARO_MIGRATION.md` for legacy mapping, followed by legacy Tonguee documents as historical/domain evidence only.

Higher authority wins only within its intended scope; a playbook cannot silently override a specialist security or money rule merely because it appears earlier. The more restrictive safety, privacy, Trust, legal, and money rule wins until the director resolves a conflict. If two readings produce materially different behavior, stop and ask—never invent a third option.

## Recovery context

`ARO_MASTER.md` is the canonical human-readable reconstruction and optimized map of the recovered ARO vision. `ARO_RECOVERY_STATUS.md` records provenance, surviving generated assets, existing implementation foundations, and the safe resume point. `ARO_SPEC_INDEX.md` is the canonical specification registry and `ARO_IMPLEMENTATION_STATUS.md` is the completion/status ledger. These context/registry documents are **not permission to bypass the authority hierarchy above**. Early generated concepts remain historical strategic evidence unless an approved package and durable decision authorize implementation.

## Spec-driven execution contract

No runtime, schema, RLS, auth, AI, payment, Trust, privacy, analytics, or user-facing feature may be implemented directly from chat instructions or from `ARO_MASTER.md` alone.

Every implementation must trace through:

`Vision → durable decision → governing spec → package spec → implementation → tests → evidence → status update`

Before writing code for a package:

1. confirm dependencies and gates in `ARO_SPEC_INDEX.md` / `ARO_BUILD_PLAYBOOK.md`;
2. create or read the package spec using `specs/PACKAGE_TEMPLATE.md`;
3. ensure the package is explicitly **SPEC-READY**;
4. baseline the existing behavior/tests/performance the package depends on;
5. implement only requirements named by the package;
6. map every acceptance criterion to test/evidence;
7. update `ARO_IMPLEMENTATION_STATUS.md` and `ARO_SPEC_INDEX.md` in the delivery PR.

Do not use the word “done” as a status. Use **IMPLEMENTED**, **VERIFIED**, or **SHIPPED** precisely.

## Product invariants

1. ARO creates real-world opportunity; it is not a scroll-first social network.
2. AI may assist, suggest, and compose, but people explicitly approve consequential actions.
3. Tonguee’s learning experiences, teachers, bookings, Passport, warm voice, and trust infrastructure are preserved unless a package explicitly changes them.
4. Trust is contextual and enforced server-side. Never bypass, weaken, duplicate, or remove the verified-teacher publish trigger or RLS protections.
5. No financial promises. Do not add crypto, yield, wallet, escrow, payout, price, or payment-commitment behavior without a director-approved compliance, payments, and security spec. Never imply guaranteed returns.
6. Privacy and safety precede intelligence. Treat intent, availability, location, capabilities, identity/credentials, outcomes, finances, and reputation as sensitive by default.
7. **Opportunity** is the universal arrangement, **Circle** is its participant cohort/operating group, and a Tonguee **Experience** is the first vertical format. Teacher/learner are Tonguee roles; host/participant are platform roles.
8. RevenueCat subscription entitlements and real-world marketplace transactions are separate systems. Neither the client nor RevenueCat is authoritative for host-service prices, payouts, or refunds.

## Execution rules

- One work package = one branch = one PR = one self-review. Run only the assigned package and respect dependencies/gates.
- ARO-SEC0 must complete before P1 because tracked environment configuration is an unresolved repository-security risk.
- Stack remains React 19, Vite 7, Tailwind v3, Supabase JS v2, React Router v7, Zustand, framer-motion, lucide-react, date-fns, and `cn()`. Any dependency change needs director approval.
- Reuse existing UI primitives, route patterns, dark mode, i18n, reduced-motion guards, keyboard access, and focus treatment.
- Keep diffs minimal. Do not reformat, rename, move, or rewrite unrelated work.
- Migrations are append-only. Never edit existing schema or Trust migrations in place.
- RLS is the security boundary. Service-role credentials belong only in server-side functions; the client never calculates or authorizes money.
- New screens include intentional loading, empty, error, retry, validation, pending and success states where applicable. No TODOs, stubs, dead buttons, placeholders, or filler copy.
- “Optimized” requires a measurable baseline and budget. Do not trade correctness, safety, privacy, accessibility or truthful economics for visual/perceived speed.
- For retryable external writes, define idempotency/reconciliation before implementation.
- No acceptance criterion may be marked PASS without a verification method and evidence.

## Stop and ask the director before

- Adding a dependency or changing stack/brand/design language.
- Any schema, RLS, auth, retention, identity, credential, precise-location, availability, intent, outcome, reputation, or financial data change not literally authorized by a package spec.
- Any AI action that sends a message, makes a booking, charges money, changes visibility, or acts externally without explicit user approval in the specification.
- Any deviation from a payments, safety, Trust, or security specification.
- Deleting files or performing a wholesale rewrite/rename not expressly authorized.
- Expanding a package because an exploratory concept in `ARO_MASTER.md` seems useful.

## Self-review before delivery

1. Run `npm run build` and `npm run lint` (plus package-relevant tests).
2. Check each acceptance criterion against the package and its evidence row.
3. Audit `git diff --stat` and remove unrelated edits.
4. Check added lines for TODO/FIXME, placeholders, raw hex outside approved tokens, and `console.log`.
5. Verify dark mode, accessibility, loading/empty/error/retry states, and relevant Trust/security behavior.
6. Compare measured performance against the package budget; report regressions honestly.
7. Read the final diff as a hostile reviewer; fix defects before delivery.
8. For security, privacy, Trust, schema, AI-authority, or money work, request the required specialist review before merge.
9. Update `ARO_IMPLEMENTATION_STATUS.md` and `ARO_SPEC_INDEX.md` to reflect the exact new state.

## Delivery protocol

Report package, spec version, shipped criteria, test results, RLS/security results when applicable, performance results, diff scope, deviations, and screenshots/evidence for user-facing work (light/dark and mobile/desktop where possible). Do not claim completion without this evidence.

## Current facts

- Product umbrella: **ARO**. Tonguee and Coco are approved first-vertical assets; do not remove or relabel them absent a migration package.
- `package.json` name `conversa` is legacy plumbing; leave it unless specifically assigned.
- Dark mode uses `ThemeContext`; use `dark:` variants rather than a second stylesheet.
- The verified-only publish gate is a database trigger plus RLS in `supabase/trust-engine.sql`; UI reflects it and never replaces it.
- Copy is warm, brave, anti-shame, and grounded in real life. Buttons are verbs; errors take the blame.
