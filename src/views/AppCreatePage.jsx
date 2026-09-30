'use client';
import { useLanguage } from '../contexts/LanguageContext';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Compass, HeartHandshake, Sparkles, UsersRound } from 'lucide-react';
import { Link, useLocation } from '../lib/navigation';
import { getFv1DiscoveryCopy } from '../i18n/fv1/discovery';
import { rebrandJourneyCopy } from '../i18n/rebrandJourney';

const seedModeLayout = [
  {
    id: 'learn',
    icon: Sparkles,
    tone: 'border-secondary-200 bg-secondary-300 text-ink',
    softTone: 'bg-secondary-300/15',
    image: 'learn',
  },
  {
    id: 'share',
    icon: Compass,
    tone: 'border-primary-400 bg-primary-600 text-white',
    softTone: 'bg-primary-500/15',
    image: 'teach-language-v2',
  },
  {
    id: 'gather',
    icon: UsersRound,
    tone: 'border-moss/70 bg-moss text-white',
    softTone: 'bg-moss/15',
    image: 'connect',
  },
];

function SeedChoice({ config, mode, isActive, onSelect }) {
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(config.id)}
      aria-pressed={isActive}
      className={`group relative min-h-[132px] min-w-0 overflow-hidden rounded-2xl border p-2 text-left transition duration-300 motion-reduce:transition-none max-[389px]:flex max-[389px]:min-h-24 max-[389px]:items-center max-[389px]:gap-4 max-[389px]:p-4 sm:p-6 ${isActive ? 'border-primary-700 bg-primary-50 dark:border-bone/40 dark:bg-bone/15' : 'border-ink/15 bg-white hover:border-primary-700 dark:border-bone/10 dark:bg-bone/[0.035] dark:hover:border-bone/25 dark:hover:bg-bone/[0.07]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300`}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${config.tone}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <div>
      <p className="mt-4 text-[11px] font-bold leading-4 tracking-normal max-[389px]:mt-0 sm:text-xs sm:uppercase sm:tracking-[0.08em] text-ink/70 dark:text-bone/70">{mode.eyebrow}</p>
      <p className="mt-2 font-display text-base leading-tight sm:text-3xl">{mode.label}</p>
      </div>
      {isActive && <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary-300" aria-hidden="true" />}
    </button>
  );
}

function Ingredient({ ingredient }) {
  return (
    <div className="relative z-10 min-w-0 rounded-2xl border border-ink/10 bg-bone p-4 dark:border-bone/20 dark:bg-ink/90">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700 dark:text-secondary-100">{ingredient.label}</p>
      <p className="mt-1 text-base font-semibold leading-6 text-ink dark:text-bone">{ingredient.value}</p>
    </div>
  );
}

/**
 * Render the selected mode's illustration, example outcome and ingredients.
 * The supplied config, localized mode and copy describe a local preview.
 */
function CompositionField({ config, mode, copy }) {
  const Icon = config.icon;

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-ink/10 bg-white px-5 py-6 dark:border-bone/10 dark:bg-ink sm:px-8 sm:py-8" aria-label={copy.create.possibleShape}>
      <div className={`pointer-events-none absolute inset-0 ${config.softTone}`} aria-hidden="true" />
      <div className="relative z-10 flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-secondary-100">{copy.create.possibleShape}</p><p className="mt-2 max-w-[260px] text-base leading-6 text-ink dark:text-bone">{copy.create.possibleShapeBody}</p></div><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${config.tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span></div>

      <picture className="relative mt-6 block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-yellow/30 dark:bg-bone/10">
        <source srcSet={`/brand/onboarding-${config.image}-640.webp 640w, /brand/onboarding-${config.image}-1280.webp 1280w`} sizes="(min-width: 1024px) 55vw, 100vw" type="image/webp" />
        <img src={`/brand/onboarding-${config.image}-640.webp`} width="640" height="480" loading="lazy" decoding="async" alt="" className="h-full w-full object-contain" />
      </picture>

      <div className="relative z-10 mt-5 rounded-2xl bg-bone p-5 text-ink dark:bg-bone/10 dark:text-bone">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700 dark:text-secondary-100">{copy.create.mightBecome}</p>
        <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{mode.outcome}</p>
      </div>
      <div className="relative mt-6 grid grid-cols-2 gap-3">{mode.ingredients.map((ingredient) => <Ingredient key={ingredient.label} ingredient={ingredient} />)}</div>
      <p className="relative z-10 mt-5 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.create.localOnly}</p>
    </section>
  );
}

