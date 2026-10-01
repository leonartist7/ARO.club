import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ user: { id: 'user-a' }, enabled: true, language: 'en', signOut: vi.fn(), rpc: vi.fn(), updateUser: vi.fn(), getUser: vi.fn() }));
vi.mock('../contexts/AuthContext', () => ({ useAuth: () => ({ user: state.user, loading: false, isBackendConfigured: true, signOut: state.signOut }) }));
vi.mock('../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: state.language }) }));
vi.mock('../lib/auth/lifecycle', () => ({ get lifecycleEnabled() { return state.enabled; }, MIN_PASSWORD_LENGTH: 8 }));
vi.mock('../lib/supabase', () => ({ supabase: { auth: { getUser: state.getUser, updateUser: state.updateUser }, schema: () => ({ rpc: state.rpc }) } }));
vi.mock('../lib/navigation', () => ({ Link: ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>, useLocation: () => ({ search: '?next=%2Fprofile' }) }));
vi.mock('next/link', () => ({ default: ({ href, children, ...rest }) => <a href={href} {...rest}>{children}</a> }));
import Deletion from './AccountDeletionPage';
import Eligibility from './AccountEligibilityPage';
import ResetPassword from '../app/(public)/auth/reset-password/reset-password';
const reply = (body, status = 200) => Promise.resolve({ ok: status < 400, status, json: async () => body });
describe('account lifecycle screens', () => {
  beforeEach(() => {
    vi.stubGlobal('React', React);
    state.user = { id: 'user-a' }; state.enabled = true; state.language = 'en';
    state.signOut.mockReset().mockResolvedValue(undefined);
    state.getUser.mockReset().mockResolvedValue({ data: { user: state.user }, error: null });
    state.rpc.mockReset(); state.updateUser.mockReset();
    vi.stubGlobal('fetch', vi.fn(() => reply({ request: null })));
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
  it('requires explicit confirmation and preserves the expected account on submission', async () => {
    render(<Deletion />);
    const button = await screen.findByRole('button', { name: 'Request account deletion' });
    expect(button.disabled).toBe(true);
    fireEvent.click(screen.getByRole('checkbox'));
    fetch.mockImplementationOnce(() => reply({ accepted: true, status: 'processing' }, 202));
    fireEvent.click(button);
    await waitFor(() => expect(state.signOut).toHaveBeenCalledOnce());
    expect(fetch.mock.calls.find(([, options]) => options?.method === 'POST')[1].body).toBe(JSON.stringify({ confirm: true, expectedUserId: 'user-a' }));
  });
  it('shows a completion receipt after sign-out', async () => {
    state.user = null;
    fetch.mockImplementation(() => reply({ request: { status: 'completed', requested_at: '2026-10-01T00:00:00Z' } }));
    render(<Deletion />);
    expect(await screen.findByText('Your ARO account has been deleted.')).toBeTruthy();
  });
  it('offers a retry after lookup failure without showing the confirmation form', async () => {
    fetch.mockImplementation(() => reply({}, 503));
    render(<Deletion />);
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
  });
  it('resets consent when the signed-in account changes', async () => {
    const result = render(<Deletion />);
    fireEvent.click(await screen.findByRole('checkbox'));
    state.user = { id: 'user-b' }; result.rerender(<Deletion />);
    expect((await screen.findByRole('checkbox')).checked).toBe(false);
  });
  it('reports database rejection of an underage declaration', async () => {
    state.rpc.mockResolvedValue({ error: { code: '22023' } });
    render(<Eligibility />);
    fireEvent.change(screen.getByLabelText('Date of birth'), { target: { value: '2015-01-01' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(state.rpc).toHaveBeenCalledWith('confirm_adult_eligibility', { birth_date: '2015-01-01' });
  });
  it('prevents submitting eligibility for a different account', async () => {
    state.getUser.mockResolvedValue({ data: { user: { id: 'other-user' } }, error: null });
    render(<Eligibility />);
    fireEvent.change(screen.getByLabelText('Date of birth'), { target: { value: '1990-01-01' } });
    fireEvent.click(screen.getByRole('checkbox')); fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(state.rpc).not.toHaveBeenCalled();
  });
  it('retries failed recovery sign-out without updating the password twice', async () => {
    state.updateUser.mockResolvedValue({ error: null });
    state.signOut.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(undefined);
    render(<ResetPassword />);
    fireEvent.change(screen.getByLabelText('New password'), { target: { value: 'Synthetic-secret-001' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Synthetic-secret-001' } });
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(await screen.findByRole('button', { name: 'Try signing out again' }));
    expect(await screen.findByRole('link', { name: 'Sign in' })).toBeTruthy();
    expect(state.updateUser).toHaveBeenCalledOnce();
    expect(state.signOut).toHaveBeenCalledTimes(2);
  });
});
