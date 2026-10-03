from pathlib import Path
import json,re,hashlib

root=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs')
docs=root/'docs/fv1-recovery'
def write(p,s): p.write_text(s.replace('\r\n','\n').rstrip()+'\n',encoding='utf-8',newline='\n')
spec='specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md'
for i in range(1,8):
 p=docs/f'tasks/F{i}.md'; s=p.read_text(encoding='utf-8')
 s=s.replace('- Governing proposal: [FV-1 v0.1.0](../proposed-ARO-FV-1.md), including all shared acceptance and stop rules.', '- Governing specification: [FV-1 v0.2.0](../../../'+spec+'), including selected defaults, budgets, profile, review plan and all shared acceptance/stop rules. Historical v0.1.0 is superseded for execution.')
 s=re.sub(r"- First writer's proposed TASK_BASE_SHA:.*",'- F1 TASK_BASE_SHA must equal the full approved documentation merge commit A, which contains the SPEC-READY specification and all packets. It is not yet available. The product baseline above MUST NOT be used to dispatch. Follow specification section 25; no implementation is approved.',s)
 s=s.replace('Record that full SHA in a dispatch receipt before starting;', 'Record that full SHA in the ONE implementation PR before starting;')
 s=s.replace('governing proposal','governing specification')
 s=s.replace('missing verification capability;', 'missing verification capability for this slice (human release evidence is required at F7, not before F1);')
 if i==1:
  s=s.replace('Proposed encoder commands:', 'Future implementation encoder commands:')
  s=s.replace('Use an already available Pillow encoder; the script and component do not exist yet.', 'Use cloud Python 3.12.13, Pillow 12.3.0 and libwebp 1.6.0, already proven below. Section 20 fixes resizing/encoding parameters. The script and component do not exist yet; do not run generation until implementation approval.')
  s+='''

## Encoder availability preflight — PASS, 2026-09-08

Existing cloud task **Schedule audit tasks**, ID `6a9fbdd1-0584-83e8-89e5-27bb2d3e32db`, returned this bounded preflight in turn `e33d723b-151c-4f39-8ba1-55939d42d590`: Linux x86_64, Python **3.12.13**, Pillow **12.3.0**, libwebp **1.6.0**. WebP encoding available. Three synthetic in-memory encodes were identical; exact RGBA decode preserved alpha values 0, 1, 64, 127, 128, 192, 254, 255, including RGB beneath transparent pixels. Output: **88 bytes**, SHA-256 `a2dd5e25c6a9dd61b8194f496c8b3995a5ba2efc0abc9079ecd2b6cd8ec5450b`.

Reproducible command (preflight only, no product output):

```bash
python3 -B - <<'PY'
import hashlib, io, platform
import PIL
from PIL import Image, features
print(platform.python_version(), PIL.__version__, features.version("webp"))
assert features.check("webp")
pixels = bytes(v for y in range(16) for x in range(16) for v in
    (x*17, y*17, ((x+y)*13)%256, (0,1,64,127,128,192,254,255)[(x+y)%8]))
source = Image.frombytes("RGBA", (16,16), pixels)
def encode():
    out = io.BytesIO()
    source.save(out, format="WEBP", lossless=True, quality=100, method=6, exact=True)
    return out.getvalue()
runs = [encode() for _ in range(3)]
assert runs[0] == runs[1] == runs[2]
with Image.open(io.BytesIO(runs[0])) as image:
    restored = image.convert("RGBA")
    assert restored.size == source.size
    assert restored.getchannel("A").tobytes() == pixels[3::4]
    assert restored.tobytes() == pixels
print(len(runs[0]), hashlib.sha256(runs[0]).hexdigest())
PY
```

Local bundled runtime independently confirmed WebP availability with Python 3.12.14/Pillow 12.3.0/libwebp 1.6.0 and a separate simpler synthetic round-trip. It is not the selected F1 encoder profile. No package installation, product asset generation, source edits or audit reruns occurred. Preflight does not establish real-image quality/bytes, browser behavior or cross-version determinism. Before actual F1 dispatch verify the selected cloud versions and synthetic hash still match; stop on drift. This capability check is not an audit rerun.
'''
 if i==3: s+='\n\nSelected fixture counts/minimum/capacity: shared-stories 6/6/8, river-photo-walk 3/6/10, repair-table 8/6/8. Use the exact state and copy semantics in spec sections 6–10.\n'
 if i==6: s+='\n\nThe six-row disposition and unavailable filter behavior are fixed in spec section 6; workers must not invent destination mappings.\n'
 if i==7: s+='\n\nUse spec sections 20 and 27 verbatim for the frozen lab profile, budgets, independent nonwriting review and human NVDA pass. Status/spec edits here record factual evidence only; they cannot change approved behavior or grant product merge/release permission.\n'
 write(p,s)

