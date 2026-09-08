# ARO-UX3 — Lived Moments Asset Prototype

> September 8 publication note: historical working-tree and test statements below describe preparation, not current remote availability or complete acceptance. See ARO_CLOUD_HANDOFF.md and artifacts/ARO-H0/VERIFICATION.md for snapshot publication and fresh smoke evidence. Original package status remains partial; no runtime gate changes.

## 0. Metadata

- **Status:** IMPLEMENTED / PARTIAL VERIFICATION
- **Spec version:** 0.4.0
- **Owner/director:** ARO founder
- **Implementation branch:** `feat/aro-ux0-opportunity-prototype` working tree
- **Depends on:** R1 SHIPPED; existing local-only ARO visual prototype routes
- **Blocks:** no semantic runtime package
- **Governing docs:** `AGENTS.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_BUILD_PLAYBOOK.md`
- **Required reviewers:** founder/product-design
- **Last updated:** 2026-09-07

## 1. Problem

Static text-only opportunity surfaces make different real-world possibilities feel interchangeable. ARO needs a small set of emotionally credible, contextual visual evidence without turning every UI control into generated decoration.

## 2. User outcome

Preview visitors see a distinct personal portrait and optional full-body expression preview, plus contextual opportunity, Passport, and season imagery. The assets help distinguish people, places, and lived moments while all actions remain prototype-only.

## 3. Goals

- Add original fictional profile/persona imagery plus context-specific moment and landscape images.
- Use them selectively in Profile, Express Your World, opportunity detail/list, Circle Room, Library, Passport, and Insights.
- Preserve code-native Lucide/SVG controls for navigation and functional actions.
- Keep image usage responsive, decorative where appropriate, and accessible with meaningful alt text for context-bearing images.

## 4. Explicit non-goals

- No biometric identity, face recognition, user upload, image moderation, remote media provider, storage, image search, AI API, generated UI icon system, outfit inventory, checkout, or persistent customization.
- No guarantee that images depict real users, real attendance, verified hosts, or actual venue state.
- No new opportunity, money, Trust, Auth, location, or P1–P5 behavior.

## 5. Locked decisions and invariants

- Assets are original illustrative/editorial prototype imagery stored locally under `public/`.
- The Maya portrait and full-body persona are original fictional representations, not a real account identity.
- Functional icons remain code-native and are never replaced by generated raster icons.
- Images use object-fit cropping; no UI text is embedded in image assets.
- Existing static/local data remains non-authoritative.

## 6. Data, API, RLS, privacy, Trust, money, and AI

N/A. This package adds local public image files and static URL references only. It issues no request and creates no new user or venue record, price, Trust assertion, or AI operation.

## 7. UI / UX, responsive, accessibility, and performance

- Profile uses the portrait inside the Personal Field and links to a local-only Express Your World preview.
- Express Your World uses a full-body persona against code-native composition controls; its selections stay in component state and reset on reload.
- Opportunity imagery maps to the matching static opportunity fixture; detail and Circle Room use the contextual image.
- Opportunity list and Library use small, meaningful cover crops.
- Context-bearing images get descriptive alt text; Library thumbnails remain decorative when duplicate text already conveys the content.
- Images are lazy-loaded below the immediate viewport where appropriate; no new dependency is introduced.
- Mobile and desktop crops must avoid hiding the relevant people/place subject.

## 8. Acceptance criteria

| ID | Requirement | Verification | Status |
|---|---|---|---|
| UX3-001 | Original assets match the warm, human ARO visual DNA | visual review | PASS — warm editorial portrait/persona, moment, Life Map, and season-cover asset set |
| UX3-002 | App surfaces use context-matched imagery | browser review | PASS — Profile, Express Your World, opportunity detail, Circle Room, Passport, and Insights checked locally |
| UX3-003 | Functional icons remain vector/code-native | source review | PASS — generated assets are content imagery only |
| UX3-004 | No remote media/API/Auth/AI/storage behavior exists | static audit | PASS — targeted route/data audit has no matching runtime reference |
| UX3-005 | Lint and build pass | command evidence | PASS — `npm run lint`; `npm run build` 2026-09-07 |

## 9. Rollout, recovery, and review

Local Preview only. Remove the local references to recover; no data migration exists. Founder/product-design review is required before a release. A full responsive/image-performance evidence pass remains required for visual-track verification.

## 10. Delivery record

Package: ARO-UX3
Status: IMPLEMENTED / PARTIAL VERIFICATION

The local static asset pack contains:

- `public/aro-maya-profile-portrait-v1.png` — original fictional Maya portrait
- `public/aro-maya-expression-persona-v1.png` — original fictional full-body Maya persona
- `public/aro-shared-stories-table-v1.png` — shared-stories table scene
- `public/aro-repair-table-v1.png` — repair-table scene
- `public/aro-passport-life-map-v1.png` — connected twilight Life Map scene
- `public/aro-season-discovery-v1.png` — human Season of Discovery cover

The existing local portal and river scenes remain mapped to the relevant static
fixtures. Browser review confirmed the shared-stories detail and Circle Room
render the correct scene, host language, and descriptive alternative text;
Passport and Insights render their respective Life Map and season cover with
descriptive alternative text. Profile links to Express Your World, whose local
controls change the preview and apply state without persistence, purchase, or
identity claim.
`npm run lint` and `npm run build` passed on 2026-09-07. The targeted source
audit found no fetch, Supabase, storage, Stripe/payment, geolocation, or AI
runtime reference in the UX3 surfaces. A full responsive and image-performance
capture remains before visual-track release verification.
