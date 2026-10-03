from pathlib import Path
import subprocess,re
p=Path(__file__).with_name('FV1-check.py')
s=p.read_text(encoding='utf-8').replace("j['approved'] is False", "j['approved'] is True")
exec(s)
assert j['approval']['implementationAuthorized'] and not j['approval']['releaseAuthorized']
assert j['approval']['candidateCommit']=='a576640cc5b9828486d8bdd0f970636b3ff07138'
assert all(p['status']=='SPEC-READY' and p['implementationApproved'] for p in j['packets'])
old=subprocess.check_output(['git','show','a576640cc5b9828486d8bdd0f970636b3ff07138:'+j['specPath']],cwd=r).decode('utf-8')
new=(r/j['specPath']).read_text(encoding='utf-8')
def section(text,n):return re.search(r'(?ms)^## '+str(n)+r'\..*?(?=^## |\Z)',text).group()
for n in list(range(1,6))+list(range(7,25)):
 assert section(old,n)==section(new,n),n
assert 'completed founder visual review' in section(new,29)
print('PASS: recorded exact founder approval; product requirements/budgets/acceptance sections unchanged; release withheld and all three full-verification gates explicit')
