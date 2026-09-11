import { useState } from 'react';
import { ArrowRight, Compass, HeartHandshake, Settings, ShieldCheck, Sparkles, Sprout, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppImage } from '../components/app/AppImage';
import { getFv1PersonalCopy } from '../i18n/fv1/personal';

const nodeConfig = {
  wants: { icon: HeartHandshake, accent: 'border-primary-700 bg-primary-600 text-white shadow-[0_14px_30px_rgba(190,50,25,0.25)]' },
  brings: { icon: Sparkles, accent: 'border-secondary-500 bg-secondary-300 text-ink shadow-[0_14px_30px_rgba(239,193,75,0.24)]' },
  context: { icon: Compass, accent: 'border-sky bg-sky text-ink shadow-[0_14px_30px_rgba(118,153,168,0.24)]' },
  boundaries: { icon: ShieldCheck, accent: 'border-moss bg-moss text-white shadow-[0_14px_30px_rgba(104,115,90,0.25)]' },
};

const nodeIds = ['wants', 'brings', 'context', 'boundaries'];

function FieldNode({ id, node, isActive, onSelect }) {
  const config = nodeConfig[id];
  const Icon = config.icon;

  return (
    <button
      type="button"
      data-fv1-profile-node={id}
      onClick={() => onSelect(id)}
      aria-pressed={isActive}
      className={`flex min-h-12 w-full min-w-0 max-w-full flex-col items-start gap-[8px] overflow-hidden rounded-2xl border px-[12px] py-[12px] text-left text-base font-bold transition duration-300 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 ${config.accent} ${isActive ? 'ring-4 ring-secondary-200/70' : 'hover:-translate-y-0.5'} focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-secondary-200`}
    >
      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-current/25 bg-white/10"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <span data-fv1-profile-node-label className="w-full min-w-0 max-w-full break-words leading-5">{node.label}</span>
    </button>
  );
}

function Portrait({ copy }) {
  return (
    <div data-fv1-profile-portrait className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full border-[8px] border-primary-600 bg-bone text-ink shadow-[0_0_0_8px_rgba(239,193,75,0.14),0_24px_50px_rgba(0,0,0,0.28)] sm:w-48">
      <AppImage
        src="/aro-maya-profile-portrait-v1.png"
        alt={copy.profile.portraitAlt}
        variant="portrait"
        cropClass="object-center"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 bg-ink/85 px-2 py-2 text-center text-xs font-bold uppercase tracking-[0.1em] text-bone">{copy.profile.portraitCaption}</span>
    </div>
  );
}

function PersonalField({ copy, activeNodeId, onSelect }) {
  const nodes = copy.profile.nodes;

  return (
    <section data-fv1-personal-field className="relative isolate rounded-[2.25rem] bg-ink px-[20px] py-[24px] text-bone shadow-[0_28px_80px_rgba(40,36,32,0.24)] sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.25rem] opacity-80" aria-hidden="true">
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

      <header data-fv1-profile-headline className="relative z-10 max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-[12px] sm:gap-3">
          <p className="flex items-center gap-[8px] text-sm font-bold uppercase tracking-[0.16em] text-secondary-200 sm:gap-2"><span className="h-2 w-2 rounded-full bg-secondary-300" aria-hidden="true" /> {copy.profile.fieldEyebrow}</p>
          <span className="rounded-full border border-bone/20 bg-bone/[0.08] px-[12px] py-[8px] text-sm font-bold text-bone/80 sm:px-3 sm:py-2">{copy.profile.previewLabel}</span>
        </div>
        <h1 className="mt-[16px] max-w-2xl font-display text-4xl leading-[0.94] tracking-[-0.04em] sm:mt-4 sm:text-6xl">{copy.profile.fieldTitle}</h1>
      </header>

      <div data-fv1-profile-stage className="relative z-10 mt-[32px] min-w-0 rounded-[1.75rem] border border-bone/10 bg-bone/[0.04] p-[16px] sm:mt-8 sm:p-6">
        <div className="grid min-w-0 gap-[12px] sm:grid-cols-2 sm:gap-4">
          {nodeIds.slice(0, 2).map((id) => <FieldNode key={id} id={id} node={nodes[id]} isActive={activeNodeId === id} onSelect={onSelect} />)}
          <div className="py-[20px] sm:col-span-2 sm:py-5"><Portrait copy={copy} /></div>
          {nodeIds.slice(2).map((id) => <FieldNode key={id} id={id} node={nodes[id]} isActive={activeNodeId === id} onSelect={onSelect} />)}
          <p data-fv1-profile-instruction className="pt-[8px] text-center text-base leading-6 text-bone/80 sm:col-span-2 sm:pt-2">{copy.profile.instruction}</p>
        </div>
      </div>
    </section>
  );
}