/**
 * Render the local Learn, Share or Gather example selected by the mode query.
 * Keep subsequent selections in component state and focus the composition.
 */
export default function AppCreatePage() {
  const language = useLanguage().language;
  const location = useLocation();
  const copy = getFv1DiscoveryCopy(language);
  const journey = rebrandJourneyCopy[language] ?? rebrandJourneyCopy.en;
  const [activeModeId, setActiveModeId] = useState(() => {
    const requestedMode = new URLSearchParams(location.search).get('mode');
    return seedModeLayout.some((mode) => mode.id === requestedMode) ? requestedMode : 'learn';
  });
  const compositionRef = useRef(null);
  const selectMode = (id) => {
    setActiveModeId(id);
    requestAnimationFrame(() => compositionRef.current?.focus());
  };
  const activeConfig = seedModeLayout.find((mode) => mode.id === activeModeId) ?? seedModeLayout[0];
  const activeMode = copy.create.modes[activeConfig.id];

  return (
    <div lang={language} className="min-h-[calc(100vh-5rem)] bg-bone px-4 py-5 text-ink dark:bg-plum dark:text-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px]">
        <Link to="/app/world" aria-label={copy.create.closeToWorld} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-ink dark:text-bone transition hover:text-primary-800 dark:hover:text-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.create.backToWorld}</Link>

        <header className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-secondary-100">{copy.create.eyebrow}</p><h1 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-[1.08] tracking-[-0.035em] sm:text-6xl">{copy.create.title}</h1></div><p className="max-w-xl text-base leading-7 text-ink dark:text-bone">{copy.create.intro}</p></header>

        <Link to="/app/opportunities" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-base font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:text-secondary-100 dark:focus-visible:ring-secondary-300">{journey.find}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>

        <section className="mt-7 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 sm:gap-3" aria-label={copy.create.eyebrow}>{seedModeLayout.map((config) => <SeedChoice key={config.id} config={config} mode={copy.create.modes[config.id]} isActive={config.id === activeModeId} onSelect={selectMode} />)}</section>

        <section id="seed-studio-composition" ref={compositionRef} tabIndex={-1} className="mt-7 grid scroll-mt-32 gap-5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center" aria-label={`${copy.create.possibleShape}: ${activeMode.label}`}><CompositionField config={activeConfig} mode={activeMode} copy={copy} /><aside className="rounded-[2rem] border border-ink/10 bg-white p-6 dark:border-bone/10 dark:bg-bone/[0.05] sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-secondary-100">{copy.create.seedEyebrow}</p><p className="mt-4 font-display text-3xl leading-tight">“{activeMode.seed}”</p><p className="mt-5 text-base leading-7 text-ink dark:text-bone">{activeMode.copy}</p><div className="mt-8 border-t border-ink/10 dark:border-bone/10 pt-5"><p className="flex items-start gap-3 text-base leading-6 text-ink dark:text-bone"><HeartHandshake className="mt-1 h-4 w-4 shrink-0 text-primary-700 dark:text-secondary-100" aria-hidden="true" /> {copy.create.futureRole}</p></div></aside></section>

        <section className="mt-10 flex flex-col gap-5 border-t border-ink/10 dark:border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-base leading-6 text-ink dark:text-bone">{copy.create.boundary}</p><Link to="/app/world" className="inline-flex min-h-11 items-center gap-2 self-start px-1 font-bold text-primary-700 dark:text-secondary-100 transition hover:text-primary-800 dark:hover:text-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300">{copy.create.returnWorld} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
      </div>
    </div>
  );
}
