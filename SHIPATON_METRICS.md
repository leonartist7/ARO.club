# Shipaton metrics

Updated 2026-09-08. Instrumentation: NOT STARTED. Production results: NOT MEASURED. Synthetic fixture counts, CI users and generated portraits never count as traction.

## Measurement contract to adopt in the analytics package

Events carry event_id, occurred_at in UTC, schema_version, environment, app_version and pseudonymous subject ID where permitted. Provider transaction IDs are deduplicated server-side. Do not log raw goals, capability text, exact locations, identity documents or message bodies. Decide consent, retention, deletion and access before collecting; update the existing privacy disclosure before enabling any SDK.

| Metric | Definition | Source / proposed event | Actual |
|---|---|---|---|
| Store impressions / downloads | Store-reported impressions and first downloads; separate stores and periods | Store export | Unknown |
| Signup / onboarding | Unique successful accounts / completed onboarding; exclude fixtures | signup_completed / onboarding_completed | Unknown |
| Activation | First persisted goal + contribution followed by first real opportunity detail view within 24h; candidate definition | activation_completed from verified events | Unknown |
| Core action | Unique successful real commitment; idempotent retries count once | commitment_created server event | Unknown |
| DAU / WAU | Unique users with a meaningful core action or active opportunity planning in 1 / 7 days | Qualified activity events | Unknown |
| D1 / D7 retention | Activated cohort performing meaningful activity on day 1 / 7 UTC after activation | Mature cohort only | Unknown |
| Paywall exposure | Unique users viewing a successfully loaded offering | paywall_viewed + offering_id | Unknown |
| Trials | Provider-confirmed trial starts, not purchase-button taps | RevenueCat | Unknown |
| Free → paid | First paying users / eligible free users in stated cohort and window | RevenueCat + cohort join | Unknown |
| Trial → paid | Trials converting / trials reaching conversion eligibility; no immature trials | RevenueCat | Unknown |
| Purchases / revenue | Production verified transactions; report gross, refunds and net separately by currency | RevenueCat export | Unknown |
| ARPU | Net subscription revenue / defined active-user denominator, same period | Reconciled export | Unknown |
| Churn | Paid entitlements that expire / paid subscribers at period start; cancellation intent separate | RevenueCat lifecycle | Unknown |
| Notification return | Unique recipients opening then performing meaningful action within 24h | campaign_id → open → action | Unknown |
| Share conversion | Recipients activated within 7 days / unique attributed recipients | share → deep link → activation | Unknown |
| Real-life outcomes | Completed Circles, attendance and hours with evidence provenance | Outcome records; self-report labeled | Unknown |

Also instrument core_action_failed, paywall_failed, purchase_cancelled, purchase_failed, restore_completed, entitlement_changed, notification_permission_changed and session_returned. Client success is not payment proof.

## Reporting discipline

Daily after launch: save dated exports, reconcile duplicates/refunds, update counts and numerator/denominator. Report timezone, window, cohort maturity, currency and source path. Small samples are descriptive, not proof of causality. A September 23 launch permits limited D7 evidence before the deadline; do not claim D30 retention.

| Date/window | Metric | Numerator | Denominator | Value | Source | Exclusions / confidence |
|---|---|---|---|---|---|---|
| 2026-09-08 | All production metrics | Unknown | Unknown | Not measured | No connected production export | Not zero |

## First experiments

1. Activation: three-point guided formation versus existing ordering. Outcome: qualified activation; guardrails: errors, abandonment, accessibility. Only after real persistence exists.
2. Value-first paywall after using a host planning tool. Outcome: verified purchase per eligible exposed user; guardrails: refunds/support and cancellation. Do not split scarce traffic across multiple prices at launch.
3. OneSignal timely Circle reminder versus a consented eligible holdout. Outcome: meaningful return and attendance, with absolute counts and uncertainty. Never withhold safety or cancellation messages.
