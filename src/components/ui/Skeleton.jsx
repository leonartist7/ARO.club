import { cn } from '../../utils/cn';

/**
 * Base skeleton component with shimmer animation
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.circle] - Render as circle (for avatars)
 * @param {string} [props.variant='default'] - Skeleton variant (default, text, title)
 */
export default function Skeleton({ className, circle = false, variant = 'default' }) {
  const variantClasses = {
    default: 'h-4',
    text: 'h-4',
    title: 'h-6',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
        'bg-[length:200%_100%] animate-shimmer',
        circle ? 'rounded-full' : 'rounded',
        variantClasses[variant],
        className
      )}
      aria-label="Loading..."
      role="status"
    />
  );
}

/**
 * Skeleton for a single line of text
 */
export function SkeletonText({ className, width = 'w-full' }) {
  return <Skeleton className={cn('h-4', width, className)} variant="text" />;
}

/**
 * Skeleton for a title/heading
 */
export function SkeletonTitle({ className, width = 'w-3/4' }) {
  return <Skeleton className={cn('h-6', width, className)} variant="title" />;
}

/**
 * Skeleton for a circular avatar
 */
export function SkeletonAvatar({ size = 'md', className }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return <Skeleton circle className={cn(sizeClasses[size], className)} />;
}

/**
 * Skeleton for a button
 */
export function SkeletonButton({ className, width = 'w-24' }) {
  return <Skeleton className={cn('h-10', width, 'rounded-lg', className)} />;
}

/**
 * Skeleton for an image/thumbnail
 */
export function SkeletonImage({ className, aspectRatio = 'aspect-video' }) {
  return <Skeleton className={cn('w-full', aspectRatio, className)} />;
}
