import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state=vi.hoisted(() => ({ signUp: vi.fn(), resend: vi.fn() }));
vi.mock('../contexts/AuthContext', () => ({ useAuth: () => ({ signUp: state.signUp, resendConfirmation: state.resend, isBackendConfigured: true }) }));
vi.mock('../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'en' }) }));
vi.mock('../lib/navigation', () => ({ Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>, useLocation: () => ({ search: '?next=%2Fprofile' }) }));
vi.mock('framer-motion', () => ({ useReducedMotion: () => true, motion: { div: ({ children, initial: _initial, animate: _animate, transition: _transition, ...props }) => <div {...props}>{children}</div> } }));
import Signup from './SignupPage';
async function create() {
  render(<Signup />);
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Synthetic User' } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'synthetic@example.invalid' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Synthetic-secret-0001' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Synthetic-secret-0001' } });
  await act(async () => fireEvent.submit(document.querySelector('form')));
}
describe('signup confirmation retry', () => {
  beforeEach(() => {
    vi.stubGlobal('React',React); vi.useFakeTimers();
    state.signUp.mockReset().mockResolvedValue({ user: { id: 'synthetic' }, session: null, error: null });
    state.resend.mockReset().mockResolvedValue({ error: null });
  });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
  it('clears passwords and preserves the protected destination while awaiting confirmation', async () => {
    await create();
    expect(screen.getByLabelText('Password').value).toBe('');
    expect(screen.getByLabelText('Confirm Password').value).toBe('');
    expect(state.signUp.mock.calls[0][0].returnTo).toBe('/profile');
    expect(screen.getByRole('button', { name: /You can resend in/ }).disabled).toBe(true);
  });
  it('resends only after the cooldown and reports a generic inbox message', async () => {
    await create();
    await act(async () => vi.advanceTimersByTime(60_000));
    await act(async () => fireEvent.click(screen.getByRole('button',{ name: 'Resend confirmation email' })));
    expect(state.resend).toHaveBeenCalledWith('synthetic@example.invalid','/profile');
    expect(screen.getByRole('status').textContent).toContain('If confirmation is still needed');
    expect(screen.getByRole('button', { name: /You can resend in/ }).disabled).toBe(true);
  });
  it('lets the user correct the email without retaining the password', async () => {
    await create();
    fireEvent.click(screen.getByRole('button', { name: 'Use a different email' }));
    expect(screen.getByLabelText('Email Address').value).toBe('');
    expect(screen.getByLabelText('Email Address').disabled).toBe(false);
    expect(screen.getByLabelText('Password').value).toBe('');
  });
});
