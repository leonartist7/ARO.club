import { cn } from '../../utils/cn';

const sizeClasses = {
  sm: 'w-12 h-12 text-2xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-24 h-24 text-5xl',
  xl: 'w-32 h-32 text-6xl',
};

// idle/wave/think stay still — no looping float
const poseAnim = {
  idle: '',
  wave: '',
  cheer: 'animate-pop',
  think: '',
  point: '',
};

export default function CocoMascot({
  pose = 'idle',
  size = 'md',
  className,
  label = 'Coco the Chameleon',
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'bg-primary-500 text-gray-900',
        'shadow-md select-none',
        sizeClasses[size] || sizeClasses.md,
        poseAnim[pose] || '',
        className
      )}
    >
      <span aria-hidden="true">🦎</span>
    </div>
  );
}
