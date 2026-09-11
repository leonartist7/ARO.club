import { ArrowLeft, ArrowRight, Check, CircleDollarSign, Clock3, MapPin, RotateCcw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findOpportunity } from '../data/aroApp';
import { getFv1FormationStatus, getFv1JourneyCopy } from '../i18n/fv1/journey';

const orbitPeople = [
  { initials: 'JB', tone: 'bg-primary-500', x: '11%', y: '55%' },
  { initials: 'PL', tone: 'bg-moss', x: '28%', y: '7%' },
  { initials: 'KM', tone: 'bg-sky', x: '71%', y: '14%' },
  { initials: 'EX', tone: 'bg-secondary-300 text-ink', x: '78%', y: '63%' },
];

function MissingExample({ copy }) {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center px-4 py-12 sm:px-8" aria-labelledby="commit-missing-title">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">{copy.fictionalLabel}</p>
      <h1 id="commit-missing-title" className="mt-3 font-display text-4xl text-ink dark:text-bone">{copy.missingTitle}</h1>
      <p className="mt-4 text-base leading-7 text-ink/65 dark:text-bone/65">{copy.missingBody}</p>
      <Link to="/app/world" className="mt-7 inline-flex min-h-11 w-fit items-center px-5 font-bold text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.backToWorld}</Link>
    </section>
  );
}

function CommitmentOrbit({ count, capacity, status, copy }) {
  const degrees = Math.min((count / capacity) * 360, 360);

  return (
    <div className="relative mx-auto h-[290px] w-[290px] sm:h-[340px] sm:w-[340px]">
      <div className="absolute inset-0 rounded-full p-[11px] shadow-[0_0_0_20px_rgba(239,193,75,0.06),0_30px_80px_rgba(0,0,0,0.32)]" style={{ background: `conic-gradient(#efc14b 0deg ${degrees}deg, rgba(246,240,230,0.12) ${degrees}deg 360deg)` }}>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-bone/10 bg-ink text-center"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">{copy.exampleCountLabel}</p><p className="mt-2 font-display text-6xl leading-none text-bone">{count}/{capacity}</p><p className="mt-2 max-w-[170px] text-xs leading-5 text-bone/55">{status}</p></div>
      </div>
      {orbitPeople.map((person, index) => {
        const visible = index < Math.min(count, orbitPeople.length);
        return <span key={person.initials} className={`absolute flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-[10px] font-bold shadow-lg transition-all ${visible ? person.tone : 'border-dashed border-bone/35 bg-ink text-bone/45'}`} style={{ left: person.x, top: person.y }} aria-hidden="true">{visible ? person.initials : '+'}</span>;
      })}
    </div>
  );
}

export default function AppCommitPage() {
  const { id } = useParams();
  const copy = getFv1JourneyCopy();
  const opportunity = findOpportunity(id);
  const [previewState, setPreviewState] = useState({ id, joined: false });

  if (!opportunity) return <MissingExample copy={copy} />;

  const isFull = opportunity.exampleCount >= opportunity.capacity;
  const hasJoinedExample = previewState.id === id && previewState.joined && !isFull;
  const count = Math.min(opportunity.exampleCount + (hasJoinedExample ? 1 : 0), opportunity.capacity);
  const status = getFv1FormationStatus(copy, { ...opportunity, exampleCount: count });

  const tryJoin = () => {
    if (isFull) return;
    setPreviewState((current) => (current.id === id && current.joined ? current : { id, joined: true }));
  };

  const resetExample = () => setPreviewState({ id, joined: false });

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-ink px-4 py-7 text-bone dark:bg-plum sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1060px]">
        <Link to={`/app/opportunities/${opportunity.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-bone/60 transition hover:text-secondary-200"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.backToExample}</Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-200">{copy.commitEyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.035em] sm:text-7xl">{copy.commitTitle}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-bone/65">{copy.commitBody}</p>
            <div className="mt-9 border-y border-bone/10 py-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-moss" aria-hidden="true" /><div><p className="text-sm leading-6 text-bone/70">{copy.localOnly}</p><p className="mt-2 text-xs font-bold text-secondary-200">{copy.resetNotice}</p></div></div></div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-bone/10 bg-bone/[0.045] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7">
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-secondary-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">{copy.fictionalLabel} · {opportunity.time}</p><h2 className="mt-2 font-display text-3xl leading-none">{opportunity.title}</h2></div>
            <div className="relative mt-5"><CommitmentOrbit count={count} capacity={opportunity.capacity} status={status} copy={copy} /></div>
            <div className="relative mt-5 space-y-3 border-t border-bone/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-bone/60"><CircleDollarSign className="h-4 w-4 text-secondary-200" aria-hidden="true" />{copy.examplePrice(opportunity.price)}</span><strong className="text-xs text-secondary-200">{copy.nothingBooked}</strong></div>
              <div className="flex items-center gap-2 text-xs leading-5 text-bone/60"><Clock3 className="h-4 w-4 shrink-0 text-secondary-200" aria-hidden="true" />{copy.noCharge}</div>
              <div className="flex items-center gap-2 text-xs leading-5 text-bone/60"><MapPin className="h-4 w-4 shrink-0 text-secondary-200" aria-hidden="true" />{opportunity.place} · {copy.examplePlaceOnly}</div>
            </div>

            <button type="button" onClick={tryJoin} disabled={isFull || hasJoinedExample} className="relative mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-4 text-sm font-bold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 disabled:cursor-not-allowed disabled:bg-bone/15 disabled:text-bone/50">{copy.tryJoin} <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>

            {isFull && <p className="relative mt-3 text-center text-sm font-bold text-secondary-200" role="status">{copy.full}</p>}

            {hasJoinedExample && <div className="relative mt-4 rounded-2xl border border-moss/40 bg-moss/15 p-4" role="status"><p className="flex items-center gap-2 text-sm font-bold text-bone"><Check className="h-4 w-4 text-secondary-200" aria-hidden="true" /> {copy.added}</p><p className="mt-2 text-xs leading-5 text-bone/60">{copy.circleBaselineNote}</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={resetExample} className="inline-flex min-h-11 items-center gap-2 border border-bone/20 px-4 text-xs font-bold text-bone hover:border-secondary-300"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{copy.reset}</button><Link to={`/app/circles/${opportunity.id}`} className="inline-flex min-h-11 items-center gap-1.5 px-2 text-xs font-bold text-secondary-200 hover:text-secondary-100">{copy.viewCircle} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div></div>}
          </section>
        </div>
      </div>
    </div>
  );
}