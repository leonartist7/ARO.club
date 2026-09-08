import { useState } from 'react';
import { ArrowRight, Compass, HeartHandshake, Settings, ShieldCheck, Sparkles, Sprout, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileSignals } from '../data/aroApp';

const fieldNodes = [
  {
    id: 'wants',
    label: 'I am reaching for',
    title: 'Wants',
    copy: 'The kinds of moments that would make life feel larger right now.',
    items: profileSignals.wants,
    icon: HeartHandshake,
    position: 'left-[5%] top-[17%] sm:left-[9%] sm:top-[18%]',
    accent: 'border-primary-400/70 bg-primary-500 text-white shadow-[0_14px_30px_rgba(220,72,39,0.34)]',
  },
  {
    id: 'brings',
    label: 'I can bring',
    title: 'Contributions',
    copy: 'Things you can share without needing to turn yourself into a listing.',
    items: profileSignals.brings,
    icon: Sparkles,
    position: 'right-[5%] top-[12%] sm:right-[10%] sm:top-[17%]',
    accent: 'border-secondary-200/70 bg-secondary-300 text-ink shadow-[0_14px_30px_rgba(239,193,75,0.28)]',
  },
  {
    id: 'context',
    label: 'Life has room for',
    title: 'Context',
    copy: 'A gentle sketch of the conditions that help a good opportunity fit.',
    items: ['Slow Sunday mornings', 'Calgary neighbourhoods', 'Small groups, not crowds'],
    icon: Compass,
    position: 'bottom-[13%] left-[5%] sm:bottom-[15%] sm:left-[13%]',
    accent: 'border-sky/60 bg-sky text-ink shadow-[0_14px_30px_rgba(101,177,197,0.28)]',
  },
  {
    id: 'boundaries',
    label: 'I keep safe',
    title: 'Boundaries',
    copy: 'Personal limits stay part of the field. They are not a reason to be less visible as a person.',
    items: profileSignals.boundaries,
    icon: ShieldCheck,
    position: 'bottom-[13%] right-[5%] sm:bottom-[17%] sm:right-[10%]',
    accent: 'border-moss/60 bg-moss text-white shadow-[0_14px_30px_rgba(46,103,74,0.3)]',
  },
];

function FieldNode({ node, isActive, onSelect }) {
  const Icon = node.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={isActive}
      className={`absolute z-20 flex min-h-11 max-w-[132px] items-center gap-2 rounded-full border px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.1em] transition duration-300 motion-reduce:transition-none ${node.position} ${node.accent} ${isActive ? 'scale-110 ring-4 ring-bone/20' : 'hover:scale-105 focus-visible:scale-105'} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-200/80`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="leading-3">{node.label}</span>
    </button>
  );
}

function PersonalField({ activeNodeId, onSelect }) {
  return (
    <section className="relative isolate min-h-[590px] overflow-hidden rounded-[2.25rem] bg-ink px-5 py-6 text-bone shadow-[0_28px_80px_rgba(40,36,32,0.24)] sm:min-h-[650px] sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full border border-primary-500/35" />
        <div className="absolute -right-24 -top-28 h-[27rem] w-[27rem] rounded-full border border-secondary-300/20" />
        <div className="absolute bottom-[-18rem] left-1/2 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full border border-sky/20" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl" />
        <svg viewBox="0 0 1000 650" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M92 150 C260 98 352 202 498 320 C636 430 720 176 906 132" fill="none" stroke="rgba(246,240,230,0.18)" strokeDasharray="4 12" strokeWidth="2" />
          <path d="M120 524 C286 458 386 474 498 320 C640 146 780 474 906 514" fill="none" stroke="rgba(246,240,230,0.15)" strokeDasharray="4 12" strokeWidth="2" />
          <circle cx="500" cy="320" r="155" fill="none" stroke="rgba(239,193,75,0.22)" strokeWidth="1" />
          <circle cx="500" cy="320" r="217" fill="none" stroke="rgba(246,240,230,0.1)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200"><span className="h-1.5 w-1.5 rounded-full bg-secondary-300" /> Your personal field</p>
          <h1 className="mt-3 max-w-[220px] font-display text-4xl leading-[0.9] tracking-[-0.04em] sm:max-w-md sm:text-6xl">The parts of you that make a next thing possible.</h1>
        </div>
        <span className="hidden rounded-full border border-bone/15 bg-bone/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-bone/65 backdrop-blur-sm sm:block">Preview field</span>
      </div>

      {fieldNodes.map((node) => <FieldNode key={node.id} node={node} isActive={activeNodeId === node.id} onSelect={onSelect} />)}

      <div className="absolute left-1/2 top-1/2 z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[10px] border-primary-500 bg-bone text-ink shadow-[0_0_0_8px_rgba(239,193,75,0.16),0_24px_50px_rgba(0,0,0,0.3)] sm:h-44 sm:w-44">
        <img src="/aro-maya-profile-portrait-v1.png" alt="Illustrated portrait of Maya in Calgary at golden hour" className="h-full w-full object-cover object-center" />
        <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-2 py-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-sm">Maya · not a score</span>
      </div>

      <p className="absolute inset-x-5 bottom-5 z-10 text-center text-[11px] leading-5 text-bone/50 sm:inset-x-auto sm:bottom-7 sm:left-1/2 sm:w-80 sm:-translate-x-1/2">Tap a signal to see one thread in Maya’s life. Nothing here is being saved or shared in this preview.</p>
    </section>
  );
}

