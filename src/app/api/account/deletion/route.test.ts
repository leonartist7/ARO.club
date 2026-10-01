import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { createHash } from 'node:crypto';
const state = vi.hoisted(() => ({ admin: null as any, client: null as any, process: vi.fn(), after: vi.fn() }));
vi.mock('next/server', async importOriginal => ({ ...await importOriginal<typeof import('next/server')>(), after: state.after }));
vi.mock('../../../../lib/auth/admin', () => ({ deletionAdmin: () => state.admin }));
vi.mock('../../../../lib/auth/server', () => ({ serverSupabase: async () => state.client }));
vi.mock('../../../../lib/auth/deletion-worker', () => ({ processAccountDeletion: state.process }));
import { GET, POST } from './route';
const post = (body: object, origin = 'https://aro.example') => new NextRequest('https://aro.example/api/account/deletion', {
  method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body),
});
describe('deletion confirmation and receipts', () => {
  beforeEach(() => {
    const rpc = vi.fn(async (name: string) => ({ data: name === 'account_access_status' ? { active: true } : 'request-id', error: null }));
    state.client = { auth: { getUser: vi.fn(async () => ({ data: { user: { id: 'user-a' } }, error: null })) }, schema: () => ({ rpc }) };
    state.admin = { schema: () => ({ rpc: vi.fn(async () => ({ data: { status: 'completed' }, error: null })) }) };
    state.process.mockReset().mockResolvedValue('completed');
    state.after.mockReset();
  });
  it('rejects cross-origin confirmation before touching the worker', async () => {
    expect((await POST(post({ confirm: true, expectedUserId: 'user-a' }, 'https://evil.invalid'))).status).toBe(403);
    expect(state.process).not.toHaveBeenCalled();
  });
  it('requires explicit confirmation and a matching current account', async () => {
    expect((await POST(post({ confirm: false, expectedUserId: 'user-a' }))).status).toBe(400);
    expect((await POST(post({ confirm: true, expectedUserId: 'user-b' }))).status).toBe(409);
    expect(state.process).not.toHaveBeenCalled();
  });
  it('requires authentication and fresh-login approval from the database', async () => {
    state.client.auth.getUser.mockResolvedValueOnce({ data: { user: null }, error: null });
    expect((await POST(post({ confirm: true, expectedUserId: 'user-a' }))).status).toBe(401);
    state.client.schema = () => ({ rpc: async () => ({ error: { code: '42501' }, data: null }) });
    expect((await POST(post({ confirm: true, expectedUserId: 'user-a' }))).status).toBe(401);
    expect(state.process).not.toHaveBeenCalled();
  });
  it('keeps a committed request and opaque receipt when processing fails', async () => {
    state.process.mockRejectedValueOnce(new Error('network unavailable'));
    const result = await POST(post({ confirm: true, expectedUserId: 'user-a' }));
    expect(result.status).toBe(202);
    expect(state.process).not.toHaveBeenCalled();
    await state.after.mock.calls[0][0]();
    expect(state.process).toHaveBeenCalledWith(state.admin, 'request-id');
    const cookie = result.cookies.get('aro-deletion-receipt');
    expect(cookie?.value).toMatch(/^[0-9a-f]{64}$/);
    expect(result.headers.get('set-cookie')).toContain('HttpOnly');
    expect(result.headers.get('set-cookie')).toContain('SameSite=strict');
    expect(result.headers.get('set-cookie')).toContain('Secure');
    expect(await result.json()).toEqual({ accepted: true, status: 'pending' });
  });
  it('returns the committed receipt even when background scheduling fails', async () => {
    state.after.mockImplementation(() => { throw new Error('scheduler unavailable'); });
    const result = await POST(post({ confirm: true, expectedUserId: 'user-a' }));
    expect(result.status).toBe(202);
    expect(result.cookies.get('aro-deletion-receipt')?.value).toMatch(/^[0-9a-f]{64}$/);
  });
  it('does not expose another account receipt to a newly signed-in user', async () => {
    const query: any = { select: () => query, in: () => query, eq: vi.fn(() => query), maybeSingle: async () => ({ data: null, error: null }) };
    state.client.from = () => query;
    const receiptRpc = vi.fn();
    state.admin.schema = () => ({ rpc: receiptRpc });
    const result = await GET(new NextRequest('https://aro.example/api/account/deletion', { headers: { cookie: 'aro-deletion-receipt=' + 'a'.repeat(64) } }));
    expect(query.eq).toHaveBeenCalledWith('user_id', 'user-a');
    expect(receiptRpc).not.toHaveBeenCalled();
    expect(await result.json()).toEqual({ request: null });
  });
  it('allows a revoked session to read its anonymous completion receipt without sending the raw secret to the database', async () => {
    state.client.schema = () => ({ rpc: async () => ({ data: { active: false }, error: null }) });
    const receiptRpc = vi.fn(async () => ({ data: { status: 'completed' }, error: null }));
    state.admin.schema = () => ({ rpc: receiptRpc });
    const receipt = 'b'.repeat(64);
    const result = await GET(new NextRequest('https://aro.example/api/account/deletion', { headers: { cookie: 'aro-deletion-receipt=' + receipt } }));
    expect(receiptRpc).toHaveBeenCalledWith('account_deletion_receipt_status', { receipt_hash: createHash('sha256').update(receipt).digest('hex') });
    expect(await result.json()).toEqual({ request: { status: 'completed' } });
    expect(result.headers.get('cache-control')).toContain('no-store');
  });
  it('fails closed when the worker configuration is absent', async () => {
    state.admin = null;
    expect((await POST(post({ confirm: true, expectedUserId: 'user-a' }))).status).toBe(503);
    expect((await GET(new NextRequest('https://aro.example/api/account/deletion'))).status).toBe(503);
  });
});
