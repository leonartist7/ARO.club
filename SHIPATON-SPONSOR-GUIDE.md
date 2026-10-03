# Shipaton sponsor perks — recommendations for ARO

Saved: 28 September 2026. Covers all 26 sponsors in your pasted Ship Kit list.

## Recommendation

**Prioritize Mobbin, Sentry, Stripe, and OneSignal. Consider Layers when the product is ready for a measurable growth experiment.** These recommendations assume your project is ARO / ARO.club: a human opportunity network with real-world participation and a language-learning vertical.

The current local package uses Next.js and React, and includes RevenueCat's web SDK. The local billing setup document selects RevenueCat Billing with Stripe, currently in sandbox. This makes tools that improve the existing web product more useful now than switching to a new app builder or native language for a prize.

Recommendations below are product-fit judgments, not claims that integrations are installed, accounts qualify, or perks have been redeemed.

| Priority | Sponsor | Why it fits ARO | Suggested use / condition |
|---|---|---|---|
| 1 — Use now | Mobbin | Useful design references with no runtime integration | Research onboarding, discovery, profiles, participation and subscription screens. Adapt patterns to ARO's existing design system. |
| 2 — Plan next | Sentry | Helps diagnose failures in real user journeys | Instrument account, participation and checkout errors as those flows become available. Review collected data and replay settings. |
| 3 — Keep selected direction | Stripe | Aligns with the documented RevenueCat web billing plan | Check credit eligibility and earning conditions. Complete the existing billing path; keep digital subscriptions and real-world booking/payout requirements distinct. |
| 4 — Strong product fit, later implementation | OneSignal | Timely reminders could help people actually attend and return | Begin with one consented reminder or subscription lifecycle flow. Confirm the delivery channel works on target devices and links to a working destination. |
| 5 — Launch experiment | Layers | Could support content and a repeatable invitation loop | Test one city or community: content → qualified visitor → participant → invitation. Start the free window when there is a working conversion to measure. |
| Optional | OpenRouter | Small budget for exploring future AI assistance | Use for a bounded prototype if a real AI requirement exists; it does not justify adding AI to the release scope. |

## Unlock stages

| Stage | Requirement | Sponsors in supplied list |
|---|---|---:|
| 1 | Register on Devpost and complete the participant form | 14 |
| 2 | Create a RevenueCat project and app | 3 |
| 3 | Complete a first test purchase | 4 |
| 4 | Make a first Store API call | 3 |
| 5 | Make a first real purchase | 2 |

The official resources page says milestones are detected automatically and redemption instructions are emailed. It specifies RevenueCat Test Store for stage 3, a real store/API key for stage 4, and a successful purchase in a live store app for stage 5. **Do not assume ARO's web sandbox alone unlocks stages 4–5.** Confirm through the milestone email or organizer guidance. [Official Ship Kit instructions](https://revenuecat-shipaton-2026.devpost.com/resources).

## Complete sponsor catalog

Perk amounts and durations below preserve your supplied list. “Not specified” means the list does not provide the detail; it does not mean unlimited access.

### Stage 1 — Registration

