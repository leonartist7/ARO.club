import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

/**
 * Spot Counter Component
 * Shows available spots with urgency colors
 */
export default function SpotCounter({
  spotsLeft,
  totalSpots = 0,
  variant = 'default', // 'default', 'compact', 'inline'
  className
}) {
  // Determine urgency level
  const getUrgencyLevel = () => {
    if (spotsLeft === 0) return 'sold-out';
    if (spotsLeft <= 2) return 'high';
    if (spotsLeft <= 4) return 'moderate';
    return 'low';
  };

  const urgency = getUrgencyLevel();

  // Get color classes based on urgency
  const getColorClasses = () => {
    switch (urgency) {
      case 'sold-out':
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-600 dark:text-gray-400',
          icon: 'text-gray-500 dark:text-gray-500',
        };
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-300',
          icon: 'text-red-600 dark:text-red-400',
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          text: 'text-yellow-700 dark:text-yellow-300',
          icon: 'text-yellow-600 dark:text-yellow-400',
        };
      case 'low':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          text: 'text-green-700 dark:text-green-300',
          icon: 'text-green-600 dark:text-green-400',
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-600 dark:text-gray-400',
          icon: 'text-gray-500 dark:text-gray-500',
        };
    }
  };

  const colors = getColorClasses();

  // Get icon based on urgency
  const getIcon = () => {
    if (urgency === 'sold-out') {
      return <XCircle className={clsx('w-4 h-4', colors.icon)} />;
    }
    if (urgency === 'high') {
      return <AlertCircle className={clsx('w-4 h-4', colors.icon)} />;
    }
    return <CheckCircle className={clsx('w-4 h-4', colors.icon)} />;
  };

  // Get text
  const getText = () => {
    if (spotsLeft === 0) return 'Sold Out';
    if (spotsLeft === 1) return '1 spot left!';
    return `${spotsLeft} spots left!`;
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
          colors.bg,
          colors.text,
          urgency === 'high' && 'animate-pulse',
          className
        )}
      >
        {getIcon()}
        <span>{getText()}</span>
      </motion.div>
    );
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={clsx(
          'inline-flex items-center gap-1 text-sm font-medium',
          colors.text,
          urgency === 'high' && 'animate-pulse',
          className
        )}
      >
        {getIcon()}
        <span>{getText()}</span>
      </motion.span>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'flex items-center gap-2 p-3 md:p-4 rounded-lg',
        colors.bg,
        urgency === 'high' && 'animate-pulse',
        className
      )}
    >
      {getIcon()}
      <div className="flex-1">
        <p className={clsx('text-base md:text-lg font-bold', colors.text)}>
          {getText()}
        </p>
        {totalSpots > 0 && spotsLeft > 0 && (
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Out of {totalSpots} total spots
          </p>
        )}
      </div>
    </motion.div>
  );
}
