# ARO — Money and Marketplace Economics

## Authority and separation

This document governs ARO’s economic boundaries. Exact prices, take rates, benefits, tax treatment, payout timing, and financial providers require package-specific approval. Digital subscription entitlements and real-world marketplace transactions are separate systems.

## MVP money

### Participant / Member

Initial demand-side access is free. A paid ARO Pro concept may later add appropriate digital intelligence or tools, but must not paywall baseline safety, required disclosures, user data rights, or access to already-purchased services.

### Host Free

No subscription requirement. A higher marketplace commission than Host Pro is a **WORKING ASSUMPTION**, not a locked price.

### Host Pro

A digital subscription may offer advanced ARO Director tools, demand intelligence, analytics, workflow assistance, or reduced marketplace commission where legally and economically appropriate. Price, commission reduction, trial, and feature set are **WORKING ASSUMPTIONS** pending founder approval and store-policy verification.

Do not promise that a subscription will generate earnings or that fee savings will exceed its cost.

## RevenueCat and subscription entitlements

RevenueCat is the likely Shipathon system for digital ARO Pro/Host Pro purchases and entitlements across supported app stores/platforms. It should own product/entitlement mapping, purchase restoration, verified entitlement state, and paywall experimentation/measurement.

Before implementation, verify current RevenueCat SDK, competition, store, and platform requirements from primary sources. Server-side or trusted-webhook verification must protect privileged entitlements; the client must not self-assert subscription state.

RevenueCat does **not** calculate, collect, hold, refund, or pay out the price of a real-world hosted service. Marketplace transactions remain architecturally distinct.

## Marketplace payments and payouts

`PAYMENTS_SPEC.md` remains reusable Tonguee payment intelligence for Stripe Checkout, Connect, server-computed minor units, webhook verification, idempotency, refunds, and post-completion payout controls. Its exact 18% commission, cancellation tiers, dispute window, schema, and implementation checklist are **not automatically authoritative for ARO**. A money-bearing ARO package must confirm or supersede those choices and receive director/security review.

The MVP baseline remains:

- represent applicable money in integer minor units;
- compute prices, fees, discounts, refunds, and payouts on the server from authoritative records;
- never trust client-submitted amounts;
- verify and deduplicate provider webhooks;
- keep payment, service-role, signing, and payout secrets out of client code;
- gate payouts on applicable identity, Trust, provider, completion, dispute, and legal requirements;
- maintain an auditable financial ledger and idempotent mutations.

“Escrow” is not marketing language unless the legal/provider structure actually qualifies. Prefer “held until completion” in product copy after legal review.

## Credits

ARO Credits are a future internal reward, promotion, or subsidy mechanism. Unless a later approved design states otherwise, they:

- are not cryptocurrency or an investment;
- have no guaranteed cash equivalence, transferability, redemption, or yield;
- cannot obscure real currency price, fees, expiry, or refund treatment;
- require ledger, abuse, expiry, tax/accounting, and consumer-protection rules before launch.

## Refunds, disputes, and cancellations

Terms must be visible before commitment. Refund calculations are server-authoritative, consistent, auditable, and distinguish participant cancellation, host cancellation, platform cancellation, safety incident, and force majeure. Human support must be able to pause payouts and review disputes under least privilege.

## Future wallet and financial infrastructure

A future ARO Wallet may organize balances, payouts, credits, or routing choices only after legal, licensing, custody, tax, security, fraud, recovery, and jurisdiction review. Humans approve meaningful financial actions.

Locked boundaries:

- no native speculative token in MVP;
- no guaranteed APY or “20% guaranteed yield” claim;
- stablecoins may only be optional future infrastructure where compliant and useful;
- regulated savings/yield integrations require separate legal, product, security, and provider review;
- crypto is never required to access the core product;
- no autonomous financial negotiation, transfer, or investment.

## Decisions still requiring founder approval

- Host Free and Host Pro commission structure.
- Subscription price, trial, entitlement set, and eligible platforms.
- Who absorbs payment processing, refunds, chargebacks, taxes, and currency conversion.
- Launch currency/country and payout schedule.
- Whether credits enter the Shipathon scope at all (default: no).
