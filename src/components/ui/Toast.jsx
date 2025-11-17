import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-400',
    textColor: 'text-green-900 dark:text-green-100',
    progressColor: 'bg-green-500 dark:bg-green-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500 dark:text-red-400',
    textColor: 'text-red-900 dark:text-red-100',
    progressColor: 'bg-red-500 dark:bg-red-400',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-500 dark:text-yellow-400',
    textColor: 'text-yellow-900 dark:text-yellow-100',
    progressColor: 'bg-yellow-500 dark:bg-yellow-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-400',
    textColor: 'text-blue-900 dark:text-blue-100',
    progressColor: 'bg-blue-500 dark:bg-blue-400',
  },
};

/**
 * Toast notification component
 * - Animated entry/exit (slide in from top-right)
 * - Colored by type (success, error, warning, info)
 * - Close button
 * - Progress bar showing auto-dismiss countdown
 */
export default function Toast({ message, type = 'info', duration = 5000, onClose }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 200); // Match animation duration
  };

  return (
    <div
      className={cn(
        'min-w-[320px] max-w-md rounded-lg border shadow-lg overflow-hidden',
        config.bgColor,
        config.borderColor,
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'
      )}
      role="alert"
      aria-live="assertive"
    >
      {/* Main Content */}
      <div className="p-4 flex items-start gap-3">
        {/* Icon */}
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)} />

        {/* Message */}
        <p className={cn('flex-1 text-sm font-medium', config.textColor)}>{message}</p>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={cn(
            'flex-shrink-0 p-1 rounded-md transition-colors',
            'hover:bg-black/10 dark:hover:bg-white/10',
            config.textColor
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      {duration > 0 && (
        <div className="h-1 bg-black/10 dark:bg-white/10">
          <div
            className={cn('h-full transition-all duration-75 ease-linear', config.progressColor)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
