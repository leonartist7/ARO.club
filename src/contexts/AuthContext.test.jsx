import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  signInWithOAuth: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh: mocks.refresh }) }));
vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabaseConfigError: new Error('Accounts unavailable'),
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
      signInWithOAuth: mocks.signInWithOAuth,
      resetPasswordForEmail: mocks.resetPasswordForEmail,
    },
  },
}));
vi.mock('../store/usePlayerStore', () => ({
  usePlayerStore: { getState: () => ({ user: null, signOut: vi.fn() }) },
}));
vi.mock('../store/useStore', () => ({ useStore: { setState: vi.fn() } }));

import { AuthProvider, useAuth } from './AuthContext';

function GoogleAction({ returnTo }) {
  const { signInWithGoogle } = useAuth();
  const [result, setResult] = React.useState('');
  return <>
    <button onClick={async () => {
      const { error } = await signInWithGoogle(returnTo);
      setResult(error?.message || 'started');
    }}>Continue with Google</button>
    <output>{result}</output>
  </>;
}

function RecoveryAction() {
  const { resetPassword } = useAuth();
  return <button onClick={() => void resetPassword('test@example.com')}>Reset password</button>;
}

describe('Google account entry', () => {
  beforeEach(() => {
    vi.stubGlobal('React', React);
    mocks.signInWithOAuth.mockReset();
    mocks.resetPasswordForEmail.mockReset();
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('starts Google OAuth with the same-origin callback handled by the server', async () => {
    mocks.signInWithOAuth.mockResolvedValue({ data: { url: 'https://accounts.google.com/' }, error: null });
    render(<AuthProvider><GoogleAction /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));
    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    }));
    expect(await screen.findByText('started')).toBeTruthy();
  });

  it('returns provider errors so the account screen can offer retry', async () => {
    mocks.signInWithOAuth.mockResolvedValue({ data: null, error: new Error('Provider unavailable') });
    render(<AuthProvider><GoogleAction /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));
    expect(await screen.findByText('Provider unavailable')).toBeTruthy();
  });

  it('preserves a validated deletion return path in the OAuth callback', async () => {
    mocks.signInWithOAuth.mockResolvedValue({ data: { url: 'https://accounts.google.com/' }, error: null });
    render(<AuthProvider><GoogleAction returnTo="/account/delete" /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));
    await waitFor(() => expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=%2Faccount%2Fdelete` },
    }));
  });

  it('uses a query-free callback so the email template can append a recovery token', async () => {
    mocks.resetPasswordForEmail.mockResolvedValue({ data: {}, error: null });
    render(<AuthProvider><RecoveryAction /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));
    await waitFor(() => expect(mocks.resetPasswordForEmail).toHaveBeenCalledWith(
      'test@example.com',
      { redirectTo: `${window.location.origin}/auth/callback` },
    ));
  });
});
