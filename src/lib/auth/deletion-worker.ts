import type { SupabaseClient } from '@supabase/supabase-js';

type Job = { request_id: string; user_id?: string; lease_token?: string; blocked?: boolean; completed?: boolean };
export async function processAccountDeletion(admin: SupabaseClient, targetRequest?: string) {
  const api = admin.schema('api');
  const claimed = await api.rpc('claim_account_deletion', { target_request: targetRequest ?? null });
  if (claimed.error) throw new Error('deletion claim failed');
  const job = claimed.data as Job | null;
  if (!job) return 'idle';
  if (job.completed) return 'completed';
  if (job.blocked) return 'blocked';
  if (!job.user_id || !job.lease_token) throw new Error('invalid deletion claim');
  const args = { target_request: job.request_id, token: job.lease_token };
  let stage = 'auth_error';
  try {
    // Ban before cleanup; revocation alone cannot prevent a fresh sign-in.
    const banned = await admin.auth.admin.updateUserById(job.user_id, { ban_duration: '876000h' });
    if (banned.error) {
      const identity = await admin.auth.admin.getUserById(job.user_id);
      if (identity.error?.status !== 404 || identity.data.user) throw new Error('account ban failed');
    }
    stage = 'storage_error';
    for (let page = 0; page < 5; page += 1) {
      const inventory = await api.rpc('account_deletion_objects', args);
      if (inventory.error || !Array.isArray(inventory.data)) throw new Error('storage inventory failed');
      if (inventory.data.length === 0) {
        const marked = await api.rpc('mark_account_deletion_storage_clean', args);
        if (marked.error) throw new Error('storage completion could not be recorded');
        stage = 'auth_error';
        const removed = await admin.auth.admin.deleteUser(job.user_id, false);
        if (removed.error) {
          // A timeout may hide a successful delete. Only a specific not-found
          // response can reconcile it; provider/network errors cannot.
          const identity = await admin.auth.admin.getUserById(job.user_id);
          if (identity.error?.status !== 404 || identity.data.user) throw new Error('account deletion failed');
        }
        const finished = await api.rpc('finish_account_deletion', args);
        if (finished.error) throw new Error('deletion completion failed');
        return 'completed';
      }
      const buckets = new Map<string, string[]>();
      for (const item of inventory.data) {
        if (typeof item.bucket_id !== 'string' || typeof item.name !== 'string') throw new Error('invalid inventory');
        const names = buckets.get(item.bucket_id) ?? [];
        names.push(item.name);
        buckets.set(item.bucket_id, names);
      }
      for (const [bucket, names] of buckets) {
        const removed = await admin.storage.from(bucket).remove(names);
        if (removed.error) throw new Error('storage removal failed');
      }
    }
    // Large accounts resume on the next lease; never skip remaining objects.
    const saved = await api.rpc('fail_account_deletion', { ...args, failure_code: 'storage_error' });
    if (saved.error) throw new Error('deletion failure could not be recorded');
    return 'retry';
  } catch {
    const saved = await api.rpc('fail_account_deletion', { ...args, failure_code: stage });
    if (saved.error) throw new Error('deletion failure could not be recorded');
    return 'retry';
  }
}
