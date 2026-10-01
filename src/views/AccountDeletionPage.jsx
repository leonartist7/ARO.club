'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from '../lib/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { lifecycleEnabled } from '../lib/auth/lifecycle';
import { accountDeletionCopy } from '../i18n/accountDeletion';
import { accountLifecycleCopy } from '../i18n/accountLifecycle';

export default function AccountDeletionPage() {
  const { user, loading: authLoading, isBackendConfigured, signOut } = useAuth();
  const { language } = useLanguage();
  return <AccountDeletionContent key={user?.id ?? 'guest'} {...{ user, authLoading, isBackendConfigured, signOut, language }} />;
}
function AccountDeletionContent({ user, authLoading, isBackendConfigured, signOut, language }) {
  const copy = accountDeletionCopy[language] ?? accountDeletionCopy.en;
  const lifecycle = accountLifecycleCopy[language] ?? accountLifecycleCopy.en;
  const configured = isBackendConfigured && lifecycleEnabled;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [needsReauth, setNeedsReauth] = useState(false);
  const [lookupFailed, setLookupFailed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    if (authLoading) return;
    if (!configured) { setLoading(false); return; }
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    fetch('/api/account/deletion', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('lookup failed');
        const result = await response.json();
        if (active) { setRequest(result.request); setLookupFailed(false); setError(''); }
      }).catch(() => { if (active) { setLookupFailed(true); setError(copy.readError); } })
      .finally(() => { window.clearTimeout(timeout); if (active) setLoading(false); });
    return () => { active = false; window.clearTimeout(timeout); controller.abort(); };
  }, [authLoading, configured, refreshKey, copy.readError]);
  useEffect(() => {
    if (!['pending', 'processing'].includes(request?.status)) return;
    const timer = window.setTimeout(() => setRefreshKey(value => value + 1), 10_000);
    return () => window.clearTimeout(timer);
  }, [request, refreshKey]);
  const retryLookup = () => { setError(''); setLoading(true); setRefreshKey(value => value + 1); };
  const submit = async () => {
    if (!confirmed || !user || pending) return;
    setPending(true);
    setError('');
    setNeedsReauth(false);
    try {
      const response = await fetch('/api/account/deletion', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true, expectedUserId: user.id }), signal: AbortSignal.timeout(55_000),
      });
      const result = await response.json();
      if (!response.ok || !result.accepted) {
        setNeedsReauth(result.error === 'reauthenticate' || result.error === 'account_changed');
        throw new Error('unconfirmed');
      }
      if (['completed', 'processing'].includes(result.status)) {
        try { await signOut(); } catch { /* Receipt remains available after provider revocation. */ }
      }
      setRefreshKey(value => value + 1);
    } catch { setError(copy.submitError); }
    finally { setPending(false); }
  };
  return <div lang={language} className="min-h-screen bg-bone px-4 py-12 text-ink dark:bg-surface-dark dark:text-bone">
    <div className="mx-auto max-w-2xl">
      <Link to="/app/settings" className="inline-flex min-h-11 items-center font-bold text-primary-700 underline focus-visible:outline focus-visible:outline-4 dark:text-primary-300">{copy.back}</Link>
      <h1 className="mt-8 font-display text-3xl font-bold">{copy.title}</h1>
      <p className="mt-4 text-base leading-7">{configured ? lifecycle.deletionIntro : copy.intro}</p>
      <p className="mt-3 text-base leading-7">{configured ? lifecycle.deletionDetails : copy.details}</p>
      {!configured ? <p className="mt-8 border border-ink/20 p-5" role="status">{copy.unavailable}</p>
        : authLoading || loading ? <p className="mt-8" role="status">{copy.checking}</p>
        : lookupFailed ? <button type="button" onClick={retryLookup} className="mt-8 min-h-11 font-bold text-primary-700 underline focus-visible:outline focus-visible:outline-4 dark:text-primary-300">{copy.retry}</button>
        : request ? <div className="mt-8 border border-primary-500 p-5" role="status" aria-live="polite">
          <h2 className="font-display text-xl font-bold">{request.status === 'completed' ? lifecycle.completed : request.status === 'processing' ? lifecycle.processing : copy.status(copy.statusNames[request.status] ?? request.status)}</h2>
          <p className="mt-2">{copy.submitted(new Date(request.requested_at).toLocaleDateString(language))}</p>
        </div>
        : !user ? <div className="mt-8 border border-ink/20 p-5">
          <p>{copy.loginPrompt}</p>
          <Link to="/login?next=%2Faccount%2Fdelete" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary-700 underline dark:text-primary-300">{copy.login}</Link>
        </div>
        : <div className="mt-8 border border-ink/20 p-5">
          <label className="flex min-h-11 items-start gap-3 text-base leading-6">
            <input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} disabled={pending} className="mt-1 h-5 w-5 accent-primary-700" />
            <span>{copy.consent}</span>
          </label>
          <button type="button" onClick={submit} disabled={!confirmed || pending} className="mt-5 min-h-11 rounded-lg bg-primary-700 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary-500">{pending ? copy.submitting : copy.submit}</button>
          {needsReauth && <Link to="/login?next=%2Faccount%2Fdelete" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary-700 underline dark:text-primary-300">{lifecycle.reauthenticate}</Link>}
        </div>}
      {error && <p role="alert" className="mt-5 text-red-700 dark:text-red-300">{error}</p>}
      <p className="mt-8 text-base"><Link to="/privacy" className="font-bold text-primary-700 underline dark:text-primary-300">{copy.privacy}</Link></p>
    </div>
  </div>;
}
