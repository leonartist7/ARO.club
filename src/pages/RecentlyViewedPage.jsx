import { Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ExperienceCard from '../components/features/ExperienceCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useToast } from '../hooks/useToast';
import experiencesData from '../data/experiences';

/**
 * RecentlyViewedPage - Full page view of recently viewed experiences
 * with timestamps and clear history option
 */
export default function RecentlyViewedPage() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { showToast } = useToast();

  // Get the actual experiences with timestamps
  const experiencesWithTimestamps = recentlyViewed
    .map((item) => {
      const experience = experiencesData.find((exp) => exp.id === item.experienceId);
      if (experience) {
        return {
          ...experience,
          viewedAt: item.viewedAt,
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your viewing history?')) {
      clearRecentlyViewed();
      showToast('Viewing history cleared', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                Recently Viewed
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {experiencesWithTimestamps.length}{' '}
                {experiencesWithTimestamps.length === 1 ? 'experience' : 'experiences'} in your
                history
              </p>
            </div>
          </div>
        </motion.div>

        {/* Clear History Button */}
        {experiencesWithTimestamps.length > 0 && (
          <div className="mb-6 flex justify-end">
            <Button
              variant="outline"
              onClick={handleClearHistory}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20"
            >
              Clear History
            </Button>
          </div>
        )}

        {/* Experiences Grid */}
        {experiencesWithTimestamps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiencesWithTimestamps.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative">
                  {/* Timestamp Badge */}
                  <div className="absolute -top-2 -right-2 z-10 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                    Viewed{' '}
                    {formatDistanceToNow(new Date(experience.viewedAt), {
                      addSuffix: true,
                    })}
                  </div>
                  <ExperienceCard experience={experience} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Eye className="w-16 h-16" />}
            title="No viewing history"
            description="Experiences you view will appear here so you can easily find them again"
            actionLabel="Start Exploring"
            actionLink="/explore"
          />
        )}
      </div>
    </div>
  );
}