| Sponsor | Benefit | What it helps with | ARO recommendation |
|---|---|---|---|
| Replit | 40% off Pro ($40 off); duration not specified | AI app building; supplied description includes RevenueCat integration | **Low priority.** Existing Next.js project and coding workflow reduce the value of changing platforms. |
| OneSignal | 100% off Growth Plan for up to 3 months | Push, in-app messages, email/SMS; subscription lifecycle campaigns | **High fit.** Participation reminders and return visits, once real flows and consent exist. Check usage/channel charges. |
| JetBrains / Junie | Free Junie access for 2 months; limited to 200 redemptions | AI coding assistance in JetBrains IDEs | **Optional.** Useful if you already use that IDE. The Kotlin prize is a separate stack requirement. |
| Noise | Up to $1,000 in dollar-for-dollar matching credits | UGC creator campaigns | **Later.** Local community content could fit, but full matching requires $1,000 of your own eligible spend. |
| Layers | Free access for 2 months | Marketing content, ads, social and store listing optimization | **Good launch fit.** Use for one measured acquisition/invitation experiment. Ad spend inclusion is unspecified. |
| Stripe | Earn $250 in Stripe credits | Web subscription checkout and web-to-app funnels | **High fit.** Matches the selected billing direction. “Earn” is conditional; the pasted list gives no earning criteria. |
| Argent | Free access; duration not specified | Agent-assisted app testing and debugging | **Evaluate if needed.** Confirm support for ARO's current stack and a concrete advantage over existing verification tools. |
| Bitrig | 60% off Pro; duration not specified | AI-assisted native Swift development | **Low priority.** Relevant only if a native Swift app becomes the chosen direction. |
| Codemagic | Free tier: 500 build minutes per month | Mobile builds, signing and store deployment; React Native OTA tooling | **Mobile phase.** No immediate need for the current web build. Listed as a free tier rather than a special cash grant. |
| Emergent | 200 free credits, stated value $40 | AI app building with RevenueCat integration | **Low priority.** Could prototype a separate idea, but overlaps with the existing development workflow. |
| Lance | Free access for 3 months, stated value $180 | iOS builds, signing, IAPs and submission | **Mobile phase.** Consider when there is an actual iOS project and a signing/submission bottleneck. |
| lim.run | 2,000 credits, stated value $100 | Agent access to iOS simulators, Android emulators and Xcode environments | **Mobile phase.** Potentially useful from your Windows workflow once native testing is needed. |
| OpenRouter | $10 credit | Access to multiple AI model providers through one API | **Optional prototype.** Small experimentation budget; no current production AI requirement established here. |
| Tenjin | All-Inclusive Plan S free for 3 months, stated value $600 | Mobile advertising attribution | **Later.** Evaluate when paid mobile campaigns generate enough data to make decisions. |

### Stage 2 — RevenueCat project and app created

| Sponsor | Benefit | What it helps with | ARO recommendation |
|---|---|---|---|
| Mobbin | 3 months free | Mobile and web design references | **Top immediate pick.** Useful without changing the stack or waiting for launch. |
| Paddle | No fees on the first $100,000 in transaction volume | Merchant of Record for digital products | **Alternative to evaluate only if billing strategy changes.** Avoid adding a second billing architecture just for the promotion. $100,000 is eligible volume, not free money. |
| Tminus | 80% off Pro for 3 months | App Store metadata, screenshots, compliance and submission automation | **Mobile launch phase.** Compare with Lance once submission work is concrete; paying for both may duplicate value. |

### Stage 3 — First test purchase

| Sponsor | Benefit | What it helps with | ARO recommendation |
|---|---|---|---|
| AppScreens | 50% off Pro or Scale; duration not specified | Store screenshots, localization, size variants and exports | **Good mobile launch fit.** Use when final app screens and target store requirements are known. |
| Asapty | 30-day free trial plus a dedicated Apple Search Ads specialist | Apple Search Ads bidding, keywords and optimization | **Later.** Needs an iOS listing, acquisition budget and measurable conversion. Ad spend is not stated as included. |
| Linearity | 50% off the entire suite; duration not specified | Editable marketing designs and channel variants | **Optional.** Useful if producing visual assets is a bottleneck; still a paid offer. Compare with existing design tools. |
| Sentry | $100 in credits | Error tracking, performance monitoring and session replay | **High priority.** Useful for launch reliability and diagnosing failures in important user journeys. |

### Stage 4 — First Store API call

| Sponsor | Benefit | What it helps with | ARO recommendation |
|---|---|---|---|
| Airbridge | GO: 2 months free, limited to 100 redemptions. Core: 6 months free, stated value $240 | GO: campaign planning/creatives/tracking. Core: attribution and subscription funnel measurement | **Later.** Compare against Tenjin and Appstack when selecting a mobile measurement tool; avoid redundant integrations. |
| AppFollow | 50% off for 6 months | Store reviews, responses and ASO performance | **After mobile launch.** More valuable once reviews and support volume exist. |
| AppTweak | 50% off; duration not specified | Store keyword research, competitors and rankings | **Store discovery phase.** Prioritize if search becomes a meaningful acquisition channel. |

