import { describe, expect, it, vi } from 'vitest';
import { processAccountDeletion } from './deletion-worker';

function fixture() {
  const calls: string[] = [];
  let inventory = [{ bucket_id: 'verification-docs', name: 'user/doc.png' }];
  const rpc = vi.fn(async (name: string) => {
    calls.push(name);
    if (name === 'claim_account_deletion') return { data: { request_id: 'request', user_id: 'user', lease_token: 'lease' }, error: null };
    if (name === 'account_deletion_objects') return { data: [...inventory], error: null };
    return { data: null, error: null };
  });
  const remove = vi.fn(async () => { calls.push('remove-storage'); inventory = []; return { error: null }; });
  const updateUserById = vi.fn(async () => { calls.push('ban'); return { error: null }; });
  const deleteUser = vi.fn(async () => { calls.push('delete-auth'); return { error: null }; });
  const getUserById = vi.fn(async () => ({ data: { user: null }, error: { status: 404 } }));
  const admin: any = { schema: () => ({ rpc }), storage: { from: () => ({ remove }) }, auth: { admin: { updateUserById, deleteUser, getUserById } } };
  return { admin, rpc, remove, updateUserById, deleteUser, getUserById, calls };
}
describe('account deletion worker', () => {
  it('bans, removes Storage, deletes Auth, then records completion', async () => {
    const f = fixture();
    expect(await processAccountDeletion(f.admin, 'request')).toBe('completed');
    expect(f.deleteUser).toHaveBeenCalledWith('user', false);
    expect(f.calls).toEqual(['claim_account_deletion', 'ban', 'account_deletion_objects', 'remove-storage', 'account_deletion_objects', 'delete-auth', 'finish_account_deletion']);
  });
  it('never erases a blocked marketplace or Trust account', async () => {
    const f = fixture();
    f.rpc.mockResolvedValueOnce({ data: { blocked: true } as any, error: null });
    expect(await processAccountDeletion(f.admin)).toBe('blocked');
    expect(f.updateUserById).not.toHaveBeenCalled();
    expect(f.remove).not.toHaveBeenCalled();
    expect(f.deleteUser).not.toHaveBeenCalled();
  });
  it('stops before Auth deletion when Storage fails and records a retry', async () => {
    const f = fixture();
    f.remove.mockResolvedValueOnce({ error: new Error('storage unavailable') } as any);
    expect(await processAccountDeletion(f.admin)).toBe('retry');
    expect(f.deleteUser).not.toHaveBeenCalled();
    expect(f.rpc).toHaveBeenCalledWith('fail_account_deletion', { target_request: 'request', token: 'lease', failure_code: 'storage_error' });
  });
  it('stops before any erasure when ban or inventory fails', async () => {
    const f = fixture();
    f.updateUserById.mockResolvedValueOnce({ error: new Error('provider unavailable') } as any);
    expect(await processAccountDeletion(f.admin)).toBe('retry');
    expect(f.remove).not.toHaveBeenCalled();
    expect(f.deleteUser).not.toHaveBeenCalled();
  });
  it('reconciles a timeout only when Auth explicitly confirms absence', async () => {
    const f = fixture();
    f.deleteUser.mockResolvedValueOnce({ error: new Error('timeout') } as any);
    expect(await processAccountDeletion(f.admin)).toBe('completed');
    expect(f.getUserById).toHaveBeenCalledWith('user');
  });
  it('does not treat an unavailable identity lookup as completed deletion', async () => {
    const f = fixture();
    f.deleteUser.mockResolvedValueOnce({ error: new Error('timeout') } as any);
    f.getUserById.mockResolvedValueOnce({ data: { user: null }, error: { status: 503 } });
    expect(await processAccountDeletion(f.admin)).toBe('retry');
    expect(f.calls).not.toContain('finish_account_deletion');
  });
  it('reconciles an already removed Auth row without another erasure', async () => {
    const f = fixture();
    f.rpc.mockResolvedValueOnce({ data: { completed: true } as any, error: null });
    expect(await processAccountDeletion(f.admin)).toBe('completed');
    expect(f.deleteUser).not.toHaveBeenCalled();
  });
  it('fails visibly when a retry cannot be recorded', async () => {
    const f = fixture();
    f.rpc.mockImplementation(async (name: string) => name === 'claim_account_deletion'
      ? { data: { request_id: 'request', user_id: 'user', lease_token: 'lease' } as any, error: null }
      : { data: null, error: new Error('database unavailable') } as any);
    await expect(processAccountDeletion(f.admin)).rejects.toThrow('could not be recorded');
    expect(f.deleteUser).not.toHaveBeenCalled();
  });
});
