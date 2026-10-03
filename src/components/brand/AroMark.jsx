'use client';
import { cn } from '../../utils/cn';

const sizes = { sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' };

/** Open circle and one detached person dot. */
export default function AroMark({ size = 'md', className, label = 'ARO' }) {
  return (
    <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 text-ink dark:text-bone', sizes[size], className)}
      role={label ? 'img' : undefined} aria-label={label || undefined}
      aria-hidden={label ? undefined : true} focusable="false">
      <path d="M49 15 A25 25 0 1 0 61 37" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      <circle cx="61" cy="17" r="5.5" fill="currentColor" />
    </svg>
  );
}

export function AroWordmark({ className, label = 'ARO' }) {
  return (
    <svg viewBox="0 0 211 72" xmlns="http://www.w3.org/2000/svg"
      className={cn('h-9 w-[106px] text-ink dark:text-bone', className)}
      role={label ? 'img' : undefined} aria-label={label || undefined}
      aria-hidden={label ? undefined : true} focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 61 30 12 Q33 5 36 12 L59 61 M18 43 H49" />
        <path d="M76 61 V12 H99 C113 12 121 18 121 29 C121 40 113 46 99 46 H76 M100 46 124 61" />
        <path d="M183 15 A25 25 0 1 0 195 37" />
      </g>
      <circle cx="195" cy="17" r="5.5" fill="currentColor" />
    </svg>
  );
}
