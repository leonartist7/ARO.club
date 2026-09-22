# ARO — Frontend Master Blueprint

**A more interesting life, beautifully connected.**

22 September 2026 · Proposed product and creative direction · Version 1.0

This blueprint expands the existing ARO vision into a coherent frontend ecosystem. It is a design proposal, page atlas, interaction brief, asset plan, and implementation roadmap. It does not declare the proposed features implemented or change existing runtime, money, Trust, or release gates.

## 1. The architectural decision

Build one experience in which **a possibility becomes a plan, a plan becomes a shared experience, and an experience becomes part of your identity**.

The emotional promise is: **Your city opens up. Your world becomes more you.**

The practical promise is: **Know what you can do, who you will do it with, what it involves, and what happens next.**

ARO should combine the expressive craft and immediate feedback that make playful apps appealing with the clarity needed for real people, places, commitments, and money. The store, character, courtyard, Passport, and Season belong to this larger loop. Their purpose is to make a lived life visible and personally meaningful.

Five design commitments:

1. **Possibility before inventory.** Home starts with a useful opening in your life, rather than a shop, points balance, or endless feed.
2. **One next action.** Every screen has a clear purpose and dominant action. Secondary exploration stays available.
3. **A recognizable world.** Editorial type, tactile miniature environments, adult human characters, and ARO’s orbit-to-Circle geometry form one visual language.
4. **Delight with consequences you understand.** Joining, paying, publishing, sharing, and claiming each communicate their actual state.
5. **Progress you keep.** Memories and identity accumulate without punitive streak loss or pressure to keep opening the app.

“Almost addictive” becomes **worth returning to**: anticipation, discovery, belonging, collection, mastery, and creative ownership. This follows ARO’s own explicit principle of rewarding life rather than scrolling.

## 2. What the review establishes

### Source coverage and authority

The review covered the governing product/design corpus and relevant handoffs; it is not a line-by-line audit of every historical repository file.

| Source | What it contributes | How this blueprint uses it |
|---|---|---|
| ARO_VISION, ARO_MASTER, ARO_PRODUCT | Human Opportunity Network; five primitives; Tonguee first; long-term ecosystem | Preserve the core loop and distinguish V1 from expansion |
| ARO_EXPERIENCE_SYSTEM, ARO_DESIGN_SYSTEM | Living Opportunity OS; Field, Orbit, Portal, Path, Constellation; accessibility and brand | Establish visual and interaction system |
| ARO_SEASONS_AR | Four-chapter Seasons, quests, Beacons, Trails, Passport, real-life progression | Rebuild the Season experience around useful activity |
| PR #59, head ef909af22fe41ba0372e126cfb95508a46c2dc68 | Hybrid economy and expanded monetization proposal | Map business models to honest frontend journeys; no invented rates |
| ARO_MONEY in PR #59 | Money, community credits, reputation; digital entitlements versus marketplace settlement | Separate balances, ownership, earnings, and access |
| ARO_FRONTEND_VISUAL_CONTINUATION_PLAN | FV1–FV6 sequence and static route map | Preserve participant cohesion, creator preview, return loop, and system states |
| FV2 Participant Loop spec and FV3 Creator Proposal Preview handoffs | Proposed state contracts, reversible previews, ownership, performance gates | Carry their scope discipline into future packages |
| ARO_CURRENT_STATE, architecture, delivery plan, AGENTS, controller handoff | Migration, ownership, infrastructure and acceptance boundaries | Treat dated handoffs as dated; re-pin live state before execution |
| ARO_GROWTH | Calgary density, Founding 100, participant-to-host loop | Design local usefulness and creator conversion before broad expansion |
| Your Little World master vision | Personalization art and experience direction | Extend the existing identity system into the broader product |
| PR #60 personalization preview, published head 1749575aa12e1b240ed2ca6273defd391f0588f5 | Five implemented preview pages and generated art | Reuse as foundation, not evidence of a live economy |
| Local Next.js route inventory | Existing public, ARO, teacher, and admin routes | Avoid treating existing route wrappers as missing or production-complete |

Legacy Tonguee plans remain valuable domain history. They do not override current ARO strategy or imply that Coco and language-specific warmth should disappear.

### Existing foundation and gaps

The core ARO visual prototype already has Home, World, opportunity browsing/detail/commitment, Circles, Create, Profile, Expression, Insights, Passport, Library, and Settings. The personalization branch adds Profile, Character, Shop, Space, and Season previews. There are also inherited authentication, experience, teacher, and admin surfaces.

The five personalization pages have real frontend interactions, but their state is synthetic and in memory. They are not live inventory, purchased ownership, earned progression, or subscriptions. Prior responsive evidence is useful but does not establish native iPhone/Android testing or complete accessibility acceptance.

The major design gap is **continuity**. The current experience contains attractive destinations, but the entire journey needs one navigation model, one identity model, a consistent state language, and a convincing connection from an actual experience to a keepsake, Passport entry, Season chapter, and next opportunity.

Other priorities:

- Consolidate overlapping Profile, Expression, Personalization, Passport, and Library entry points.
- Replace small decorative labels and overlarge repeated headers with a clear type hierarchy.
- Give Season a spatial story, meaningful chapter pages, reward previews, and a permanent archive.
- Design the less glamorous surfaces: cancellation, waiting, errors, empty inventory, support, subscription recovery, privacy, and inaccessible locations.
- Preserve imaginative Home/World compositions while providing reliable list alternatives.
- Resolve the current navigation labels—Home/World/Create/Insights/Library—against the strategic Home/Explore/Create/Messages/Saved direction in one explicit shell package.

### Completion reporting

A credible full-frontend percentage cannot be derived from route count. A static page, a working preview, a connected runtime journey, and an accepted release are different milestones. Track every family below through **Specified → Designed → Implemented → Verified → Accepted**. Publish separate percentages for each stage against an agreed weighted backlog. This document establishes the proposed denominator; it does not invent a completion percentage.

## 3. Creative direction: The Living Atelier

