import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync('snapshot-manifest.local.json','utf8'));
const hash=s=>createHash('sha1').update(`blob ${Buffer.byteLength(s)}\0`).update(s).digest('hex');
for(const {path,sha} of manifest){
  let value=readFileSync(path,'utf8').replaceAll('\r\n','\n');
  let fixed=false;
  for(let i=0;i<3;i++){if(hash(value)===sha){writeFileSync(path,value);fixed=true;break;}value=value.replace(/\n$/,'');}
  if(!fixed)throw new Error('Snapshot mismatch: '+path);
}
process.stdout.write(`Verified ${manifest.length} PR #97 text blobs.\n`);
