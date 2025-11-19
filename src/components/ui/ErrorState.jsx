import { AlertCircle, RefreshCw, WifiOff, FileQuestion } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from './Button';

const errorTypes = {
  network: {
    icon: WifiOff,
    title: 'Connection Error',
    description: 'Unable to connect to the server. Please check your internet connection and try again.',
  },
  notFound: {
    icon: FileQuestion,
    title: 'Not Found',
    description: 'The content you are looking for could not be found.',
  },
  server: {
    icon: AlertCircle,
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
  },
  generic: {
    icon: AlertCircle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
  },
};

/**
 * ErrorState component for displaying error messages
 * - For network errors, 404s, server errors, etc.
 * - Supports retry button
 *
 * @param {Object} props - Component props
 * @param {string} [props.type='generic'] - Error type (network, notFound, server, generic)
 * @param {string} [props.title] - Custom error title (overrides type default)
 * @param {string} [props.description] - Custom error description (overrides type default)
 * @param {Function} [props.onRetry] - Retry button handler
 * @param {string} [props.retryLabel='Try Again'] - Retry button label
 * @param {React.ReactNode} [props.action] - Custom action component
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <ErrorState
 *   type="network"
 *   onRetry={handleRetry}
 * />
 */
export default function ErrorState({
  type = 'generic',
  title,
  description,
  onRetry,
  retryLabel = 'Try Again',
  action,
  className,
}) {
  const errorConfig = errorTypes[type] || errorTypes.generic;
  const Icon = errorConfig.icon;

  const displayTitle = title || errorConfig.title;
  const displayDescription = description || errorConfig.description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
      role="alert"
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {displayTitle}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {displayDescription}
      </p>

      {/* Actions */}
      {(onRetry || action) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {onRetry && (
            <Button
              variant="primary"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