ARO feels like a warm, beautifully made place where human possibility takes shape. Think an editorial travel journal meeting a tactile miniature neighborhood and a personal studio.

### Visual grammar

- **Bone and ink** carry readable everyday interfaces.
- **Vermilion** signals the principal action and active possibility.
- **Moss, saffron, clay, sky, and night plum** distinguish environments and moments.
- **Editorial serif** introduces an invitation or meaningful memory. **Manrope or the existing approved sans** carries navigation, forms, logistics, status, and financial details.
- **Ceramic, paper, woven fabric, and matte painted wood** give assets warmth. Avoid shiny toy plastic and indiscriminate glossy 3D.
- **Adult, varied human characters** feel welcoming without infantilizing the service. ARO’s human identity stays distinct from Tonguee’s Coco.
- **Actual host and place photography** supplies real-world decision evidence. Generated scenes communicate imagination and fictional concepts; they never impersonate actual hosts, venues, or attendance.

### Four visual modes, one system

| Mode | Surfaces | Composition |
|---|---|---|
| Invitation | Home, Season, city introduction | One expressive scene, short editorial statement, clear next action |
| Decision | Opportunity, commitment, subscription | Calm hierarchy, readable facts, visible terms, restrained art |
| Expression | Character, room, collections | Generous preview stage, direct controls, immediate reversible feedback |
| Operations | Messages, hosting, support, admin | Compact readable rows, status clarity, filters, minimal decoration |

Do not give every page a giant illustration. A common family should retain purposeful differences.

### References translated into ARO decisions

