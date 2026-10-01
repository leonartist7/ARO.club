'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import { builderLocale, getCategory, getExample, searchCategories } from './registry';
import { builderReducer } from './builderMachine';
import BuilderGuide from './BuilderGuide';
import BuilderConfirmation from './BuilderConfirmation';

export default function ChooseScreen({ state, dispatch, locale, focusHeading = false, onContinue }) {
  const context = useOptionalLanguage();
  const language = builderLocale(locale ?? context?.language), copy = getCircleBuilderCopy(language);
  const [query, setQuery] = useState('');
  const heading = useRef(null), groups = useRef(null);
  useEffect(() => { if (focusHeading) heading.current.focus(); }, [focusHeading]);
  const category = getCategory(state.categoryId), example = getExample(category?.id, category?.examples[0]?.id, language);
  const results = searchCategories(query, language);
  function continueSketch(event) {
    event.preventDefault();
    const next = builderReducer(state, { type: 'NEXT' });
    dispatch({ type: 'NEXT' });
    if (next.errors.categoryId) (groups.current.querySelector('button') ?? document.getElementById('builder-search'))?.focus();
    else onContinue?.(next);
  }
  return <section className="mx-auto w-full max-w-3xl text-base text-content-primary dark:text-content-dark">
    <p className="mb-5 text-content-secondary dark:text-content-darkSecondary">{copy.disclosure}</p>
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.chooseTitle}</h1>
    <p className="mt-3">{copy.chooseBody}</p>
    <form onSubmit={continueSketch} noValidate className="mt-6 space-y-5 [&_label]:text-base [&_p]:text-base">
      <fieldset className="min-w-0 space-y-5">
        <Input className="border-control-border hover:border-control-border focus:border-control-border dark:border-control-border dark:hover:border-control-border dark:focus:border-control-border" id="builder-search" label={copy.search} value={query} onChange={event => setQuery(event.target.value)} autoComplete="off" />
        <fieldset ref={groups} aria-describedby="builder-group-boundary builder-group-error" className="min-w-0">
          <legend className="mb-3 font-semibold">{copy.groups}</legend>
          <div className="flex flex-wrap gap-3">{results.map(item => <Button key={item.id} type="button" variant={state.categoryId === item.id ? 'primary' : 'outline'} aria-pressed={state.categoryId === item.id} onClick={() => dispatch({ type: 'SELECT_CATEGORY', categoryId: item.id })} className="motion-reduce:transition-none">{item.label[language]}</Button>)}</div>
          {!results.length && <div className="mt-3"><p role="status">{copy.noResults}</p><Button type="button" variant="outline" onClick={() => { setQuery(''); document.getElementById('builder-search').focus(); }} className="mt-3 motion-reduce:transition-none">{copy.clearSearch}</Button></div>}
          <p id="builder-group-boundary" className="mt-3 text-content-secondary dark:text-content-darkSecondary">{copy.boundary}</p>
          <p id="builder-group-error" role="status" className="mt-2 text-danger-700 dark:text-primary-200">{state.errors.categoryId ? copy.categoryError : ''}</p>
        </fieldset>
        {example && <div className="rounded-2xl border border-control-border bg-surface-card p-5 dark:bg-surface-darkCard">
          <p className="font-semibold text-primary-700 dark:text-primary-200">{copy.example}</p><h2 className="mt-2 text-xl font-bold">{example.title}</h2><p className="mt-2">{example.outcome}</p>
          <div className="mt-4 flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={() => dispatch({ type: 'USE_EXAMPLE', exampleId: example.id, locale: language })} className="motion-reduce:transition-none">{copy.useExample}</Button><Button type="button" variant="ghost" aria-pressed={state.ideaSource === 'own'} onClick={() => dispatch({ type: 'START_OWN_IDEA' })} className="motion-reduce:transition-none">{copy.ownIdea}</Button></div>
        </div>}
        <Button type="submit" fullWidth className="motion-reduce:transition-none">{copy.chooseNext}</Button>
        <BuilderGuide state={state} dispatch={dispatch} locale={language} copy={copy} />
      </fieldset>
    </form>
    {state.pendingCategory && <BuilderConfirmation title={copy.categoryTitle} description={copy.categoryDescription} cancelLabel={copy.keepCategory} confirmLabel={copy.changeCategory} onCancel={() => dispatch({ type: 'CANCEL_CATEGORY' })} onConfirm={() => dispatch({ type: 'CONFIRM_CATEGORY' })}>
      <ul className="list-inside list-disc">{state.pendingCategory.affectedFields.map(field => <li key={field}>{copy.fields[field]}</li>)}</ul>
    </BuilderConfirmation>}
  </section>;
}
