import { useState } from 'react';
import { ArrowLeft, Check, CircleDot, Compass, Palette, Shirt, Sparkles, Sun, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const shelves = [
  {
    id: 'look',
    label: 'Look',
    icon: Shirt,
    options: [
      { id: 'field-notes', label: 'Field notes', detail: 'Soft layers · ready to wander', note: 'Camera and notebook', accent: 'bg-primary-500', aura: 'from-primary-500/32 via-secondary-300/12 to-transparent' },
      { id: 'table-maker', label: 'Table maker', detail: 'Warm layers · ready to welcome', note: 'A long table and good questions', accent: 'bg-clay', aura: 'from-clay/35 via-secondary-300/15 to-transparent' },
      { id: 'night-walker', label: 'Evening walk', detail: 'Dark layers · ready to notice', note: 'City lights and an open hour', accent: 'bg-sky', aura: 'from-sky/35 via-primary-500/10 to-transparent' },
    ],
  },
  {
    id: 'carry',
    label: 'Carry',
    icon: Compass,
    options: [
      { id: 'camera', label: 'Camera', detail: 'A tool for noticing', note: 'You bring a way of seeing', accent: 'bg-secondary-400', aura: 'from-secondary-300/35 via-transparent to-transparent' },
      { id: 'notebook', label: 'Notebook', detail: 'A place for loose ideas', note: 'You bring questions worth keeping', accent: 'bg-moss', aura: 'from-moss/35 via-transparent to-transparent' },
      { id: 'cup', label: 'Coffee cup', detail: 'A reason to stay awhile', note: 'You bring an easy invitation', accent: 'bg-clay', aura: 'from-clay/35 via-transparent to-transparent' },
    ],
  },
  {
    id: 'atmosphere',
    label: 'Atmosphere',
    icon: Sun,
    options: [
      { id: 'golden', label: 'Golden hour', detail: 'Warm, open, unhurried', note: 'Your world feels a little more possible', accent: 'bg-secondary-400', aura: 'from-secondary-300/45 via-primary-500/12 to-transparent' },
      { id: 'river', label: 'River blue', detail: 'Clear air and a long view', note: 'Your world has room to breathe', accent: 'bg-sky', aura: 'from-sky/40 via-ink/10 to-transparent' },
      { id: 'candlelight', label: 'Candlelight', detail: 'A table after dark', note: 'Your world makes room for conversation', accent: 'bg-primary-500', aura: 'from-primary-500/38 via-clay/16 to-transparent' },
    ],
  },
];

function ExpressionTab({ shelf, activeShelf, onSelect }) {
  const Icon = shelf.icon;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeShelf === shelf.id}
      onClick={() => onSelect(shelf.id)}
      className={`inline-flex min-h-11 items-center gap-2 border-b-2 px-1 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${activeShelf === shelf.id ? 'border-primary-500 text-primary-700 dark:text-primary-300' : 'border-transparent text-ink/45 hover:text-ink dark:text-bone/45 dark:hover:text-bone'}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" /> {shelf.label}
    </button>
  );
}

function ExpressionOption({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(option.id)}
      className={`group relative min-h-[122px] overflow-hidden border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isSelected ? 'border-primary-500 bg-primary-50/80 shadow-[0_14px_28px_rgba(222,67,37,0.12)] dark:bg-primary-900/15' : 'border-ink/10 bg-white/55 hover:border-ink/25 hover:bg-white dark:border-bone/10 dark:bg-gray-900/55 dark:hover:border-bone/25 dark:hover:bg-gray-900'}`}
    >
      <div className={`absolute -right-4 -top-5 h-20 w-20 rounded-full bg-gradient-to-br ${option.aura} opacity-80`} aria-hidden="true" />
      <div className="relative flex items-start justify-between gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${option.accent}`} aria-hidden="true" />{isSelected && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>}</div>
      <p className="relative mt-6 font-display text-2xl leading-none">{option.label}</p>
      <p className="relative mt-2 text-xs leading-5 text-ink/55 dark:text-bone/55">{option.detail}</p>
    </button>
  );
}

