from pathlib import Path
import hashlib,json,re,subprocess
r=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs');d=r/'docs/fv1-recovery'
j=json.loads((d/'packets.json').read_text(encoding='utf-8'))
assert j['approved'] is False and j['implementationEligible'] is False
assert len(j['packets'])==7
for n,p in enumerate(j['packets'],1):
 assert p['id']==f'F{n}'
 assert p['dependsOn']==([] if n==1 else [f'F{n-1}'])
 assert p['taskBase'] is None and p['approvedSpecSha'] is None
 assert p['specVersion']=='0.2.0' and p['governingSpec']==j['specPath']
 assert (d/p['file']).exists()
for e in json.loads((d/'manifest.json').read_text(encoding='utf-8'))['files']:
 b=(d/e['path']).read_bytes()
 assert hashlib.sha256(b).hexdigest()==e['sha256'],e['path']
 assert len(b)==e['bytes']
s=(r/j['specPath']).read_text(encoding='utf-8')
assert len(re.findall(r'^## \d+\.',s,re.M))==31
for n in range(1,9): assert f'FV1-0{n}' in s
f=(d/'tasks/F1.md').read_text(encoding='utf-8')
rows=re.findall(r'^\| `aro-[^`]+` \| ([0-9, ]+) \|$',f,re.M)
assert len(rows)==9 and sum(len(x.split(',')) for x in rows)==23
for p in [r/j['specPath'],r/'ARO_CURRENT_STATE.md',r/'ARO_IMPLEMENTATION_STATUS.md',r/'ARO_SPEC_INDEX.md']:
 for link in re.findall(r'\[[^\]]+\]\(([^)]+)\)',p.read_text(encoding='utf-8')):
  if not re.match(r'https?:|#',link): assert (p.parent/link.split('#')[0]).exists(),(p,link)
changed=subprocess.check_output(['git','diff','--name-only','6495e67798ad14876f6c04815f9f5e13eaf52b83'],cwd=r,text=True).splitlines()
assert all(p.endswith('.md') or p.startswith('docs/fv1-recovery/') for p in changed),changed
print('PASS: 7 ordered dispatch-locked packets, 31 spec sections, 8 acceptance rows, 9 originals/23 derivatives, links/hashes, documentation-only diff')
