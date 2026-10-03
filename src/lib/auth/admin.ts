import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { accountsEnabled, supabaseUrl } from './config';
import { lifecycleEnabled } from './lifecycle';

export function deletionAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const expectedRef = process.env.SUPABASE_SERVER_PROJECT_REF;
  const production = process.env.VERCEL_ENV === 'production';
  if (!accountsEnabled || !lifecycleEnabled || process.env.ENABLE_ACCOUNT_DELETION_WORKER !== 'true'
    || !key || !expectedRef ||
    (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== process.env.NEXT_PUBLIC_VERCEL_ENV)) return null;
  try {
    const target = new URL(supabaseUrl);
    const local = !process.env.VERCEL_ENV && target.protocol === 'http:'
      && ['127.0.0.1', 'localhost'].includes(target.hostname) && expectedRef === 'local-disposable';
    if (!local && (target.origin !== `https://${expectedRef}.supabase.co`
      || expectedRef !== 'mibydnerayobemhnlfyl')) return null;
    if (production && expectedRef !== process.env.NEXT_PUBLIC_PRODUCTION_SUPABASE_REF) return null;
    return createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { fetch: (input, init) => fetch(input, {
        ...init, cache: 'no-store', signal: init?.signal ?? AbortSignal.timeout(10_000),
      }) },
    });
  } catch { return null; }
}
