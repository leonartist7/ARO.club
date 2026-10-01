import { createHash, randomBytes } from 'node:crypto';
import { after, NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '../../../../lib/auth/server';
import { deletionAdmin } from '../../../../lib/auth/admin';
import { DELETION_RECEIPT_COOKIE } from '../../../../lib/auth/lifecycle';
import { processAccountDeletion } from '../../../../lib/auth/deletion-worker';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
function response(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: {
    'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer',
  } });
}

export async function GET(request: NextRequest) {
  const admin = deletionAdmin();
  if (!admin) return response({ error: 'unavailable' }, 503);
  try {
    const client = await serverSupabase();
    const identity = client ? await client.auth.getUser() : null;
    const access = identity?.data.user && !identity.error
      ? await client!.schema('api').rpc('account_access_status') : null;
    if (access?.error) return response({ error: 'lookup_failed' }, 503);
    if (identity?.data.user && !identity.error && access?.data?.active) {
      const result = await client!.from('account_deletion_requests')
        .select('status,requested_at,processed_at').in('status', ['pending', 'processing'])
        .eq('user_id', identity.data.user.id).maybeSingle();
      if (result.error) return response({ error: 'lookup_failed' }, 503);
      return response({ request: result.data });
    }
    const receipt = request.cookies.get(DELETION_RECEIPT_COOKIE)?.value;
    if (!receipt || !/^[0-9a-f]{64}$/.test(receipt)) return response({ request: null });
    const result = await admin.schema('api').rpc('account_deletion_receipt_status', { receipt_hash: hash(receipt) });
    if (result.error) return response({ error: 'lookup_failed' }, 503);
    return response({ request: result.data });
  } catch { return response({ error: 'lookup_failed' }, 503); }
}

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin)
    return response({ error: 'forbidden' }, 403);
  const admin = deletionAdmin();
  if (!admin) return response({ error: 'unavailable' }, 503);
  try {
    if (!request.headers.get('content-type')?.startsWith('application/json')
      || Number(request.headers.get('content-length') ?? 0) > 256)
      return response({ error: 'invalid_confirmation' }, 400);
    const body = await request.text();
    if (body.length > 256) return response({ error: 'invalid_confirmation' }, 400);
    let payload;
    try { payload = JSON.parse(body); }
    catch { return response({ error: 'invalid_confirmation' }, 400); }
    if (payload?.confirm !== true) return response({ error: 'invalid_confirmation' }, 400);
    const client = await serverSupabase();
    const identity = client ? await client.auth.getUser() : null;
    if (!identity?.data.user || identity.error) return response({ error: 'reauthenticate' }, 401);
    if (payload.expectedUserId !== identity.data.user.id) return response({ error: 'account_changed' }, 409);
    const receipt = randomBytes(32).toString('hex');
    const queued = await client!.schema('api').rpc('request_account_deletion', { receipt_hash: hash(receipt) });
    if (queued.error) return response({ error: queued.error.code === '42501' ? 'reauthenticate' : 'submit_failed' }, queued.error.code === '42501' ? 401 : 503);
    // Deliver the durable receipt before slow erasure starts. The platform
    // keeps this best-effort attempt alive; cron resumes an interrupted lease.
    try {
      after(async () => {
        try { await processAccountDeletion(admin, queued.data); }
        catch { /* Durable queue remains available to the cron worker. */ }
      });
    } catch { /* Scheduling failure cannot discard an accepted request. */ }
    const result = response({ accepted: true, status: 'pending' }, 202);
    result.cookies.set(DELETION_RECEIPT_COOKIE, receipt, {
      httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'strict',
      path: '/', maxAge: 60 * 60 * 24 * 30,
    });
    return result;
  } catch { return response({ error: 'submit_failed' }, 503); }
}
