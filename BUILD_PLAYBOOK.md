# 🛠️ TONGUEE — BUILD PLAYBOOK (model-routed, for a fresh Sonnet 4.6 chat)

> **Purpose:** an execution guide a brand-new chat can open and run with **Sonnet 4.6**, escalating to **Opus 4.8** only where design/architecture/taste lives. Optimized for tokens: default to Sonnet, pay for Opus only where it changes the outcome.
>
> **The full "why" lives in `VISION.md`** (same repo). This doc is the "how + who builds what."

---

## 0. The one rule that saves the most tokens

> **Opus designs the spec → Sonnet builds to the spec.**
> When a task needs taste or an irreversible decision (visual system, page layout, data model, payments/escrow, security), use **Opus 4.8** to produce a short written **spec artifact** (a `.md`). Then a fresh **Sonnet 4.6** chat implements that spec mechanically. Never make Opus hand-write boilerplate; never make Sonnet invent architecture or visual identity.

## 1. Model routing rubric (Balanced)

| Tag | Model · thinking | Use for |
|-----|------------------|---------|
| 🟦 **S·lo** | Sonnet 4.6, normal | Mechanical, single-file, fully specified: CRUD pages, forms, list/detail, copy, static/legal/marketing pages, lint/test fixes, renames, wiring a documented lib. |
| 🟦 **S·hi** | Sonnet 4.6, extended thinking | Multi-file features & integrations where the design is settled but correctness matters: Supabase migrations from a spec, Stripe wiring, mock-JSON→Supabase migration, notifications, e2e tests. |
| 🟪 **O·hi** | Opus 4.8, high/max | Produces a spec, doesn't implement: visual design system & page layouts, data-model/architecture for a new domain, payments/escrow/refund modeling, security/RLS design & audits, pricing/subscription strategy, any ambiguous tradeoff. |
| 🟪 **O-review** | Opus 4.8, high | Spot-review ONLY of money + security PRs before merge (Balanced setting). Everything else Sonnet self-reviews via `/code-review`. |

**Escalation test (when unsure):** *Does this need taste, novel architecture, or an irreversible/security/money decision?* If no → Sonnet. If yes → Opus writes the spec first.

## 2. Token-efficiency operating rules (for the implementing chat)

- Read `BUILD_PLAYBOOK.md` + `VISION.md` + only the **files named in the task**. Do **not** re-explore the whole repo.
- **Reuse, don't reinvent.** Components: `src/components/ui/*` (Button, Card, Badge, Input, Select, Avatar, Toast, Skeleton…). Utils: `src/utils/cn.js`, `date.js`, `helpers.js`. Data libs already built: `src/lib/admin.js`, `src/lib/teacherApplications.js`. Auth: `src/contexts/AuthContext.jsx` (`useAuth`). DB client: `src/lib/supabase.js`.
- Match existing patterns: Tailwind utility classes with `dark:` variants, `cn()` merges, `framer-motion` for animation, `lucide-react` icons, lazy routes in `src/lib/routes.jsx`, guard with `ProtectedRoute` (`requireRole`).
- Batch independent tool calls in one message. Build/lint **once per task**, not after every edit (`npm run build`, `npm run lint`).
- Keep diffs minimal and scoped to the task; one PR per phase (or per large task).

## 3. Stack & conventions (fixed — don't change without a reason)
React 19 · Vite · Tailwind v3 · Supabase (Postgres + Auth + Storage) · React Router v7 (lazy) · Zustand · framer-motion · lucide-react. Dark mode via `ThemeContext`; i18n via `src/i18n/translations.js` + `LanguageContext`. Brand = **Tonguee**, mascot = **Coco the Chameleon**, palette coral `#FF6B35` + teal `#20B2AA`, Poppins (display) + Inter (body).

## 4. ✅ Already shipped (PR #5 — do NOT rebuild)
Trust & Quality Engine foundation: `supabase/trust-engine.sql` (admin role, `teacher_applications`, `teacher_documents`, `admin_audit_log`, private buckets, **verified-only publish gate** via RLS + trigger). Admin UI: `src/pages/admin/AdminDashboard.jsx`, `ApplicationReview.jsx`. Teacher flow: `src/pages/TeacherOnboarding.jsx` now submits an application; `src/pages/teacher/TeacherApplicationStatus.jsx` (portfolio upload + completeness). Security: `ProtectedRoute` uses real auth + `requireRole`. Brand unified → Tonguee; mascot → Coco; ESLint `react/jsx-uses-vars` fix. `VISION.md` committed.

**⚠️ One manual step (you, in Supabase) before admin works:** run `schema.sql` → `langgie-extensions.sql` → `trust-engine.sql`, then `UPDATE profiles SET role='admin' WHERE email='<your email>';`

---

## 5. THE BUILD — phased, model-tagged

> Near-term phases (A–C) are written as ready-to-execute task lists. Later phases (D–G) are outlines to expand when reached. Each phase = one PR; finish with `/code-review` (Sonnet) and, for 🟪 money/security items, an Opus spot-review.

### Phase A — Finish the Trust Engine  *(mostly Sonnet)*
**Goal:** the verification loop is complete and teachers/learners feel it. **DoD:** applicants get emailed on every status change; admin can suspend/feature teachers and read the audit log; verified-tier badges show on teacher surfaces.

