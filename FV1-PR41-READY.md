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

## Cloud resume readiness — 2026-09-09

Repository publication verified without product implementation or audit reruns:

- Resume this existing branch/PR at `3c2fcc1e0b5532413034540aa3c85b7c384e2073`; do not create another implementation PR.
- Approved base/spec: `8b88718381b764b6a316ed3bc86a32372d655e12`, FV-1 **v0.2.1**. This supersedes the v0.2.0 base in the historical PR #40 handoff.
- The implementation head contains the approved spec, all seven `docs/fv1-recovery/tasks/F1.md` through `F7.md` packets and the recovered audit documentation. The normalized documentation SHA-256 manifest passes at that exact Git revision.
- Both inspected local ARO repositories are clean and have no unpushed local branch commits after refreshing origin. The current cloud task **Resume PR Verification** (`6aa10750-1a98-83e8-b0d2-e40c0d50cd64`) freshly confirmed its retained checkout is clean at the same remote head, with no unpushed commits or additional local F1/evidence files.
- The earlier task **FV1 Implementation Blocked** (`6aa078f7-cad8-83e8-a102-24c79e62dcbe`) did not return a fresh inventory response. Its existing PR comments record encoder preflight and a stop before real-image product writes. No claim is made to have inspected inaccessible private scratch state.
- F1 is **NOT COMPLETE**: only the rebinding commit and bootstrap `AppImage.test.jsx` have been pushed. There are no accepted F1 derivatives/component/manifest/encoder-script deliverables. F2 remains dependent on actual F1 acceptance.

### Binary source availability

All nine originals were read from the fetched GitHub branch as actual PNG blobs (not LFS pointers), PNG signature/dimensions checked, and compared byte-for-byte with the approved base. Total: **20,369,032 bytes**. A full Git clone/checkout exposes them; a text-only GitHub connector is insufficient for image generation. No extra image upload or product commit is needed.

| Repository path | Bytes | Dimensions | SHA-256 |
|---|---:|---|---|
| `public/aro-living-miniature-calgary-v1.png` | 3235150 | 1536×1024 | `6ee86ef9b7066a5b483963be49a686d010165738648c678e0d018664378b8cc2` |
| `public/aro-maya-expression-persona-v1.png` | 1801362 | 1024×1536 | `97ac6120dda09259e1293011aa71ff51235b3f677f9738f6dc9bcb647d1b1be5` |
| `public/aro-maya-profile-portrait-v1.png` | 1744986 | 1254×1254 | `62396e2cbb27ecfc10c44a224e379819a1be8b128437b0454177e3cb784d1267` |
| `public/aro-passport-life-map-v1.png` | 2036242 | 1672×941 | `7b79cae453c6a05043ea9b372fed0932c89b26c8be5705e857022f660df2ea53` |
| `public/aro-portal-home-v1.png` | 2323174 | 1672×941 | `5784e1b3147c4620821ef189aef3baf93bd7dc7640ea4f2bb962744b034c3eeb` |
| `public/aro-repair-table-v1.png` | 2325611 | 1536×1024 | `34da6d6f5c7863cd9ebb9825805006ab2414d1134c14427d60c7a3fd4fd5553f` |
| `public/aro-river-light-circle-v1.png` | 2670385 | 1536×1024 | `a7222f865c8a1895884523eccff825a4e046f0fff584b11e06d5fd1c88db8cda` |
| `public/aro-season-discovery-v1.png` | 1947005 | 1672×941 | `8f1570572785b496bdc57d23d81ee2b7536499ba95050ed1fc33af73f46f700e` |
| `public/aro-shared-stories-table-v1.png` | 2285117 | 1536×1024 | `5284f38c939842ece4d072a07145a377b5f1aa3bd1b131c06d21beb1f518d0b9` |


### Fresh executor instructions

Use a real isolated Git checkout of `codex/fv1-visual-release-evidence`, verify HEAD and approved-spec ancestry, and read AGENTS.md plus the approved specification/packets before writing. Keep the same ONE implementation PR. If the branch has advanced, inspect and preserve the new work before proceeding; never reset it to this snapshot.

The runtime must also satisfy amended §20: CPython **3.12.13 or 3.13.5**, Pillow **12.3.0**, libwebp **1.6.0**, with the recorded 88-byte deterministic RGBA preflight hash. Having source files alone does not satisfy this encoder gate; CPython 3.12.14 is not in the approved profile. No real F1 asset generation was performed by this publication check.

Execute and accept F1 before F2; proceed serially through F7 using accepted predecessor SHAs. Do not rerun the five completed audits or synthesis, repeat planning, expand scope or create new infrastructure. Preserve existing evidence and publish actual deliverables to this branch. Product merge/deployment/release remain WITHHELD. Full verification requires independent review, human NVDA testing and founder visual review.

