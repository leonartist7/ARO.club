import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Search, ShieldCheck, Sparkles } from 'lucide-react';
import AroMark from '../components/brand/AroMark';
import ExperienceCard from '../components/features/ExperienceCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import experiencesData from '../data/experiences.json';

const featuredExperiences = experiencesData.filter((experience) => experience.featured).slice(0, 6);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore');
  };

  const loopSteps = [
    { title: t('home.loop.learn.title'), description: t('home.loop.learn.description'), step: '01' },
    { title: t('home.loop.live.title'), description: t('home.loop.live.description'), step: '02' },
    { title: t('home.loop.belong.title'), description: t('home.loop.belong.description'), step: '03' },
  ];

  const fieldSignals = [
    { label: t('home.field.want'), className: 'left-[3%] top-[15%] bg-bone dark:bg-gray-900' },
    { label: t('home.field.bring'), className: 'right-[1%] top-[27%] bg-primary-50 dark:bg-gray-900' },
    { label: t('home.field.context'), className: 'bottom-[10%] left-[10%] bg-secondary-50 dark:bg-gray-900' },
  ];

  return (
    <div className="min-h-screen bg-bone text-ink dark:bg-gray-950 dark:text-bone">
      <section className="relative overflow-hidden border-b border-ink/10 dark:border-bone/10">
        <div className="aro-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-300/20 blur-3xl" aria-hidden="true" />
        <div className="relative container mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-bone/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/70 backdrop-blur dark:border-bone/15 dark:bg-gray-950/80 dark:text-bone/70">
              <Sparkles className="h-4 w-4 text-primary-500" aria-hidden="true" />
              {t('home.platformEyebrow')}
            </p>

            <h1 className="max-w-3xl text-balance font-display text-5xl leading-[0.98] text-ink dark:text-bone sm:text-6xl md:text-7xl">
              {t('home.hero.title')}{' '}
              <span className="text-primary-600 dark:text-primary-400">{t('home.hero.titleHighlight')}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/68 dark:text-bone/70 md:text-xl">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/explore">
                <Button size="lg" variant="primary" className="w-full sm:w-auto" icon={<ArrowRight className="h-4 w-4" />}>
                  {t('home.hero.browseButton')}
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full border-ink/20 sm:w-auto dark:border-bone/20">
                  {t('home.hero.teachButton')}
                </Button>
              </Link>
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm font-medium text-ink/60 dark:text-bone/60">
              <ShieldCheck className="h-4 w-4 text-moss" aria-hidden="true" />
              {t('home.trustStrip')}
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-label={t('home.field.label')}>
            <div className="absolute inset-[7%] rounded-full border border-ink/10 dark:border-bone/10" aria-hidden="true" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-primary-500/40" aria-hidden="true" />
            <div className="absolute inset-[34%] rounded-full border border-ink/15 dark:border-bone/15" aria-hidden="true" />
            <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full aro-orbit-motion" aria-hidden="true">
              <span className="absolute left-1/2 top-[4%] h-4 w-4 -translate-x-1/2 rounded-full bg-primary-500 shadow-[0_0_0_8px_rgba(222,67,37,0.12)]" />
              <span className="absolute bottom-[17%] right-[8%] h-3 w-3 rounded-full bg-secondary-400" />
            </div>

            <div className="absolute inset-[36%] flex flex-col items-center justify-center rounded-full bg-ink text-bone shadow-2xl dark:bg-bone dark:text-ink">
              <AroMark size="lg" className="bg-bone text-ink shadow-none dark:bg-ink dark:text-bone" />
              <span className="mt-3 text-sm font-bold tracking-[0.24em]">ARO</span>
            </div>

            {fieldSignals.map((signal) => (
              <div
                key={signal.label}
                className={`absolute rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink shadow-lg dark:border-bone/10 dark:text-bone ${signal.className}`}
              >
                {signal.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white/55 py-16 dark:border-bone/10 dark:bg-gray-900/60 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
                {t('home.tonguee.eyebrow')}
              </p>
              <h2 className="font-display text-4xl leading-tight text-ink dark:text-bone md:text-5xl">
                {t('home.tonguee.title')}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink/65 dark:text-bone/65">
                {t('home.tonguee.description')}
              </p>
              <form onSubmit={handleSearch} className="mt-7 max-w-xl">
                <label htmlFor="home-search" className="sr-only">{t('home.hero.searchPlaceholder')}</label>
                <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-bone p-2 dark:border-bone/10 dark:bg-gray-950 sm:flex-row">
                  <div className="flex min-h-12 flex-1 items-center gap-2 px-3">
                    <Search className="h-5 w-5 shrink-0 text-ink/40 dark:text-bone/40" aria-hidden="true" />
                    <input
                      id="home-search"
                      type="search"
                      placeholder={t('home.hero.searchPlaceholder')}
                      className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink/40 dark:text-bone dark:placeholder:text-bone/40"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full sm:w-auto">
                    {t('home.hero.browseButton')}
                  </Button>
                </div>
              </form>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink p-8 text-bone shadow-xl dark:border-bone/10 md:p-12">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-bone/15" aria-hidden="true" />
              <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full border border-primary-400/55" aria-hidden="true" />
              <Compass className="h-9 w-9 text-secondary-300" aria-hidden="true" />
              <p className="mt-10 max-w-lg font-display text-3xl leading-tight md:text-4xl">
                “{t('home.tonguee.promise')}”
              </p>
              <p className="mt-5 max-w-lg text-bone/65">
                {t('home.tonguee.honesty')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
              {t('home.tonguee.loopEyebrow')}
            </p>
            <h2 className="font-display text-4xl text-ink dark:text-bone md:text-5xl">{t('home.loop.title')}</h2>
            <p className="mt-4 text-lg text-ink/60 dark:text-bone/60">{t('home.loop.subtitle')}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 dark:border-bone/10 dark:bg-bone/10 md:grid-cols-3">
            {loopSteps.map((step) => (
              <article key={step.step} className="bg-bone p-7 dark:bg-gray-950 md:p-9">
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{step.step}</span>
                <h3 className="mt-8 font-display text-3xl text-ink dark:text-bone">{step.title}</h3>
                <p className="mt-4 leading-7 text-ink/62 dark:text-bone/62">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/55 py-16 dark:border-bone/10 dark:bg-gray-900/60 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">Tonguee</p>
              <h2 className="font-display text-4xl text-ink dark:text-bone">{t('home.featured')}</h2>
              <p className="mt-3 max-w-2xl text-ink/62 dark:text-bone/62">{t('home.featuredSubtitle')}</p>
            </div>
            <Link to="/explore">
              <Button variant="outline">{t('home.seeAll')} →</Button>
            </Link>
          </div>

          {featuredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <EmptyState
              pose="think"
              title={t('home.featured')}
              description={t('home.featuredEmpty')}
              action={{ label: t('home.seeAll'), href: '/explore' }}
            />
          )}
        </div>
      </section>

      <section className="bg-primary-600 py-16 text-white">
        <div className="container mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl">{t('home.forTeachers.title')}</h2>
            <p className="mt-4 text-lg text-white/75">{t('home.forTeachers.description')}</p>
          </div>
          <Link to="/for-teachers" className="shrink-0">
            <Button size="lg" className="bg-bone text-ink hover:bg-white">
              {t('home.forTeachers.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
