'use client';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { legacyFixtureCopy } from '../../i18n/legacyFixture';

export default function LegacyFixtureState({ kind = 'experience' }) {
  const { language } = useLanguage();
  const copy = legacyFixtureCopy[language] ?? legacyFixtureCopy.en;
  const isMap = kind === 'map';
  const isMissing = kind === 'missing';

  return <div lang={language} className="min-h-[70vh] bg-surface-canvas px-4 py-10 text-ink dark:bg-surface-dark dark:text-bone sm:px-6 sm:py-16">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300">{copy.eyebrow}</p>
        <h1 className="mt-4 text-balance font-display text-4xl leading-tight sm:text-5xl">{copy.titles[kind] ?? copy.titles.experience}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-content-secondary dark:text-content-darkSecondary sm:text-lg">{isMissing ? copy.missingBody : isMap ? copy.mapBody : copy.body}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/onboarding/preview" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-action-primary px-5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark">{copy.start}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to={isMissing ? '/' : '/explore'} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary-600 px-5 font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:text-primary-300 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark">{isMissing ? copy.home : copy.browse}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        {!isMissing && <Link to="/app/create" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:text-primary-300 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark">{copy.host}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
      </div>
      <picture className="block overflow-hidden rounded-[1.75rem] bg-brand-yellow shadow-[0_24px_70px_rgba(37,36,32,0.15)]"><source srcSet="/brand/onboarding-connect-640.webp 640w, /brand/onboarding-connect-1280.webp 1280w" sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" /><img src="/brand/onboarding-connect-640.webp" alt="" width="640" height="480" className="aspect-[4/3] w-full object-cover" /></picture>
    </div>
  </div>;
}
