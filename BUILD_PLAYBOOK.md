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
