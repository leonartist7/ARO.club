'use client';
import { useEffect, useRef } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useOptionalLanguage } from '../../contexts/LanguageContext';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import { builderLocale, DETAILS_GROUPS, VENUE_TYPES } from './registry';
import { builderReducer } from './builderMachine';
import BuilderGuide from './BuilderGuide';
import LiveSketch from './SketchSummary';

const control = 'border-control-border hover:border-control-border focus:border-control-border dark:border-control-border dark:hover:border-control-border dark:focus:border-control-border';
export default function DetailsScreen({ state, dispatch, locale, focusHeading = false, onContinue }) {
  const context = useOptionalLanguage(), language = builderLocale(locale ?? context?.language), copy = getCircleBuilderCopy(language);
  const heading = useRef(null), pendingFocus = useRef(Object.keys(state.errors)[0] ?? null);
  useEffect(() => { if (focusHeading) heading.current.focus(); }, [focusHeading]);
  useEffect(() => {
    const field = pendingFocus.current;
    if (field && document.getElementById('builder-' + field)) { document.getElementById('builder-' + field).focus(); pendingFocus.current = null; }
  }, [state.errors, state.detailsGroup]);
  const errors = { groupSize: copy.sizeError, durationMinutes: copy.durationError, venueType: copy.venueError, date: copy.dateError, time: copy.timeError, timeZone: state.errors.timeZone === 'zone-required' ? copy.zoneRequired : copy.zoneError };
  const helpers = { audience: copy.peopleHint, groupSize: copy.seatsHint, placeDescription: copy.placeHint, durationMinutes: copy.durationHint, date: copy.dateHint, time: copy.timeHint, timeZone: copy.zoneHint };
  function submit(event) {
    event.preventDefault(); const next = builderReducer(state, { type: 'NEXT' });
    pendingFocus.current = Object.keys(next.errors)[0] ?? null; dispatch({ type: 'NEXT' });
    if (!pendingFocus.current) onContinue?.(next);
  }
  return <section className="mx-auto w-full max-w-6xl text-base text-content-primary dark:text-content-dark">
    <p className="mb-5 text-content-secondary dark:text-content-darkSecondary">{copy.disclosure}</p>
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.detailsTitle}</h1><p className="mt-3">{copy.detailsBody}</p>
    <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
      <div className="min-w-0"><form onSubmit={submit} noValidate className="space-y-5 [&_label]:text-base [&_p]:text-base [&_[role=alert]]:text-danger-700 dark:[&_[role=alert]]:text-primary-200">
        <fieldset disabled={Boolean(state.pendingReset || state.pendingCategory)} className="min-w-0 space-y-5">
          {Object.entries(DETAILS_GROUPS).map(([group, fields]) => <div key={group} className="rounded-2xl border border-control-border p-4">
            <h2><Button type="button" variant="ghost" fullWidth aria-expanded={state.detailsGroup === group} aria-controls={'builder-group-' + group} onClick={() => dispatch({ type: 'OPEN_DETAILS_GROUP', group: state.detailsGroup === group ? null : group })} className="justify-between text-lg font-semibold motion-reduce:transition-none">{group === 'time' ? copy.timeGroup : copy[group]}<span aria-hidden="true">{state.detailsGroup === group ? '−' : '+'}</span></Button></h2>
            <div id={'builder-group-' + group} hidden={state.detailsGroup !== group}>{state.detailsGroup === group && <fieldset className="mt-4 min-w-0 space-y-5"><legend className="sr-only">{group === 'time' ? copy.timeGroup : copy[group]}</legend>
              {fields.map(field => field === 'venueType' ? <div key={field}><label htmlFor="builder-venueType" className="mb-2 block font-medium">{copy.detailFields.venueType}</label><select id="builder-venueType" value={state.fields.venueType} onChange={event => dispatch({ type: 'SET_FIELD', field, value: event.target.value })} aria-invalid={state.errors.venueType ? 'true' : undefined} aria-describedby={state.errors.venueType ? 'builder-venueType-error' : undefined} className="min-h-11 w-full rounded-lg border border-control-border bg-surface-card p-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-surface-darkCard">{VENUE_TYPES.map(value => <option key={value} value={value}>{copy.venueLabels[value]}</option>)}</select>{state.errors.venueType && <p id="builder-venueType-error" role="alert">{copy.venueError}</p>}</div>
                : <Input key={field} className={control} id={'builder-' + field} label={copy.detailFields[field]} value={state.fields[field]} autoComplete="off" inputMode={['groupSize', 'durationMinutes'].includes(field) ? 'numeric' : 'text'} helperText={helpers[field]} error={state.errors[field] ? state.errors[field] === 'too-long' ? `${copy.tooLong} ${helpers[field]}` : errors[field] : undefined} onChange={event => dispatch({ type: 'SET_FIELD', field, value: event.target.value })} />)}
              {group === 'time' && <p className="text-content-secondary dark:text-content-darkSecondary">{copy.scheduleHint}</p>}
            </fieldset>}</div>
          </div>)}
          <p role="status" className="text-danger-700 dark:text-primary-200">{Object.keys(state.errors).length ? copy.validation : ''}</p>
          <div className="flex flex-wrap gap-3"><Button type="button" variant="ghost" onClick={() => dispatch({ type: 'BACK' })} className="motion-reduce:transition-none">{state.reviewReturnTarget ? copy.backReview : copy.backShape}</Button><Button type="submit" className="grow motion-reduce:transition-none">{state.reviewReturnTarget ? copy.returnReview : copy.detailsNext}</Button></div>
        </fieldset>
      </form><BuilderGuide state={state} dispatch={dispatch} locale={language} copy={copy} step="details" /></div>
      <LiveSketch state={state} copy={copy} locale={language} />
    </div>
  </section>;
}
