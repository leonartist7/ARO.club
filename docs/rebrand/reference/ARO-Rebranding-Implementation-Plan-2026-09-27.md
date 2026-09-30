# ARO — Complete Rebranding & Onboarding Implementation Plan

> **Historical source, 27 September 2026.** This preserves the founder-supplied planning document; it is not the current release checklist. The founder later prioritized an **English and light-mode first release**, with dark-mode and French/Spanish refinement scheduled after that initial scope. Preserve existing functionality and all privacy, Trust, security, payment and store gates. Read the [current state](../../../ARO_CURRENT_STATE.md) and [rebrand implementation ledger](../IMPLEMENTATION-LEDGER-20260928.md) before acting on this plan. The original attachment SHA-256 is `9E56B7AE7534C74E3C7993955E92658A2D4C4279AC974C3A8ABA320A213BC264`; the body below is retained as supplied.

**Version 1.0 · 27 September 2026 · Implementation planning document**

**Direction:** Orange-led, optimistic and human. Expressive modern typography. An open O with one person-shaped dot. A clear invitation to **Learn · Earn · Connect**.

**Deliverable status:** Plan prepared; no application code, repository specifications, runtime behavior or deployments changed by this document. The founder has requested the rebrand direction and this implementation plan. Package adoption and verification must follow the repository’s delivery contract; do not ask the founder to repeat the creative brief.

## 1. The decision

Rebrand ARO as a warm, contemporary place where people turn curiosity and skills into real opportunities. Keep the inviting atmosphere of the current product, but replace its heavy editorial treatment and abstract setup language with stronger color, more human scenes, clearer verbs and a much shorter path to usefulness.

The brand should feel **confident, approachable and imaginative**. It should have enough character to be recognizable without making booking, money or identity feel like a game.

The public promise is **“Life opens up.”** The practical explanation is **“Discover opportunities. Share your skills. Meet your people.”** The benefit trio is **“Learn · Earn · Connect.”** When users need to act, use **“Find a class”**, **“Teach a skill”** and **“Organize a gathering.”** “Earn” communicates a benefit; it is not a sufficient name for a teaching workflow.

One app, one identity, two task modes: **Explore** and **Host**. A person can teach guitar and take a language class without creating a second account. A separate teacher app would not solve learner demand. Useful local inventory, clear outcomes, suitable times, trustworthy hosts and transparent prices are the practical incentives to learn.

### What this plan supersedes

| Earlier direction | Direction for this implementation |
|---|---|
| Yellow as the principal brand color | Orange leads; yellow adds discovery, warmth and emphasis |
| Sage/moss as the principal supporting green | Clear leaf green, with a darker accessible text variant |
| DM Serif Display / editorial serif as the default ARO heading font | Polymath Display for expressive headings, subject to licensed assets; Manrope for interface text |
| Multiple explored logos, including a squared O | Develop the circular open-O and detached-dot direction in the selected hero image |
| “Learn · Share · Gather” as universal public messaging | “Learn · Earn · Connect” for benefits; concrete verbs for tasks; preserve domain identifiers until explicitly migrated |
| An extensive profile before discovery | Three brief introduction scenes, name/age, relevant preferences, then a useful result |
| One permanent learner or teacher identity | Starting preference and switchable modes, separate from permissions |

This supersession is a proposed update to the project’s design doctrine, not a claim that the canonical repository files already changed. Preserve Tonguee’s vertical identity and Coco where they have a specific product role.

## 2. Evidence, reference and scope

### Visual reference

The selected cover supplied with this request is the reference: orange field, ivory ARO wordmark, circular O with an upper-right opening and detached dot, “Life opens up.”, adult characters with guitar/camera/ceramics, and a yellow portal. Its approved qualities are color leadership, warmth, scale, human subject matter and the open-circle idea. A generated image does not establish exact font outlines, SVG geometry, accessible text contrast or production asset quality.

The original Home, World and Create screenshots establish these visible issues:

- Home gives substantial height to illustration and synthetic progress before the next useful action.
- World has an appealing sense of place, but counts and formation language need more explanation than a newcomer should need.
- Create’s “What wants a little more room in the world?” is evocative but does not clearly explain whether a person is requesting, teaching or organizing.
- Tiny spaced uppercase labels, muted text and repeated preview explanations compete with the main message.
- The central navigation action is inconsistent in the supplied screenshots: one shows “WORLD” below the plus, another “CREATE.”

These are visual findings, not claims of measured usability failure.

### Current repository snapshot

Read-only inspection pinned to `leonartist7/ARO.club`, `main` commit **e1ad70529d292879b5f1f29915df18fbf63f5948**, retrieved 27 September 2026. This commit merged PR #47’s F7 documentation amendment. A merged amendment is not evidence that F7 execution, production auth or downstream packages passed.

Reviewed operating/design context: `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_CURRENT_STATE.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_FRONTEND_VISUAL_CONTINUATION_PLAN.md`. Inspected the repository tree and relevant portions of the files listed below. Also reconciled the earlier *ARO Frontend Master Blueprint* and *ARO Onboarding Master Brief*. This was a targeted planning audit, not a running-app or complete repository audit. No build, browser session, payment flow or database test was run for this planning task.

