# 👅 Tonguee

**Learn languages through real experiences with local teachers in cities around the world.**

Tonguee connects language learners with local teachers for small group (4-6 people) experiences in authentic settings like cafés, markets, walking tours, and cultural activities. The brand is Tonguee; the mascot is Coco the Chameleon (🦎).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## ✨ Features

- 🏠 **Hero homepage** with featured experiences and animated stats
- 🔍 **Explore** with search & filtering by language, city, skill level, and price
- 🗺️ **Experience marketplace** with teacher profiles, reviews, and gamification loop
- 🔐 **Auth** (Supabase Auth) with student & teacher onboarding
- 🛡️ **Trust Engine** — verified-only teacher publishing (database-enforced), tiered verification (Verified / Pro / Top Tongue), application review queue, admin audit log
- 👤 **Admin panel** — users, teachers, experiences, bookings, reviews, revenue, audit log
- 🎮 **Gamification** — points, badges, leaderboard, character builder, shop
- 📘 **Passport** — track your learning journey
- 🌓 **Dark mode**, i18n, accessibility (keyboard + reduced-motion), fully responsive
- ⚖️ **Legal pages** — terms, privacy, cookies

## 📚 Documentation

- **`AGENTS.md`** — operating contract for contributors and agents (read first)
- **`BUILD_PLAYBOOK.md`** — what to build, in order
- **`VISION.md`** — why the product exists
- **`DESIGN_SYSTEM.md`** — design tokens, accessibility, hero pages
- **`DESIGN_EXECUTION_PLAN.md`** — how every screen looks, moves, feels
- **`PAYMENTS_SPEC.md`** — money, bookings, payouts, refunds (Phase C, not yet merged)

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v7 (lazy routes in `src/lib/routes.jsx`)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Supabase (Postgres + RLS + Edge Functions)
- **Date Handling:** date-fns

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

All other secrets live only in Supabase function config — never in git, never in client code.

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/        # Admin panel layout, charts, pager
│   ├── auth/         # ProtectedRoute, AdminRoute
│   ├── features/     # ExperienceCard, TeacherCard
│   ├── layout/       # Header, Footer, Layout
│   └── ui/           # Button, Card, Badge, Input, etc.
├── data/             # Seed data
├── i18n/             # Translations
├── pages/            # Route pages (incl. pages/admin/*)
├── store/            # Zustand state management
├── utils/            # Helper functions (cn, formatters)
└── lib/              # Config, routes, Supabase clients, data layers
supabase/
├── schema.sql            # Base schema (append-only)
├── trust-engine.sql      # Trust Engine: verified gate, RLS, audit log
├── admin-panel.sql       # Admin panel RLS (append-only)
└── langgie-extensions.sql # Extensions (append-only)
```

## 🎨 Design System

- **Primary:** Coral Orange (#FF6B35) — CTAs
- **Secondary:** Teal (#20B2AA) — trust, links, money
- **Gold (#FFB020):** gamification only
- **Typography:** Poppins (headings), Inter (body)
- Dark mode is the `class` strategy via `ThemeContext` — style with `dark:` variants.

## 🚀 Deployment

1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add the environment variables above
4. Apply the SQL files in `supabase/` (in order) to your Supabase project
5. Deploy!

## 📄 License

MIT License - see LICENSE file for details

---

**Learn a language. Make friends. Experience the world.** 🌍✨