export default function AppProfilePage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1PersonalCopy(language);
  const [activeNodeId, setActiveNodeId] = useState('wants');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const activeNode = copy.profile.nodes[activeNodeId] ?? copy.profile.nodes.wants;
  const ActiveIcon = nodeConfig[activeNodeId]?.icon ?? HeartHandshake;
  const activeItems = activeNode.items ?? [];

  return (
    <div lang={language} className="mx-auto max-w-[1180px] px-[16px] py-[24px] sm:px-8 sm:py-9">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300"><Sprout className="h-4 w-4" aria-hidden="true" /> {copy.profile.eyebrow}</p>
        <Link to="/app/settings" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition hover:border-primary-500 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-bone/15 dark:text-bone/75" aria-label={copy.profile.settingsLabel}><Settings className="h-5 w-5" aria-hidden="true" /></Link>
      </div>

      <PersonalField copy={copy} activeNodeId={activeNodeId} onSelect={setActiveNodeId} />

      <Link to="/app/express" className="group mt-6 flex flex-col gap-5 overflow-hidden border border-ink/10 bg-primary-50/70 p-5 transition hover:border-primary-500/45 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-bone/10 dark:bg-primary-900/15 dark:hover:bg-primary-900/25 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300"><Sparkles className="h-4 w-4" aria-hidden="true" /> {copy.profile.expressEyebrow}</p><h2 className="mt-3 font-display text-3xl leading-[0.96]">{copy.profile.expressTitle}</h2><p className="mt-3 max-w-xl text-base leading-6 text-ink/70 dark:text-bone/75">{copy.profile.expressBody}</p></div><span className="inline-flex min-h-11 max-w-full flex-wrap items-center gap-2 self-start text-sm font-bold leading-5 text-primary-700 transition group-hover:text-primary-500 dark:text-primary-300 sm:self-auto">{copy.profile.expressLink} <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </Link>

      <section id="signals" className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-stretch">
        <div className="border border-ink/10 bg-white/60 p-6 dark:border-bone/10 dark:bg-gray-900/50 sm:p-8">
          <div className="flex items-start justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">{copy.profile.selectedEyebrow}</p><h2 className="mt-3 font-display text-4xl leading-[0.92]">{activeNode.title}</h2></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-ink dark:bg-secondary-900/40 dark:text-secondary-200"><ActiveIcon className="h-5 w-5" aria-hidden="true" /></span></div>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink/70 dark:text-bone/75">{activeNode.copy}</p>
          <div className="mt-7 flex flex-wrap gap-2">{activeItems.map((item) => <span key={item} className="border border-ink/10 bg-secondary-50 px-3 py-2 text-base font-semibold dark:border-bone/10 dark:bg-secondary-900/20">{item}</span>)}</div>
          <p className="mt-7 flex items-start gap-2 border-t border-ink/10 pt-5 text-base leading-6 text-ink/65 dark:border-bone/10 dark:text-bone/70"><Sparkles className="mt-1 h-4 w-4 shrink-0 text-secondary-700 dark:text-secondary-300" aria-hidden="true" /> {copy.profile.connectionNote}</p>
        </div>

        <aside className="flex flex-col justify-between bg-primary-50 p-6 dark:bg-primary-900/15 sm:p-7"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> {copy.profile.privacyEyebrow}</p><h2 className="mt-4 font-display text-3xl leading-[0.96]">{copy.profile.privacyTitle}</h2><p className="mt-4 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.profile.privacyBody}</p></div><button type="button" onClick={() => setShowPrivacy((value) => !value)} aria-expanded={showPrivacy} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start px-1 text-base font-bold text-primary-700 transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.profile.privacyButton} <ArrowRight className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showPrivacy ? 'rotate-90' : ''}`} aria-hidden="true" /></button>{showPrivacy && <p className="mt-4 border-t border-primary-500/15 pt-4 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.profile.privacyDetail}</p>}</aside>
      </section>

      <section className="mt-7 flex flex-col gap-5 border-y border-ink/10 py-6 dark:border-bone/10 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss dark:text-green-200"><UsersRound className="h-5 w-5" aria-hidden="true" /></span><p className="max-w-xl text-base leading-6 text-ink/70 dark:text-bone/75">{copy.profile.closing}</p></div><Link to="/app/create" className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-700 transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.profile.createLink} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
    </div>
  );
}
