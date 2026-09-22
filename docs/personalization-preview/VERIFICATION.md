# PV1 implementation handoff — 2026-09-22

Five connected pages implement the approved Your Little World direction:

| Page | Route | Working preview behavior |
|---|---|---|
| Profile | `/app/personalize` | Courtyard, sample identity, About/Passport/Collection, saved hat and room |
| Character | `/app/personalize/character` | Hat/bag preview, three atmospheres, save/cancel |
| Shop | `/app/personalize/shop` | Category filters, search, empty state, item dialog, editor links |
| Space | `/app/personalize/space` | Five placement zones, compatible objects, remove/undo/save/cancel |
| Season | `/app/personalize/season` | Four chapter dialogs and free/Season+ comparison |

Run `npm ci`, `npm run dev`, then open `/app/personalize` on the development origin.
The existing shell, old profile and all existing routes are preserved. Data is a sample persona and in-memory kit. No backend, inventory, purchase, reward or progression integration is claimed.

## Evidence
- Unmodified base build/lint passed at f37dc084d7172415f581a41e90d2edd9ba3738b9.
- Implementation production build, lint and TypeScript checks passed.
- Seven targeted Vitest tests passed: compatible placement, single-instance movement, immutable saved room, removal, character save/cancel, shop filtering/editor destination, room undo and four chapter dialogs.
- Seven original artworks exported as 14 WebP files; asset provenance, dimensions and hashes in `public/personalization/manifest.json`. Object exports under 39 KB; largest environment under 76 KB.
- Source provides responsive layouts for 360–1440px, theme variants, EN/FR/ES, native-dialog keyboard behavior, 44px controls, reduced-motion alternatives and safe-area-aware toast placement.

## Explicit outstanding verification
Visual browser screenshots, actual phone/Safari/Android testing, overflow/contrast measurement, keyboard focus-return behavior and runtime network audit remain unverified. The available cloud browser refused the local preview URL with ERR_BLOCKED_BY_CLIENT. No screenshot has been fabricated and jsdom interaction tests do not substitute for device/browser checks.

This is **IMPLEMENTED / LOCAL CHECKS PASSED / VISUAL ACCEPTANCE PENDING**, not production acceptance. Before merge, review all five pages at 360/390/430/768/1440px in light/dark, EN/FR/ES, reduced motion, and keyboard-only. Check hat fit and courtyard item anchors against the generated images. Verify no horizontal overflow and no fixed navigation obstruction. Exercise missing-image retry, empty search, Escape/focus return, reset, and subroute saved-preview continuity.

A raster preview is not a rigged 3D character: the hat is composited and the bag is explicitly shown as a separate kit preview. No animation rig, GLB or fitted wardrobe mesh is claimed. New production inventory or seasonal-pass commerce needs its own approved package.

## Release posture
Review branch/draft PR only. No merge, production deployment, or change to F7/I0/P1/Proof/payment/release gates. This package provides no truthful percentage for the entire ARO frontend program.
