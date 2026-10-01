# Circle Builder guide artwork contract
Version 1.0.0 · ARO-CB1-P · 2026-10-01

## Family and provenance
Original assets were generated specifically for this ARO preparation using ImageGen on 2026-10-01. No existing Tonguee/Coco files were edited or relabelled. A Library reference returned extracted text only, with native pixels unavailable; it was not used as an image reference. Tonguee was generated from the written direction; Squilly and Rockatoo used that newly generated Tonguee image as a style reference.
Source PNGs are preserved under artifacts/ARO-CB1-P/originals/. No third-party characters, logos, readable claims or source art were requested. The generation receipt is project provenance, not an assertion of exclusive copyright or legal clearance in every jurisdiction. Generated output is intended for the project's use under the generation service terms; no third-party licence is represented.
All guides share warm orange/gold/ivory shapes, charcoal expressive outline, a welcoming open hand/wing, readable eyes and full contained silhouettes. Rockatoo's main feathers are white/ivory, with a golden/orange crest, dark beak and outline. Guides introduce a role, never a qualification.

| Guide | Category | Species | Original blob |
|---|---|---|---|
| Tonguee | Languages | Chameleon; spiral tail | 0698af9e93dcd4f495160cdf36e7ade3251673ba |
| Squilly | Skills | Squirrel; fluffy upright curled tail | d624879bf16f1132490144bc8a3eee4765d6dea2 |
| Rockatoo | Music | White cockatoo; crest/curved beak/white plumage | 3266d2c07bdda148a6a278098672843d26af1cb0 |

## Delivery/render contract
One reviewed static pose, welcome, per guide is sufficient for CB1. All choose/shape/details/review/ready states reuse it with relevant text. Thinking/pointing/ready variants remain future optional additions, not missing required files. No animation sprite or pose-changing claim.
Deterministic export uses Next's already installed sharp image encoder: preserve transparent composition, resize inside 192/384 square, WebP quality84/alpha100. No redraw/crop/background replacement. Exports <=40KiB/96KiB; actual receipts and hashes go in the manifest.
Mobile box 96x96 CSS pixels; desktop box160x160; object-fit:contain, width/height or aspect-ratio reserved. Use 192px source for 1x compact/2x96px; 384px for desktop or higher density. Never serve the >800KiB original PNG in app markup.
Only the active guide fetches an image. Inactive guides are not preloaded/eagerly rendered. Category switching may request the chosen guide; preserve geometry and text during load. No extra request for a minimized guide; restore uses the same source.
Adjacent text supplies guide name and role; art uses alt="" and is decorative. Standalone nondecorative usage needs a localized concise species/name alt. Hide guide does not hide required instructions.
On failure, replace once with a stable labelled category icon (existing lucide icon) inside the same box. No external avatar/emoji representation promised as final mascot; manual operation and validation remain usable.
Artwork colors are illustration pixels, not new UI tokens. Ivory and dark surfaces require the outline; accessibility meaning stays in adjacent text.

## Review and release boundary
Independent design review inspects the three originals and compact light/dark rendered samples. Synthetic art review markup is CI evidence only, not an app route. Record approval/findings in artifacts/ARO-CB1-P/REVIEWS.md.
This PR adds source art/optimized assets without connecting them to current Create. Founder requested the guide mapping and warm/pretty direction; no claim of founder approval of unseen art. A later aesthetic change can replace this version through an explicit asset revision, preserving provenance and dimensions.
