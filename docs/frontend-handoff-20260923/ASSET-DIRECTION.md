# Art direction and production briefs

## One recognizable world

ARO should feel like a small world made by people: matte ceramic, folded paper, woven fabric, warm stone, soft daylight, rounded but confident forms. Characters are adult, inclusive and expressive. The emotional register is curiosity, belonging and possibility. Keep silhouettes readable at small sizes. Duolingo is a reference for consistency and immediate comprehension; ARO keeps its own typography, palette, metaphors and characters. Preserve Coco and Tonguee in their established domain.

Use the existing eight subjects first: avatar, hat, bag, lantern, plant, Spark, courtyard and Season scene. Optimized exports already live under `public/personalization/`. See their source manifest and PV1 evidence before regenerating. Do not promise a wearable pose or anchor from art that only supports a separate object tile.

## Production queue

These are proposed art masters, not assets generated in this handoff. Generate only when the consuming package is eligible and the existing art cannot satisfy the brief. The master blueprint's broader 36-master library remains the later queue.

| ID | Consuming surface | Brief | Master / delivered shape | Priority |
|---|---|---|---|---|
| S01-WORLD | Season flagship | Original walkable neighborhood vignette with four distinct landmark areas | 2048×1536 scene; 4:3 plus intentionally recomposed phone crop | Reuse Season first |
| S01-OUTSIDE | Chapter 1 | Welcoming doorway, tiny planted threshold, warm lantern | 1024 square, transparent isolated diorama | After EF-S composition |
| S01-CONNECT | Chapter 2 | Two welcoming chairs and a shared ceramic table | 1024 square, transparent | Same series |
| S01-CONTRIBUTE | Chapter 3 | Shared garden workbench, plant, simple tools | 1024 square, transparent | Same series |
| S01-CREATE | Chapter 4 | Open paper portal with a small gathering scene | 1024 square, transparent | Same series |
| C01-HAT | Character studio | Existing hat at exact avatar camera/anchor | 1024 square RGBA aligned to avatar canvas | Only if current alignment fails |
| C02-BAG | Character studio | Woven bag with vermilion strap at body-compatible angle | 1024 square RGBA; front/back layers if needed | Later; do not fake current wearable |
| R01-RUG | Space | Warm woven circular rug, flat floor perspective | 1024 square RGBA | Later catalog extension |
| R02-STOOL | Space | Clay/wood low stool, same scene camera | 1024 square RGBA | Later catalog extension |
| R03-BOOKS | Space | Three tactile books, one small sprig | 1024 square RGBA | Later catalog extension |
| M01-MEMORY | Passport | Quiet ceramic memory object with ARO circle motif | 1024 square RGBA, no coin/currency resemblance | Reuse Spark first |
| E01-EMPTY | Empty collection | Open tray and one seed, hopeful and unhurried | 1024 square RGBA | Optional; text/action comes first |

New catalog objects are not implicitly authorized by their art brief. They require placement/compatibility and package-scope adoption before becoming selectable UI.

## Generation prompt system

Use the supplied existing avatar/scene as an image reference when continuity matters. Inspect it first. Do not ask the generator to invent all assets in a single sprite sheet; produce separate coherent masters. Generate no interface text, prices, badges or navigation inside raster artwork.

**Isolated object template:**

> Create one original ARO object: [object and material]. Premium tactile 3D illustration, matte ceramic and woven natural materials, confident rounded silhouette, restrained bone/vermilion/moss/saffron palette, soft warm key light from upper left. Match the supplied reference's camera angle, scale and material rendering. Isolated centered object with generous clear bounds on a genuinely transparent alpha background; no checkerboard, backdrop, floor slab, text, logo, price, glow, sparkles or extra objects. Readable at 64 pixels. Provide clean edge detail and no baked rectangular shadow. [For wearable: exact canvas, pose and anchor from supplied avatar reference; occlusion layers as separately specified.]

**Season scene template:**

> Original ARO Season 01 “Awaken Your City” scene, without rendered words. An inviting miniature human neighborhood in warm stone, clay, woven fabric and matte ceramics. Four clearly separated areas suggest stepping outside, connecting, contributing and creating. A gentle path connects them. Inclusive adult-scale social setting, grounded joyful daylight, sophisticated editorial simplicity. Leave quiet negative space for live HTML labels; no embedded labels, progress tracks, coin piles, urgency, brand imitation or busy game HUD. Compose a wide scene and a deliberate phone crop so all four areas remain understandable. Camera and materials consistent with the supplied ARO courtyard reference.

**Character variant template:**

> Preserve the supplied original ARO character identity, proportions, camera and neutral standing pose. Create [specific expression/outfit variation], warm adult-friendly stylized 3D, tactile matte surfaces, restrained brand colors, inclusive presentation. Transparent background. Keep hands and silhouette clear, avoid childish proportions and exaggerated beauty ideals. No text, unrelated accessories or change of identity. Ensure clothing layers can be aligned with the original canvas.

## Asset manifest and QA

Record for each master: stable ID, source/generation provenance, reference IDs, prompt, dimensions, alpha presence, camera, normalized anchor, content bounds, intended route, decorative/informative role, alt-copy key, license/provenance record, export formats/sizes/bytes and reviewer result.

Export 128/256/512px object variants and scene widths appropriate to actual slots. Proposed object target ≤45KB at 256px and ≤100KB at 512px; scene ≤180KB phone and ≤300KB desktop. These are targets to validate, not guaranteed image-generator output. The shared route transfer budget still wins. Retain transparent WebP or appropriate alpha-capable formats; never flatten a wearable onto white.

Inspect alpha against Bone, Ink and a saturated QA backdrop: no white fringe, checkerboard, clipped shadow or unintentional translucent body. Inspect small-size silhouette, dark-mode contrast and phone crop. Anchor metadata belongs in the manifest, not guessed CSS offsets across unrelated assets. Use explicit dimensions to prevent layout shift. Decorative scene art has empty alt text; controls and factual labels remain semantic HTML. Do not use fictional generated portraits as evidence of real hosts, attendance or credentials.

## Motion choreography

Object selection: 160–200ms opacity/scale settling, no idle loop. Chapter selection: highlight path segment and update detail; reduced-motion changes state instantly. Room placement: brief settling only after user action, then still. Character mood: one readable expression change, not perpetual bouncing. First meaningful success in the future connected product may earn a quiet celebration, but synthetic preview actions must remain labeled preview feedback.
