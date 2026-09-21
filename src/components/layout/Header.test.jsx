import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
const state = vi.hoisted(() => ({ signOut: vi.fn(), navigate: vi.fn() }));
vi.mock('../../contexts/AuthContext', () => ({ useAuth: () => ({ user: { email: 'synthetic@example.invalid' }, profile: null, signOut: state.signOut }) }));
vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ t: (key) => key }) }));
vi.mock('../../lib/navigation', () => ({
  Link: ({to, children, ...props}) => <a href={to} {...props}>{children}</a>,
  useLocation: () => ({pathname: '/profile'}), useNavigate: () => state.navigate,
}));
vi.mock('../ui/ThemeToggle', () => ({ default: () => null }));
vi.mock('../ui/LanguageToggle', () => ({ default: () => null }));
import Header from './Header';
beforeEach(() => { globalThis.React = React; state.signOut.mockReset(); state.navigate.mockReset(); });
afterEach(cleanup);
it('waits for Supabase logout before navigating away from the account', async () => {
  let finish;
  state.signOut.mockReturnValue(new Promise(resolve => { finish = resolve; }));
  render(<Header />);
  fireEvent.click(screen.getByRole('button', {name: 'Account menu'}));
  fireEvent.click(screen.getByRole('menuitem', {name: 'nav.signOut'}));
  expect(state.signOut).toHaveBeenCalledOnce();
  expect(state.navigate).not.toHaveBeenCalled();
  finish();
  await waitFor(() => expect(state.navigate).toHaveBeenCalledWith('/', {replace: true}));
});
it('keeps the account visible and offers retry when logout fails', async () => {
  state.signOut.mockRejectedValue(new Error('unavailable'));
  render(<Header />);
  fireEvent.click(screen.getByRole('button', {name: 'Account menu'}));
  fireEvent.click(screen.getByRole('menuitem', {name: 'nav.signOut'}));
  expect((await screen.findByRole('alert')).textContent).toContain('Please try again');
  expect(state.navigate).not.toHaveBeenCalled();
});
