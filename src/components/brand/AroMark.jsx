'use client';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

/** Noise Order's inner-circle o is the ARO brand symbol. */
export default function AroMark({ size = 'md', className, label = 'ARO' }) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-primary-500 text-ink',
        sizes[size],
        className
      )}
      role={label ? 'img' : 'presentation'}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
    >
      <span className={cn('font-display font-normal leading-none', size === 'lg' ? 'text-5xl' : size === 'sm' ? 'text-[1.7rem]' : 'text-[2.15rem]')} aria-hidden="true">o</span>
    </span>
  );
}