### Concrete implementation findings

| Current evidence | Implication |
|---|---|
| `tailwind.config.js`: Manrope sans, DM Serif Display display; bone/ink/moss and primary/secondary scales | Introduce semantic tokens and map existing usages deliberately |
| `src/index.css`: external Google Fonts import; every h1–h6 receives the display face | Split expressive headings from operational headings; replace font delivery deliberately |
| `src/components/brand/AroMark.jsx`: layered circular spans and multiple dots | Replace with one controlled SVG mark and wordmark, not another CSS approximation |
| `src/components/app/AppShell.jsx`: uppercase 10–11px labels; shell copy selects `.en`; static search/notification representations | Increase label readability, use locale context, keep unavailable features truthful |
| `src/views/AppHomePage.jsx`: tall hero; hard-coded 62% example progression | Prioritize discovery; remove synthetic progress from live views |
| `src/views/AppWorldPage.jsx`: fixed example positions and counts over miniature artwork | Preserve as clearly labeled illustration; do not imply live map or user locations |
| `src/views/AppCreatePage.jsx`: `learn`, `share`, `gather` local modes | Change displayed task language without blindly changing identifiers or meaning |
| `StudentOnboarding.jsx`: language/interests swipe sequences, avatar and daily-goal setup; a local welcome bonus | Replace front-loaded setup; do not silently turn demonstration rewards into real incentives |
| `TeacherOnboarding.jsx`: six-step setup; profile write sets `user_type: 'teacher'`; application draft path | Visual refresh and account-model migration are separate work; preserve reviewed application/publish gates |
| `src/app/layout.tsx`: old theme color and absolute `aro.club` social images | Update metadata and verify the actual approved origin and asset URLs |
| `package.json`: Next.js, React, Tailwind, existing UI/motion dependencies and validation scripts | Reuse the stack; no new design framework is needed |

The teacher draft helper also assigns `agreed_to_standards: true` and language proficiency `native`. Future onboarding integration must trace these to actual explicit choices or governed requirements. Do not copy such assignments into the new flow without checking their meaning and authorization.

## 3. Brand foundations

### Orange and yellow

Orange is the main signature because it gives ARO a clear, active presence while retaining warmth. This is an art-direction decision for this project, not a universal psychological law. Yellow provides a bright complementary surface and a useful visual echo of the opening/portal motif. If both dominate every screen, their hierarchy disappears.

Use orange boldly in acquisition artwork, the cover, selected onboarding scenes and major brand moments. Use ivory for most reading and task surfaces. In normal application views, orange should identify meaningful actions rather than cover the whole page. Yellow should highlight possibility, selections and a small celebration; it should not look like a warning everywhere.

Do not assign “learners are yellow, teachers are orange” as an identity rule. People can be both, and action color should remain stable across modes.

### Proposed color tokens

| Token | Light value | Purpose |
|---|---|---|
| `brand.orange` | `#F05A28` | Brand fields, artwork, decorative emphasis |
| `action.primary` | `#C94320` | Filled primary action with white label |
| `brand.yellow` | `#FFD447` | Discovery emphasis and dark-text highlight surfaces |
| `surface.canvas` | `#FFF8EE` | Warm ivory page background |
| `surface.card` | `#FFFFFF` | Raised reading/form surfaces |
| `text.primary` | `#252420` | Main text |
| `text.secondary` | `#6B635B` | Supporting text on ivory/white |
| `brand.green` | `#27834A` | Supporting illustration and filled accents |
| `text.green` | `#206D3D` | Green text on light backgrounds |
| `border.subtle` | `#DDD2C5` | Decorative dividers only |
| `border.control` | `#8B7F73` | Form boundary where needed for recognition |
| `focus` | `#252420` | Visible light-theme focus ring with contrasting offset |

Error, warning, information and success remain separate semantic tokens. Do not replace every old green with the brand green or every warning amber with brand yellow. Verify every component’s states on its actual background.

### Contrast already calculated for this plan

WCAG relative-luminance calculations for opaque colors:

| Foreground / background | Ratio | Allowed use |
|---|---:|---|
| White / action orange `#C94320` | 4.88:1 | Normal button text |
| White / brand orange `#F05A28` | 3.39:1 | Large text only; not ordinary labels |
| Ivory / brand orange | 3.21:1 | Large display text only |
| Charcoal / brand orange | 4.58:1 | Normal text; keep full opacity |
| Charcoal / yellow | 10.92:1 | Normal text |
| Secondary text / ivory | 5.59:1 | Supporting text |
| Action orange / ivory | 4.62:1 | Normal link text; add underline where needed |
| Leaf green / ivory | 4.49:1 | Fails 4.5:1 normal-text threshold; use darker text green |
| White / leaf green | 4.74:1 | Normal text on a solid green fill |

