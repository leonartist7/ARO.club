# 🎨 TONGUEE — DESIGN EXECUTION PLAN

> **What this is:** the complete creative + execution plan to make the entire MVP look stunning and feel alive. It sits on top of `DESIGN_SYSTEM.md` (tokens, a11y rules, foundations, the 4 hero-page specs) and `BUILD_PLAYBOOK.md` (feature phases). This document covers **how every screen looks, moves, and delights** — batched into work packages (DP1–DP10) that separate model chats can execute independently.
>
> **Routing:** this doc is the design authority (authored at Opus tier). Every DP below is 🟦 **Sonnet-tier implementation** against these specs. **Prerequisite:** apply the `DESIGN_SYSTEM.md §2` token swap (playbook Phase B1) before any DP — all polish below assumes those tokens exist.
>
> **How to use:** open a fresh chat, paste the kickoff prompt from §10 with the DP number. One DP = one focused PR.

---

## 1. 🌟 Creative concept — "A passport to real human connection"

Tonguee should feel like the warm, brave moment right before you speak to a stranger in a new language — and the joy right after. Not a sterile edtech app; a **living, encouraging companion** that gets you across the table from a real human.

**Three visual pillars (every screen must express at least one):**

1. **Warm & human** — real photography (café tables, markets, two people laughing over coffee), coral warmth, rounded everything, generous whitespace. Never corporate-flat, never sterile dashboard-gray.
2. **Alive & playful** — Coco the chameleon reacts to you; gentle motion everywhere; celebration when you're brave. Gamification glows gold.
3. **Trustworthy & calm** — teal owns verification, safety, and money. Clean, confident, uncluttered. The "hand-verified teachers" promise must *look* premium, not hobbyist.

