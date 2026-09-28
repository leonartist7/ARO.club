# ARO-RB9 — Share metadata evidence

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb9-share-metadata-20260928`, stacked on RB8. Not merged or released.

## Changed

- Added a controlled 1200×630 PNG OpenGraph image generated from the production open-O/dot SVG paths and approved orange, ivory, yellow and charcoal. It says “Life opens up.” and “Learn · Earn · Connect.” without live supply or income claims.
- Set the Twitter card to `summary_large_image` and the OpenGraph site name to ARO. The Next metadata file convention supplies the image URL, dimensions, type and alt text. Existing favicon and initial approved origin remain.

## Evidence

[Rendered share image](opengraph-image.png) and [production-build metadata response](metadata.json). `GET /opengraph-image` returned 200 with `image/png`, a valid PNG signature and 50,175 bytes. The HTML advertises `https://aro-club.vercel.app/opengraph-image` for both OpenGraph and Twitter, 1200×630 dimensions and the intended alt text. The image was inspected at full size. Build, lint, `npm run type-check` and `git diff --check` passed. The inherited RB8 browser-smoke check is green; its hosted platform check remains red at the existing teacher-onboarding language skip step.

## Limits

The local production build and metadata response are verified. Social network scraper cache behavior, independent brand/legal review, merge and release remain open. This graphic is not a photograph or proof of actual opportunity inventory.

## 2026-09-28 cloud continuation

Inherited RB7's layout/preference repair and retained evidence through normal RB8 merge ancestry. No RB9 share image, geometry, metadata or crawler behavior changed. The original hosted onboarding failure is now diagnosed and repaired; RB7 source bbd1b2b passes Quality run 36407355886 (static, 32 browser component checks, 16 preferences scenarios and 25 E2E checks) and platform run 36407355888. See [RB7 evidence](../ARO-RB7/VERIFICATION.md#retained-hosted-evidence-cloud-continuation). Descendant HEAD checks and social crawler acceptance remain required; independent review and release gates are unchanged.

## Reviewed upstream reconciliation — 2026-09-28

Merged RB8 1ea6280 in stack order, preserving cloud share metadata/art and incorporating reviewed RB6 8799e78 through RB7 c7dfd8f. No RB9 media was regenerated. New-head hosted checks are required. RB2 independent privacy/security review and RB5 SPEC-REQUIRED contact-draft privacy review remain blocking; conversations remain open. No main merge or release.
