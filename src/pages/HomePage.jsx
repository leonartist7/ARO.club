import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, ShieldCheck } from 'lucide-react';
import OpportunityFormation from '../features/opportunity-formation/OpportunityFormation';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen overflow-hidden bg-bone text-ink dark:bg-gray-950 dark:text-bone">
      <section className="relative border-b border-ink/10 pb-14 pt-12 dark:border-bone/10 sm:pt-16 md:pb-20 lg:pt-20">
        <div className="aro-ambient-field absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-5xl">
              <p className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary-600/25 bg-primary-50/80 px-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-800 dark:border-primary-300/25 dark:bg-primary-900/20 dark:text-primary-200">
                <span className="h-2 w-2 rounded-full bg-primary-500" aria-hidden="true" />
                {t('home.formation.prototypeBadge')}
              </p>
              <h1 className="mt-7 max-w-5xl text-balance font-display text-5xl leading-[0.93] tracking-[-0.025em] text-ink dark:text-bone sm:text-6xl md:text-7xl lg:text-[5.75rem]">
                {t('home.formation.hero.title')}{' '}
                <span className="text-primary-600 dark:text-primary-400">{t('home.formation.hero.highlight')}</span>
              </h1>
            </div>
            <div className="border-l-2 border-secondary-400 pl-5 lg:mb-2 lg:pl-7">
              <p className="max-w-xl text-lg leading-8 text-ink/70 dark:text-bone/70 md:text-xl">
                {t('home.formation.hero.subtitle')}
              </p>
              <a
                href="#formation"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700 underline decoration-primary-300 decoration-2 underline-offset-4 transition-colors hover:text-primary-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:text-primary-300 dark:hover:text-primary-100 dark:focus-visible:ring-offset-gray-950"
              >
                {t('home.formation.hero.cta')}
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div id="formation" className="scroll-mt-24">
            <OpportunityFormation />
          </div>
        </div>
      </section>

      <section className="bg-ink text-bone dark:bg-plum" aria-labelledby="formation-human-title">
        <div className="grid min-h-[34rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[24rem] overflow-hidden lg:min-h-full">
            <picture>
              <source media="(max-width: 800px)" srcSet="/ux0/opportunity-table-800.webp" />
              <img
                src="/ux0/opportunity-table-1440.webp"
                width="1440"
                height="960"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                alt={t('home.formation.editorial.imageAlt')}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 left-5 right-5 max-w-xl text-sm leading-6 text-bone/80 sm:bottom-8 sm:left-8">
              {t('home.formation.editorial.imageCaption')}
            </p>
          </div>

          <div className="flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-300">
                {t('home.formation.editorial.eyebrow')}
              </p>
              <h2 id="formation-human-title" className="mt-5 text-balance font-display text-4xl leading-[1.02] sm:text-5xl xl:text-6xl">
                {t('home.formation.editorial.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-bone/68">
                {t('home.formation.editorial.body')}
              </p>
              <ol className="mt-9 space-y-5 border-t border-bone/15 pt-7">
                {['people', 'place', 'time'].map((key, index) => (
                  <li key={key} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="text-xs font-bold tracking-[0.15em] text-secondary-300">0{index + 1}</span>
                    <span className="text-base leading-7 text-bone/80">{t(`home.formation.editorial.points.${key}`)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white/50 py-14 dark:border-bone/10 dark:bg-gray-900/40 sm:py-20" aria-labelledby="prototype-truth-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
              {t('home.formation.truth.eyebrow')}
            </p>
            <h2 id="prototype-truth-title" className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              {t('home.formation.truth.title')}
            </h2>
          </div>
          <div className="grid gap-px bg-ink/15 dark:bg-bone/15 sm:grid-cols-3">
            {['confirmed', 'assumed', 'missing'].map((key) => (
              <article key={key} className="bg-bone p-6 dark:bg-gray-950 sm:p-7">
                <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-300">
                  {t(`home.formation.truth.${key}.title`)}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/68 dark:text-bone/68">
                  {t(`home.formation.truth.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="tonguee-path-title">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-moss dark:text-secondary-300">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">{t('home.formation.tonguee.eyebrow')}</p>
            </div>
            <h2 id="tonguee-path-title" className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              {t('home.formation.tonguee.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink/65 dark:text-bone/65">
              {t('home.formation.tonguee.body')}
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary-600 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
          >
            {t('home.formation.tonguee.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
