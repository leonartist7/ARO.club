import { Link } from 'react-router-dom';
import { Search, Sparkles, Zap, Target, Flame, Award, Globe, Users, Heart, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import ExperienceCard from '../components/features/ExperienceCard';
import RecentlyViewed from '../components/RecentlyViewed';
import { motion } from 'framer-motion';
import experiencesData from '../data/experiences.json';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const featuredExperiences = experiencesData.filter((exp) => exp.featured).slice(0, 6);

/**
 * HomePage component - Duolingo-inspired premium design
 */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const stats = [
    { number: '50,000+', label: t('home.stats.experiences'), icon: Globe, color: 'text-primary-500' },
    { number: '10,000+', label: t('home.stats.learners'), icon: Users, color: 'text-secondary-500' },
    { number: '500+', label: t('home.stats.teachers'), icon: Award, color: 'text-accent-500' },
    { number: '50+', label: t('home.stats.cities'), icon: Heart, color: 'text-primary-600' },
  ];

  const howItWorks = [
    {
      icon: Search,
      emoji: '🔍',
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
      color: 'from-primary-400 to-primary-500',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      icon: Target,
      emoji: '🎯',
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
      color: 'from-secondary-400 to-secondary-500',
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
      color: 'from-accent-400 to-accent-500',
      iconBg: 'bg-accent-100 dark:bg-accent-900/30',
      iconColor: 'text-accent-600 dark:text-accent-400',
    },
    {
      icon: Flame,
      emoji: '🔥',
      title: t('home.howItWorks.step4.title'),
      description: t('home.howItWorks.step4.description'),
      color: 'from-primary-500 to-secondary-500',
      iconBg: 'bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
  ];

  const languages = [
    { flag: '🇫🇷', name: t('languages.french'), color: 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50' },
    { flag: '🇪🇸', name: t('languages.spanish'), color: 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50' },
    { flag: '🇯🇵', name: t('languages.japanese'), color: 'bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50' },
    { flag: '🇰🇷', name: t('languages.korean'), color: 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50' },
    { flag: '🇮🇹', name: t('languages.italian'), color: 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50' },
    { flag: '🇩🇪', name: t('languages.german'), color: 'bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' },
    { flag: '🇵🇹', name: t('languages.portuguese'), color: 'bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50' },
    { flag: '🇨🇳', name: t('languages.mandarin'), color: 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/explore?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section - Duolingo Style */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/40 dark:bg-primary-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-secondary-400/40 dark:bg-secondary-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-accent-400/30 dark:bg-accent-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Fun badge above title */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-4 py-2 rounded-full shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-6"
            >
              <Sparkles className="w-5 h-5 text-primary-500 animate-pulse-soft" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Join 10,000+ happy learners!</span>
              <Flame className="w-5 h-5 text-secondary-500 animate-bounce-gentle" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-700 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">{t('home.hero.titleHighlight')}</span>
            </h1>

            <p className="text-lg md:text-2xl mb-10 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>

            {/* Premium Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-4 border-primary-300/70 dark:border-primary-900/60 hover:border-primary-500 dark:hover:border-primary-700 transition-all duration-300"
              >
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-6 h-6 text-primary-500" />
                  <input
                    type="text"
                    placeholder={t('explore.search')}
                    className="flex-1 py-4 outline-none text-gray-900 dark:text-white dark:bg-gray-800 placeholder:text-gray-400 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-700 hover:from-primary-600 hover:via-secondary-600 hover:to-secondary-800 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('home.hero.browseButton')}
                </Button>
              </motion.div>
            </form>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/explore">
                <Button
                  variant="outline"
                  className="border-2 border-primary-400 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-2xl px-6 py-3 font-semibold"
                >
                  🎯 {t('home.hero.browseButton')}
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-2xl px-6 py-3 font-semibold"
                >
                  {t('home.hero.howItWorksButton')} →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Playful Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/80 via-white/70 to-white/80 dark:from-gray-800/80 dark:to-gray-800/70 backdrop-blur-lg rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50"
              >
                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color} animate-bounce-gentle`} />
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-secondary-800 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Languages - Pill Style */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-3">
              <Globe className="w-10 h-10 text-primary-500 animate-wiggle" />
              {t('home.languages')}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/explore?language=${lang.name.toLowerCase()}`}
                  className={`inline-flex items-center gap-3 ${lang.color} px-6 py-3 rounded-full font-semibold text-gray-800 dark:text-white shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary-400 dark:hover:border-primary-600`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="text-lg">{lang.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Premium Cards */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 dark:border-gray-700 h-full">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-secondary-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon with emoji */}
                  <div className={`${step.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl animate-bounce-gentle">{step.emoji}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line (except last item) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500 dark:from-primary-700 dark:to-secondary-700"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 inline-flex items-center gap-3">
              <Award className="w-10 h-10 text-primary-500 animate-wiggle" />
              {t('home.featured')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.featuredSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/explore">
              <Button className="bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-700 hover:from-primary-600 hover:via-secondary-600 hover:to-secondary-800 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                <TrendingUp className="w-6 h-6 mr-2" />
                {t('common.viewAll')} →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RecentlyViewed />
        </div>
      </section>

      {/* CTA Section - Premium Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2">
                <Flame className="w-16 h-16 text-white animate-bounce-gentle" />
                <Heart className="w-12 h-12 text-white/90 animate-pulse-soft" />
                <Sparkles className="w-10 h-10 text-white/80 animate-wiggle" />
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button className="bg-white text-secondary-700 hover:bg-gray-50 font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Sparkles className="w-6 h-6 mr-2" />
                  {t('home.cta.browseButton')}
                </Button>
              </Link>
              <Link to="/for-teachers">
                <Button className="bg-transparent border-3 border-white text-white hover:bg-white/10 font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm">
                  <Award className="w-6 h-6 mr-2" />
                  {t('home.cta.teachButton')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
