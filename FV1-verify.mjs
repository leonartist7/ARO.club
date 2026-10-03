import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = 'C:/Users/leona/Documents/Web dev/ARO/FV1-docs/docs/fv1-recovery';
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files = walk(root).filter(f=>path.basename(f)!=='manifest.json');
files.push(path.resolve(root,'../../specs/ARO-FV-1-VISUAL-RELEASE-EVIDENCE.md'));
const ownership = new Map();
for(const file of files){
 const value=fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').trimEnd()+'\n';
 fs.writeFileSync(file,value);
 if(file.endsWith('.md')) for(const m of value.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  if(!/^https?:|^#/.test(m[1])&&!fs.existsSync(path.resolve(path.dirname(file),m[1].split('#')[0]))) throw Error('Broken link '+file+' '+m[1]);
 }
 if(/tasks[\\/]F[1-7]\.md$/.test(file)) {
  for(const heading of ['Exact base revision','Dependencies','Permitted files','Non-goals','Acceptance commands','Stop conditions']) if(!value.includes('## '+heading)) throw Error('Missing packet section '+file+' '+heading);
  const line=value.split('\n').find(l=>l.startsWith('Files:'));
  for(const m of line.matchAll(/`([^`]+)`/g)) {if(ownership.has(m[1]))throw Error('Overlapping ownership '+m[1]); ownership.set(m[1],path.basename(file));}
 }
}
const entries=files.sort().map(file=>({path:path.relative(root,file).replaceAll('\\','/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),bytes:fs.statSync(file).size}));
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify({schemaVersion:1,kind:'documentation-edition',encoding:'utf8-lf',auditSha:'06730c74b44d1a6ee1da24c4d1d1ed721313df5c',baseSha:'6495e67798ad14876f6c04815f9f5e13eaf52b83',files:entries},null,2)+'\n');
console.log(JSON.stringify({documents:files.length,packetCount:7,exclusiveNamedPaths:ownership.size,links:'PASS',packetFields:'PASS',manifest:'PASS'}));
