# ARO — Product & Architecture Changelog

## 2026-10-01 — Account deletion request scope

The founder authorized work needed for app submission compliance. AUTH2 v1.0.0 limits its first package to a discoverable owner-only deletion request and status path, with an append-only RLS-protected table. PR #97 is CI verified but unmerged and unshipped. A request is not erasure; processing operations, adult eligibility, AUTH1 hosted evidence, independent review and mobile builds remain separate release gates. See `specs/ARO-AUTH2-ACCOUNT-LIFECYCLE.md`.

Independent review on the later head identified callback allowlist, preview copy, durable decision and retention gaps. ADR-032 records the authorized bounded request and 30-day resolved-record purge rule. The processing package must operate and monitor that purge before release; the AUTH2 migration only enforces eligibility for it.

> **2026-09-29 AUTH1 decision:** The founder requested Google and email login for `aro-club.app` using the already configured ARO Supabase project and authorized production work. AUTH1 provides a separately switched production promotion path for that existing project, preserving exact URL/ref matching and denying quarantined projects. This intentionally supersedes N1's earlier exclusion of Google OAuth for this narrowly scoped package. Hosted authentication, provider delivery and independent security review remain release gates. See `specs/ARO-AUTH1-ACCOUNT-ENTRY.md`.

> **Purpose:** append-only record of meaningful ARO evolution. This is not implementation authority by itself; it records when the current direction changed and points to the documents that now define it.
>
> Do not rewrite history to make the project look cleaner. Add a new dated entry when a strategic, architectural, implementation-status, design, Trust, privacy, money or sequencing decision materially changes.

---

## 2026-09-29 — RB15 website integration candidate

Combined the latest RB13 visual source with RB14 direct preference controls and the compact footer on an isolated branch, preserving owner ancestry. Repaired the Circle's small preview notice and the browser assertion that conflicted with the founder's full-image direction. Local static and unit checks pass; hosted and independent review gates remain open. See `specs/ARO-RB15-WEBSITE-INTEGRATION.md` and `artifacts/ARO-RB15/VERIFICATION.md`. This does not change production `main`.

---

## 2026-09-29 — RB14 direct theme and language controls

Replaced the combined gear/preferences treatment with two direct, reusable controls: an icon-only sun/moon theme toggle and a compact EN/FR/ES dropdown with full-language choices. Applied the same interaction to public desktop/mobile navigation, onboarding, app Settings and the app shell while retaining the existing ThemeContext/LanguageContext storage contract and RB11 English/light opt-in behavior. Narrow app headers prioritize these real controls over non-actionable search/notification previews. See `specs/ARO-RB14-THEME-LANGUAGE-CONTROLS.md` and `artifacts/ARO-RB14/VERIFICATION.md`.

---

## 2026-09-29 — RB13 integrated visual candidate

Reconciled RB11 English/light release presentation and RB12 public redesign with the latest PR #84 source while preserving branch ancestry and later mobile onboarding corrections. Refined onboarding, public Explore/story, app Home and opportunity entry compositions around the approved orange/ivory identity and existing human art. Kept preview/Trust/Auth boundaries intact. `artifacts/ARO-RB13/VERIFICATION.md` records visual and route evidence and remaining review/release gates. This is not a `main` merge or store release.

---

## 2026-09-28 — English/light initial release priority

The founder set English and light mode as the immediate polish and release scope, with dark mode and French/Spanish completeness following in later packages. Existing localization/theme infrastructure stays intact. This does not change Auth, privacy, Trust, payment, independent-review, platform or store gates. The original rebranding plan is preserved as a historical source at `docs/rebrand/reference/ARO-Rebranding-Implementation-Plan-2026-09-27.md`.

---

## 2026-09-28 — RB10 signed-out account entry presentation

Localized and restyled Login, Signup and Forgot Password for the approved ARO identity while preserving disabled preview controls, Auth calls, return paths and legal links. See `specs/ARO-RB10-ACCOUNT-ENTRY-PRESENTATION.md` and `artifacts/ARO-RB10/VERIFICATION.md`.

---

## 2026-09-28 — RB9 share image and metadata

Added a controlled open-O/dot share graphic and OpenGraph/Twitter large-card metadata for the approved “Life opens up.” identity. It uses no host imagery or invented supply claims. See `specs/ARO-RB9-SHARE-METADATA.md` and `artifacts/ARO-RB9/VERIFICATION.md`.

---

## 2026-09-28 — RB8 shared supporting states

Replaced plain English route-loading and page-error screens with localized branded states, a boundary retry action, public Home recovery and reduced-motion status presentation. See `specs/ARO-RB8-SUPPORTING-STATES.md` and `artifacts/ARO-RB8/VERIFICATION.md`.

---

## 2026-09-28 — RB7 quiet navigation and preferences

Moved theme and language choices into a compact Preferences control and app Settings, added explicit system theme behavior and localized app shell labels, and removed the duplicate public bottom tab bar and future-only account links. See `specs/ARO-RB7-PREFERENCES-NAVIGATION.md` and `artifacts/ARO-RB7/VERIFICATION.md`.

---

## 2026-09-28 — RB6 review repair

Removed duplicate main landmarks from future-state pages, made dark keyboard focus visible, and refreshed browser evidence with actual Explore/onboarding CTA navigation and response checks. See `artifacts/ARO-RB6/VERIFICATION.md`.

---

## 2026-09-28 — RB6 public future route truth

Replaced the public seed leaderboard and unsupported bookings/checkout promise with localized preview states at their existing URLs. Preserved protected game, shop and character routes and all Auth, booking, reward and payment behavior. See `specs/ARO-RB6-PUBLIC-FUTURE-STATES.md` and `artifacts/ARO-RB6/VERIFICATION.md`.

---

## 2026-09-28 — RB5 review repair and privacy gate

Added contextual host Trust guidance and privacy links to FAQ, expanded the public-story/contact specification with local-draft data, retention, failure and acceptance contracts, and synchronized its provisional state in the canonical registries. RB5 is SPEC-REQUIRED pending independent privacy review of on-device contact text; the implementation remains unmerged. See `specs/ARO-RB5-PUBLIC-STORY-HELP.md` and `artifacts/ARO-RB5/VERIFICATION.md`.

---

## 2026-09-28 — RB5 public story and help

Replaced legacy About, How it Works, For Teachers, FAQ and Contact entry pages with the approved orange-led story and honest preview guidance. Removed invented team, reach, income, policy, support and social claims. Contact retains on-device drafts and states that no support inbox is connected. Footer links now have real destinations. See `specs/ARO-RB5-PUBLIC-STORY-HELP.md` and `artifacts/ARO-RB5/VERIFICATION.md`.

---

## 2026-09-28 — RB4 review repair

Suppressed persisted legacy fixtures in the global compare bar, kept recovery screens to one main landmark, returned generic 404 screens for unknown legacy IDs, and directed host interest to the local Create preview. Refreshed the route matrix with exact status and persisted-state assertions. See `artifacts/ARO-RB4/VERIFICATION.md`.

---

## 2026-09-27 — RB4 legacy fixture deep-link recovery

Old public experience, teacher, map, saved/recent, comparison and missing-page routes now resolve to a shared localized recovery view. It preserves URLs and stored identifiers while withholding fictional ratings, bookings, host verification and supply claims. No Auth, booking, payment, review or schema logic changed. See `specs/ARO-RB4-LEGACY-FIXTURE-TRUTH.md` and `artifacts/ARO-RB4/VERIFICATION.md`.

---

## 2026-09-28 — RB3 review repair

Narrowed the shared Trust claim to teacher verification, fixed the empty Explore landmark, made Create task selections visible and keyboard focusable, routed gathering to its local preview mode, and placed a preview boundary at the formation anchor. Regenerated the RB3 browser matrix from the repaired tree with direct behavior assertions. See `artifacts/ARO-RB3/VERIFICATION.md`.

---

## 2026-09-27 — RB3 public discovery and Create presentation

Moved the approved public promise, benefits and task entrances into Home; added an honest no-verified-supply Explore state because the legacy catalogue has dated synthetic booking and review fixtures. App Home presents the next action first and no longer shows example personal progress. Create exposes direct task entrances while retaining the accepted local Seed Studio controls. Host-verification footer copy now describes the publish gate rather than claiming existing verified teachers. See `specs/ARO-RB3-DISCOVERY-CREATE-PRESENTATION.md` and `artifacts/ARO-RB3/VERIFICATION.md`.

---

## 2026-09-28 — RB2 teaching scene and verification repair

The onboarding teaching illustration now shows adult conversational language practice in a public room, replacing the out-of-bound pottery scene while preserving its original for provenance. The preview discloses nonpersistence before teaser choices, keeps the preference action from covering choices, and runs its browser matrix in required CI. This is an implementation repair within the RB2 preview specification; independent privacy/security/Trust and release gates remain open. See `artifacts/ARO-RB2/VERIFICATION.md`.

