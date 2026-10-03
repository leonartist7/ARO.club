# ARO-RC1 — Digital purchases (draft for founder decisions)

Status: **DRAFT — NOT SPEC-READY OR RELEASE-APPROVED**. This document scopes ARO.club Web memberships and optional digital ARO Coins. It does not authorize live charging, currency grants, production keys, or entitlement gates. Governed by `AGENTS.md`, `ARO_MONEY.md`, and `ARO_BUILD_PLAYBOOK.md`.

## Outcome and boundary

Signed-in customers may purchase approved ARO Club Pro plans and, if approved for launch, consumable ARO Coin packs for defined digital uses. ARO Coins are not cryptocurrency, transferable value, cash, or a way to pay for a hosted real-world service. Baseline safety, disclosures, data rights, and already-purchased services remain available without Pro. Marketplace bookings, payouts, commissions, and refunds are a separate package.

## Decisions required before implementation

| Decision | Current state |
| --- | --- |
| Pro benefits and first launch plan durations | Four Test Store durations exist; benefits and launch subset unapproved. |
| Live prices, currency, countries, renewal/trial, refund/support terms | Test prices are examples; live terms unapproved. |
| Web billing provider and account | RevenueCat Billing with Stripe selected. A claimable Stripe sandbox and sandbox-only RevenueCat web config exist; RevenueCat shows a 2026-11-25 claim deadline. A real Stripe account and live config are not connected. |
| Coin use, pack units/prices, expiry, refunds, abuse limits | `ARO_COIN` exists with no grants; test consumable has no approved pack definition. |
| Identity and data policy | Confirm that the authenticated ARO account UUID is the stable RevenueCat App User ID across web and future clients, including deletion/recovery behavior. |
| Legal destinations and support ownership | Terms/privacy routes exist locally, but the paywall's intended public domain and commercial text are not verified. |

## Implementation contract after decisions

1. Use separate sandbox and production provider configurations and public Web SDK keys. Keep secret API and webhook credentials on the server. Only signed-in customers may start checkout; never accept an arbitrary App User ID, product price, entitlement, or coin balance from the browser.
2. Create live provider products with approved prices. Map approved subscriptions to `aro_club_pro`; map consumable packs to `ARO_COIN` grants. Never attach coin products to the Pro entitlement. Keep membership and coin offerings separate.
3. Expose signed-in checkout and customer status with explicit loading, failure, retry, cancellation, and success states. Fetch offering/package price text from RevenueCat. On web, use the provider's management URL when available; do not assume native Customer Center support.
4. Authorize Pro-only server actions against a trusted entitlement source. Verify and deduplicate provider/webhook events by event ID, reconcile missed events with the RevenueCat API, and process renewal, expiration, cancellation, refund, and account-transfer cases. A browser `CustomerInfo` flag is display data only.
5. For coins, use the approved balance source and a server-authoritative, idempotent spend operation bound to the signed-in user. Define purchase-grant and refund-reversal reconciliation, negative-balance policy, expiry, audit history, rate limits, and support correction before enabling coin checkout. Never expose a Developer API secret to the browser.
6. Review and publish only the final paywall with correct prices, benefits, renewal text, Terms, Privacy, and support links. Keep Test Store pages isolated from production.

## Release evidence required

- Automated type, lint, unit, build, browser, and payment-boundary checks pass on the release revision; independent security/money review has no unresolved findings.
- Real provider sandbox proves successful and failed checkout, cancellation, renewal/expiry, refund, restore/reload, account switching, and unauthorized access. Coin testing proves one grant per verified purchase and one debit per idempotent spend, including duplicate webhook delivery and refund reversal.
- Production secret/key scopes, webhook authentication, support path, legal copy, and domain ownership are reviewed. A human approves the exact final commercial offer before activating a live purchase entry point.
- Rollback disables purchase entry points without deleting purchase records; existing customers retain a supported management and reconciliation path.

## Current evidence

The local Test Store flow previously activated `aro_club_pro` after a simulated monthly purchase. On 2026-09-27, RevenueCat inspection confirmed the Test Store app and a separate `ARO Club Web Sandbox` RevenueCat Billing config linked to a claimable Stripe sandbox. The reviewed store-state plan (`b0e4feb3-9c97-40fa-901e-bdd24a2c3e1e`) applied four USD sandbox subscriptions mirroring Test Store example prices, with no warnings. All four sandbox products are attached to the Pro entitlement and matching packages; the local staging page loaded their prices through the Web SDK. The Test Store also has four subscription products and one consumable. The Pro paywall remains unpublished, no webhook integration exists, and `ARO_COIN` has no grants. Local type-check, lint, production build, and all 90 unit tests passed; Vitest required a permitted run outside the restricted filesystem sandbox to read its config. The staging server logged `PGRST106` for the Auth role lookup, so N1 Auth remains unverified and sandbox checkout was not exercised.

## Primary references

- [RevenueCat Web SDK](https://www.revenuecat.com/docs/web/web-billing/web-sdk)
- [RevenueCat In-App Currency](https://www.revenuecat.com/docs/offerings/virtual-currency)
- [RevenueCat webhooks](https://www.revenuecat.com/docs/integrations/webhooks)
- [RevenueCat AI Toolkit codelab](https://revenuecat.github.io/codelabs/ai-toolkit.html)
