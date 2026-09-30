'use client';
import { ArrowRight, Compass, Info } from 'lucide-react';
import { Link } from '../lib/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { publicUtilityCopy } from '../i18n/publicUtility';

export default function PublicUtilityState({ kind }) {
  const { language } = useLanguage();
  const copy = publicUtilityCopy[language] ?? publicUtilityCopy.en;
  const page = copy[kind] ?? copy.bookings;

  return <div lang={language} className="min-h-screen bg-surface-canvas text-ink dark:bg-surface-dark dark:text-bone">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-16 lg:py-24">
      <div>
        <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300"><Compass className="h-4 w-4" aria-hidden="true" />{copy.shared.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-content-secondary dark:text-content-darkSecondary">{page.body}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/explore" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-action-primary px-5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark">{copy.shared.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link to="/onboarding/preview" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary-600 px-5 font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:text-primary-300 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark">{copy.shared.secondary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <section className="mt-10 rounded-2xl border border-ink/10 bg-white/75 p-6 dark:border-bone/15 dark:bg-surface-darkCard" aria-labelledby="utility-state-title"><div className="flex items-start gap-3"><Info className="mt-1 h-5 w-5 shrink-0 text-primary-700 dark:text-primary-300" aria-hidden="true" /><div><h2 id="utility-state-title" className="font-display text-xl">{page.cardTitle}</h2><p className="mt-2 leading-7 text-content-secondary dark:text-content-darkSecondary">{page.cardBody}</p></div></div></section>
      </div>
      <div><picture className="block overflow-hidden rounded-[1.75rem] bg-brand-yellow shadow-[0_24px_70px_rgba(37,36,32,0.15)]"><source srcSet="/brand/onboarding-connect-640.webp 640w, /brand/onboarding-connect-1280.webp 1280w" sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" /><img src="/brand/onboarding-connect-640.webp" alt="" width="640" height="480" className="aspect-[4/3] w-full object-cover" /></picture><p className="mt-3 text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{copy.shared.note}</p></div>
    </div>
  </div>;
}
