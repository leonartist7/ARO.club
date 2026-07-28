import { cn } from '../../utils/cn';

// Every variant needs a dark counterpart: badges sit on dark cards all over
// the app, and the light-only tints rendered dark text on dark backgrounds.
const badgeVariants = {
  default:
    'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
  primary:
    'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/40 dark:text-primary-200 dark:border-primary-800',
  secondary:
    'bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-900/40 dark:text-secondary-200 dark:border-secondary-800',
  success:
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800',
  warning:
    'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-800',
  danger:
    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800',
  info: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

/**
 * Badge component for labels, tags, and status indicators
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon = null,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium border',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
