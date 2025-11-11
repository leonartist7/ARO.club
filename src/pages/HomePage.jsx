import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, Globe, Trophy, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import ExperienceCard from '../components/features/ExperienceCard';
import { motion } from 'framer-motion';
import experiencesData from '../data/experiences.json';
import { useState } from 'react';

const featuredExperiences = experiencesData.filter((exp) => exp.featured).slice(0, 6);

const stats = [
  { number: '50,000+', label: 'Experiences Booked' },
  { number: '10,000+', label: 'Happy Learners' },
  { number: '500+', label: 'Expert Teachers' },
  { number: '50+', label: 'Cities Worldwide' },
];

const howItWorks = [
  {
    icon: Search,
    title: 'Browse Experiences',
    description: 'Discover unique language learning experiences in cities around the world.',
  },
  {
    icon: Calendar,
    title: 'Book Your Spot',
    description: 'Reserve your place in small groups (4-6 people) for authentic interactions.',
  },
  {
    icon: Users,
    title: 'Learn & Connect',
    description: 'Practice with locals in real-world settings like cafés, markets, and tours.',
  },
  {
    icon: Trophy,
    title: 'Earn Points & Badges',
    description: 'Level up your language skills and collect achievements as you learn.',
  },
];

const languages = [
  { flag: '🇫🇷', name: 'French' },
  { flag: '🇪🇸', name: 'Spanish' },
  { flag: '🇯🇵', name: 'Japanese' },
  { flag: '🇰🇷', name: 'Korean' },
  { flag: '🇮🇹', name: 'Italian' },
  { flag: '🇩🇪', name: 'German' },
  { flag: '🇵🇹', name: 'Portuguese' },
  { flag: '🇨🇳', name: 'Mandarin' },
];

/**
 * HomePage component
 */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/explore?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Learn Languages
              <br />
              Through Real Experiences
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Join small group sessions with local teachers in cafés, markets, and cultural
              spots. Make friends, earn points, and actually speak the language.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by language, city, or activity..."
                    className="flex-1 py-3 outline-none text-gray-900 placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="whitespace-nowrap">
                  Explore Experiences
                </Button>
              </div>
            </form>

            {/* Quick Language Links */}
            <div className="flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <Link
                  key={lang.name}
                  to={`/explore?language=${lang.name.toLowerCase()}`}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  {lang.flag} {lang.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Featured Experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked experiences from our most-loved teachers around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/explore">
              <Button variant="primary" size="lg">
                View All Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four simple steps to start your language learning adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of language learners connecting with locals and making real progress
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button variant="secondary" size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
                Browse Experiences
              </Button>
            </Link>
            <Link to="/for-teachers">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
