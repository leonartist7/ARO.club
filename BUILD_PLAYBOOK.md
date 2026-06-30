# Build Playbook

## Phase A – Admin Panel Foundation

All admin routes live under `/admin`. Reuse existing UI components (Button, Badge, Card,
Input, Select, Avatar, LoadingSpinner) and gate every query with the `is_admin()` Postgres
RLS function so ordinary users can never read admin data.

---

### A1 – Admin column + `is_admin()` RLS function

**File:** `supabase/migrations/20260629_admin.sql`

- Add `is_admin BOOLEAN DEFAULT false NOT NULL` to `profiles`.
- Create a stable Postgres function `is_admin()` that returns `true` when
  `auth.uid()` belongs to a profile where `is_admin = true`.
- Add admin-bypass `SELECT` policies on **profiles**, **teachers**,
  **experiences**, **bookings**, **reviews** so admins can read all rows
  regardless of other RLS filters.

---

### A2 – Admin helper module

**File:** `src/lib/admin.js`

Exports thin wrappers around the Supabase client for every table an admin
needs. All functions return `{ data, error }` in Supabase style.

| Export | Purpose |
|--------|---------|
| `getAdminStats()` | Aggregate counts: users, experiences, bookings, revenue |
| `getAllUsers(page, limit)` | Paginated profiles list |
| `updateUserAdminFlag(userId, isAdmin)` | Grant/revoke admin flag |
| `getAllExperiences(page, limit)` | Paginated experiences with teacher name |
| `updateExperienceStatus(id, status)` | Set status (published/draft/cancelled) |
| `getAllBookings(page, limit)` | Paginated bookings with student + experience |
| `deleteBooking(id)` | Hard-delete a booking |

---

### A3 – `AdminRoute` guard

**File:** `src/components/auth/AdminRoute.jsx`

- Uses `useAuth()` from `AuthContext`.
- While auth is loading → show full-screen `LoadingSpinner`.
- If no user or `profile.is_admin !== true` → `<Navigate to="/404" replace />`.
- Otherwise renders `{children}`.

---

### A4 – Admin layout with sidebar

**File:** `src/components/admin/AdminLayout.jsx`

Rendered as the parent element for all `/admin/*` routes. Contains:

- **Sidebar** (desktop: fixed left column; mobile: hidden / toggle)
  - Links: Dashboard (`/admin`), Users (`/admin/users`),
    Experiences (`/admin/experiences`), Bookings (`/admin/bookings`)
  - Active link highlighted with `primary-500` background
- **Top bar** – page title + "Back to site" link
- **`<Outlet />`** for child pages

---

### A5 – Admin dashboard page

**File:** `src/pages/admin/AdminDashboardPage.jsx`

- Route: `GET /admin` (index)
- On mount, call `getAdminStats()` and show a **4-card stat grid**:
  `Total Users`, `Total Experiences`, `Total Bookings`, `Total Revenue`
- Below: recent experiences table (title, teacher, status, date)
- Below: recent bookings table (student, experience, amount, status)
- All tables use existing Badge + Avatar components.
- Loading state: `LoadingSpinner` centred in each section.
- Error state: inline message with retry button.

#### Additional admin pages (wired up in routes but minimal):
- `src/pages/admin/AdminUsersPage.jsx` – paginated user table with
  "Grant admin" / "Revoke admin" toggle buttons.
- `src/pages/admin/AdminExperiencesPage.jsx` – paginated experience table
  with status badge and publish/cancel toggle.
- `src/pages/admin/AdminBookingsPage.jsx` – paginated bookings table.

---

## Phase A – Completion Status

All five tasks implemented and shipped in two commits on `claude/phase-a-tasks-tzg5ub`:

| Task | Status | Notes |
|------|--------|-------|
| A1 – SQL migration | ✅ | `supabase/migrations/20260629_admin.sql`; both RPCs restricted to `authenticated` |
| A2 – Admin helper module | ✅ | `src/lib/admin.js`; revenue via `get_admin_stats()` RPC |
| A3 – AdminRoute guard | ✅ | Unauthenticated → `/choose-role`; non-admin → `/404` |
| A4 – Admin layout | ✅ | Desktop sidebar + mobile drawer; `ADMIN_PAGE_SIZE` exported constant |
| A5 – Dashboard + 3 sub-pages | ✅ | Users, Experiences, Bookings with pagination and mutation error banners |

