import {readFileSync,writeFileSync} from 'node:fs';
for(const name of ['application','deletion']) {
  const path=`tools/ci/supabase/tests/${name}.test.sql`;
  let sql=readFileSync(path,'utf8');
  sql=sql.replace(/(insert into auth\.users[\s\S]*?;)/g,`$1\n-- Synthetic live sessions and adult declarations preserve the original Trust assertions.\ninsert into auth.sessions(id,user_id,created_at,updated_at) select id,id,now(),now() from auth.users on conflict (id) do nothing;\ninsert into app_private.account_eligibility(user_id) select id from auth.users on conflict (user_id) do nothing;`);
  sql=sql.replace(/"sub":"([0-9a-f-]+)"/g,'"sub":"$1","session_id":"$1"');
  writeFileSync(path,sql);
}
