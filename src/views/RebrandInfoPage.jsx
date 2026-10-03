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

  return <div lang={language} className="min-h-screen bg-surface-canvas text-ink dark:bg-surface-dark dark:text-bone">
    <section className="mx-auto grid max-w-7xl gap-9 px-4 pb-12 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:py-20">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300">{page.eyebrow} · {copy.shared.benefits}</p>
        <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-content-secondary dark:text-content-darkSecondary">{page.body}</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link to="/onboarding/preview" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-action-primary px-5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">{copy.shared.start}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link to={kind === 'host' ? '/teacher/application' : '/explore'} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary-600 px-5 font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{kind === 'host' ? page.application : copy.shared.discover}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <p className="mt-5 text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{copy.shared.preview}</p>
      </div>
      <picture className="block overflow-hidden rounded-[1.75rem] bg-brand-yellow shadow-[0_24px_70px_rgba(37,36,32,0.15)]"><source srcSet={`/brand/onboarding-${art}-640.webp 640w, /brand/onboarding-${art}-1280.webp 1280w`} sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" /><img src={`/brand/onboarding-${art}-640.webp`} alt="" width="640" height="480" className="aspect-[4/3] w-full object-cover" /></picture>
    </section>

    <section className="border-y border-ink/10 bg-white/55 px-4 py-12 dark:border-bone/10 dark:bg-surface-darkCard/50 sm:px-6 sm:py-16" aria-label={page.eyebrow}>
      <div className={`mx-auto grid max-w-7xl gap-4 ${kind === 'faq' ? 'lg:grid-cols-2' : 'md:grid-cols-3'}`}>
        {page.cards.map(([title, body], index) => kind === 'faq' ? <details key={title} className="group self-start rounded-2xl border border-ink/10 bg-surface-canvas p-5 dark:border-bone/15 dark:bg-surface-dark"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">{title}<ChevronDown className="h-5 w-5 shrink-0 text-primary-700 transition-transform group-open:rotate-180 dark:text-primary-300" aria-hidden="true" /></summary><p className="mt-3 text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{body}</p>{index === 1 && <Link to="/for-teachers" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.hostGuidance}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}{index === 2 && <Link to="/privacy" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.privacy}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}</details> : <article key={title} className="rounded-2xl border border-ink/10 bg-surface-canvas p-6 dark:border-bone/15 dark:bg-surface-dark"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-sm font-extrabold text-ink">0{index + 1}</span><h2 className="mt-5 font-display text-2xl leading-tight">{title}</h2><p className="mt-3 text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{body}</p></article>)}
      </div>
    </section>

    <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between"><p className="max-w-3xl text-lg leading-8 text-content-secondary dark:text-content-darkSecondary">{page.note}</p><Link to="/contact" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{copy.shared.contact}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
  </div>;
}
