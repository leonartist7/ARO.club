import { useState } from 'react';
import { ArrowUpRight, Compass, Crosshair, MapPin, Navigation, Radio, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { opportunities } from '../data/aroApp';
import { StatusPill } from '../components/app/AppPrimitives';
import { AppImage } from '../components/app/AppImage';
import { useLanguage } from '../contexts/LanguageContext';
import { getDiscoveryFormationStatus, getFv1DiscoveryCopy } from '../i18n/fv1/discovery';

const signalLayout = [
  { id: 'shared-stories', x: 52, y: 30, tone: 'saffron' },
  { id: 'river-photo-walk', x: 38, y: 52, tone: 'clay' },
  { id: 'repair-table', x: 74, y: 42, tone: 'moss' },
];

const miniatureSignals = signalLayout.map((layout) => ({
  ...opportunities.find((opportunity) => opportunity.id === layout.id),
  ...layout,
}));

function SignalMarker({ signal, active, onSelect, copy }) {
  const toneClasses = {
    clay: 'bg-primary-600 text-white shadow-[0_0_0_8px_rgba(190,50,25,0.16),0_10px_22px_rgba(78,24,12,0.35)]',
    saffron: 'bg-secondary-300 text-ink shadow-[0_0_0_8px_rgba(239,193,75,0.17),0_10px_22px_rgba(78,58,12,0.28)]',
    moss: 'bg-moss text-white shadow-[0_0_0_8px_rgba(104,115,90,0.17),0_10px_22px_rgba(31,43,28,0.32)]',
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={copy.opportunities.openExample(signal.title)}
      onClick={() => onSelect(signal.id)}
      className="group absolute z-20 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      style={{ left: `${signal.x}%`, top: `${signal.y}%` }}
    >
      <span className={`relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white/90 transition duration-300 motion-reduce:transition-none ${toneClasses[signal.tone]} ${active ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
        {active && <span className="absolute inset-[-13px] rounded-full border border-current/70 animate-ping motion-reduce:animate-none" aria-hidden="true" />}
        <span className="relative text-sm font-extrabold">{signal.exampleCount}</span>
      </span>
      <span className={`absolute left-1/2 top-[calc(100%+0.65rem)] w-max -translate-x-1/2 border border-white/50 bg-ink/95 px-3 py-2 text-xs font-bold tracking-wide text-bone shadow-lg backdrop-blur-md transition duration-200 motion-reduce:transition-none ${active ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
        {copy.world.landmarks[signal.id]}
      </span>
    </button>
  );
}

function LivingMiniature({ activeSignal, onSelect, onCenter, copy }) {
  const formationStatus = getDiscoveryFormationStatus(copy, activeSignal);

  return (
    <div className="relative isolate overflow-hidden bg-[#293735]" style={{ minHeight: 'clamp(560px, 58vw, 700px)' }}>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <AppImage
          src="/aro-living-miniature-calgary-v1.png"
          alt=""
          variant="hero"
          cropClass="scale-[1.06]"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,28,25,0.58)_0%,rgba(24,28,25,0.08)_34%,rgba(24,28,25,0.28)_68%,rgba(24,28,25,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_30%,rgba(13,19,18,0.42)_100%)]" />
      </div>

      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {miniatureSignals.map((signal) => (
          <path
            key={signal.id}
            d={`M 50 55 Q ${(50 + signal.x) / 2} ${(55 + signal.y) / 2 - 10} ${signal.x} ${signal.y}`}
            className={`aro-signal-path ${activeSignal.id === signal.id ? 'is-active' : ''}`}
          />
        ))}
        <circle cx="50" cy="55" r="1.4" fill="rgb(246 240 230 / 0.95)" />
      </svg>

      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-6">
        <div className="border border-white/30 bg-ink/90 px-3 py-3 text-bone shadow-lg backdrop-blur-md">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary-100"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-70 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-300" /></span> {copy.world.fieldEyebrow}</p>
          <p className="mt-1 text-base font-bold">{copy.world.fieldTitle}</p>
        </div>
        <button type="button" onClick={onCenter} aria-label={copy.world.resetView} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-ink/90 text-bone shadow-lg backdrop-blur-md transition hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200"><Crosshair className="h-4 w-4" aria-hidden="true" /></button>
      </div>

      <div className="absolute left-4 z-20 hidden max-w-[220px] border-l border-secondary-200 pl-3 text-bone drop-shadow-lg sm:block" style={{ top: '29%' }}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-100">{copy.world.guideEyebrow}</p>
        <p className="mt-2 font-display text-2xl leading-[1.05] text-bone">{copy.world.guideTitle}</p>
      </div>

      {miniatureSignals.map((signal) => <SignalMarker key={signal.id} signal={signal} active={activeSignal.id === signal.id} onSelect={onSelect} copy={copy} />)}

      <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5">
        <div data-fv1-world-card className="relative mx-auto overflow-hidden rounded-2xl border border-white p-4 text-ink shadow-[0_18px_48px_rgba(11,19,17,0.38)] sm:p-5" style={{ maxWidth: '31rem', backgroundColor: '#F6F0E6' }}>
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><StatusPill tone="neutral">{copy.fictionalLabel}</StatusPill><span className="text-xs font-bold uppercase tracking-[0.14em] text-ink/70">{activeSignal.area}</span></div>
              <h2 className="mt-2.5 font-display text-xl leading-[0.98] tracking-[-0.02em] sm:text-2xl">{activeSignal.title}</h2>
              <p data-fv1-world-card-copy className="mt-3 max-w-md text-base leading-6 text-ink/80">{formationStatus}</p>
            </div>
            <div className="shrink-0 rounded-xl border border-ink/15 bg-white px-3 py-2 text-center"><p className="text-xl font-extrabold leading-none text-primary-700">{activeSignal.exampleCount}/{activeSignal.capacity}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-ink/70">{copy.exampleMinimum(activeSignal.minimum)}</p></div>
          </div>
          <div className="relative mt-4 flex flex-col gap-3 border-t border-ink/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex min-w-0 items-center gap-2 text-base font-semibold text-ink/75"><MapPin className="h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />{activeSignal.place}</span>
            <Link data-fv1-world-card-cta to={`/app/opportunities/${activeSignal.id}`} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-[0_7px_16px_rgba(153,39,22,0.24)] transition hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-800 focus-visible:ring-offset-2">{copy.world.openExample} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppWorldPage() {
  const { language } = useLanguage();
  const copy = getFv1DiscoveryCopy(language);
  const [activeSignalId, setActiveSignalId] = useState('river-photo-walk');
  const activeSignal = miniatureSignals.find((signal) => signal.id === activeSignalId) ?? miniatureSignals[0];

  return (
    <div className="px-4 pb-5 pt-6 sm:px-8 sm:pt-9">
      <section aria-labelledby="world-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300"><Sparkles className="h-4 w-4" aria-hidden="true" /> {copy.world.eyebrow}</p>
            <h1 id="world-title" className="mt-2 max-w-xl font-display text-4xl leading-[0.92] tracking-[-0.03em] sm:text-5xl">{copy.world.title}</h1>
          </div>
          <p className="flex max-w-md items-start gap-2 text-base font-semibold leading-6 text-ink/70 dark:text-bone/75"><Compass className="mt-1 h-4 w-4 shrink-0 text-secondary-600 dark:text-secondary-300" aria-hidden="true" /> {copy.world.instruction}</p>
        </div>

        <div className="mt-7 overflow-hidden border border-ink/10 shadow-[0_18px_45px_rgba(40,36,32,0.12)] dark:border-bone/10">
          <LivingMiniature activeSignal={activeSignal} onSelect={setActiveSignalId} onCenter={() => setActiveSignalId('river-photo-walk')} copy={copy} />
        </div>
      </section>

      <section className="mt-8 border-y border-ink/10 py-5 dark:border-bone/10" aria-labelledby="signals-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/65 dark:text-bone/70">{copy.world.changingEyebrow}</p><h2 id="signals-title" className="mt-1 font-display text-2xl">{copy.world.examplesTitle}</h2></div><Link to="/app/opportunities" className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-bold text-primary-700 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.world.allExamples} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="mt-5 grid gap-x-6 gap-y-2 md:grid-cols-3">
          {miniatureSignals.map((signal) => (
            <button key={signal.id} type="button" aria-pressed={activeSignal.id === signal.id} onClick={() => setActiveSignalId(signal.id)} className={`flex min-h-16 items-center gap-3 border-l-2 px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${activeSignal.id === signal.id ? 'border-primary-500 bg-primary-50/80 dark:bg-primary-900/15' : 'border-ink/10 hover:border-secondary-400 hover:bg-secondary-50/60 dark:border-bone/10 dark:hover:bg-secondary-900/10'}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-bone dark:bg-bone dark:text-ink">{signal.exampleCount}</span>
              <span className="min-w-0"><span className="block text-base font-bold">{copy.world.landmarks[signal.id]}</span><span className="mt-1 flex items-start gap-1.5 text-base leading-5 text-ink/70 dark:text-bone/75"><UsersRound className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{copy.examplePlaces(signal.exampleCount, signal.capacity)} · {copy.exampleMinimum(signal.minimum)}</span></span></span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-ink px-5 py-6 text-bone sm:px-7"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary-100"><Radio className="h-4 w-4" aria-hidden="true" /> {copy.world.whyEyebrow}</p><p className="mt-3 max-w-md font-display text-2xl leading-[1.08] text-bone">{copy.world.whyBody}</p></div>
        <Link to="/app/create" className="group border border-ink/10 bg-secondary-50 px-5 py-6 transition hover:border-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 dark:border-bone/10 dark:bg-secondary-900/10 sm:px-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-700 dark:text-secondary-300">{copy.world.seedEyebrow}</p><p className="mt-3 font-display text-2xl leading-[1.08]">{copy.world.seedTitle}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700 group-hover:text-primary-500 dark:text-primary-300">{copy.world.openSeedStudio} <Navigation className="h-4 w-4" aria-hidden="true" /></span></Link>
      </section>
    </div>
  );
}
