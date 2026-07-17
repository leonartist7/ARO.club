import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Gamepad2, Coffee, Users, ShieldCheck, Globe, Award, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Button from '../components/ui/Button';
import ExperienceCard from '../components/features/ExperienceCard';
import EmptyState from '../components/ui/EmptyState';
import CocoMascot from '../components/ui/CocoMascot';
import RecentlyViewed from '../components/RecentlyViewed';
import experiencesData from '../data/experiences.json';
import { useLanguage } from '../contexts/LanguageContext';

const featuredExperiences = experiencesData.filter((exp) => exp.featured).slice(0, 6);

/** HomePage ? DESIGN_SYSTEM section 8.1 */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const stats = [
    { number: '50,000+', label: t('home.stats.experiences'), icon: Globe },
    { number: '10,000+', label: t('home.stats.learners'), icon: Users },
    { number: '500+', label: t('home.stats.teachers'), icon: Award },
    { number: '50+', label: t('home.stats.cities'), icon: Heart },
  ];

  const loop = [
    {
      key: 'learn',
      icon: Gamepad2,
      title: t('home.loop.learn.title'),
      description: t('home.loop.learn.description'),
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-700 dark:text-primary-300',
    },
    {
      key: 'live',
      icon: Coffee,
      title: t('home.loop.live.title'),
      description: t('home.loop.live.description'),
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-700 dark:text-secondary-300',
    },
    {
      key: 'belong',
      icon: Users,
      title: t('home.loop.belong.title'),
      description: t('home.loop.belong.description'),
      iconBg: 'bg-accent-100 dark:bg-accent-900/30',
      iconColor: 'text-accent-700 dark:text-accent-500',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore');
  };

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight text-gray-900 dark:text-gray-50 mb-4">
                {t('home.hero.title')}
                <br />
                <span className="gradient-text">{t('home.hero.titleHighlight')}</span>
              </h1>
              <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link to="/explore">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    {t('home.hero.browseButton')}
                  </Button>
                </Link>
                <Link to="/for-teachers">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {t('home.hero.teachButton')}
                  </Button>
                </Link>
              </div>

              <form onSubmit={handleSearch} className="max-w-md">
                <label htmlFor="home-search" className="sr-only">
                  {t('home.hero.searchPlaceholder')}
                </label>
                <div className="flex gap-2 bg-white dark:bg-gray-900 rounded-xl p-2 shadow-md border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-1 items-center gap-2 px-3 min-h-11">
                    <Search className="w-5 h-5 text-primary-600 shrink-0" aria-hidden="true" />
                    <input
                      id="home-search"
                      type="search"
                      placeholder={t('home.hero.searchPlaceholder')}
                      className="flex-1 outline-none text-base text-gray-900 dark:text-gray-50 bg-transparent placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md">
                    <Search className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only sm:not-sr-only">{t('home.hero.browseButton')}</span>
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              {...(reduceMotion
                ? {}
                : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: 0.1 } })}
              className="relative flex flex-col items-center"
            >
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="rounded-3xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800 p-5 shadow-md flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-3">
                    <Gamepad2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <p className="font-display font-bold text-gray-900 dark:text-gray-50">{t('home.hero.learnCard')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('home.hero.learnCardDesc')}</p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 relative">
                  <img
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600"
                    alt=""
                    className="w-full h-full object-cover min-h-[160px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <p className="font-display font-bold text-white">{t('home.hero.liveCard')}</p>
                      <p className="text-sm text-white/90">{t('home.hero.liveCardDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                <CocoMascot pose="wave" size="lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 text-secondary-700 dark:text-secondary-300 font-semibold text-base">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              {t('home.trustStrip')}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  <div className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50">{stat.number}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
              {t('home.loop.title')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">{t('home.loop.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loop.map((step) => (
              <div
                key={step.key}
                className="bg-white dark:bg-gray-950 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-800 h-full"
              >
                <div className={`${step.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">{step.title}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t('home.featured')}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">{t('home.featuredSubtitle')}</p>
            </div>
            <Link to="/explore">
              <Button variant="secondary" size="md">
                {t('home.seeAll')} ?
              </Button>
            </Link>
          </div>

          {featuredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
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

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RecentlyViewed />
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
          <Sparkles className="w-10 h-10 text-white/90 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t('home.forTeachers.title')}
          </h2>
          <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto">
            {t('home.forTeachers.description')}
          </p>
          <Link to="/for-teachers">
            <Button
              variant="glass"
              size="lg"
              className="bg-white text-primary-700 hover:bg-gray-50 font-semibold border-0"
            >
              {t('home.forTeachers.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
