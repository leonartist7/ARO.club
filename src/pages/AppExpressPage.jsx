import { useState } from 'react';
import { ArrowLeft, Check, CircleDot, Compass, Palette, Shirt, Sparkles, Sun, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppImage } from '../components/app/AppImage';
import { getFv1PersonalCopy } from '../i18n/fv1/personal';

const shelfConfig = [
  {
    id: 'look',
    icon: Shirt,
    options: [
      { id: 'field-notes', accent: 'bg-primary-600', aura: 'from-primary-500/32 via-secondary-300/12 to-transparent' },
      { id: 'table-maker', accent: 'bg-clay', aura: 'from-clay/35 via-secondary-300/15 to-transparent' },
      { id: 'night-walker', accent: 'bg-sky', aura: 'from-sky/35 via-primary-500/10 to-transparent' },
    ],
  },
  {
    id: 'carry',
    icon: Compass,
    options: [
      { id: 'camera', accent: 'bg-secondary-400', aura: 'from-secondary-300/35 via-transparent to-transparent' },
      { id: 'notebook', accent: 'bg-moss', aura: 'from-moss/35 via-transparent to-transparent' },
      { id: 'cup', accent: 'bg-clay', aura: 'from-clay/35 via-transparent to-transparent' },
    ],
  },
  {
    id: 'atmosphere',
    icon: Sun,
    options: [
      { id: 'golden', accent: 'bg-secondary-400', aura: 'from-secondary-300/45 via-primary-500/12 to-transparent' },
      { id: 'river', accent: 'bg-sky', aura: 'from-sky/40 via-ink/10 to-transparent' },
      { id: 'candlelight', accent: 'bg-primary-600', aura: 'from-primary-500/38 via-clay/16 to-transparent' },
    ],
  },
];

const principleIcons = [Waves, Sparkles, Compass];

function ExpressionCategory({ shelf, label, isActive, onSelect }) {
  const Icon = shelf.icon;

  return (
    <button
      type="button"
      data-fv1-express-category={shelf.id}
      aria-pressed={isActive}
      onClick={() => onSelect(shelf.id)}
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isActive ? 'border-primary-600 text-primary-700 dark:text-primary-300' : 'border-transparent text-ink/65 hover:text-ink dark:text-bone/70 dark:hover:text-bone'}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" /> {label}
    </button>
  );
}

