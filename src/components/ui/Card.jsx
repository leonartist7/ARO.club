import { cn } from '../../utils/cn';

export function Card({ children, className, hover = false, glass = false, ...props }) {
  return (
    <div
      className={cn(
        glass
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50'
          : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
        'rounded-xl shadow-md overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 motion-reduce:transform-none',
        glass && hover && 'hover:bg-white/90 dark:hover:bg-gray-900/90',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-800', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800', className)} {...props}>
      {children}
    </div>
  );
}