---

## 2026-09-28 — RB2 onboarding review repair

Removed the closed food-preparation preview topic and the outdoor photography-walk example, changed the teaching headline to conditional language, repaired localized validation/announcements and saved-choice feedback, and expanded browser/privacy evidence. The source art exporter now verifies a pinned runtime against committed WebP bytes. RB2 remains IMPLEMENTED / PARTIAL VERIFICATION and merge-gated by independent privacy/security review. See `artifacts/ARO-RB2/VERIFICATION.md`.

---

## 2026-09-27 — RB2 nonpersistent onboarding preview

Added three brief illustrated scenes, skippable choice, in-memory name/age/city/interests or skill input, and honestly labelled learner idea or editable teaching draft. EN/FR/ES copy, dark mode and responsive scene exports are included. Existing live onboarding, eligibility, Auth, Trust, booking and payment contracts are unchanged. See `artifacts/ARO-RB2/VERIFICATION.md` for bounded browser evidence and remaining review.

---

## 2026-09-27 — RB1 brand foundation implementation branch

Implemented approved semantic colors, Manrope heading fallback, controlled open-O SVG assets, shared button and shell updates, browser icon and truthful metadata on a scoped branch. Build/lint/unit and sampled browser evidence pass; font delivery, full-route accessibility, review and production release remain open. See `artifacts/ARO-RB1/VERIFICATION.md`.

---

## 2026-09-27 — Orange-led ARO direction adopted for scoped implementation

The founder approved the open-O, single-dot identity, orange-led palette, Manrope/conditional Polymath typography, “Life opens up.” promise and brief onboarding. ADR-031 supersedes R2 presentation direction while retaining R2 historical evidence. RB0 route/asset baseline and RB1/RB2 scoped specifications prepare implementation; no new runtime, age collection, Trust, payment or release status is claimed.

---

## 2026-09-27 — R2 yellow and orange brand candidate

The founder-requested yellow primary, orange secondary, and supplied Noise Order title font were reconciled without reversing FV1 runtime/content fixes, then merged to GitHub `main` via PR #69 at `dc73daa`. Build, lint, tests, focused browser evidence, and the founder-delegated visual check passed. Full-route accessibility and production release are not claimed. See `specs/ARO-R2-YELLOW-BRAND.md` and `artifacts/ARO-R2/VERIFICATION.md`.

---

## 2026-09-08 — Autonomous workboard and visual-track master sync

The project now has `ARO_AUTONOMOUS_WORKBOARD.md`, a coordination layer for
separate cloud/local tasks. It distinguishes eligible read-only visual reviews,
future visual implementation after package approval, documentation health
checks, blocked runtime work, and founder-only gates. It does not create any new
product or runtime authority.

`AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_CURRENT_STATE.md`,
`ARO_IMPLEMENTATION_STATUS.md`, `ARO_SPEC_INDEX.md`, and `ARO_HOME.md` now
link the workboard and explicitly carry the UX1–UX3 static visual continuation
track beside UX0. The governed P1 → P5 order, I0 blocker, UX0 release decision,
and all product/runtime boundaries are unchanged.

---

## 2026-09-07 — UX1 personal-field visual-design track started

The founder authorized a deliberate frontend-first design track while P1's
authenticated/RLS implementation remains blocked. `ARO-UX1-PERSONAL-FIELD-
VISUAL-PROTOTYPE.md` scopes the first slice: a local-only Personal Field on the
ARO Profile route. It can visualize static wants, contributions, context and
boundaries, but cannot add P1 data, Auth, Supabase, persistence, intent,
location, matching, Trust, money or AI behavior. This does not alter the
governed P1 → P5 sequence or the production release posture.

The next companion slice, `ARO-UX2-SEED-STUDIO-VISUAL-PROTOTYPE.md`, scopes a
static Learn / Share / Gather Create experience. Its ingredient composition is
design-only and cannot create an intent, demand signal, AI output, host proposal
or opportunity.

On the local preview, UX1 signal selection/privacy explanation and UX2 Learn →
Share composition transitions were exercised. Both pages passed `npm run lint`
and `npm run build`; a targeted static audit found no fetch, Supabase, storage,
Stripe, geolocation or AI reference. They remain **IMPLEMENTED / PARTIAL
VERIFICATION** pending the dedicated light/dark responsive evidence pass.

## 2026-09-07 — UX3 Lived Moments visual asset prototype started

The founder requested stronger visual representation while preserving ARO's
warm, human, editorial DNA. UX3 scopes a small local asset pack: a fictional
Maya portrait and distinct static scenes for shared stories and repair. The pack
enhances Profile and opportunity surfaces only; functional controls remain
code-native, and no user media, identity verification, remote storage, API, or
AI runtime behavior is introduced.

The local implementation now maps the portrait and each contextual scene across
Profile, opportunity list/detail, Circle Room, and Library. Browser checks
confirmed the Shared Stories detail and Circle conversation use matching visual
and host language; a targeted source audit found no connected runtime behavior,
and lint plus the production build pass. UX3 moves to **IMPLEMENTED / PARTIAL
VERIFICATION**. Responsive/image-performance capture and founder design review
remain before any visual-track release decision.

The asset pack was extended with a connected twilight Life Map for Passport and
a people-first Season of Discovery cover for Insights. Passport proof rows now
use small contextual memory crops rather than anonymous records. Both routes
were visually checked in the local preview and the updated production build
passes. This remains a local static visual layer; it does not create Proof,
attendance, Identity, or P5 Passport behavior.

Profile now links to a new local-only **Express Your World** preview. It uses an
original fictional full-body Maya persona, composed Look/Carry/Atmosphere
controls, and a local apply state so the founder can judge the interaction and
layout. The choices reset on reload and do not create an account identity,
inventory, purchase, saved appearance, or data record. Route, interaction,
lint, and production-build checks pass.

## 2026-09-05 — UX0 required PR checks passed

PR #35's required `static`, `browser-smoke` and disposable `platform` checks,
plus the Vercel Preview and review integrations, are green on `f19fb31`.
The platform run retained the local migration, 81/81 SQL, Auth/API/Trust,
reset/replay and cleanup checks while proving the source-controlled prototype
browser boundary at 360px and 1440px in light and dark modes with no request to
the disposable Supabase API.

UX0 is now **IMPLEMENTED / CI VERIFIED / FOUNDER PREVIEW/PRODUCTION APPROVAL
PENDING** with 9/11 acceptance rows passing. Only UX0-001 and UX0-010 remain:
founder review of the Preview and explicit approval that merging PR #35 will
release the same change to Production. The PR remains open. Parent-I0 hosted
Auth/recovery/domain gates remain blocked, and P1 remains unauthorized.

A subsequent Codex pass found three additional prototype-boundary and
accessibility gaps. `/choose-role` now redirects to the disabled login boundary
instead of creating a legacy local player, clearing an anchor restores focus to
that anchor's first radio, and the small People/Place/Time result labels now
render at 13.59:1. The refreshed seven-route audit includes `/choose-role` and
`/leaderboard`, reports zero Supabase-domain requests and no simulated player,
and the full unit/E2E/build evidence remains green. The required hosted rerun
also passed on `db41760` (`platform` run `34001252147`; `static` and
`browser-smoke` run `34001252035`).

## 2026-09-04 — UX0 opportunity formation prototype implemented locally

`feat/aro-ux0-opportunity-prototype` replaces the homepage’s static orbit and
dominant marketplace-card wall with an authored ARO Field. A visitor selects
one bounded want, contribution and people/place/time context; the browser uses
the exact 3×3×3 fixture cross-product to form one explainable synthetic
possibility, recompute edits immediately and clear/reset ephemeral state.

The package adds complete English, French and Spanish keys, semantic text and a
live region, native keyboard controls, reduced-motion behavior and an original
face-free community-table image in responsive WebP variants. The full
360/390/430/768×1024/1440 light/dark matrix has zero overflow, console errors or
failed requests. Formation response begins in 1.8 ms, maximum measured CLS is
0.001616, the home chunk increases 3.36 kB gzip and named initial JS/CSS is
36.73 kB gzip smaller than baseline.

Source-controlled prototype mode remains on and mounts a static fail-closed
account boundary instead of initializing connected Auth. A compiled build with
synthetic Supabase-shaped variables made zero requests to Supabase domains
across UX0, login, signup, recovery and callback routes. The callback now shows
a translated unavailable state without simulating sign-in success. No provider, schema,
RLS, P1, realtime, AI, location, analytics, payment, Google, Production,
Tonguee or quarantined `aro-platform` state changed.

