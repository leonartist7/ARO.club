'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from '../lib/navigation';
import { supabase } from '../lib/supabase';

export default function AccountDeletionPage() {
  const { user, loading: authLoading, isBackendConfigured } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

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
        if (readError) setError('We could not check your request. Please try again.');
        else setRequest(data);
        setLoading(false);
      });
    return () => { active = false; };
  }, [authLoading, user]);

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
      setError('Your request was not confirmed. Please check your connection and try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-bone px-4 py-12 text-ink dark:bg-surface-dark dark:text-bone">
      <div className="mx-auto max-w-2xl">
        <Link to="/app/settings" className="font-bold text-primary-700 underline focus-visible:outline focus-visible:outline-4 dark:text-primary-300">Back to settings</Link>
        <h1 className="mt-8 font-display text-3xl font-bold">Delete your ARO account</h1>
        <p className="mt-4 text-base leading-7">You can start account deletion here. We will review any bookings, teacher records, and information we must keep for legal or safety reasons before completing it. Submitting a request does not delete your account immediately.</p>
        <p className="mt-3 text-base leading-7">You can still sign in while the request is being processed. This page shows the status of your open request. We will not ask you to send a password or identity document here.</p>

        {!isBackendConfigured ? (
          <p className="mt-8 border border-ink/20 p-5" role="status">Account requests are unavailable in this preview.</p>
        ) : authLoading || loading ? (
          <p className="mt-8" role="status">Checking your account…</p>
        ) : !user ? (
          <div className="mt-8 border border-ink/20 p-5">
            <p>Sign in to confirm that this account belongs to you.</p>
            <Link to="/login?next=%2Faccount%2Fdelete" className="mt-4 inline-flex min-h-11 items-center font-bold text-primary-700 underline dark:text-primary-300">Sign in to request deletion</Link>
          </div>
        ) : request ? (
          <div className="mt-8 border border-primary-500 p-5" role="status" aria-live="polite">
            <h2 className="font-display text-xl font-bold">Your request is {request.status}</h2>
            <p className="mt-2">Submitted {new Date(request.requested_at).toLocaleDateString()}.</p>
          </div>
        ) : (
          <div className="mt-8 border border-ink/20 p-5">
            <label className="flex min-h-11 items-start gap-3 text-base leading-6">
              <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-5 w-5 accent-primary-700" />
              <span>I understand this starts a request to delete my ARO account and associated personal data, subject to any required retention.</span>
            </label>
            <button type="button" onClick={submit} disabled={!confirmed || pending} className="mt-5 min-h-11 rounded-lg bg-primary-700 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
              {pending ? 'Submitting…' : 'Request account deletion'}
            </button>
          </div>
        )}
        {error && <p role="alert" className="mt-5 text-red-700 dark:text-red-300">{error}</p>}
        <p className="mt-8 text-base"><Link to="/privacy" className="font-bold text-primary-700 underline dark:text-primary-300">Read the privacy policy</Link></p>
      </div>
    </main>
  );
}
