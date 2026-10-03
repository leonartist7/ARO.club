from pathlib import Path
import json
r=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs');d=r/'docs/fv1-recovery'
sha='a576640cc5b9828486d8bdd0f970636b3ff07138'
def write(p,s):p.write_text(s.rstrip()+'\n',encoding='utf-8',newline='\n')
p=d/'packets.json';j=json.loads(p.read_text(encoding='utf-8'));j['candidateSpecSha']=sha
for row in j['packets']:row['candidateSpecSha']=sha
write(p,json.dumps(j,indent=2))
for i in range(1,8):
 p=d/f'tasks/F{i}.md';s=p.read_text(encoding='utf-8')
 s=s.replace('## Exact base revision and governing specification\n','## Exact base revision and governing specification\n\n- Exact committed candidate specification revision: `'+sha+'` (v0.2.0; still SPEC-REQUIRED, not an approved execution base).\n')
 write(p,s)
p=d/'README.md';write(p,p.read_text(encoding='utf-8')+'\n\nCommitted candidate specification: [`'+sha+'`](https://github.com/leonartist7/ARO.club/blob/'+sha+'/specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md). This immutable review revision is not an approved task base.\n')