The disposable platform lane retains its 81 SQL assertions and synthetic
Auth/API/Storage lifecycle. Its application-browser phase now follows the
source-controlled UX0 mode: it verifies fail-closed account UI, callback and
protected-route behavior with zero local-Supabase requests instead of claiming
an authenticated application browser. Parent-I0 hosted Auth gates remain open.

Status is **IMPLEMENTED / LOCAL VERIFIED / FOUNDER PREVIEW APPROVAL PENDING**:
8/11 acceptance rows pass. Hosted PR CI and founder visual approval remain. Any
merge approval must explicitly include the automatic Production release. I0
remains gates-blocked and P1 remains unauthorized.

## 2026-09-03 — Preview scope verified; frontend-first UX0 authorized

The founder removed the two overlapping ARO Supabase Production+Preview
variables and created `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` entries
scoped only to Preview. Read-only Vercel inspection verified their names/scopes
without exposing values. Preview deployment
`dpl_6WhPjb9B8hY8uFiRGoTyMXZKbkqh` for merged `main` `58bf3da` reached READY and
the public application rendered. Literal value-to-project matching, Auth
callbacks, recovery, Production configuration and `aro.club` ownership remain
open. Existing inherited masked Stripe/Google entries were not modified or used.

After reviewing the Preview, the founder rejected the generic marketplace-first
creative direction and authorized **ARO-UX0 — Opportunity Formation Frontend
Prototype**. UX0 is SPEC-READY at
`specs/ARO-UX0-OPPORTUNITY-FORMATION-PROTOTYPE.md`. It focuses on an ownable
visual language and a deterministic real-time three-point interaction: what the
visitor wants, what they can bring, and people/place/time visibly form one
synthetic, explainable opportunity. Original generated imagery is authorized
within accessibility, provenance and performance budgets.

Hosted Auth/callback/recovery work is intentionally deferred during UX0. This is
not an I0 pass or a P1 waiver: I0 remains **IN-PROGRESS / GATES BLOCKED**, P1
remains **SPEC-READY / BASELINE BLOCKED**, and UX0 may not add connected backend
or accounts, schema/RLS, realtime provider behavior, AI, location, money, Stripe, Google,
paid resources or Production changes. Tonguee remains untouched and
`aro-platform` remains quarantined.

## 2026-09-03 — I0 protected-CI reset equivalence approved

The founder approved a versioned I0 amendment that accepts the existing
protected GitHub-hosted disposable Supabase reset/replay/cleanup lane as the
I0-004 reproducibility proof. Local Docker is now optional developer tooling,
not an infrastructure release gate. The evidence is not weakened: the pinned
lane remains isolated to GitHub-hosted Linux, applies ordered migrations from a
clean reset, runs platform/Auth/RLS/Storage/browser checks, repeats reset/SQL
verification and performs ownership-labelled cleanup.

I0 spec version advances to 1.1.0 and I0-004 moves to PASS. I0 remains
**IN-PROGRESS / GATES BLOCKED** on Preview variables, Auth callbacks, recovery
and domain ownership. P1 runtime did not start. No provider, database, domain,
payment, Stripe, Google, key, history, Tonguee or quarantined `aro-platform`
state changed.

## 2026-09-03 — I0 isolated hosted staging provisioned

After a refreshed Supabase quote again reported exactly $0/month and the
founder confirmed execution, `ARO.club Staging` (`mibydnerayobemhnlfyl`) was
created in `ca-central-1` and reached `ACTIVE_HEALTHY`. Tonguee remained
`ACTIVE_HEALTHY`; quarantined `aro-platform` remained `INACTIVE` and untouched.

The approved I0.2 migration applied successfully and all 60 transactional
application Trust/RLS assertions passed. Security advisors returned no
findings. The generic 21-test platform probe exposed three implicit default
grant differences for new `postgres`-owned public tables. Existing application
objects remained protected by explicit revoke/grant and RLS. An append-only
default-privilege hardening migration was added on
`infra/aro-i0-hosted-staging`; PR #31 passed all required checks and merged at
`1415113`. The migration applied successfully, after which hosted platform
21/21 and application Trust/RLS 60/60 assertions passed transactionally.
Staging retained zero Auth users, profiles and applications, and security
advisors returned no findings.

I0 moves to **IN-PROGRESS / GATES BLOCKED**; it is not VERIFIED. Mandatory local
reset, Preview variables, Auth callbacks, recovery and domain ownership remain
open. P1 runtime did not start. No Vercel variable/domain, payment, Stripe,
Google, paid resource, key, history or preserved-project state was changed.

## 2026-09-02 — I0 GitHub protection gate passed; hosted capacity state refreshed

Live GitHub verification found the stable `static`, `browser-smoke` and
`platform` checks green on current `main` commit `2712642`. The reversible I0
provider gate was then closed: `main` now requires pull requests, resolved
conversations and those three strict successful checks; admins are included and
force-pushes/deletion are disabled. I0-009 and Q0-008 are **VERIFIED**.

Live Vercel verification confirmed `aro-club` remains linked to ARO.club and its
`2712642` Production deployment is READY; `aro.club` remains absent from the
project and still serves the separate Spanish-language product. Live Supabase
verification found Tonguee `ACTIVE_HEALTHY` and quarantined `aro-platform`
`INACTIVE`. The old two-active-project capacity condition is therefore stale,
and a new project currently quotes $0/month, but creation still requires
explicit provider cost confirmation and an approved region.

No Supabase project, Vercel variable/domain, payment resource, Tonguee data or
quarantined `aro-platform` state was changed. Parent I0 remains **SPEC-READY /
IMPLEMENTATION BLOCKED** on hosted capacity/domain and local-runtime/recovery
work. P1 remains blocked and no runtime implementation began.

## 2026-09-02 — Correction: I0.2 independent review remains open

The preceding review-reconciliation entry over-promoted a supplemental
same-workflow read-only audit into formal independent package sign-off. That
claim is corrected: I0.2 remains **IMPLEMENTED / CI VERIFIED**, and I02-08
remains **IMPLEMENTED / REVIEW FOLLOW-UP** until an independent
security/privacy/Trust/operations reviewer inspects PR #28 and its CI evidence
and explicitly records approval or findings.

The supplemental audit is retained as transparent non-signoff evidence at
`artifacts/ARO-I0.2/INDEPENDENT_REVIEW.md`. Its local unit and database rerun
limitations are now recorded accurately. Parent I0 and P1 remain blocked; no
hosted provider, Tonguee, quarantined `aro-platform`, payment, Stripe or Google
state changed.

## 2026-09-02 — I0.2 independent review recorded and infrastructure state reconciled

An independent read-only security/privacy/Trust/operations review of the I0.2
implementation found no release-blocking defect within its isolated scope. The
review checked the append-only migration, grants and RLS, private review and
storage boundaries, verified-publish enforcement, client authority changes,
disposable-runner guards and PR #28 evidence. Local boundary tests, lint and
build passed; the local unit lane is environment-blocked by the host Node
20.18.1 and jsdom/undici worker incompatibility, while PR #28 remains the
recorded passing 61-test CI evidence.

`ARO_INFRASTRUCTURE.md` now matches the canonical delivery state instead of
describing I0.2 as an unapproved proposal. Parent I0 remains **SPEC-READY /
IMPLEMENTATION BLOCKED** on isolated capacity, domain and branch-protection
requirements. P1 remains **SPEC-READY / BASELINE BLOCKED**. No hosted provider,
Tonguee, quarantined `aro-platform`, payment, Stripe or Google state changed.

## 2026-09-02 — I0.2 application baseline and Q0 authenticated CI merged

PR #28 merged into `main` at `5976928` after both Isolated database and
Quality workflows passed. The disposable lane now proves the I0.2 migration,
81 transactional SQL assertions, synthetic Auth/API/Storage boundaries,
recovery/reset cleanup and authenticated 360px/1440px light/dark browser
evidence. Q0's authenticated regression gate is therefore no longer blocked
in this disposable CI scope.

Status transition:

- I0.2: **SPEC-READY / IN-PROGRESS → IMPLEMENTED / CI VERIFIED**.
- Q0: **IMPLEMENTED / AUTH-GATE BLOCKED → IMPLEMENTED / CI VERIFIED** in the
  disposable lane.
- Parent I0 remains **SPEC-READY / IMPLEMENTATION BLOCKED** on separate hosted
  capacity, domain and branch-protection requirements.
- P1 remains **SPEC-READY / BASELINE BLOCKED**; this merge does not authorize
  P1 runtime implementation.

The independent implementation review required by I0.2 remains a follow-up:
CodeRabbit returned a successful skipped-review status for this OSS repository.
No hosted provider, Tonguee, quarantined `aro-platform`, payment scope or paid
resource was changed.

