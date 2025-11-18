import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from '../../hooks/useToast';
import clsx from 'clsx';

/**
 * FavoriteButton - Heart icon that toggles filled/outline
 * Animated heart pulse on favorite
 * Shows toast notification
 *
 * @param {string} experienceId - The experience ID to favorite
 * @param {string} size - Size variant: 'sm', 'default', 'lg'
 * @param {string} className - Additional CSS classes
 */
export default function FavoriteButton({ experienceId, size = 'default', className }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(experienceId);

  const sizeClasses = {
    sm: 'p-1.5',
    default: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    default: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nowFavorited = toggleFavorite(experienceId);

    if (nowFavorited) {
      showToast('Added to favorites!', 'success');
    } else {
      showToast('Removed from favorites', 'info');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={clsx(
        'rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
        'hover:bg-white dark:hover:bg-gray-800 transition-all',
        'shadow-md hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        sizeClasses[size],
        className
      )}
      whileTap={{ scale: 0.9 }}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorited}
    >
      <motion.div
        animate={favorited ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={clsx(
            iconSizes[size],
            'transition-colors',
            favorited
              ? 'fill-red-500 stroke-red-500'
              : 'stroke-gray-600 dark:stroke-gray-300'
          )}
        />
      </motion.div>
    </motion.button>
  );
}
