'use client';
import { useEffect, useRef } from 'react';
import Button from '../../components/ui/Button';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import { builderLocale } from './registry';
import { builderReducer } from './builderMachine';
import BuilderGuide from './BuilderGuide';
import { SketchSummary } from './SketchSummary';

export default function ReviewScreen({ state, dispatch, locale, focusHeading = false, onContinue }) {
  const context = useOptionalLanguage(), language = builderLocale(locale ?? context?.language), copy = getCircleBuilderCopy(language), heading = useRef(null);
  useEffect(() => {
    if (!focusHeading) return;
    const target = state.reviewFocusTarget && document.getElementById('builder-summary-' + state.reviewFocusTarget.replace(':', '-'));
    (target || heading.current).focus();
  }, [focusHeading, state.reviewFocusTarget]);
  return <section className="mx-auto w-full max-w-3xl text-base text-content-primary dark:text-content-dark">
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.reviewTitle}</h1><p className="mt-3">{copy.reviewBody}</p>
    <BuilderGuide state={state} dispatch={dispatch} locale={language} copy={copy} step="review" />
    <div className="mt-6"><SketchSummary state={state} copy={copy} locale={language} onEdit={target => { const [step, group] = target.split(':'); dispatch({ type: 'EDIT', step, group }); }} /></div>
    <p className="my-5 text-content-secondary dark:text-content-darkSecondary">{copy.disclosure}</p>
    <Button type="button" fullWidth disabled={Boolean(state.pendingReset || state.pendingCategory)} onClick={() => { const next = builderReducer(state, { type: 'NEXT' }); dispatch({ type: 'NEXT' }); if (next.step === 'ready') onContinue?.(next); }} className="motion-reduce:transition-none">{copy.finishSketch}</Button>
  </section>;
}
