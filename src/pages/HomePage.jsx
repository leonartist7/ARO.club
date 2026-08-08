import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import ExperienceCard from '../components/features/ExperienceCard';
import EmptyState from '../components/ui/EmptyState';
import experiencesData from '../data/experiences.json';
import { useLanguage } from '../contexts/LanguageContext';

const featuredExperiences = experiencesData.filter((exp) => exp.featured).slice(0, 6);

/**
 * Home — clear hero with Coco branding video + next steps (The Loop).
 */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore');
  };

  const loopSteps = [
    { title: t('home.loop.learn.title'), description: t('home.loop.learn.description'), step: '01' },
    { title: t('home.loop.live.title'), description: t('home.loop.live.description'), step: '02' },
    { title: t('home.loop.belong.title'), description: t('home.loop.belong.description'), step: '03' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-5">
                <ShieldCheck className="w-4 h-4 text-primary-600" aria-hidden="true" />
                {t('home.trustStrip')}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                {t('home.hero.title')}{' '}
                <span className="gradient-text">{t('home.hero.titleHighlight')}</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                {t('home.hero.subtitle')}
              </p>

              <form onSubmit={handleSearch} className="mb-5 max-w-xl">
                <label htmlFor="home-search" className="sr-only">
                  {t('home.hero.searchPlaceholder')}
                </label>
                <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 dark:bg-gray-900 rounded-xl p-2 border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-1 items-center gap-2 px-3 min-h-12">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
                    <input
                      id="home-search"
                      type="search"
                      placeholder={t('home.hero.searchPlaceholder')}
                      className="flex-1 outline-none text-base text-gray-900 dark:text-white bg-transparent placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto shrink-0">
                    {t('home.hero.browseButton')}
                  </Button>
                </div>
              </form>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                <Link
                  to="/for-teachers"
                  className="underline hover:text-primary-700 dark:hover:text-primary-300"
                >
                  {t('home.hero.teachButton')}
                </Link>
              </p>
            </div>

            {/* Branding video — Coco color-shifts yellow → orange */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-primary-100 dark:border-primary-900/40 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-950 aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/brand/coco-hero-still.jpg"
                  aria-label="Coco the Chameleon — Tonguee brand mascot"
                >
                  <source src="/brand/coco-hero.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Meet Coco — our color-shifting guide to living the language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's next / The Loop */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center mb-12">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300 mb-2">
                What&apos;s next
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
                {t('home.loop.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('home.loop.subtitle')}
              </p>
              <Link to="/explore">
                <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('home.hero.browseButton')}
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md aspect-[16/10] bg-white dark:bg-gray-950">
              <img
                src="/brand/coco-hero-still.jpg"
                alt="Coco the Chameleon, Tonguee mascot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loopSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-gray-900 text-sm font-bold mb-4">
                  {step.step}
                </span>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                {t('home.featured')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{t('home.featuredSubtitle')}</p>
            </div>
            <Link to="/explore">
              <Button variant="outline">{t('home.seeAll')} →</Button>
            </Link>
          </div>

          {featuredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* For teachers */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-t border-primary-100 dark:border-primary-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
            {t('home.forTeachers.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('home.forTeachers.description')}</p>
          <Link to="/for-teachers">
            <Button variant="primary" size="lg">{t('home.forTeachers.cta')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
