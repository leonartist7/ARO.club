# 👅 TONGUEE — The Master Vision & Production-Ready Blueprint

> A founder-grade vision that fuses product, design (UI/UX), brand, marketing, operations, and a phased build plan — engineered so we can **start implementing immediately**.
>
> **Developed in 3 refinement passes** (as requested):
> - **Round 1 — Vision:** map the dream end-state across every page, feature, and system.
> - **Round 2 — Critique:** attack it from other perspectives, find blind spots, kill weak ideas, surface what you haven't thought of.
> - **Round 3 — Synthesis:** turn it into an executive, sequenced, file-level implementation plan with a clear "definition of done."
>
> Look for **🔥 Round-3 Sharpest Insight** callouts — the non-obvious, highest-leverage moves.

---

## 0. CONTEXT — Why this document exists

**The problem prompting this:** Tonguee is ~40% of a great idea trapped inside an inconsistent build. The code is genuinely rich (React 19 + Vite + Tailwind + Supabase, ~29 pages, dark mode, i18n, a polished marketplace UX layer, AND a Duolingo-style gamification layer). But it is **four products wearing one hoodie**, with the single most important business mechanism — *quality control of teachers* — completely missing.

**Concretely, the current state has five existential gaps** (verified by reading the codebase):

| # | Gap | Evidence in code | Why it's existential |
|---|-----|------------------|----------------------|
| 1 | **No admin role or verification workflow** | `teachers.verified` column exists in `supabase/schema.sql` but nothing sets it; no `/admin` route in `src/lib/routes.jsx`; no admin RLS. Experiences publish on `status='published'` alone. | Your entire quality promise depends on this. Right now a teacher can self-publish unverified. |
| 2 | **No portfolio system** | `TeacherOnboarding.jsx` collects only name, swipe-selected languages/experiences, an avatar, and a 50-char bio — then inserts a teacher row with `verified:false`. No documents, ID, video, credentials. | You can't evaluate quality without artifacts to evaluate. |
| 3 | **Auth guard is broken/insecure** | `ProtectedRoute.jsx` checks `useStore().currentUser` (Zustand mock) instead of the real `AuthContext` user. | Route protection is disconnected from real auth. Anyone/no-one is "protected." |
| 4 | **Brand is fragmented 4 ways** | "Conversa" (schema, README, Header), "Langgie" (`langgie-extensions.sql`), "TongueConnect" (HANDOFF.md), "Tonguee" (repo). Mascot literally named **"Duo the Owl"** in `characters.js`. | No coherent identity to market; "Duo the Owl" is an IP landmine (Duolingo). |
| 5 | **Two product models fused but unreconciled** | Marketplace (experiences/bookings/reviews on mock JSON) + Duolingo layer (streaks, games, shop, avatars, leaderboard in `langgie-extensions.sql`). Payments unbuilt. | Without a unifying thesis, it reads as two half-apps, not one product. |

**Intended outcome of this doc:** a single, clear, end-to-end vision + a sequenced plan that (a) unifies the brand as **Tonguee**, (b) builds the **Admin + Teacher Verification engine first**, (c) designs **every page and system to production quality**, and (d) lays out branding, marketing, and operations to onboard real teachers and learners safely and at quality.

**Locked decisions (from you):** Brand = **Tonguee** · Model = **Hybrid (in-person hero + online reach)** · Build first = **Admin + verification** · Money = **Commission now + Tonguee Plus subscription later**.

---

## 1. THE BIG IDEA — One thesis that reconciles everything

Most people see the two layers (solo game vs. real-world marketplace) as a conflict. **They're a flywheel.** This is the core insight the whole product hangs on.

- **Duolingo's flaw:** people plateau at the "intermediate wall," never actually *speak*, and quit. It's lonely and abstract.
- **italki / Preply's flaw:** high-friction, intimidating, transactional. No daily habit, no reason to open the app between lessons.
- **Tonguee's wedge:** *the game is the habit and the funnel; the real experience is the transformation and the money moment; the community is the retention.*

### 🌀 The Tonguee Loop: **Learn → Live → Belong**

```
   ┌─────────────────────────────────────────────────────────┐
   │   LEARN   →   LIVE   →   BELONG   →  (back to LEARN)      │
   │  (free,      (book a    (friends,                        │
   │   daily      real        status,                         │
   │   game)      experience) memories)                       │
   └─────────────────────────────────────────────────────────┘
```

