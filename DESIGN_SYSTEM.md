# 🎨 TONGUEE — DESIGN SYSTEM (B0 spec, Opus-authored)

> **For the Sonnet 4.6 implementer (Phase B).** This is the source of truth for tokens, components, mascot, and hero-page layouts. Implement B1–B3 against it. It's a *spec*, not code to copy verbatim — but the token block in §2 is drop-in ready.
>
> **Routing reminder:** B0 (this doc) = Opus. B1 (tokens), B2 (page rebuilds), B3 (a11y) = Sonnet.

---

## 0. Decision record — the palette conflict (READ FIRST)

The live `tailwind.config.js` ships **yellow `#FDD835` + orange `#FF9800` + green `#4CAF50`** — essentially **Duolingo's palette**. The approved brand is **Tonguee**, and we just removed the "Duo the Owl" clone. Shipping Duolingo's colors undercuts the original-brand goal.

**DECISION (canonical): Coral + Teal core, with a reserved sunny-gold accent for gamification only.**
- **Coral** `#FF6B35` = primary — warmth, bravery, the CTA color (the "Live it" energy).
- **Teal** `#20B2AA` = secondary — trust, calm, "global"; used for verification/trust, links, secondary actions.
- **Sunny gold** `#FFB020` = accent — **gamification ONLY** (XP, streaks, coins, level-ups). Never a primary CTA. This keeps the game layer poppy without making the whole app look like Duolingo.

**Migration is a clean token swap** because components reference `primary-*` / `secondary-*` (not hex). Changing §2's color block recolors the app. The old green becomes `success` only.

---

## 1. Design principles
1. **Warm, brave, anti-shame.** Rounded shapes (radius-xl default), generous whitespace, human photography over flat blobs.
2. **One CTA color.** Coral = "do the thing" (book, continue, submit). Don't dilute it.
3. **Trust is teal.** Verified badges, safety, security, "hand-verified by a human" moments lean teal/green.
4. **Gamification is gold + playful motion**, visually distinct from the core funnel so the marketplace stays grown-up and trustworthy.
5. **Accessible by default** — WCAG AA. See §3 contrast rules; never put white text on coral-500 at body size.
6. **Dark mode is first-class** (already `darkMode: 'class'` + `ThemeContext`). Every token has a dark pairing.

---

## 2. Color tokens — drop-in `tailwind.config.js` `theme.extend.colors`

```js
colors: {
  // PRIMARY — Coral (CTAs, brand). Use 600/700 for fills w/ white text (AA).
  primary: {
    50:'#FFF3EE',100:'#FFE2D6',200:'#FFC4AD',300:'#FF9E78',400:'#FF8453',
    500:'#FF6B35', // brand reference (logo, large surfaces ≥24px)
    600:'#F25A22', // interactive fill + white bold text (AA-large)
    700:'#CC4517', // text-on-white safe / small buttons
    800:'#A2360F',900:'#7A2810',
  },
  // SECONDARY — Teal (trust, links, secondary actions)
  secondary: {
    50:'#E9FBF9',100:'#C7F4F0',200:'#94E9E2',300:'#5BD8CF',400:'#2FC3B9',
    500:'#20B2AA', // brand reference
    600:'#199089', // interactive fill w/ white text
    700:'#15726D', // text-on-white safe
    800:'#115A56',900:'#0D4744',
  },
  // ACCENT — Sunny gold (GAMIFICATION ONLY: XP, streaks, coins, level-ups)
  accent: {
    50:'#FFF8E6',100:'#FFEDBF',200:'#FFDD85',300:'#FFCB47',400:'#FFBC24',
    500:'#FFB020', // gamification highlight
    600:'#E0930C',700:'#B87100', // text-on-white safe
    800:'#8F5700',900:'#6B4100',
  },
  // SEMANTIC
  success:{50:'#ECFDF3',500:'#16A34A',700:'#15803D'},
  warning:{50:'#FFFBEB',500:'#F59E0B',700:'#B45309'},
  danger: {50:'#FEF2F2',500:'#EF4444',700:'#B91C1C'},
  info:   {50:'#EFF6FF',500:'#3B82F6',700:'#1D4ED8'},
}
```
**Neutrals:** keep Tailwind's default `gray-*` (already used everywhere). **Don't** add a custom neutral ramp — wasted churn.

**Semantic surface tokens (use these class patterns, not raw grays, for theme-correctness):**
| Role | Light | Dark |
|------|-------|------|
| Page bg | `bg-white` / `bg-gray-50` | `dark:bg-gray-950` |
| Surface (card) | `bg-white` | `dark:bg-gray-900` |
| Surface-2 (raised) | `bg-gray-50` | `dark:bg-gray-800` |
| Border | `border-gray-200` | `dark:border-gray-800` |
| Text | `text-gray-900` | `dark:text-gray-50` |
| Text-muted | `text-gray-500` | `dark:text-gray-400` |

