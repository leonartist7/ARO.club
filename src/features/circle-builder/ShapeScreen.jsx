'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import { builderLocale, getCategory, getExample } from './registry';
import { builderReducer } from './builderMachine';
import BuilderGuide from './BuilderGuide';
import BuilderConfirmation from './BuilderConfirmation';

export default function ShapeScreen({ state, dispatch, locale, focusHeading = false, onContinue }) {
  const context = useOptionalLanguage();
  const language = builderLocale(locale ?? context?.language), copy = getCircleBuilderCopy(language);
  const heading = useRef(null), form = useRef(null);
  const [proposal, setProposal] = useState(null);
  useEffect(() => { if (focusHeading) heading.current.focus(); }, [focusHeading]);
  const category = getCategory(state.categoryId), example = getExample(category?.id, category?.examples[0]?.id, language);
  const error = field => state.errors[field] ? state.errors[field] === 'required' ? copy.required : copy.tooLong : undefined;
  function continueSketch(event) {
    event.preventDefault();
    const next = builderReducer(state, { type: 'NEXT' });
    dispatch({ type: 'NEXT' });
    const invalid = Object.keys(next.errors)[0];
    if (invalid) form.current.querySelector('[aria-invalid="true"]')?.focus();
    else onContinue?.(next);
    // Newly rendered errors have not committed yet; focus by the validated key too.
    if (invalid) document.getElementById('builder-' + invalid)?.focus();
  }
  function suggest(field) {
    if (state.touched[field] || state.fields[field].trim()) setProposal({ field, exampleId: example.id, locale: language, value: example[field] });
    else dispatch({ type: 'ACCEPT_SUGGESTION', field, exampleId: example.id, locale: language });
  }
  return <section className="mx-auto w-full max-w-3xl text-base text-content-primary dark:text-content-dark">
    <p className="mb-5 text-content-secondary dark:text-content-darkSecondary">{copy.disclosure}</p>
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.shapeTitle}</h1>
    <p className="mt-3">{copy.shapeBody}</p>
    <form ref={form} onSubmit={continueSketch} noValidate className="mt-6 space-y-5 [&_label]:text-base [&_p]:text-base [&_[role=alert]]:text-danger-700 dark:[&_[role=alert]]:text-primary-200">
      <fieldset disabled={Boolean(state.pendingReset)} className="min-w-0 space-y-5">
        <Input className="border-control-border hover:border-control-border focus:border-control-border dark:border-control-border dark:hover:border-control-border dark:focus:border-control-border" id="builder-title" label={copy.title} required value={state.fields.title} error={error('title')} autoComplete="off" onChange={event => dispatch({ type: 'SET_FIELD', field: 'title', value: event.target.value })} />
        <div><label htmlFor="builder-outcome" className="mb-2 block font-medium">{copy.outcome}</label><textarea id="builder-outcome" required rows={3} value={state.fields.outcome} onChange={event => dispatch({ type: 'SET_FIELD', field: 'outcome', value: event.target.value })} aria-invalid={state.errors.outcome ? 'true' : undefined} aria-describedby="builder-limits builder-outcome-error" className="min-h-28 w-full resize-y rounded-lg border border-control-border bg-surface-card p-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-surface-darkCard" /><p id="builder-outcome-error" className="mt-1 text-danger-700 dark:text-primary-200">{error('outcome')}</p></div>
        <p id="builder-limits" className="text-content-secondary dark:text-content-darkSecondary">{copy.limits}</p>
        <fieldset className="min-w-0 space-y-4"><legend className="mb-2 font-semibold">{copy.optional}</legend><p>{copy.optionalHint}</p>
          {category?.answerFields.map(field => <Input className="border-control-border hover:border-control-border focus:border-control-border dark:border-control-border dark:hover:border-control-border dark:focus:border-control-border" key={field} id={'builder-' + field} label={copy.fields[field]} value={state.categoryAnswers[field] ?? ''} error={error(field)} autoComplete="off" onChange={event => dispatch({ type: 'SET_ANSWER', field, value: event.target.value })} />)}
        </fieldset>
        <p role="status" className="text-danger-700 dark:text-primary-200">{Object.keys(state.errors).length ? copy.validation : ''}</p>
        <div className="flex flex-wrap gap-3"><Button type="button" variant="ghost" onClick={() => dispatch({ type: 'BACK' })} className="motion-reduce:transition-none">{copy.back}</Button><Button type="submit" className="grow motion-reduce:transition-none">{copy.shapeNext}</Button></div>
        <BuilderGuide state={state} dispatch={dispatch} locale={language} copy={copy} />
        {example && <details className="rounded-2xl border border-control-border p-4"><summary className="flex min-h-11 cursor-pointer items-center font-semibold focus-visible:outline focus-visible:outline-2">{copy.exampleHelp}</summary><p className="mt-3">{copy.exampleHint}</p><h2 className="mt-3 text-xl font-bold">{example.title}</h2><p className="mt-2">{example.outcome}</p><div className="mt-4 flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={() => suggest('title')} className="motion-reduce:transition-none">{copy.suggestTitle}</Button><Button type="button" variant="outline" onClick={() => suggest('outcome')} className="motion-reduce:transition-none">{copy.suggestOutcome}</Button></div></details>}
      </fieldset>
    </form>
    {proposal && <BuilderConfirmation title={copy.suggestionTitle} description={copy.fields[proposal.field] ?? copy[proposal.field]} cancelLabel={copy.keepAnswer} confirmLabel={copy.apply} onCancel={() => setProposal(null)} onConfirm={() => { dispatch({ type: 'ACCEPT_SUGGESTION', ...proposal }); setProposal(null); }}>
      <dl><dt className="font-semibold">{copy.current}</dt><dd className="mt-1 whitespace-pre-wrap">{state.fields[proposal.field] || copy.empty}</dd><dt className="mt-3 font-semibold">{copy.proposed}</dt><dd className="mt-1 whitespace-pre-wrap">{proposal.value}</dd></dl>
    </BuilderConfirmation>}
  </section>;
}
