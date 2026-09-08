import { cn } from '../../utils/cn';

export function AppPanel({ children, className, dark = false, ...props }) {
  return (
    <section
      className={cn(
        'border border-ink/10 dark:border-bone/10',
        dark ? 'bg-ink text-bone dark:bg-plum' : 'bg-white/70 text-ink dark:bg-gray-900/70 dark:text-bone',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function StatusPill({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'border-ink/15 bg-bone text-ink dark:border-bone/20 dark:bg-gray-800 dark:text-bone',
    forming: 'border-secondary-500/40 bg-secondary-50 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-200',
    open: 'border-sky/40 bg-sky/10 text-sky dark:bg-sky/15 dark:text-blue-200',
    confirmed: 'border-moss/40 bg-moss/10 text-moss dark:bg-moss/20 dark:text-green-200',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]', tones[tone] ?? tones.neutral)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

export function AppSectionHeading({ eyebrow, title, children, className }) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        {eyebrow && <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300">{eyebrow}</p>}
        <h2 className="font-display text-3xl leading-none tracking-[-0.025em] text-ink dark:text-bone">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function AppAvatar({ initials, size = 'md' }) {
  const sizes = { sm: 'h-8 w-8 text-[10px]', md: 'h-10 w-10 text-xs', lg: 'h-14 w-14 text-sm' };

  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-primary-500 font-bold tracking-wide text-white', sizes[size] ?? sizes.md)} aria-hidden="true">
      {initials}
    </span>
  );
}

export function SignalBar({ value, tone = 'primary' }) {
  const toneClass = tone === 'moss' ? 'bg-moss' : tone === 'secondary' ? 'bg-secondary-400' : 'bg-primary-500';

  return (
    <div className="h-1.5 overflow-hidden bg-ink/10 dark:bg-bone/10" aria-hidden="true">
      <div className={cn('h-full transition-all duration-500', toneClass)} style={{ width: `${value}%` }} />
    </div>
  );
}
