import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const toastConfig = {
  success: {
    icon: CheckCircle,
    surface: 'bg-white dark:bg-gray-900 border-success-500/30',
    orb: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
    text: 'text-gray-900 dark:text-gray-50',
    progress: 'bg-success-500',
  },
  error: {
    icon: XCircle,
    surface: 'bg-white dark:bg-gray-900 border-danger-500/30',
    orb: 'bg-danger-50 dark:bg-danger-500/15 text-danger-700 dark:text-danger-500',
    text: 'text-gray-900 dark:text-gray-50',
    progress: 'bg-danger-500',
  },
  warning: {
    icon: AlertTriangle,
    surface: 'bg-white dark:bg-gray-900 border-accent-500/40',
    orb: 'bg-accent-50 dark:bg-accent-500/15 text-accent-700 dark:text-accent-500',
    text: 'text-gray-900 dark:text-gray-50',
    progress: 'bg-accent-500',
  },
  info: {
    icon: Info,
    surface: 'bg-white dark:bg-gray-900 border-secondary-500/30',
    orb: 'bg-secondary-50 dark:bg-secondary-500/15 text-secondary-700 dark:text-secondary-300',
    text: 'text-gray-900 dark:text-gray-50',
    progress: 'bg-secondary-500',
  },
};

/**
 * Toast ? brand sticker look: rounded-2xl, icon orb, coral/teal/gold by type.
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
      if (remaining === 0) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={cn(
        'min-w-[320px] max-w-md rounded-2xl border shadow-xl overflow-hidden',
        config.surface,
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right motion-reduce:animate-none'
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4 flex items-start gap-3">
        <span
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            config.orb
          )}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>

        <p className={cn('flex-1 text-sm font-medium pt-2', config.text)}>{message}</p>

        <button
          type="button"
          onClick={handleClose}
          className={cn(
            'flex-shrink-0 p-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {duration > 0 && (
        <div className="h-1 bg-gray-100 dark:bg-gray-800">
          <div
            className={cn('h-full transition-all duration-75 ease-linear', config.progress)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