**Known gap carried into Phase B**: Phase A added `SELECT` and one `UPDATE` (profiles) policy for
admins, but never added `UPDATE` on `experiences` or `DELETE/UPDATE` on `bookings`. Those mutations
exist in the helper module but would fail RLS in production.

---

## Phase B – Admin Content Moderation

Builds on the Phase A foundation. Goal: make existing mutations actually work in production (missing
RLS policies), add reviews moderation, add booking status management, and add user search.
All code reuses existing UI components and follows the exact same patterns established in Phase A.

---

### B1 – Admin mutation policies (SQL)

**File:** `supabase/migrations/20260630_admin_phase_b.sql`

Policies missing from Phase A that cause silent RLS failures:

| Table | Operation | Policy name |
|-------|-----------|-------------|
| `experiences` | UPDATE | `Admins can update any experience` |
| `bookings` | UPDATE | `Admins can update any booking` |
| `bookings` | DELETE | `Admins can delete any booking` |
| `reviews` | DELETE | `Admins can delete any review` |
| `teachers` | UPDATE | `Admins can update any teacher` |

All `UPDATE` policies include `WITH CHECK (is_admin())` so a mid-request privilege drop cannot
sneak through.

---

### B2 – New admin helper functions

**File:** `src/lib/admin.js` (extend existing)

| Export | Purpose |
|--------|---------|
| `getAllReviews(page, limit)` | Paginated reviews with `student_name`, `rating`, `comment`, experience title |
| `deleteReview(id)` | Hard-delete a review |
| `updateBookingStatus(id, status)` | Change a booking's status field |
| `getAllUsers(page, limit, search)` | Extend existing function with optional `search` param (filters name/email via `.ilike`) |

---

### B3 – Admin Reviews page

**File:** `src/pages/admin/AdminReviewsPage.jsx`

Route: `/admin/reviews` — same pagination pattern as the other three admin pages.

Table columns: Student name · Experience title · Rating (star icons) · Comment (truncated) · Date · Delete button.

Delete uses `window.confirm` and shows `deleteError` banner on failure (same as BookingsPage).

---

### B4 – Booking status management

**File:** `src/pages/admin/AdminBookingsPage.jsx` (extend)

Add a `Select` dropdown per booking row (same `Select` component as ExperiencesPage uses) that
calls `updateBookingStatus(id, status)`. A separate `updating`/`updateError` state pair tracks
the in-flight mutation — independent of the existing `deleting`/`deleteError` pair.

---

### B5 – User search

**File:** `src/pages/admin/AdminUsersPage.jsx` (extend)

Add a debounced search `Input` (300 ms) above the table. When the query changes the debounce
callback resets `page` to 1 and updates `debouncedSearch` in a single `setTimeout` so only one
`useEffect` fires. The `load` callback accepts an optional `q` parameter passed through to
`getAllUsers`.

---

## Phase B – Completion Status

All five tasks implemented and shipped on `claude/phase-a-tasks-tzg5ub`.

| Task | Status |
|------|--------|
| B1 – SQL mutation policies | ✅ |
| B2 – Helper functions | ✅ |
| B3 – AdminReviewsPage | ✅ |
| B4 – Booking status change | ✅ |
| B5 – User search | ✅ |

---

## Phase C – Handoff Notes (for next agent)

**Codebase state after Phase B:**
- Admin panel has 5 pages: Dashboard, Users, Experiences, Bookings, Reviews
- Every admin mutation now has a corresponding RLS policy
- `src/lib/admin.js` exports 10 functions; all follow `{ data, error }` return shape
- Sidebar nav lives in `src/components/admin/AdminLayout.jsx` → `navItems` array

**Recommended Phase C tasks:**
1. **Teacher verification workflow** – `teachers.verified` column exists but no UI. Admin should be
   able to open a teacher detail modal/page and toggle `verified`. Requires joining
   `profiles → teachers` on `user_id` (teachers table has `user_id` FK).
2. **Bulk actions** – checkbox column on Users/Experiences/Bookings tables; bulk delete or bulk
   status change with a single RPC call.
3. **Revenue chart** – replace the static stat card with a time-series chart (e.g. Recharts)
   grouped by week. Needs a new `get_revenue_over_time()` RPC or a Supabase view.
4. **Admin audit log** – append-only `admin_events` table recording which admin did what and when;
   display on Dashboard as a scrollable feed.
5. **Real-time subscription** – `supabase.channel()` on `bookings` and `reviews` to push badge
   counts to the sidebar nav items without a manual Refresh click.
