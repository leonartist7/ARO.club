import { useState } from 'react';
import { ArrowUpRight, Compass, Crosshair, MapPin, Navigation, Radio, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { opportunities } from '../data/aroApp';
import { StatusPill } from '../components/app/AppPrimitives';

const miniatureSignals = [
  { ...opportunities[0], x: 52, y: 30, district: 'Inglewood', tone: 'saffron', landmark: 'The long table' },
  { ...opportunities[1], x: 38, y: 52, district: 'Sunnyside', tone: 'clay', landmark: 'River light' },
  { ...opportunities[2], x: 74, y: 42, district: 'East Village', tone: 'moss', landmark: 'The useful corner' },
];

function SignalMarker({ signal, active, onSelect }) {
  const toneClasses = {
    clay: 'bg-primary-500 text-white shadow-[0_0_0_8px_rgba(222,67,37,0.16),0_10px_22px_rgba(78,24,12,0.35)]',
    saffron: 'bg-secondary-300 text-ink shadow-[0_0_0_8px_rgba(239,193,75,0.17),0_10px_22px_rgba(78,58,12,0.28)]',
    moss: 'bg-moss text-white shadow-[0_0_0_8px_rgba(104,115,90,0.17),0_10px_22px_rgba(31,43,28,0.32)]',
  };

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Focus ${signal.title}`}
      onClick={() => onSelect(signal.id)}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
      style={{ left: `${signal.x}%`, top: `${signal.y}%` }}
    >
      <span className={`relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white/90 transition duration-300 motion-reduce:transition-none ${toneClasses[signal.tone]} ${active ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
        {active && <span className="absolute inset-[-13px] rounded-full border border-current/70 animate-ping motion-reduce:animate-none" aria-hidden="true" />}
        <span className="relative text-xs font-extrabold">{signal.people.split(' ')[0]}</span>
      </span>
      <span className={`absolute left-1/2 top-[calc(100%+0.65rem)] w-max -translate-x-1/2 border border-white/35 bg-ink/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-bone shadow-lg backdrop-blur-md transition duration-200 motion-reduce:transition-none ${active ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
        {signal.landmark}
      </span>
    </button>
  );
}

function LivingMiniature({ activeSignal, onSelect, onCenter }) {
  return (
    <div className="relative isolate overflow-hidden bg-[#293735]" style={{ minHeight: 'clamp(530px, 58vw, 680px)' }}>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/aro-living-miniature-calgary-v1.png"
          alt=""
          className="h-full w-full scale-[1.06] object-cover transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transformOrigin: `${activeSignal.x}% ${activeSignal.y}%` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,28,25,0.54)_0%,rgba(24,28,25,0.06)_34%,rgba(24,28,25,0.24)_68%,rgba(24,28,25,0.83)_100%)]" />
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
        <div className="border border-white/15 bg-ink/65 px-3 py-2.5 text-bone shadow-lg backdrop-blur-md">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-70 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-300" /></span> Living now</p>
          <p className="mt-1 text-sm font-bold">Calgary field · 3 signals</p>
        </div>
        <button type="button" onClick={onCenter} aria-label="Center the World miniature on the river" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/65 text-bone shadow-lg backdrop-blur-md transition hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"><Crosshair className="h-4 w-4" aria-hidden="true" /></button>
      </div>

      <div className="absolute left-4 z-20 hidden max-w-[180px] border-l border-secondary-300/70 pl-3 text-bone drop-shadow-lg sm:block" style={{ top: '29%' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">A city, listening</p>
        <p className="mt-2 font-display text-2xl leading-[0.95]">Follow the places that are beginning to glow.</p>
      </div>

      {miniatureSignals.map((signal) => <SignalMarker key={signal.id} signal={signal} active={activeSignal.id === signal.id} onSelect={onSelect} />)}

      <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5">
        <div className="relative mx-auto overflow-hidden rounded-2xl border border-white/55 p-4 text-ink shadow-[0_18px_48px_rgba(11,19,17,0.32)] backdrop-blur-2xl sm:p-4 dark:text-bone" style={{ maxWidth: '29rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(246,240,230,0.56))', WebkitBackdropFilter: 'blur(24px) saturate(130%)', backdropFilter: 'blur(24px) saturate(130%)' }}>
          <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-secondary-200/35 blur-2xl" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-16 left-1/3 h-24 w-24 rounded-full bg-primary-100/30 blur-2xl" aria-hidden="true" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><StatusPill tone={activeSignal.status}>{activeSignal.status}</StatusPill><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{activeSignal.district}</span></div>
              <h2 className="mt-2.5 font-display text-xl leading-[0.98] tracking-[-0.02em] sm:text-2xl">{activeSignal.title}</h2>
              <p className="mt-2 max-w-md text-[13px] leading-5 text-ink/65" style={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{activeSignal.signal}</p>
            </div>
            <div className="shrink-0 rounded-full border border-ink/10 bg-white/35 px-2.5 py-1.5 text-center"><p className="text-lg font-extrabold leading-none text-primary-600">{activeSignal.people.split(' ')[0]}</p><p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.11em] text-ink/45">joining</p></div>
          </div>
          <div className="relative mt-3 flex items-center justify-between gap-2 border-t border-white/60 pt-3">
            <span className="flex min-w-0 items-center gap-1.5 truncate text-[11px] font-semibold text-ink/60"><MapPin className="h-3.5 w-3.5 shrink-0 text-primary-500" aria-hidden="true" />{activeSignal.place}</span>
            <Link to={`/app/opportunities/${activeSignal.id}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-500 px-3 py-2 text-[11px] font-bold text-white shadow-[0_7px_16px_rgba(190,50,25,0.27)] transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">See opening <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppWorldPage() {
  const [activeSignalId, setActiveSignalId] = useState('river-photo-walk');
  const activeSignal = miniatureSignals.find((signal) => signal.id === activeSignalId) ?? miniatureSignals[0];

  return (
    <div className="px-4 pb-5 pt-6 sm:px-8 sm:pt-9">
      <section aria-labelledby="world-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Your World</p>
            <h1 id="world-title" className="mt-2 max-w-xl font-display text-4xl leading-[0.92] tracking-[-0.03em] sm:text-5xl">A small world with a pulse.</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink/55 dark:text-bone/55"><Compass className="h-4 w-4 text-secondary-500" aria-hidden="true" /> Tap a signal to see what is forming.</div>
        </div>

        <div className="mt-7 overflow-hidden border border-ink/10 shadow-[0_18px_45px_rgba(40,36,32,0.12)] dark:border-bone/10">
          <LivingMiniature activeSignal={activeSignal} onSelect={setActiveSignalId} onCenter={() => setActiveSignalId('river-photo-walk')} />
        </div>
      </section>

      <section className="mt-8 border-y border-ink/10 py-5 dark:border-bone/10" aria-labelledby="signals-title">
        <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45 dark:text-bone/45">The field is changing</p><h2 id="signals-title" className="mt-1 font-display text-2xl">Three invitations, one city.</h2></div><Link to="/app/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-500 dark:text-primary-300">All signals <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="mt-5 grid gap-x-6 gap-y-2 md:grid-cols-3">
          {miniatureSignals.map((signal) => (
            <button key={signal.id} type="button" onClick={() => setActiveSignalId(signal.id)} className={`flex min-h-16 items-center gap-3 border-l-2 px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${activeSignal.id === signal.id ? 'border-primary-500 bg-primary-50/80 dark:bg-primary-900/15' : 'border-ink/10 hover:border-secondary-400 hover:bg-secondary-50/60 dark:border-bone/10 dark:hover:bg-secondary-900/10'}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-extrabold text-bone dark:bg-bone dark:text-ink">{signal.people.split(' ')[0]}</span>
              <span className="min-w-0"><span className="block truncate text-sm font-bold">{signal.landmark}</span><span className="mt-0.5 flex items-center gap-1 text-xs text-ink/50 dark:text-bone/50"><UsersRound className="h-3.5 w-3.5" aria-hidden="true" />{signal.people}</span></span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-ink px-5 py-6 text-bone sm:px-7"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200"><Radio className="h-3.5 w-3.5" aria-hidden="true" /> Why this is here</p><p className="mt-3 max-w-md font-display text-2xl leading-[1.05]">The map is not a directory. It is a way to notice a reason to step into your city.</p></div>
        <Link to="/app/create" className="group border border-ink/10 bg-secondary-50 px-5 py-6 transition hover:border-secondary-500 dark:border-bone/10 dark:bg-secondary-900/10 sm:px-7"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">Put something on the map</p><p className="mt-3 font-display text-2xl leading-[1.05]">Have an opening that could bring people together?</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 group-hover:text-primary-500 dark:text-primary-300">Create a signal <Navigation className="h-4 w-4" aria-hidden="true" /></span></Link>
      </section>
    </div>
  );
}
