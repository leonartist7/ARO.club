"use client";
import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { accountLifecycleCopy } from '../../../../i18n/accountLifecycle';
import { MIN_PASSWORD_LENGTH } from '../../../../lib/auth/lifecycle';
export default function ResetPassword() {
  const { signOut } = useAuth() as { signOut: () => Promise<void> };
  const { language } = useLanguage() as { language: keyof typeof accountLifecycleCopy };
  const copy = accountLifecycleCopy[language] ?? accountLifecycleCopy.en;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  async function finishSignOut() {
    setPending(true);
    try {
      await signOut();
      setSuccess(true);
      setMessage(copy.passwordSuccess);
    } catch { setMessage(copy.cleanupError); }
    finally { setPending(false); }
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    if (password.length < MIN_PASSWORD_LENGTH || password !== confirm) { setMessage(copy.passwordInvalid); return; }
    setPending(true);
    setMessage('');
    try {
      if (!supabase) throw new Error('accounts unavailable');
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPasswordChanged(true);
      setPassword('');
      setConfirm('');
      await finishSignOut();
    } catch { setMessage(copy.passwordError); }
    finally { setPending(false); }
  }
  const buttonClass = 'min-h-11 rounded-lg bg-primary-700 px-5 py-3 font-bold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-4';
  return <section lang={language} className="mx-auto max-w-lg p-8 text-ink dark:text-bone">
    <h1 className="font-display text-3xl font-bold">{copy.passwordTitle}</h1>
    <p role="status" aria-live="polite" className="my-4">{message}</p>
    {success ? <Link href="/login" className="inline-flex min-h-11 items-center underline">{copy.login}</Link>
      : passwordChanged ? <button type="button" onClick={finishSignOut} disabled={pending} className={buttonClass}>{copy.retrySignOut}</button>
      : <form onSubmit={submit} className="space-y-4">
        <label className="block">{copy.newPassword}
          <input className="block w-full rounded border p-3 text-ink" type="password" autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required disabled={pending} value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label className="block">{copy.confirmPassword}
          <input className="block w-full rounded border p-3 text-ink" type="password" autoComplete="new-password" required disabled={pending} value={confirm} onChange={e => setConfirm(e.target.value)} />
        </label>
        <button type="submit" className={buttonClass} disabled={pending}>{pending ? copy.passwordPending : copy.passwordSubmit}</button>
      </form>}
  </section>;
}