The logo has different contrast requirements from ordinary text, but marketing subtitles and product controls do not inherit a logo exemption. Do not copy small ivory text from a generated orange hero into the interface. Use charcoal for small text or put it on a darker orange panel. WCAG thresholds must not be rounded up to a pass. [3]

### Dark theme

Proposed canvas `#1E201C`, card `#292C25`, main text `#FFF8EE`, supporting text `#C9C5BA`. Keep `#C94320` with white for primary buttons; use yellow or a lighter orange for text links rather than dark orange on dark surfaces. Use ivory focus rings with a dark offset. Adapt borders, hover, selected, disabled, skeleton and error treatments explicitly. Preserve `ThemeContext` and Tailwind `dark:` conventions. All dark-theme combinations remain implementation validation items, not certified by the light-theme table above.

## 4. Typography: distinctive, friendly, readable

Use **Polymath Display** for short expressive headings and **Manrope** for interface text. This is the middle ground between a luxury editorial brand and a childish rounded app. Polymath supplies character; Manrope handles decisions and longer reading. The foundry documents Polymath’s Display/Text families and weights; it does not mean ARO already owns a deployment license. [1]

Before shipping Polymath, confirm the exact licensed files and permitted web/app use. Do not ship demo fonts, obtain paid files without authorization, or assume a raster concept contains that exact typeface. If licensed assets are unavailable, use **Manrope 700** for headings as a deliberate interim implementation. Do not block token, copy or component work on a purchase. Pin the Manrope asset version and preserve its applicable license; verify against the designer’s official distribution. [2]

| Role | Font / weight | Mobile | Wider screens | Leading |
|---|---|---:|---:|---:|
| Campaign headline | Polymath Display 600–700 | 40–48px | 64–88px | 1.04–1.1 |
| Onboarding / page invitation | Polymath Display 600 | 32–36px | 40–48px | 1.1–1.15 |
| Card title | Manrope 700 | 20–24px | 24–28px | 1.25 |
| Operational heading | Manrope 700 | 24–28px | 28–32px | 1.2 |
| Body | Manrope 400–500 | 16–18px | 16–18px | 1.5–1.6 |
| Button / field label | Manrope 600–700 | 16px | 16px | 1.25–1.4 |
| Secondary metadata | Manrope 500 | 14px | 14px | 1.4 |
| Bottom navigation | Manrope 600 | 12–13px | 13–14px | 1.25 |

Use sentence case. Restrict widely spaced uppercase text to occasional nonessential eyebrows. Prices, dates and participant requirements must never become tiny decorative text. Use tabular numerals for aligned money and counts. Set weights that exist; avoid synthetic bold.

Remove the global assumption that every heading is a display heading. Keep semantic h1–h6 structure independent of style. Implement reusable type roles rather than scattered arbitrary sizes. Use fluid sizing with sensible caps, allow translation expansion, and avoid forced line breaks that only fit the reference image.

Font delivery: licensed WOFF2 assets through the existing Next.js font approach or scoped `@font-face`, `font-display: swap`, limited loaded weights, no duplicate Google import. Measure fallback layout shift. Include French/Spanish accents and names from supported scripts; do not subset away necessary glyphs.

## 5. Logo system and visual language

### Master direction: the open circle

The O represents a circle of opportunity. The dot represents a person participating in and shaping that circle. The opening represents room for someone or something new. The philosophy should help the mark stay coherent; users should not need to understand a story before recognizing ARO.

Develop the circular O visible in the selected cover. Place a single detached dot in its upper-right opening. Keep a deliberate gap so it reads as an open circle with a participant, not a power button, satellite, copyright mark or loading spinner. Balance A and R optically with the O. Do not add three heads, arrowheads or rotational symmetry resembling recycling.

Production requirements:

- Vector wordmark and symbol, optically corrected rather than traced mechanically from pixels.
- Monochrome master first; charcoal/ivory and ivory/orange variants. Yellow is an optional contextual portal accent, not a mandatory multicolor logo.
- Test symbol at 16, 24, 32 and 48px. A small-size variant may enlarge the gap/dot slightly.
- Starting clear space: one dot diameter around the mark; verify the final geometry before freezing this rule.
- App icon centered inside platform safe areas; no tiny tagline.
- One accessible name for a linked logo; decorative duplicates hidden from assistive technology.
- Originality/similarity review before public finalization. This plan does not certify trademark availability or unique ownership of circle-and-dot geometry.

Deliver `aro-wordmark.svg`, `aro-symbol.svg`, monochrome/reversed variants, favicon/app-icon sizes and an asset manifest. Names here are proposed, not existing files. Keep a single source of geometry in `AroMark` or its replacement, not different marks across headers and emails.

### Image and layout rules

Use the yellow open portal as a composition device at important moments. It may frame a person, a first outcome or a shared experience. It should not appear as a spinner on every screen.

Adult characters should look warm, capable and varied. Favor believable gestures, matte materials, natural light and real activities. Preserve the inviting handcrafted feeling; remove doll-like proportions, generic floating objects, glossy plastic and excessive 3D ornament.

