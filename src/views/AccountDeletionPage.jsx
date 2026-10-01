'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from '../lib/navigation';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { accountDeletionCopy } from '../i18n/accountDeletion';

export default function AccountDeletionPage() {
  const { user, loading: authLoading, isBackendConfigured } = useAuth();
  const language = useLanguage().language;
  return <AccountDeletionContent key={user?.id ?? 'guest'} user={user} authLoading={authLoading} isBackendConfigured={isBackendConfigured} language={language} />;
}

function AccountDeletionContent({ user, authLoading, isBackendConfigured, language }) {
  const copy = accountDeletionCopy[language] ?? accountDeletionCopy.en;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [lookupFailed, setLookupFailed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    supabase.from('account_deletion_requests')
      .select('id,status,requested_at')
      .in('status', ['pending', 'processing'])
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data, error: readError }) => {
        if (!active) return;
        if (readError) { setLookupFailed(true); setError(copy.readError); }
        else { setLookupFailed(false); setRequest(data); }
        setLoading(false);
      });
    return () => { active = false; };
  }, [authLoading, user, refreshKey, copy.readError]);

  const retryLookup = () => {
    setError('');
    setLookupFailed(false);
    setLoading(true);
    setRefreshKey((current) => current + 1);
  };

  const submit = async () => {
    if (!confirmed || !user || !supabase || pending) return;
    setPending(true);
    setError('');
    try {
      const { data: identity, error: identityError } = await supabase.auth.getUser();
      if (identityError || identity.user?.id !== user.id) throw new Error('session');
      const { data, error: insertError } = await supabase
        .from('account_deletion_requests')
        .insert({ user_id: user.id })
        .select('id,status,requested_at')
        .single();
      if (insertError?.code === '23505') {
        const existing = await supabase.from('account_deletion_requests')
          .select('id,status,requested_at')
          .in('status', ['pending', 'processing'])
          .eq('user_id', user.id).single();
        if (existing.error) throw existing.error;
        setRequest(existing.data);
      } else if (insertError) throw insertError;
      else setRequest(data);
    } catch {
      setError(copy.submitError);
    } finally {
      setPending(false);
    }
  };

  return (
    <div lang={language} className="min-h-screen bg-bone px-4 py-12 text-ink dark:bg-surface-dark dark:text-bone">
      <div className="mx-auto max-w-2xl">
        <Link to="/app/settings" className="font-bold text-primary-700 underline focus-visible:outline focus-visible:outline-4 dark:text-primary-300">{copy.back}</Link>
        <h1 className="mt-8 font-display text-3xl font-bold">{copy.title}</h1>
        <p className="mt-4 text-base leading-7">{copy.intro}</p>
        <p className="mt-3 text-base leading-7">{copy.details}</p>

        {!isBackendConfigured ? (
          <p className="mt-8 border border-ink/20 p-5" role="status">{copy.unavailable}</p>
        ) : authLoading || loading ? (
          <p className="mt-8" role="status">{copy.checking}</p>
        ) : !user ? (
          <div className="mt-8 border border-ink/20 p-5">
            <p>{copy.loginPrompt}</p>
            <Link to="/login?next=%2Faccount%2Fdelete" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary-700 underline dark:text-primary-300">{copy.login}</Link>
          </div>
        ) : lookupFailed ? (
          <button type="button" onClick={retryLookup} className="mt-8 min-h-11 font-bold text-primary-700 underline focus-visible:outline focus-visible:outline-4 dark:text-primary-300">{copy.retry}</button>
        ) : request ? (
          <div className="mt-8 border border-primary-500 p-5" role="status" aria-live="polite">
            <h2 className="font-display text-xl font-bold">{copy.status(copy.statusNames[request.status] ?? request.status)}</h2>
            <p className="mt-2">{copy.submitted(new Date(request.requested_at).toLocaleDateString(language))}</p>
          </div>
        ) : (
          <div className="mt-8 border border-ink/20 p-5">
            <label className="flex min-h-11 items-start gap-3 text-base leading-6">
              <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-5 w-5 accent-primary-700" />
              <span>{copy.consent}</span>
            </label>
            <button type="button" onClick={submit} disabled={!confirmed || pending} className="mt-5 min-h-11 rounded-lg bg-primary-700 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
              {pending ? copy.submitting : copy.submit}
            </button>
          </div>
        )}
        {error && <p role="alert" className="mt-5 text-red-700 dark:text-red-300">{error}</p>}
        <p className="mt-8 text-base"><Link to="/privacy" className="font-bold text-primary-700 underline dark:text-primary-300">{copy.privacy}</Link></p>
      </div>
    </div>
  );
}
