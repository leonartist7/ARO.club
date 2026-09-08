# HAMM evidence

Updated 2026-09-08. Status: proposal only; RevenueCat integration, purchases and results NOT STARTED.

## ARO-specific model

Keep participant access and basic host participation free. Candidate paid value: Host Pro digital planning tools that save preparation time and help improve a language Circle. Charge only after the tool exists and a host can understand the benefit. Do not sell access to safety, Trust status, user data rights, or guaranteed earnings.

Monthly subscription is the initial packaging hypothesis; annual is appropriate only once recurring value and cancellation terms are clear. Defer lifetime, consumables, credits, advertising and multiple tiers: they add complexity without demonstrated need. Exact price/trial remains unresolved; obtain host feedback and model provider cost, support cost, store fees and net margin before founder approval. Marketplace booking revenue is separate from RevenueCat digital subscription revenue.

## Required implementation package

- Store product → RevenueCat offering/package → entitlement mapping, separate sandbox and production identifiers.
- Identity login/logout/anonymous merge and account-switch rules; one user's entitlement never leaks to another.
- Store-localized total price, billing period, renewal, trial eligibility, terms/privacy, restore and management actions.
- Purchase, cancellation, pending approval, offline, failure, already-owned, restore and confirmation states.
- Trusted entitlement checks for protected server operations; webhook signature verification, deduplication, replay/out-of-order reconciliation, expiration/refund/revocation tests.
- Judge access verified on a fresh account/device, with credentials delivered privately.
- RevenueCat Project ID, production purchase and restore evidence before eligibility claim.

## Intended value moment

Host completes a useful free Circle plan → sees a specific advanced planning benefit → clear offer → native purchase → confirmed access. Show the actual benefit rather than blocking the first useful action.

## Evidence record

| Claim | Required proof | Current state |
|---|---|---|
| Saves host preparation time | Consented timed sessions and method | Not measured |
| Pricing fits recurring value | Interview notes, cost model and approval | Not started |
| Purchases work | Device receipt, RevenueCat production event, entitlement state | Not started |
| Sustainable revenue | Dated gross/refund/net exports; no marketplace mixing | Unknown |
| Learned and improved | Versioned offer, exposure counts, purchases, refund guardrail | Not started |

Judge argument, once proven: ARO charges for a repeatable digital host workflow while preserving free participation and separating real-world transactions. Attach measured savings, conversion and net revenue; do not publish this as a result yet.