Use illustration for possibility and onboarding. Use actual host/place photography for booking evidence. A generated character must not impersonate a host, attendee, review or verified person.

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px. Mobile gutters 20px where feasible, 16px on narrow screens. Controls approximately 48px high; minimum touch area 44px. Card radius 20–24px, control radius 12–16px; pills reserved for tags and compact filters. Limit shadows to one subtle elevation style and one overlay style. Maintain enough density for actual choices to appear without excessive scrolling.

Motion: 160–220ms control feedback, 240–360ms view changes, at most one short celebration after meaningful completion. No auto-advancing introduction, looping pulses demanding attention or mandatory swipes. Reduced-motion users receive the same information instantly.

## 6. Information architecture and voice

### Navigation migration

Target consumer shell from the earlier blueprint: **Home · Explore · Create · Messages · Saved**. World becomes the spatial view inside Explore; retain its distinctive miniature/map presentation alongside a useful list. Insights, Passport, collection and account settings move under the profile/Your World area with clear entry points.

This is a target, not permission to add dead tabs. Implement a new shell only when each destination has a defined working or explicitly bounded preview state. Until then, retain existing routes with consistent labels and introduce changes in one shell package. Keep `/app/world` links working through an approved alias/redirect; do not break saved links merely to rename a tab.

A visible **Explore / Host** switch changes tools, not authorization. Host mode focuses on Overview, Opportunities, People, Earnings and Tools, only as their governed capabilities become available. Earnings is not a synthetic balance.

### Copy rules

Lead with an outcome, then explain the next action. Save philosophy for short invitations and brand storytelling. Avoid exposing backend package names, engine mechanics or implementation caveats in ordinary product copy.

| Current / ambiguous wording | Proposed visible wording |
|---|---|
| “What wants a little more room in the world?” | “What would you like to make happen?” |
| Learn on Create | “Request a class” |
| Share on Create | “Teach a skill” |
| Gather on Create | “Organize a gathering” |
| Open Seed Studio | “Start an idea” or “Create an opportunity,” matching actual behavior |
| “A possible shape” | “Your idea, taking shape” |
| “3/10 — minimum 6” | “3 joined · 6 needed to confirm · 10 places total,” only if those are actual commitments |
| Generic Continue at the last step | “Find classes” / “Build my class draft” |
| “Welcome Teacher!” | “What would you like to teach?” |
| “Earn from what you know” | “Turn a skill into a class,” with earning conditions nearby |

Keep preview disclosure clear and prominent while reducing repetition. Suggested global disclosure: **“Interactive preview · Example people and opportunities. No bookings or payments.”** Maintain additional contextual labels where a count, balance or action would otherwise mislead. Never remove required disclosures simply for aesthetic cleanliness.

“Learn · Earn · Connect” belongs on covers and benefit summaries. “Find a class · Teach a skill · Organize a gathering” belongs where a user chooses a task. Existing `learn/share/gather` identifiers do not automatically map one-to-one to every marketing term.

## 7. Onboarding: the priority implementation

### The journey

Three opening scenes communicate value and direction. They are skippable, brief, replayable and never auto-advance. Then ask for required name and age, coarse city, and relevant interests/skills. Deliver a useful first result before optional profile decoration.

A visible Skip skips the introduction, not required eligibility fields. A person can still browse public information without pretending to have completed required account setup. Existing users should never be forced through new onboarding after a rebrand; offer a lightweight optional “What’s new” explanation instead.

Contextual help belongs beside the task it explains, rather than making the opening tutorial teach every feature. [4]

### Opening scenes: exact proposed copy

| Screen | Headline / support | Interaction | Main action |
|---|---|---|---|
| 1 · Learn | **“Your next ‘I did that’ starts here.”** / “Find local classes and experiences with people who love what they do.” | Optional topic tiles change a warm illustration; preserve any selection | “Show me more” |
| 2 · Earn | **“Someone would love to learn what you know.”** / Preview: “Explore how you could turn a skill into a paid class.” | Optional skill example reveals an example class title; no income counter | “Find my starting point” |
| 3 · Connect and choose | **“What would you like to do first?”** / “One account. You can switch anytime.” | Find a class / Teach a skill; secondary Explore both | Continue using the chosen path |

On scene 3, supporting card copy is **“Learn something new and meet people nearby”** and **“Create a class and earn from bookings.”** Use the latter only in an approved live earning context; preview uses **“Explore creating a paid class.”** Explain eligibility and actual settlement timing in host setup, without promising earnings or implying booking always equals immediate payment.

Visually, show one shared world developing across the three scenes: someone learning, someone contributing, then people meeting around an activity. Keep the headline, illustration and action visible at common phone sizes; permit vertical scrolling and short-viewport layouts. Do not crop important text to force everything into one viewport.

### Setup after the introduction

