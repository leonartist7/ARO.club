import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

export default function ThemeToggle({ className }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center',
        'w-11 h-11 min-w-11 min-h-11 rounded-lg',
        'bg-gray-100 dark:bg-gray-800',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'focus-visible:ring-2 focus-visible:ring-primary-500',
        'dark:focus:ring-offset-gray-900',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            'absolute inset-0 w-5 h-5 text-accent-500',
            'transition-all duration-300 ease-in-out',
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          )}
        />
        <Moon
          className={cn(
            'absolute inset-0 w-5 h-5 text-info-500',
            'transition-all duration-300 ease-in-out',
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
    </button>
  );
}
