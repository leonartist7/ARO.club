'use client';
import { useEffect, useRef } from 'react';
import Button from '../../components/ui/Button';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import { builderLocale } from './registry';
import { SketchSummary } from './SketchSummary';
import BuilderConfirmation from './BuilderConfirmation';
import BuilderGuide from './BuilderGuide';

export default function ReadyScreen({ state, dispatch, locale, focusHeading = false }) {
  const context = useOptionalLanguage(), language = builderLocale(locale ?? context?.language), copy = getCircleBuilderCopy(language), heading = useRef(null);
  useEffect(() => { if (focusHeading) heading.current.focus(); }, [focusHeading]);
  return <section className="mx-auto w-full max-w-3xl text-base text-content-primary dark:text-content-dark">
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.readyTitle}</h1><p role="status" className="mt-3 font-semibold">{copy.readyBody}</p><p className="mt-3 text-content-secondary dark:text-content-darkSecondary">{copy.disclosure}</p>
    <div className="my-6 flex flex-wrap gap-3"><Button type="button" onClick={() => dispatch({ type: 'EDIT_SKETCH' })} className="motion-reduce:transition-none">{copy.editSketch}</Button><Button type="button" variant="outline" onClick={() => dispatch({ type: 'REQUEST_RESET' })} className="motion-reduce:transition-none">{copy.startAnother}</Button></div>
    <SketchSummary state={state} copy={copy} locale={language} /><BuilderGuide state={state} dispatch={dispatch} locale={language} copy={copy} step="review" />
    {state.pendingReset && <BuilderConfirmation title={copy.resetTitle} description={copy.resetBody} cancelLabel={copy.keepEditing} confirmLabel={copy.startAnother} onCancel={() => dispatch({ type: 'CANCEL_RESET' })} onConfirm={() => dispatch({ type: 'CONFIRM_RESET' })} />}
  </section>;
}
