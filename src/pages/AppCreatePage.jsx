import { useState } from 'react';
import { ArrowLeft, ArrowRight, Compass, HeartHandshake, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFv1DiscoveryCopy } from '../i18n/fv1/discovery';

const seedModeLayout = [
  {
    id: 'learn',
    icon: Sparkles,
    tone: 'border-secondary-200 bg-secondary-300 text-ink',
    softTone: 'bg-secondary-300/15',
    positions: ['left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]', 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]', 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]', 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]'],
  },
  {
    id: 'share',
    icon: Compass,
    tone: 'border-primary-400 bg-primary-600 text-white',
    softTone: 'bg-primary-500/15',
    positions: ['left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]', 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]', 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]', 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]'],
  },
  {
    id: 'gather',
    icon: UsersRound,
    tone: 'border-moss/70 bg-moss text-white',
    softTone: 'bg-moss/15',
    positions: ['left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]', 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]', 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]', 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]'],
  },
];

function SeedChoice({ config, mode, isActive, onSelect }) {
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(config.id)}
      aria-pressed={isActive}
      className={`group relative min-h-[132px] overflow-hidden border p-5 text-left transition duration-300 motion-reduce:transition-none sm:p-6 ${isActive ? 'border-bone/40 bg-bone/15 shadow-[0_16px_35px_rgba(0,0,0,0.18)]' : 'border-bone/10 bg-bone/[0.035] hover:border-bone/25 hover:bg-bone/[0.07]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300`}
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${config.tone}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-bone/70">{mode.eyebrow}</p>
      <p className="mt-1 font-display text-3xl leading-none">{mode.label}</p>
      {isActive && <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary-300" aria-hidden="true" />}
    </button>
  );
}

function Ingredient({ ingredient, position }) {
  return (
    <div className={`absolute z-10 max-w-[132px] rounded-2xl border border-bone/20 bg-ink/90 p-3 shadow-[0_12px_25px_rgba(0,0,0,0.2)] backdrop-blur-md ${position}`}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary-100">{ingredient.label}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-bone">{ingredient.value}</p>
    </div>
  );
}

function CompositionField({ config, mode, copy }) {
  const Icon = config.icon;

  return (
    <section className="relative isolate min-h-[590px] overflow-hidden border border-bone/10 bg-ink px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:min-h-[620px] sm:px-8 sm:py-8" aria-label={copy.create.possibleShape}>
      <div className={`pointer-events-none absolute inset-0 ${config.softTone}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-85" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-bone/10" />
        <div className="absolute -right-24 bottom-[-8rem] h-96 w-96 rounded-full border border-bone/10" />
        <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M120 135 C330 136 340 280 500 312 C664 343 668 142 880 124" fill="none" stroke="rgba(246,240,230,0.18)" strokeDasharray="4 12" strokeWidth="2" />
          <path d="M126 489 C308 460 369 381 500 312 C639 240 737 464 884 482" fill="none" stroke="rgba(246,240,230,0.16)" strokeDasharray="4 12" strokeWidth="2" />
          <circle cx="500" cy="312" r="130" fill="none" stroke="rgba(239,193,75,0.3)" strokeWidth="1" />
          <circle cx="500" cy="312" r="190" fill="none" stroke="rgba(246,240,230,0.12)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-100">{copy.create.possibleShape}</p><p className="mt-2 max-w-[260px] text-base leading-6 text-bone">{copy.create.possibleShapeBody}</p></div><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${config.tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span></div>

      {mode.ingredients.map((ingredient, index) => <Ingredient key={ingredient.label} ingredient={ingredient} position={config.positions[index]} />)}

      <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[10px] border-secondary-300 bg-bone px-4 text-center text-ink shadow-[0_0_0_8px_rgba(222,67,37,0.14),0_24px_55px_rgba(0,0,0,0.32)] sm:h-48 sm:w-48">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">{copy.create.mightBecome}</p>
        <p className="mt-2 font-display text-xl leading-[0.95] sm:text-2xl">{mode.outcome}</p>
      </div>

      <p className="absolute inset-x-5 bottom-5 z-10 text-center text-base leading-6 text-bone sm:bottom-7">{copy.create.localOnly}</p>
    </section>
  );
}

export default function AppCreatePage() {
  const copy = getFv1DiscoveryCopy(localStorage.getItem('conversa-language') ?? 'en');
  const [activeModeId, setActiveModeId] = useState('learn');
  const activeConfig = seedModeLayout.find((mode) => mode.id === activeModeId) ?? seedModeLayout[0];
  const activeMode = copy.create.modes[activeConfig.id];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-ink px-4 py-7 text-bone dark:bg-plum sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px]">
        <Link to="/app/world" aria-label={copy.create.closeToWorld} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-bone transition hover:text-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.create.backToWorld}</Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-100">{copy.create.eyebrow}</p><h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">{copy.create.title}</h1></div><p className="max-w-xl text-base leading-7 text-bone">{copy.create.intro}</p></header>

        <section className="mt-10 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-3" aria-label={copy.create.eyebrow}>{seedModeLayout.map((config) => <SeedChoice key={config.id} config={config} mode={copy.create.modes[config.id]} isActive={config.id === activeModeId} onSelect={setActiveModeId} />)}</section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center"><CompositionField config={activeConfig} mode={activeMode} copy={copy} /><aside className="border border-bone/10 bg-bone/[0.05] p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-100">{copy.create.seedEyebrow}</p><p className="mt-4 font-display text-3xl leading-[0.98]">“{activeMode.seed}”</p><p className="mt-5 text-base leading-7 text-bone">{activeMode.copy}</p><div className="mt-8 border-t border-bone/10 pt-5"><p className="flex items-start gap-3 text-base leading-6 text-bone"><HeartHandshake className="mt-1 h-4 w-4 shrink-0 text-secondary-100" aria-hidden="true" /> {copy.create.futureRole}</p></div></aside></section>

        <section className="mt-10 flex flex-col gap-5 border-t border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-base leading-6 text-bone">{copy.create.boundary}</p><Link to="/app/world" className="inline-flex min-h-11 items-center gap-2 self-start px-1 font-bold text-secondary-100 transition hover:text-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">{copy.create.returnWorld} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
      </div>
    </div>
  );
}
