# Native release and digital Pro — feasibility and decision packet

Prepared 2026-09-21 under ARO-SH1 v1.0.0, claim `SH1-20260921-001`. **PROPOSED; NOT SPEC-READY for runtime work.** This document is preparation, not a second delivery ledger. The canonical controller retains task states; N1, Trust, F7 and product owners retain their gates and paths.

## Recommendation and known boundary

Assess an **iOS-first Capacitor client with bundled assets**, reusing approved React UI and keeping the Next.js server online. Do not package the old Vite snapshot as though it contains N1, export server-dependent Next.js routes blindly, or use a remote website wrapper as the production solution. The SH1 checkout is a documentation base at `2c564a9…`; the inspected N1 candidate is `b431fb59981458f82c635deb2d60e7ffb4077d43` in PR #54. Neither native installation nor RevenueCat integration has been demonstrated.

Capacitor documents `server.url` as a live-reload facility unsuitable for production. Apple also assesses whether an app supplies sufficient utility beyond a repackaged website. These are concrete feasibility constraints, not a guarantee of rejection or acceptance. [Capacitor configuration](https://capacitorjs.com/docs/config), [Apple review guidelines §4.2](https://developer.apple.com/app-store/review/guidelines/)

Use Codemagic as the first build/signing candidate; it documents Capacitor workflows. Limrun is a candidate for remote simulator/device interaction and recordings. No connection, sponsor credit, macOS runner allocation or paid usage is verified. Lance remains an alternative only if it removes an actual build/release blocker; no parallel platform migration is proposed. [Codemagic](https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/), [Limrun](https://docs.limrun.com/docs)

## Proposed bounded native contract

Before implementation, the controller must approve a separate package with an immutable accepted N1 base, named writer/reviewer, dependency versions, native source/build allowlist, six-to-ten-hour feasibility budget and synthetic-only test target. A passing spike authorizes a decision, not a release. Any necessary auth adapter is a reviewed change, not implicit permission to weaken N1.

| Boundary | Proposed behavior and proof |
|---|---|
| UI/server separation | Ship local native client assets; retain SSR, privileged operations and N1 browser cookies on the hosted server. Inventory every selected route and server dependency before extraction. Share presentational components where safe; never import server secrets or privileged modules into the native bundle. Produce a route-to-client/API parity map and a bundle secret scan. |
| Native authentication | Propose a separate native session adapter using the same authoritative identity/RLS, with refresh credentials in reviewed OS-backed secure storage. Browser SSR cookie behavior stays unchanged. Authenticated native API operations must validate the session and database role server-side; neither a client user ID nor RevenueCat state grants Trust. No claim that web cookies automatically transfer into a native WebView. |
| Confirmation and recovery | Propose owned HTTPS universal links with an exact callback allowlist, a one-time code/PKCE exchange and verified association configuration. Handle cold/warm app launches, browser fallback, expired/replayed links and cancellation. Never place access/refresh tokens in logs, screenshots or reusable deep links. Bundle ID, associated domain and provider callback edits require explicit package binding and verified ownership. |
| Navigation/lifecycle | Test cold start, internal navigation, external-link escape, resume after backgrounding, logout/relogin and denied routes. Show an intentional offline/retry state; never fabricate saved records or queue consequential writes without an approved reconciliation contract. |
| Purchase bridge | Use the official RevenueCat Capacitor SDK only inside the native adapter. Load store offerings and localized prices, start purchase only on explicit tap, expose restore/manage-subscription actions, and render pending/cancelled/error outcomes honestly. Native IAP capability and SDK compatibility must be demonstrated. [RevenueCat Capacitor guide](https://www.revenuecat.com/docs/getting-started/installation/capacitor) |
| Identity/entitlement | Require sign-in before buying; bind purchase identity to the authenticated ARO account through the reviewed RevenueCat identity policy. Propose entitlement `aro_pro`; privileged server features verify it through a trusted provider lookup or authenticated, deduplicated webhook projection. Never accept a client `isPro` assertion. Define account switch, restore ownership, duplicate/out-of-order events and expiry/refund behavior in the narrower monetization spec. |
| Access boundaries | Free Circle participation, safety/reporting, required disclosures, account/data rights and access to existing records remain available. Entitlement does not change verified-host publishing, reputation, money records or eligibility. No Stripe checkout, host payouts or marketplace charges. |

The native adapter and server entitlement projection above are **proposals**, not existing capabilities. Exact SDK versions, secure-storage dependency, endpoint shapes and projection schema must be fixed and independently reviewed in the native/monetization packages before coding. If extraction requires a broad rewrite, report the cost and stop the spike; do not silently replace N1.

## Acceptance and stop conditions

| ID | Required evidence before recommending native release work |
|---|---|
| NF-01 | Reproducible signed install from an immutable commit; build ID, tool versions and signing ownership recorded without credentials. A simulator-only result is labelled and does not establish device purchase acceptance. |
| NF-02 | Fresh synthetic account can confirm, sign in, refresh, recover and sign out on native; expired/replayed callback and account-switch checks pass; web N1 behavior remains intact. |
| NF-03 | One real authorized draft can be persisted and read after restart; cross-user/anonymous requests fail; backend outage produces retry UI with no success claim. Synthetic demonstration content stays labelled. |
| NF-04 | Native sandbox purchase, cancel, restore and provider-verified access pass; a forged client entitlement fails server authorization. Expiry/refund and delayed/duplicate delivery scenarios have recorded results. No live purchase or account charge. |
| NF-05 | iPhone safe areas, keyboard, text scaling, VoiceOver focus/announcements, reduced motion, light/dark and foreground/background behavior pass on the selected supported OS. Web 360/1440 light/dark evidence remains a separate gate. |
| NF-06 | Local assets load without the live-reload URL setting; external untrusted content cannot use the native purchase bridge. Reviewer can reach real product utility and understands network requirements. |
| NF-07 | Active store enrollment, US distribution, product configuration, agreements and review access are verified. Public publication is a later gate; TestFlight is not public-store evidence. |

**Stop immediately** for a requested purchase/upgrade, unknown provider target, secrets in output, unapproved auth/schema/dependency changes, shared writer conflict or inability to preserve existing security rules. Retain evidence and hand the smallest unblock action to its owner. Do not run hosted migrations under this packet.

**September 23 checkpoint:** recommend proceed only if installation, the native auth/deep-link path and purchase bridge are demonstrated and store enrollment has a credible path. If any is missing, flag the deadline at risk with the exact missing result. Do not claim a simulator recording or unsigned package makes the app eligible. Cut secondary sponsor integrations before reliability. Any reduced product scope needs a founder decision.

## Founder commercial decision packet — one 15–20-minute session

Everything in this table is a proposal awaiting explicit approval; no product or price is configured.

| Decision | Recommended proposal | Tradeoff / approval record |
|---|---|---|
| Initial paid utility | **ARO Pro: reusable language-Circle planning templates, saved run-of-show plans and editable preparation checklists.** Keep one-off Circle creation/participation free. No AI calls in this paid bundle unless A1 separately approves them. | Recurring value must be proven with functioning repeat-planning tools; the current product does not establish it. Approve benefits only after a concrete demonstration. These features need their own approved package, never delivery through this document. |
| Price and cadence | Propose **US$4.99/month**, one auto-renewing plan, no annual plan and no introductory trial for the initial release. | This is a starting hypothesis, not researched willingness-to-pay or a revenue forecast. Founder must approve price, launch markets, localized pricing and store terms before configuration. |
| Free boundary | Core P1–P5 journey, required safety and data rights free; only additional digital planning convenience paid. | Preserves usefulness for the pilot; lower immediate revenue potential is acceptable. Never sell qualification, priority Trust or physical participation. |
| Downgrade | Stop creation/use of premium tools after verified expiry; preserve readable/exportable existing user plans and ordinary Circle access. | Requires an explicit retention/export contract and tests, with no surprise deletion. |
| Judge access | Dedicated synthetic reviewer account with documented, approved premium access for judging; provide purchase/restore instructions separately. | No public bypass, hardcoded master account or shared real-user identity. The entitlement mechanism and its expiry must be reviewed. |
| Costs | Current authorized new spend for this packet: **zero**. Request an exact quote before enrollment charges, build-minute purchases, provider plans or AI credits. | Sponsor access must be confirmed; a sponsor logo is not usable credit. |

If the recurring benefit is not ready, do not launch an empty subscription to tick the RevenueCat box. Return the concrete alternative to the founder (for example a useful non-consumable digital toolkit) for a revised monetization contract; do not substitute it autonomously.

## Account unknowns and smallest unblock actions

| Unknown | Responsible person | Smallest next action / evidence |
|---|---|---|
| Apple enrollment, legal entity, agreements | Founder | Confirm active membership or complete identity/enrollment; record status/date, not identity documents. Apple enrollment is prerequisite account work, not an approval-time promise. [Apple enrollment](https://developer.apple.com/programs/enroll/) |
| App identity/signing and US availability | Founder + release owner | Confirm developer team and unclaimed bundle/app record; grant scoped access through provider UI; record nonsecret identifiers in approved release evidence. |
| RevenueCat project/store products | Founder + monetization owner | Confirm account/project access and approved digital terms; configuration occurs only under the new package. No credentials in chat or Git. |
| Codemagic/Limrun credits and connection | Founder + release owner | Check actual balance, permitted repo access and supported build artifact; approve any quoted cost separately. |
| Owned link domain and isolated backend | N1 owner | Confirm accepted production target, domain association capability and hosted email/security gates. Existing provider permissions do not transfer automatically to this agent. |
| Real iPhone/purchase test access | Founder + release owner | Confirm device or provider-supported equivalent and sandbox test account; schedule a 15–20-minute install/auth/purchase check. |
| Existing Google Play production access | Founder | Confirm whether account is already eligible. New personal accounts require at least 12 opted-in testers over 14 continuous days before applying for production; starting September 21 cannot finish that period by September 30. [Google testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en-GB) |

Report back to the canonical ledger controller with native feasibility results, exact base/build identifiers, commercial decisions and remaining owner gates. This packet neither schedules background work nor promotes N1, Trust, mobile or monetization to VERIFIED.
