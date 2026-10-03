'use client';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import { getCategory, DETAILS_GROUPS } from './registry';
import { sketchSummary } from './builderMachine';

export function SketchSummary({ state, copy, locale, onEdit }) {
  const sketch = sketchSummary(state), category = getCategory(state.categoryId);
  const field = (label, value) => <div key={label} className="mt-3"><dt className="font-medium text-content-secondary dark:text-content-darkSecondary">{label}</dt><dd className="mt-1 whitespace-pre-wrap [overflow-wrap:anywhere]">{value?.trim() || copy.toDecide}</dd></div>;
  const sections = [
    { key: 'shape', title: copy.shapeGroup, edit: copy.editShape, fields: [field(copy.title, sketch.title), field(copy.outcome, sketch.outcome), ...(category?.answerFields ?? []).map(key => field(copy.fields[key], sketch.categoryAnswers[key]))] },
    ...Object.entries(DETAILS_GROUPS).map(([key, keys]) => ({ key: 'details:' + key, title: key === 'time' ? copy.timeGroup : copy[key], edit: copy['edit' + key[0].toUpperCase() + key.slice(1)], fields: keys.map(name => field(copy.detailFields[name], name === 'venueType' ? copy.venueLabels[sketch.venueType] : state.fields[name])) })),
  ];
  return <div className="space-y-5 text-base">
    <p><span className="font-semibold">{copy.groupLabel}: </span>{category?.label[locale] ?? copy.toDecide}</p>
    {sections.map(section => <section key={section.key} id={'builder-summary-' + section.key.replace(':', '-')} tabIndex={-1} aria-label={section.title} className="rounded-2xl border border-control-border bg-surface-card p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-surface-darkCard">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">{section.title}</h2>{onEdit && <Button type="button" variant="outline" onClick={() => onEdit(section.key)} className="motion-reduce:transition-none">{section.edit}</Button>}</div>
      <dl>{section.fields}</dl>{section.key === 'details:people' && <p className="mt-4 text-content-secondary dark:text-content-darkSecondary">{copy.seatsHint}</p>}{section.key === 'details:time' && <p className="mt-4 text-content-secondary dark:text-content-darkSecondary">{copy.scheduleHint}</p>}
    </section>)}
  </div>;
}

export default function LiveSketch({ state, copy, locale }) {
  const [expanded, setExpanded] = useState(false);
  return <aside aria-label={copy.sketch} className="min-w-0 lg:self-start">
    <Button type="button" variant="outline" aria-expanded={expanded} aria-controls="builder-live-sketch" onClick={() => setExpanded(!expanded)} className="mb-4 motion-reduce:transition-none lg:hidden">{expanded ? copy.hideSketch : copy.showSketch}</Button>
    <div id="builder-live-sketch" className={(expanded ? 'block' : 'hidden') + ' lg:block'}><h2 className="mb-4 text-2xl font-bold">{copy.sketch}</h2><SketchSummary state={state} copy={copy} locale={locale} /></div>
  </aside>;
}
