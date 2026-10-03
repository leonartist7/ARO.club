# ARO-RB9 — Public share image and metadata

## Authority and scope

- Status: **SPEC-READY**, version 1.0.0, 2026-09-28. Founder-approved orange brand direction; stacked on RB8.
- Scope is public site OpenGraph/Twitter presentation and the generated share asset only. Keep existing initial approved origin `aro-club.vercel.app`, page titles, privacy/legal text, Auth, Trust and release contracts unchanged. Do not imply live supply or bookings.

## Experience contract

Create a controlled 1200×630 share image with the production SVG open-O/dot geometry, orange `#F05A28`, ivory `#FFF8EE`, yellow `#FFD447` and charcoal `#252420`. Render “Life opens up.” and “Learn · Earn · Connect.” as real image text without claims about users, inventory or earnings. The image is a brand graphic, not a host/venue photograph. Give it concise alt text. The page metadata should advertise the image as OpenGraph and Twitter large card through Next's metadata system; a valid response and content type are required.

No raster-generated logo master, speculative trademark claim or extra external asset source. Keep image transfer reasonable; record dimensions, bytes and visual crop. Preserve the existing favicon.

## Verification

Build, lint and type check; fetch the generated image from the running production build and inspect pixels visually at full and scaled preview. Confirm metadata URL, alt text, response type, dimensions and no fake supply claims. Record a screenshot/asset and transfer size. Package stays IMPLEMENTED / PARTIAL VERIFICATION until independent review and merge.
