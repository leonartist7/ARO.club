'use client';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../lib/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { publicStoryCopy } from '../i18n/publicStory';

const DRAFTS_KEY = 'conversa-contact-messages';

function readDrafts() {
  const value = localStorage.getItem(DRAFTS_KEY);
  if (!value) return [];
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('Contact drafts are not an array');
  if (!parsed.every((draft) => draft && !Array.isArray(draft) && typeof draft === 'object'
    && typeof draft.subject === 'string' && typeof draft.message === 'string'
    && (draft.savedAt === undefined || typeof draft.savedAt === 'string'))) {
    throw new Error('Contact draft entry is invalid');
  }
  return parsed;
}

export default function ContactDraftPage() {
  const { language } = useLanguage();
  const copy = (publicStoryCopy[language] ?? publicStoryCopy.en).contact;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [status, setStatus] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => { try { setDrafts(readDrafts()); } catch { setStorageAvailable(false); } }, []);

  const save = (event) => {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) { setStatus(copy.required); return; }
    try {
      const next = [...readDrafts(), { subject: subject.trim(), message: message.trim(), savedAt: new Date().toISOString() }];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
      setDrafts(next);
      setSubject('');
      setMessage('');
      setStatus(copy.saved);
    } catch {
      setStorageAvailable(false);
      setStatus(copy.storageError);
    }
  };

  return <div lang={language} className="min-h-screen bg-surface-canvas px-4 py-10 text-ink dark:bg-surface-dark dark:text-bone sm:px-6 sm:py-16">
    <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300">{copy.eyebrow}</p>
        <h1 className="mt-4 text-balance font-display text-4xl leading-tight sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-content-secondary dark:text-content-darkSecondary">{copy.body}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{copy.privacy}</p>
        <Link to="/faq" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.help}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        <picture className="mt-7 block overflow-hidden rounded-[1.5rem] bg-brand-yellow"><source srcSet="/brand/onboarding-connect-640.webp 640w, /brand/onboarding-connect-1280.webp 1280w" sizes="(min-width: 1024px) 45vw, 100vw" type="image/webp" /><img src="/brand/onboarding-connect-640.webp" alt="" width="640" height="480" className="aspect-[4/3] w-full object-cover" /></picture>
      </div>
      <div>
        <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-white/75 p-5 dark:border-bone/15 dark:bg-surface-darkCard sm:p-7">
          <label htmlFor="contact-subject" className="block font-bold">{copy.subject}</label>
          <input id="contact-subject" value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={120} className="mt-2 min-h-12 w-full rounded-xl border border-control-border bg-white px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:bg-surface-dark dark:text-bone" />
          <label htmlFor="contact-message" className="mt-5 block font-bold">{copy.message}</label>
          <textarea id="contact-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={4000} rows={7} className="mt-2 w-full rounded-xl border border-control-border bg-white px-4 py-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:bg-surface-dark dark:text-bone" />
          <button type="submit" disabled={!storageAvailable} className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-action-primary px-5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus disabled:opacity-50">{copy.save}</button>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold text-primary-700 dark:text-primary-300">{status || (!storageAvailable ? copy.storageError : '')}</p>
        </form>
        {drafts.length > 0 && <section className="mt-6 min-w-0 rounded-2xl border border-ink/10 p-5 dark:border-bone/15"><h2 className="font-display text-xl">{copy.oldDrafts} ({drafts.length})</h2><div className="mt-4 space-y-3">{drafts.map((draft, index) => <details key={`${draft.savedAt ?? 'draft'}-${index}`} className="min-w-0 rounded-xl border border-ink/10 p-3 dark:border-bone/15"><summary className="min-h-11 min-w-0 cursor-pointer font-semibold [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">{draft.subject || copy.subject}</summary><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{draft.message}</p></details>)}</div></section>}
      </div>
    </div>
  </div>;
}