`index.css` `.gradient-text` (currently primary→secondary) stays correct after the swap (coral→teal gradient). Keep it.

---

## 3. Accessibility & contrast rules (non-negotiable)
- **Coral-500 fails AA for text** on white (~2.6:1). Rules:
  - Solid primary button → `bg-primary-600 hover:bg-primary-700 text-white` with **bold ≥16px** labels.
  - Coral **text** on light → `text-primary-700` (never 500).
  - Coral-500 is fine for **large graphics, fills ≥24px, logo, icons paired with labels**.
- **Teal:** fills → `bg-secondary-600 text-white`; text on light → `text-secondary-700`.
- **Focus:** every interactive element keeps a visible focus ring — the existing Button uses `focus-visible:ring-2 ring-primary-500 ring-offset-2`; replicate on links/inputs.
- **Motion:** wrap non-essential Framer Motion in `prefers-reduced-motion` guards; the float/wiggle/bounce keyframes must not loop for reduced-motion users.
- Min tap target 44×44px on mobile. Body text ≥16px. Never convey state by color alone (pair with icon/label).

---

## 4. Typography, spacing, radius, shadow, motion
- **Type:** Poppins (display, 600–800) for h1–h4 & numbers; Inter (body, 300–700). Already imported in `index.css`. Keep.
- **Scale:** `text-4xl/5xl` hero, `text-2xl/3xl` section titles, `text-base` body, `text-sm` meta. `font-display` on headings (already enforced via base layer).
- **Spacing:** 4px base (Tailwind default). Page container = `container mx-auto px-4 sm:px-6 lg:px-8`, content `max-w-7xl`.
- **Radius:** cards/inputs `rounded-xl`, buttons `rounded-lg`, pills/badges `rounded-full`, hero media `rounded-3xl`.
- **Shadow:** rest `shadow-md`, hover `shadow-xl/2xl` + `-translate-y-1` (Card already does this with `hover`).
- **Motion:** reuse the keyframes already in `tailwind.config.js` (`fade-in`, `slide-up`, `scale-in`, `pop`, `float`, `bounce-gentle`, `wiggle`). Page sections: `fade-in`/`slide-up`. Coco idle: `float`. Rewards/level-up: `pop` + `bounce-gentle`. **Don't add new keyframes** unless a spec item needs one.

---

## 5. Component states (most already exist in `src/components/ui/*`)
Because components reference `primary-*`/`secondary-*`, **B1 is mostly the token swap + verifying states.** Specifics:

- **Button** (`Button.jsx`) — keep variants `primary | secondary | outline | ghost | danger | glass`. Update so `primary` solid uses `bg-primary-600 hover:bg-primary-700` (AA). Sizes sm/md/lg/xl stay. States: default/hover/active/disabled(`opacity-50`)/loading(spinner, already built). Icon slot exists.
- **Card** (`Card.jsx`) — variants default/`glass`, `hover` lift. Apply surface tokens (§2). Subcomponents Header/Body/Footer exist.
- **Badge** (`Badge.jsx`) — variants default/primary/secondary/success/warning/danger/info. **Add verification-tier intent** (see §6).
- **Input/Select** — focus ring `ring-2 ring-primary-500`; error state `border-danger-500 text-danger-700`; dark variants.
- **Avatar, Toast, Skeleton, EmptyState, ErrorState, LoadingSpinner** — already exist; just recolor via tokens. EmptyState should host a Coco pose (§7).

---

## 6. Verification-tier badges (ties to the Trust Engine already shipped)
Map `teachers.tier` → a Badge with icon (lucide) + label. Use a small `ShieldCheck`/`BadgeCheck` icon.
| Tier | Label | Classes | Icon |
|------|-------|---------|------|
| `verified` | Verified | `bg-success-50 text-success-700 border-success-500/30` | `ShieldCheck` |
| `pro` | Pro | `bg-info-50 text-info-700 border-info-500/30` | `BadgeCheck` |
| `elite` | Top Tongue | `bg-violet-50 text-violet-700 border-violet-200` | `Crown` (lucide) |
Show on `TeacherCard`, `TeacherProfilePage`, and admin lists. Always include the text label (not color-only). Add a tooltip: "Hand-verified by the Tonguee team."

---

