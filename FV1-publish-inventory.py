from pathlib import Path
import json
r=Path(r'C:/Users/leona/Documents/Web dev/ARO')
j=json.loads((r/'FV1-CLOUD-INVENTORY.json').read_text())
body=(r/'FV1-PR41-CURRENT.md').read_text(encoding='utf-8-sig').rstrip()
body+='''

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
'''
for e in j['sourcePngs']:body+=f"| `{e['path']}` | {e['bytes']} | {e['width']}×{e['height']} | `{e['sha256']}` |\n"
body+='''

### Fresh executor instructions

Use a real isolated Git checkout of `codex/fv1-visual-release-evidence`, verify HEAD and approved-spec ancestry, and read AGENTS.md plus the approved specification/packets before writing. Keep the same ONE implementation PR. If the branch has advanced, inspect and preserve the new work before proceeding; never reset it to this snapshot.

The runtime must also satisfy amended §20: CPython **3.12.13 or 3.13.5**, Pillow **12.3.0**, libwebp **1.6.0**, with the recorded 88-byte deterministic RGBA preflight hash. Having source files alone does not satisfy this encoder gate; CPython 3.12.14 is not in the approved profile. No real F1 asset generation was performed by this publication check.

Execute and accept F1 before F2; proceed serially through F7 using accepted predecessor SHAs. Do not rerun the five completed audits or synthesis, repeat planning, expand scope or create new infrastructure. Preserve existing evidence and publish actual deliverables to this branch. Product merge/deployment/release remain WITHHELD. Full verification requires independent review, human NVDA testing and founder visual review.
'''
(r/'FV1-PR41-READY.md').write_text(body+'\n',encoding='utf-8',newline='\n')
