# P1 and native handoff against merged Next.js

Base: f37dc084d7172415f581a41e90d2edd9ba3738b9. Preparation only. P1 remains BASELINE BLOCKED by I0/independent acceptance; F7 is not added as an independent P1 blocker.

## P1 implementation map

Retain approved P1 v1.0.0 data/privacy behavior: dedicated aro_profile_goals and aro_profile_capabilities, bounded selections, no free text/location/money/AI, no public/admin read, owner UPDATE USING + WITH CHECK, account-deletion cascade, explicit save and visible partial failure.

| Legacy specification reference | Current implementation seam |
|---|---|
| Vite / src/lib/supabase.js | Next.js 16.3.5; src/lib/supabase.ts browser client, src/lib/auth/server.ts server boundary |
| React Router protected profile | src/app/(public)/profile/page.tsx calls requireUser('/profile'), renders src/views/StudentProfilePage.jsx |
| src/pages/StudentOnboarding.jsx | src/views/StudentOnboarding.jsx; preserve legacy local state and explicit-unsaved prefill rule |
| Prototype /app/profile | src/app/app/profile/page.tsx renders AppProfilePage without requireUser; do not insert private P1 data into this synthetic surface |
| Route-table registration | Existing filesystem profile route; no new public API or route required for P1 |
| Tonguee canonical backend wording | Superseded by I0 isolation and N1: ARO staging only for approved tests; separate approved production target later |

Implement the compact private foundation section on the authenticated /profile surface. Reuse existing AuthContext, i18n, theme and form primitives. Keep owner queries bound to current authenticated identity; discard stale responses and clear private state on account change. No new admin reader or privileged service-role product path.

Before P1 code, prepare a v1.0.1 compatibility-only spec update with these path/environment corrections; do not change its vocabularies, 20-row capability bound, 25kB gzip route delta, two-read limit or query/mutation budgets. Capture the actual protected-profile baseline immediately before implementation after parent gates pass. Current static discovery is not that baseline.

## Native feasibility contract

Existing proposal remains [SH1 native/Pro feasibility](../../shipaton/sprint-20260921/NATIVE-PRO-FEASIBILITY.md); do not duplicate its commercial decisions.

Source finding: root src/app/layout.tsx is force-dynamic; authenticated pages call serverSupabase/requireUser; callback exchanges are server-side and cookie-based. There are no Capacitor or RevenueCat dependencies in package.json. A blanket static export is therefore not a demonstrated packaging path.

The next native package must bind a separate bundled-client entry and explicit adapters while retaining the hosted Next.js server. Reuse presentational components only after mapping Next navigation, session and server-only imports. Never package the old Vite application, import server secrets, or set a production remote server.url as a shortcut.

Before implementation, pin reviewed Capacitor/RevenueCat/secure-storage versions, native file allowlist, bundle identity and associated domain; identify actual sponsor access and selected test backend. These remain unresolved and this record is not SPEC-READY for native/auth/dependency work.

Bounded spike exit evidence: reproducible install; cold/warm recovery links; real synthetic sign-in/refresh/logout; one persisted authorized draft with cross-user denial; intentional offline/service failure; local assets; sandbox purchase/cancel/restore and trusted entitlement check. Label simulator versus physical-device and RevenueCat Test Store versus actual store sandbox evidence. Pro is never authoritative for Trust or Circle participation.

If client extraction requires broad rewriting, return measured scope and stop. Enrollment may proceed independently; no store eligibility or build capability is assumed from a public sponsor offer.
