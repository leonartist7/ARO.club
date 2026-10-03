import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
const root='C:/Users/leona/Documents/Web dev/ARO/ARO-readiness-foundation-20260922';
const base='f37dc084d7172415f581a41e90d2edd9ba3738b9';
const git=(...args)=>cp.execFileSync('git',['-c',`safe.directory=${root}`,...args],{cwd:root});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const paths=['specs/ARO-READY1-FOUNDATION-READINESS.md',...fs.readdirSync(path.join(root,'docs/readiness-20260922')).filter(x=>x.endsWith('.md')).map(x=>'docs/readiness-20260922/'+x)];
let links=0;
for(const p of paths){
 const s=fs.readFileSync(path.join(root,p),'utf8');
 for(const m of s.matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|#)/.test(m[1]))continue;
  const resolved=path.resolve(root,path.dirname(p),m[1].split('#')[0]);
  if(!resolved.startsWith(path.resolve(root)+path.sep)||!fs.existsSync(resolved))throw Error('Broken local link '+p+': '+m[1]);
  links++;
 }
}
const sourcePaths=['src/lib/teacherApplications.js','src/lib/admin.js','src/views/TeacherOnboarding.jsx','src/app/(public)/profile/page.tsx','src/app/app/profile/page.tsx','src/lib/auth/config.ts','tools/ci/auth.mjs','tools/ci/browser.mjs','tools/ci/run.mjs','tools/ci/supabase/migrations/20260916103000_i02_corrective_repairs.sql','tools/ci/supabase/migrations/20260916113000_i02_protect_teacher_verification_history.sql','tools/ci/supabase/tests/application.test.sql'];
const index={base,source:sourcePaths.map(p=>({path:p,gitBlob:git('rev-parse',base+':'+p).toString().trim(),sha256:sha(git('show',base+':'+p))}))};
fs.writeFileSync(path.join(root,'docs/readiness-20260922/source-evidence.json'),JSON.stringify(index,null,2)+'\n');
const files=[...paths,'docs/readiness-20260922/source-evidence.json'];
fs.writeFileSync(path.join(root,'docs/readiness-20260922/manifest.sha256'),files.sort().map(p=>sha(Buffer.from(fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n')))+'  '+p).join('\n')+'\n');
git('diff','--exit-code',base,'--','src','supabase','tools','package.json','package-lock.json','.github','vercel.json');
console.log(JSON.stringify({result:'PASS',localLinks:links,files:files.length,protectedSourceDiff:'empty',manifest:'LF-normalized UTF-8'}));
