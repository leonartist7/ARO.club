from pathlib import Path
import json,re
root=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs')
def write(p,s):p.write_text(s.rstrip()+'\n',encoding='utf-8',newline='\n')
p=root/'specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md';s=p.read_text(encoding='utf-8')
s=s.replace('Persona uses lossless=True, exact=True;', 'Persona uses lossless=True, quality=100, exact=True;')
s=s.replace('Preserve aspect ratios, resize with LANCZOS, strip metadata,', 'Preserve aspect ratios, resize with LANCZOS to each named width, round derived height to the nearest integer (minimum 1), strip metadata,')
s=s.replace('Fix encoder/version and selected parameters in the manifest;', 'For a derivative used by multiple variants, apply the strictest applicable byte ceiling. Width 160 is thumbnail; profile 256/384 is portrait; persona 480 is phone and 960 is larger; other widths 640/1440 are phone/larger respectively. Fix encoder/version and selected parameters in the manifest;')
write(p,s)
p=root/'DECISIONS.md';write(p,p.read_text(encoding='utf-8')+'''

## ADR-030 — FV-1 final approval candidate and single-package execution

**Status:** Proposed; founder approval pending. No implementation or release authority.

**Decision proposed:** Adopt `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md` v0.2.0 defaults, bounded fictional/local semantics, fixed lab budgets/profile and independent/human review requirements. Execute F1–F7 sequentially on `codex/fv1-visual-release-evidence` in ONE implementation PR after explicit approval. F1 starts from the actual main commit containing the approved SPEC-READY specification; later slices use accepted predecessor commits. The historical product baseline is not an executable F1 base.

**Consequences:** Documentation merge, implementation approval and product merge/release approval remain distinct. Cloud encoder preflight passed; its locked Chromium test binary still requires scoped provisioning after approval. No completed audits rerun, product work dispatched, new planning infrastructure added or I0/P1 gate waived. ADR-028/029 continue to govern.
''')
p=root/'docs/fv1-recovery/RECOVERY.md';write(p,p.read_text(encoding='utf-8')+'''

## Final approval preparation — 2026-09-08

The [authoritative candidate](../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md) v0.2.0 selects the prior unresolved defaults and reconciles execution bases. Historical recovery evidence above is unchanged. Cloud preflight and environment inventory were bounded capability checks, not audit reruns. F1 records the exact synthetic encoder command/result. Spec section 20 records the actual cloud profile and missing Chromium binary; no install or product test was performed.

Documentation validation checks relative links, all seven packet sections, finite exclusive ownership, ordered dependencies, intentionally blocked execution fields, and normalized UTF-8/LF SHA-256 manifest entries including the authoritative specification. Runtime acceptance remains NOT RUN. Product source/config/assets are unchanged from the proposal baseline. Prior build/lint and PR checks apply only to their tested revisions; new PR checks must be inspected at the updated head. No implementation or release approval is inferred from any documentation check.
''')
