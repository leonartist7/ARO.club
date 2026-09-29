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
  },
  {
    id: 'share',
    icon: Compass,
    tone: 'border-primary-400 bg-primary-600 text-white',
    softTone: 'bg-primary-500/15',
  },
  {
    id: 'gather',
    icon: UsersRound,
    tone: 'border-moss/70 bg-moss text-white',
    softTone: 'bg-moss/15',
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

function CompositionField({ config, mode, copy }) {
  const Icon = config.icon;

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-ink/10 bg-white px-5 py-6 dark:border-bone/10 dark:bg-ink sm:px-8 sm:py-8" aria-label={copy.create.possibleShape}>
      <div className={`pointer-events-none absolute inset-0 ${config.softTone}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-85" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-bone/10" />
        <div className="absolute -right-24 bottom-[-8rem] h-96 w-96 rounded-full border border-bone/10" />
        <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M120 135 C330 136 340 280 500 312 C664 343 668 142 880 124" fill="none" stroke="rgba(246,240,230,0.18)" strokeDasharray="4 12" strokeWidth="2" />
          <path d="M126 489 C308 460 369 381 500 312 C639 240 737 464 884 482" fill="none" stroke="rgba(246,240,230,0.16)" strokeDasharray="4 12" strokeWidth="2" />
          <circle cx="500" cy="312" r="130" fill="none" stroke="rgba(245,130,32,0.3)" strokeWidth="1" />
          <circle cx="500" cy="312" r="190" fill="none" stroke="rgba(246,240,230,0.12)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-secondary-100">{copy.create.possibleShape}</p><p className="mt-2 max-w-[260px] text-base leading-6 text-ink dark:text-bone">{copy.create.possibleShapeBody}</p></div><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${config.tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span></div>

      <div className="relative mt-6 grid grid-cols-2 gap-3">{mode.ingredients.map((ingredient) => <Ingredient key={ingredient.label} ingredient={ingredient} />)}</div>

      <div className="relative z-10 mx-auto my-7 flex h-48 w-48 flex-col items-center justify-center rounded-full border-[10px] border-secondary-300 bg-bone px-4 text-center text-ink shadow-[0_0_0_8px_rgba(244,208,0,0.14),0_24px_55px_rgba(0,0,0,0.32)] sm:h-48 sm:w-48">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">{copy.create.mightBecome}</p>
        <p className="mt-2 font-display text-xl leading-tight sm:text-2xl">{mode.outcome}</p>
      </div>

      <p className="relative z-10 text-center text-base leading-6 text-ink dark:text-bone">{copy.create.localOnly}</p>
    </section>
  );
}

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
  const selectMode = (mode) => {
    setActiveModeId(mode);
    requestAnimationFrame(() => {
      compositionRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      compositionRef.current?.focus({ preventScroll: true });
    });
  };
  const activeConfig = seedModeLayout.find((mode) => mode.id === activeModeId) ?? seedModeLayout[0];
  const activeMode = copy.create.modes[activeConfig.id];

  return (
    <div lang={language} className="min-h-[calc(100vh-5rem)] bg-bone px-4 py-5 text-ink dark:bg-plum dark:text-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px]">
        <Link to="/app/world" aria-label={copy.create.closeToWorld} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-ink dark:text-bone transition hover:text-primary-800 dark:hover:text-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.create.backToWorld}</Link>

        <header className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-secondary-100">{copy.create.eyebrow}</p><h1 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-[1.08] tracking-[-0.035em] sm:text-6xl">{copy.create.title}</h1></div><p className="max-w-xl text-base leading-7 text-ink dark:text-bone">{copy.create.intro}</p></header>

        <nav className="mt-5 grid gap-3 sm:grid-cols-3" aria-label={journey.appTitle}>
          <Link to="/app/opportunities" className="flex min-h-11 items-center justify-between gap-2 rounded-2xl border border-ink/15 bg-white dark:border-bone/20 dark:bg-bone/10 p-4 font-bold text-ink dark:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300">{journey.find}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></Link>
          <button type="button" onClick={() => selectMode('share')} aria-pressed={activeModeId === 'share'} aria-controls="seed-studio-composition" className={`flex min-h-11 items-center justify-between gap-2 rounded-2xl border p-4 text-left font-bold text-ink dark:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300 ${activeModeId === 'share' ? 'border-primary-700 bg-primary-50 dark:border-secondary-300 dark:bg-bone/20' : 'border-ink/15 bg-white dark:border-bone/20 dark:bg-bone/10'}`}>{journey.teach}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></button>
          <button type="button" onClick={() => selectMode('gather')} aria-pressed={activeModeId === 'gather'} aria-controls="seed-studio-composition" className={`flex min-h-11 items-center justify-between gap-2 rounded-2xl border p-4 text-left font-bold text-ink dark:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300 ${activeModeId === 'gather' ? 'border-primary-700 bg-primary-50 dark:border-secondary-300 dark:bg-bone/20' : 'border-ink/15 bg-white dark:border-bone/20 dark:bg-bone/10'}`}>{journey.gather}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></button>
        </nav>

        <section className="mt-7 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 sm:gap-3" aria-label={copy.create.eyebrow}>{seedModeLayout.map((config) => <SeedChoice key={config.id} config={config} mode={copy.create.modes[config.id]} isActive={config.id === activeModeId} onSelect={setActiveModeId} />)}</section>

        <section id="seed-studio-composition" ref={compositionRef} tabIndex={-1} className="mt-7 grid scroll-mt-32 gap-5 rounded-2xl outline-none focus:ring-2 focus:ring-primary-700 dark:focus:ring-secondary-300 focus:ring-offset-4 focus:ring-offset-bone dark:focus:ring-offset-ink lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center" aria-label={`${copy.create.possibleShape}: ${activeMode.label}`}><CompositionField config={activeConfig} mode={activeMode} copy={copy} /><aside className="rounded-[2rem] border border-ink/10 bg-white p-6 dark:border-bone/10 dark:bg-bone/[0.05] sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-secondary-100">{copy.create.seedEyebrow}</p><p className="mt-4 font-display text-3xl leading-tight">“{activeMode.seed}”</p><p className="mt-5 text-base leading-7 text-ink dark:text-bone">{activeMode.copy}</p><div className="mt-8 border-t border-ink/10 dark:border-bone/10 pt-5"><p className="flex items-start gap-3 text-base leading-6 text-ink dark:text-bone"><HeartHandshake className="mt-1 h-4 w-4 shrink-0 text-primary-700 dark:text-secondary-100" aria-hidden="true" /> {copy.create.futureRole}</p></div></aside></section>

        <section className="mt-10 flex flex-col gap-5 border-t border-ink/10 dark:border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-base leading-6 text-ink dark:text-bone">{copy.create.boundary}</p><Link to="/app/world" className="inline-flex min-h-11 items-center gap-2 self-start px-1 font-bold text-primary-700 dark:text-secondary-100 transition hover:text-primary-800 dark:hover:text-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-secondary-300">{copy.create.returnWorld} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
      </div>
    </div>
  );
}
