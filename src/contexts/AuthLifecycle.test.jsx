import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({
  enabled: true, getSession: vi.fn(), signOut: vi.fn(), rpc: vi.fn(), profile: vi.fn(),
  listener: null, refresh: vi.fn(), clear: vi.fn(), signInStore: vi.fn(),
}));
vi.mock('next/navigation', () => ({ useRouter: () => router }));
const router = { refresh: state.refresh };
vi.mock('../lib/auth/lifecycle', () => ({ get lifecycleEnabled() { return state.enabled; }, AUTH_RETURN_COOKIE: 'aro-auth-return', MIN_PASSWORD_LENGTH: 8 }));
vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true, supabaseConfigError: new Error('unavailable'),
  supabase: {
    auth: {
      getSession: state.getSession, signOut: state.signOut,
      onAuthStateChange: fn => { state.listener = fn; return { data: { subscription: { unsubscribe: vi.fn() } } }; },
    },
    from: () => { const query = { select: () => query, eq: (_key, id) => { query.id = id; return query; }, single: () => state.profile(query.id) }; return query; },
    schema: () => ({ rpc: state.rpc, from: () => { const query = { select: () => query, eq: () => query, single: async () => ({ data: { role: 'participant' }, error: null }) }; return query; } }),
  },
}));
vi.mock('../store/usePlayerStore', () => ({ usePlayerStore: { getState: () => ({ signOut: state.clear, signIn: state.signInStore }) } }));
vi.mock('../store/useStore', () => ({ useStore: { setState: vi.fn() } }));
import { AuthProvider, useAuth } from './AuthContext';
function Probe() {
  const { user, profile, signOut } = useAuth();
  const [error, setError] = React.useState('');
  return <><output>{user?.id ?? 'guest'}|{profile?.name ?? 'none'}</output>
    <button onClick={() => signOut().catch(() => setError('logout failed'))}>Log out</button><p>{error}</p></>;
}
const session = id => ({ data: { session: id ? { user: { id } } : null } });
const emit = async id => { await act(async () => { state.listener('SIGNED_IN', { user: { id } }); }); };
describe('live sessions and cross-account state', () => {
  beforeEach(() => {
    vi.stubGlobal('React', React);
    state.enabled = true;
    state.getSession.mockReset().mockResolvedValue(session(null));
    state.signOut.mockReset().mockResolvedValue({ error: null });
    state.rpc.mockReset().mockResolvedValue({ data: { active: true, eligible: true }, error: null });
    state.profile.mockReset().mockImplementation(async id => ({ data: { name: id }, error: null }));
    state.clear.mockClear(); state.signInStore.mockClear(); state.refresh.mockClear();
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
  it('does not apply a late profile from a previous account', async () => {
    let resolveA;
    state.profile.mockImplementation(id => id === 'a' ? new Promise(resolve => { resolveA = resolve; }) : Promise.resolve({ data: { name: 'b' }, error: null }));
    render(<AuthProvider><Probe /></AuthProvider>);
    await screen.findByText('guest|none');
    await emit('a'); await waitFor(() => expect(resolveA).toBeDefined());
    await emit('b'); await screen.findByText('b|b');
    await act(async () => resolveA({ data: { name: 'wrong-account' }, error: null }));
    expect(screen.getByText('b|b')).toBeTruthy();
    expect(state.signInStore.mock.calls.every(([user]) => user.id === 'b')).toBe(true);
  });
  it('keeps ineligible users out of profile and marketplace state', async () => {
    state.rpc.mockResolvedValue({ data: { active: true, eligible: false }, error: null });
    render(<AuthProvider><Probe /></AuthProvider>);
    await emit('a');
    expect(await screen.findByText('a|none')).toBeTruthy();
    expect(state.profile).not.toHaveBeenCalled(); expect(state.signInStore).not.toHaveBeenCalled();
  });
  it('clears a revoked session on focus even when a cached session still exists', async () => {
    state.getSession.mockResolvedValue(session('a'));
    render(<AuthProvider><Probe /></AuthProvider>);
    await screen.findByText('a|a');
    state.rpc.mockResolvedValue({ data: { active: false }, error: null });
    fireEvent(window, new Event('focus'));
    expect(await screen.findByText('guest|none')).toBeTruthy();
    expect(state.clear).toHaveBeenCalled();
  });
  it('keeps logout failure visible and does not report a successful logout', async () => {
    state.getSession.mockResolvedValue(session('a'));
    state.signOut.mockResolvedValue({ error: new Error('offline') });
    render(<AuthProvider><Probe /></AuthProvider>);
    await screen.findByText('a|a');
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('logout failed')).toBeTruthy();
    expect(screen.getByText('a|a')).toBeTruthy();
    expect(state.signOut).toHaveBeenCalledWith({ scope: 'global' });
    expect(state.refresh).not.toHaveBeenCalled();
  });
  it('does not let a late initial session overwrite a newer sign-in', async () => {
    let resolveInitial;
    state.getSession.mockImplementation(() => new Promise(resolve => { resolveInitial = resolve; }));
    render(<AuthProvider><Probe /></AuthProvider>);
    await emit('b'); await screen.findByText('b|b');
    await act(async () => resolveInitial(session('a')));
    expect(screen.getByText('b|b')).toBeTruthy();
  });
});
