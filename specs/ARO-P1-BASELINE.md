# ARO-P1 — Baseline Discovery Report

> **Status:** DISCOVERY COMPLETE; EXECUTION BASELINE PENDING  
> **Date:** 2026-08-26  
> **Scope:** read-only repository and connected Supabase inspection. No runtime, schema, RLS, Vercel or product-feature changes were made.

## 1. Canonical systems

- Repository: leonartist7/Tonguee
- Governed ARO branch: feat/aro-p0-director-reset
- Production/default branch: main remains unchanged by this package
- Canonical Supabase backend: Tonguee, project ref ybhecubqnhukgpvchjay
- Current Vercel deployment remains connected to the Tonguee GitHub repository
- Separate aro-platform Supabase project is not the ARO migration target; it remains untouched until external dependencies are ruled out

## 2. Repository findings

### Auth and profile

- src/lib/supabase.js uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
- src/contexts/AuthContext.jsx loads profiles for the signed-in user and updates the existing profiles row.
- src/lib/routes.jsx protects profile, onboarding, Passport, dashboards and admin surfaces through existing route guards.
- Signup contains a Google sign-in UI path, but Google provider configuration is not part of P1.

### Onboarding and local state

- src/pages/StudentOnboarding.jsx collects languages, interests, avatar and a daily-practice cadence.
- It writes first to the persisted Zustand player store and only best-effort mirrors fields into profiles.
- It attempts a user_achievements insert, while the inspected live public-table list exposes user_badges rather than user_achievements. P1 must not expand this unrelated inconsistency.
- src/store/usePlayerStore.js persists player state locally under conversa-player.
- src/pages/StudentProfilePage.jsx reads core learner/progression information primarily from the local player store.

### P1 implication

Legacy languages, goal/cadence and capabilities cannot be treated as durable ARO private records. They may prefill a reviewed form, but no automatic backfill or silent migration is allowed.

## 3. Connected Tonguee Supabase findings

Read-only inspection found these current public tables with RLS enabled:

- profiles
- teachers
- experiences
- bookings
- reviews
- user_badges
- notifications
- contact_messages

At inspection time, the connector reported zero rows in these tables.

Important boundaries:

- profiles is publicly readable and includes identity/profile fields plus learning/gamification JSON.
- teachers and published experiences have public-read behavior.
- bookings are owner-bound through student_id.
- repository trust-engine.sql defines teacher applications, private documents, admin audit behavior and verified/active publishing enforcement; the implementation baseline must verify which of these controls are actually applied in the connected environment.
- the active live schema reports no recorded migration history through the connector, despite existing tables.

Existing legacy risks to preserve as baseline facts, not silently mix into P1:

- several policies target public rather than explicit authenticated roles;
- several UPDATE policies lack a separate WITH CHECK;
- anon/authenticated table grants are broad, leaving RLS as the effective row boundary;
- profiles public-read means private P1 fields cannot be added there;
- existing security-advisor findings include mutable function search_path and API discoverability/GraphQL exposure concerns.

## 4. P1 data/RLS direction verified by discovery

P1 will use dedicated private tables:

- aro_profile_goals
- aro_profile_capabilities

They will have:

- no anon privileges;
- explicit authenticated policies;
- owner-only SELECT, INSERT, UPDATE and DELETE;
- both USING and WITH CHECK on UPDATE;
- no default admin policy;
- bounded vocabularies and self_declared provenance;
- account-deletion cascade;
- no precise location, availability, budget, free text, money or AI data.

Existing public profiles, teacher verification and verified-publish enforcement remain unchanged unless a separately approved regression fix is required.

## 5. Remaining baseline gate before runtime work

The following evidence must be captured from the exact P1 implementation base before code or SQL changes:

1. Current branch SHA and clean diff, including the known main/ARO ancestry divergence: main-only ce291193 is an empty commit with no file delta from 931f2614; reconcile ancestry only if required and never overwrite newer ARO governance.
2. npm test result, including honest recording of pre-existing failures.
3. npm run lint result.
4. npm run build result and build-output sizes.
5. Existing Playwright/E2E result for auth/onboarding/profile/teacher/Passport paths that can run in the available environment.
6. 360px and 1440px screenshots of affected current profile/onboarding surfaces in light and dark.
7. Keyboard and screen-reader-semantics spot check.
8. Supabase grants, policies, constraints and advisor snapshots.
9. Query plans or measured owner-query baseline where representative data is available.
10. Confirmation of the safe migration environment. No destructive experiment may run against production.

If authenticated Git/CI or test credentials are unavailable, that is a named baseline blocker; it is not permission to skip evidence.

## 6. Stop conditions

P1 runtime work stops if:

- private fields are proposed for profiles;
- the implementation requires main or production changes before preview verification;
- a cross-user RLS test succeeds;
- migration history cannot be reconciled safely;
- verified-publish enforcement regresses;
- implementation introduces public demand, matching, location, money, Google, Stripe, AI or a new vertical;
- a required test cannot be run and the gap is hidden rather than documented.

## 7. Current conclusion

The product/data direction is sufficiently resolved for the package specification to be SPEC-READY. Runtime implementation is not yet authorized. The exact next step is the pre-code execution baseline described above, followed by one scoped ARO-P1 implementation branch and PR.