export default function AppProfilePage() {
  const [activeNodeId, setActiveNodeId] = useState('wants');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const activeNode = fieldNodes.find((node) => node.id === activeNodeId) ?? fieldNodes[0];
  const ActiveIcon = activeNode.icon;

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-8 sm:py-9">
      <div className="mb-5 flex items-center justify-between gap-4"><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300"><Sprout className="h-4 w-4" aria-hidden="true" /> Identity in motion</p><Link to="/app/settings" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition hover:border-primary-500 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-bone/15 dark:text-bone/60" aria-label="Open settings"><Settings className="h-5 w-5" aria-hidden="true" /></Link></div>

      <PersonalField activeNodeId={activeNodeId} onSelect={setActiveNodeId} />

      <Link to="/app/express" className="group mt-6 flex flex-col gap-5 overflow-hidden border border-ink/10 bg-primary-50/70 p-5 transition hover:border-primary-500/45 hover:bg-primary-50 dark:border-bone/10 dark:bg-primary-900/15 dark:hover:bg-primary-900/25 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> A visual layer for you</p><h2 className="mt-3 font-display text-3xl leading-[0.92]">Express your world.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink/60 dark:text-bone/60">Preview a full-body persona, the small things you carry, and the atmosphere that feels like you.</p></div><span className="inline-flex min-h-11 items-center gap-2 self-start whitespace-nowrap text-sm font-bold text-primary-700 transition group-hover:text-primary-500 dark:text-primary-300 sm:self-auto">Open expression preview <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </Link>

      <section id="signals" className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-stretch">
        <div className="border border-ink/10 bg-white/60 p-6 dark:border-bone/10 dark:bg-gray-900/50 sm:p-8">
          <div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">Selected signal</p><h2 className="mt-3 font-display text-4xl leading-[0.92]">{activeNode.title}</h2></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-ink dark:bg-secondary-900/40 dark:text-secondary-200"><ActiveIcon className="h-5 w-5" aria-hidden="true" /></span></div>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink/65 dark:text-bone/65">{activeNode.copy}</p>
          <div className="mt-7 flex flex-wrap gap-2">{activeNode.items.map((item) => <span key={item} className="border border-ink/10 bg-secondary-50 px-3 py-2 text-sm font-semibold dark:border-bone/10 dark:bg-secondary-900/20">{item}</span>)}</div>
          <p className="mt-7 flex items-start gap-2 border-t border-ink/10 pt-5 text-xs leading-5 text-ink/50 dark:border-bone/10 dark:text-bone/50"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-600" aria-hidden="true" /> In a real ARO flow, these are connections—not labels. They help show what could form next.</p>
        </div>

        <aside className="flex flex-col justify-between bg-primary-50 p-6 dark:bg-primary-900/15 sm:p-7"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300"><ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Private by design</p><h2 className="mt-4 font-display text-3xl leading-[0.96]">You decide what belongs in the field.</h2><p className="mt-4 text-sm leading-6 text-ink/65 dark:text-bone/65">This visual prototype uses Maya’s static preview data only. It has not saved, matched, or shared anything.</p></div><button type="button" onClick={() => setShowPrivacy((value) => !value)} aria-expanded={showPrivacy} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start font-bold text-primary-700 transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">How this becomes real later <ArrowRight className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showPrivacy ? 'rotate-90' : ''}`} aria-hidden="true" /></button>{showPrivacy && <p className="mt-4 border-t border-primary-500/15 pt-4 text-xs leading-5 text-ink/60 dark:text-bone/60">P1 will require explicit consent, owner-only storage, editing and deletion controls before personal signals can influence anything. None of that exists on this screen yet.</p>}</aside>
      </section>

      <section className="mt-7 flex flex-col gap-5 border-y border-ink/10 py-6 dark:border-bone/10 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss"><UsersRound className="h-5 w-5" aria-hidden="true" /></span><p className="max-w-xl text-sm leading-6 text-ink/60 dark:text-bone/60">ARO is not trying to calculate your worth. It is trying to make a little more room for the life you mean to live.</p></div><Link to="/app/create" className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 transition hover:text-primary-500 dark:text-primary-300">Bring a small possibility forward <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
    </div>
  );
}
