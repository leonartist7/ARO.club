import { Link } from 'react-router-dom';
import { Eye, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ExperienceCard from './features/ExperienceCard';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import experiencesData from '../data/experiences';

/**
 * RecentlyViewed - Horizontal scrollable carousel of recently viewed experiences
 * Shows on HomePage below featured experiences
 */
export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();

  // Only show if user has viewed at least 1 experience
  if (recentlyViewed.length === 0) {
    return null;
  }

  // Get the actual experiences from IDs
  const experiences = recentlyViewed
    .map((item) => experiencesData.find((exp) => exp.id === item.experienceId))
    .filter(Boolean)
    .slice(0, 6); // Show max 6 in carousel

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Eye className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
                Recently Viewed
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pick up where you left off
              </p>
            </div>
          </div>

          <Link
            to="/recently-viewed"
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scrollable Grid */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-6 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-80 sm:w-auto flex-shrink-0"
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
