# 📋 PROJECT MASTER PLAN

> **Project:** TongueConnect - Language Learning Experience Marketplace
> **Status:** ~40% Complete - Foundation built, backend integration needed
> **Last Updated:** 2025-11-12

---

## 🎯 PROJECT DESCRIPTION

TongueConnect is an **Airbnb-style marketplace** for group language learning experiences. Students discover and book immersive language learning sessions led by native speakers in real-world cultural settings (cafés, walking tours, cooking classes, etc.). Teachers create and manage experiences while students earn gamification points and badges.

**Key Value Props:**
- Learn languages through immersive cultural experiences
- Small group sessions (2-6 people) for personal attention
- Couple discounts to encourage learning together
- Gamification system with points, levels, and badges
- Book experiences in 10+ global cities

---

## 🛠️ TECH STACK

### Frontend
- **Framework:** React 18.2.0 with React 19.2.0 DOM
- **Build Tool:** Vite 7.2.2 (lightning-fast HMR)
- **Routing:** React Router DOM 7.9.5 with lazy loading
- **State Management:** Zustand 5.0.8 (lightweight, 1kb)
- **Styling:** Tailwind CSS 3.4.18 + PostCSS + Autoprefixer
- **Animations:** Framer Motion 12.23.24
- **Icons:** Lucide React 0.553.0 (tree-shakeable)
- **Date Handling:** date-fns 4.1.0 (modular, 5-10kb)
- **Utilities:** clsx 2.1.1, tailwind-merge 3.4.0

### Backend (Configured)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (ready for image uploads)

### Pending Integrations
- **Payments:** Stripe (not configured yet)
- **Maps:** Google Maps API (not configured yet)
- **OAuth:** Google OAuth (structured but not active)

### Development
- **Linting:** ESLint 9.39.1
- **Package Manager:** npm
- **Version Control:** Git

---

## 🏗️ ARCHITECTURE OVERVIEW

### Folder Structure
```
/home/user/Tonguee/
├── public/                     # Static assets
├── supabase/                   # Database schema (320 lines)
│   └── schema.sql              # Complete DB structure with RLS
├── src/
│   ├── assets/                 # Images, SVGs
│   ├── components/
│   │   ├── auth/               # ProtectedRoute
│   │   ├── features/           # ExperienceCard, TeacherCard
│   │   ├── layout/             # Header, Footer, Layout
│   │   └── ui/                 # Button, Card, Badge, Input, Select, Avatar, LoadingSpinner
│   ├── contexts/               # AuthContext (Supabase auth wrapper)
│   ├── data/                   # Mock data (110+ records)
│   │   ├── constants.js        # Languages, cities, badges, enums
│   │   ├── experiences.json    # 35+ experiences
│   │   ├── teachers.json       # 15 teachers
│   │   ├── reviews.json        # 50+ reviews
│   │   └── students.json       # 10 students
│   ├── hooks/                  # Custom hooks (empty, ready to use)
│   ├── lib/
│   │   ├── routes.jsx          # React Router config (18 routes)
│   │   └── supabase.js         # Supabase client
│   ├── pages/                  # 18 page components
│   ├── store/
│   │   └── useStore.js         # Zustand global state
│   ├── utils/
│   │   ├── cn.js               # Tailwind class merging
│   │   ├── date.js             # Date utilities (8 functions)
│   │   └── helpers.js          # Business logic (15+ helpers)
│   ├── index.css               # Global styles
│   └── main.jsx                # React entry point
├── .env                        # Environment variables (Supabase keys)
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Theme customization
└── postcss.config.js           # PostCSS setup
```

### How Pieces Connect

**Data Flow:**
```
Mock JSON Data → Pages → Feature Components → UI Components → DOM
         ↓
   Zustand Store (Global State)
         ↓
   Component Props & Local State
```

**Routing Flow:**
```
Browser URL → React Router → Layout Wrapper → Lazy-Loaded Page → Rendered Content
                                    ↓
                            Header + Footer (persistent)
```

**Authentication Flow (Structure Ready):**
```
User Action → AuthContext Methods → Supabase Auth API → Update User State → Protected Routes
```

---

## ✅ EXISTING FEATURES

### Fully Functional (2 pages)

#### 1. **HomePage** (`/src/pages/HomePage.jsx` - 400+ lines)
- **Path:** `/`
- Gradient animated hero section with search bar
- Quick language selection links (10 languages)
- Animated stats counter (50k+, 10k+, 500+, 50+)
- Featured experiences grid (6 cards filtered from mock data)
- "How It Works" section (4 animated steps)
- CTAs for students and teachers
- Fully responsive (mobile/tablet/desktop)

