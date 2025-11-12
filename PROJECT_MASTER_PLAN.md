# TongueConnect - Project Master Plan

**Last Updated:** 2025-11-12
**Status:** MVP Development - Authentication & Database Setup Phase
**Version:** 0.2.0

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Core Architecture](#core-architecture)
3. [Feature Roadmap](#feature-roadmap)
4. [Current State](#current-state)
5. [Database Schema](#database-schema)
6. [File Structure](#file-structure)
7. [Development Guidelines](#development-guidelines)
8. [Known Issues & Technical Debt](#known-issues--technical-debt)
9. [Change Log](#change-log)

---

## 🎯 Project Overview

### What We're Building

**TongueConnect** is a platform that connects language learners with local native speakers for immersive cultural experiences in cities worldwide. Think "Airbnb Experiences meets language learning."

### Core Value Proposition

- **For Students:** Book unique language learning experiences (cooking classes, walking tours, workshops) taught by native speakers
- **For Teachers:** Monetize language skills by creating and hosting cultural experiences
- **Key Differentiator:** Focus on immersive, location-based experiences rather than traditional online tutoring

### Target Users

1. **Language Learners** (Primary)
   - Travelers wanting to learn while experiencing culture
   - Local students seeking immersive practice
   - Looking for experiences in: French, Spanish, Italian, Portuguese, Japanese, Korean, Mandarin, Arabic, German

2. **Native Speaker Teachers** (Secondary)
   - Locals who want to share their culture and language
   - Earn money hosting experiences in their city
   - Verified through certification/experience checks

### Business Model

- Commission on bookings (Stripe integration planned)
- Teacher verification fees (future)
- Premium listings (future)

---

## 🏗️ Core Architecture

### Tech Stack

**Frontend:**
- React 18.3+ (Vite for build/dev)
- React Router 7.1+ (client-side routing)
- TailwindCSS 3.4+ (styling)
- Framer Motion 11+ (animations)
- Lucide React (icons)

**Backend:**
- Supabase (Auth + PostgreSQL database)
- Row Level Security (RLS) for data access control
- Auto-profile creation via database triggers

**State Management:**
- React Context (AuthContext for user/profile state)
- Zustand (for teacher dashboard local state)
- No Redux - keeping it simple for MVP

**Deployment:**
- Frontend: Vercel (auto-deploy from GitHub)
- Database: Supabase Cloud
- Environment: Uses `.env` for local, Vercel env vars for production

### Key Architecture Decisions

1. **Authentication Pattern:**
   - Supabase Auth handles all auth flows
   - AuthContext provides `user`, `profile`, and auth methods to entire app
   - Protected routes use `<ProtectedRoute>` wrapper component
   - Profile auto-created on signup via database trigger

2. **Data Flow:**
   ```
   User Action → Component → Auth Context → Supabase Client → PostgreSQL
                                                            ↓
                                                    RLS Policies Check
                                                            ↓
                                                    Return Filtered Data
   ```

3. **Routing Strategy:**
   - Lazy-loaded pages for better performance
   - Protected routes wrap authenticated pages
   - Suspense fallback shows loading spinner

4. **Styling Approach:**
   - Utility-first with Tailwind
   - Reusable UI components in `/src/components/ui/`
   - Custom colors defined in `tailwind.config.js`
   - Responsive mobile-first design

---

## 🗺️ Feature Roadmap

### ✅ Phase 0: Foundation (COMPLETED)

- [x] Project scaffolding (Vite + React)
- [x] Routing setup (React Router)
- [x] UI component library (Button, Card, Input, Badge, Avatar, etc.)
- [x] Design system (Tailwind config, colors, fonts)
- [x] Mock data structure (JSON files in `/src/data/`)

### ✅ Phase 1: Authentication (COMPLETED)

- [x] Supabase client setup (`src/lib/supabase.js`)
- [x] AuthContext implementation (`src/contexts/AuthContext.jsx`)
- [x] Login page with email/password + Google OAuth
- [x] Signup page with validation
- [x] Password reset flow
- [x] Protected routes (`src/components/auth/ProtectedRoute.jsx`)
- [x] User dropdown menu in Header
- [x] Sign out functionality
- [x] OAuth callback handler

### ✅ Phase 2: Database Setup (COMPLETED)

- [x] Database schema design (`supabase/schema.sql`)
- [x] Tables: profiles, teachers, experiences, bookings, reviews, user_badges
- [x] Row Level Security (RLS) policies
- [x] Auto-profile creation trigger
- [x] Indexes for performance
- [x] Clean install script (`supabase/clean-schema.sql`)

### ✅ Phase 3: Profile Pages (COMPLETED)

- [x] Student profile page connected to Supabase
- [x] Gamification system (points, levels, badges)
- [x] Safe fallbacks for missing data
- [x] Support both snake_case (DB) and camelCase (mock) fields
- [x] Loading states

### 🚧 Phase 4: Core Features (IN PROGRESS)

- [ ] Connect Explore page to Supabase
- [ ] Experience detail page with real data
- [ ] Teacher profile pages with real data
- [ ] Booking flow (create booking records)
- [ ] Teacher dashboard connected to Supabase
- [ ] Create/edit/delete experiences (teachers only)

### 📅 Phase 5: Interactive Map (PLANNED)

**Status:** Placeholder exists, needs implementation

- [ ] Choose map library (Recommendation: Leaflet - free, no API key needed)
- [ ] Display experiences as pins on map
- [ ] Cluster pins for same location
- [ ] Click pin to view experience details
- [ ] Filter by language/price/date
- [ ] City boundary highlighting

**File to update:** `src/pages/MapViewPage.jsx` (currently shows placeholder)

### 📅 Phase 6: Admin Dashboard (PLANNED)

**Two options discussed:**

**Option A: Teacher Dashboard Enhancement**
- Connect existing teacher dashboard to Supabase
- Teachers manage their own experiences
- Analytics on bookings/earnings

**Option B: Full Admin Dashboard**
- Manage all users (students + teachers)
- Approve/reject teacher applications
- Moderate experiences and reviews
- Platform-wide analytics
- Payout management

**Recommendation:** Start with Option A, build Option B later

### 📅 Phase 7: Payments (PLANNED)

- [ ] Stripe integration
- [ ] Checkout flow
- [ ] Payment confirmation emails
- [ ] Booking management (cancel, refund)
- [ ] Teacher payouts

### 📅 Phase 8: Advanced Features (FUTURE)

- [ ] Real-time chat (student ↔ teacher)
- [ ] Review system with images
- [ ] Teacher verification workflow
- [ ] Email notifications (Supabase Email Templates)
- [ ] Multi-language support (i18n)
- [ ] Google Maps API integration for locations
- [ ] Image uploads (Cloudinary or Supabase Storage)

---

## 📊 Current State

### What Works Now (As of 2025-11-12)

✅ **Authentication:**
- Users can sign up with email/password
- Users can log in
- Google OAuth configured (needs OAuth credentials to enable)
- Sign out works properly
- Protected routes redirect to login

✅ **Pages:**
- Home page (marketing)
- Explore page (shows mock experiences from JSON)
- Experience detail pages (mock data)
- Teacher profile pages (mock data)
- Student profile page (connected to Supabase)
- Teacher dashboard (mock data, not connected to DB yet)
- Map view (placeholder, shows city grid)
- About, How It Works, FAQ, Contact pages

✅ **Database:**
- Schema designed and ready to deploy
- Clean install script available (`supabase/clean-schema.sql`)
- RLS policies configured
- Auto-profile creation on signup

### What's In Progress

🚧 **Database Migration:**
- Need to run `supabase/clean-schema.sql` in Supabase SQL Editor
- This will create all tables and enable auto-profile creation
- After running, test signup flow to ensure profiles are created

🚧 **Vercel Deployment:**
- Code is deployed but needs environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Add these in Vercel dashboard, then redeploy

### What Doesn't Work Yet

❌ **Data Integration:**
- Most pages still use mock JSON data instead of Supabase
- Need to create API hooks for fetching from Supabase
- Teacher dashboard not connected to real data

❌ **Booking System:**
- Can't actually book experiences yet
- No payment integration
- No booking confirmation flow

❌ **Teacher Features:**
- Can't create experiences (only mock form exists)
- Teacher verification not implemented
- No teacher application flow

❌ **Map:**
- Just a placeholder
- No interactive map library integrated

---

## 🗄️ Database Schema

### Tables Overview

**Core Tables:**
1. `profiles` - Extends Supabase auth.users, stores student data
2. `teachers` - Teacher-specific info (references profiles)
3. `experiences` - Language experiences created by teachers
4. `bookings` - Student bookings of experiences
5. `reviews` - Reviews of experiences by students
6. `user_badges` - Gamification badges earned by users

### Key Relationships

```
auth.users (Supabase Auth)
    ↓ (1:1, auto-created via trigger)
profiles (id references auth.users.id)
    ↓ (1:1, optional)
teachers (user_id references profiles.id)
    ↓ (1:many)
experiences (teacher_id references teachers.id)
    ↓ (many:many via bookings)
profiles (student_id references profiles.id)
```

### Field Naming Convention

**Database (PostgreSQL):** snake_case
- `member_since`, `languages_learning`, `is_teacher`

**Frontend (JavaScript):** Handled flexibly
- Code supports both snake_case and camelCase for compatibility
- Example: `student.member_since || student.memberSince`

### Important: Schema Deployment

**To deploy database schema:**

1. Go to: https://app.supabase.com/project/ybhecubqnhukgpvchjay/sql/new
2. Copy entire contents of `supabase/clean-schema.sql`
3. Paste and click **RUN**
4. Verify success message appears
5. Check tables in Table Editor

**Why use clean-schema.sql?**
- Drops existing tables safely (in correct order)
- Recreates everything fresh
- Fixes any schema errors from partial runs

### Row Level Security (RLS)

All tables have RLS enabled. Key policies:

- **profiles:** Anyone can read, users can update their own
- **teachers:** Public read, teachers update their own
- **experiences:** Public can see published, teachers manage their own
- **bookings:** Users see only their own bookings
- **reviews:** Public read, users create/edit their own

---

## 📁 File Structure

### Key Directories

```
/src
  /components
    /auth              - ProtectedRoute wrapper
    /features          - ExperienceCard, TeacherCard, etc.
    /layout            - Header, Footer, Layout
    /ui                - Reusable components (Button, Card, Input, etc.)
  /contexts
    AuthContext.jsx    - User authentication state (⚠️ CRITICAL)
  /data
    *.json             - Mock data (temporary, will migrate to Supabase)
    constants.js       - CITIES, LANGUAGES, BADGE_DEFINITIONS, etc.
  /lib
    routes.jsx         - React Router configuration
    supabase.js        - Supabase client setup (⚠️ CRITICAL)
  /pages               - All page components (lazy loaded)
  /store
    useStore.js        - Zustand store (teacher dashboard state)
  /utils
    date.js            - Date formatting
    helpers.js         - Utility functions

/supabase
  schema.sql           - Original schema (may have issues if run multiple times)
  clean-schema.sql     - Clean install version (⚠️ USE THIS)

/public                - Static assets (images, icons)

Root files:
  .env                 - Local environment variables (⚠️ NEVER COMMIT)
  .gitignore           - Excludes .env, node_modules, etc.
  package.json         - Dependencies
  tailwind.config.js   - Tailwind customization
  vite.config.js       - Vite build config
```

### Critical Files (Don't Break These!)

**Authentication & Data:**
- `src/lib/supabase.js` - Supabase client initialization
- `src/contexts/AuthContext.jsx` - Auth state management
- `.env` - Environment variables (LOCAL ONLY)

**Routing:**
- `src/lib/routes.jsx` - Route configuration
- `src/components/auth/ProtectedRoute.jsx` - Auth guard

**Layout:**
- `src/components/layout/Header.jsx` - Navigation & user menu
- `src/components/layout/Layout.jsx` - Page wrapper with Header/Footer

**Database:**
- `supabase/clean-schema.sql` - Schema deployment script

---

## 📐 Development Guidelines

### Code Style

**React Components:**
- Functional components only (no class components)
- Use hooks (useState, useEffect, useContext, custom hooks)
- PropTypes not used (consider TypeScript for future)
- Named exports for components

**Naming Conventions:**
- Components: PascalCase (`StudentProfilePage`, `Button`)
- Files: Match component name (`StudentProfilePage.jsx`)
- Hooks: camelCase with `use` prefix (`useAuth`, `useStore`)
- Constants: UPPER_SNAKE_CASE (`BADGE_DEFINITIONS`)
- Functions: camelCase (`formatPrice`, `handleSignOut`)

**File Organization:**
- One component per file
- Group related components in directories
- Keep files under 500 lines (split if larger)
- Co-locate tests with components (future)

### Supabase Patterns

**Fetching Data:**
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

if (error) throw error;
```

**Inserting Data:**
```javascript
const { data, error } = await supabase
  .from('profiles')
  .insert({ id: user.id, name: 'John' })
  .select()
  .single();
```

**Updating Data:**
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update({ points: 100 })
  .eq('id', userId)
  .select()
  .single();
```

**Always:**
- Check for errors
- Use `.select()` after insert/update to get returned data
- Use RLS policies - never bypass with service role key in frontend

### Error Handling

**Pattern for async operations:**
```javascript
try {
  const { data, error } = await supabaseOperation();
  if (error) throw error;
  return { data, error: null };
} catch (error) {
  console.error('Context for error:', error);
  return { data: null, error };
}
```

**User-facing errors:**
- Show user-friendly messages
- Log detailed errors to console
- Never expose database structure in error messages

### Environment Variables

**Required variables (in `.env`):**
```
VITE_SUPABASE_URL=https://ybhecubqnhukgpvchjay.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Access in code:**
```javascript
const url = import.meta.env.VITE_SUPABASE_URL;
```

**Security:**
- Never commit `.env` to git (already in `.gitignore`)
- Only use `VITE_` prefix for variables exposed to client
- Use service role key ONLY in backend (not implemented yet)
- Anon key is safe for frontend (protected by RLS)

### Component Props

**Prefer destructuring:**
```javascript
// Good
function Button({ variant, size, children, onClick }) {
  // ...
}

// Avoid
function Button(props) {
  const { variant, size } = props;
  // ...
}
```

**Default props:**
```javascript
function Button({ variant = 'primary', size = 'md', children }) {
  // variant and size will have defaults if not provided
}
```

### Styling Guidelines

**Tailwind best practices:**
- Use utility classes directly in JSX
- Extract repeated patterns into components
- Use custom colors from `tailwind.config.js`
- Responsive: mobile-first with `sm:`, `md:`, `lg:` prefixes

**Example:**
```javascript
<button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600
                   transition-colors md:px-6 md:py-3">
  Click Me
</button>
```

**Avoid:**
- Inline styles (use Tailwind instead)
- CSS modules (not set up)
- Global CSS (except `index.css` for base styles)

---

## ⚠️ Known Issues & Technical Debt

### High Priority

1. **Database Not Deployed**
   - Schema exists but needs to be run in Supabase
   - Blocks: signup flow, profile creation, all real data
   - Fix: Run `supabase/clean-schema.sql`

2. **Most Pages Use Mock Data**
   - Only StudentProfilePage connected to Supabase
   - Need to create hooks for fetching experiences, teachers, bookings
   - Blocks: Real user experience, testing

3. **No Error Boundaries**
   - App crashes show blank screen
   - Need to add React error boundaries
   - Especially important for production

### Medium Priority

4. **No Loading States on Some Pages**
   - Some pages don't show loading spinners during data fetch
   - Creates poor UX
   - Fix: Add loading states consistently

5. **Teacher Dashboard Not Connected**
   - Uses Zustand for local state only
   - Can't actually create experiences in database
   - Need to wire up to Supabase

6. **No Input Validation on Forms**
   - Client-side validation exists but inconsistent
   - No server-side validation (rely on DB constraints)
   - Could lead to confusing errors

### Low Priority

7. **Map Feature is Placeholder**
   - Just shows "Coming Soon"
   - Need to choose and integrate map library

8. **No TypeScript**
   - Using plain JavaScript
   - Lots of potential runtime errors
   - Consider migrating for better DX

9. **No Testing**
   - No unit tests, integration tests, or E2E tests
   - Risky for production
   - Add tests before public launch

10. **Mobile Menu Doesn't Close on Navigation**
    - Minor UX issue
    - Fixed for sign out, but check other nav items

### Technical Debt

- **Data normalization:** Some denormalized data (e.g., teacher info duplicated)
- **Image hosting:** No image upload system yet (using URLs in JSON)
- **API layer:** Direct Supabase calls in components (consider abstracting)
- **State management:** Mix of Context + Zustand could be simplified
- **Bundle size:** Not optimized, some large dependencies

---

## 📝 Change Log

### 2025-11-12 - Authentication & Profile Fixes

**Added:**
- Clean database schema (`supabase/clean-schema.sql`) with DROP statements
- Support for both snake_case and camelCase field names in StudentProfilePage
- Loading state in StudentProfilePage while profile loads
- Error handling for sign out functionality
- PROJECT_MASTER_PLAN.md (this file)

**Fixed:**
- StudentProfilePage now connects to Supabase AuthContext
- "Cannot read properties of undefined (reading 'flag')" error in profile page
- Safe fallbacks for missing profile data (languages_learning, stats, badges, etc.)
- Sign out button now properly closes menus and redirects
- Profile page handles empty arrays gracefully

**Changed:**
- StudentProfilePage now uses `useAuth()` hook instead of mock data
- Sign out handler in Header.jsx simplified and improved
- Improved error messages for auth operations

**Files Modified:**
- `src/pages/StudentProfilePage.jsx` - Connected to Supabase, added safe fallbacks
- `src/components/layout/Header.jsx` - Fixed sign out functionality
- `supabase/clean-schema.sql` - New file for clean database installation

**Migration Notes:**
- Run `supabase/clean-schema.sql` in Supabase SQL Editor to set up database
- Existing users will need to be deleted and re-created after schema run
- Update Vercel environment variables for production deployment

### 2025-11-11 - Initial Database Setup

**Added:**
- Supabase client configuration (`src/lib/supabase.js`)
- AuthContext for authentication state management
- Login, Signup, Forgot Password pages
- OAuth callback handler
- Protected route wrapper component
- Database schema (`supabase/schema.sql`)
- Auto-profile creation trigger
- Row Level Security policies

**Changed:**
- Header now shows user dropdown when authenticated
- Routes now use ProtectedRoute for /profile and /dashboard

**Files Added:**
- `src/lib/supabase.js`
- `src/contexts/AuthContext.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/SignupPage.jsx`
- `src/pages/ForgotPasswordPage.jsx`
- `src/pages/AuthCallbackPage.jsx`
- `src/components/auth/ProtectedRoute.jsx`
- `supabase/schema.sql`
- `.env` (local only, not committed)

### Earlier - Initial Scaffold

**Initial project setup:**
- Vite + React + TailwindCSS
- React Router with lazy loading
- UI component library (Button, Card, Input, Badge, Avatar, etc.)
- Mock data structure (experiences, teachers, students, reviews)
- All marketing pages (Home, About, How It Works, etc.)
- Explore page with filters
- Experience detail pages
- Teacher profile pages
- Student profile page (mock data)
- Teacher dashboard (mock data)
- Map view placeholder
- Gamification system (points, levels, badges)

---

## 🎯 Next Steps (Immediate)

### For You (Project Owner):

1. **Deploy Database Schema**
   - [ ] Go to Supabase SQL Editor
   - [ ] Run `supabase/clean-schema.sql`
   - [ ] Verify tables created successfully
   - [ ] Test signup flow to ensure profile is auto-created

2. **Update Production Environment**
   - [ ] Add env vars to Vercel dashboard
   - [ ] Trigger redeploy
   - [ ] Test authentication on production site

3. **Test Core Flows**
   - [ ] Sign up new user
   - [ ] Log in
   - [ ] View profile page
   - [ ] Sign out
   - [ ] All should work without errors

### For Next Development Session:

1. **Connect Explore Page to Supabase**
   - Create `useExperiences` hook
   - Fetch from Supabase instead of JSON
   - Maintain existing filters

2. **Connect Teacher Dashboard**
   - Teachers can create real experiences
   - Store in Supabase experiences table
   - Update their teacher profile

3. **Choose and Integrate Map Library**
   - Recommended: Leaflet (free, no API key)
   - Alternative: Mapbox (nicer, requires free API key)
   - Display experience pins
   - Click to view details

4. **Decide on Admin Dashboard Approach**
   - Option A: Enhanced teacher dashboard
   - Option B: Full admin panel
   - Design and implement chosen option

---

## 📚 Additional Resources

### Documentation Links

- **Supabase Docs:** https://supabase.com/docs
- **React Router:** https://reactrouter.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/

### Important URLs

- **Supabase Project:** https://app.supabase.com/project/ybhecubqnhukgpvchjay
- **Supabase API Settings:** https://app.supabase.com/project/ybhecubqnhukgpvchjay/settings/api
- **Supabase SQL Editor:** https://app.supabase.com/project/ybhecubqnhukgpvchjay/sql/new
- **Vercel Deployment:** https://tonguee-lovat.vercel.app/
- **GitHub Repo:** https://github.com/leonartist7/Tonguee

### Setup Documentation

- `README.md` - Project overview and quick start
- `SETUP.md` - Detailed Supabase setup guide
- `ARCHITECTURE.md` - Technical architecture details
- `HANDOFF.md` - Developer handoff notes

---

## 🤝 Contributing

When making changes to this project:

1. **Read this master plan first** to understand current state
2. Make your changes following the guidelines above
3. **Update this master plan** with:
   - What changed
   - Why it changed
   - Any new issues or technical debt
   - Date of change
4. Keep change log entries concise but informative
5. Update roadmap if features completed or priorities changed

---

**End of Project Master Plan**
*This document should be the first thing you read and the last thing you update.*
