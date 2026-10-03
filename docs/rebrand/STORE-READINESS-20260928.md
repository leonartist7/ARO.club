# ARO mobile-store readiness — repository inventory, 28 September 2026

Source: RB10 at `e272fccc`, plus the scoped RB11 release presentation. This is an evidence inventory, not a submission or approval.

| Item | Repository evidence | Disposition |
| --- | --- | --- |
| Web app | Next.js 16 App Router, `next build`/`next start`, Vercel Preview/Production; routes under `src/app` | A web deployment is not an iOS/Android store binary. |
| Native packaging | No `ios/`, `android/`, Xcode/Gradle project, Capacitor/Expo config or native dependencies | Absent; native runtime and server-route/Auth strategy need an approved package. |
| Signing/delivery | No bundle IDs, provisioning/keystore setup, Apple/Google app records, Fastlane/EAS or store-upload CI in tracked files | No store pipeline demonstrated. Account access and signing custody require an authorized owner. |
| Public policies | `/privacy`, `/terms`, `/cookies` exist; `/contact` is an unsent local draft | Legal accuracy, support contact, deletion/export and store data declarations need review against actual behavior. |
| Backend/Auth | Signed-out preview forms fail closed when unconfigured; N1 production backend, email and independent security review remain gated | Live account journeys cannot be advertised as working. |
| Inventory | RB3/RB4 mark examples and no verified live supply; F1–F6 app paths include local preview commitments/Circles/messages | No bookable supply or sent messages may be implied. |
| Visual scope | RB11 offers an opt-in English/light build; other locales/themes remain in source | No release gate is waived. |

## Actual route reconciliation

`docs/rebrand/BASELINE-20260927.md` contains the route-by-route inventory. Public Home/Explore/story/help/account entry and onboarding preview are present; legacy saved/experience/map routes recover truthfully from fictional fixtures. App Home, World, Create, opportunities/detail/commit, Circles, library, profile and settings are present behind the existing account boundary. `/chat` is the existing messaging route; there is no `/app/messages` route in this tree. Teacher application/dashboard exist under Trust/Auth; admin is separate and protected. Games/shop/character builder remain future-only. Route presence does not establish live supply, Auth, persistence, booking or delivery.

## Ordered path to store candidates

1. Resolve RB0 review conversations, obtain independent RB2 privacy/security review, and get required checks on final heads before stack-order merges. Verify the opt-in release build separately.
2. Complete live eligibility/privacy/Trust specifications and independent review before collecting live age/profile or publishing host offerings. Verify production backend, email/Auth recovery, account deletion/export, policy text and actual inventory claims.
3. Approve a native packaging decision and package spec for this server-rendered Next.js app: navigation/deep links, Auth callbacks, offline/error behavior, safe areas/keyboard, accessibility, privacy permissions, versioning and rollback. Build/test iOS/Android projects and signed test binaries; a static web export cannot be assumed to preserve server routes.
4. An authorized owner validates Apple Developer and Google Play Console access, app IDs, signing, verified policy/contact URLs and store disclosures. Prepare real device screenshots, metadata, age/content ratings and reviewer access reflecting available features.
5. Run native device/platform CI, beta/internal tests, independent reviews and store-policy review. Submit only after gates pass; record receipts and review outcomes before claiming availability.

**Smallest founder action now:** assign an independent privacy/security reviewer for RB2 and a reviewer to resolve RB0's addressed conversations. A later native-package decision and store-account access are necessary; no credentials should be sent in chat.