Duolingo’s core-tab redesign describes consistent title placement, a smaller type vocabulary, purposeful spacing, and testing competing compositions on phones. Apply those craft principles to ARO’s shell and page families; preserve ARO’s own materials, characters, and real-world purpose. [Duolingo design case study](https://blog.duolingo.com/core-tabs-redesign/)

Apple’s Design Awards separate interaction, inclusivity, innovation, social impact, delight, and visual craft. Use those as critique lenses: beauty must survive actual use, different abilities, and platform constraints. This is an aspiration, not a prediction of awards. [Apple Design Awards](https://developer.apple.com/design/awards/)

The generated “Awaken Your City” board accompanies this proposal as a mood exploration. Its miniature neighborhood and collectibles are useful art direction. Its tiny annotations, extra slogans, realistic character rendering, and mobile navigation are not approved production specifications. Final UI uses the accessible layout rules below, and final characters should match the existing stylized ARO family more closely. Local city art also needs Calgary-specific research rather than a generic Mediterranean treatment.

## 4. Information architecture

### Consumer shell

Recommended primary navigation: **Home · Explore · Create · Messages · Saved**.

The avatar opens **Your World**: Profile, Passport, Character, My Space, Collection, Season, Shop, and Settings. Season also appears contextually on Home and Explore. Store does not displace a primary real-world task.

- **Home:** What matters now and what could happen next.
- **Explore:** Discover opportunities and emerging possibilities; World is its spatial view.
- **Create:** Express a wish, share a capability, or develop an eligible proposal.
- **Messages:** Circle coordination and direct communication, with meaningful action states.
- **Saved:** Things you intend to revisit: opportunities, plans, Trails, and collections of possibilities.

“My Space” means the personal decorative room. “Spaces” means real venues. Keep these labels distinct everywhere. “Collection” means owned or earned decorative items. “Passport” means experiences and evidence. “Saved” means future intent. “Insights” becomes a section of Passport/Your World rather than a competing top-level destination.

**Host mode** uses the same identity with its own operational navigation: Overview, Opportunities, People, Earnings, Tools. **Partner and admin workspaces** remain separate permissioned experiences. Do not expose every future business function to every participant.

Deep links preserve destination through sign-in and return users to the relevant task. Old routes remain compatible through an explicitly approved migration; do not silently rename working destinations.

### Full page atlas

These are 64 screen families, not 64 mandatory standalone routes. Sheets, tabs, steps, and detail variants should share components. “Foundation” describes available visual or inherited code, not acceptance of full runtime behavior.

Waves: **A** foundation/core design; **B** identity/Season visual expansion; **C** connected core runtime through P1–P5; **D** progression/commerce after their specs; **E** later ecosystem.

| ID | Family | Main job / action | Foundation | Wave |
|---|---|---|---|---|
| 01 | Public ARO introduction | Understand value; explore | Existing public surfaces | A |
| 02 | City / Tonguee landing | Find locally relevant starting point | Existing vertical; city expansion proposed | A/E |
| 03 | Sign-in, recovery, invitation return | Enter and resume task | Inherited auth; verify current gates | A/C |
| 04 | Welcome and intention | Choose what life needs now | Onboarding foundation | A/C |
| 05 | Capability and availability | Say what you offer and when | P1 planning / inherited profile | C |
| 06 | Preferences and consent | Set location, visibility, accessibility needs | Settings foundation | A/C |
| 07 | Home / personal Field | Take next useful step | ARO preview | A/C |
| 08 | Explore / list and World | Find fitting opportunity | ARO preview | A/C |
| 09 | Search and filter results | Narrow time, budget, format, access | Existing discovery foundation | A/C |
| 10 | Opportunity detail | Understand fit and terms | ARO preview / legacy experience | A/C |
| 11 | Host public profile | Assess relevant experience and qualification | Teacher/profile foundation | A/C |
| 12 | Real venue detail | Understand access, facilities, capacity | Later Spaces concept | E |
| 13 | Commitment review | Understand and approve exact commitment | ARO preview | A/C |
| 14 | Pending / threshold / waitlist | Know what happens next; withdraw | Expand commitment states | A/C |
| 15 | Confirmation and preparation | Prepare; open Circle | Circle foundation | A/C |
| 16 | Booking management | Change/cancel with clear consequences | Inherited booking domain | A/C |
| 17 | Circle room | Coordinate people and plan | ARO preview | A/C |
| 18 | Messages and conversation | Respond, coordinate, control contact | Requires reconciliation | A/C |
| 19 | Notifications / action inbox | Resolve relevant changes | Expand system states | A/C |
| 20 | Saved collections | Organize future possibilities | Library foundation | A/C |
| 21 | Calendar / upcoming | See commitments and conflicts | Proposed dedicated composition | A/C |
| 22 | Create entry / Seed Studio | Choose wish, contribution, gathering | Existing preview; FV3 handoff | A/C |
| 23 | Intent / wish detail | Express need; understand status | P2 direction | C |
| 24 | Proposal composer / draft | Shape understandable opportunity | FV3 proposed preview | A/C |
| 25 | Participant preview / submit | Review offer and eligibility | FV3 contract | A/C |
| 26 | Attendance and outcome | Record what actually happened | P5; inherited domain | C |
| 27 | Reflection and evidence status | Add memory; see proof level | Passport foundation | A/C |
| 28 | Passport timeline / constellation | Understand lived progress | ARO preview | A/C |
| 29 | Memory detail / sharing | Revisit and selectively share | Proposed expansion | B/C |
| 30 | Your World / profile | Express identity and find personal tools | Existing + personalization preview | B/C |
| 31 | Edit profile / visibility preview | Control how others see you | Existing foundation | B/C |
| 32 | Character studio | Try and save appearance | Personalization preview | B/D |
| 33 | Wardrobe / outfits | Find compatible owned items | Shop/character foundation | B/D |
| 34 | My Space editor | Place and arrange meaningful objects | Personalization preview | B/D |
| 35 | Collection / item story | Understand ownership and origin | Proposed expansion | B/D |
| 36 | Shop / curated collections | Discover wanted customization | Personalization preview | B/D |
| 37 | Item detail / try-on | Preview fit, source, and price | Preview dialog foundation | B/D |
| 38 | Order / purchase recovery | Review, recover, find receipt | New commercial flow | D |
| 39 | Season hub | Choose a meaningful next chapter | Personalization preview | B/D |
| 40 | Chapter detail | Pick a suitable activity | Preview rows to full composition | B/D |
| 41 | Quest detail / alternatives | Understand objective and evidence | Proposed expansion | B/D |
| 42 | Reward preview / collection | See what can be earned and why | Proposed expansion | B/D |
| 43 | Season+ comparison / purchase | Understand extra value and terms | Preview comparison foundation | B/D |
| 44 | Season archive / recap | Keep the story after the season | Proposed expansion | B/D |
| 45 | Subscription center | Restore, manage, cancel, resolve state | New entitlement flow | D |
| 46 | Access credits | Understand eligibility and use | PR59 strategy only | D |
| 47 | Spending history / refunds | Track actual money and status | Payment domain; separate spec | D |
| 48 | Privacy / data controls | Control visibility, export, deletion | Settings foundation | A/C |
| 49 | Accessibility / appearance / language | Set usable experience | Theme/i18n foundation | A |
| 50 | Help / report / block / case status | Get assistance safely | Trust/support foundation | A/C |
| 51 | Host overview | Prepare and act on operations | Teacher dashboard foundation | A/C |
| 52 | Host qualification / application | Understand requirements and status | Existing Trust flow | A/C |
| 53 | Host opportunity management | Draft, schedule, manage change | Teacher domain foundation | C |
| 54 | Host Circle / attendee operations | Communicate and record outcomes | Circle/domain foundation | C |
| 55 | Host earnings / payout detail | Separate forecast, earned, held, paid | Monetization direction | D |
| 56 | Host Pro / Director tools | Evaluate tools; approve suggestions | Strategy only | D/E |
| 57 | Wish Market / demand intelligence | Discover aggregate unmet need | P2/P3 concept | C/E |
| 58 | Partner venue / capacity studio | Offer suitable unused capacity | Strategy only | E |
| 59 | Sponsor / institutional program | Fund access and report outcomes | PR59 strategy | E |
| 60 | Creator Season / event studio | Build an approved program | Strategy only | E |
| 61 | Trails / Expeditions / Beacons | Follow useful local discoveries | Seasons strategy | E |
| 62 | Travel / Life Map | Plan and remember opt-in exploration | Strategy only | E |
| 63 | Teams / exchanges / bounties | Coordinate approved advanced formats | Long-term master vision | E |
| 64 | Admin / review / disputes / audit | Operate marketplace responsibly | Existing admin foundation | A/C/E |

Every family also requires loading, empty, error, permission, stale-data, and recovery treatment when applicable. Not every family needs all states; specs must explain omissions.

## 5. Golden journeys

### Participant: from curiosity to confidence

Home invitation → Explore → Opportunity → Commitment review → pending or confirmed → Circle preparation → activity → outcome/reflection → Passport memory → optional Season progress and keepsake → a relevant next invitation.

Keep the same title, host identity, time, location disclosure, and status across every step. On return from checkout, the interface waits for authoritative confirmation; it does not celebrate an unconfirmed transaction.

### Creator: from capability to opportunity

Capability → explicit local demand → seed → structured proposal → participant preview → qualification checks → submit/publish where permitted → manage Circle → outcome → earnings and reflection.

The Director helps shape agenda, accessibility, materials, and contingencies through editable suggestions. The host approves consequential changes. No chat transcript is required when a structured plan is clearer.

### Returning member: from experience to personal world

Completed activity → choose a reflection → keep a Spark memory → place related keepsake in My Space → optionally share a curated memory card → find another relevant opportunity.

A bought cosmetic records purchase provenance. An earned keepsake records its genuine qualifying origin. Neither becomes a Trust credential.

### Season participant: from aspiration to activity

Season invitation → see four chapters → choose suitable quest → select available opportunity or approved alternative → understand evidence → complete → progress updates → item becomes available → place it → return to life.

The system never forces someone to manufacture three new contacts, reveal private conversations, or attend an inaccessible activity to remain included.

### Funded participant

Opportunity → eligible access funding → plain-language sponsor and contribution breakdown → review → confirmation → attendance → ordinary outcome flow. Show what the sponsor sees before accepting. Funding is not an extra currency game.

### Recovery journey

Cancelled activity, payment uncertainty, rejected evidence, expired access, or failed save → honest status → preserved input → explanation → available next action → support if necessary. These journeys deserve the same design quality as success.

## 6. Key screen compositions

### Home: “A little more life, nearby.”

At phone width, use a compact greeting/avatar row, then action-needed or upcoming commitment when relevant. Otherwise show one principal possibility with meaningful scene art. Follow with two or three suitable opportunities, one forming Circle, and a quiet Season invitation. End deliberately; do not create an infinite scroll.

A returning participant with an activity today sees time, preparation, and Circle access before a shop promotion. A new member sees one understandable first step. A low-density city sees an honest invitation to express interest, not fabricated activity.

On desktop, add a supporting upcoming rail and richer spatial context; retain the same priority order.

### Explore / World

Offer **List / World** as equal views of the same eligible content. Search and practical filters remain visible. The scene has a handful of selectable signals with text equivalents; clusters open an understandable list. Coarse location is enough for discovery unless a later task requires more.

Separate **Ready to join** from **Taking shape**. Explain recommendation relevance with specific permitted facts: “Matches your Saturday availability,” rather than “Perfect for you.” Preserve filters and scroll position after viewing a detail.

### Opportunity and commitment

Order: outcome → host/contextual qualification → date/place/access → contribution and conditions → plan/details. The primary action reflects state: “Review commitment,” “Join waitlist,” or “Open your Circle.”

An orbit may show a real threshold, accompanied by “4 of 6 required participants” and an explanation of what happens at the deadline. Distinguish interest from a booking or charged payment. Financial review stays sober: total, currency, fees, timing, cancellation, and approval. No celebratory animation over terms.

### Circle room

The top panel answers “Where, when, and what do I need?” A change banner outranks chat. Then people, host note, shared plan, bring list, and conversation. After completion, the header changes to reflection/memory while preserving useful history. Never expose private meeting details to an ineligible visitor.

### Create / Seed Studio

Start with a small number of meaningful seeds. Each produces a structured canvas: purpose, audience, format, place, timing, contribution, requirements. Show an adjacent participant preview on wide screens; use a separate preview step on phones. AI suggestions are editable and attributable, and drafts have explicit persistence status.

### Your World / profile

Make a compact identity header with avatar, name, optional pronouns, broad locality, and profile-visibility control. Follow with “My Passport,” “My Space,” and “Make it yours.” Place relevant capabilities and interests in readable sections. Show only a small curated sample of keepsakes rather than every metric and badge.

Provide “View as others” and per-section visibility. Public host qualifications remain separate from private personal style. A new user can skip character creation and use a simple avatar.

### Character studio

Large stable character stage above a thumb-friendly category rail. Categories: appearance, hair, outfits, accessories. Items show selected, owned, available, and incompatible states in words or accessible labels. Try-on is temporary until Save. Undo and Cancel remain obvious. Do not reset appearance when a user opens the store.

Standardize the character rig, pose, crop, and attachment anchors before generating many accessories. Flat raster cutouts can support a constrained first version; they are not a full deformable 3D character system. Inclusive body, skin, hair, cultural clothing, and mobility-aid options need coherent art and respectful review.

### My Space

The courtyard is a personal memory stage, not another chore system. Use five placement zones for the first implementation, expanding only after usability testing. Each object has a menu: Move, Rotate where supported, Remove, Read story. Tap-to-place and keyboard controls are peers to drag-and-drop. Include Undo, Reset arrangement with confirmation, and Save status.

An empty room begins with a free personal object, not a paywall. Objects should remain legible on a 360px screen. Keep essential controls outside the scene; no tiny embedded handles.

### Shop

Treat the store like a small curated design shop. Lead with one editorial collection, then useful categories and filters: Character, My Space, Themes; Owned, Earnable, Available. Show item provenance and access method before opening detail. Avoid a wall of currencies or rarity colors.

Detail provides large art, try-on/place preview, compatibility, contents, ownership rules, and actual price or earning requirement. A bundle lists every included item and handles previously owned pieces according to an approved policy. No random paid rewards. A room screenshot must not imply that unrelated pictured furniture is included.

### Passport

Default to a readable timeline. Offer the constellation as an expressive alternate view with an equivalent list. Each entry distinguishes participant reflection, host report, system record, and verified evidence. Progress categories tell a multidimensional story—learning, contribution, connection, creation—without ranking a person’s worth.

A memory can include an approved photo, reflection, place label, and selected people only with appropriate visibility and consent. Sharing previews exactly what will be public.

### Host overview and admin

Host overview prioritizes today’s Circle, unanswered requests, drafts, and operational issues. Earnings use explicit categories and assumptions. Admin prioritizes queue age, case context, evidence, permissioned actions, and auditability. Keep decorative character art out of consequential review decisions.

## 7. Season redesign: a world worth entering

### Season 01 — Awaken Your City

**A new chapter of real life.** Four districts of a single miniature neighborhood represent the chapters. Each district evolves visually as supported progress accumulates. Its shape is a metaphor, not a live map or automatic location record.

| Chapter | World | Meaningful action | Proposed keepsake | Example next action |
|---|---|---|---|---|
| Step Outside | Garden gate | Try an eligible activity or accessible equivalent | Small terracotta planter | Find an activity |
| Connect | Community table | Participate in an approved shared experience | Saffron lantern | Find a welcoming Circle |
| Contribute | Makers’ courtyard | Share a skill or help an approved activity | Woven maker’s tote | Explore ways to contribute |
| Create | Open-air pavilion | Help make an eligible opportunity happen | Ceramic arch / pavilion miniature | Shape an idea |

These are proposed reward associations, not active earning rules. Exact evidence, repeatability, abuse controls, access alternatives, and eligibility belong in the progression spec.

### Hub layout

1. Compact Season title, actual period if configured, archive access.
2. One expressive world scene occupying roughly a third of the initial phone viewport, not the entire page.
3. Current chapter and a single useful next action.
4. A four-step chapter summary with plain progress labels.
5. A limited selection of suitable quests, with time, accessibility, cost, and evidence expectations.
6. Upcoming keepsake preview with “See how to earn.”
7. A restrained Season+ invitation below free value.

List mode shows identical chapters, states, and actions. Scene interaction cannot be necessary for completion.

### Make the reward loop satisfying

A confirmed outcome can complete a chapter path, reveal a keepsake in a short tactile animation, and offer **Place in My Space**. “Later” is equally easy. The Passport memory persists whether or not the person opens the reward animation.

Use visible anticipation: a recognizable future object and clear requirement. Use cooperation: a real shared milestone with transparent calculation. Use personal choice: alternative eligible quests. Avoid mystery boxes, countdown theater, streak insurance, or paid shortcuts to Trust.

### Free and Season+

| Free Season | Proposed Season+ value |
|---|---|
| Core chapters and accessible quest choices | Additional themed creative content |
| Permanent memories and basic keepsakes | Richer cosmetic collection and room theme |
| Basic character/space expression | Expanded styling options |
| Transparent progress and archive | Extra editorial Trails or creator content where approved |
| Ordinary access to safety and support | Clearly specified partner perks when actually available |

Do not hide completed progress behind payment. Buying Season+ does not create attendance, qualification, proof, or a real-world outcome. Purchased content and activity-earned rewards need separate labels. Recurrence, duration, taxes, trial terms, cancellation, and post-expiry ownership must be specified before price UI becomes actionable.

### Required states

Not started; active; paused; no suitable local quests; accessible alternative requested; pending evidence; accepted; disputed; reward available; collected; already owned; unavailable entitlement; purchase pending; restore pending; subscription expired; Season ended; archive available.

No loss of personal history on expiry. A catch-up or late-entry policy must be visible before enrollment. Do not promise an unlimited earning window until policy is defined. Returning copy: “Your chapter is here when you are.”

### Season expansion

Later themes can shift the atmosphere without rebuilding the product: **Make Something Together**, **The Neighborhood Table**, **Small Adventures**, and locally authored city editions. Creator Seasons reuse the same chapter/evidence/access system rather than introducing incompatible mini-games.

## 8. Points, credits, money, and meaning

The user’s reference to points is addressed as a progression-design question; it does not establish a new currency.

| System | What it means | UI location | Never imply |
|---|---|---|---|
| Money | Actual prices, charges, refunds, earnings | Commitment, receipts, host earnings | Estimated earnings are guaranteed |
| Community/access credits | Approved funded or community access mechanism | Eligibility and access-credit detail | Cash equivalence, transfer, purchase, or cash-out without an approved model |
| Season progress | Progress toward specified objectives | Season and chapter | A spendable balance or proof by itself |
| Sparks / keepsakes | Collected memories and expressive objects | Passport, Collection, My Space | Financial value or verification |
| Contextual Trust | Defined qualification and evidence | Relevant opportunity/host context | Purchasable status or one universal social score |

Do not add five balances to the global header. Show the relevant system only at the decision that needs it. “Wallet” is inappropriate as a catch-all for money, points, memories, and credits.

## 9. Monetization mapped to interfaces

This maps the PR59 strategy into proposed frontend needs, not launch commitments or final commercial terms.

| Revenue / funding family | Frontend work | Dependency |
|---|---|---|
| Marketplace fees | Transparent contribution review, receipt, refund, host payout breakdown | Approved payment and settlement specification |
| Host Pro | Tool comparison, eligibility, plan management, contextual upgrade | Defined entitlements and commercial terms |
| Optional ARO Pro | Specific paid participant tools and comparison | Demonstrated value; free core preserved |
| Season+ | Free/paid comparison, purchase, restore, entitlement, archive behavior | Season and digital-commerce specs |
| Cosmetics and room themes | Catalog, try-on, ownership, orders, duplicate handling | Inventory and digital-commerce specs |
| Creator Seasons / revenue share | Creator studio, approval, attribution, statement | Creator and revenue-share model |
| Premium Trails / Expeditions | Itinerary, suitability, inclusions, reservation and support | Category, Trust, economics, operations |
| Sponsored quests | Clear sponsor label, funded benefit, data disclosure | Sponsor and progression rules |
| Sponsored access credits | Eligibility, application, allocation/use history | Credit/ledger/privacy rules |
| Business Beacons | Venue profile, verified offering, capacity controls | Venue governance and location rules |
| City / tourism programs | Program page, local discoveries, partner reporting | Aggregation and partner permissions |
| Employer / university programs | Organization access, member eligibility, privacy explanation | Institutional roles and disclosure rules |
| Event orchestration | Event brief, proposal, schedule, participant operations | Event-category and commercial scope |
| Disclosed affiliates | Link disclosure and external handoff | Approved offers and attribution policy |
| Physical keepsakes | Product, shipping, order, returns | Fulfillment and commercial operations |
| Aggregate insights | Partner reporting with methodology and privacy limits | Defined permitted aggregation |
| Platform / API services | Developer overview, access request, usage and billing | Separate platform product specification |

Commerce needs a full lifecycle: loading price, unavailable offer, review, pending, success, failed, cancelled, receipt, restore, refunded/revoked, support. Use server-authoritative entitlements. RevenueCat-style digital entitlement management and marketplace settlement remain separate systems. Existing Tonguee rates are not automatically ARO rates.

## 10. Layout, accessibility, and mobile rules

### Proposed design tokens

| Token family | Proposed rule |
|---|---|
| Spacing | 4px base; 8/12/16/24/32/48/64 rhythm |
| Phone gutters | 16px compact, 20px where width permits |
| Reading width | Approximately 60–70 characters for prose |
| Body | 16–18px; comfortable line height |
| Labels | Usually 14px; navigation/captions at least 12px; essential terms never hidden in tiny copy |
| Display | Approximately 32–40px phone; 48–64px wide, with content-aware wrapping |
| Touch | Prefer 48×48 CSS px; never below the existing 44×44 ARO control rule |
| Radius | Small controls 10–12px; panels 18–24px; scene frames selectively larger |
| Elevation | Low tactile separation; deeper shadow reserved for overlays |
| Color | Semantic roles, independently checked light/dark pairs |
| Focus | Clear high-contrast ring, unobscured by sticky UI |

These are proposed refinements to existing tokens, not permission to replace every component. Measure actual contrast; color names do not prove accessibility. W3C’s WCAG 2.2 AA target-size minimum is 24 CSS px with exceptions/spacing conditions; ARO’s 44–48px policy deliberately sets a higher product target. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

### Responsive behavior

- **Compact:** single decision column; bottom navigation; sheets for contained selections; full screens for complex tasks.
- **Medium:** add context only when it fits; avoid squeezing two phone layouts side by side.
- **Expanded:** navigation rail, main canvas, supporting context; make host workflows productive with tables where useful.
- Adapt to available window width and input, including split-screen and foldables. Android’s window-size guidance supports this principle; framework-specific classes do not mandate ARO’s web breakpoints. [Android adaptive guidance](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes)
- Support 320px/reflow scenarios, the existing 360/390/430/768/1440 checks, landscape, text zoom, and long translations.
- Use safe-area insets and resilient viewport units; test browser chrome and on-screen keyboard behavior.
- Avoid a sticky CTA plus bottom navigation plus floating toast covering the same content. Reserve space and prioritize one action region.
- On iPhone verify Safari, VoiceOver, dynamic browser chrome, keyboard, and home indicator. On Android verify Chrome, TalkBack, system back, keyboard, and gesture navigation. Desktop viewport emulation is supplementary evidence.

### Inclusive interaction

Semantic headings and controls; full keyboard operation; visible focus; meaningful status announcements; no hover-only content; no color-only states. Dialogs trap focus, Escape works where appropriate, and closing returns focus. Dragging has tap/keyboard alternatives. Complex maps and constellations have equivalent lists. Decorative art is hidden from assistive technology; informative art gets concise purpose-based alternatives.

Ask about accessibility requirements only when useful, and control their visibility. Offer calm display, reduced motion, sound off, and permission choices without penalizing participation. Avoid gender-locked style categories. Preserve EN/FR/ES parity and leave room for later RTL design.

## 11. Motion and sound

| Moment | Proposed behavior | Reduced-motion equivalent |
|---|---|---|
| Press / select | 120–180ms tactile response | Immediate state or brief fade |
| Sheet / route transition | 180–280ms, preserve orientation | Minimal fade or instant |
| Opportunity formation | One restrained orbit-to-Circle transition | Static labeled state |
| Item try-on | Fast crossfade without shifting character anchors | Instant replacement |
| Place object | Short settle into a valid zone | Instant placement + text status |
| Confirmed keepsake reveal | Optional 600–900ms reveal, replay on request | Static item with same action |
| Chapter completion | Path fills once after authoritative update | Updated progress label |
| Error / pending | Stable status, no shake loop | Same stable status |

These timings are design targets, subject to device testing. Animate transform/opacity where possible. No perpetual scene drift by default, no blocked navigation during delight, no particle shower on purchases. Haptics and sound are optional enhancements only where supported. Do not pretend a raster render is interactive 3D.

## 12. Asset production plan

### Reuse before multiplying

The current personalization work already provides a character, hat, bag, lantern, planter, Spark, courtyard, and Season artwork with optimized exports. Retain usable assets, standardize their camera and scale, and regenerate only where consistency or compositing requires it.

The proposed first production wave contains **36 art masters**. Reused masters count toward this total; responsive derivatives are not extra concepts.

| Family | Masters | Content / use |
|---|---:|---|
| Season world and districts | 5 | One cohesive world and four chapter scenes |
| Personal spaces | 3 | Courtyard plus two considered room/theme variants |
| Character bases | 4 | Initial inclusive representation set; not a complete identity range |
| Wearables | 8 | Coordinated headwear, bags, outerwear/accessories with fixed anchors |
| Decorative objects | 8 | Planters, lanterns, shelf objects, seating/art accents |
| Keepsakes | 4 | Four chapter-associated collectible objects |
| Editorial collection scenes | 4 | Shop/Season collections with readable negative space |
| **Total** | **36** | Produce in approved groups, not one unreviewed batch |

Additional representation and compatibility work follows the base-rig review. UI icons, progress indicators, focus states, diagrams, and text remain code/vector assets. Empty states can reuse the small illustration family instead of producing a new mascot pose for every error.

### Manifest per asset

ID; intended screen; purpose; original prompt; provenance; version; aspect ratio; focal point; transparent/opaque requirement; dimensions; derivative weights; alt/decorative treatment; theme behavior; safe crop; placement anchor; compatibility; approval state.

Transparent cutouts need genuine alpha, clean edges on both bone and dark plum, no baked checkerboard, no clipped shadow, no illegible micro-detail. Keep UI text out of the art. Shadows that interfere with compositing should be separated or consistently designed. Test accessories on every supported character base before calling them compatible.

### Generation prompts

**World master:** “Original ARO miniature neighborhood for a real-world opportunity app. Warm editorial atmosphere, bone, vermilion, moss, saffron, clay and ink. Four connected districts: welcoming garden, community table, makers’ courtyard, creative pavilion. Matte ceramic and paper materials, soft directional light, varied adult people, legible silhouettes at phone size, coherent isometric camera. No text, currency, interface, logos, neon, or recognizable borrowed mascot. Leave a quiet area for live UI.”

**Transparent item:** “Single [object] for ARO’s tactile personal world. Matte ceramic/woven material as appropriate, warm [approved colors], consistent three-quarter camera, entire object visible with safe padding, clean silhouette readable at 64px. Genuine transparent background. No text, watermark, checkerboard, unrelated props, or baked scene. Match the approved reference’s lighting and scale.”

**Wearable:** “One [item] designed for the supplied approved ARO character base. Preserve the reference camera, pose and head/body proportions. Separate item cutout aligned to the approved attachment anchor. Genuine alpha, no character body or background, no invented perspective. [Compatibility and occlusion constraints].”

**Collection scene:** “ARO [collection name], curated tactile still life with [exact included items]. Bone field, restrained soft shadows, moss/saffron/vermilion accents, adult premium warmth. Clear negative space for live heading. No extra saleable-looking objects, prices, labels, or text.”

Actual cutouts and character matching require visual inspection and iteration. A successful generation is an art candidate, not an automatically production-ready asset.

## 13. Engineering and performance architecture

Keep the current Next.js architecture and approved primitives. Do not introduce a game engine, WebGL dependency, UI library, or animation framework just to achieve this direction. Start with optimized images, semantic HTML, CSS, and small stateful components.

Shared proposed component families:

- Shell, compact/expressive/operational headers, navigation and breadcrumbs.
- OpportunitySummary, QualificationLabel, LogisticsGroup, ContributionBreakdown.
- CommitmentStatus, ThresholdSummary, CirclePreparation.
- CharacterStage, ItemTile, TryOnPanel, PlacementZone, CollectionFilter.
- SeasonWorld, ChapterSummary, QuestDetail, RewardPreview, EntitlementNotice.
- EvidenceLabel, MemoryCard, VisibilityControl.
- EmptyState, RecoveryState, PendingState, SaveStatus, accessible sheet/dialog.

Separate content/illustration from authoritative state. An Item record needs identity, compatibility, source, and ownership state. A Quest needs eligibility, evidence rules, progress state, and alternatives. A financial amount needs currency and minor units. A proof label needs its evidence class. Do not infer these from button text or image filenames.

Preview fixtures live behind explicit preview boundaries and never silently become production fallbacks. Runtime adapters resolve identity, catalog, ownership, progression, entitlements, and bookings from their approved sources. Consequential writes must be idempotent and reconcile authoritative state; optimistic decoration is acceptable only where reversible and truthful.

Use route-level loading, responsive images, explicit dimensions, deferred secondary scenes, and constrained prefetching. Avoid downloading a whole wardrobe on Home. Dynamic 3D is a later evaluated enhancement with an equivalent static experience.

Existing FV package ceilings remain binding wherever applicable: the proposed FV3 handoff preserves 210,000 gzip bytes of direct-route JS, 24,000 CSS bytes, initial phone/larger images of 400,000/600,000 bytes, and 30 cold-navigation static requests. Confirm exact adopted spec, measurement profile, and exceptions before applying these to a new package; this blueprint does not amend budgets.

For future field monitoring, target p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, segmented by mobile/desktop. Lab response timings are not field INP. [Web Vitals guidance](https://web.dev/articles/vitals)

## 14. Implementation roadmap

Design can explore future experiences now. Runtime rollout follows the approved capability, intent, opportunity, commitment, and proof dependencies. No calendar estimates are fabricated without team capacity and accepted scope.

| Package | Concrete deliverable | Exit evidence |
|---|---|---|
| A0 — Reconcile | Pinned route/state/source inventory; navigation decision; ownership map | Existing/proposed/live distinctions reviewed |
| A1 — Experience kit | Tokens, three header sizes, core controls, state patterns, light/dark compositions | Phone/desktop component review and accessibility checks |
| A2 — Participant story | Home → Explore → detail → commitment → Circle → recovery | One coherent synthetic click-through; accurate disclosures |
| A3 — Creator story | Seed → structured proposal → participant preview | Consistent fields, reversal/reset, eligibility copy |
| B1 — Your World | Consolidated profile, character, space, collection, Passport links | Try/save/cancel/undo and privacy compositions |
| B2 — Season flagship | Hub, four chapters, quest, reward, archive, free/Plus comparison | World/list parity; pending/empty/expired states |
| B3 — Shop lifecycle | Curated catalog, item preview, ownership and purchase-state designs | Clear item contents, compatibility, terms, recovery |
| A4 — Operational completeness | Settings, help, reporting, inbox, cancellations, host/admin patterns | All critical recovery paths designed |
| C1 — Runtime integration | Approved P1→P5 packages connect core flow | Domain, permission, persistence, end-to-end evidence |
| D1 — Progression | Outcome-linked Season and keepsakes | Evidence/eligibility/abuse/accessibility rules verified |
| D2 — Commerce | Approved digital offers, entitlements, marketplace surfaces | Authoritative prices/states, restore/refund/support journeys |
| E1 — Local ecosystem | Spaces, partner-funded access, creator programs | Real local demand and operational capability |
| E2 — Exploration | Trails, Expeditions, Travel, optional AR | Consent, accessibility, non-AR equivalent, measurable utility |

First implementation priority: **A0 → A1 → A2**, while B2 receives the flagship visual specification. This improves the whole product and makes the attractive Season lead into a dependable activity journey. Do not start by generating hundreds of disconnected objects.

### First ten backlog items

1. Resolve five-tab navigation and consolidate personal entry points.
2. Establish compact, expressive, and operational page headers.
3. Increase undersized labels and correct mobile spacing.
4. Make opportunity status and commitment consequences consistent across routes.
5. Design confirmed, pending, cancelled, and failed participant paths.
6. Upgrade Season from a hero plus rows to a world, chapters, quests, and archive.
7. Unify try-on, ownership, Collection, and placement semantics.
8. Add complete privacy and evidence labels to Profile/Passport.
9. Complete restore, expiry, unavailable-offer, and purchase-recovery designs.
10. Verify the flagship journey on actual iPhone and Android devices, including assistive technology.

Each package names exact current files after route reconciliation, exclusive ownership, affected shared components, allowed behavior, non-goals, state transitions, rollback, and acceptance evidence. Do not reuse historical src/pages paths blindly after the Next.js migration.

## 15. Definition of design quality

### Weighted critique rubric

| Dimension | Weight | What a strong result demonstrates |
|---|---:|---|
| Task clarity and journey continuity | 25 | People know the next action and its consequence |
| Original ARO identity | 20 | Ownable, coherent craft across scene and utility screens |
| Accessibility and inclusion | 20 | Equivalent usable journeys across abilities and preferences |
| Responsive interaction | 15 | Excellent phone use and purposeful wider layouts |
| Performance and resilience | 10 | Fast enough on constrained devices; recoverable states |
| Economic and state clarity | 10 | Money, ownership, progress, proof, and uncertainty are understandable |

Use scores to discuss trade-offs, never to average away a critical accessibility, security, Trust, or money failure. Award readiness is a critique standard, not a release label.

### Proposed usability targets

Before treating the new hierarchy as validated, test with first-time participants, returning members, hosts, people with accessibility needs, and people who prefer less playful interfaces. Include varied ages and levels of technical confidence.

Target at least 80% unassisted completion for defined primary tasks in formative testing; report sample size and failures, not population certainty. Participants should be able to explain commitment consequences, distinguish free from paid Season value, identify whether an item is owned or merely previewed, and locate cancellation/support without coaching. Revise the design when that understanding fails even if the visual score is high.

### Evidence bundle per package

Pinned implementation SHA; requirement-to-evidence matrix; screenshots of key states in both themes; responsive and long-copy checks; keyboard/focus/reduced-motion checks; screen-reader evidence appropriate to platform; physical-device findings; actual asset/bundle measurements; scoped automated tests; network/state verification where relevant; remaining limitations.

Track useful outcomes: completed activities, attendance reliability, return to meaningful participation, successful creation, task completion, and avoidable support contacts. Track paid conversion only alongside clarity, refund/support signals, and user value. Passive app opens and time spent scrolling are not the north star.

## 16. Decisions proposed now and decisions still needed

Recommended design defaults: the five-tab consumer shell; Your World personal hub; separate Saved/Collection/Passport concepts; four-chapter Season world with list alternative; optional personalization; 48px preferred controls; editorial/tactile adult art; no global points wallet; small curated shop; free meaningful progression.

These can guide concrete design packages now. Actual pricing, subscription period, post-expiry entitlement, reward rules, credit economics, revenue share, new category operations, precise location, and AR each require their relevant product/domain decision. They do not block the visual blueprint.

The immediate review artifact should show **one complete story**, not a gallery of disconnected screens: a person finds a welcoming activity, understands the commitment, participates, records a memory, receives a legitimate keepsake, places it in their world, and sees the next chapter.

## 17. Enhanced master execution prompt

> Act as ARO’s principal product architect, creative director, and frontend design engineer. Build a coherent, exceptionally crafted Human Opportunity Network that helps people learn, earn, connect, create, and participate in real life.
>
> Begin by reading the current governing documents, experience system, Seasons strategy, monetization handoff, active package specs, controller state, and relevant source files. Pin the actual branch and revision. Reconcile old handoffs with current architecture. State what is implemented, preview-only, proposed, and gated. Do not invent a completion percentage.
>
> Use this blueprint as proposed direction, not automatic runtime authority. Turn the selected wave into a concrete reviewable package with exact routes, files, ownership, states, dependencies, acceptance criteria, and rollback. Continue authorized reversible work without repeatedly asking for confirmation. Surface only decisions that materially block the affected scope, with the exact reason.
>
> Design one connected journey: intent → opportunity → understandable commitment → Circle → real-world outcome → Passport memory → optional Season progress and personal expression. Preserve Tonguee as the first vertical and its approved brand assets.
>
> Establish a mobile-first system with clear hierarchy, generous readable type, excellent thumb access, responsive layouts, semantic controls, visible focus, light/dark parity, reduced motion, EN/FR/ES parity, and complete loading/empty/error/pending/recovery states. Verify actual iPhone and Android behavior when claiming device acceptance. Use wider screens for context and productivity rather than stretched cards.
>
> Art-direct an original ARO world: bone, ink, vermilion, moss, saffron, clay, and plum; editorial invitations and precise sans-serif decisions; tactile miniature places; inclusive adult characters; restrained purposeful motion. Learn from Duolingo’s craft and feedback without copying its mascot, artwork, or retention mechanics. Keep operational and financial surfaces calm.
>
> Extend the necessary pages, including Home, Explore/World, opportunity and commitment states, Circle, Create, host operations, Profile/Your World, Character, My Space, Collection, Shop, item preview, Season hub/chapter/quest/reward/archive, subscription management, access funding, Passport, Saved, settings, support, and later partner surfaces. Choose appropriate tabs/sheets/details rather than multiplying routes without purpose.
>
> Make Season 01 “Awaken Your City” the flagship: four connected chapters, meaningful optional quests, understandable progress, desirable keepsakes, accessible alternatives, world/list parity, permanent memories, and a transparent free/Season+ comparison. Buying never creates Trust, evidence, or attendance. Keep money, access credits, Season progress, Sparks, and qualification distinct.
>
> Generate art only against an asset manifest. Reuse approved assets, establish camera/lighting/material consistency, verify genuine alpha for cutouts, preserve attachment anchors, optimize derivatives, and keep text and exact information in code. Generated mockups are design references, not implementation evidence.
>
> Implement the smallest coherent approved package using existing architecture and primitives. Keep synthetic fixtures isolated from live services. Respect authoritative prices, entitlements, privacy, Trust, and package gates. Avoid unnecessary dependencies, endless feeds, punitive streaks, fake urgency, paid randomness, generic dashboard clutter, and decorative animation that slows the task.
>
> Verify the complete changed journey, record evidence and limitations, and update the appropriate handoff. Report what changed, why it improves the user’s task, what was tested, and what remains. The result must be attractive, understandable, useful, and worthy of returning to because real life becomes richer.

---

**Delivery note:** This turn produced the proposed master plan and one original creative-direction image. It did not alter application runtime, implement these new screen families, validate pricing, or change release status.