## 2026-08-31 — I0.2 application/Auth/Trust baseline authorized

### Decision

The founder explicitly authorized the isolated ARO-only repair in PR #28. The
authorization excludes hosted/production mutations, Tonguee, quarantined
`aro-platform`, paid resources, payment providers, Stripe, Google and P1 feature
scope. The exact package contract is now version 1.0.0 and SPEC-READY.

### Implemented on the package branch

- added one CLI-generated append-only migration for private profiles/roles,
  application review and decision separation, teacher eligibility, publication,
  booking read authority, audit and private document storage;
- replaced browser-controlled verification/audit writes with one atomic,
  server-authorized decision path;
- persisted storage object paths instead of signed URLs and limited generated
  document access links to ten minutes;
- reconciled current Auth role, application and admin-review clients;
- expanded disposable CI to 81 transactional SQL assertions, real Auth/API/
  Storage boundary exercises and static isolation guards.

### Status transition

- I0.2: **SPEC-REQUIRED → SPEC-READY / IN-PROGRESS**.
- CI, independent review, authenticated browser evidence and final verification
  remain required before merge or any later rollout.
- No hosted provider or production environment was changed.

## 2026-08-28 — Q0 reliability and CI foundation

### Implemented

- eliminated the inherited 19 lint errors and 9 warnings without broad rule disablement;
- added a portable Vite/Chromium E2E harness with platform-aware child cleanup and a narrowly scoped Windows loopback-suspension retry;
- removed stale localStorage user impersonation journeys and replaced them with real signed-out, fail-closed and hostile-local-state contracts;
- added an explicit authenticated E2E gate that reports `BLOCKED_PREREQUISITE` until I0 supplies an approved isolated target and synthetic credentials;
- added stable GitHub `Quality / static` and `Quality / browser-smoke` jobs;
- made password recovery truthful and disabled without a backend, aligned the admin redirect with `/login`, fixed an inherited signup dark surface and repaired a corrupted footer separator.

### Verification

- lint PASS with zero warnings;
- unit PASS, 61/61;
- production build PASS, 2,602 modules;
- public/fail-closed E2E PASS, 16/16;
- 1440px live-Chrome visual audit PASS with no page error or framework overlay;
- main JS changed by only +0.04 kB minified/+0.04 kB gzip; no dependency changed.

### Status transition

- Q0: **SPEC-REQUIRED → IMPLEMENTED / AUTH-GATE BLOCKED**.
- I0 remains **SPEC-READY / IMPLEMENTATION BLOCKED**.
- P1 remains **SPEC-READY / BASELINE BLOCKED**.
- No provider, schema, domain, billing or production mutation occurred.

## 2026-08-28 — I0 isolated-infrastructure specification and provider baseline

### Added

- `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` 1.0.0 with local/Preview/Production boundaries, migration and secret contracts, failure analysis, cost gates, recovery strategy and requirement-level evidence;
- `artifacts/ARO-I0/BASELINE.md` with live read-only GitHub, Vercel, Supabase, domain and local-runtime evidence;
- `artifacts/ARO-I0/VERIFICATION.md` with requirement-level package evidence, 61 passing tests, passing build and the unchanged 19-error/9-warning lint baseline;
- an explicit $0 local Supabase path, currently blocked because this host has no Docker-compatible runtime.

### Provider truth

- Vercel `aro-club` is linked to `leonartist7/ARO.club`; `langgie` remains linked to `leonartist7/Tonguee`;
- M0 production deployment for `67d5c8d` is READY;
- Supabase Free still has two ACTIVE_HEALTHY projects: Tonguee and quarantined `aro-platform`;
- a new project currently quotes $0/month but cannot be created at the active-project limit;
- Preview branch compute currently quotes $0.01344/hour and remains unapproved;
- `aro.club` is not attached to the connected ARO Vercel project and currently serves a different Spanish-language site, so ownership/disposition is a founder gate.

### Security hygiene

Removed the literal legacy Tonguee browser anon key from `DEPLOYMENT.md` and replaced it with provider-neutral placeholders. SEC0 still requires no rotation or history rewrite solely for that publishable-key category.

### Status transition

- M0: **VERIFIED**.
- I0: **SPEC-READY / IMPLEMENTATION BLOCKED**.
- P1 remains **SPEC-READY / BASELINE BLOCKED**; no schema or provider mutation occurred.

## 2026-08-27 — Master Delivery Plan and cloud-task contract

### Decision

ARO now has one canonical durable delivery objective in `ARO_MASTER_DELIVERY_PLAN.md`: reach a production-ready, verified V1 opportunity loop through P5 with isolated infrastructure, deterministic quality gates, a measured platform/Next.js decision, an accessible experience foundation, governed AI architecture and a complete release/recovery audit.

### Added

- verifiable final stopping condition and definition of zero known release-blocking defects;
- autonomous-work and founder-only approval boundaries;
- enabling-package graph for M0, I0, Q0, N1, X1 and A1;
- detailed phase contracts through P5 and the final V1 audit;
- strict deferral of production 3D/AR, Seasons, P6, money providers and consequential autonomous AI;
- a copy-ready cloud-task starter prompt and package progress-log format;
- ADR-027 and mandatory discovery links from agent/status/build governance.

### Sequence clarification

The semantic product dependency remains P1 → P2 → P3 → P4 → P5. Enabling packages prepare infrastructure, reliability, platform, experience and AI boundaries; they cannot smuggle downstream product behavior into an earlier phase.

### Status transition

- M0 Master Delivery Governance: **ACTIVE / GOVERNANCE-READY**.
- I0: **SPEC-REQUIRED / BLOCKED** on isolated Supabase capacity.
- Q0, N1, X1 and A1: **SPEC-REQUIRED** at their named dependency gates.

## 2026-08-27 — R1 production release and P1 baseline gate

### Released

- merged R1 PR #22 into `main` as `494817f`;
- verified Vercel production deployment `dpl_DKCbYy8LvJAWP3tAzCA43oGGJUA2` as `READY`;
- preserved fail-closed account behavior while no ARO.club backend is configured.

### P1 baseline evidence

- captured the exact base SHA, 61 passing unit tests, passing production build, bundle sizes and inherited lint/E2E failures;
- captured eight 360px/1440px light/dark protected-route gate screenshots with no overflow, browser errors, blank state, error overlay or unnamed controls;
- completed a read-only Tonguee grants, RLS, function and advisor audit without mutating production;
- confirmed broad legacy grants/policies and advisor debt make dedicated private P1 tables mandatory.

### Environment gate

The founder approved a $0/month `ARO.club Staging` project in `lionovart's Org`. Supabase rejected creation because the account already has the maximum two active free projects. No project or charge was created. Tonguee remains preserved, and `aro-platform` remains **QUARANTINED — KEEP**. P1 runtime work remains prohibited until isolated capacity exists.

### Status transition

- ARO-R1: **VERIFIED / not SHIPPED → SHIPPED**.
- ARO-P1: **SPEC-READY → SPEC-READY / BASELINE BLOCKED**.

## 2026-08-26 — ARO.club repository separation and platform rebrand

### Decision

ARO now has an independent runtime repository, `leonartist7/ARO.club`. The original Tonguee repository, deployment and Supabase project remain preserved as the first language vertical and recovery path.

### Implemented

- integrated governed ARO history through `9394cb7` into the copied repository;
- introduced the ARO orbit mark, editorial typography and Bone/Ink/Vermilion/Saffron platform palette;
- replaced the universal shell, homepage, metadata and public platform language with ARO identity;
- preserved Tonguee explicitly as the first live language path, including existing teachers, experiences, bookings, Passport and Trust foundations;
- removed false platform-scale implications and labelled the wider Opportunity Engine as future capability;
- recorded four breakpoint/theme screenshots, 61 passing tests, a passing production build, responsive/accessibility evidence and inherited lint debt in `artifacts/ARO-R1/VERIFICATION.md`.

### Infrastructure boundary

- no provider configuration, schema, RLS, Trust, auth, payment, Stripe or Google mutation was made by the package;
- after the R1 branch was pushed, Vercel initially created a Preview deployment through inherited project `lionovart/langgie`, exposing the hosting-separation issue;
- the founder then created independent Vercel project `aro-club`, which successfully deployed safe copied-main commit `ce291193` as its Production baseline;
- ARO.club has no approved Supabase runtime target yet;
- Tonguee production must not be used silently;
- `aro-platform` (`jjgccfrwjkwknyjtbtxa`) remains **QUARANTINED — KEEP**.

### Status transition

- ARO-R1: **SPEC-READY / IN-PROGRESS → VERIFIED locally / PROVIDER-SEPARATED; not SHIPPED**.
- ARO-P1: remains **SPEC-READY**, gated by an isolated ARO.club environment and execution baseline.

