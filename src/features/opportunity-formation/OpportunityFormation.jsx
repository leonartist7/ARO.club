import { useEffect, useReducer, useRef, useState } from 'react';
import { ArrowRight, Check, Pencil, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ANCHORS, FIXTURES_BY_ANCHOR, fixtureFor } from './fixtures';
import {
  FORMATION_STATUS,
  createInitialFormationState,
  formationReducer,
} from './formationMachine';

const ANCHOR_KEYS = {
  want: {
    number: '01',
    titleKey: 'home.formation.anchors.want.title',
    promptKey: 'home.formation.anchors.want.prompt',
  },
  bring: {
    number: '02',
    titleKey: 'home.formation.anchors.bring.title',
    promptKey: 'home.formation.anchors.bring.prompt',
  },
  context: {
    number: '03',
    titleKey: 'home.formation.anchors.context.title',
    promptKey: 'home.formation.anchors.context.prompt',
  },
};

const STATUS_KEYS = {
  [FORMATION_STATUS.INTRO]: 'home.formation.status.intro',
  [FORMATION_STATUS.SIGNALS_PARTIAL]: 'home.formation.status.partial',
  [FORMATION_STATUS.READY_TO_FORM]: 'home.formation.status.ready',
  [FORMATION_STATUS.FORMING]: 'home.formation.status.forming',
  [FORMATION_STATUS.FORMED]: 'home.formation.status.formed',
  [FORMATION_STATUS.EDITING]: 'home.formation.status.editing',
};

const SEMANTIC_KEYS = [
  'home.formation.field.semanticEmpty',
  'home.formation.field.semanticOne',
  'home.formation.field.semanticTwo',
  'home.formation.field.semanticThree',
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  );

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