1. **LEARN** — the free daily game/streak (already half-built: games, streaks, quests, avatars). The *hook*. Warms learners up with vocabulary for the *specific experience they booked* ("pre-class warm-up for your Thursday cooking class").
2. **LIVE** — book a real in-person experience (or online when they can't be there). The *magic* and the *revenue*. This is where the loop earns money and changes a life.
3. **BELONG** — friends made, two-way reviews, "memory postcards," status, passport stamps. The *retention and identity*. Brings them back to LEARN to prep for the next one.

> ### 🔥 Round-3 Sharpest Insight #1 — **We are not selling "language learning." We're selling courage and belonging.**
> Nobody churns from Duolingo because they stopped wanting French. They churn because it's lonely and they never get to *use* it. Tonguee's true product is **"the bravery to speak, and the friends you make doing it."** Every design and marketing decision should ladder up to *transformation and human connection*, not "lessons completed." This reframing is the moat — competitors are racing on features; we win on *feeling*.

**Discipline rule (anti-dilution):** The game is the *funnel*, the marketplace is the *business*. We must never out-invest the toy on the game and starve the marketplace. The game exists to drive booked experiences.

---

## 2. BRAND STRATEGY — Tonguee

### 2.1 Name & meaning
**Tonguee** = "tongue" (language, *mother tongue*, the literal organ of speech) + a friendly doubled "-ee" that turns it into a nickname, a buddy, a verb-able brand ("let's Tonguee tonight"). Short, ownable, warm, slightly cheeky. It already matches the repo and your instinct.

### 2.2 Mascot — **kill "Duo the Owl" immediately** 🚨
`src/data/characters.js` literally ships a mascot named **"Duo the Owl"** — a direct clone of Duolingo's IP and brand. This is both a legal risk and a creativity failure. Replace with an **original Tonguee mascot**:

- **Recommended: "Coco" the Chameleon 🦎** — chameleons *adapt to every environment and change colors*: the perfect metaphor for blending into new cultures and "speaking every tongue." Naturally colorful (ties to our palette), expressive, lovable, and *original*. Coco is the avatar base, the game guide, the streak cheerleader, and the face of the brand.
- Alternates if you prefer: a **parrot** (mimics any language) or a **gecko**. (Chameleon wins on "adapts to every culture.")

The existing avatar/character/shop system (`CharacterBuilder.jsx`, `ShopPage.jsx`, `characters.js`) becomes "**Dress up your Coco**" — a single coherent identity instead of generic emoji animals.

### 2.3 Positioning statement
> **Tonguee is where language lessons become real life.** Learn by playing, grow by living — speak a new language with real people, in real places around the world (and online when you can't be there). Every teacher is hand-verified by a human, so every experience is safe, authentic, and unforgettable.

### 2.4 Tagline candidates (pick 1 hero + 1 campaign)
- **"Don't just learn it. Live it."** ← recommended hero
- "Find your tongue."
- "Speak the world."
- "Where words become friends."
- "Your tongue, untied."

### 2.5 Visual identity
- **Palette:** keep & systematize the existing **Coral Orange `#FF6B35`** (energy, bravery, warmth) + **Teal `#20B2AA`** (trust, calm, global). Add a tokenized neutral ramp + semantic colors (success/warn/danger/info). Dark mode already exists (`ThemeContext`) — formalize tokens for both.
- **Type:** keep **Poppins** (display) + **Inter** (body) — already loaded and solid.
- **Logo:** wordmark "Tonguee" with the second "g" or the "ee" subtly forming a speech bubble / Coco's silhouette. Friendly, rounded.
- **Illustration system:** warm, diverse, real human moments at café tables, markets, tours — not flat corporate blobs. People of all ages/backgrounds *talking and laughing*.

### 2.6 Brand voice
Warm, brave, playful, *anti-shame*. Duolingo-cheeky but **kinder** — we never guilt-trip ("You broke your streak, you monster"); we encourage ("Life happens — your streak's on us today 💛"). We celebrate *bravery* over *perfection*.

> ### 🔥 Round-3 Sharpest Insight #2 — **"Hand-verified by a human" is not just compliance — it's the headline brand promise.**
> The verification gate you asked for (which throttles growth) becomes the marketing *weapon*: in a world of AI tutors and faceless marketplaces, "**every Tonguee teacher is personally reviewed by a real human before they can teach you**" is a trust differentiator competitors can't cheaply copy. We put the verified badge everywhere and tell the story of the review process publicly.

---

## 3. THE THREE PERSONAS & THE TWO-SIDED MARKET

| Persona | Core job-to-be-done | Primary fear | What "win" looks like |
|---------|---------------------|--------------|-----------------------|
| **Learner** | "Actually speak the language and not feel stupid/lonely doing it." | Embarrassment, safety, wasting money | Showed up, spoke, made a friend, wants the next one |
| **Teacher** | "Earn meaningful income sharing my language & culture, on my terms." | Empty calendar, no-shows, unsafe/rude students, slow payouts | Verified fast, booked calendar, paid reliably, great reviews |
| **Admin (you → team)** | "Guarantee quality & safety at scale without drowning." | A bad actor slips through; can't keep up with the queue | Fast, confident verification; zero safety incidents; healthy supply |

**The whole business is a trust exchange.** We verify teachers *for* learners; we protect teachers *from* bad students (two-way ratings, student verification for in-person). Admin is the referee that makes both sides trust the field.

---

## 4. ⭐ THE TRUST & QUALITY ENGINE — Admin + Teacher Verification (THE KEYSTONE — Build #1)

This is your explicit core ask and the biggest gap. Designed in full.

### 4.1 The teacher lifecycle (states)
```
SIGN UP → APPLY (build portfolio) → SUBMITTED → IN REVIEW (admin)
        → ┌─ APPROVED (+ tier) → LIVE → [ongoing quality monitoring]
          ├─ CHANGES REQUESTED → (teacher edits) → SUBMITTED
          └─ REJECTED (with reason) → [can re-apply after cooldown]
   LIVE → FLAGGED → RE-REVIEW → (keep / suspend / ban)
```

A teacher **cannot publish a single experience until `verified = true`.** Enforced in the database (RLS + trigger), not just the UI.

### 4.2 The Teacher Application & Portfolio (replaces the thin `TeacherOnboarding.jsx`)
What we collect (and *why each item builds trust + conversion*):

1. **Identity** — gov ID + selfie liveness (via **Stripe Identity** or **Persona**). *Non-negotiable for in-person.*
2. **Intro video (required, 30–60s)** — the single highest-converting trust asset. Learners book faces, not bios.
3. **Languages & proficiency** (native / C2 / etc.) + **what they teach** + **experience types** + **cities** + **in-person/online**.
4. **Credentials** (optional but boosts tier) — TEFL/CELTA/DELE/DELF/JLPT, degrees — uploaded docs.
5. **Portfolio** — photos of past sessions, a sample lesson/experience outline, social links.
6. **Background check consent** — required for in-person, *mandatory* for any Kids & Teens (see risk §12).
7. **Payout setup** (Stripe Connect Express) — collected on approval.
8. **Agreement** to Community Standards + Safety Policy.

UX: keep the *delightful* swipe/step feel of the current onboarding, but make it a **multi-session, save-as-draft application** with a **completeness meter** ("Your profile is 80% — add a video to stand out ✨").

### 4.3 The Admin Verification Dashboard (`/admin`, all new)
- **Ops overview:** pending applications, SLA timers, flagged content, GMV, supply gaps by city/language ("Paris needs French cooking hosts").
- **Application queue:** filter by status / language / city / tier; sort by wait time; bulk actions.
- **Review screen (the core tool):** video player, document viewer, ID-check result, a **scoring rubric** (language proficiency, professionalism, safety, portfolio quality, uniqueness), **internal notes**, and three actions: **Approve (+ assign tier)** · **Request changes (templated + custom message)** · **Reject (templated reason + custom message)**. Every action emails the applicant automatically.
- **Verification tiers** (shown as profile badges):
  - 🟢 **Verified** — ID + basics passed.
  - 🔵 **Pro** — strong portfolio + credentials.
  - 🟣 **Top Tongue (Elite)** — proven track record + ratings + low cancellation.
- **Post-approval quality monitoring:** auto-flag if rating dips below threshold, slow response, high cancellation, or N reports → routes back to re-review. Suspend / ban / feature controls.
- **Audit log** of every admin action (who/what/when) — accountability + future delegation.
- **Analytics:** approval rate, median time-to-review, applicant→first-experience conversion, supply heatmap.

> ### 🔥 Round-3 Sharpest Insight #3 — **You-as-admin doesn't scale; design the tool for delegation + automation on day one.**
> You will not manually verify 10,000 teachers. Build the admin tool so that (a) **automated checks run first** (ID, liveness, duplicate detection, AI résumé/portfolio screen) and surface a *recommendation*, so a human only adjudicates edge cases; (b) **reviewer roles** can be delegated later (admin vs. reviewer permissions, audit log); (c) the rubric is **structured data** so we can train automation on your decisions over time. The verification gate must be a *fast lane*, not a bottleneck that strangles supply.

### 4.4 Data model additions (`supabase/`)
```sql
-- roles
ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'student'
  CHECK (role IN ('student','teacher','admin'));

-- teacher application + review
CREATE TABLE teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft','submitted','in_review','changes_requested','approved','rejected')),
  tier TEXT CHECK (tier IN ('verified','pro','elite')),
  rubric_scores JSONB DEFAULT '{}',
  admin_notes TEXT,
  decision_reason TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  submitted_at TIMESTAMPTZ, reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE teacher_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES teacher_applications(id) ON DELETE CASCADE,
  doc_type TEXT CHECK (doc_type IN ('id','certification','intro_video','portfolio_image','sample_lesson')),
  url TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE teachers ADD COLUMN tier TEXT,
  ADD COLUMN application_id UUID REFERENCES teacher_applications(id),
  ADD COLUMN status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','active','suspended','banned'));
```
**Storage buckets (private, admin-readable):** `verification-docs` (sensitive IDs), `teacher-portfolio` (videos/images).

**The critical RLS change** — experiences only public when the *teacher is verified AND active*:
```sql
DROP POLICY "Experiences are viewable by everyone" ON experiences;
CREATE POLICY "Public sees only verified-teacher published experiences"
  ON experiences FOR SELECT
  USING (
    (status='published' AND teacher_id IN
      (SELECT id FROM teachers WHERE verified=true AND status='active'))
    OR teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid())
    OR (SELECT role FROM profiles WHERE id=auth.uid()) = 'admin'
  );
-- + admin-can-read-everything policies on applications/documents/teachers
-- + a trigger that blocks INSERT/UPDATE of status='published' unless teacher verified
```

---

## 5. INFORMATION ARCHITECTURE — Every page (the full sitemap)

Legend: ✅ exists & decent · 🟡 exists but placeholder/thin · 🔴 missing (must build)

### Public / Marketing
- ✅ **Home** `/` — dual value prop, needs production polish
- ✅ **Explore** `/explore` — strong filtering already
- ✅ **Experience Detail** `/experience/:id` — needs real booking
- ✅ **Teacher Profile (public)** `/teacher/:id` — needs video + verified badge + availability
- 🟡 **Map View** `/map` — needs Google Maps
- 🟡 **About / How It Works / For Teachers / FAQ / Contact** — need real content
- 🔴 **City × Language SEO landing pages** `/learn/:language/in/:city` — growth engine
- 🔴 **Pricing**, **Trust & Safety**, **Stories/Blog**, **Press**

### Auth / Onboarding
- ✅ **Choose Role / Login / Signup / Forgot / Auth Callback**
- ✅ **Student Onboarding** (swipe) — delightful, keep
- 🟡 **Teacher Onboarding** → becomes the **Application + Portfolio** flow (§4.2)
- 🔴 **Email verification + welcome flow**

### Learner core
- ✅ **Student Dashboard** — home base (streak, next experience, quests)
- ✅ **Student Profile** · ✅ **Games** · ✅ **Character Builder** · ✅ **Shop** · ✅ **Leaderboard**
- ✅ **Favorites / Recently Viewed / Compare** · ✅ **Chat**
- 🔴 **My Bookings / Tickets (QR check-in)**, **Wallet/points history**, **Notifications center**, **Reviews to write**, **Referrals**, **Settings**

### Teacher core
- 🟡 **Teacher Dashboard** — must become real: earnings, calendar, create/manage experiences, bookings, reviews, payouts, messages, **verification status & profile-completeness**
- 🔴 **Create/Edit Experience**, **Availability/Calendar**, **Earnings/Payouts**, **Teacher Analytics**, **Teacher Academy (resources)**, **Student roster**

### Admin (ALL NEW — the keystone, §4)
- 🔴 **Admin Dashboard**, **Applications queue + Review screen**, **Teacher management**, **Experience moderation**, **Review/dispute moderation**, **User management**, **Finance/payouts**, **Analytics**, **CMS (cities/languages/featured)**

### Shared / System
- ✅ **404** · ✅ rich loading/empty/error states (good foundation already)
- 🔴 **Notifications**, **Settings**, **Help Center**, **Legal** (Terms, Privacy, Community Guidelines, Safety)

---

## 6. PAGE-BY-PAGE MASTER UX (purpose · hero moment · creative feature · production gap)

> Format kept tight: each page = its *one job*, its *signature moment*, a *creative value-add*, and the *gap to close*.

**Home** — Job: convert a curious stranger in 5 seconds. Hero: a split "Learn (game) → Live (real café table)" animation showing the Loop. Creative: a live "happening near you this week" ticker + "try a 20-second game right now" inline taste. Gap: clarify the dual model; production polish.

**Explore** — Job: find the perfect experience fast. Hero: gorgeous filterable grid + map toggle. Creative: **"Brave-o-meter"** filter (how far out of comfort zone), "going with a buddy" filter, "this weekend" smart chips. Gap: wire to Supabase, verified-only results.

**Experience Detail** — Job: turn interest into a paid booking. Hero: immersive gallery + teacher intro video + "what you'll learn/say tonight." Creative: **pre-experience warm-up preview** ("you'll practice these 8 phrases"), live spots-left urgency (already have `SpotCounter`), couple/buddy pricing (exists). Gap: real Stripe booking, calendar, QR ticket.

**Teacher Profile (public)** — Job: make a learner trust & choose this human. Hero: video, verified tier badge, ratings, upcoming experiences. Creative: **"languages we'll speak" proficiency bars**, response time, a "message before booking" CTA → Chat. Gap: video, verified badge, availability.

**Map View** — Job: discover by place. Creative: clustered pins, "experiences along a walking route," neighborhood vibes. Gap: Google Maps integration.

**Student Dashboard** — Job: the daily home that pulls them back. Hero: Coco + streak + "your next experience in 3 days — warm up now." Creative: **personalized daily quest tied to your booked class**, "buddy attending with you," progress toward next badge. Gap: wire real data.

**Games** — Job: the daily habit. Creative: speech-recognition pronunciation scoring, "phrases you'll actually use Thursday," head-to-head live duels. Gap: real question bank, scoring.

**Character Builder / Shop** — Job: identity + points sink. Creative: dress up **Coco**; unlock city-themed cosmetics by *attending* experiences there (ties cosmetics to real-world action). Gap: rename from "Duo," connect to points ledger.

**Leaderboard** — Job: status & competition. Creative: **leagues** (weekly promotion/relegation), *separate teacher leaderboard* (Top Tongues). Gap: real data, anti-cheat.

**Chat** — Job: lower the booking barrier; coordinate logistics. Creative: quick-reply phrase suggestions, location sharing (schema supports it), translation toggle. Gap: realtime wiring + moderation.

**Teacher Dashboard** — Job: teacher's command center. Hero: this week's earnings + bookings + calendar. Creative: **profile-completeness & verification status card**, "suggested price for your slot," no-show protection, payout countdown. Gap: build for real (currently thin).

**Create Experience** — Job: list a great experience in <10 min. Creative: AI-assisted description/title, template library by experience type, photo tips, instant "preview as learner." Gap: build; gated behind verification.

**Admin (all)** — §4. Job: guarantee quality & safety, fast. Creative: AI pre-screen recommendation, rubric scoring, supply-gap heatmap. Gap: everything.

**Notifications / Settings / Legal / Help** — Job: trust, control, compliance. Gap: build.

---

## 7. ENGAGEMENT & GAMIFICATION — done right, for BOTH sides

### 7.1 Learner gamification (mostly built — make it *mean* something)
Streaks, XP/points, daily quests, achievements, avatar/shop, leagues already exist in schema. The upgrade: **tie every game mechanic to real-world outcomes.**
- **Pre-experience warm-ups** & **post-experience reinforcement** (the vocabulary you *actually used*).
- **Streak Freeze / "Life happens"** forgiveness (kinder than Duolingo); attending a real experience = mega streak boost.
- **Passport 🛂** — collectible stamps for each city/language/experience type. Visible identity + status.
- **Bravery Challenges** — real-world dares ("order entirely in French tonight") with point + badge rewards and optional photo proof.

### 7.2 🔥 Round-3 Sharpest Insight #4 — **Gamify the TEACHERS too** (nobody does this well)
Uber doesn't make driving fun; Duolingo ignores hosts. Tonguee gamifies *supply quality and retention*:
- **Teacher levels / "Top Tongue" status**, hosting streaks, response-time & reliability badges, quality score.
- **Top-rated teacher leaderboard** (social proof + competition).
- **Milestone payout bonuses** ("host 10 experiences this month → bonus"), early payout perks for elite tiers.
- This *directly* improves the learner experience and reduces the hardest problem in marketplaces: keeping great suppliers engaged.

### 7.3 Creative features that add *true* value (your ask: "fun + valuable")
- **Memory Postcards** — auto-generated shareable recap after each experience (photos, words learned, people met). Emotional retention **+ built-in virality**.
- **Language Buddy matching** — pair same-level learners in the same city to attend *together* (kills the "scary to go alone" fear; pairs with existing couple discount).
- **Live "table" rooms** for online experiences with embedded mini-games.
- **Conversation Cards** a teacher can push to the table mid-experience.
- **"Phrase of the day"** localized to your city / next booking.

---

## 8. THE MONEY SYSTEM

### 8.1 Booking & payments (build in Phase 3)
Select experience → spots/couple/buddy → **Stripe Checkout** → confirmation + calendar invite + **QR ticket** → check-in. Schema already has `stripe_payment_id`, `payment_status`, discount fields — wire them.

### 8.2 Commission & payouts (core revenue)
- **15–20% platform commission** per booking.
- **Teacher payouts via Stripe Connect Express**, released **after experience completion** (escrow-style hold = trust + dispute buffer). Instant-payout option (small fee) as an elite perk.
- Cancellation/refund **policy tiers** (Flexible / Moderate / Strict), Airbnb-style. No-show protection for teachers.

### 8.3 🔥 Round-3 Sharpest Insight #5 — **The unit economics are thin; the loop must create frequency + a second revenue leg.**
At $12–25/experience × ~15–20% = **$2–5 gross per booking**. That cannot fund paid CAC alone. The plan must lean on: **(a) frequency** (the daily game → repeat bookings), **(b) Tonguee Plus subscription** (recurring margin), **(c) online experiences** (higher frequency, zero travel friction), and **(d) group/corporate** (see below). Be honest about this in every financial assumption.

### 8.4 Tonguee Plus (subscription — Phase 6)
Unlimited games/no-ads, **monthly experience credits**, member-only discounts, priority booking, exclusive community events. Recurring revenue smooths the thin per-booking margin.

### 8.5 Surprising revenue legs
- **Corporate / Relocation B2B** — companies buying language experiences for relocating employees & global teams. *Higher ACV, less price-sensitive.*
- **Gift cards** & **referrals** (give-$X/get-$X) — both are also growth loops.
- **Study-abroad / university partnerships.**

---

## 9. TRUST, SAFETY & OPERATIONS (the "Uber" muscle you invoked)

In-person marketplaces live or die on safety. This is not a feature — it's the license to operate.

- **In-person safety:** first sessions in **public venues only**, **"share your plan"** with a friend, in-app **check-in + SOS**, post-experience **"did you feel safe?"** prompt, no-show handling.
- **Two-way ratings & reviews** — teachers rate students too; protects supply.
- **Identity:** teacher ID/liveness at verification; **student verification required for in-person** bookings.
- **Background checks** for in-person; **mandatory** for any Kids & Teens (and see §12 — consider deferring minors entirely at launch).
- **Content moderation:** experience listings reviewed (admin), review moderation, report flows on every entity.
- **Disputes & refunds:** clear policy, escrow hold enables fair resolution, support tiers.
- **Insurance:** host-liability partner for in-person.
- **Community Standards + Code of Conduct**, anti-harassment, age-gating, GDPR/CCPA, data residency.
- **Operational playbooks:** per-city supply seeding, launch-city ops, support SLAs, on-call for safety incidents.

---

## 10. MARKETING & GROWTH ENGINE

### 10.1 Messaging
Lead with **transformation & belonging** (§1), not "learn a language." Hero campaign: **"Don't just learn it. Live it."** Show real faces, real café tables, real first-conversation bravery.

### 10.2 Solve the cold-start: **go deep, not wide**
> ### 🔥 Round-3 Sharpest Insight #6 — **Launch ONE city to density, not ten cities to thinness.**
> A marketplace with 3 experiences in 10 cities is dead; 30 experiences in 1 city is alive. Pick one launch city (or seed demand **online-first** while recruiting local supply), hand-verify a small set of **A+ teachers**, concentrate all demand there, make the magic undeniable, *then* template the playbook to city #2. Resist the urge to look big.

### 10.3 Acquisition loops
- **SEO city×language landing pages** ("Learn French in Paris") — durable, compounding.
- **Organic short-form (TikTok/Reels):** language + travel + *bravery* content performs enormously. Teachers become creators who bring their own audiences.
- **Teacher-led growth:** verified teachers invite their existing students → instant two-sided liquidity.
- **Referrals** + **Memory Postcard sharing** (built-in virality).
- **Partnerships:** universities, study-abroad, expat/relocation, tourism boards, corporate L&D.

### 10.4 Retention
The Loop + streaks + leagues + community + lifecycle email/push. North-star metric in §13.

### 10.5 Launch sequence
Waitlist → closed beta (1 city, ~15–25 hand-picked teachers) → public beta → expand city-by-city with the templated playbook.

---

## 11. PRODUCTION-READINESS — Design system & engineering

- **Brand unification in code:** replace Conversa/Langgie/TongueConnect → **Tonguee**; rename "Duo the Owl" → **Coco**.
- **Fix auth:** `ProtectedRoute` must read `AuthContext` (not the Zustand mock) and gain a **role-aware** variant (`requireRole="admin"`/`"teacher"`).
- **Server state:** migrate marketplace from mock JSON (`src/data/*.json`) to Supabase; adopt **React Query** for fetching/caching.
- **Design system:** tokenize colors/spacing/type (light+dark), document components (already ~30 UI components — a strong base), Storybook.
- **Accessibility:** WCAG AA (good start: `SkipToContent` exists), keyboard nav, ARIA, focus states.
- **Performance:** code-splitting (already lazy-loaded), image optimization/CDN, Core Web Vitals budget.
- **Analytics & events:** funnel instrumentation (signup→onboard→book→attend→repeat), **Sentry** error monitoring, feature flags.
- **Notifications:** email (**Resend**), push (PWA), in-app center.
- **Testing/CI:** unit (Vitest) + e2e (**Playwright**) + CI/CD; lint already configured.
- **Security:** RLS audit, secrets hygiene, rate limiting, input validation, abuse prevention.
- **i18n:** already present (`src/i18n/translations.js`, `LanguageContext`) — extend coverage.
- **PWA now, React Native later.**

---

## 12. CRITICAL PERSPECTIVES — Blind spots & contrarian truths (the "surprise me / be critical" section)

These are the things easy to fall in love with the vision and miss:

1. **Two-product dilution risk.** Being Duolingo *and* Uber can mean being neither. **Mitigation:** the Loop + the discipline rule (game funds the marketplace, never vice-versa).
2. **"Duo the Owl" is an active IP/brand risk** sitting in the repo right now. Fix in Phase 0.
3. **Your quality gate throttles growth by design.** Embrace it as marketing (§2.6) *and* engineer it as a fast lane with automation/delegation (Insight #3), or supply starves.
4. **One safety incident can end the company.** Over-invest in safety *before* scale, not after.
5. **Minors ("Kids & Teens" is in onboarding) carry heavy legal/compliance/safeguarding weight.** Strong recommendation: **defer minors** until adult marketplace is proven; it changes background-check, consent, and liability requirements dramatically.
6. **Thin unit economics** (Insight #5) — don't build a paid-acquisition plan the per-booking margin can't fund.
7. **Trust is asymmetric.** You verify teachers, but to teachers, students are strangers too. Build **two-way trust** (student verification for in-person, two-way ratings) or you'll lose great teachers to one bad student.
8. **Founder-as-admin is a scaling cliff.** Design for delegation + automation from line one (Insight #3).
9. **Worker classification & payments licensing.** Teachers as contractors, KYC, tax (1099/VAT), money-transmission rules — get this right early; it's expensive to retrofit.
10. **Community is the moat *and* the liability.** Belonging can curdle into toxicity without moderation. Fund trust & safety as a first-class function, not an afterthought.
11. **Inclusion gap.** In-person excludes the rural, the disabled, the budget-constrained. **The online layer is the inclusion answer** — frame it that way, not as a fallback.
12. **Don't over-build before liquidity.** The riskiest assumption is "will people show up to a real experience and love it?" Validate that with ~15 teachers in 1 city *before* polishing every page.

---

## 13. NORTH STAR & KPIs (what "production ready" and "winning" mean)

- **North Star:** *Weekly active learners who attended ≥1 real experience in the last 28 days.* (Not DAU on the game — the game is the funnel.)
- **Funnel:** signup → onboarding complete → first booking → **attended** → repeat (28-day repeat rate).
- **Supply health:** verified-teacher count by city/language, % calendars with availability, teacher 28-day retention.
- **Quality/Trust:** median **time-to-verify** (target < 48h), avg experience rating, **safety incidents = 0 tolerance**, dispute rate, NPS.
- **Money:** GMV, take rate, payout reliability, Plus conversion, CAC : LTV.
- **Engagement:** D1/D7/D30 retention, streak distribution, game→booking conversion.

**"Production ready" definition of done:** a learner can sign up → play → discover → book → pay → attend → review; a teacher can apply → upload portfolio → get verified → list → get booked → get paid; **and you (admin) can review and approve/reject every teacher with confidence, with unverified teachers provably unable to go live.**

---

## 14. 🗺️ THE IMPLEMENTATION ROADMAP (executive, sequenced, file-level)

Sequenced to your choice: **Trust & Quality Engine first.** Each phase has a crisp **Definition of Done (DoD)**.

### Phase 0 — Foundation cleanup *(fast; unblocks everything)*
- Unify brand → **Tonguee** across code/docs; rename mascot "Duo the Owl" → **Coco** in `src/data/characters.js`.
- **Fix `src/components/auth/ProtectedRoute.jsx`** to use `AuthContext`; add role-aware guard (`requireRole`).
- Add `role` to `profiles`; create an admin bootstrap (your account → `role='admin'`).
- Add a `useStore`↔`AuthContext` reconciliation (single source of truth for the current user).
- **DoD:** one brand name everywhere; real auth gates routes; you have an admin account.

### Phase 1 — ⭐ Trust & Quality Engine *(the keystone)*
- DB: `teacher_applications`, `teacher_documents`, `teachers.tier/status`, storage buckets, **the verified-only RLS + publish-block trigger** (§4.4).
- Rebuild `TeacherOnboarding.jsx` → **Application + Portfolio** (video, docs, ID, completeness meter), save-as-draft.
- New **Admin** pages + routes: dashboard, application queue, review screen (rubric + approve/request-changes/reject + emails), teacher management, audit log.
- Email notifications on every status change (Resend).
- **DoD:** a teacher applies with a portfolio; you review and approve/reject; **unverified teachers cannot publish** (proven by RLS test); applicant gets notified.

### Phase 2 — Brand identity + master UX pass
- Tokenized design system (light/dark), Coco mascot system, redesign Home / Explore / Experience Detail / Teacher Profile to production quality; verified-tier badges everywhere.
- **DoD:** cohesive, accessible, production-grade core funnel.

### Phase 3 — Booking + payments + payouts (the money loop)
- Migrate marketplace to Supabase (React Query); Stripe Checkout; Stripe Connect payouts w/ completion hold; QR tickets; cancellation tiers.
- **DoD:** end-to-end paid booking → attended → teacher paid.

### Phase 4 — Engagement depth (the Loop)
- Pre/post-experience warm-ups; **teacher gamification**; Passport; Memory Postcards; Buddy matching; real game question bank + pronunciation scoring.
- **DoD:** game→booking and post-experience retention loops live and measured.

### Phase 5 — Trust & Safety + Ops + Notifications
- In-person safety (check-in/SOS/share-plan), two-way ratings, student verification for in-person, moderation/report flows, dispute/refund ops, legal pages.
- **DoD:** safety + moderation + dispute systems operational.

### Phase 6 — Growth engine + Tonguee Plus
- SEO city×language pages, referrals, Memory Postcard sharing, subscription, **launch one city** playbook.
- **DoD:** repeatable acquisition + recurring revenue + 1 city live to density.

### Phase 7 — Scale & harden
- Analytics/Sentry/flags, e2e tests + CI/CD, performance budget, PWA, RLS/security audit, delegation/automation for verification.
- **DoD:** observable, tested, secure, ready to template to city #2.

### Critical files to create / modify (representative, not exhaustive)
- **DB/RLS:** `supabase/schema.sql`, `supabase/langgie-extensions.sql` (+ a new `supabase/trust-engine.sql`).
- **Auth/roles:** `src/components/auth/ProtectedRoute.jsx`, `src/contexts/AuthContext.jsx`, `src/store/useStore.js`.
- **Routing:** `src/lib/routes.jsx` (add `/admin/*`, teacher application, booking, bookings/tickets).
- **Teacher app:** `src/pages/TeacherOnboarding.jsx` → application flow; new `src/pages/teacher/*` (dashboard, create-experience, payouts).
- **Admin (new):** `src/pages/admin/*` (Dashboard, Applications, Review, Teachers, Moderation, Finance, Analytics) + `src/contexts/AdminContext` as needed.
- **Brand:** `src/data/characters.js` (Coco), `tailwind.config.js` (tokens), `Header`/`Footer`, `index.html`, all docs.
- **Marketplace data:** replace `src/data/*.json` reads with Supabase queries + React Query.

### How we'll verify (end-to-end)
1. **RLS proof (most important):** create an unverified teacher, attempt to publish an experience → must be blocked at the DB; verify via admin → now publishable & publicly visible. (SQL test + UI test.)
2. **Admin flow:** submit a test application with portfolio → appears in queue → approve/reject → applicant email fires → tier badge shows on profile.
3. **Auth:** confirm `/admin` is reachable only by `role='admin'`; teacher routes only by teachers; protected routes redirect anonymous users.
4. **Booking loop (Phase 3):** Stripe **test mode** end-to-end; payout released only after completion.
5. **Run app:** `npm run dev`; smoke-test the funnel; `npm run lint`; add Playwright e2e for the verification + booking happy paths.

---

## 15. IMMEDIATE NEXT STEPS (once you approve)
1. **Phase 0 + Phase 1** start together: unify brand, fix auth/roles, then build the **Admin + Teacher Verification engine** (your #1).
2. Stand up your **admin account** and the **application→review→approve/reject** flow with the **verified-only publish gate** as the first shippable milestone.
3. In parallel, lock the **Coco** mascot and the **"Don't just learn it. Live it."** hero brand so Phase 2 UX has a north star.

> This blueprint is intentionally comprehensive (your ask), but the *sequence* keeps us honest: **prove quality control and the real-experience magic in one city before scaling anything.** Everything else compounds on that.