| # | Task | Tag | Files / notes |
|---|------|-----|---------------|
| A1 | Email on application status change (submit/approve/changes/reject) via **Resend** in a Supabase Edge Function triggered from `admin.js` decisions | 🟦 S·hi | new `supabase/functions/notify-applicant/`; call from `src/lib/admin.js` approve/reject/requestChanges |
| A2 | Admin **Teacher Management** page: list teachers, suspend/ban/feature, set tier | 🟦 S·lo | new `src/pages/admin/Teachers.jsx`; reuse `admin.js` patterns + `is_admin` RLS |
| A3 | Admin **Audit Log** viewer | 🟦 S·lo | new `src/pages/admin/AuditLog.jsx` reading `admin_audit_log` |
| A4 | Verified-tier **badges** on `TeacherCard` + `TeacherProfilePage` (🟢 Verified / 🔵 Pro / 🟣 Elite) | 🟦 S·lo | `src/components/features/TeacherCard.jsx`, `src/pages/TeacherProfilePage.jsx` |
| A5 | Add the new admin routes | 🟦 S·lo | `src/lib/routes.jsx` (`requireRole="admin"`) |

**Kickoff prompt (paste into a new Sonnet 4.6 chat):**
> "Read `BUILD_PLAYBOOK.md` Phase A and `src/lib/admin.js`. Implement tasks A1–A5 exactly as specified, reusing existing UI components and the `is_admin()` RLS. One PR. Run `npm run build` + `/code-review` before finishing. Don't touch the already-shipped files except as listed."

### Phase B — Brand identity + master UX  *(Opus designs → Sonnet builds)*
**Goal:** production-grade, cohesive core funnel. **DoD:** Home, Explore, Experience Detail, Teacher Profile rebuilt to the Opus spec; design tokens applied; WCAG AA; light+dark.

- **B0 — DESIGN (🟪 O·hi, ✅ done):** `DESIGN_SYSTEM.md` (tokens, a11y, components, hero-page specs) + `DESIGN_EXECUTION_PLAN.md` (creative concept, component library, gamification language, page-by-page specs for **every** remaining screen, batched DP1–DP10).
- **B1 (🟦 S·hi):** apply tokens to `tailwind.config.js`; align `src/components/ui/*` to spec.
- **B2 (🟦 S·hi):** rebuild `HomePage`, `ExplorePage`, `ExperienceDetailPage`, `TeacherProfilePage` to the B0 layout specs.
- **B3 (🟦 S·lo):** accessibility pass (focus states, ARIA, keyboard) — `SkipToContent` already exists.
- **B4+ (🟦):** execute `DESIGN_EXECUTION_PLAN.md` batches **DP1–DP10** in order (global shell → component library → gamification → learner → teacher → admin → marketing → auth → delight moments → QA sweep). One DP = one PR; kickoff prompt in that doc §10.

**Kickoff (Sonnet, after B0 spec exists):** "Read `DESIGN_SYSTEM.md` + Phase B. Implement B1–B3 to match the spec pixel-intent; reuse components; build + `/code-review`."

### Phase C — Booking + payments + payouts  *(Opus architects money → Sonnet wires)*
**Goal:** end-to-end paid booking and teacher payout. **DoD:** test-mode Stripe booking → attended → payout; cancellation tiers; QR ticket.

- **C0 — ARCHITECTURE (🟪 O·hi, do first):** Opus writes `PAYMENTS_SPEC.md` = Stripe Checkout + Connect Express flow, escrow/payout-hold-until-completion, refund/cancellation tiers, the booking/payout data model, and edge-function endpoints. **(Opus spot-reviews the final PR.)**
- **C1 (🟦 S·hi):** migrate marketplace off mock JSON (`src/data/experiences.json`, `teachers.json`) to Supabase queries + **React Query** (add dep).
- **C2 (🟦 S·hi):** Stripe Checkout booking flow (reuse schema's `stripe_payment_id`, `payment_status`, discount fields) — `ExperienceDetailPage` + new `BookingPage`/`MyBookings`.
- **C3 (🟦 S·hi):** Stripe Connect Express payouts + completion hold (edge functions).
- **C4 (🟦 S·lo):** QR ticket + check-in; cancellation-tier UI.

**Kickoff (Sonnet, after C0):** "Read `PAYMENTS_SPEC.md` + Phase C. Implement C1–C4 in Stripe **test mode**; follow the spec's data model exactly; flag anything ambiguous instead of guessing. Build + `/code-review`; request Opus review before merge."

### Phase D — Engagement depth *(outline — expand when reached)*
🟪 O·hi specs: warm-up/loop UX, **teacher gamification** model, Passport, Memory-Postcard generator, Buddy-matching UX. 🟦 S·hi/S·lo implement: game question bank wiring, points/streak ledger, teacher stats, Passport page, postcard generator, buddy matching. **DoD:** game→booking + post-experience loops live and measured.

### Phase E — Trust & Safety + Ops + Notifications *(outline)*
🟪 O·hi specs: safety flows (check-in/SOS/share-plan), dispute/refund flow, moderation taxonomy (safety architecture = Opus). 🟦 S·hi implement: two-way ratings, student verification for in-person, report flows, notifications center, settings, legal pages. **DoD:** safety + moderation + disputes operational.

### Phase F — Growth + Tonguee Plus *(outline)*
🟪 O·hi: subscription packaging/pricing, SEO landing-page template design, referral mechanics. 🟦 S·lo/S·hi implement: city×language SEO pages (templated), referrals, Memory-Postcard sharing, Stripe subscription, launch-one-city config. **DoD:** acquisition + recurring revenue + 1 city live to density.

### Phase G — Scale & harden *(outline)*
🟦 S·hi: analytics events + Sentry + feature flags, Vitest unit + Playwright e2e, CI/CD, perf budget, PWA. 🟪 O·hi: the RLS/security audit review (judgment). **DoD:** observable, tested, secure, ready to template city #2.

---

## 6. Definition of done (the whole product)
A learner can sign up → play → discover → book → pay → attend → review; a teacher can apply → upload portfolio → get verified → list → get booked → get paid; and **you (admin) can approve/reject every teacher, with unverified teachers provably unable to go live.**