export default function AppExpressPage() {
  const [activeShelfId, setActiveShelfId] = useState('look');
  const [selectedIds, setSelectedIds] = useState({ look: 'field-notes', carry: 'camera', atmosphere: 'golden' });
  const [isApplied, setIsApplied] = useState(false);
  const activeShelf = shelves.find((shelf) => shelf.id === activeShelfId) ?? shelves[0];
  const selectedOptions = shelves.map((shelf) => shelf.options.find((option) => option.id === selectedIds[shelf.id]) ?? shelf.options[0]);
  const ActiveShelfIcon = activeShelf.icon;

  function selectOption(optionId) {
    setSelectedIds((current) => ({ ...current, [activeShelf.id]: optionId }));
    setIsApplied(false);
  }

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 sm:py-9 lg:px-12">
      <div className="flex items-start justify-between gap-5">
        <div>
          <Link to="/app/profile" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink/55 transition hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-bone/55 dark:hover:text-primary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Personal Field</Link>
          <p className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300"><Palette className="h-4 w-4" aria-hidden="true" /> Personal expression</p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[0.88] tracking-[-0.04em] sm:text-6xl">Express your world.</h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-ink/60 dark:text-bone/60">A small visual layer for the way you move through ARO—not a score, a shop, or a costume game.</p>
        </div>
        <span className="hidden border border-ink/10 bg-white/55 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/55 dark:border-bone/10 dark:bg-gray-900/55 dark:text-bone/55 sm:inline-flex">Local preview</span>
      </div>

      <section className="mt-9 grid overflow-hidden border border-ink/10 bg-white/65 dark:border-bone/10 dark:bg-gray-900/65 lg:grid-cols-[minmax(360px,0.88fr)_minmax(0,1.12fr)]">
        <div className="relative isolate min-h-[620px] overflow-hidden bg-ink px-6 pt-7 text-bone sm:px-9 lg:min-h-[700px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedOptions[2].aura} transition-colors duration-500 motion-reduce:transition-none`} aria-hidden="true" />
          <div className="absolute -left-28 top-16 h-80 w-80 rounded-full border border-bone/10" aria-hidden="true" />
          <div className="absolute -right-28 bottom-[-7rem] h-96 w-96 rounded-full border border-secondary-300/25" aria-hidden="true" />
          <div className="absolute left-1/2 top-[44%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary-300/35 shadow-[0_0_0_18px_rgba(239,193,75,0.06)]" aria-hidden="true" />
          <div className="relative z-10 flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-300">Maya’s current expression</p><p className="mt-2 text-sm text-bone/60">{selectedOptions[0].label} · {selectedOptions[2].label}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 bg-bone/10 text-secondary-300"><CircleDot className="h-4 w-4" aria-hidden="true" /></span></div>
          <img src="/aro-maya-expression-persona-v1.png" alt="Original fictional full-body illustration of Maya in relaxed creative clothing" className="absolute bottom-[-1rem] left-1/2 z-10 h-[76%] w-auto max-w-[92%] -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_38px_rgba(0,0,0,0.38)]" />
          <div className="absolute inset-x-6 bottom-6 z-20 border border-bone/15 bg-ink/55 p-4 backdrop-blur-md sm:inset-x-9"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-300">The thread she brings</p><p className="mt-2 font-display text-2xl leading-none">{selectedOptions[1].note}</p><p className="mt-2 text-xs leading-5 text-bone/65">{selectedOptions[2].note}</p></div>
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-9">
          <div className="flex gap-6 overflow-x-auto border-b border-ink/10 dark:border-bone/10" role="tablist" aria-label="Expression choices">{shelves.map((shelf) => <ExpressionTab key={shelf.id} shelf={shelf} activeShelf={activeShelfId} onSelect={setActiveShelfId} />)}</div>
          <div className="mt-8 flex items-start justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">Choose a {activeShelf.label.toLowerCase()}</p><h2 className="mt-3 font-display text-4xl leading-[0.92]">A visible way to say what kind of day this is.</h2></div><ActiveShelfIcon className="mt-1 h-6 w-6 shrink-0 text-primary-500" aria-hidden="true" /></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={`${activeShelf.label} options`}>{activeShelf.options.map((option) => <ExpressionOption key={option.id} option={option} isSelected={selectedIds[activeShelf.id] === option.id} onSelect={selectOption} />)}</div>
          <div className="mt-7 border-y border-ink/10 py-5 dark:border-bone/10"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45 dark:text-bone/45">Current preview</p><p className="mt-2 text-sm leading-6 text-ink/65 dark:text-bone/65"><span className="font-bold text-ink dark:text-bone">{selectedOptions[0].label}</span> · {selectedOptions[0].detail}. <span className="font-bold text-ink dark:text-bone">{selectedOptions[1].label}</span> · {selectedOptions[1].detail}. <span className="font-bold text-ink dark:text-bone">{selectedOptions[2].label}</span> · {selectedOptions[2].detail}.</p></div>
          <div className="mt-auto pt-8"><button type="button" onClick={() => setIsApplied(true)} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary-500 px-5 text-sm font-bold text-white transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900">{isApplied ? <><Check className="h-4 w-4" aria-hidden="true" /> Preview applied locally</> : <><Sparkles className="h-4 w-4" aria-hidden="true" /> Apply this preview</>}</button><p className="mt-4 text-center text-xs leading-5 text-ink/45 dark:text-bone/45" aria-live="polite">{isApplied ? 'This view has updated for the current preview only. Nothing was saved.' : 'This is an interactive visual preview only. Nothing is saved, bought, or shared.'}</p></div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 border-y border-ink/10 py-6 dark:border-bone/10 md:grid-cols-3"><ExpressionPrinciple icon={Waves} title="Personal, not performative" copy="Expression gives your own journey texture. It is never a popularity signal." /><ExpressionPrinciple icon={Sparkles} title="Connected to real life" copy="The visual layer should point toward what you want to do, make, or notice offline." /><ExpressionPrinciple icon={Compass} title="Always in your control" copy="A real version would require explicit editing, privacy, and deletion controls first." /></section>
    </div>
  );
}

function ExpressionPrinciple({ icon: Icon, title, copy }) {
  return <article className="flex gap-3 px-1"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-900/25 dark:text-secondary-200"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><h2 className="font-display text-xl leading-none">{title}</h2><p className="mt-2 text-xs leading-5 text-ink/55 dark:text-bone/55">{copy}</p></div></article>;
}
