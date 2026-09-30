'use client';
import { Link } from '../lib/navigation';
import { ArrowDownRight, ArrowRight, ShieldCheck } from 'lucide-react';
import OpportunityFormation from '../features/opportunity-formation/OpportunityFormation';
import { useLanguage } from '../contexts/LanguageContext';
import { onboardingPreviewCopy } from '../i18n/onboardingPreview';
import { rebrandJourneyCopy } from '../i18n/rebrandJourney';
import { AroWordmark } from '../components/brand/AroMark';

export default function HomePage() {
  const { t, language } = useLanguage();
  const onboarding = onboardingPreviewCopy[language] ?? onboardingPreviewCopy.en;
  const journey = rebrandJourneyCopy[language] ?? rebrandJourneyCopy.en;

  return (
    <div className="min-h-screen overflow-hidden bg-bone text-ink dark:bg-gray-950 dark:text-bone">
      <section className="bg-brand-orange text-ink dark:bg-primary-800 dark:text-bone" aria-labelledby="aro-home-title">
        <div className="mx-auto grid max-w-[90rem] lg:min-h-[42rem] lg:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-4 pb-0 pt-7 sm:px-8 sm:pt-12 lg:px-12 lg:py-16 xl:px-16">
            <AroWordmark label="" className="mb-10 hidden h-auto w-64 text-bone lg:block xl:w-72" />
            <h1 id="aro-home-title" className="max-w-[11ch] font-display text-[3.05rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-bone sm:text-7xl lg:text-[clamp(4rem,5.8vw,6.3rem)]">{journey.promise}</h1>
            <p className="mt-4 max-w-[28rem] text-base font-semibold leading-7 sm:mt-7 sm:text-xl sm:leading-8">{journey.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-8">
              <Link to="/onboarding/preview" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bone px-6 font-extrabold text-ink transition-colors hover:bg-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange">{onboarding.start}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <a href="#how-it-works" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-bold text-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:text-bone">{t('home.formation.hero.cta')}<ArrowDownRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
            <p className="mt-3 max-w-[28rem] text-xs font-semibold leading-5 sm:mt-6 sm:text-sm">{journey.preview}</p>
          </div>
          <picture className="mt-5 block h-52 overflow-hidden bg-brand-yellow sm:mt-8 sm:h-96 lg:mt-0 lg:h-full">
            <source srcSet="/brand/onboarding-connect-640.webp 640w, /brand/onboarding-connect-1280.webp 1280w" sizes="(min-width: 1024px) 52vw, 100vw" type="image/webp" />
            <img src="/brand/onboarding-connect-640.webp" alt="" width="640" height="480" decoding="async" fetchPriority="high" className="h-full w-full object-cover object-[center_43%] lg:object-center" />
          </picture>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-bone text-ink dark:bg-plum dark:text-bone" aria-labelledby="formation-human-title">
        <div className="grid min-h-[34rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-full">
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 left-5 right-5 max-w-xl text-base leading-6 text-bone sm:bottom-8 sm:left-8">
              {t('home.formation.editorial.imageCaption')}
            </p>
          </div>

          <div className="flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-secondary-300">
                {t('home.formation.editorial.eyebrow')}
              </p>
              <h2 id="formation-human-title" className="mt-5 text-balance font-display text-4xl leading-[1.02] sm:text-5xl xl:text-6xl">
                {t('home.formation.editorial.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/70 dark:text-bone/70">
                {t('home.formation.editorial.body')}
              </p>
              <ol className="mt-9 space-y-5 border-t border-ink/15 dark:border-bone/15 pt-7">
                {['people', 'place', 'time'].map((key, index) => (
                  <li key={key} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="text-xs font-bold tracking-[0.15em] text-primary-700 dark:text-secondary-300">0{index + 1}</span>
                    <span className="text-base leading-7 text-ink/75 dark:text-bone/80">{t(`home.formation.editorial.points.${key}`)}</span>
                  </li>
                ))}
              </ol>
              <Link to="/onboarding/preview" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-action-primary px-6 font-bold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-plum">{onboarding.start}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-bone dark:border-bone/10 dark:bg-surface-dark" aria-label={journey.benefits}>
        <div className="mx-auto grid max-w-[90rem] sm:grid-cols-3">
          {[{ title: journey.find, body: journey.findHint, href: '/explore' }, { title: journey.teach, body: journey.teachHint, href: '/for-teachers' }, { title: journey.gather, body: journey.gatherHint, href: '/app/create?mode=gather' }].map((task, index) => <Link key={task.title} to={task.href} className="group flex min-h-28 items-center justify-between gap-4 border-b border-ink/10 px-4 py-5 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-control-focus dark:border-bone/10 dark:hover:bg-primary-900/20 sm:border-b-0 sm:border-r sm:px-7 lg:px-12"><span className="flex items-start gap-4"><span className="mt-1 text-sm font-extrabold text-primary-700 dark:text-primary-300">0{index + 1}</span><span><strong className="block text-lg font-extrabold">{task.title}</strong><span className="mt-1 block text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{task.body}</span></span></span><ArrowRight className="h-5 w-5 shrink-0 text-primary-700 transition-transform group-hover:translate-x-1 dark:text-primary-300" aria-hidden="true" /></Link>)}
        </div>
      </section>

      <section id="formation" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]"><p className="mb-4 rounded-xl border border-primary-600/25 bg-primary-50 px-4 py-3 text-sm font-semibold text-ink dark:border-primary-300/25 dark:bg-primary-900/20 dark:text-bone">{journey.formationPreview}</p><OpportunityFormation /></div>
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
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold text-ink transition-colors hover:bg-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
          >
            {t('home.formation.tonguee.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
