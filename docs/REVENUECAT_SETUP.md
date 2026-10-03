# RevenueCat setup for ARO.club

Status: Test Store integration in isolated Preview only. Production purchases are not enabled.

Provider direction approved on 2026-09-26: **RevenueCat Billing with Stripe** for the Web app. A separate `ARO Club Web Sandbox` RevenueCat Billing configuration (`app9cbff72e68`) is linked to a claimable Stripe sandbox. RevenueCat issued a sandbox public SDK key for it; no production key is available from this sandbox-only account. The sandbox defaults to USD for testing. RevenueCat account settings show **Claim your sandbox**, with a claim deadline of 2026-11-25. Claiming or connecting a real Stripe account remains a founder account action. This is not a live payment account or approved launch currency.

Four **sandbox-only** subscription products were applied from the reviewed RevenueCat [store-state plan](https://app.revenuecat.com/projects/bf028e16/product-catalog/product-editor/review-changes?plan_id=b0e4feb3-9c97-40fa-901e-bdd24a2c3e1e): weekly $3.99, monthly $9.99, three-month $27.99, yearly $79.99, all USD. These mirror the Test Store examples, had no plan warnings, and are attached to the existing Pro entitlement and matching Pro packages. They are not approved live prices.

Observed in the Test Store on 2026-09-26: a simulated `monthly` purchase activated `aro_club_pro`. The current `aro_club_pro_test` offering now contains only `weekly`, `monthly`, `three_month`, and `yearly`. The separate `consumable` product remains in the catalog, has no Pro entitlement, and is not in the current offering. The previous `default` offering retains all five products for reference. The attached `ARO Club Pro — Test Store draft` paywall is unpublished, so `presentPaywall` cannot display it in the test app yet.

On 2026-09-26, a separate `ARO_COIN` in-app currency was created with **no product grants**. The non-current `aro_coins_test` offering contains the existing Test Store `consumable` product in one package. It is a configuration draft only: buying that product does not credit coins, and the app does not offer coin purchases. Do not attach it to the Pro entitlement or expose it as a real purchase until the coin pack and spending rules are approved.

## RevenueCat AI Toolkit codelab applied to this Web app

The [nine-step AI Toolkit codelab](https://revenuecat.github.io/codelabs/ai-toolkit.html) covers the toolkit, installation, authentication, project setup, feature integration, analytics, and troubleshooting. The RevenueCat connector and skills are already available in this Codex session, and the connector can read project `projbf028e16` (`Aro Club`). The marketplace installation command is not an app dependency and does not replace `@revenuecat/purchases-js`.

For this Web app, use the Web SDK and provider portal rather than the codelab's mobile `RevenueCatUI`/Customer Center examples. The current Test Store integration covers SDK initialization, user identity, offering/customer-info reads, purchase attempts, and entitlement display. The dashboard has four subscription products, their Pro entitlement, a current subscription offering, a separate coin-offering draft, and an unpublished subscription paywall. Analytics and experiments have no real purchase data to analyze yet.

## Decisions and implementation still needed for live purchases

1. Approve the exact Pro benefits, live prices, currency/countries, subscription terms, support/refund terms, and which of the four test durations should actually launch. Test Store prices are examples only.
2. Define ARO Coins' permitted digital use, whether they expire, the amount and price of each pack, refund/reversal behavior, and the server-authoritative spending/ledger rules. The `ARO_COIN` currency intentionally has no grant; the $0.99 test consumable is not an approved pack.
3. Claim/connect the real Stripe account in RevenueCat, configure a separate live RevenueCat Billing setup and its checkout, tax, legal, email, and support settings, then create approved live products and obtain a production public key. The RevenueCat Billing sandbox exists only for test checkout; it has no products yet.
4. Approve the money-bearing package spec and implement authenticated server-side entitlement checks and coin spending. Add a verified, idempotent RevenueCat webhook or server API reconciliation path for renewals, expiry, refunds, account changes, and coin grants/reversals. Browser customer info is for display, not authorization.
5. Review and publish the subscription paywall only after final benefits, prices, and legal text/links are correct. Keep the coin shop distinct. Test checkout, restore/account switching, cancellation, expiry, refund, and failed-payment behavior in the real provider sandbox before enabling live purchase entry points.

## What is wired locally

- `@revenuecat/purchases-js` is installed. Next.js reads the public SDK key from `NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY`; `VITE_` variables do not reach this app.
- Ignored `.env.staging.local` holds the supplied `test_` Test Store key and the new `rcb_sb_` Billing sandbox key. `NEXT_PUBLIC_REVENUECAT_PREVIEW_STORE=billing_sandbox` currently selects the latter locally; `test_store` switches back. Run `npm run dev:staging`, sign in to the isolated staging account, and open Settings → Test Aro Club subscriptions.
- The test page uses the signed-in Supabase UUID as the RevenueCat App User ID, fetches the current offering and customer info, checks `aro_club_pro`, supports direct test package purchases, attempts to present the draft paywall, and shows the subscription management link if available. The paywall is not served until published.
- The preview interface is enabled only when staging accounts are on, the environment is Preview, and the selected key has the expected `test_` or `rcb_sb_` prefix. The server route also rejects Vercel Production. Production has no purchase UI or Pro feature gate yet.

## RevenueCat dashboard configuration

1. In Apps & providers, use the Test Store associated with the supplied `test_` key for the current local test page. The selected production path is RevenueCat Billing with Stripe. The separate `ARO Club Web Sandbox` configuration can later test its real checkout flow after sandbox products are approved and created.
2. Product catalog contains four Test Store subscriptions with the matching periods and a separate `consumable`. The displayed USD Test Store prices are test values, not approved live prices. The consumable's purpose and repeat-purchase accounting remain undecided.
3. The `aro_club_pro` entitlement is attached only to the four subscriptions. Do not attach `consumable`: a non-expiring consumable would otherwise grant the Pro entitlement indefinitely.
4. The `aro_club_pro_test` offering is current and contains one package per subscription; `consumable` is excluded. The original `default` offering is no longer current.
5. Review the attached ARO-specific paywall draft. It currently displays monthly and yearly packages with dynamic Test Store prices, monthly selected by default, and an explicit no-real-charge notice. The intended `https://aro.club/terms` and `https://aro.club/privacy` destinations have not been confirmed live; the legal copy itself also needs review. Publish only when these are resolved and the test paywall is approved. The test page reads the dashboard's current offering; no product identifiers or prices are hardcoded into its purchase flow.
6. Verify the Test Store purchase, cancellation, failure, renewal, expiry, and account-switching flows. Confirm `aro_club_pro` changes only for the right signed-in customer.

## Production release gates

- Approve exact digital Pro benefits, product prices, currency/countries, trial and renewal terms, refund/support terms, and what the consumable delivers. Keep baseline safety, disclosures, data rights, and already-purchased services available without Pro. Do not mix digital subscriptions with marketplace host-service payments.
- Choose and connect a production web billing provider; finish its tax, email, payout, and customer portal configuration. Create sandbox and production web configurations and public SDK keys separately. The `test_` key is never a live billing key.
- Approve a payment/entitlement package spec under `ARO_MONEY.md` and the repository's SPEC-READY process. The current N1 migration package expressly excludes money and production account changes.
- Add authenticated server-side verification for every privileged Pro action using RevenueCat's Developer API or a verified, idempotent webhook-backed entitlement record. The browser `CustomerInfo` check is only for display. Match the server-authenticated Supabase UUID to the RevenueCat App User ID; never accept an arbitrary user ID or entitlement value from the browser.
- If using webhooks, authenticate deliveries using RevenueCat's configured authorization header or HMAC signature, deduplicate by event ID, process renewals, expirations, refunds and transfers, and reconcile missed events with the API. Never expose the Developer API credential or webhook secret in `NEXT_PUBLIC_` variables.
- Add the production public SDK key only to the approved production deployment configuration after these gates pass. Test the actual billing-provider sandbox checkout, management portal, failed payment, cancellation, refund, and expiration before enabling a live purchase entry point.
- RevenueCat Customer Center is an iOS/Android app feature. For the Web SDK, use the billing provider's customer portal through `CustomerInfo.managementURL` when available.

## Primary documentation

- [RevenueCat Web SDK](https://www.revenuecat.com/docs/web/web-billing/web-sdk)
- [Test Store](https://www.revenuecat.com/docs/test-and-launch/sandbox/test-store)
- [Offerings](https://www.revenuecat.com/docs/offerings/overview)
- [Entitlements](https://www.revenuecat.com/docs/getting-started/entitlements)
- [Web paywalls](https://www.revenuecat.com/docs/web/paywalls)
- [Webhooks](https://www.revenuecat.com/docs/integrations/webhooks)

## Local validation on 2026-09-26

`npm run type-check`, `npm run lint`, and `npm run build` passed. The restricted filesystem sandbox initially prevented Vitest from reading its config; a permitted rerun outside that sandbox passed all 90 tests across 10 files. On 2026-09-27 the staging page loaded all four Stripe sandbox packages with their configured prices through the Web SDK. A prior simulated monthly Test Store purchase confirmed entitlement activation. A Stripe sandbox checkout, coin grants, the draft paywall, and live billing have not been exercised. The staging server also logged `PGRST106` for the `api` schema role lookup, so N1 Auth remains unverified.
