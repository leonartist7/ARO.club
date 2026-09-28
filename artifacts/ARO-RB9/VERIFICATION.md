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

Corrected handoff: inherited RB8 7b6f5db with founder-specified RB6 95ec421 and the upstream navigation tests. Runtime/share media unchanged by this correction; hosted rechecks and all previously recorded gates/blockers remain required.

Latest review-copy handoff: inherited RB8 e20be91 on exact RB6 5e22dcc. RB9 metadata/art and cloud work are preserved; the incoming RB3 distinct formation-preview copy and owner evidence are incorporated. New-head checks remain required; RB5 stays SPEC-REQUIRED pending independent retention/deletion privacy review, and RB2's independent gate stays open.

Protected-route repair handoff: inherited RB8 29e162d on exact RB6 1c4c2a1. Incoming reserved teacher-route exemptions preserve existing Auth guards; RB9 metadata/art and cloud work remain intact. New-head hosted checks and independent RB2/RB5 review gates remain required. No approval or release.

### RB6 2ea1fed / local Manrope stack reconciliation — 2026-09-28

Merged updated RB8 `27ac05ecf1c0d36a8c1c54c6fc877fb82a28462c` into prior RB9 `a6ba481e851b752abf13fc4ea7d27f1e4e010c8e` without conflicts. RB9 metadata, prior cloud repairs and evidence are preserved. Exact RB6 base is `2ea1fede95d9bf83a7ef14bca3a8f9bfc6a48bcd`, including main 721b2b7 / PR #83 local Manrope. No F7 evidence changed. New-head hosted checks are required; old-head failure/success records remain historical, not overridden by this merge. Final integrated verification is recorded in the RB10 implementation ledger. RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED draft retention/privacy, independent review and release gates remain open; no protected merge or release claim.

### Final RB6 8a8e5e2 reconciliation — 2026-09-28

Merged RB8 `04942890087be787a357327e66565502e645070c` without conflict, incorporating exact RB6 `8a8e5e2a9dbc325675f91f2466545f9955df4c2e`. Only RB6 verifier timing and owner evidence changed upstream from 2ea1fed; metadata/runtime and cloud work remain preserved. Previous combined-source local test results apply to the identical runtime, not a new hosted acceptance claim. New-head CI, RB2 privacy/eligibility, RB4 Trust, RB5 SPEC-REQUIRED retention/privacy, independent review and release gates remain open. No F7 evidence changes.
