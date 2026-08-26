import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

/** ARO's orbit mark: a human possibility moving from signal to formation. */
export default function AroMark({ size = 'md', className, label = 'ARO' }) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-ink text-bone shadow-[0_8px_28px_rgba(40,36,32,0.18)] dark:bg-bone dark:text-ink',
        sizes[size],
        className
      )}
      role={label ? 'img' : 'presentation'}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
    >
      <span className="absolute inset-[18%] rounded-full border border-current/45" aria-hidden="true" />
      <span className="absolute right-[8%] top-1/2 h-[24%] w-[24%] -translate-y-1/2 rounded-full bg-primary-500 ring-2 ring-bone dark:ring-ink" aria-hidden="true" />
      <span className="h-[24%] w-[24%] rounded-full bg-current" aria-hidden="true" />
    </span>
  );
}
