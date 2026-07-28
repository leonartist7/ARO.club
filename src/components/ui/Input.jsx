import { cn } from '../../utils/cn';

/**
 * Input component for text input fields
 */
export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  wrapperClassName,
  ...props
}) {
  return (
    <div className={cn('w-full', wrapperClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border transition-colors',
            // Set explicitly: without these the input inherited its colours
            // and rendered dark text on dark cards.
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
