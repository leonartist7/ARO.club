# September 21 sprint — approved scope, refreshed evidence

IN-PROGRESS; not release-ready. This workboard is a planning snapshot, not a second operational ledger. [Canonical controller ledger](https://github.com/leonartist7/ARO.club/blob/codex/aro-overnight-controller-20260916/ARO-AUTONOMOUS-DELIVERY-LEDGER.md).

## Locked scope and current evidence

Full adult language-focused P1–P5; free real-world Circles; paid digital Pro. No Seasons, AR, extra verticals, marketplace charges or host payouts. Design/Peace primary; BuildInPublic/HAMM secondary; OneSignal conditional. [Award matrix](../AWARD_MATRIX.md).

Main is `79603ae1af60a30f86c105e0f2a4d841043eb727`, F1–F6 integrated. N1 PR #54 at `b431fb59981458f82c635deb2d60e7ffb4077d43` passes exact-head static/browser/platform checks: 91 SQL assertions twice and authenticated journey. Old missing-POST and SQL failures are repaired on N1; historical #52/#53 statuses are not upgraded. Independent review still requires observable failed-upload cleanup, keyboard-accessible upload, and complete R7 evidence. [Review](N1-INDEPENDENT-REVIEW.md).

Next.js is an approved N1 candidate, not the shipped architecture. Hosted email testing, dedicated production backend/SMTP configuration and independent acceptance remain open. N1 v1.2 names `aro-club.vercel.app` as the initial public domain. F7 remains with its existing owner. FV2/FV3 preparation remains PACKAGE ACCEPTED / IMPLEMENTATION BLOCKED. Native packaging, RevenueCat and eligible store release are absent/unverified.

Minimum competitive scope: full P1–P5, free Circle participation, useful RevenueCat digital Pro purchase/restore/revocation, one eligible public store, accessible recovery and truthful evidence. Target adds participant/creator continuity, genuine pilot feedback and one opt-in reminder. Stretch: measured Layers experiment or Galaxy optimization. Reducing the core requires founder decision.

## Workboard

Effort means focused engineering/review time, not elapsed promises. Existing owners retain lanes; unassigned roles are prospective.

| ID | Deliverable | Category benefit | Dependency | Owner | Effort | Acceptance evidence | Status |
|---|---|---|---|---|---|---|---|
| S01 | Eligibility/enrollment/sponsor access | All | Founder facts | Lead + founder | 2–3h | Residence/team/rights/first release; Apple/signing access | Partial; facts requested |
| S02 | Canonical sprint reconciliation | All | CAS claim | Controller | 2–3h | Versioned claims, SHAs and handoff | SH1 claimed |
| S03 | F7 authority/lab unblock | Design | #47 corrections | Existing #47/#48 owners | 3–6h | Approved spec binding; exact browser launches | Packet prepared; blocked |
| S04 | Complete authenticated R7 | All | N1 claim | N1 owner + reviewer | 4–8h | Four changed-journey cases, persisted values, keyboard/timing | Partial; POST now passes |
| S05 | Trust/failed-upload acceptance | All | N1 candidate | N1 owner + reviewer | 2–5h | Cleanup outcomes/tests; exact-head SQL and review | SQL verified; UPLOAD partial |
| S06 | Hosted auth/release foundation | All | S04–S05; inbox/provider gates | N1/I0 owners | 6–12h | Confirmation/recovery/isolation; backend/SMTP | Partial |
| S07 | F7 acceptance | Design | S03; approved base | Existing owner + human | 5–10h | Frozen matrix, budgets, NVDA and visual acceptance | Blocked |
| S08 | Native feasibility | All | S01; approved package | Mobile owner to assign | 6–10h | Installed build, auth/deep links, purchase bridge | Draft prepared |
| S09 | P1 private goals/capabilities | Core/Peace | S06; approved P1 | Product owner | 6–10h | Owner CRUD, hostile access, deletion, UI states | Baseline blocked |
| S10 | P2 revocable intent/safe demand | Core/Peace | S09; spec | Product/data owner | 8–14h | Lifecycle, suppression/privacy, withdrawal | Spec required |
| S11 | A1/P3 proposal/human approval | Core/Design | S10; AI authority/budget | AI/product owner | 12–20h | Permitted inputs, evaluation, failure; no automatic publish | Spec required |
| S12 | P4 free commitment/Circle | Core/Peace | S11; free-pilot addendum | Product owner | 8–14h | Capacity races, consent, withdrawal/cancellation | Spec required |
| S13 | P5 outcomes/Passport | Core/Peace | S12 | Product/data owner | 8–14h | Attributable reports, correction/dispute/visibility | Spec required |
| S14 | Digital Pro/RevenueCat | Eligibility/HAMM | S08; approved terms/value | Monetization owner + reviewer | 10–18h | Purchase/restore/expiry/refund, server entitlement, judge access | Commercial packet proposed |
| S15 | FV2/FV3 adoption/polish | Design | S07; accepted proposals | Existing visual owners | 6–12h | Serial ownership; responsive/theme/state evidence | Preparation accepted |
| S16 | Optional Circle reminder | OneSignal | S12; consent/package | Messaging owner | 4–8h | Opt-in/out, recipient/deep link, deployed campaign | Conditional |
| S17 | Pilot/public build evidence | Peace/BuildInPublic | Usable candidate; outreach approval | Lead + founder | 3–6h + use | Consented feedback, public URLs and changes | Drafts unpublished |
| S18 | Store release candidate | All | Core/native/billing/quality | Release owner + founder | 6–10h | Signed build, privacy/support/reviewer access | Blocked |
| S19 | Demo/Devpost assets | All | Accepted inventory | Lead + founder | 5–8h | Accurate assets, working links and claim map | Draft refreshed |
| S20 | Final release/submission verification | All | Public store; S19 | Lead + founder | 2–4h | US listing, premium access, Submitted receipt | Pending |

Original forecast: roughly 100–180 focused hours. N1 progress reduces diagnosis effort but does not make seven-day delivery assured. Re-estimate after S04–S08. Store review adds external elapsed time.

## Calendar and cuts

Official deadline: September 30, 23:45 PDT = October 1, 08:45 Paris. Internal target September 29. [Official-source checklist](RELEASE-CHECKLIST.md).

| Paris date | Checkpoint |
|---|---|
| Sep 21 | Pin evidence/ownership, prepare packets, enrollment/access and native criteria |
| Sep 22 | Available N1 repair/review and hosted gates; native path; downstream specs |
| Sep 23 | Go/no-go: installed native build, credible store path, security recovery; P1/P2 when gates pass |
| Sep 24–25 | Serial P3 → P4 → P5; purchase integration; serial visual adoption; continuous capture |
| Sep 26 | Freeze only accepted features; native regression and signed store-review submission |
| Sep 27 | Demo/category/reviewer assets; release blockers |
| Sep 28–29 | Store fixes, genuine pilot evidence, founder review; internal submission target |
| Sep 30–Oct 1 morning | Contingency; verify submission before cutoff |

Critical path: N1 remaining acceptance → hosted foundation → P1 → P2 → P3 → P4 → P5 → integrated native/billing verification → public store release → submission. Account/native work runs alongside foundation work and converges before release. F7 gates FV2/FV3 adoption. Specs, evidence review and submission drafts are independent. Product writes stay serialized; reviewers do not share writer build/database resources.

Cut Layers, Noise, Galaxy extras and OneSignal first; ornamentation next. Never cut privacy/Trust, purchase correctness, required accessibility, judge access or truthful evidence. Failed native/store feasibility on Sep 23 requires immediate deadline-risk escalation. No prototype substitution without founder scope decision.

## Founder time and execution

Six 15–20-minute sessions: eligibility/Apple/sponsor identity; production/AI-budget/Pro decisions; required visual/accessibility review; native purchase/journey and pilot; store approval; final demo/Devpost approval. Provider identity checks may take longer. No passwords or keys in documents.

Available configurations: Astra high for architecture/failure analysis; Sol/Terra high for bounded implementation; independent Astra high/xhigh review; Sol medium for evidence indexing. These are recommendations, not scheduled workers. Apply Next.js, Supabase, deployment and browser skills in their phases; creative-production for visual assets. Sponsor/runtime-provider access is separate and unverified.

Cycle: inspect → specify → implement → verify → review → controller handoff. Record spec/base/head, owner, path scope, command exits, hashes, verdict, blocker and next action. No new background schedule is configured.
