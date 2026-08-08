import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function SpotCounter({
  spotsLeft,
  totalSpots = 0,
  variant = 'default',
  className
}) {
  const getUrgencyLevel = () => {
    if (spotsLeft === 0) return 'sold-out';
    if (spotsLeft <= 2) return 'high';
    if (spotsLeft <= 4) return 'moderate';
    return 'low';
  };

  const urgency = getUrgencyLevel();

  const getColorClasses = () => {
    switch (urgency) {
      case 'sold-out':
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          text: 'text-gray-700 dark:text-gray-200',
          icon: 'text-gray-500 dark:text-gray-400',
        };
      case 'high':
        return {
          bg: 'bg-danger-50 dark:bg-danger-500/15',
          text: 'text-danger-700 dark:text-danger-500',
          icon: 'text-danger-700 dark:text-danger-500',
        };
      case 'moderate':
        return {
          bg: 'bg-primary-50 dark:bg-primary-900/30',
          text: 'text-primary-700 dark:text-primary-300',
          icon: 'text-primary-600 dark:text-primary-400',
        };
      default:
        return {
          bg: 'bg-success-50 dark:bg-success-500/15',
          text: 'text-success-700 dark:text-success-500',
          icon: 'text-success-700 dark:text-success-500',
        };
    }
  };

  const colors = getColorClasses();

  const getIcon = () => {
    if (urgency === 'sold-out') return <XCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
    if (urgency === 'high') return <AlertCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
    return <CheckCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
  };

  const getText = () => {
    if (spotsLeft === 0) return 'Sold Out';
    if (spotsLeft === 1) return '1 spot left';
    return `${spotsLeft} spots left`;
  };

  if (variant === 'compact') {
    return (
      <div className={clsx('inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium', colors.bg, colors.text, className)}>
        {getIcon()}
        <span>{getText()}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={clsx('inline-flex items-center gap-1 text-sm font-medium', colors.text, className)}>
        {getIcon()}
        <span>{getText()}</span>
      </span>
    );
  }

  return (
    <div className={clsx('flex items-center gap-2 p-3 md:p-4 rounded-lg', colors.bg, className)}>
      {getIcon()}
      <div className="flex-1">
        <p className={clsx('text-base md:text-lg font-bold', colors.text)}>{getText()}</p>
        {totalSpots > 0 && spotsLeft > 0 && (
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Out of {totalSpots} total spots
          </p>
        )}
      </div>
    </div>
  );
}