### Preview resilience correction

The first independent preview revealed that the legacy Supabase client threw before React mounted when Vercel variables were absent. R1 v1.0.1 now permits public review routes to render without backend configuration. Authentication and account creation fail closed with explicit preview-state copy. No database credentials, provider configuration or production data were added.

---

## 2026-08-25 — Living Opportunity OS + Seasons / AR strategic expansion

### Why this changed

The initial recovered mobile/UI concepts were judged too visually generic and too close to a polished marketplace/event application. ARO needs an experience language that communicates its unique product thesis: opportunity **forming around a person**, not listings being served to them.

### Added

- `ARO_EXPERIENCE_SYSTEM.md`
- `ARO_SEASONS_AR.md`
- `ARO_CURRENT_STATE.md`
- `ARO_CHANGELOG.md`

### Experience direction

ARO is now explicitly framed as a **Living Opportunity OS**.

New signature concepts preserved as current strategic direction:

- ARO Field;
- Orbit;
- Portal;
- Path;
- Constellation;
- Opportunity Radar;
- Commitment Orbit;
- Circle formation;
- Passport constellation / Life Map;
- generative ARO Director surface;
- warm mineral/editorial visual identity rather than generic AI-purple UI.

### Visual-brand direction

Primary direction:

- Living Red / Vermilion;
- Bone / Warm Ivory;
- Ink / Near Black;
- Saffron / Warm Gold;
- Moss / Mineral Green;
- Clay / Terracotta;
- Night Plum;
- Mineral Sky Blue.

The O in ARO becomes a core visual primitive that can represent possibility, gathering, threshold, Circle and completion.

### Engagement direction

ARO should be emotionally compelling because it increases real-world possibility, not because it traps users in the screen.

Desired statement:

> “I keep opening ARO because my life gets more interesting.”

Explicit anti-patterns include endless feeds, punitive streaks, fake scarcity, paid randomness, pay-to-win Trust and manipulative notification loops.

### Seasons / game layer

Added strategic direction for:

- ARO Seasons;
- Personal Sparks;
- Weekly Quests;
- Opportunity Quests;
- Community Quests;
- Big Quests;
- Expeditions;
- ARO Sparks collectibles tied to real outcomes;
- future optional Season+ value layer.

Core idea:

> **Your city becomes the game board. Your life becomes the progression system.**

### AR / place layer

Added strategic direction for:

- ARO Beacons;
- Opportunity Trails;
- Travel Mode Expeditions;
- private Personal Life Map;
- future camera AR overlays for approved public opportunities/places.

AR is explicitly an amplifier after the 2D opportunity/place/privacy system works, not a prerequisite for the core loop.

### Monetization direction

Preserved potential future revenue layers:

- Season+;
- Host Pro;
- marketplace/service fees;
- Business Beacons;
- disclosed Sponsored Quests;
- premium Expeditions;
- creator Season revenue sharing;
- partner rewards;
- city/tourism programs.

Money remains governed by `ARO_MONEY.md` and future approved specs. No native speculative token is required.

### Shipathon narrative

The preferred demo is now a single complete loop:

`demand → composition → opportunity → commitment orbit → real-world Circle → Proof → Passport → Season progress`

with the memorable formation moment:

> **The Circle is real.**
>
> **It’s happening.**

### Status

These additions are **approved strategic direction** but remain **SPEC-REQUIRED / EXPLORATORY** for runtime work. They do not bypass SEC0 or the P1–P6 build sequence.

---

## 2026-08-25 — Spec-driven operating system added

ARO added a canonical spec/status vocabulary and package template so implementation no longer begins from chat instructions or brainstorm documents.

Key files:

- `ARO_SPEC_INDEX.md`
- `ARO_IMPLEMENTATION_STATUS.md`
- `specs/PACKAGE_TEMPLATE.md`

Required chain:

`Vision → durable decision → governing spec → package spec → implementation → tests → evidence → status update`

---

## 2026-08-25 — Obsidian + Graphify project brain added

ARO added two repository-only knowledge layers:

- Obsidian for human-readable linked specs/decisions;
- Graphify for machine-queryable relationships across code/docs/SQL/config.

Neither graph is implementation authority.

Key files:

- `ARO_HOME.md`
- `.obsidian/`
- `.agents/skills/graphify/SKILL.md`
- `tools/knowledge/`
- `specs/ARO-KNOWLEDGE-TOOLS.md`

---

## 2026-08-24/25 — Deleted-master recovery consolidated

The missing ARO vision was reconstructed from surviving generated artifacts, project context and the existing repository Director Pack.

Recovered/preserved areas include:

- Human Opportunity Network thesis;
- five universal primitives;
- original 12-system model;
- 40-point defensibility/evolution vision;
- economic flywheel;
- Personal Opportunity Agent;
- Passport;
- Human Composability / GUILD → ARO Teams lineage;
- Trust architecture;
- Shipathon loop;
- Tonguee as first ARO vertical;
- P0–P6 migration sequence.

Key files:

- `ARO_MASTER.md`
- `ARO_RECOVERY_STATUS.md`

---


## 2026-08-26 — SEC0 repository secret hygiene verified

### Decision

The founder confirmed that the historical environment file contained only browser-facing Supabase project URL and anonymous client key categories. No Stripe or Google configuration was present. The Tonguee Supabase project remains the canonical backend for the ARO migration.

### Repository remediation

- Removed `.env` from the active Git tree.
- Hardened `.gitignore` for `.env.*` while preserving `.env.example`.
- Recorded the classification and decision in `ARO_SEC0_REPORT.md`.
- Preserved Vercel deployment configuration outside Git.

### Risk decision

The founder accepted the documented historical exposure and chose no Git history rewrite. No rotation is required solely for the classified browser-facing categories. RLS and API exposure remain mandatory P1 baseline review items.

### Status transition

- ARO-SEC0: **BLOCKED / IN-PROGRESS → VERIFIED** after finalization PR merge.
- ARO-P1: **BLOCKED → SPEC-REQUIRED**.
- Next gate: approve the P1 private data/RLS/retention package spec and capture baselines before runtime implementation.

---


## 2026-08-26 — P1 capability and goal specification approved

### Decision

ARO-P1 is now **SPEC-READY**. The package contract defines one private language-learning goal plus bounded, self-declared language capabilities for an authenticated adult. It does not authorize P2 intent, public demand, matching, AI, location, money, Google, Stripe, new verticals or a broad redesign.

### Data and privacy direction

- New P1 data belongs in dedicated owner-private tables rather than publicly readable profiles.
- Self-declared capability remains separate from verified teacher evidence.
- No automatic backfill from local Zustand state or legacy profile fields is allowed.
- Anon and other users receive no access; admins receive no default access.
- Exact RLS, grants, retention, deletion and regression requirements are locked in the package spec.

### Repository discovery

The current learner experience persists onboarding/profile state primarily through a local Zustand player store with best-effort profile mirroring. The connected Tonguee Supabase project remains the canonical backend and reports an existing RLS-enabled marketplace foundation but no recorded migration history through the connector. Repository Trust SQL exists; the execution baseline must verify which Trust controls are applied live.

### Added

- specs/ARO-P1-CAPABILITY-GOAL.md
- specs/ARO-P1-BASELINE.md

### Status transition

- ARO-P1: **SPEC-REQUIRED → SPEC-READY**.
- Runtime: not IN-PROGRESS.
- Next gate: capture the exact pre-code Git, test, build, visual, accessibility, performance and Supabase baseline, then open one P1 implementation branch.

---


## 2026-08-26 — Infrastructure and environment registry added

### Why

GitHub, Vercel, environment-variable and Supabase decisions were distributed across security reports, PRs and chat context. Agents need one no-secret operational map before changing providers, branches or production state.

### Added

- ARO_INFRASTRUCTURE.md
- agent read-order and authority-map links
- ADR-025 for the secondary Supabase project quarantine
- founder-only and agent-only TODO checklists

### Locked operational state

- leonartist7/Tonguee remains the repository.
- main remains the current production/default branch.
- feat/aro-p0-director-reset remains the governed ARO integration branch.
- Vercel remains connected to the Tonguee repository; its exact Production/Preview environment mapping requires founder dashboard confirmation.
- Supabase Tonguee ref ybhecubqnhukgpvchjay remains the canonical ARO backend.
- Supabase aro-platform ref jjgccfrwjkwknyjtbtxa is **QUARANTINED — KEEP** because five auth accounts remain, despite empty public-table estimates and no storage objects.
- Stripe and Google provider configuration remain out of scope.
- No provider, deployment, schema, auth or runtime state changed in this documentation package.

### Next gate

