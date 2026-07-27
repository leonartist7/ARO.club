import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, MapPin, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import experiencesData from '../data/experiences';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get 3 featured experiences (highest rated)
  const featuredExperiences = experiencesData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <div className="text-9xl font-bold text-primary-500 mb-4">404</div>
            <div className="flex items-center justify-center gap-2 text-6xl mb-6">
              <span>🗺️</span>
              <span>❓</span>
              <span>🧭</span>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Oops! You're Lost
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like this page doesn't exist. But don't worry—your language learning
              adventure is just a search away!
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                />
              </div>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/">
              <Button variant="primary" size="lg" icon={<Home className="w-5 h-5" />}>
                Back to Home
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" icon={<MapPin className="w-5 h-5" />}>
                Browse Experiences
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowLeft className="w-5 h-5" />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardBody>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h3>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <Link to="/explore" className="text-primary-600 hover:text-primary-700 hover:underline">
                    Explore Experiences
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/leaderboard" className="text-primary-600 hover:text-primary-700 hover:underline">
                    Leaderboard
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/how-it-works" className="text-primary-600 hover:text-primary-700 hover:underline">
                    How It Works
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/for-teachers" className="text-primary-600 hover:text-primary-700 hover:underline">
                    Become a Teacher
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/contact" className="text-primary-600 hover:text-primary-700 hover:underline">
                    Contact Us
                  </Link>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Featured Experiences */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white border-t border-gray-200 py-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Featured Experiences
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
