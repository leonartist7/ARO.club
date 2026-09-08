# Recovery provenance and verification

Date: 2026-09-08. Recovery owner: existing cloud task `Schedule audit tasks`; publication owner: current desktop documentation task.

## Retrieved dependency evidence

The cloud worker freshly downloaded A1/A2/A3 plus the saved transport archive containing original A4/S1 bundles. It extracted outside its pinned source and successfully imported all five using AUTO0 at `6495e67798ad14876f6c04815f9f5e13eaf52b83`, with source `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`. It reports complete required fingerprints, report/manifests/evidence hashes and audit-only execution authority matched; source check passed; all reports COMPLETED; leadEligible=true; implementationEligible=false; independentlyVerified=false.

The current desktop task inspected the saved lead report and recovery claim in the Library UI and retrieved the completed reply through read_thread. It did not download the five archives into this Windows checkout or rerun imports/audits. Preserve that distinction: compatible hashes are not independent product acceptance.

The following original bundle SHA-256 values are transcribed from the saved recovery claim, not recomputed on Windows:

| Bundle | SHA-256 |
|---|---|
| A1 | `517d8b97f295088ab4891123750b4e0f6237fd4b1083112ac3f75fc9e4bf7340` |
| A2 | `813d518ce5737e316c79cf3eb1521d4276f9ba59b0ac3355ed6b84dc08e9e601` |
| A3 | `b31c95861617a4f18660b6478616b6d3a6b3460878845cbafd896204d98910e1` |
| A4 | `8360c76bd26113d0c9b49eeca34e7d3354153b1fbf199500e7401c20fbc1d587` |
| S1 | `4484ee8eca5c7537a91f485a921ecd02e0f8e57a6fa7857caade78d57c1db953` |

A4 and S1 are their nested original ZIP identities, not the outer transport ZIP. Existing provenance/adaptation records were retained, not synthesized anew. The saved dependency-validation receipt hash in the claim is `d0b3158ec9a8861d189d1c46786498b106db2ed073f5d15758b6e79b335e0cfe`.

## Guarded history and once-only execution

Old checkpoint: BLOCKED, saved version 3, SHA-256 `ab23dd36fdb738718f1813acd2e190e0c4e264feb7b73f3dde4661ffba0bf8f1`. It remains preserved; do not overwrite or reset it.

Separate recovery: `ARO-lead-recovery-H0-AeBPHgAC.json`. The cloud worker reports READY v0 → CLAIMED v1, fresh claim retrieval, then one completed synthesis and COMPLETED v2. Its final export passed corrected import validation. A stale Library preview initially showed CLAIMED. A fresh latest-version retrieval in response `eb39fa05-ba88-5f19-a244-599f14365253` confirmed saved version 2, COMPLETED, synthesisPerformed=true and synthesisRunCount=1; no corrective save was needed. Never reclaim from a cached preview.

- Latest recovery record SHA-256: `aaacbd4a1d5eca6745c0124f0102502aa08c5cd44ab3ff12aceb9209632da418`.
- Completed cloud export SHA-256: `2a6babca52989856365a4427492e28dd97ca4bbf9a6b1aeb9a9ce10c2e295fdb`.
- Dependency-validation SHA-256: `d0b3158ec9a8861d189d1c46786498b106db2ed073f5d15758b6e79b335e0cfe`.

Those export/validation hashes matched the freshly retrieved completed record. All five dependencies remain COMPLETED at H0, leadEligible=true and implementationEligible=false.

C1 remains weekly; obsolete lead coordinator remains disabled, observed in task UI. No new schedules were created.

## Retrieval map

The user's cloud Library folder `ARO-audits-06730c74b44d-20260908` retains A1/A2/A3/A4/S1, setup and lead evidence. In `lead`, the desktop task directly observed:
- `proposed-ARO-FV-1.md` (25.2 KB);
- `report.md` (6.48 KB);
- `ARO-lead-FV1-proposed-H0.zip` (66.5 KB);
- `lead-export-validation.json` (6.97 KB);
- recovery and original checkpoint files.

The compact lead ZIP contains the five original reports and integrity/transport receipts; original screenshots remain in the source audit bundles. Access is through the existing account's Library, not a shared sandbox path. Private attachment URLs and raw unreviewed bundles are not published in this documentation PR.

This GitHub edition supplies the reviewed proposed scope, full cloud handoff text, seven individually usable packets and provenance summary. It is a documentation edition, not a byte-identical copy of the cloud ZIP. Local document hashes in `manifest.json` identify this edition only.

## Documentation verification

- Confirmed local source HEAD and GitHub main: `6495e67798ad14876f6c04815f9f5e13eaf52b83`.
- Empty H0→base diff for src, public, e2e, package.json, package-lock.json and tailwind.config.js. No new product audit.
- `npm run lint -- --max-warnings=0`: exit 0 on the unchanged base.
- `npm run build`: exit 0 on the unchanged base. Initial sandbox attempt could not resolve esbuild configuration; one authorized retry passed. Existing >500kB shared-chunk and browser-data-age warnings remain; no dependency change.
- Proposed implementation commands and acceptance rows have not run; product acceptance remains pending.
- Documentation-only allowlist, links, packet fields and whitespace are checked before commit. PR CI has its own status and is not predeclared passing.

## Publication and execution boundary

A combined cloud request to retrieve and publish unreviewed bundles was rejected by automatic approval review for potentially sensitive export. A narrower in-cloud retrieval/validation request was accepted. This PR contains reviewed technical documentation, not those bundles or private URLs. No blocked raw export is attempted.

Founder preference: Terra/high for subsequent implementation. Actual cloud selection was not certified by cloud controls; the visible task selector read GPT-6 Astra Medium. No new model/API billing was added. Implementation still requires recorded product-design approval and exact dispatch pins.


## Final approval preparation — 2026-09-08

The [authoritative candidate](../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md) v0.2.0 selects the prior unresolved defaults and reconciles execution bases. Historical recovery evidence above is unchanged. Cloud preflight and environment inventory were bounded capability checks, not audit reruns. F1 records the exact synthetic encoder command/result. Spec section 20 records the actual cloud profile and missing Chromium binary; no install or product test was performed.

Documentation validation checks relative links, all seven packet sections, finite exclusive ownership, ordered dependencies, intentionally blocked execution fields, and normalized UTF-8/LF SHA-256 manifest entries including the authoritative specification. Runtime acceptance remains NOT RUN. Product source/config/assets are unchanged from the proposal baseline. Prior build/lint and PR checks apply only to their tested revisions; new PR checks must be inspected at the updated head. No implementation or release approval is inferred from any documentation check.