Complete the human Vercel/Supabase dependency checks in ARO_INFRASTRUCTURE.md, while the program proceeds only to the documented P1 pre-code execution baseline.

---


## 2026-08-26 — Main/ARO branch topology verified

A post-merge comparison reports main and feat/aro-p0-director-reset as diverged. The governed ARO branch is three commits ahead and one commit behind. The main-only commit ce291193 is an empty documentation-promotion commit: its comparison with parent 931f2614 contains no changed files.

This is a Git ancestry difference, not missing runtime or documentation content. The P1 execution baseline must record it and may reconcile ancestry safely if needed, but must not overwrite newer SEC0, P1 or infrastructure governance.

---

## Changelog rule

For future entries include, when relevant:

- **why** the change happened;
- what was added/removed/deprecated;
- status transition (`VISION`, `EXPLORATORY`, `SPEC-REQUIRED`, `SPEC-READY`, `IN-PROGRESS`, `IMPLEMENTED`, `VERIFIED`, `SHIPPED`);
- affected canonical documents;
- migration or compatibility implication;
- security/Trust/privacy/money consequence;
- next gate.

This file is append-only evidence of evolution; `ARO_CURRENT_STATE.md` remains the concise answer to what is true now.

---

## 2026-08-30 — I0.1 disposable Supabase CI implementation

Parent I0 already permits a synthetic, disposable CI database. Added a bounded I0.1 specification and implementation on `feat/aro-i0-ephemeral-ci` to exercise this lane without hosted capacity or a local Windows container runtime. The harness pins CLI 2.116.0, restricts execution to GitHub-hosted Linux, enforces loopback bindings, runs a rolled-back RLS probe and synthetic Auth/recovery lifecycle, and verifies reset and targeted cleanup.

Local boundary tests pass (6/6); existing unit tests pass (61/61), lint is clean and the production build/bundle is unchanged. Actual CI database/Auth tests and pre-merge security/operations review are pending. Status: **IN-PROGRESS**, not VERIFIED. See `artifacts/ARO-I0.1/VERIFICATION.md`.

Corrected stale infrastructure branch/main references against live GitHub (`87121a7`). No hosted variable, domain, provider, application table, historical SQL or dependency was changed. The fixture deliberately has no product migrations; application migration provenance and full I0/Q0 Auth/P1 gates remain unresolved. Tonguee is preserved and aro-platform remains **QUARANTINED — KEEP**.

### I0.1 live verification update

PR #27 commit `6a2c0da` passed Isolated database run `33325347032` in 1m37s: 6 boundary assertions, 21 pgTAP assertions twice, real synthetic Auth/recovery/password-change/logout/admin denial, reset-erasure and targeted cleanup. Quality run `33325347076` also passed. Status is now **IMPLEMENTED / REVIEW PENDING**; the existing CodeRabbit integration is performing the explicitly requested security/operations review. No skipped-review SUCCESS is treated as approval. Detailed timings and remaining scope limits are recorded in `artifacts/ARO-I0.1/VERIFICATION.md`.

### I0.1 review and migration-source clarification

The requested automated security/operations review completed with two minor findings. PR metadata was already corrected; caller cancellation and a strict recovery-poll deadline were fixed with two new tests (8/8 local PASS). A fresh runtime CI run is required before merge.

Read-only Tonguee catalog inspection confirmed the repository Trust tables, profile role and verified-publish trigger are absent live; experience policies lack verification checks. This changes the next migration action: a reviewed application-baseline reconciliation is mandatory, not a blind schema copy. Evidence is in `artifacts/ARO-I0.1/MIGRATION_SOURCE_AUDIT.md`. No production data, schema, provider or quarantined project was changed.

### I0.1 package verification

Runtime commit `54e41b7` passed Isolated database run `33325803194` and Quality run `33325803093`. Eight boundary tests and all SQL/Auth/reset/cleanup assertions pass. Both review threads are resolved. I0.1 is **VERIFIED** for its platform-only scope; PR #27 release is pending. Parent I0 and P1 are not verified. No further paid review or provider capacity was requested.

## 2026-08-31 — I0.1 release reconciled; I0.2 approval proposal recorded

PR #27 merged at `467a11d` on August 30. Main Isolated database run
`33326228058` and Quality run `33326228026` passed. I0.1 is **SHIPPED**
for disposable platform CI only. Current status documents now reflect the
release instead of the pre-merge snapshot; historical entries remain unchanged.

Added I0.2 proposal 0.1.0 and the application audit based on August 30 source
inspection and read-only live catalogs. The audit distinguishes database
permissions from client/static/local-state demonstrations and identifies
private-profile exposure, field-authority gaps, application submission/review
conflicts, non-atomic approval, publication coverage and client money authority.
PostgreSQL's implicit WITH CHECK behaviour is documented accurately.

Status: **SPEC-REQUIRED / DIRECTOR DECISION REQUIRED**, not implementation.
No migration, runtime, dependency, hosted provider or production change.
Fresh August 30 lint, 61/61 unit tests and build passed; they do not test the
identified application database behaviours. Next gate is bounded isolated-only
approval and reviewed exact contracts, not a paid-resource purchase. Tonguee
remains read-only and aro-platform remains **QUARANTINED — KEEP**.

## 2026-09-08 — Shipaton master execution preparation

- Added SHIPATON_MASTER_PLAN.md and the requested metrics, monetization/design/OneSignal evidence, BuildInPublic log/drafts, demo storyboard and Devpost working draft.
- Added shipaton/AWARD_MATRIX.md and the evidence vault with a dated local baseline audit.
- Recorded the native packaging/RevenueCat/OneSignal gaps, synthetic runtime boundary, unresolved provider gates and conditional new-Google-personal-account testing schedule.
- Fresh baseline: lint PASS; 73 tests PASS; build PASS with existing data-age/chunk warnings. Sandbox access failures resolved by approved reruns, without source changes.
- No runtime, schema, provider, publishing, package status or release gate changed. Existing uncommitted UX work preserved.

## 2026-09-08 — ARO-H0 cloud audit snapshot publication

Founder requested all current material on GitHub default branch (`main`). Package existing static `/app` prototype, local UX1–UX3 specs/assets and Shipaton planning material with `ARO_CLOUD_HANDOFF.md`. Correct stale SEC0/infra assertions, commit-route documentation and unrestricted task-selection/writing prompts. Audit tasks use one immutable merged revision and external evidence folders. Publication does not certify visual acceptance, approve FV-1, close I0 or unlock runtime packages. Fresh delivery evidence is recorded under `artifacts/ARO-H0/`.

## 2026-09-08 — AUTO0 autonomous execution and memory

Implement a repository-only cloud execution toolkit: exact-SHA disposable bootstrap, generated task packets, source/evidence hashing, dependency-gated report imports, browser evidence on GitHub-hosted Playwright and Obsidian-compatible durable memory. Founder selected existing ChatGPT cloud workers with no new API billing. Cloud schedule availability and actual audit completion remain separate verification facts. Product source and I0/P1/FV-1 gates are unchanged.

## September 8, 2026 — AUTO0 report contract repair

Follow-up tooling correction on codex/auto0-report-contract-fixes: validate imported run provenance before copying evidence, align C1 revision-scoped packet/import/status paths, and capture browser evidence on every main push. Eighteen tooling tests pass locally. No runtime scope, product gate or billing authority changes.


## 2026-09-08 — FV-1 final approval candidate and reconciled handoff

Prepared authoritative `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md` v0.2.0, still SPEC-REQUIRED. It selects the outstanding user-visible defaults, technical budgets, reproducible lab profile and independent/human review plan. F1 cloud encoder availability passed an in-memory synthetic test; no audits were rerun and no product changes were implemented. F1 now requires the actual approved documentation merge revision; F2–F7 require accepted predecessor commits on ONE implementation branch/PR. Documentation merge, implementation and release approvals remain separate. Existing recovery provenance is preserved; no new planning infrastructure was added.


## 2026-09-08 — Founder approves FV-1 documentation merge and implementation

Founder explicitly approved merging PR #40 through normal checks, the proposed defaults and F1–F7 sequentially on ONE isolated branch/PR. Approval is recorded against FV-1 v0.2.0 candidate `a576640cc5b9828486d8bdd0f970636b3ff07138` (identical spec at reviewed head `78005892071b7996917f8f10d04e5cd601f124d2`). Package is SPEC-READY; actual documentation merge SHA governs F1 and the approved spec, followed by exact accepted predecessor SHAs. No product changes or audit reruns accompany this record. Release/product merge approval remains WITHHELD; independent review, human NVDA testing and founder visual review are required before full verification.

## 2026-09-09 — FV-1 F1/F2 progress synchronized to main