| Step | Required input | Design / behavior |
|---|---|---|
| Name and age | Preferred/display name and age as requested by founder | Visible labels; private age; explain actual purpose; Unicode names; trim whitespace; no forced surname |
| City | Coarse city or supported area | Manual search first; optional contextual location assistance, never forced permission |
| Learner interests | Editable topics, no arbitrary three-topic quota | Compact selectable tiles; “I’m open to ideas” permitted |
| Host starting skill | One skill and an outcome a beginner could achieve | Ordinary text/selection; evidence and price follow later |
| Both | Start with learner discovery and visible host shortcut | Preserve both preference; no double-length onboarding |
| First useful result | Relevant classes or editable class draft | Show why it fits and the next action; do not substitute an avatar screen |

Name and age are mandatory for completed setup. Before persisting age, the runtime package must define the minimum age, purpose, retention, correction/deletion, and whether an age band or date of birth is necessary. Do not invent an 18+ rule in UI without reconciling the governing adult/eligibility policy; do not describe self-declaration as verification. Do not publish age by default or send it in analytics. Static previews should use example input without durable personal-data capture.

Authentication should occur when the governed flow needs an account, such as saving a draft or booking. Preserve the intended class/draft and return destination across authentication. If the existing approved auth contract requires an earlier checkpoint, keep that checkpoint until the package changes it. Do not invent local persistence of personal information to simulate a working account.

### Progressive profile and hosting

Defer avatar, biography for learners, daily goals, interests beyond the first useful set, character customization, shop and Season choices. Let people discover why these features matter after they experience value.

Host sequence: **skill → learner outcome → editable class draft → relevant host profile/evidence → format/time/place/price → review → eligible publication**. The platform must continue to enforce verification and publishing rules on the server. A teaching preference grants no credentials, publish permission or payout access.

Do not require a learner to buy a class before being allowed to teach. Do not give guaranteed booking claims, fake demand counts or fabricated income examples as motivation. If introductory offers are later used, define who funds them and the true price before release.

### Required states and continuity

- Skip, back and edit work without erasing previous choices.
- Refresh/resume behavior is defined separately for nonpersistent preview and approved runtime.
- Deep-linked class/invitation returns to its original context after setup.
- Duplicate taps do not create duplicate submissions; retry preserves input.
- Loading communicates the real action; form errors appear beside fields and in a useful summary.
- Location denial still permits city entry.
- No local supply shows honest alternatives, another area, or a governed request path; no fictional inventory.
- Age/eligibility failure explains available next steps and does not expose private data.
- Host review pending, needs changes, approved and rejected are distinct states.
- Returning learner/host can switch tasks without restarting onboarding.
- Completion means the relevant step succeeded, not merely that the animation ended.

## 8. Redesign of the current main pages

### Home

Keep one expressive opening, but shorten the hero enough that the actual opportunity and primary action arrive early. Use a human activity image, an outcome-led headline and readable logistics. Put “Find a class” within immediate reach and a secondary “Teach a skill” entry beside or below it.

For a first-time learner, prioritize one suitable opportunity, a small set of interests and a clear next action. For a returning participant, an upcoming booking or useful continuation can take precedence. For a host, expose the active draft or upcoming session through Host mode without flooding learner Home with earnings tools.

Remove the hard-coded 62% Season progress from live Home. In a preview, label it as an example and position it below the core task. Do not give a first-time person a fictional personal history. Keep the future Season/Passport return loop for its governed package.

### Explore / World

Preserve the sense of place. Add a clear “List / World” control, coarse city context and outcome-oriented filters. List and spatial view must show equivalent opportunities and state labels. Keyboard users must be able to select a result without moving a map.

A forming experience needs plain text about what is missing and what a click means. Interest, conditional commitment, paid booking and attendance are different counts. Do not use one “people” number for all of them. A static city illustration remains a preview and is not a location service.

Do not make the image so tall that users must scroll through a decorative city before understanding one result. Avoid continuous marker pinging. Put state and action close to the selected result.

### Create

Lead with **“What would you like to make happen?”** Present three task cards: Request a class, Teach a skill, Organize a gathering. Explain each in one sentence. The selected choice opens a small relevant input and immediately useful example/proposal structure.

Keep the idea-forming visual, but bring actual fields and the next action above explanatory philosophy. A host draft should show the participant outcome, not primarily abstract “people/place/time” bubbles. Preview CTA: **“Preview this idea.”** Runtime CTA: **“Save draft”** or **“Submit for review,”** only when that operation exists.

The central plus must always have a stable “Create” label and destination. Do not make the same plus return to World without a clear separate back control.

## 9. Whole-project coverage

All ARO surfaces receive shared tokens, accessible typography and coherent copy. Not every surface receives a new illustration or a new workflow.