## 7. Coco the Chameleon — mascot usage
Coco is the brand face + avatar base (replaces "Duo the Owl" already removed from `characters.js`).
- **Personality:** warm, encouraging, brave, *never* guilt-trips. Color-shifts to context (chameleon) — can tint coral/teal/gold per surface.
- **Poses (define as named variants for future art):** `idle` (float anim), `wave` (onboarding/welcome), `cheer` (rewards/level-up: `pop`+`bounce-gentle`), `think` (loading/empty), `point` (tips/CTAs).
- **Where Coco appears:** onboarding steps, Student Dashboard greeting, empty states (`EmptyState`), streak celebrations, game host, loading screens. **NOT** on payment/checkout, legal, or admin verification screens (keep those sober/trustworthy).
- **Don'ts:** no owl/green-owl semantics; don't put Coco on money or safety flows; don't over-animate (respect reduced-motion).
- Until custom art exists, render the existing emoji 🦎 in a coral→teal gradient circle (matches current avatar placeholder pattern in onboarding).

---

## 8. Hero-page layout specs (B2 — Sonnet rebuilds these four)

Each spec = sections top→bottom, the signature moment, responsive notes, and empty/loading states. Reuse existing components; verified-only data (Trust Engine RLS already enforces this).

### 8.1 HomePage (`src/pages/HomePage.jsx`)
**Job:** convert a stranger in 5 seconds via the Loop.
1. **Sticky header** (exists) — logo, nav, Sign in / Get started (coral).
2. **Hero** — left: H1 "Don't just learn it. Live it." + subcopy + dual CTA ("Find an experience" coral / "Become a teacher" outline) + city/lang quick-search; right: a **split visual** showing *Learn (game card)* → *Live (real café photo)* with Coco `wave`. `slide-up` on load. Mobile: stack, visual below.
3. **Trust strip** — "Every teacher hand-verified by a human" + logos/stats counters (reuse animated stats).
4. **The Loop** — 3 cards Learn → Live → Belong (icons, one line each).
5. **Featured experiences** — grid of `ExperienceCard` (6), `secondary` "See all" → /explore. Skeletons while loading; `EmptyState` w/ Coco if none.
6. **For teachers** band — earnings hook + "Apply to teach" (→ teacher application).
7. **Footer** (exists).
Responsive: 1-col mobile, 2-col hero ≥lg, 3-col card grids ≥md.

### 8.2 ExplorePage (`src/pages/ExplorePage.jsx`)
**Job:** find the right experience fast. (Filtering already strong — keep logic, restyle + verified-only.)
- **Top bar:** search input + sort select + "Map view" toggle (`secondary`).
- **Left filters (sticky, collapsible on mobile drawer):** language, city, skill, price; smart chips "This weekend", "Online", "With a buddy", "Brave-o-meter".
- **Results grid:** `ExperienceCard` 1/2/3-col; result count + active filter pills (removable).
- **States:** `ExperienceCardSkeleton` while loading; `EmptyState` (Coco `think`) + "clear filters" when none.

### 8.3 ExperienceDetailPage (`src/pages/ExperienceDetailPage.jsx`)
**Job:** turn interest into a booking (booking itself = Phase C).
1. **Gallery** (rounded-3xl) + title, language/level/type badges, city.
2. **Teacher strip:** avatar, name, **verified-tier badge (§6)**, rating, "Message" (→ chat).
3. **Sticky booking card (right ≥lg / bottom sheet mobile):** price, couple/buddy toggle, `SpotCounter` urgency, **"Book now" coral CTA** (wires to Phase C). Until then, disabled w/ "Booking opens soon".
4. **"What you'll say tonight"** — pre-experience warm-up preview (8 phrases) — signature moment.
5. What's included / location (map placeholder) / reviews / related grid.
States: `ProfileSkeleton`/skeletons; `ErrorState` if not found.

### 8.4 TeacherProfilePage (`src/pages/TeacherProfilePage.jsx`)
**Job:** make a learner trust + choose this human.
1. **Header:** cover, avatar, name, **verified-tier badge**, city, rating, response time.
2. **Intro video** (from `teacher_documents.intro_video`) — prominent.
3. **Languages w/ proficiency bars** (teal), specialties, bio.
4. **Upcoming experiences** grid (`ExperienceCard`).
5. **Reviews** w/ pagination. **"Message before booking"** CTA.
States: skeleton; `EmptyState` if no upcoming.

---

## 9. B-phase implementation checklist (for the Sonnet chat)
- **B1:** paste §2 colors into `tailwind.config.js`; set Button `primary` to 600/700 (§5); recolor `index.css` if needed; sweep `src/components/ui/*` for hardcoded old colors → tokens; verify dark pairings (§2 table). `npm run build`.
- **B2:** rebuild the 4 pages to §8; verified-tier badges (§6) on teacher surfaces; Coco poses (§7) in hero/empty states.
- **B3:** a11y pass (§3) — focus rings, ARIA, reduced-motion guards, contrast check, 44px targets. `SkipToContent` already wired.
- Finish: `npm run build` + `npm run lint` + `/code-review`. One PR.
- **Out of scope for B:** real booking/payments (Phase C), data migration off mock JSON (C1).