FV-1 v0.2.2 records the founder-authorized, narrow 640,000-byte limit for the required 960px lossless persona derivative; all other F1 budgets and release gates remain unchanged. F1 is accepted at `c0813087f9f4f0b6d5b4dc6930030d5942457298` after deterministic media checks, local validation and passing PR CI. F2 is IMPLEMENTED / CI-VERIFIED at `d1313f942b93ad50dbb0f244c71157eef03e571b`, adding truthful shell disclosure, non-actionable previews, navigation ownership, recovery and focus support. The founder authorized the current PR #41 progress to merge to GitHub `main` through normal checks. No release/deployment or full FV-1 verification is authorized; F3–F7, independent review, human NVDA testing and founder visual review remain pending.

## 2026-09-21 — N1 current-main reconciliation (IN-PROGRESS)
Ported the local Next.js migration onto current main 79603ae while preserving newer F1–F6 assets, translations, pages and tests. Added versioned Vercel framework configuration and adapted retained browser suites to Next.js. Enlarged-text verification exposed app-shell reflow issues, corrected without changing normal layout intent. Provider audit confirms Vercel production is still Vite, Supabase staging is healthy, and OIDC is enabled. Preview deployment and hosted auth evidence are pending. See specs/ARO-N1-VERCEL-ROLLOUT.md.

N1 verification update: required static/browser-smoke/platform checks pass at 2a3dd35. READY protected Next.js preview, 71 hosted parity checks, six hosted staging-boundary checks and complete disposable Auth/RLS checks pass. Real hosted email/SMTP, production backend/domain, independent review and AI Gateway activation remain open. Existing production /app direct entry returns 404; Preview resolves it. JavaScript payload regression is recorded in N1 evidence.

## 2026-09-21 — N1 production readiness extension
Founder authorized production release. Added separate production-project auth activation with staging/quarantine exclusions; repaired staging Site URL and exact callback allowlist. Local lint, type checking, production build and eight focused auth tests pass. Production provisioning, custom SMTP, hosted email flows and independent security review remain open; Gateway still requires card verification. No production cutover or database mutation occurred.

## 2026-09-21 — MERGE1 latest-work reconciliation

Preserve merged Next.js runtime; integrate controller/Shipaton records and reconcile AUTO0 page/handler capture tooling. All open PRs have immutable inclusion/supersession/preservation dispositions in docs/merge-reconciliation-20260921/README.md. Historical failures and F7/hosted/human gates remain. No product, schema, dependency, workflow or provider changes.

## 2026-09-22 — FV-1 F7 lab-profile amendment reconciliation candidate

Documentation-only PR #47 is reconciled onto MERGE1 current main `f37dc084d7172415f581a41e90d2edd9ba3738b9` without changing product, provider, dependency, budget or release authority. It records FV-1 v0.2.3’s founder-approved narrow 8272CL exception for F7 measurement only, preserves every other §20 requirement, and makes its eventual normal main merge commit the fixed F7 approved-spec binding. F1–F6 remain accepted predecessors; existing PR #48 / `codex/fv1-f7-acceptance-evidence` remains the exclusive F7 lane with immutable F6 base `79603ae1af60a30f86c105e0f2a4d841043eb727`. F7 is still blocked until the documentation merge exists and exact lockfile-managed Chromium 151.0.7922.34 revision 1234 installs and launches headlessly. No measurement, independent review, human NVDA test, founder visual review, product merge, deployment or release is recorded.

## 2026-09-24 — FV-1 F7 Next launch/environment amendment approved candidate

Founder approval persisted at controller commit `c145ebd52395a9e8a0104cdaa5ddd78a4672ff35` authorizes v0.2.4’s documentation-only isolated Next build/runtime contract in PR #47, normal merge after exact-head checks and independent review, then bounded compatibility reconciliation only on existing PR #48. This candidate binds current package/lockfile/config bytes, rejects inherited environment/provider/auth configuration, and corrects the local production base URL to 127.0.0.1:5173. It preserves F6 as historical predecessor, all frozen host/browser/network/budget/privacy/human/release gates, and the exact Chromium prerequisite. No source, dependency, provider, browser, compatibility, measurement, merge, deployment or release work is recorded.

Ownership clearance for the later PR #48 reconciliation is recorded separately by controller commit `7526ead5c289229b836bc5e236c9cd9d8c985c3a` / blob `57253a75a7e0fca59a3d1112a6caf5399f43ed52`: N1 is inactive and its seven partial test paths remain preserved. This does not start reconciliation, browser setup or measurement from this documentation PR.

## 2026-09-26 — FV-1 F7 frozen-input fingerprint correction

While bringing documentation PR #47 up to current main, the three SHA-256 values in §20 were found inconsistent with their already-pinned Git blob IDs and byte lengths. The values now match the exact Git blob bytes; the blobs, source files, acceptance budgets and release gates are unchanged. This correction is subject to exact-head independent review and required CI before the documentation merge.

## 2026-09-28 — RB7 cloud continuation

RB7 remains IMPLEMENTED / PARTIAL VERIFICATION on PR #79. Hosted diagnostic
`c39d0f7` confirmed footer interception of the legacy onboarding Skip action.
A presentation-only intrinsic-height repair and short-viewport/keyboard
Preferences improvements are prepared with local build/lint/type and 180 unit
tests passing (3 existing skips). Hosted browser/visual verification is pending.
See `artifacts/ARO-RB7/VERIFICATION.md`. No Auth, persistence, Trust, payment,
RB2 independent-review, F7 or release gate changed.


### 2026-09-28 — Hosted rebrand regression repaired

RB7's fixed-height onboarding cards were overlapped by the public footer. The bounded minimum-height repair and quiet-preferences accessibility polish are propagated through the existing RB7–RB10 stack. RB7 source bbd1b2b passes Quality 36407355886 and platform 36407355888; RB10 source add2a41 passes Quality 36407547820 and platform 36407547856. Original assertions, Auth/Trust/RLS, privacy/eligibility, payment and F7 boundaries remain intact. Retained screenshots and machine results are in artifacts/ARO-RB7/cloud-continuation. The implementation ledger records exact source/evidence provenance and final-HEAD check requirements. Status remains IMPLEMENTED / PARTIAL VERIFICATION, unmerged; RB0 conversations and independent RB2 review remain gates.

## 2026-09-28 — RB7 reconciles reviewed RB6

Normal merge of RB6 8799e78 preserves upstream review repairs and cloud RB7 layout/preferences work. Conflicts combine responsive header behavior, translated navigation and the reviewed World exit; stale navigation tests are aligned without skipping coverage. RB2 independent review and RB5 SPEC-REQUIRED privacy review remain blocking. See artifacts/ARO-RB7/VERIFICATION.md.


### 2026-09-28 — Reviewed RB6 propagated through RB7–RB10

Reconciled RB6 8799e78 with cloud RB7–RB10 using normal merge ancestry, preserving both review fixes and cloud evidence. Local navigation assertions now match the incoming reviewed World exit. New-head hosted checks remain required. RB2 independent privacy/security review and RB5 SPEC-REQUIRED contact-draft retention/deletion review are blocking; existing conversations stay open. No main merge or release. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.

### 2026-09-28 — Reconciliation exposes reserved-route collision

Recorded new hosted platform failure and the incoming RB4 proxy collision with /teacher/application. Preserved all assertions and Auth code; handed the narrow routing repair to RB4/Auth ownership. No release or review-gate promotion.


### 2026-09-28 — Corrected RB6 handoff incorporated

RB6 95ec421 supersedes 8799e78 and includes the upstream navigation-test repair. Its exact test versions are propagated through RB7–RB10 with cloud runtime/evidence preserved. The previously requested upstream assertion repair is satisfied; hosted reserved teacher-route/provenance failures and independent RB2/RB5 review gates remain. See the rebrand implementation ledger for exact heads and check provenance.


### 2026-09-28 — RB6 5e22dcc review-copy update propagated

RB7–RB10 now incorporate exact RB6 5e22dcc, including distinct RB3 formation-preview copy and refreshed owner evidence. Cloud work and normal ancestry are preserved; new-head hosted checks must confirm the strict-text repair. The teacher-route collision is unchanged. RB5 remains SPEC-REQUIRED pending independent retention/deletion privacy review; RB2 independent review and conversations remain open. No approval, protected merge or release. See the rebrand implementation ledger.


### 2026-09-28 — RB6 1c4c2a1 protected-route fix propagated

RB7–RB10 incorporate exact RB6 1c4c2a1. Incoming RB4 exemptions preserve the existing Auth path for /teacher/dashboard and /teacher/application; the earlier collision now has a source repair, pending new-head hosted confirmation. Cloud work and evidence are preserved. RB5 remains SPEC-REQUIRED pending independent contact-draft retention/deletion privacy review; RB2 and review conversations remain open. No merge approval or release. See the rebrand implementation ledger.


