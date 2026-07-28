import { cn } from '../../utils/cn';

/**
 * Select component for dropdown selections
 */
export default function Select({
  label,
  error,
  helperText,
  options = [],
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
      <select
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed',
          // Explicit colours: the select inherited them and went dark-on-dark.
          'appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
          'bg-no-repeat bg-right',
          "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]",
          'pr-10',
          error
            ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
