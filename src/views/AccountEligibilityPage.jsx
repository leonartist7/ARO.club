'use client';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from '../lib/navigation';
import { safeReturnPath } from '../lib/auth/config';
import { lifecycleEnabled } from '../lib/auth/lifecycle';
import { supabase } from '../lib/supabase';
import { accountLifecycleCopy } from '../i18n/accountLifecycle';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AccountEligibilityPage() {
  const { user, loading, isBackendConfigured } = useAuth();
  const { language } = useLanguage();
  const copy = accountLifecycleCopy[language] ?? accountLifecycleCopy.en;
  const location = useLocation();
  const next = safeReturnPath(new URLSearchParams(location.search).get('next'));
  return <EligibilityForm key={user?.id ?? 'guest'} {...{ user, loading, isBackendConfigured, language, copy, next }} />;
}
function EligibilityForm({ user, loading, isBackendConfigured, language, copy, next }) {
  const [birthDate, setBirthDate] = useState('');
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    if (pending || !consent || !birthDate || !user || !supabase) return;
    setPending(true);
    setError('');
    try {
      const identity = await supabase.auth.getUser();
      if (identity.error || identity.data.user?.id !== user.id) throw new Error('account changed');
      const result = await supabase.schema('api').rpc('confirm_adult_eligibility', { birth_date: birthDate });
      if (result.error) { setError(result.error.code === '22023' ? copy.invalid : copy.error); return; }
      setBirthDate('');
      window.location.replace(next);
    } catch { setError(copy.error); }
    finally { setPending(false); }
  }
  return <section lang={language} className="mx-auto min-h-screen max-w-xl px-4 py-12 text-ink dark:text-bone">
    <h1 className="font-display text-3xl font-bold">{copy.title}</h1>
    <p className="mt-4 text-base leading-7">{copy.intro}</p>
    {!isBackendConfigured || !lifecycleEnabled ? <p role="status" className="mt-6">{copy.unavailable}</p>
      : loading ? <p role="status" className="mt-6">{copy.checking}</p>
      : !user ? <Link to={'/login?next=' + encodeURIComponent('/account/eligibility?next=' + encodeURIComponent(next))} className="mt-6 inline-flex min-h-11 items-center font-bold text-primary-700 underline dark:text-primary-300">{copy.signIn}</Link>
      : <form onSubmit={submit} className="mt-8 space-y-5">
        <Input id="birth-date" type="date" label={copy.birthDate} value={birthDate} onChange={event => setBirthDate(event.target.value)} required disabled={pending} />
        <label className="flex min-h-11 items-start gap-3 text-base">
          <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 h-5 w-5 accent-primary-700" disabled={pending} />
          <span>{copy.consent} <Link to="/terms" className="underline">{copy.terms}</Link> · <Link to="/privacy" className="underline">{copy.privacy}</Link></span>
        </label>
        <Button type="submit" disabled={pending || !consent} loading={pending}>{pending ? copy.pending : copy.submit}</Button>
        {error && <p role="alert" className="text-danger-700 dark:text-danger-500">{error}</p>}
      </form>}
  </section>;
}