### 2026-09-28 — Hosted CI and fresh independent review checkpoint

Confirmed RB3–RB6, RB8 and RB10 source heads pass hosted Quality and Isolated database. RB7 Quality (/choose-role content check) and RB9 platform (1440px dark document chooser) remain red; exact heads/runs are in docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md. Founder reports clean/pushed lower worktrees and fresh independent Codex re-reviews requested for #72–#78/#84. Requests are not approvals: RB2 specialist privacy/security and RB5 SPEC-REQUIRED retention/deletion privacy gates remain open. No protected merge or release.


### 2026-09-28 — RB6 2ea1fed and local Manrope propagated

RB7–RB10 incorporate exact RB6 `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main 721b2b7 / PR #83 local Manrope. Normal merge ancestry preserves cloud work and F7 evidence. The Header resolution retains compact real account destinations and RB7's future-only link omissions. Final local build/lint/types pass; 185 tests pass with 3 existing skips. Production font HTTP/hash checks pass; fresh visual recheck is blocked by invalid Chromium downloads and remains pending with new-head hosted CI. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft-retention/privacy, independent review and release gates remain open. PR #84 stays with its owner and needs reconciliation onto the latest RB10; its earlier green checks are not integration approval. Exact sources, checks and limits: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — Final RB6 8a8e5e2 handoff

RB7–RB10 now incorporate exact RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`, superseding 2ea1fed. Only RB6 verifier waits and owner screenshots/evidence changed; tested runtime, local Manrope and cloud work are preserved. Fresh hosted checks are running, not accepted. Prior teacher-document chooser failures are not declared fixed. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent-review and release gates remain open; PR #84 needs owner reconciliation on latest RB10. Details and exact source/check provenance: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 ff1c7b6 review repairs propagated

RB7–RB10 incorporate exact RB6 `ff1c7b65cc23958b66754f0d75faffae736a7e7d` with normal conflict-free ancestry. RB1/RB6 presentation contracts, corrected RB2 dependency wording and RB3 composition focus-ring/capture repairs are preserved; cloud work and branch ownership remain intact. All four previous cloud heads passed both hosted workflows; fresh merge-head CI remains required. RB5 stays SPEC-REQUIRED and unmerged pending independent on-device Contact draft retention/deletion privacy approval. RB2 privacy/eligibility, RB4 Trust, independent review and release gates remain open. No F7 evidence change or self-approval. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md for exact sources, test evidence and limitations.


### 2026-09-28 — RB6 13e2571 reconciled; PR84 owner plan

RB7–RB10 incorporate exact RB6 `13e257107b5726e911210a1eb8048ce3d42143ac`. Shell localization conflict is reconciled using the incoming dictionary/44px target with cloud navigation behavior preserved; onboarding short-screen and host-boundary repairs propagate intact. Local webpack build/lint/types and 187 tests pass (3 existing skips). RB6 hosted Quality fails an ambiguous Aperçus selector already scoped to a heading in cloud; its separate platform chooser failure remains open. Fresh cloud-head CI is pending. PR #84 remains untouched; docs/rebrand/PR84-RECONCILIATION-PLAN-20260928.md gives its owner the ledger-conflict and source-preservation plan. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED draft privacy, independent review and release gates remain OPEN. Exact sources and limits: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 327c681 selector correction incorporated

RB7–RB10 now include exact RB6 `327c6812f390a726b885dfda06fc9524d66a6cb2`. The test-only selector repair matches the already-preserved cloud assertion; no runtime/test behavior change. Previous local 187-test/build/lint/type evidence remains applicable, while exact-head hosted checks remain pending. PR #84 owner plan is updated to this base; its branch remains untouched. RB2 privacy/Trust, RB4 Trust, RB5 SPEC-REQUIRED contact privacy, independent review and release gates stay OPEN. See the rebrand implementation ledger for exact heads and historical failures.


### 2026-09-28 — RB6 9eb4e15 preview repairs propagated

RB7–RB10 incorporate exact RB6 `9eb4e15d2435eb08787a0b8db10ae601987f5053` with conflict-free normal ancestry. Adult language-practice art, early nonpersistence disclosure, preference CTA flow and the required-CI six-path RB2 verifier propagate without losing cloud work. Pinned WebP reproduction passes. Owner's Windows full E2E OOM is recorded as a failed run; cloud fresh browser acceptance remains unavailable. Prior RB10 platform rerun remained red at the document retry chooser. PR #84 is now 91a3ceb on old RB10 and stays with its owner for another reconciliation. All privacy/Trust/contact-retention, independent-review and release gates remain OPEN. Exact checks and sources: docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md.


### 2026-09-28 — RB6 1184639 mobile preference repair propagated

RB7–RB10 incorporate exact RB6 `1184639f47eeaecebcb6a5b754ad7f7974d9d144` with conflict-free ancestry. Bounded scrollable mobile choices, sticky CTA and stronger viewport/separation/focus assertions propagate without losing cloud work. Corrected provenance: old pottery WebPs remain public but unused, not removed. Prior RB7/RB9/RB10/#84 heads pass both hosted workflows; RB8's document-chooser failure stays recorded. Fresh merge-head checks and independent privacy/Trust/contact-retention/review/release gates remain required. PR #84 stays with its owner for the next reconciliation. See docs/rebrand/IMPLEMENTATION-LEDGER-20260928.md for exact sources, results and limits.


## RB15 exact-head hosted reconciliation — 2026-09-29

RB15 exact-head hosted Quality `36593625126` and isolated-database `36593625117` succeeded on `a0cef112380f34f9c47c2a7e160fbbe4561fcf2e`. The platform passed after one failed-job rerun; the intermittent document chooser root cause remains unresolved. Independent privacy/Trust/design/accessibility, protected merge and release gates remain open.


## 2026-09-29 — RB16 visual coherence

**2026-09-29 RB16:** English/light visual coherence is IMPLEMENTED / PARTIAL VERIFICATION on `codex/rb16-visual-coherence-20260929`, scoped directly to RB15 `a0cef112`. Create, app Home, opportunity list/detail and shared headings/preferences receive bounded presentation corrections. Before/after renders and local checks are in `artifacts/ARO-RB16/VERIFICATION.md`; exact-head hosted CI, CodeRabbit and independent release decisions remain required. No main merge or live transaction enablement.

Inherited PR #90 CodeRabbit findings were checked and corrected here: historical evidence-status drift, reduced-motion controls and language-menu keyboard navigation. Original package history, cloud controls, full-image onboarding and F7 evidence remain preserved. This does not resolve privacy/Trust/design/accessibility or release gates.

## 2026-09-29 — RB17 reference-led first journey

The founder supplied six visual references and prioritized a clearer, more human website-to-app path. A bounded presentation package moves the Home human story before the prototype diagram and simplifies app Home/Create without claiming real inventory or account personalization. The production dependency lanes for Auth/profile, locality/discovery, host lifecycle and transactions are recorded in `docs/rebrand/PRODUCTION-PATH-20260929.md`. This does not change money, privacy, Trust or release authority. See `specs/ARO-RB17-REFERENCE-JOURNEY.md` and `artifacts/ARO-RB17/VERIFICATION.md`.

## 2026-10-01 — AUTH3 account lifecycle continuation

AUTH3 v1.0.1 continues PR #98 from c9ab6ef after recovering PR #97 and inspecting newer work. It repairs verified PKCE recovery routing, malformed navigation cookies, same-account late profile results and signup/recovery success copy. No SQL, worker, dependency or product scope changes. Predecessor runtime 97103ee has complete disposable evidence; exact-head c9ab6ef isolated verification failed at the document chooser. New-head CI and independent acceptance remain pending. Live migrations, deployment configuration, queue operations, hosted provider tests and native store evidence remain BLOCKED. See artifacts/ARO-AUTH3/VERIFICATION.md.


### 2026-10-01 — AUTH3 v1.0.1 verification recorded

Runtime `526774b` passed Quality `36894695807` (249 unit tests, 3 existing skips, lint/types/build and all browser jobs) and isolated database `36894695790` (165 SQL assertions twice, actual Storage/Auth erasure, authenticated matrix, reset/cleanup). Documentation-only follow-up records these results. Independent final-head acceptance and live migration/configuration/provider/native rollout gates remain pending; no live erasure or store-ready claim.


### 2026-10-01 — AUTH3 hosted build configuration correction

Automatic Vercel preview failed with `STATIC_BUILD_NO_OUT_DIR` because inherited Vite project settings expected `dist` after a successful Next.js build. Pin the Next.js framework and `.next` output in `vercel.json`, preserving the daily deletion cron. Preview/exact-head results are tracked on PR #98; no production migration or flag activation.
