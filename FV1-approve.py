from pathlib import Path
import json
r=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs');d=r/'docs/fv1-recovery'
candidate='a576640cc5b9828486d8bdd0f970636b3ff07138'
reviewed='78005892071b7996917f8f10d04e5cd601f124d2'
def write(p,s):p.write_text(s.rstrip()+'\n',encoding='utf-8',newline='\n')
p=r/'specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md';s=p.read_text(encoding='utf-8')
s=s.replace('**SPEC-REQUIRED — final approval candidate; implementation NOT authorized**','**SPEC-READY — founder approved F1–F7 implementation; release approval WITHHELD**')
s=s.replace('**0.2.0**, dated 2026-09-08.', '**0.2.0**, approved 2026-09-08; behavior unchanged from candidate commit `'+candidate+'`.')
s=s.replace('Proposed sole implementation branch:', 'Approved sole implementation branch:')
s=s.replace('Blocks FV-1 implementation until explicit approval;', 'Implementation approval is recorded in section 28; dispatch requires the merged revision binding in section 25;')
s=s.replace('These are exact recommendations for approval as one package, not options left for workers to choose.', 'These defaults were approved by the founder as one package on 2026-09-08; workers may not reinterpret them.')
s=s.replace('Documentation merge alone leaves SPEC-REQUIRED and workers stopped. No implementation branch, product PR, audit or release is dispatched by this candidate.', 'The founder explicitly approved documentation merge and F1–F7 implementation on 2026-09-08 (section 28). Release remains withheld. No implementation branch or product PR has yet been created; this documentation change does not itself dispatch a worker.')
s=s.replace('These future SHAs do not exist at proposal time; null in packets.json is a deliberate dispatch lock, not permission to use main/HEAD or guess a hash.', 'The documentation merge SHA cannot be embedded in its own commit. Null base/spec fields in packets.json must therefore be bound to the actual PR #40 merge commit in the Terra handoff and the ONE implementation PR before F1; they do not negate the recorded approval. F2–F7 remain locked until their actual accepted predecessor SHAs exist. Never use floating main/HEAD or guess a hash.')
s=s.replace('Founder: pending. Reviewed commit: pending. Decision/date: pending. Documentation merge: not approved by this file. Implementation: not approved. Release: not approved. All substantive defaults are selected in this candidate; the remaining decision is founder acceptance or requested changes, not delegation of technical choices back to the founder.', '''- Approver: ARO founder/user, explicit approval in the current recovery task on **2026-09-08**.
- Approved specification: **FV-1 v0.2.0**, path `specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md`, candidate commit `a576640cc5b9828486d8bdd0f970636b3ff07138`; approved candidate Git blob `e01d450bb41394b13763cf090bdf4fd63d4f8628`. The same candidate content was present in reviewed documentation head `78005892071b7996917f8f10d04e5cd601f124d2`.
- Founder decision: “I approve: 1. Merging PR #40. 2. The proposed FV-1 defaults described in your approval summary. 3. Implementation of F1–F7 sequentially on ONE isolated branch/PR.” This records approval of the linked v0.2.0 scope/defaults and its specified technical execution/verification plan. This commit changes approval metadata and handoff state only; it does not change approved behavior or acceptance thresholds.
- Documentation: **merge PR #40 authorized through normal checks**.
- Implementation: **F1–F7 authorized sequentially on ONE isolated branch/PR**, after binding the actual merged base/spec revision as section 25 requires.
- Release: **WITHHELD**, including product merge and Preview/Production publication. The founder explicitly requires independent review, human NVDA testing and founder visual review before any full-verification claim.
- All future product acceptance, independent review, human NVDA testing and founder visual review remain pending. No implementation has been performed by this approval-recording change.''')
s=s.replace('Package FV-1; candidate 0.2.0;', 'Package FV-1; approved spec 0.2.0;')
s=s.replace('release environment none; status SPEC-REQUIRED.', 'release environment none; status SPEC-READY, implementation authorized, release WITHHELD.')
write(p,s)
for n in range(1,8):
 p=d/f'tasks/F{n}.md';s=p.read_text(encoding='utf-8')
 s=s.replace('Status: PROPOSED / SPEC-REQUIRED; not dispatched.', 'Status: SPEC-READY / implementation approved 2026-09-08; not dispatched. Release WITHHELD.')
 s=s.replace('(v0.2.0; still SPEC-REQUIRED, not an approved execution base)', '(approved v0.2.0 candidate; use the actual approved documentation merge commit A as the governing execution reference)')
 s=s.replace('Approval is absent; do not infer it from this documentation PR.', 'Founder approval is recorded in spec section 28 against the exact v0.2.0 candidate. Resolve APPROVED_SPEC_SHA to the actual PR #40 merge commit A per section 25.')
 s=s.replace('It is not yet available. The product baseline above MUST NOT be used to dispatch. Follow specification section 25; no implementation is approved.', 'Bind the actual PR #40 merge commit in the Terra handoff and the ONE implementation PR before writing. The product baseline above MUST NOT be used to dispatch. Implementation is approved; release remains withheld.')
 write(p,s)