### Stage 5 — First real purchase

| Sponsor | Benefit | What it helps with | ARO recommendation |
|---|---|---|---|
| Appstack | Full access free; duration not specified | Ad attribution and acquisition-source-specific paywalls | **Later.** Useful when paid campaigns and enough purchases support meaningful comparisons. |
| Fload | Full access free; duration not specified | Combines store, ad and RevenueCat data for conversational analysis | **Later.** Useful after there is real operating data to query. Confirm web-only support if ARO remains web-first. |

## Prize opportunities are separate from perks

These are category amounts stated in your pasted sponsor list, **not guaranteed individual awards or credits**. The existing September 8 ARO award matrix uses first-place figures, so its smaller numbers should not be compared directly with these category headlines. Current rules and evidence requirements govern entry.

| Sponsor | Advertised category amount | Category described in your list | Fit for ARO |
|---|---:|---|---|
| OneSignal | $45,000 | Best use of its SDK | Strong natural fit if reminders demonstrably improve participation. |
| Layers | $30,000 | Successful growth loop using Layers | Plausible once an invitation loop has observed results. |
| Stripe | $30,000 | Highest web payment volume through a web-to-app funnel | Billing fit is strong; prize competitiveness needs real qualifying volume and a web-to-app flow. |
| Noise | $30,000 | Most attention in an app's niche | Possible with a focused local/language community and an actual campaign. |
| Replit | $30,000 | Best app built on Replit | Low fit for the current implementation path. |
| JetBrains | $30,000 | Best cross-platform Kotlin / Compose Multiplatform app | Low fit for the current Next.js stack. |

## Practical next steps and redemption tracker

1. Confirm registration and participant form completion; locate the milestone emails.
2. Check Mobbin availability first. Use it for the next concrete design task.
3. Locate Sentry and Stripe redemption terms; record expiry, eligibility and what credits cover.
4. Plan one OneSignal use case against a working ARO flow before starting its trial clock.
5. Activate Layers when the landing page and conversion event are ready for an experiment.
6. Defer native build/store tools and paid attribution until those needs exist.

| Sponsor | Decision | Redemption status | Activated | Expires / renews | Next action |
|---|---|---|---|---|---|
| Mobbin | Prioritize | Unknown | — | — | Find stage 2 email and inspect terms |
| Sentry | Prioritize | Unknown | — | — | Verify stage 3 unlock and credit terms |
| Stripe | Keep billing direction | Unknown | — | — | Check how $250 is earned and applied |
| OneSignal | Plan one flow | Unknown | — | — | Confirm channel, trial timing and usage limits |
| Layers | Launch experiment | Unknown | — | — | Define conversion event before activation |
| OpenRouter | Optional | Unknown | — | — | Redeem only for a defined model experiment |

No accounts were created, offers redeemed, subscriptions started or integrations changed by preparing this guide. Check expiry and post-promotion pricing in the actual redemption terms; these details were not supplied for most offers.

## Sources and scope

- Primary catalog: your pasted “Ship Kit Perks” text, preserved alongside this guide as `SHIPATON-SPONSOR-SOURCE.txt`.
- Official milestone and redemption instructions, checked 28 September 2026: [Devpost resources](https://revenuecat-shipaton-2026.devpost.com/resources).
- Current competition eligibility and category conditions: [Devpost rules](https://revenuecat-shipaton-2026.devpost.com/rules). This guide is not an eligibility audit.
- Project context: local `ARO.club/package.json`, `ARO.club/ARO_CURRENT_STATE.md`, `ARO.club/docs/REVENUECAT_SETUP.md`, and `ARO.club/shipaton/AWARD_MATRIX.md`. Some local documents retain older snapshots; the recommendations use the current package manifest and the September 26 billing-direction note where relevant.

This is a planning reference for tool selection, not a change to the project's approved delivery scope.