function SignalControl({ anchor, selectedId, validationAnchor, onSelect, onClear, firstInputRef }) {
  const { t } = useLanguage();
  const details = ANCHOR_KEYS[anchor];
  const selected = fixtureFor(anchor, selectedId);
  const hasValidation = validationAnchor === anchor;

  return (
    <fieldset
      className="border-t border-ink/15 py-5 first:border-t-0 dark:border-bone/15"
      data-testid={`signal-${anchor}`}
    >
      <legend className="sr-only">{t(details.titleKey)}</legend>
      <div className="flex items-start gap-4">
        <span className="mt-1 font-sans text-xs font-bold tracking-[0.2em] text-primary-700 dark:text-primary-300" aria-hidden="true">
          {details.number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex min-h-11 flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-ink dark:text-bone">
                {t(details.titleKey)}
              </h3>
              <p className="mt-1 text-base leading-6 text-ink/60 dark:text-bone/60">
                {t(details.promptKey)}
              </p>
            </div>
            {selected ? (
              <button
                type="button"
                onClick={() => onClear(anchor)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/15 text-ink/65 transition-colors hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-bone/20 dark:text-bone/70 dark:focus-visible:ring-offset-gray-950"
                aria-label={`${t('home.formation.actions.clear')} ${t(details.titleKey)}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={t(details.titleKey)}>
            {FIXTURES_BY_ANCHOR[anchor].map((fixture, index) => {
              const active = fixture.id === selectedId;
              return (
                <label
                  key={fixture.id}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-left text-sm font-semibold leading-5 transition-[border-color,background-color,color,transform] focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-950 ${
                    active
                      ? 'border-primary-600 bg-primary-600 text-white shadow-[0_8px_24px_rgb(190_50_25_/_0.2)]'
                      : 'border-ink/15 bg-bone/70 text-ink hover:-translate-y-0.5 hover:border-primary-400 dark:border-bone/20 dark:bg-gray-950/60 dark:text-bone'
                  }`}
                >
                  <input
                    ref={index === 0 ? firstInputRef : undefined}
                    className="sr-only"
                    type="radio"
                    name={`formation-${anchor}`}
                    value={fixture.id}
                    checked={active}
                    onChange={() => onSelect(anchor, fixture.id)}
                  />
                  {active ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                  <span>{t(fixture.labelKey)}</span>
                </label>
              );
            })}
          </div>

          {hasValidation ? (
            <p className="mt-3 text-base font-semibold text-primary-800 dark:text-primary-200" role="alert">
              {t('home.formation.validation.chooseAgain')} {t(details.titleKey)}.
            </p>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}

function FormationField({ state }) {
  const { t } = useLanguage();
  const isForming = state.status === FORMATION_STATUS.FORMING;
  const isFormed = state.status === FORMATION_STATUS.FORMED;
  const selectedCount = ANCHORS.filter((anchor) => state.selection[anchor]).length;

  return (
    <figure
      className="relative mx-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-ink/15 bg-ink text-bone shadow-[0_32px_90px_rgb(40_36_32_/_0.22)] dark:border-bone/15 dark:bg-plum sm:aspect-square"
      aria-labelledby="formation-field-caption"
      data-testid="formation-field"
    >
      <div className="aro-field-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-[12%] rounded-full border border-bone/10" aria-hidden="true" />
      <div className="absolute inset-[25%] rounded-full border border-dashed border-secondary-300/35" aria-hidden="true" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" aria-hidden="true">
        <path className={state.selection.want ? 'aro-signal-path is-active' : 'aro-signal-path'} d="M152 145 C230 190 250 245 300 300" />
        <path className={state.selection.bring ? 'aro-signal-path is-active' : 'aro-signal-path'} d="M448 145 C370 190 350 245 300 300" />
        <path className={state.selection.context ? 'aro-signal-path is-active' : 'aro-signal-path'} d="M300 485 C300 405 300 370 300 300" />
      </svg>

      {ANCHORS.map((anchor) => {
        const selected = fixtureFor(anchor, state.selection[anchor]);
        const positions = {
          want: 'left-[4%] top-[9%] sm:left-[8%] sm:top-[12%]',
          bring: 'right-[4%] top-[9%] sm:right-[8%] sm:top-[12%]',
          context: 'bottom-[7%] left-1/2 -translate-x-1/2 sm:bottom-[8%]',
        };
        return (
          <div
            key={anchor}
            data-testid={`field-anchor-${anchor}`}
            className={`absolute z-10 max-w-[44%] rounded-2xl border px-3 py-3 text-center text-xs leading-5 shadow-lg backdrop-blur sm:px-4 sm:text-sm ${positions[anchor]} ${
              selected
                ? 'border-secondary-300/70 bg-bone text-ink'
                : 'border-bone/15 bg-ink/70 text-bone/55 dark:bg-plum/75'
            }`}
          >
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-65">
              {t(ANCHOR_KEYS[anchor].titleKey)}
            </span>
            <span className="mt-1 block font-semibold">
              {selected ? t(selected.labelKey) : t('home.formation.field.awaiting')}
            </span>
          </div>
        );
      })}

      <div
        className={`aro-aperture absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center sm:h-48 sm:w-48 ${
          isFormed
            ? 'is-formed border-secondary-200 bg-bone text-ink'
            : isForming
              ? 'is-forming border-secondary-300 bg-primary-600 text-white'
              : 'border-bone/20 bg-ink/80 text-bone dark:bg-plum/85'
        }`}
      >
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-65">
          {t('home.formation.field.aperture')}
        </span>
        <strong className="mt-2 max-w-[8rem] font-display text-xl font-normal leading-tight sm:text-2xl">
          {isFormed && state.result
            ? t(state.result.titleKey)
            : isForming
              ? t('home.formation.field.forming')
              : `${selectedCount} / 3`}
        </strong>
      </div>

      <figcaption id="formation-field-caption" className="absolute bottom-3 left-4 right-4 text-center text-xs text-bone/55 sm:bottom-5">
        {t(SEMANTIC_KEYS[selectedCount])}
      </figcaption>
    </figure>
  );
}

function FormedResult({ result, onEdit, onReset }) {
  const { t } = useLanguage();

  return (
    <section
      className="mt-6 border-y border-ink/15 py-7 dark:border-bone/15"
      aria-labelledby="formed-opportunity-title"
      data-testid="formed-result"
    >
      <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
            {t('home.formation.result.prototypeLabel')}
          </p>
          <h3 id="formed-opportunity-title" className="mt-3 font-display text-4xl leading-[1.05] text-ink dark:text-bone md:text-5xl">
            {t(result.titleKey)}
          </h3>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['people', result.peopleKey],
              ['place', result.placeKey],
              ['time', result.timeKey],
            ].map(([key, valueKey]) => (
              <div key={key} className="border-l-2 border-secondary-400 pl-4">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink/55 dark:text-bone/55">
                  {t(`home.formation.result.${key}`)}
                </dt>
                <dd className="mt-1 text-base font-semibold text-ink dark:text-bone">{t(valueKey)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 text-sm font-bold text-ink transition-colors hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-bone/20 dark:text-bone dark:focus-visible:ring-offset-gray-950"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            {t('home.formation.actions.edit')}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 text-sm font-bold text-ink transition-colors hover:border-primary-500 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-bone/20 dark:text-bone dark:focus-visible:ring-offset-gray-950"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t('home.formation.actions.reset')}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-primary-600 p-6 text-white sm:p-7" data-testid="formation-rationale-intro">
          <Sparkles className="h-5 w-5 text-secondary-200" aria-hidden="true" />
          <p className="mt-5 font-display text-2xl leading-tight">{t('home.formation.result.whyTitle')}</p>
          <p className="mt-3 text-base leading-7 text-white" data-testid="formation-rationale-explanation">
            {t('home.formation.result.whyIntro')}
          </p>
        </div>
        <ol className="divide-y divide-ink/10 border-y border-ink/10 dark:divide-bone/10 dark:border-bone/10">
          {result.rationaleKeys.map((key, index) => (
            <li key={key} className="grid grid-cols-[2rem_1fr] gap-3 py-4 text-base leading-7 text-ink/75 dark:text-bone/75">
              <span className="font-bold text-primary-700 dark:text-primary-300">0{index + 1}</span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex items-start gap-3 bg-secondary-50 px-5 py-4 text-base leading-7 text-ink dark:bg-secondary-900/20 dark:text-bone">
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-300" aria-hidden="true" />
        <p><strong>{t('home.formation.result.nextTitle')}</strong> {t('home.formation.result.nextBody')}</p>
      </div>
    </section>
  );
}

export default function OpportunityFormation() {
  const { t } = useLanguage();
  const [state, dispatch] = useReducer(formationReducer, undefined, createInitialFormationState);
  const reducedMotion = usePrefersReducedMotion();
  const firstSignalRef = useRef(null);

  useEffect(() => {
    if (state.status !== FORMATION_STATUS.READY_TO_FORM) return undefined;
    dispatch({ type: 'BEGIN_FORM' });
    return undefined;
  }, [state.status, state.revision]);

  useEffect(() => {
    if (state.status !== FORMATION_STATUS.FORMING) return undefined;
    const timer = window.setTimeout(
      () => dispatch({ type: 'COMPLETE_FORM' }),
      reducedMotion ? 0 : 240
    );
    return () => window.clearTimeout(timer);
  }, [reducedMotion, state.status, state.revision]);

  const selectSignal = (anchor, id) => dispatch({ type: 'SELECT_SIGNAL', anchor, id });
  const clearSignal = (anchor) => dispatch({ type: 'CLEAR_SIGNAL', anchor });
  const editSignals = () => {
    firstSignalRef.current?.focus();
    dispatch({ type: 'START_EDIT' });
  };
  const resetSignals = () => {
    firstSignalRef.current?.focus();
    dispatch({ type: 'RESET' });
  };
  const isFormed = state.status === FORMATION_STATUS.FORMED && state.result;

  const announcement = isFormed
    ? `${t('home.formation.result.announcement')} ${t(state.result.titleKey)}. ${t(state.result.peopleKey)}. ${t(state.result.placeKey)}. ${t(state.result.timeKey)}.`
    : '';

  return (
    <section className="mt-10" data-testid="opportunity-formation" aria-labelledby="opportunity-formation-title">
      <h2 id="opportunity-formation-title" className="sr-only">
        {t('home.formation.heading')}
      </h2>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-12">
        <div className="order-2 lg:order-1">
          <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-4 dark:border-bone/15">
            <p className="text-base font-semibold text-ink/65 dark:text-bone/65">
              {t('home.formation.instructions')}
            </p>
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-primary-700 dark:text-primary-300" data-testid="formation-status">
              {t(STATUS_KEYS[state.status])}
            </p>
          </div>

          {ANCHORS.map((anchor) => (
            <SignalControl
              key={anchor}
              anchor={anchor}
              selectedId={state.selection[anchor]}
              validationAnchor={state.validationAnchor}
              onSelect={selectSignal}
              onClear={clearSignal}
              firstInputRef={anchor === 'want' ? firstSignalRef : undefined}
            />
          ))}

          {state.status === FORMATION_STATUS.EDITING ? (
            <p className="border-t border-ink/15 pt-4 text-base font-semibold text-primary-800 dark:border-bone/15 dark:text-primary-200">
              {t('home.formation.editingHint')}
            </p>
          ) : null}
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <FormationField state={state} />
        </div>
      </div>

      {isFormed ? (
        <FormedResult
          result={state.result}
          onEdit={editSignals}
          onReset={resetSignals}
        />
      ) : null}

      <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="formation-announcement">
        {announcement}
      </p>
    </section>
  );
}
