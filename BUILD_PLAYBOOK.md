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

## Phase C – Admin Enhancements

Builds on Phase B. Adds teacher verification, bulk actions, revenue chart, audit log, and real-time badges.

---

### C1 – Teacher verification workflow

**File:** `src/pages/admin/AdminTeachersPage.jsx` (new)  
**Lib:** `getAllTeachers`, `updateTeacherVerified` added to `src/lib/admin.js`

Paginated table of all teachers with `verified` badge (Verified / Pending) and a toggle button per row.
Toggle calls `updateTeacherVerified(id, !verified)` then fires `logAdminEvent('verify'/'unverify', 'teachers', id)`.
Route: `/admin/teachers` — wired in `src/lib/routes.jsx`.

---

### C2 – Bulk actions

**Files:** `AdminExperiencesPage.jsx`, `AdminBookingsPage.jsx`, `AdminReviewsPage.jsx` (extended)  
**Lib:** `bulkUpdateExperienceStatus`, `bulkDeleteBookings`, `bulkDeleteReviews` added to `src/lib/admin.js`

Checkbox column (col 0) with header "select all" toggle. When any row is selected a bulk action bar
appears:
- **Experiences** – inline status `<Select>` + "Apply to all" → `bulkUpdateExperienceStatus(ids, status)`
- **Bookings** – "Delete all" → `bulkDeleteBookings(ids)`
- **Reviews** – "Delete all" → `bulkDeleteReviews(ids)`

All three use `.in('id', ids)` PostgREST filter (no extra RPC needed). Check `!data?.length` for silent RLS failures.
Selection is cleared on page load and after each successful bulk operation.

---

### C3 – Revenue chart

**Files:** `src/components/admin/RevenueChart.jsx` (new), `AdminDashboardPage.jsx` (extended)  
**SQL:** `get_revenue_over_time(weeks int DEFAULT 8)` RPC in `20260630_admin_phase_c.sql`

Pure SVG bar chart (no third-party lib). Each bar represents one ISO week; height is proportional to
`SUM(total_price)` for that week from the `bookings` table. Revenue value shown above each bar; week
label (`Mon DD`) shown below. Empty bars rendered in gray for weeks with zero revenue.

---

### C4 – Admin audit log

**SQL:** `admin_events` table + `log_admin_event(action, table_name, record_id, details)` SECURITY DEFINER
function in `20260630_admin_phase_c.sql`.

Application-level logging: after each successful mutation (delete/update_status/verify/unverify/bulk_*)
the page calls `logAdminEvent(action, tableName, recordId, details)` which fires `supabase.rpc('log_admin_event', ...)`.
The SECURITY DEFINER function bypasses RLS so inserts always succeed even without an INSERT policy on the table.

`AdminDashboardPage` fetches the last 15 events via `getAdminEvents(15)` and displays them as a scrollable
feed with icons keyed to action type.

---

### C5 – Real-time sidebar badges

**File:** `src/components/admin/AdminLayout.jsx` (extended)  
**Lib:** `getPendingBookingsCount` added to `src/lib/admin.js`

On mount, `AdminLayout` fetches the initial pending-booking count and subscribes to a Supabase Realtime
channel (`admin-live`) that listens for `INSERT` on `bookings` and `reviews`:
- New `pending` booking → increments the Bookings badge
- New review → increments the Reviews badge

Navigating to `/admin/bookings` or `/admin/reviews` clears the respective badge. Channel is cleaned up
on unmount. `SidebarNav` is defined outside `AdminLayout` and receives `items` as a prop to avoid
unnecessary remounts when badge state updates.

---

## Phase C – Completion Status

All five tasks implemented and shipped on `claude/phase-a-tasks-tzg5ub`.

| Task | Status |
|------|--------|
| C1 – Teacher verification page | ✅ |
| C2 – Bulk actions (Experiences/Bookings/Reviews) | ✅ |
| C3 – Revenue chart (SVG, no extra dep) | ✅ |
| C4 – Admin audit log | ✅ |
| C5 – Real-time sidebar badge counts | ✅ |