#### 2. **ExplorePage** (`/src/pages/ExplorePage.jsx` - 380+ lines)
- **Path:** `/explore`
- Advanced multi-filter system:
  - Language dropdown (10 options)
  - City dropdown (10 options)
  - Skill level dropdown (4 levels)
  - Price range slider ($0-$100)
- Real-time text search (title, description, venue)
- Sort options: date, price (low/high), popularity
- Active filter badges with remove functionality
- Results count display
- Responsive grid (1-3 columns based on screen)
- Mobile filter toggle (collapsible)
- Empty state when no results

### Placeholder Pages (16 pages - UI structure only)

#### Authentication
- `LoginPage.jsx` - Email/password + Google OAuth button
- `SignupPage.jsx` - Registration form
- `ForgotPasswordPage.jsx` - Password reset
- `AuthCallbackPage.jsx` - OAuth redirect handler

#### Student Features
- `StudentProfilePage.jsx` - Profile, points, badges, bookings
- `ExperienceDetailPage.jsx` - Single experience view with booking
- `LeaderboardPage.jsx` - Points leaderboard

#### Teacher Features
- `TeacherProfilePage.jsx` - Public teacher profile
- `TeacherDashboardPage.jsx` - Teacher's experience management

#### Content Pages
- `MapViewPage.jsx` - Interactive map (ready for Google Maps)
- `AboutPage.jsx` - Company info
- `HowItWorksPage.jsx` - Detailed explanation
- `ForTeachersPage.jsx` - Teacher onboarding
- `FAQPage.jsx` - Frequently asked questions
- `ContactPage.jsx` - Contact form
- `NotFoundPage.jsx` - 404 error page

### Component Library (13 components)

#### UI Components (7)
- `Button.jsx` - 5 variants, 4 sizes, icon support, loading state
- `Card.jsx` - Composable (CardHeader, CardBody, CardFooter)
- `Badge.jsx` - 5 variants with icons
- `Input.jsx` - Left/right icons, labels, error states
- `Select.jsx` - Styled dropdown
- `Avatar.jsx` - Image or initials fallback
- `LoadingSpinner.jsx` - 3 sizes

#### Feature Components (2)
- `ExperienceCard.jsx` - Experience display with teacher info, pricing, spots
- `TeacherCard.jsx` - Teacher profile card with ratings, languages

#### Layout Components (3)
- `Layout.jsx` - Wrapper with header/footer
- `Header.jsx` - Navigation, user menu, mobile responsive
- `Footer.jsx` - Links, social, legal

#### Auth Components (1)
- `ProtectedRoute.jsx` - Route guard for authenticated pages

---

## 🎨 CODING PATTERNS FOUND

### Component Structure
```javascript
// Pattern 1: UI Components with variants
export default function Button({
  children,
  variant = 'primary',      // primary, secondary, outline, ghost, danger
  size = 'md',              // sm, md, lg, xl
  className,
  disabled = false,
  loading = false,
  icon = null,
  ...props
}) {
  return <button className={cn(baseStyles, variants[variant], sizes[size], className)}>
    {loading && <LoadingSpinner />}
    {icon && <span>{icon}</span>}
    {children}
  </button>;
}

// Usage:
<Button variant="primary" size="lg" icon={<Search />} loading={isLoading}>
  Search
</Button>
```

### State Management
```javascript
// Pattern 2: Zustand for global state
export const useStore = create((set, get) => ({
  // State
  searchQuery: '',
  filters: { language: '', city: '', priceMin: 0, priceMax: 100 },

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (key, value) => set(state => ({
    filters: { ...state.filters, [key]: value }
  })),
}));

// Usage in component:
const { searchQuery, setSearchQuery, filters } = useStore();
```

### Data Fetching (Current: Mock)
```javascript
// Pattern 3: Currently using JSON imports
import experiencesData from '../data/experiences.json';

// Filter and display
const filteredExperiences = experiencesData.filter(exp =>
  exp.language === filters.language &&
  exp.price >= filters.priceMin &&
  exp.price <= filters.priceMax
);

// Future: Will become Supabase queries
const { data: experiences } = await supabase
  .from('experiences')
  .select('*, teacher:teachers(*)')
  .eq('language', filters.language)
  .gte('price', filters.priceMin)
  .lte('price', filters.priceMax);
```

