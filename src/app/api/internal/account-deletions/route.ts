import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { deletionAdmin } from '../../../../lib/auth/admin';
import { processAccountDeletion } from '../../../../lib/auth/deletion-worker';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const actual = request.headers.get('authorization') ?? '';
  const presented = Buffer.from(actual);
  const wanted = Buffer.from(`Bearer ${expected ?? ''}`);
  const valid = expected && presented.length === wanted.length && timingSafeEqual(presented, wanted);
  const headers = { 'Cache-Control': 'private, no-store' };
  if (!valid) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers });
  const admin = deletionAdmin();
  if (!admin) return NextResponse.json({ error: 'unavailable' }, { status: 503, headers });
  const counts = { completed: 0, blocked: 0, retry: 0 };
  try {
    const started = Date.now();
    for (let i = 0; i < 5 && Date.now() - started < 40_000; i += 1) {
      const result = await processAccountDeletion(admin);
      if (result === 'idle') break;
      counts[result] += 1;
    }
    const purge = await admin.schema('api').rpc('purge_account_deletions');
    if (purge.error) throw new Error('purge failed');
    const health = await admin.schema('api').rpc('account_deletion_queue_health');
    if (health.error || !health.data) throw new Error('queue health unavailable');
    return NextResponse.json({ ...counts, purged: purge.data, queue: health.data }, {
      status: counts.blocked || counts.retry || health.data.blocked || health.data.failed || health.data.overdue ? 503 : 200, headers,
    });
  } catch { return NextResponse.json({ error: 'worker_failed', ...counts }, { status: 503, headers }); }
}