p=docs/'packets.json'; j=json.loads(p.read_text())
j['schemaVersion']=2
j['specPath']=spec; j['specVersion']='0.2.0'
j['candidateSpecSha']=None
j['implementationBranch']='codex/fv1-visual-release-evidence'
j['implementationPr']=None
j['baseResolution']='Spec section 25: F1 uses actual approved documentation merge SHA A; F2–F7 use accepted predecessor commits on the same branch/PR. Record full execution/spec SHAs in that existing PR before each slice. Null blocks dispatch.'
for i,pkt in enumerate(j['packets'],1):
 pkt['taskBase']=None; pkt['approvedSpecSha']=None
 pkt['taskBaseRule']='approved documentation merge commit A containing SPEC-READY spec' if i==1 else f'accepted F{i-1} commit on the single implementation branch'
 pkt['governingSpec']=spec; pkt['specVersion']='0.2.0'
write(p,json.dumps(j,indent=2))

write(docs/'README.md','''# FV-1 — final approval package

**SPEC-REQUIRED. Documentation, implementation and release approvals are separate. No product work is dispatched.**

- [Authoritative FV-1 v0.2.0 candidate](../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md): selected defaults (§6), budgets/profile (§20), approval/base reconciliation (§25), independent/human review (§27).
- [First packet F1, including passed cloud encoder preflight](tasks/F1.md).
- One implementation branch/PR, sequential slices: [F1](tasks/F1.md) → [F2](tasks/F2.md) → [F3](tasks/F3.md) → [F4](tasks/F4.md) → [F5](tasks/F5.md) → [F6](tasks/F6.md) → [F7](tasks/F7.md).
- [Packet metadata](packets.json); [integrity manifest](manifest.json).
- Preserved evidence: [five-bundle recovery](RECOVERY.md), [historical cloud synthesis](CLOUD_HANDOFF.md), [superseded v0.1.0 proposal](proposed-ARO-FV-1.md).

All five saved audits were already recovered and validated; none were rerun. Exact audit base: `06730c74b44d1a6ee1da24c4d1d1ed721313df5c`; unchanged product comparison baseline: `6495e67798ad14876f6c04815f9f5e13eaf52b83`.

F1 must start from the actual approved documentation merge commit containing the SPEC-READY spec, never the old product baseline. Future merge/predecessor SHAs cannot be known now; null execution fields deliberately block dispatch until full SHAs are recorded in the single implementation PR. No additional planning infrastructure is needed.

Approval checklist: approve documentation publication; separately approve the selected FV-1 scope/defaults for F1–F7 implementation; reserve product merge/Preview/Production release for completed evidence and founder approval. Human screen-reader and final visual review remain mandatory before verification/release. I0/P1 and later runtime gates remain unchanged.
''')

p=docs/'proposed-ARO-FV-1.md'; s=p.read_text(); s=s.replace('# FV-1 — Truthful visual prototype and release evidence\n','# FV-1 — Truthful visual prototype and release evidence\n\n> Historical v0.1.0 recovery proposal. Superseded for all decisions and execution bases by the [authoritative v0.2.0 candidate](../../'+spec+'). Preserve this text as provenance, not worker instructions.\n',1); write(p,s)
p=docs/'CLOUD_HANDOFF.md'; s=p.read_text(); write(p,'> Historical recovered synthesis. The [authoritative v0.2.0 candidate](../../'+spec+') supersedes its unresolved choices and proposed execution bases. This historical evidence does not authorize implementation.\n\n'+s)

for filename in ['ARO_SPEC_INDEX.md','ARO_CURRENT_STATE.md','ARO_IMPLEMENTATION_STATUS.md']:
 p=root/filename;s=p.read_text(); header,body=s.split('\n',1)
 write(p,header+'\n\n> **2026-09-08 FV-1 approval candidate:** [FV-1 v0.2.0]('+spec+') is **SPEC-REQUIRED**, with selected defaults, budgets/profile, review plan and seven sequential packets for ONE implementation branch/PR. Five saved audit bundles were recovered/validated without reruns; cloud encoder preflight passed. Documentation PR #40 is pending approval. No implementation or release is authorized; I0/P1 and later gates are unchanged.\n'+body)
p=root/'ARO_CHANGELOG.md';write(p,p.read_text()+'''\n\n## 2026-09-08 — FV-1 final approval candidate and reconciled handoff

Prepared authoritative `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md` v0.2.0, still SPEC-REQUIRED. It selects the outstanding user-visible defaults, technical budgets, reproducible lab profile and independent/human review plan. F1 cloud encoder availability passed an in-memory synthetic test; no audits were rerun and no product changes were implemented. F1 now requires the actual approved documentation merge revision; F2–F7 require accepted predecessor commits on ONE implementation branch/PR. Documentation merge, implementation and release approvals remain separate. Existing recovery provenance is preserved; no new planning infrastructure was added.
''')
