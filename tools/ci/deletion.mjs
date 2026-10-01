import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { processAccountDeletion } from '../../src/lib/auth/deletion-worker.ts';
import { API, localFetch, requireCondition, validateTarget } from './boundary.mjs';

// Only called after the existing hosted-runner/ownership/loopback preflight.
// Service credentials remain in memory; never print response bodies or keys.
export async function exerciseDeletion(anonKey, serviceKey, phase) {
  validateTarget(API, API, '/');
  requireCondition(typeof serviceKey === 'string' && serviceKey.length > 20, 'MISSING_LOCAL_SERVICE_KEY');
  const settings = {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => localFetch(String(input), API, init) },
  };
  const admin = createClient(API, serviceKey, settings);
  const owner = createClient(API, anonKey, settings);
  const email = `auth3-${randomUUID()}@example.invalid`;
  const password = `Aa1!${randomBytes(24).toString('hex')}`;
  await phase('auth3-real-storage-and-auth-erasure', async () => {
    const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    requireCondition(!created.error && created.data.user?.id, 'DELETION_FIXTURE_CREATION');
    const userId = created.data.user.id;
    const signedIn = await owner.auth.signInWithPassword({ email, password });
    requireCondition(!signedIn.error && signedIn.data.user?.id === userId, 'DELETION_FIXTURE_SIGNIN');
    const adult = await owner.schema('api').rpc('confirm_adult_eligibility', { birth_date: '1990-01-01' });
    requireCondition(!adult.error, 'DELETION_FIXTURE_ELIGIBILITY');
    const application = await owner.from('teacher_applications')
      .insert({ user_id: userId, display_name: 'Synthetic deletion fixture' }).select('id').single();
    requireCondition(!application.error && application.data?.id, 'DELETION_FIXTURE_DRAFT');
    const directory = `${userId}/${application.data.id}`;
    const object = `${directory}/id.png`;
    const upload = await owner.storage.from('verification-docs').upload(object,
      new Uint8Array([137,80,78,71,13,10,26,10]), { contentType: 'image/png' });
    requireCondition(!upload.error, 'DELETION_FIXTURE_STORAGE');
    const receipt = createHash('sha256').update(randomBytes(32)).digest('hex');
    const requested = await owner.schema('api').rpc('request_account_deletion', { receipt_hash: receipt });
    requireCondition(!requested.error && requested.data, 'DELETION_FIXTURE_REQUEST');
    const result = await processAccountDeletion(admin, requested.data);
    requireCondition(result === 'completed', 'DELETION_WORKER_NOT_COMPLETED');
    const identity = await admin.auth.admin.getUserById(userId);
    requireCondition(identity.error?.status === 404 && !identity.data.user, 'DELETION_IDENTITY_SURVIVED');
    const objects = await admin.storage.from('verification-docs').list(directory);
    requireCondition(!objects.error && objects.data?.length === 0, 'DELETION_STORAGE_SURVIVED');
    const stale = await owner.from('profiles').select('id').eq('id',userId);
    requireCondition(!stale.error && stale.data?.length === 0, 'DELETION_STALE_JWT_ACCEPTED');
    const status = await admin.schema('api').rpc('account_deletion_receipt_status', { receipt_hash: receipt });
    requireCondition(!status.error && status.data?.status === 'completed' && status.data.processed_at, 'DELETION_RECEIPT_NOT_COMPLETED');
    const freshLogin = await owner.auth.signInWithPassword({ email, password });
    requireCondition(freshLogin.error && !freshLogin.data.session, 'DELETED_ACCOUNT_CAN_SIGN_IN');
  });
}