| Surface family | Rebranding work | Behavior boundary |
|---|---|---|
| Public landing, city pages, campaign cover | New wordmark, orange/yellow art, useful promise, two acquisition paths | Match available launch geography and inventory |
| Sign-in, registration, recovery, invitation | Calm Manrope forms, same mark, preserved destination | Preserve approved auth/security behavior |
| Onboarding | Shared introduction and branch-specific setup | Separate preview from durable identity/data migration |
| Home, Explore/World, search, filters | Shorter hierarchy, clear results/state, accessible spatial alternative | No new demand/location authority |
| Opportunity, host and venue detail | Outcome, host evidence, date/place, price, eligibility, terms | No fabricated reviews, verification or availability |
| Commitment, checkout, confirmation, cancellation | Restrained art, exact state language, readable breakdowns | Governing money/refund/booking rules remain authoritative |
| Circles, messages, notifications | Human tone, clear unread/status, straightforward actions | No new outreach or notification service implied |
| Create, proposal, host application | Task labels, simple draft stages, explicit review | Preserve publish trigger and human review |
| Host operations, earnings, people | Manrope-led operational layouts, status and actual amounts | No projected values presented as balance |
| Profile, Passport, Insights, Library, Saved | Consolidate destinations, readable memories, edit/privacy controls | Proof and Trust stay contextual and evidence-based |
| Character, Space, collection, Shop, Season | Adapt palette and type; optional after core onboarding | Future/preview capabilities do not become live through styling |
| Settings, privacy, safety, help, support | Plain labels, robust forms, calm status/error states | Preserve consent, retention and support responsibilities |
| Admin / review tools | Shared legibility and components; minimal decoration | No authorization changes |
| Email, receipts, social cards, favicon, metadata | Matching mark/colors, system-safe email typography, verified links | Receipts and money wording reflect actual transactions |
| Tonguee / Coco surfaces | ARO shell consistency with deliberate vertical identity | Do not erase language-specific assets or rules |

Inventory every actual route before execution and mark it **unchanged / token migration / layout change / behavior change / future only**. A route existing in the tree does not prove its behavior is live.

## 10. Engineering map

### Existing paths to start from

| Files | Planned responsibility |
|---|---|
| `tailwind.config.js`, `src/index.css` | Semantic token mapping, type roles, theme, legacy class audit |
| `src/app/layout.tsx` | Font delivery, metadata, theme color, social assets, language behavior review |
| `src/components/brand/AroMark.jsx` | SVG mark and wordmark integration |
| `src/components/app/AppShell.jsx`, `AppPrimitives.jsx`, `AppImage.jsx` | Navigation, shared component states, image delivery |
| `src/components/layout/Header.jsx`, `Footer.jsx`, `Layout.jsx` | Public shell alignment |
| `src/views/HomePage.jsx`, `AppHomePage.jsx`, `AppWorldPage.jsx`, `AppCreatePage.jsx` | Public/core page redesign |
| `src/views/StudentOnboarding.jsx`, `TeacherOnboarding.jsx` | Existing entry points; preserve vertical compatibility |
| `src/app/(public)/onboarding/student/page.tsx`, `.../teacher/page.tsx` | Route compatibility and new orchestration entry |
| `src/i18n/translations.js`, `src/i18n/fv1/*.js` | Centralized EN/FR/ES copy; remove new hard-coded strings |
| `src/data/aroApp.js`, `src/data/aroMedia.js` | Navigation/fixture/asset mapping, subject to ownership checks |
| `src/contexts/ThemeContext.jsx` | Reuse theme mechanism |
| `src/store/usePlayerStore.js` | Inspect before changing onboarding/progress semantics; no blind reuse of rewards |

Proposed additions, only after confirming local conventions: `src/components/onboarding/`, a shared onboarding view/state machine, an onboarding translation module, `public/brand/`, `public/fonts/` and an asset manifest. Do not create parallel component systems where suitable primitives already exist.

### Migration method

1. Inventory old colors, font declarations, raw hex values, hard-coded copy, assets and states.
2. Introduce semantic tokens with compatibility aliases so one release does not break untouched surfaces.
3. Migrate shared components before individual page compositions.
4. Audit each old `primary-*` use: decorative brand fill, action, link, focus and error are not interchangeable.
5. Change type roles and check wrapping before rewriting page layout.
6. Update translations alongside source copy, not after English screenshots are approved.
7. Implement onboarding structure independently from profile schema or auth changes.
8. Test deep links, current users, existing host applications and dark mode before removing legacy aliases.

The new preference model should distinguish **starting intent**, **current mode**, **self-declared skills** and **permissions/verification**. Do not rewrite all `user_type` values or loosen authorization to make role switching look functional. Specify backwards compatibility, server rules and any append-only migration in the relevant runtime package.

## 11. Delivery sequence and acceptance gates

The identifiers below are proposed planning labels, not existing approved packages. Each implementation package needs exact files, non-goals, acceptance criteria, evidence and status. Re-read current main, active workboard, narrower specs and ownership immediately before execution. Do not edit the exclusively owned F7 evidence branch or reinterpret its frozen criteria as rebranding work.