### Styling Approach
```javascript
// Pattern 4: Tailwind utility classes + cn() for merging
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
    Title
  </h1>
  <Button className="mt-4" variant="primary">
    Action
  </Button>
</div>

// cn() utility intelligently merges Tailwind classes
cn('px-2 py-1', 'px-4')  // Result: "py-1 px-4" (last px wins)
```

### Animation Pattern
```javascript
// Pattern 5: Framer Motion for smooth animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Staggered children
<motion.div variants={containerVariants}>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🗺️ KEY FILES MAP

### Entry Points
- **HTML Entry:** `index.html` - Root HTML file
- **React Entry:** `src/main.jsx` - Mounts React app, wraps with AuthProvider & RouterProvider
- **Routing Config:** `src/lib/routes.jsx` - Defines all 18 routes with lazy loading

### Critical Configuration
- **Environment:** `.env` - Supabase URL & anon key
- **Vite:** `vite.config.js` - Build configuration
- **Tailwind:** `tailwind.config.js` - Custom theme (colors, fonts, animations)
- **PostCSS:** `postcss.config.js` - Tailwind + Autoprefixer

### Core Functionality
- **State Store:** `src/store/useStore.js` - Zustand global state (96 lines)
- **Auth Context:** `src/contexts/AuthContext.jsx` - Supabase auth wrapper
- **Supabase Client:** `src/lib/supabase.js` - Database client initialization

### Utilities
- **Date Utils:** `src/utils/date.js` - 8 functions (format, relative time, etc.)
- **Helpers:** `src/utils/helpers.js` - 15+ functions (pricing, capacity, gamification)
- **Class Merge:** `src/utils/cn.js` - Intelligent Tailwind class merging

### Data Sources (Mock)
- **Experiences:** `src/data/experiences.json` - 35+ records
- **Teachers:** `src/data/teachers.json` - 15 records
- **Reviews:** `src/data/reviews.json` - 50+ records
- **Students:** `src/data/students.json` - 10 records
- **Constants:** `src/data/constants.js` - Languages, cities, badges, enums

### Database
- **Schema:** `supabase/schema.sql` - Complete database structure (320 lines)
  - 6 main tables (profiles, teachers, experiences, bookings, reviews, user_badges)
  - Indexes for performance
  - Row Level Security policies
  - Triggers for auto-updates

---

## ⚙️ CONFIGURATION

### Environment Variables Required
```bash
# Supabase (Already configured)
VITE_SUPABASE_URL=https://ybhecubqnhukgpvchjay.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Not configured - needed for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google Maps (Not configured - needed for map view)
VITE_GOOGLE_MAPS_KEY=AIza...

# Google OAuth (Optional - structure exists)
VITE_GOOGLE_OAUTH_CLIENT_ID=...
```

### External Services Status

| Service | Status | Purpose | Priority |
|---------|--------|---------|----------|
| **Supabase** | ✅ Configured | Database + Auth | HIGH |
| **Stripe** | ❌ Not configured | Payment processing | HIGH |
| **Google Maps** | ❌ Not configured | Map view | MEDIUM |
| **Google OAuth** | 🚧 Structured | Social login | LOW |

### Setup Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📊 PROJECT METRICS

- **Total Files:** 80+
- **Source Code Lines:** 6,546
- **Page Components:** 18
- **Reusable Components:** 13
- **Mock Data Records:** 110+
- **Database Tables:** 6
- **Utility Functions:** 25+
- **Completion:** ~40%

---

## 🎯 WHAT'S NEXT

See **BUILD_CHECKLIST.md** for detailed task breakdown and progress tracking.

### Immediate Priorities
1. ✅ Supabase backend integration (migrate mock data)
2. ✅ Authentication implementation (login, signup, protected routes)
3. ✅ ExperienceDetailPage functionality (booking flow)
4. ✅ StudentProfilePage implementation (points, badges, bookings)
5. ✅ Payment processing (Stripe integration)

### Medium Priority
6. ✅ TeacherDashboard implementation
7. ✅ Review system
8. ✅ Notification system
9. ✅ Map view integration (Google Maps)
10. ✅ Image upload functionality

### Lower Priority
11. ✅ Email notifications
12. ✅ Messaging system
13. ✅ Testing & bug fixes
14. ✅ Production deployment

---

**Total Estimated Effort:** 54-70 hours (2-3 weeks full-time)

---

For real-time progress updates, see **BUILD_CHECKLIST.md**.
For health diagnostics and cleanup, see **DIAGNOSIS_LOGBOOK.md**.
