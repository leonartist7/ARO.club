import { cn } from '../../utils/cn';

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

/**
 * Loading spinner component
 */
export default function LoadingSpinner({
  size = 'md',
  className,
  fullScreen = false,
}) {
  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2 border-primary-500',
        spinnerSizes[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