| Package | Deliverable | Depends on | Exit evidence |
|---|---|---|---|
| RB0 · Adopt and baseline | Durable design decision, route inventory, scope/status map, screenshots and asset inventory | This plan; current governance/ownership reconciliation | Approved exact scope and reproducible baseline |
| RB1 · Identity and foundations | Refined SVG mark; tokens; licensed/fallback font; component specimen in both themes | RB0 | Font/license record, logo sizes, contrast and component evidence |
| RB2 · Onboarding prototype | Three scenes, shared setup, learn/teach/both branches, first useful results using explicit fixtures | RB1 | Click-through, keyboard/mobile review, input/state handling, comprehension sessions |
| RB3 · Core journey | Home, World/Explore, Create, detail/commit preview cohesion; consistent shell | RB1–RB2; destination readiness | End-to-end participant and host preview paths; truthful state language |
| RB4 · Remaining surfaces | Auth/support/profile/host/admin/vertical alignment and external assets | RB3 | Full route inventory reconciled, localization/theme coverage |
| RB5 · Runtime onboarding integration | Governed private profile/age/preferences, auth continuity, mode switching and host eligibility | Eligible runtime specs and backend gates; prototype validated | Server/privacy/authorization tests and reliable recovery evidence |
| RB6 · Release verification | Asset cleanup, route/state matrix, performance evidence, approved release and rollback | Relevant preceding packages verified | Required checks, visual acceptance, deployment smoke and exact status updates |

RB5 is not an automatic consequence of RB2. Static rebranding can be reviewed while live onboarding dependencies remain gated. Conversely, the project is not “fully rebranded” until the agreed remaining surface inventory is reconciled.

