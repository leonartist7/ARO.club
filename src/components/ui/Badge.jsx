import { cn } from '../../utils/cn';

const badgeVariants = {
  default: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  primary: 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-800',
  secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-900/30 dark:text-secondary-300 dark:border-secondary-800',
  success: 'bg-success-50 text-success-700 border-success-500/30 dark:bg-success-500/10 dark:text-success-500 dark:border-success-500/30',
  warning: 'bg-warning-50 text-warning-700 border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-500 dark:border-warning-500/30',
  danger: 'bg-danger-50 text-danger-700 border-danger-500/30 dark:bg-danger-500/10 dark:text-danger-500 dark:border-danger-500/30',
  info: 'bg-info-50 text-info-700 border-info-500/30 dark:bg-info-500/10 dark:text-info-500 dark:border-info-500/30',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

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
      {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
