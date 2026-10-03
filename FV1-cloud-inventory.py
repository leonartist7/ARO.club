from pathlib import Path
import subprocess,json,hashlib,struct
r=Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-docs')
sha='3c2fcc1e0b5532413034540aa3c85b7c384e2073'
base='8b88718381b764b6a316ed3bc86a32372d655e12'
def git(*args):return subprocess.check_output(['git','-C',str(r),*args])
assert git('rev-parse','origin/codex/fv1-visual-release-evidence').decode().strip()==sha
assert git('rev-parse','origin/main').decode().strip()==base
subprocess.run(['git','-C',str(r),'merge-base','--is-ancestor',base,sha],check=True)
spec='specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md'
assert b'0.2.1' in git('show',sha+':'+spec)
assert b'SPEC-READY' in git('show',sha+':'+spec)
for n in range(1,8):assert git('show',f'{sha}:docs/fv1-recovery/tasks/F{n}.md')
manifest=json.loads(git('show',sha+':docs/fv1-recovery/manifest.json'))
for e in manifest['files']:
 p=(Path('docs/fv1-recovery')/e['path']).as_posix()
 import posixpath
 data=git('show',sha+':'+posixpath.normpath(p))
 assert hashlib.sha256(data).hexdigest()==e['sha256'],p
stems=['aro-living-miniature-calgary-v1','aro-maya-expression-persona-v1','aro-maya-profile-portrait-v1','aro-passport-life-map-v1','aro-portal-home-v1','aro-repair-table-v1','aro-river-light-circle-v1','aro-season-discovery-v1','aro-shared-stories-table-v1']
rows=[]
for stem in stems:
 p='public/'+stem+'.png'; b=git('show',sha+':'+p)
 assert b[:8]==b'\x89PNG\r\n\x1a\n',p
 assert b==git('show',base+':'+p)
 rows.append({'path':p,'bytes':len(b),'width':struct.unpack('>I',b[16:20])[0],'height':struct.unpack('>I',b[20:24])[0],'sha256':hashlib.sha256(b).hexdigest()})
result={'verifiedRemoteHead':sha,'approvedBase':base,'specVersion':'0.2.1','packetCount':7,'documentationManifest':'PASS','sourcePngs':rows,'sourceCount':len(rows),'sourceBytes':sum(row['bytes'] for row in rows),'sourceCheck':'Real PNG Git blobs, not LFS pointers; identical to approved base','f1Acceptance':'NOT COMPLETE'}
Path(r'C:/Users/leona/Documents/Web dev/ARO/FV1-CLOUD-INVENTORY.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,indent=2))