During adoption, update the relevant sections of `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, `DECISIONS.md` and the visual continuation plan. Register implementation packages in the spec index. Update implementation/current-state ledgers and changelog when real status changes. Preserve historical records rather than rewriting old evidence as if it used the new design.

### First concrete work package

Start with RB0/RB1 and a **single vertical slice**: new brand header → three-scene introduction → name/age → learner interests → honest result card. Include the alternate host entry and first draft screen in that same reviewable prototype. This validates the identity in real UI before generating a large inventory of final artwork.

Do not start by changing every hex value, buying multiple typefaces, redrawing every future Season screen or adding new runtime features.

## 12. Validation and release checklist

### Functional and state evidence

- Find-a-class, teach-a-skill and both paths reach the correct first result.
- Skip/back/edit, auth return, empty inventory, denied location, invalid input and retry work as specified.
- Existing accounts do not lose profile state or receive an unearned new role.
- Host draft submission remains distinct from review approval and publication.
- Preview produces no unintended persistence, backend calls, bookings or payments.
- Links, current navigation, browser back, deep links and old onboarding routes remain coherent.

### Visual and accessibility evidence

Capture 320, 360/390, 430, 768 and 1440px layouts, short phone heights, light/dark themes and EN/FR/ES. Cover keyboard focus, screen-reader labels, selected/error states, 200% text resizing and reflow/zoom. Test sticky CTAs with the software keyboard and safe areas. Meet WCAG AA text contrast and non-text control contrast; ARO’s touch target remains at least 44px.

No critical decision depends on color, hover, drag, animation or illustration alone. Focus remains visible and unobscured; dialogs return focus; progress announcements do not spam assistive technology. Verify actual rendered combinations, including opacity and image overlays, rather than only token swatches.

### Performance and tooling

Run the existing required lint/build/type checks and package-relevant tests after implementation. Reuse the repository’s protected `static`, `browser-smoke` and `platform` checks; this plan does not claim they ran.

Record cold-load assets and route performance before/after on the same environment. Use responsive modern image formats and explicit dimensions; prioritize only the actual first-view hero, lazy-load subsequent scenes and avoid unnecessary motion libraries. Proposed initial budget for discussion: no more than 150KB compressed initial font transfer and approximately 250KB for the first mobile illustration, with measured visual-quality exceptions recorded. These are planning targets, not existing frozen F7 budgets; preserve stricter package budgets.

Use Core Web Vitals targets as operational goals where field measurement exists: LCP at most 2.5s, INP at most 200ms and CLS at most 0.1 at the 75th percentile. Lab evidence helps diagnose but is not field certification. Confirm current measurement guidance at implementation time. [5]

### User comprehension

Proposed first round: 12 people, four learner-first, four host-first and four who could do both. Ask them to explain what ARO does, choose a path, identify whether a result is bookable or forming, explain earning conditions, and switch intentions. Record errors and confusion, not just whether they like the image.

Initial acceptance target: at least 10/12 can explain the proposition and locate their intended path without coaching. This is a proposed small-sample design gate, not a statistically established conversion benchmark. Revise the design if users interpret ARO as a jobs app, a guaranteed income product or a social feed.

### Analytics after approved integration

Measure intro completion/skip, path chosen, setup completion, first relevant result, first booking and first completed experience. Host measures: meaningful draft, eligible publication, first booking and completed session. Segment by launch city/category and acquisition context, not only total accounts.

Track supply availability, booking failures, refunds/cancellations and host quality as guardrails. A shorter onboarding that drives unqualified applications or mismatched bookings is not a win. Do not optimize for a fixed learner/host percentage.

Proposed event names: `onboarding_started`, `intro_skipped`, `starting_path_selected`, `setup_completed`, `first_result_viewed`, `host_draft_created`. Payloads must exclude names, age/date of birth, exact location and free-text skills. Consent, retention, pseudonymous identifiers and analytics enablement belong in the approved runtime spec. These events are not authorized to start collecting data from this plan alone.

### Rollout and rollback

Use a scoped branch and reviewable PR for each package. Preview first, then release according to the existing gates. Keep the previous asset/token mapping and route behavior recoverable. A rollback must restore a coherent visual release without deleting profiles, bookings or drafts. Avoid schema changes in styling packages; where RB5 needs schema work, define its forward-compatible rollout and recovery separately.

Ship only with accurate implementation/verification/release status. Do not call an attractive static walkthrough a working marketplace.

## 13. Asset and handoff inventory

| Asset / specification | Current status | Required next step |
|---|---|---|
| Orange hero and open-O concept | Selected creative reference | Preserve as visual reference; create responsive source assets |
| Final vector logo | Not production-finalized | Optical refinement, small-size tests, similarity review |
| Polymath font assets/license | Not verified for ARO | Confirm license/files or implement Manrope fallback |
| Manrope | Present in current CSS via Google import | Pin licensed asset source/version and delivery |
| Semantic palette | Defined here; selected contrast pairs calculated | Implement full state/theme matrix |
| Three onboarding illustrations | Concept direction established | Produce consistent clean artwork without embedded UI text |
| Onboarding copy and branches | Defined here | Localize, prototype, test comprehension |
| Public/social/email/icon asset set | Scope defined | Export from final identity, verify URLs and crops |
| Runtime age/preferences/mode model | Not implemented by this plan | Specify within existing privacy/auth/Trust architecture |
| Whole-project route acceptance ledger | To create in RB0 | Record each route, owner, package, evidence and status |

Keep UI text live in code. Export illustrations without baked-in buttons or paragraphs. Asset manifest should record purpose, provenance/rights, dimensions, file weight, focal point, crop rules, alt-text treatment and theme use. Do not treat a sandbox attachment path as the permanent production asset URL.

## 14. Implementation handoff prompt

> Implement ARO’s rebrand from this plan in governed, reviewable packages. Begin by reading AGENTS.md and its required context/spec chain, pin the current commit, inspect active ownership and reconcile newer changes against the reviewed base e1ad70529d292879b5f1f29915df18fbf63f5948. Do not assume F7 or runtime gates passed. Adopt the orange-led palette, open circular dot-O, Polymath Display subject to licensed assets, Manrope UI and Learn · Earn · Connect benefit language. Use concrete task labels in the product. Preserve Tonguee, server authorization, teacher verification and money/privacy boundaries. Start with semantic tokens/shared components and the onboarding vertical slice. Keep preview state truthful and isolated. Treat mode/preferences changes separately from permissions and existing user_type persistence. Inventory every surface, including dark mode, translations, auth, error states, host operations and external assets. Do not globally replace colors or identifiers. Deliver exact criteria, tests, screenshots, performance comparison and status updates for each package. Finish the approved scope before proposing optional future features.

## 15. Sources and reference links

Project evidence is pinned to the reviewed commit; it is not a claim about later branches or production:

- [Reviewed repository snapshot](https://github.com/leonartist7/ARO.club/tree/e1ad70529d292879b5f1f29915df18fbf63f5948)
- [Operating contract](https://github.com/leonartist7/ARO.club/blob/e1ad70529d292879b5f1f29915df18fbf63f5948/AGENTS.md)
- [Current-state ledger](https://github.com/leonartist7/ARO.club/blob/e1ad70529d292879b5f1f29915df18fbf63f5948/ARO_CURRENT_STATE.md)
- [Current design system](https://github.com/leonartist7/ARO.club/blob/e1ad70529d292879b5f1f29915df18fbf63f5948/ARO_DESIGN_SYSTEM.md)
- Earlier project references: *ARO-Frontend-Master-Blueprint.md* (22 September 2026), *ARO-Onboarding-Master-Brief-2026-09-27.md*. This plan refines their visual/onboarding direction; it does not certify their future features as live.

External references, checked 27 September 2026 unless noted:

1. [OH no Type — Polymath](https://ohnotype.co/fonts/polymath): font family and production licensing source. Typeface selection is ARO art direction.
2. [Michael Sharanda — Manrope](https://www.sharanda.com/manrope): official distribution; verify the exact version/license used.
3. [W3C — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): contrast requirements. Ratios in this plan were calculated independently from proposed hex values.
4. [NN/g — Onboarding Tutorials vs. Contextual Help](https://www.nngroup.com/articles/onboarding-tutorials/): informs brief introduction plus task-context help; does not establish a universal three-screen optimum.
5. [web.dev — Web Vitals](https://web.dev/articles/vitals): measurement reference to recheck when executing performance acceptance.

**Decision boundary:** The creative direction is concrete enough to start a scoped implementation specification. Remaining production inputs are final vector refinement, actual font licensing/assets, exact age/privacy policy, route readiness and governed runtime prerequisites. They are discrete work items, not reasons to reopen the entire brand strategy.