---

## Phase C – Validation & Hardening (post-implementation review)

A second review pass caught and fixed the following before sign-off:

1. **Real-time would never fire (C5 blocker).** Supabase `postgres_changes` only
   delivers events for tables in the `supabase_realtime` publication, which is empty
   by default. Added idempotent `ALTER PUBLICATION supabase_realtime ADD TABLE
   bookings / reviews` to `20260630_admin_phase_c.sql`. **The badges do nothing until
   this migration is applied.**
2. **`SECURITY DEFINER` RPC privilege leak.** `get_revenue_over_time` and
   `log_admin_event` were granted to all `authenticated` users with no guard — any
   logged-in user could read platform revenue or forge audit-log rows. Both now
   `RAISE insufficient_privilege` unless `is_admin()`. The pre-existing
   `get_admin_stats` had the same hole and was hardened the same way.
3. **`useRef` runtime crash in `AdminLayout`.** A leftover `channelRef` used `useRef`
   after its import was removed. `esbuild`/`vite build` does not flag undefined
   identifiers, so the build passed but the component would throw at render. Removed
   the unused ref; channel cleanup now uses `supabase.removeChannel(ch)`.
4. **Bulk-delete empty-page edge case.** Deleting every row on the last page (Bookings
   / Reviews) left the admin stranded on an empty page. Now mirrors the single-delete
   path: pages back when the page empties and `page > 1`.

**Known pre-existing (not Phase C):** `npm run lint` reports ~9 `no-unused-vars`
errors for JSX-only lowercase identifiers (`motion`) and destructured component props
(`Icon`). Root cause: `eslint.config.js` omits `eslint-plugin-react`, so
`react/jsx-uses-vars` is inactive. The same errors exist on untouched files
(`HomePage.jsx`). `npm run build` is clean — lint has never gated this repo. Fixing it
(add `eslint-plugin-react`) is a repo-wide cleanup, deferred to Phase D.

---

## Phase D – Handoff Notes (for next agent)

**Codebase state after Phase C:**
- Admin panel has 6 pages: Dashboard, Users, Teachers, Experiences, Bookings, Reviews
- `src/lib/admin.js` exports ~18 functions, all `{ data, error }` shape
- SQL: `20260629_admin.sql` (A) → `20260630_admin_phase_b.sql` (B) →
  `20260630_admin_phase_c.sql` (C). Run in that order. Phase C also hardens
  `get_admin_stats` and wires Realtime.
- Audit log writes go through `logAdminEvent(action, table, id, details)` after every
  mutation; the dashboard reads the last 15 via `getAdminEvents`.
- Real-time badges live in `AdminLayout` via one `supabase.channel('admin-live')`.

**Candidate Phase D tasks (pick a coherent theme):**
1. **Drill-down detail views** – click a user → their bookings/reviews; click a teacher
   → their experiences + verification history. New routes `/admin/users/:id`,
   `/admin/teachers/:id`.
2. **Dedicated audit log page** – `/admin/audit` with pagination + filter by action/
   table/admin (dashboard only shows 15). `getAdminEvents` already paginates trivially.
3. **Table filtering & sorting** – extend Phase B user search to Experiences/Bookings/
   Reviews; add status filter + date range; clickable column sort.
4. **Dashboard date-range control** – the `get_revenue_over_time(weeks)` RPC already
   takes a param; expose 4/8/12/26-week toggle on the chart.
5. **Platform settings table** – `app_settings` (commission %, feature flags) with an
   `/admin/settings` editor; admin-only RLS.
6. **Refund workflow** – `bookings.payment_status` exists; add refund action that calls
   a Stripe Edge Function and logs an audit event.
7. **Lint cleanup** – add `eslint-plugin-react` + `react/jsx-uses-vars` so
   `npm run lint` passes (see hardening note above).

**Model guidance:** D1–D4 and D7 are straightforward pattern extensions — Sonnet is
fine. D5 (settings schema design) and D6 (Stripe refund + Edge Function, money-handling)
warrant Opus for the design/security judgment.