**Signature motifs (recurring vocabulary — use them, don't invent new ones):**

- **The Passport** — stamps, tickets, and "stamped" collectible cards as the visual metaphor for progress. Badges stamp in; bookings print as tickets; profiles show a stamp grid.
- **Coco** — the color-shifting chameleon mascot as guide and cheerleader (poses and rules in `DESIGN_SYSTEM.md §7`). Playful surfaces only — never in admin, checkout, or safety flows.
- **Coral→Teal gradient** — the brand gradient (`.gradient-text`, hero washes, progress fills). Coral = action/warmth, teal = trust/money, gold = game/reward.
- **Soft "sticker" cards** — rounded-2xl/3xl, soft shadow, subtle lift on hover. The whole UI is built from these.

**Anti-goals:** no harsh drop shadows, no pure black/white surfaces, no dense data tables outside admin, no aggressive red except destructive actions, no Duolingo-owl lookalikes, no stock-photo handshakes.

---

## 2. 🧩 Component library to BUILD (the design-system gaps)

These don't exist yet and unlock every DP below. Build in `src/components/ui/*`, styled with `DESIGN_SYSTEM.md §2` tokens. Every component: theme-aware (light+dark), keyboard-accessible, `prefers-reduced-motion` safe.

| Component | Purpose | Design notes |
|-----------|---------|--------------|
| `BottomNav` | Mobile app-feel tab bar (Home / Explore / Play / Bookings / Profile) | Fixed bottom on `<md` only; hide-on-scroll-down, reveal-on-scroll-up; coral active pill behind icon+label; safe-area inset padding |
| `CocoMascot` | Mascot component with `pose` prop (`idle` `wave` `cheer` `think` `point`) | 🦎 emoji inside a coral→teal gradient orb until real art exists; `float` idle anim, `pop` on pose change; static when reduced-motion |
| `ProgressRing` / `XPBar` | Level & XP progress | Gold gradient fill, animated fill on value change, count-up number |
| `StreakFlame` | Streak counter | Flame icon + day count; `bounce-gentle` when active; desaturated grey + kind copy when broken |
| `LevelBadge` / `TierBadge` | Learner level + teacher verification tier | Tier colors/labels per `DESIGN_SYSTEM.md §6` (🟢 Verified / 🔵 Pro / 🟣 Top Tongue) |
| `StatTile` | KPI tile for dashboards | Icon in tinted orb + big number + small label; used in admin, teacher, student dashboards |
| `RatingStars` | Display + input star rating | Half-star display, 44px touch targets in input mode, ARIA slider semantics |
| `PriceTag` | Price display w/ couple/group discount | Strikethrough original, coral final price, per-person note |
| `Tabs` | Underline + pill variants | Roving tabindex, animated active indicator |
| `Modal` / `Sheet` | Dialog; becomes bottom-sheet on mobile | Focus trap, scrim blur, drag-handle on sheet |
| `Tooltip`, `Accordion`, `Stepper`, `SegmentedControl` | Common primitives | Accordion for FAQ; Stepper for create-experience & onboarding |
| `Confetti` / `CelebrationOverlay` | Delight moments | Lightweight canvas confetti in brand colors; auto-dismiss; skipped entirely under reduced-motion |
| `QRTicket` | Booking confirmation ticket | Rounded "ticket" with perforation notches + QR code + experience summary |
| `SectionHeading` | Consistent section titles | Small coral eyebrow + bold title + optional right-side action link |
| `Chip` / `FilterChip` | Tags and smart filters | Toggleable, coral active state, x-to-clear |
| `EmptyState` *(enhance existing)* | Empty screens | Add `CocoMascot` pose + warm copy + primary CTA |

---

## 3. 🎮 Gamification visual language (make the "Play" side pop)

- **Gold is the game color** (`accent` token) — XP, coins, streaks, level-ups, leaderboards. Gold is never a primary CTA; coral stays the action color.
- **Level-up = full celebration:** `CelebrationOverlay` + confetti + Coco `cheer` + XPBar animated fill + scale-`pop` on the new level number.
- **Streak is emotional, not numeric:** big `StreakFlame`, "🔥 12 days", warm gradient backdrop. A broken streak is gentle grey with kind microcopy ("Life happens — restart today 💛"). Never shame.
- **Coco lives in the game:** hosts the games page, wiggles on wrong answers, `pop`s on right ones, celebrates finishes. The Character Builder is explicitly **"Dress up Coco"** — customizing the mascot itself (skins/hats/glasses/backgrounds), not generic emoji animals.
- **Rewards feel physical:** coins land with a bounce, badges **stamp** into the passport grid (scale-down + slight rotation, like a rubber stamp), shop items unlock with a diagonal shine sweep.

---

## 4. ✨ Signature delight moments (design these carefully — they're the brand)

1. **Booking success** → `QRTicket` "prints" in (slide-down + settle), confetti burst, Coco `cheer`, then a single CTA: "Warm up for Thursday →" (links to games filtered to the experience's language).
2. **Teacher verification approved** → gold seal stamps onto the profile card, `TierBadge` reveal, "You're live on Tonguee!" — sober-premium tone, no confetti, no Coco (teachers are professionals).
3. **Level-up / badge earned** → passport-stamp animation + confetti + share prompt.
4. **Memory Postcard** (after attending an experience) → auto-generated shareable card: experience photo + "3 words you learned" + teacher name, framed in the coral→teal gradient. Downloadable/shareable — this is the organic-growth artifact.
5. **First message sent / first review left** → small inline Coco encouragement, one-time.
6. **Streak milestones** (7 / 30 / 100) → escalating celebration sizes; 100 gets a unique gold "century stamp."

---

## 5. 🧭 Global shell & navigation (DP1 — do first, touches every page)

- **Header** (`src/components/layout/Header.jsx`): sticky glass (blur + translucent surface), coral wordmark + Coco mark, one clear primary CTA ("Find an experience" / "Start teaching" by role), role-aware menus (learner / teacher / admin), existing theme + language toggles restyled to match.
- **`BottomNav`** (new): the single biggest "feels like a real app on my phone" win. Tabs: Home, Explore, Play (games), Bookings, Profile.
- **Footer** (`src/components/layout/Footer.jsx`): warm two-tone surface, trust strip ("🛡️ Hand-verified teachers · 💛 Anti-shame guarantee"), link columns, social, legal.
- **Page transitions:** subtle `fade-in`/`slide-up` on route change; skeletons (already exist) for loading.
- **Toast** (exists): restyle to brand — rounded-2xl sticker look, icon orb, coral/teal/gold by type.
- **Optional polish:** ⌘K quick-search overlay (jump to city / language / page).

---

## 6. 📄 Page-by-page design specs

> The **4 hero pages** (Home, Explore, Experience Detail, Teacher Profile) are fully specced in `DESIGN_SYSTEM.md §8` — implement them there (playbook B2). Everything else is below. Format: *vibe → layout → wow moment → states.* Reuse §2 components everywhere; never hand-roll a one-off variant.

### Learner surfaces

- **`StudentDashboard.jsx`** — *vibe:* warm home base. *layout:* greeting + Coco `wave`; hero row of `StreakFlame` + `XPBar` + coins; "Your next experience" card with countdown + "Warm up →"; daily quests (3 max); recommended experiences grid. *wow:* the next-experience warm-up hook. *states:* skeletons; new-user EmptyState (Coco `wave`, "Book your first table 🎉").
- **`GamesPage.jsx`** — *vibe:* bright, poppy, gold-lit. *layout:* Coco as host up top; game-picker sticker cards; live score + streak during play. *wow:* right-answer `pop`, finish celebration. *states:* per-game loading, results screen with XP earned + replay/next CTAs.
- **`CharacterBuilder.jsx` + `ShopPage.jsx`** — *vibe:* toy-box joy. *layout:* big live Coco preview + customization `Tabs` (skin/hat/glasses/background); shop grid with coin `PriceTag`s + level locks. *wow:* unlock shine + equip stamp. *states:* owned vs. locked; insufficient-coins nudge pointing to games ("Earn 50 more playing Word Match →").
- **`LeaderboardPage.jsx`** — *vibe:* friendly competition. *layout:* weekly league `Tabs`; podium top-3 with avatars; your-rank row sticky at bottom; **separate Top Tongue teacher board** (teal-framed, not gold). *wow:* rank-up slide animation. *states:* empty league, self-highlight.
- **`StudentProfilePage.jsx`** — *vibe:* proud identity. *layout:* avatar + `LevelBadge`; **Passport stamp grid** (badges as stamps); language progress bars; stats row. *wow:* the passport itself. *states:* few-stamps encouragement copy.
- **My Bookings** *(build; route `/bookings`)* — upcoming/past `Tabs`; upcoming = `QRTicket` cards; past = review-prompt cards (then Memory Postcard). *states:* none-yet EmptyState → Explore CTA.
- **`FavoritesPage.jsx` / `RecentlyViewedPage.jsx` / `ComparePage.jsx`** — clean grids reusing `ExperienceCard`; Compare = side-by-side sticky-header table (price/rating/languages/group size), max 3, scrolls in its own container. Coco EmptyStates.
- **`ChatPage.jsx`** — *vibe:* friendly and safe. *layout:* conversation list + thread; quick-reply phrase chips ("¿Hablas inglés?"); translation toggle per message. *states:* empty ("Say hi before you book — teachers love it"), typing indicator, unread dots.

### Teacher surfaces

- **`TeacherDashboardPage.jsx`** — *vibe:* confident command center (warm but grown-up; minimal Coco). *layout:* `StatTile` row (earnings / bookings / rating / response time); verification-status card with `TierBadge`; this-week mini calendar; experiences list with quick actions; payout countdown (teal). *wow:* profile-completeness `ProgressRing` with "+12% more bookings" nudges. *states:* pre-verification locked state showing application progress; no-bookings coaching card.
- **`teacher/TeacherApplicationStatus.jsx`** *(exists — polish)* — status banner by state, completeness ring, portfolio upload cards with previews, Coco `point` on next-step.
- **Create/Edit Experience** *(build; route `/teacher/experiences/new`)* — friendly `Stepper` (Basics → Where & when → Pricing → Photos → Review); template presets by type (Coffee chat / City walk / Cooking…); live "preview as learner" card that updates as they type; photo tips inline. Gated behind verification.

### Admin surfaces (sober, premium, data-dense — **no Coco, no confetti**)

- **`admin/AdminDashboard.jsx`** *(exists — refine)* — calm ops console: `StatTile` row (pending / approved 7d / rejection rate / avg review time), filterable applications queue table with status `Chip`s + SLA age indicators.
- **`admin/ApplicationReview.jsx`** *(exists — polish)* — two-pane: applicant portfolio/media viewer left, scoring rubric + decision panel right; sticky decision bar; confirmation `Modal` on reject/ban.
- **Teachers management + Audit Log** *(build — playbook Phase A)* — clean tables, status chips, action confirmations, empty/error states.

### Marketing / content

- **`AboutPage` / `HowItWorksPage` / `ForTeachersPage` / `FAQPage` / `ContactPage`** — *vibe:* warm storytelling. Real photography with consistent warm treatment; the Loop diagram (learn → play → meet → stamp) on How-it-works; testimonials; **earnings calculator** on For-Teachers (sliders → "€680/mo" in teal); `Accordion` FAQ; friendly Contact form with response-time promise. Every page ends in a strong CTA band.
- **`MapViewPage.jsx`** — clustered coral pins; tap → experience preview card slides up; list/map `SegmentedControl`; filter `Sheet` on mobile.

### Auth / onboarding (first impression — make it delightful)

- **`ChooseRolePage` / `LoginPage` / `SignupPage` / `ForgotPasswordPage`** — *vibe:* warm, low-friction. Split layout: left brand panel (gradient wash + photo + one-line promise), right form card; social auth buttons; Coco `wave` in the corner. Choose-role = two big sticker cards (Learn 🧡 / Teach 💙).
- **`StudentOnboarding` / `TeacherOnboarding`** *(exist — keep the swipe delight)* — ensure progress bar, per-step `slide-up`, completion celebration, Coco throughout (student flow only; teacher flow stays professional-warm).

### System

- **Notifications** *(build)* — grouped by day, icon orbs by type, read/unread, mark-all. **Settings** *(build)* — sectioned list (profile, account, notifications, appearance, language, privacy) using `Tabs`/`Accordion`. **Legal** — clean readable long-form (65ch measure). **`NotFoundPage`** *(exists — polish)* — Coco `think`, "This table doesn't exist", helpful links.

---

## 7. 🎬 Motion & micro-interaction language

Reuse the existing keyframes (`float`, `pop`, `fade-in`, `slide-up`, `bounce-gentle` — see `DESIGN_SYSTEM.md §4`). Rules:

- **Hover** = lift 2px + shadow step up. **Press** = `pop` (scale .97→1). **Enter** = `fade-in`/`slide-up`, stagger lists by 40ms.
- **Reward** = confetti + `bounce-gentle`. **Coco idle** = `float`.
- Durations 150–300ms UI, 400–600ms celebrations; ease-out for enters, spring-ish for rewards.
- **Everything** gated behind `prefers-reduced-motion` (wrapper utility, not per-component ad-hoc checks).
- Motion must feel *responsive and warm* — if an animation delays a user action, cut it.

---

## 8. 🖼️ Imagery & voice

- **Photography:** real, diverse people mid-conversation in real places; warm color treatment; no flat stock. Until real shoots: Unsplash, curated for warmth, consistent treatment (slight warm overlay).
- **Illustration:** Coco + passport/ticket/stamp motifs only; soft, rounded, 2-color + gradient.
- **Iconography:** `lucide-react` (already in use) — consistent stroke width, always paired with labels in nav.
- **Copy voice:** warm, brave, anti-shame (per `VISION.md`). Microcopy is design: empty states encourage ("Your passport is waiting for its first stamp"), errors take blame ("That's on us — try again"), buttons are verbs ("Book your table", not "Submit").

---

## 9. 🌓 Dark mode & accessibility (baked into every DP, not a phase)

Every DP's acceptance includes: correct dark pairings for every surface (`DESIGN_SYSTEM.md §2` table); WCAG AA contrast (coral usage rules in §3); visible focus rings; 44px touch targets; full keyboard nav; ARIA on interactive composites (tabs, modals, ratings); `prefers-reduced-motion` respected. `SkipToContent` already exists — keep it wired.

---

## 10. 📦 Execution batches (priority order — one DP = one PR)

| DP | Package | Representative files | Depends on |
|----|---------|----------------------|------------|
| **DP1** | Global shell: Header, Footer, `BottomNav`, transitions, Toast restyle | `components/layout/*`, `ui/BottomNav.jsx` | B1 tokens |
| **DP2** | Component library (§2) | `src/components/ui/*` (new) | B1 |
| **DP3** | Gamification surfaces (§3): StudentDashboard, Games, CharacterBuilder, Shop, Leaderboard | those pages | DP2 |
| **DP4** | Learner marketplace: StudentProfile, My Bookings, Favorites, RecentlyViewed, Compare, Chat | those pages + cards | DP2 |
| **DP5** | Teacher surfaces: TeacherDashboard, application status, create-experience stepper | `TeacherDashboardPage`, `pages/teacher/*` | DP2 |
| **DP6** | Admin console polish (sober) | `pages/admin/*` | DP2 |
| **DP7** | Marketing/content + Map | About, HowItWorks, ForTeachers, FAQ, Contact, MapView | DP1 |
| **DP8** | Auth + onboarding delight | ChooseRole, Login, Signup, Forgot, onboardings | DP2 |
| **DP9** | Signature moments (§4): Confetti, QRTicket, Memory Postcard, celebrations wired into flows | new `ui/*` + flow hooks | DP2–DP4 |
| **DP10** | Global sweep: every empty/loading/error state, dark-mode QA, a11y audit | app-wide | all |

**Kickoff prompt (paste into a fresh implementation chat):**

> Read `DESIGN_EXECUTION_PLAN.md` (section for DP‹N›), `DESIGN_SYSTEM.md`, and the files named in the DP row. Implement DP‹N› exactly to spec: reuse/extend `src/components/ui/*`, keep everything theme-aware, accessible, and reduced-motion safe. Don't redesign — execute the spec. Verify with `npm run build`, then run `/code-review`. Ship as one PR.

---

## 11. ✅ Definition of "amazing" (per-screen QA rubric)

A screen is done only when **all** of these hold:

1. Visually cohesive — only design-system tokens/components, zero one-off colors.
2. Responsive — bottom-nav mobile layout, no horizontal scroll, comfortable at 360px and 1440px.
3. Light **and** dark mode both look intentional.
4. Empty, loading, and error states are designed (Coco/skeletons/kind copy) — never a blank div or raw error.
5. Motion present but `prefers-reduced-motion` safe.
6. WCAG AA: contrast, focus rings, keyboard, labels.
7. Microcopy is warm and on-voice.
8. At least **one** moment of delight (however small).
9. No placeholder text, lorem, or grey boxes anywhere.
