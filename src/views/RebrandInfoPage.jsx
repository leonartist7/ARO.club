'use client';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from '../lib/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { publicStoryCopy } from '../i18n/publicStory';

const artFor = { about: 'connect', how: 'learn', host: 'teach-language-v2', faq: 'connect' };

export default function RebrandInfoPage({ kind }) {
  const { language } = useLanguage();
  const copy = publicStoryCopy[language] ?? publicStoryCopy.en;
  const page = copy[kind] ?? copy.about;
  const art = artFor[kind] ?? artFor.about;

  return <div lang={language} className="min-h-screen bg-bone text-ink dark:bg-surface-dark dark:text-bone">
    <section className="bg-brand-orange text-ink dark:bg-primary-800 dark:text-bone">
      <div className="mx-auto grid max-w-[90rem] lg:min-h-[35rem] lg:grid-cols-[52%_48%]">
        <div className="flex flex-col justify-center px-4 pb-0 pt-9 sm:px-8 sm:pt-14 lg:px-12 lg:py-16 xl:px-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.1em]">{page.eyebrow} · {copy.shared.benefits}</p>
          <h1 className="mt-6 max-w-[13ch] text-balance font-display text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-bone sm:text-6xl lg:text-[clamp(3.5rem,4.8vw,5.5rem)]">{page.title}</h1>
          <p className="mt-5 hidden max-w-[35rem] text-base font-semibold leading-7 sm:mt-7 sm:text-lg sm:leading-8 lg:block">{page.body}</p>
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
            <Link to="/onboarding/preview" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bone px-6 font-extrabold text-ink transition-colors hover:bg-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange">{copy.shared.start}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to={kind === 'host' ? '/teacher/application' : '/explore'} className="hidden min-h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-bold text-ink transition-colors hover:bg-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:border-bone dark:text-bone lg:inline-flex">{kind === 'host' ? page.application : copy.shared.discover}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="mt-4 hidden max-w-[34rem] text-sm font-semibold leading-6 lg:block">{copy.shared.preview}</p>
        </div>
        <picture className="mt-7 block h-56 overflow-hidden bg-brand-yellow sm:mt-10 sm:h-96 lg:mt-0 lg:h-full">
          <source srcSet={`/brand/onboarding-${art}-640.webp 640w, /brand/onboarding-${art}-1280.webp 1280w`} sizes="(min-width: 1024px) 48vw, 100vw" type="image/webp" />
          <img src={`/brand/onboarding-${art}-640.webp`} alt="" width="640" height="480" decoding="async" className="h-full w-full object-cover object-[center_43%]" />
        </picture>
        <div className="px-4 pb-8 pt-6 sm:px-8 lg:hidden">
          <p className="max-w-[35rem] text-base font-semibold leading-7">{page.body}</p>
          <Link to={kind === 'host' ? '/teacher/application' : '/explore'} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:border-bone dark:text-bone">{kind === 'host' ? page.application : copy.shared.discover}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <p className="mt-4 max-w-[34rem] text-sm font-semibold leading-6">{copy.shared.preview}</p>
        </div>
      </div>
    </section>

    <section className="px-4 py-14 sm:px-8 sm:py-20" aria-label={page.eyebrow}>
      <div className="mx-auto max-w-6xl border-t-2 border-ink dark:border-bone">
        {page.cards.map(([title, body], index) => kind === 'faq' ?
          <details key={title} className="group border-b border-ink/20 py-4 dark:border-bone/20">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 rounded-lg text-left text-lg font-bold leading-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus sm:text-xl">{title}<ChevronDown className="h-5 w-5 shrink-0 text-primary-700 transition-transform group-open:rotate-180 dark:text-primary-300" aria-hidden="true" /></summary>
            <p className="max-w-3xl pb-4 pr-7 pt-2 text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{body}</p>
            {index === 1 && <Link to="/for-teachers" className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.hostGuidance}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            {index === 2 && <Link to="/privacy" className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.privacy}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          </details> :
          <article key={title} className="grid gap-2 border-b border-ink/20 py-7 dark:border-bone/20 sm:grid-cols-[3rem_minmax(12rem,0.75fr)_minmax(0,1fr)] sm:gap-7 sm:py-10">
            <span className="text-sm font-extrabold text-primary-700 dark:text-primary-300">0{index + 1}</span>
            <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h2>
            <p className="max-w-xl text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{body}</p>
          </article>)}
      </div>
    </section>

    <section className="border-t border-ink/10 bg-primary-50 px-4 py-12 dark:border-bone/10 dark:bg-surface-darkCard sm:px-8 sm:py-16"><div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><p className="max-w-3xl text-lg leading-8">{page.note}</p><Link to="/contact" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.contact}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
  </div>;
}