function ExpressionOption({ config, option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      data-fv1-express-option={config.id}
      aria-pressed={isSelected}
      onClick={() => onSelect(config.id)}
      className={`group relative min-h-[132px] overflow-hidden border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isSelected ? 'border-primary-600 bg-primary-50 shadow-[0_14px_28px_rgba(190,50,25,0.12)] dark:bg-primary-900/20' : 'border-ink/10 bg-white/65 hover:border-ink/25 hover:bg-white dark:border-bone/10 dark:bg-gray-900/65 dark:hover:border-bone/25 dark:hover:bg-gray-900'}`}
    >
      <div className={`absolute -right-4 -top-5 h-20 w-20 rounded-full bg-gradient-to-br ${config.aura} opacity-80`} aria-hidden="true" />
      <div className="relative flex items-start justify-between gap-3">
        <span className={`mt-1 h-3 w-3 rounded-full ${config.accent}`} aria-hidden="true" />
        {isSelected && <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-white"><Check className="h-4 w-4" aria-hidden="true" /></span>}
      </div>
      <p className="relative mt-5 font-display text-2xl leading-none">{option.label}</p>
      <p data-fv1-essential-copy className="relative mt-3 text-base leading-6 text-ink/70 dark:text-bone/75">{option.detail}</p>
    </button>
  );
}

function ExpressionPreview({ copy, selectedOptions, atmosphereConfig }) {
  return (
    <div data-fv1-express-stage className="relative isolate overflow-hidden bg-ink px-5 py-6 text-bone sm:px-8 sm:py-8">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${atmosphereConfig.aura}`} aria-hidden="true" />
      <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full border border-bone/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 bottom-[-7rem] h-96 w-96 rounded-full border border-secondary-300/25" aria-hidden="true" />

      <header className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-200">{copy.express.currentExpression}</p>
          <p data-fv1-essential-copy className="mt-2 text-base leading-6 text-bone/80">{selectedOptions.look.label} · {selectedOptions.atmosphere.label}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/20 bg-bone/10 text-secondary-200"><CircleDot className="h-5 w-5" aria-hidden="true" /></span>
      </header>

      <div data-fv1-express-persona className="relative z-10 mx-auto mt-6 flex min-h-[380px] max-w-[520px] items-end justify-center sm:min-h-[500px]">
        <AppImage
          src="/aro-maya-expression-persona-v1.png"
          alt={copy.express.personaAlt}
          variant="persona"
          cropClass="object-bottom"
          className="max-h-[520px] w-full max-w-[480px] object-contain drop-shadow-[0_30px_38px_rgba(0,0,0,0.38)]"
        />
      </div>

      <div className="relative z-20 mt-5 border border-bone/20 bg-ink/80 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-200">{copy.express.currentThread}</p>
        <p className="mt-2 font-display text-2xl leading-tight">{selectedOptions.carry.note}</p>
        <p data-fv1-essential-copy className="mt-3 text-base leading-6 text-bone/80">{selectedOptions.atmosphere.note}</p>
      </div>
    </div>
  );
}

export default function AppExpressPage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1PersonalCopy(language);
  const [activeShelfId, setActiveShelfId] = useState('look');
  const [selectedIds, setSelectedIds] = useState({ look: 'field-notes', carry: 'camera', atmosphere: 'golden' });
  const [isApplied, setIsApplied] = useState(false);
  const activeShelfConfig = shelfConfig.find((shelf) => shelf.id === activeShelfId) ?? shelfConfig[0];
  const activeShelfCopy = copy.express.shelves[activeShelfConfig.id];
  const ActiveShelfIcon = activeShelfConfig.icon;

  const selectedOptions = Object.fromEntries(shelfConfig.map((shelf) => {
    const optionId = selectedIds[shelf.id];
    return [shelf.id, copy.express.shelves[shelf.id].options[optionId]];
  }));
  const atmosphereConfig = shelfConfig.find((shelf) => shelf.id === 'atmosphere').options.find((option) => option.id === selectedIds.atmosphere);

  function selectOption(optionId) {
    setSelectedIds((current) => ({ ...current, [activeShelfId]: optionId }));
    setIsApplied(false);
  }

  return (
    <div lang={language} className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 sm:py-9 lg:px-12">
      <div className="flex items-start justify-between gap-5">
        <div>
          <Link to="/app/profile" className="inline-flex min-h-11 items-center gap-2 px-1 text-base font-bold text-ink/70 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-bone/75 dark:hover:text-primary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.express.back}</Link>
          <p className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300"><Palette className="h-4 w-4" aria-hidden="true" /> {copy.express.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-6xl">{copy.express.title}</h1>
          <p data-fv1-essential-copy className="mt-5 max-w-xl text-base leading-7 text-ink/70 dark:text-bone/75">{copy.express.intro}</p>
        </div>
        <span className="hidden border border-ink/10 bg-white/65 px-3 py-2 text-sm font-bold text-ink/70 dark:border-bone/10 dark:bg-gray-900/65 dark:text-bone/75 sm:inline-flex">{copy.express.localPreview}</span>
      </div>

      <section className="mt-9 grid overflow-hidden border border-ink/10 bg-white/65 dark:border-bone/10 dark:bg-gray-900/65 lg:grid-cols-[minmax(360px,0.88fr)_minmax(0,1.12fr)]">
        <ExpressionPreview copy={copy} selectedOptions={selectedOptions} atmosphereConfig={atmosphereConfig} />

        <div className="flex min-w-0 flex-col p-6 sm:p-9">
          <div className="flex gap-4 overflow-x-auto border-b border-ink/10 dark:border-bone/10" role="group" aria-label={copy.express.shelfGroup}>
            {shelfConfig.map((shelf) => <ExpressionCategory key={shelf.id} shelf={shelf} label={copy.express.shelves[shelf.id].label} isActive={activeShelfId === shelf.id} onSelect={setActiveShelfId} />)}
          </div>

          <div className="mt-8 flex items-start justify-between gap-5">
            <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">{copy.express.choose(activeShelfCopy.label)}</p><h2 className="mt-3 font-display text-4xl leading-[0.94]">{copy.express.chooserTitle}</h2></div>
            <ActiveShelfIcon className="mt-1 h-6 w-6 shrink-0 text-primary-600" aria-hidden="true" />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3" role="group" aria-label={copy.express.optionGroup(activeShelfCopy.label)}>
            {activeShelfConfig.options.map((optionConfig) => <ExpressionOption key={optionConfig.id} config={optionConfig} option={activeShelfCopy.options[optionConfig.id]} isSelected={selectedIds[activeShelfId] === optionConfig.id} onSelect={selectOption} />)}
          </div>

          <div className="mt-7 border-y border-ink/10 py-5 dark:border-bone/10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/70 dark:text-bone/75">{copy.express.currentPreview}</p>
            <p data-fv1-essential-copy className="mt-3 text-base leading-7 text-ink/70 dark:text-bone/75"><span className="font-bold text-ink dark:text-bone">{selectedOptions.look.label}</span> · {selectedOptions.look.detail}. <span className="font-bold text-ink dark:text-bone">{selectedOptions.carry.label}</span> · {selectedOptions.carry.detail}. <span className="font-bold text-ink dark:text-bone">{selectedOptions.atmosphere.label}</span> · {selectedOptions.atmosphere.detail}.</p>
          </div>

          <div className="mt-auto pt-8">
            <button data-fv1-express-apply type="button" onClick={() => setIsApplied(true)} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary-600 px-5 text-base font-bold text-white transition hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-800 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900">{isApplied ? <><Check className="h-4 w-4" aria-hidden="true" /> {copy.express.applied}</> : <><Sparkles className="h-4 w-4" aria-hidden="true" /> {copy.express.apply}</>}</button>
            <p data-fv1-essential-copy className="mt-4 text-center text-base leading-6 text-ink/70 dark:text-bone/75" aria-live="polite">{isApplied ? copy.express.appliedStatus : copy.express.idleStatus}</p>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 border-y border-ink/10 py-6 dark:border-bone/10 md:grid-cols-3">
        {copy.express.principles.map((principle, index) => <ExpressionPrinciple key={principle.title} icon={principleIcons[index]} title={principle.title} body={principle.copy} />)}
      </section>
    </div>
  );
}

function ExpressionPrinciple({ icon: Icon, title, body }) {
  return <article className="flex gap-3 px-1"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-800 dark:bg-secondary-900/25 dark:text-secondary-200"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><h2 className="font-display text-xl leading-none">{title}</h2><p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{body}</p></div></article>;
}
