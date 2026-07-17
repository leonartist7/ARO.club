import { Eye, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function SocialProof({
  viewingCount,
  recentBookingCount,
  lastBookedHoursAgo,
  variant = 'viewing',
  className
}) {
  const getIcon = () => {
    switch (variant) {
      case 'viewing':
        return <Eye className="w-4 h-4 text-info-500" aria-hidden="true" />;
      case 'booked':
        return <Zap className="w-4 h-4 text-primary-600" aria-hidden="true" />;
      case 'last-booked':
        return <Clock className="w-4 h-4 text-success-500" aria-hidden="true" />;
      default:
        return <Eye className="w-4 h-4 text-info-500" aria-hidden="true" />;
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
        return 'bg-info-50 dark:bg-info-500/10 text-info-700 dark:text-info-500 border-info-500/30';
      case 'booked':
        return 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800';
      case 'last-booked':
        return 'bg-success-50 dark:bg-success-500/10 text-success-700 dark:text-success-500 border-success-500/30';
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
