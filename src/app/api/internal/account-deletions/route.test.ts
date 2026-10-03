import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const state = vi.hoisted(() => ({ admin: null as any, process: vi.fn() }));
vi.mock('../../../../lib/auth/admin', () => ({ deletionAdmin: () => state.admin }));
vi.mock('../../../../lib/auth/deletion-worker', () => ({ processAccountDeletion: state.process }));
import { GET } from './route';
describe('privileged scheduled deletion', () => {
  beforeEach(() => { vi.stubEnv('CRON_SECRET', 'synthetic'); state.admin = { schema: () => ({ rpc: async (name: string) => ({ data: name === 'account_deletion_queue_health' ? { waiting: 0, blocked: 0, failed: 0, overdue: 0 } : 2, error: null }) }) }; state.process.mockReset().mockResolvedValue('idle'); });
  afterEach(() => vi.unstubAllEnvs());
  it('rejects wrong or absent secret without processing data', async () => {
    expect((await GET(new NextRequest('https://aro.example/api/internal/account-deletions'))).status).toBe(401);
    expect((await GET(new NextRequest('https://aro.example/api/internal/account-deletions', { headers: { authorization: 'Bearer synthétic' } }))).status).toBe(401);
    expect(state.process).not.toHaveBeenCalled();
  });
  it('processes a bounded batch and purges resolved records', async () => {
    state.process.mockResolvedValueOnce('completed');
    const response = await GET(new NextRequest('https://aro.example/api/internal/account-deletions', { headers: { authorization: 'Bearer synthetic' } }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ completed: 1, blocked: 0, retry: 0, purged: 2, queue: { waiting: 0, blocked: 0, failed: 0, overdue: 0 } });
  });
  it('signals that exceptions need operational attention', async () => {
    state.process.mockResolvedValueOnce('blocked');
    expect((await GET(new NextRequest('https://aro.example/api/internal/account-deletions', { headers: { authorization: 'Bearer synthetic' } }))).status).toBe(503);
  });
  it('keeps alerting while a blocked request waits for its next lease', async () => {
    state.admin = { schema: () => ({ rpc: async () => ({ data: { blocked: 1 }, error: null }) }) };
    expect((await GET(new NextRequest('https://aro.example/api/internal/account-deletions', { headers: { authorization: 'Bearer synthetic' } }))).status).toBe(503);
  });
});