j=json.loads((d/'packets.json').read_text(encoding='utf-8'))
j['approved']=True;j['implementationEligible']=False
j['approval']={'date':'2026-09-08','approver':'ARO founder/user','specVersion':'0.2.0','candidateCommit':candidate,'candidateGitBlob':'e01d450bb41394b13763cf090bdf4fd63d4f8628','reviewedDocumentationCommit':reviewed,'documentationMergeAuthorized':True,'implementationAuthorized':True,'releaseAuthorized':False,'record':'specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md#28-productdesign-approval-record'}
j['bindingStatus']='Bind A to the verified actual PR #40 merge commit in the Terra handoff and ONE implementation PR. Null fields avoid a self-referential merge SHA, not an approval request. F2–F7 require accepted predecessor commits.'
for row in j['packets']:row['status']='SPEC-READY';row['implementationApproved']=True
j['baseResolution']='Spec section 25: F1 uses verified actual PR #40 merge SHA A; APPROVED_SPEC_SHA=A. F2–F7 use accepted predecessor commits on the same isolated branch/PR. Record full bound SHAs in that existing PR before each slice. No floating refs.'
write(d/'packets.json',json.dumps(j,indent=2))
p=d/'README.md';s=p.read_text(encoding='utf-8')
s=s.replace('**SPEC-REQUIRED. Documentation, implementation and release approvals are separate. No product work is dispatched.**','**SPEC-READY. Founder approved documentation merge and sequential F1–F7 implementation on 2026-09-08. Release approval remains WITHHELD. No product worker has been dispatched.**')
s=s.replace('Authoritative FV-1 v0.2.0 candidate','Authoritative approved FV-1 v0.2.0')
s=s.replace('Future merge/predecessor SHAs cannot be known now; null execution fields deliberately block dispatch until full SHAs are recorded in the single implementation PR.', 'Bind the actual PR #40 merge commit in the Terra handoff and single implementation PR; the commit cannot contain its own future merge SHA. F2–F7 require actual accepted predecessor SHAs.')
s=s.replace('Approval checklist: approve documentation publication; separately approve the selected FV-1 scope/defaults for F1–F7 implementation; reserve product merge/Preview/Production release for completed evidence and founder approval.', 'Approval recorded: documentation publication and v0.2.0 F1–F7 implementation authorized; product merge/Preview/Production release explicitly withheld until completed evidence and founder approval.')
s=s.replace('This immutable review revision is not an approved task base.', 'The founder approved this exact v0.2.0 candidate. The execution base must be the actual documentation merge commit containing the approval record; see spec section 28.')
write(p,s)
for name in ['ARO_SPEC_INDEX.md','ARO_CURRENT_STATE.md','ARO_IMPLEMENTATION_STATUS.md']:
 p=r/name;s=p.read_text(encoding='utf-8')
 lines=s.splitlines();lines=[('> **2026-09-08 FV-1 approval:** [FV-1 v0.2.0](specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md) is **SPEC-READY**. Founder approved PR #40 documentation merge and F1–F7 sequential implementation on ONE isolated branch/PR, against candidate `'+candidate+'` (reviewed head `'+reviewed+'`). Bind actual documentation merge SHA before F1; use accepted predecessor SHAs thereafter. No product implementation or full verification is claimed. Independent review, human NVDA testing and founder visual review remain pending; release/product merge approval is WITHHELD. I0/P1 and later gates are unchanged.') if x.startswith('> **2026-09-08 FV-1 approval candidate:') else x for x in lines]
 write(p,'\n'.join(lines))
p=r/'DECISIONS.md';s=p.read_text(encoding='utf-8');s=s.replace('**Status:** Proposed; founder approval pending. No implementation or release authority.', '**Status:** Accepted by founder 2026-09-08 for documentation merge and F1–F7 implementation; release WITHHELD. Exact approved v0.2.0 candidate: `'+candidate+'`; approval record in spec section 28.')
s=s.replace('**Decision proposed:** Adopt', '**Decision:** Adopt');write(p,s)
p=r/'ARO_CHANGELOG.md';write(p,p.read_text(encoding='utf-8')+'\n\n## 2026-09-08 — Founder approves FV-1 documentation merge and implementation\n\nFounder explicitly approved merging PR #40 through normal checks, the proposed defaults and F1–F7 sequentially on ONE isolated branch/PR. Approval is recorded against FV-1 v0.2.0 candidate `'+candidate+'` (identical spec at reviewed head `'+reviewed+'`). Package is SPEC-READY; actual documentation merge SHA governs F1 and the approved spec, followed by exact accepted predecessor SHAs. No product changes or audit reruns accompany this record. Release/product merge approval remains WITHHELD; independent review, human NVDA testing and founder visual review are required before full verification.\n')
