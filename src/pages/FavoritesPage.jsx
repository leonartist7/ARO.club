import { useState, useMemo } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ExperienceCard from '../components/features/ExperienceCard';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import EmptyState from '../components/ui/EmptyState';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import experiencesData from '../data/experiences';

/**
 * FavoritesPage - Display all favorited experiences
 * with sorting and clearing options
 */
export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState('recent');

  // Get favorited experiences
  const favoritedExperiences = useMemo(() => {
    return experiencesData.filter((exp) => favorites.includes(exp.id));
  }, [favorites]);

  // Sort favorited experiences
  const sortedExperiences = useMemo(() => {
    const sorted = [...favoritedExperiences];

    switch (sortBy) {
      case 'recent':
        // Most recently added first
        return sorted.reverse();
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return sorted;
    }
  }, [favoritedExperiences, sortBy]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
      showToast('All favorites cleared', 'info');
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
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                My Favorites
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {favorites.length} {favorites.length === 1 ? 'experience' : 'experiences'} saved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        {favorites.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'recent', label: 'Recently Added' },
                { value: 'date', label: 'Experience Date' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'name', label: 'Name (A-Z)' },
              ]}
              className="w-full sm:w-64"
            />

            <Button
              variant="outline"
              onClick={handleClearAll}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20"
            >
              Clear All Favorites
            </Button>
          </div>
        )}

        {/* Experiences Grid */}
        {sortedExperiences.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={<Heart className="w-16 h-16" />}
            title="No favorites yet"
            description="Start exploring and save your favorite experiences to see them here"
            actionLabel="Browse Experiences"
            actionLink="/explore"
          />
        )}
      </div>
    </div>
  );
}
