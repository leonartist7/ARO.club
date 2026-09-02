# ARO application baseline reconciliation

Date: 2026-08-30. Source commit: `467a11df122651df561adde2b3e03a35c6b25aaf`.
Status: **AUDIT RECORDED; REPAIR NOT IMPLEMENTED**.

## Scope and method

Read-only inspection of application consumers, inherited SQL, and Tonguee
`ybhecubqnhukgpvchjay` PostgreSQL catalogs. No customer rows, secrets, production
writes, exploit attempts, provider configuration or quarantine changes.
The application has no approved hosted ARO backend. The I0.1 CI fixture has no
application migrations and cannot prove application compatibility.

This audit extends [the migration-source audit](../ARO-I0.1/MIGRATION_SOURCE_AUDIT.md).
It is not a complete security certification. Live observations are catalog
facts; exploit consequences below are inferences from those facts, not tested
attacks against production.

## What is actually shipped

- I0.1 PR [#27](https://github.com/leonartist7/ARO.club/pull/27) merged at
  `467a11d`, 2026-08-30T17:47:14Z.
- Main [Isolated database run](https://github.com/leonartist7/ARO.club/actions/runs/33326228058):
  PASS. Eight boundary tests, 21 SQL-probe assertions twice, synthetic Auth
  lifecycle, reset and cleanup. Probe assertions are not application RLS tests.
- Main [Quality run](https://github.com/leonartist7/ARO.club/actions/runs/33326228026):
  PASS. Existing public browser checks do not certify authenticated journeys.
- Release evidence:
  [PR release record](https://github.com/leonartist7/ARO.club/pull/27#issuecomment-5470297817).
- Fresh local audit baseline: lint PASS; 61/61 unit tests PASS; build PASS
  (12.34s, 2602 modules). Main JS 750.69 kB / 230.00 kB gzip;
  CSS 89.84 kB / 13.92 kB gzip. Existing chunk-size and browser-data-age warnings.
  No runtime or dependency change in this audit.

## Consumer and provenance map

| Surface | Actual source/contract | Reconciliation consequence |
|---|---|---|
| AuthContext | `src/contexts/AuthContext.jsx:54` selects own profiles row with `*`; signup expects a database profile trigger; updateProfile forwards a caller patch | Test real signup/profile creation and constrain sensitive writes server-side |
| Student onboarding | `src/pages/StudentOnboarding.jsx:138` writes Zustand first, then best-effort profiles and user_achievements | Local completion is not proof of a successful database write; inspect returned API errors |
| Teacher onboarding | `src/pages/TeacherOnboarding.jsx:128` updates profile then draft/edit/submit | Requires extension columns and a working application transition |
| Application/portfolio | `src/lib/teacherApplications.js` uses applications, documents and two private Storage buckets | Test actual ownership, transitions, upload, signed access and cleanup |
| Admin review | `src/lib/admin.js:135` performs approval, teacher creation/update, profile promotion and audit as separate requests | Partial success and retry can leave inconsistent Trust state |
| Chat identities | `src/pages/ChatPage.jsx:38` joins participant profiles for id/name/avatar | Making profiles private requires a restricted participant-card contract, not reopening all profiles |
| Game leaderboard | `src/pages/GamesPage.jsx:416` reads name/points/level/avatar across profiles | A public-field projection/visibility decision is needed before changing profile access |
| Games/achievements | GamesPage, ChatPage and onboarding use questions, game_sessions and user_achievements | Legacy extension SQL is not installed in the observed live source; self-reported progress must not become verified Proof |
| Profile and Passport | StudentProfilePage and PassportPage read Zustand; TeacherProfilePage reads static JSON | Screenshots alone cannot establish durable profile/Trust/Proof parity |
| Booking foundation | `src/store/usePlayerStore.js:299` records local pricePaid/points; admin.js reads/writes database bookings | No evidence of a working server-authoritative payment flow; do not convert local records to paid bookings |

Other inherited extension entities are conversations, messages, shop_items,
user_inventory and achievements. The observed live-only contact_messages and
notifications also need provenance classification before any full-schema import.
No uninspected entity is certified safe by this table.

## Findings and required decisions

### F1 — Private profile data is publicly selectable (live catalog evidence)

Live profiles has email, languages_learning, stats, booking-reference arrays and
favorites alongside presentation fields. Both public SELECT policies use true.
Anon/authenticated have table-level SELECT. This permits database-role access to
all columns; no customer data was read to demonstrate it.

Recommendation: private full profile, deliberate minimal presentation contracts.
This changes visibility and requires director/privacy approval. Preserve needed
chat/leaderboard/admin reads through explicit contracts, not broad access.

### F2 — Row ownership is not field authority (live and repository evidence)

Live teachers grants authenticated table-level INSERT/UPDATE, with user_id-only
ownership policies. The table has verified and verification_date. Its only
noninternal trigger updates timestamps; catalog constraints do not protect
verification authority. Inference: an owner can self-assert verification through
the database permissions as observed. No production write was attempted.

Repository schema.sql has the same broad owner-write pattern for profiles.
trust-engine.sql then adds profiles.role and derives admin authority from it
without removing owner-write access. If imported with table-level grants, this
would introduce a role-escalation path. The role column is absent live, so this
is a repository-composition risk, not a claim of an existing live admin exploit.

Recommendation: protected role and verification fields; explicit user-editable
field lists; one authoritative admin decision path; no authorization from user
metadata. Adding an admin policy does not cancel a permissive owner policy.

### F3 — Teacher application transition and confidentiality conflicts (source)

trust-engine.sql:174 allows applicant UPDATE only while status is draft or
changes_requested and supplies no explicit WITH CHECK. PostgreSQL reuses USING
as the new-row check: ordinary draft-to-submitted is therefore rejected.
Conversely, INSERT checks only ownership, so it does not enforce draft-only
creation or protect review fields. This needs isolated reproduction.

The application contains admin_notes marked internal-only but applicant SELECT
reads the same entire row. Documents check user_id but do not require the
referenced application's owner to match; document status is also client-settable
on INSERT under the snapshot policy.

Recommendation: explicit transitions and immutable ownership; separate private
review data; validate document/application relationship and review authority.

### F4 — Approval is non-atomic and audit is best-effort (source)

approveApplication first marks approved, then writes teachers, then profiles,
then an audit row. No shared transaction or idempotency key exists. The snapshot
has an admin teacher UPDATE policy but no admin INSERT policy for creating a row
owned by the applicant. Teacher onboarding deliberately creates no teacher row,
so this is a concrete approval-path mismatch to reproduce.

Recommendation: an authenticated, admin-authorized transaction with concurrency
control and replay handling; audit success must be part of the same commit.
No separate service-role browser credential or second Trust engine.

### F5 — Publication gate is missing live and incomplete as an import (evidence)

Live experiences has only its timestamp trigger and no verification condition
in SELECT. Repository trg_enforce_verified_publish fires on INSERT or UPDATE OF
status, not teacher_id. The single gate must validate reassignment as well as
publication; public reads must cease immediately when a teacher is suspended.
Preserve and strengthen the named control through append-only migrations, never
disable it to get a passing test.

### F6 — Legacy booking fields are not server-authoritative (live catalog)

Booking INSERT/UPDATE policies check student_id only. Authenticated has
table-level privileges over amounts, payment_status and completion fields.
Constraints restrict enumerated values, not who may authorize them, and the
only noninternal trigger updates timestamps.

Recommendation for the isolated baseline: synthetic read fixtures and denied
client money/paid-state mutations, pending a separately approved money package.
Do not implement Stripe, real charging, payouts or new cancellation economics.
This proposed restriction must be approved; it is not an implementation change
made by this audit. Production Tonguee remediation is separate.

### F7 — Destructive snapshots and incomplete checks are not a baseline

clean-schema.sql drops tables with CASCADE, then attempts trigger cleanup on
those tables. It is not a safe ordered migration source. Original snapshots
must remain unchanged; new migration filenames must come from the pinned CLI.

e2e/auth.mjs currently tests login and a non-login profile URL, not persisted
profile content, onboarding, applications, admin approval, Storage or Trust.
It cannot satisfy the full Q0/P1 authenticated gate on its own.

## Important RLS correction

A missing explicit WITH CHECK is **not by itself** proof that an UPDATE permits
ownership reassignment. PostgreSQL implicitly reuses USING when WITH CHECK is
absent. The concrete defects above are unprotected non-owner fields, unsuitable
state-transition predicates and missing ownership relationships. The approved
ARO convention still requires explicit USING and WITH CHECK for clarity.

Sources: [PostgreSQL CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html),
[Supabase column privileges](https://supabase.com/docs/guides/database/postgres/column-level-security).
Table-level grants must be revoked before column-level restrictions can narrow
them; restricted SELECT projections also affect wildcard reads.

Current [Supabase grant change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)
requires explicit grants for new exposed tables. Existing grants are not
automatically repaired. Provider-owned schema restrictions were also checked;
do not modify their tables/functions to simulate a clean baseline.

## Reproducible catalog checks

Each SELECT was run separately; no application row queries are needed.

```sql
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles','teachers','experiences','bookings')
order by tablename, policyname;

select table_name, column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name in ('profiles','teachers','bookings')
order by table_name, ordinal_position;

select table_name, grantee, privilege_type
from information_schema.table_privileges
where table_schema = 'public'
  and table_name in ('profiles','teachers','bookings')
  and grantee in ('anon','authenticated')
order by table_name, grantee, privilege_type;

select c.relname as table_name, t.tgname, pg_get_triggerdef(t.oid)
from pg_trigger t join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
where not t.tgisinternal and n.nspname = 'public'
  and c.relname in ('profiles','teachers','bookings','experiences');

select c.relname as table_name, con.conname, pg_get_constraintdef(con.oid)
from pg_constraint con join pg_class c on c.oid = con.conrelid
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('profiles','teachers','bookings');
```

## Next action

Obtain the bounded director decision in
[I0.2 proposal](../../specs/ARO-I0.2-APPLICATION-BASELINE.md).
Do not label it SPEC-READY, migrate data or waive P1 gates just because the
platform CI is green. No paid resource is necessary for the proposed CI work.
