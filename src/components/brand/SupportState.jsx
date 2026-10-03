'use client';
import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { AroWordmark } from './AroMark';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { supportingCopy } from '../../i18n/supporting';

export function LoadingState() {
  const language = useOptionalLanguage()?.language ?? 'en';
  const copy = supportingCopy[language] ?? supportingCopy.en;
  return <main lang={language} className="flex min-h-[60dvh] items-center justify-center bg-surface-canvas px-4 py-16 text-ink dark:bg-surface-dark dark:text-bone">
    <div role="status" aria-live="polite" className="w-full max-w-sm text-center">
      <div className="mx-auto w-fit"><AroWordmark label="" /></div>
      <div className="mx-auto mt-8 flex w-fit gap-2" aria-hidden="true"><span className="h-2 w-8 rounded-full bg-action-primary motion-safe:animate-pulse" /><span className="h-2 w-8 rounded-full bg-secondary-300 motion-safe:animate-pulse [animation-delay:150ms]" /><span className="h-2 w-8 rounded-full bg-moss motion-safe:animate-pulse [animation-delay:300ms]" /></div>
      <p className="mt-6 font-display text-2xl font-bold">{copy.loading}</p>
      <p className="mt-2 text-sm text-content-secondary dark:text-content-darkSecondary">{copy.loadingDetail}</p>
    </div>
  </main>;
}

export function ErrorState({ retry }) {
  const language = useOptionalLanguage()?.language ?? 'en';
  const copy = supportingCopy[language] ?? supportingCopy.en;
  return <main lang={language} className="flex min-h-[70dvh] items-center justify-center bg-surface-canvas px-4 py-12 text-ink dark:bg-surface-dark dark:text-bone">
    <section aria-labelledby="aro-error-title" className="w-full max-w-2xl rounded-[2rem] border border-ink/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(37,36,32,0.08)] dark:border-bone/15 dark:bg-surface-darkCard sm:p-10">
      <AroWordmark label="" />
      <p className="mt-9 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">{copy.errorEyebrow}</p>
      <h1 id="aro-error-title" className="mt-3 max-w-xl font-display text-4xl leading-tight sm:text-5xl">{copy.errorTitle}</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{copy.errorBody}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={retry} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-action-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-darkCard"><RotateCcw className="h-4 w-4" aria-hidden="true" />{copy.retry}</button>
        <a href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-ink/20 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-action-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:border-bone/25 dark:text-bone dark:focus-visible:ring-offset-surface-darkCard"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.home}</a>
      </div>
    </section>
  </main>;
}
