## Execution binding — amended FV-1 v0.2.1

- Package: FV-1 v0.2.1
- Governing spec: `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md`
- `MERGED_BASE_SHA = APPROVED_SPEC_SHA = F1_TASK_BASE_SHA = 8b88718381b764b6a316ed3bc86a32372d655e12`
- Original v0.2.0 candidate: `a576640cc5b9828486d8bdd0f970636b3ff07138`
- Original documentation merge: `606d06bcded8e0afde0f2f4eca35a4986650ce5d`
- v0.2.1 encoder amendment merge PR #42: `8b88718381b764b6a316ed3bc86a32372d655e12`
- Rebinding commit on implementation branch: `672b482a781b8a9bb3eb7181baff68fae359f4f5`
- Branch: `codex/fv1-visual-release-evidence`
- Authorization: F1–F7 sequential implementation, one writer at a time, one PR.
- Product merge / deploy / release: WITHHELD.

Reconciliation: `606d06bcded8e0afde0f2f4eca35a4986650ce5d..8b88718381b764b6a316ed3bc86a32372d655e12` changes only the FV-1 specification, F1 packet and recovery manifest; there is no product-file drift.

The branch was rebased/rebound onto the exact v0.2.1 merge commit before any F1 product write. The amended §20 permits CPython 3.13.5 only with Pillow 12.3.0, libwebp 1.6.0 and the exact 88-byte / SHA-256 `a2dd5e25c6a9dd61b8194f496c8b3995a5ba2efc0abc9079ecd2b6cd8ec5450b` deterministic RGBA/alpha preflight recorded as F1 evidence.

Slice handoff SHAs and evidence will be appended here as F1→F7 are accepted. Full verification will not be claimed until independent nonwriting review, human NVDA testing, and founder visual review are complete.
