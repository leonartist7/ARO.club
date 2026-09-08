import { useState } from 'react';
import { ArrowLeft, ArrowRight, Compass, HeartHandshake, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const seedModes = [
  {
    id: 'learn',
    label: 'Learn',
    eyebrow: 'A curiosity',
    title: 'Let something unfamiliar make your life wider.',
    copy: 'Start with the kind of thing you would genuinely make time for. ARO can later help reveal a human-sized way in.',
    seed: 'I want to practice Spanish through shared stories.',
    outcome: 'A shared table could begin to form.',
    icon: Sparkles,
    tone: 'border-secondary-200 bg-secondary-300 text-ink',
    softTone: 'bg-secondary-300/15',
    ingredients: [
      { label: 'You', value: 'curious · low pressure', position: 'left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]' },
      { label: 'People', value: 'a few patient voices', position: 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]' },
      { label: 'Place', value: 'a warm table', position: 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]' },
      { label: 'Time', value: 'Saturday morning', position: 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]' },
    ],
  },
  {
    id: 'share',
    label: 'Share',
    eyebrow: 'A contribution',
    title: 'Something you know can become a door for someone else.',
    copy: 'Not a listing. A small, human invitation shaped around what you can offer with care.',
    seed: 'I could lead a calm beginner photo walk.',
    outcome: 'A light-seeking Circle could take shape.',
    icon: Compass,
    tone: 'border-primary-400 bg-primary-500 text-white',
    softTone: 'bg-primary-500/15',
    ingredients: [
      { label: 'You bring', value: 'a patient eye', position: 'left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]' },
      { label: 'People', value: 'beginners who want out', position: 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]' },
      { label: 'Place', value: 'the river path', position: 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]' },
      { label: 'Time', value: 'golden hour', position: 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]' },
    ],
  },
  {
    id: 'gather',
    label: 'Gather',
    eyebrow: 'A reason to meet',
    title: 'Make a little room for people to find each other.',
    copy: 'Some opportunities start with a simple desire: a meal, a question, a reason not to stay alone at home.',
    seed: 'I want to host an easy dinner for new neighbours.',
    outcome: 'A first table could begin to gather.',
    icon: UsersRound,
    tone: 'border-moss/70 bg-moss text-white',
    softTone: 'bg-moss/15',
    ingredients: [
      { label: 'You offer', value: 'a generous welcome', position: 'left-[7%] top-[17%] sm:left-[13%] sm:top-[20%]' },
      { label: 'People', value: 'new faces nearby', position: 'right-[6%] top-[12%] sm:right-[12%] sm:top-[18%]' },
      { label: 'Place', value: 'a neighbourhood table', position: 'bottom-[18%] left-[6%] sm:bottom-[18%] sm:left-[12%]' },
      { label: 'Time', value: 'a slow evening', position: 'bottom-[14%] right-[6%] sm:bottom-[18%] sm:right-[12%]' },
    ],
  },
];

function SeedChoice({ mode, isActive, onSelect }) {
  const Icon = mode.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(mode.id)}
      aria-pressed={isActive}
      className={`group relative min-h-[132px] overflow-hidden border p-5 text-left transition duration-300 motion-reduce:transition-none sm:p-6 ${isActive ? 'border-bone/40 bg-bone/15 shadow-[0_16px_35px_rgba(0,0,0,0.18)]' : 'border-bone/10 bg-bone/[0.035] hover:border-bone/25 hover:bg-bone/[0.07]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${mode.tone}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-bone/50">{mode.eyebrow}</p>
      <p className="mt-1 font-display text-3xl leading-none">{mode.label}</p>
      {isActive && <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary-300" aria-hidden="true" />}
    </button>
  );
}

function Ingredient({ ingredient }) {
  return (
    <div className={`absolute z-10 max-w-[118px] rounded-2xl border border-bone/15 bg-ink/75 p-3 shadow-[0_12px_25px_rgba(0,0,0,0.18)] backdrop-blur-md ${ingredient.position}`}>
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-secondary-200">{ingredient.label}</p>
      <p className="mt-1 text-[11px] font-semibold leading-4 text-bone/85">{ingredient.value}</p>
    </div>
  );
}

function CompositionField({ mode }) {
  const Icon = mode.icon;

  return (
    <section className="relative isolate min-h-[530px] overflow-hidden border border-bone/10 bg-ink px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:min-h-[590px] sm:px-8 sm:py-8">
      <div className={`pointer-events-none absolute inset-0 ${mode.softTone}`} aria-hidden="true" />
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

      <div className="relative z-10 flex items-start justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">A possible shape</p><p className="mt-2 max-w-[220px] text-sm leading-6 text-bone/60">A design preview of the relationships that could matter—not a live signal.</p></div><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${mode.tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span></div>

      {mode.ingredients.map((ingredient) => <Ingredient key={ingredient.label} ingredient={ingredient} />)}

      <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[10px] border-secondary-300 bg-bone px-4 text-center text-ink shadow-[0_0_0_8px_rgba(222,67,37,0.14),0_24px_55px_rgba(0,0,0,0.32)] sm:h-48 sm:w-48">
        <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-primary-700">Might become</p>
        <p className="mt-2 font-display text-xl leading-[0.95] sm:text-2xl">{mode.outcome}</p>
      </div>

      <p className="absolute inset-x-5 bottom-5 z-10 text-center text-[11px] leading-5 text-bone/50 sm:bottom-7">Static preview only · no intent is saved · no demand is counted · no opportunity is created</p>
    </section>
  );
}

export default function AppCreatePage() {
  const [activeModeId, setActiveModeId] = useState('learn');
  const activeMode = seedModes.find((mode) => mode.id === activeModeId) ?? seedModes[0];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-ink px-4 py-7 text-bone dark:bg-plum sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1180px]">
        <Link to="/app" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-bone/60 transition hover:text-secondary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to your World</Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-200">Seed Studio</p><h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">What wants a little more room in the world?</h1></div><p className="max-w-xl text-base leading-7 text-bone/65">A good opportunity does not begin as a listing. It begins as something honest: a curiosity, a contribution, or a reason to gather.</p></header>

        <section className="mt-10 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-3">{seedModes.map((mode) => <SeedChoice key={mode.id} mode={mode} isActive={mode.id === activeModeId} onSelect={setActiveModeId} />)}</section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center"><CompositionField mode={activeMode} /><aside className="border border-bone/10 bg-bone/[0.05] p-6 sm:p-7"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-200">Your seed</p><p className="mt-4 font-display text-3xl leading-[0.98]">“{activeMode.seed}”</p><p className="mt-5 text-sm leading-6 text-bone/60">{activeMode.copy}</p><div className="mt-8 border-t border-bone/10 pt-5"><p className="flex items-start gap-3 text-xs leading-5 text-bone/60"><HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-secondary-200" aria-hidden="true" /> ARO’s future job is to make this more possible—not to take it over from you.</p></div></aside></section>

        <section className="mt-10 flex flex-col gap-5 border-t border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-sm leading-6 text-bone/55">Later, approved P2 and P3 systems can turn a real, private signal into an explainable opportunity path. This screen is only the visual language for that future moment.</p><Link to="/app/world" className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-secondary-200 transition hover:text-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">Return to World <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
      </div>
    </div>
  );
}
