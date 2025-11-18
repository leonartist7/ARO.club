import { Eye, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Social Proof Component
 * Shows viewing/booking indicators to build trust
 */
export default function SocialProof({
  viewingCount,
  recentBookingCount,
  lastBookedHoursAgo,
  variant = 'viewing', // 'viewing', 'booked', 'last-booked'
  className
}) {
  const getIcon = () => {
    switch (variant) {
      case 'viewing':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'booked':
        return <Zap className="w-4 h-4 text-orange-500" />;
      case 'last-booked':
        return <Clock className="w-4 h-4 text-green-500" />;
      default:
        return <Eye className="w-4 h-4 text-blue-500" />;
    }
  };

  const getText = () => {
    switch (variant) {
      case 'viewing':
        return `${viewingCount} people are viewing this`;
      case 'booked':
        return `Booked ${recentBookingCount} times in the last 24 hours`;
      case 'last-booked':
        return `Last booked ${lastBookedHoursAgo} hours ago`;
      default:
        return '';
    }
  };

  const getColor = () => {
    switch (variant) {
      case 'viewing':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'booked':
        return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'last-booked':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium',
        getColor(),
        'animate-pulse',
        className
      )}
    >
      {getIcon()}
      <span>{getText()}</span>
    </motion.div>
  );
}
