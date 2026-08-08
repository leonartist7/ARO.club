import { cn } from '../../utils/cn';

const buttonVariants = {
  primary:
    'bg-primary-600 text-white font-semibold hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:active:bg-primary-800',
  secondary:
    'bg-secondary-600 text-white font-semibold hover:bg-secondary-700 active:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:active:bg-secondary-800',
  outline:
    'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/20 dark:active:bg-primary-900/30',
  ghost:
    'text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600',
  danger:
    'bg-danger-500 text-white font-semibold hover:bg-danger-700 active:bg-danger-700 dark:bg-danger-500 dark:hover:bg-danger-700',
  glass:
    'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 hover:bg-white/90 dark:hover:bg-gray-800/90 active:bg-white dark:active:bg-gray-800 shadow-lg',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm min-h-11 min-w-11',
  md: 'px-4 py-2 text-base min-h-11',
  lg: 'px-6 py-3 text-lg min-h-11',
  xl: 'px-8 py-4 text-xl min-h-12',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon = null,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        fullWidth && 'w-full',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900',
        'focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
