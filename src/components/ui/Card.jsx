import { cn } from '../../utils/cn';

/**
 * Card component for containing content
 */
export function Card({ children, className, hover = false, glass = false, ...props }) {
  return (
    <div
      className={cn(
        glass
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700',
        'rounded-xl shadow-md overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        glass && hover && 'hover:bg-white/90 dark:hover:bg-gray-800/90',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader component
 */
export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * CardBody component
 */
export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * CardFooter component
 */
export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  );
}
