import { ArrowLeft, ArrowRight, Check, CircleDollarSign, Clock3, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findOpportunity } from '../data/aroApp';

const people = [
  { initials: 'JB', name: 'Jon', tone: 'bg-primary-500', x: '11%', y: '55%' },
  { initials: 'PL', name: 'Priya', tone: 'bg-moss', x: '28%', y: '7%' },
  { initials: 'KM', name: 'Kai', tone: 'bg-sky', x: '71%', y: '14%' },
  { initials: 'MN', name: 'You', tone: 'bg-secondary-300 text-ink', x: '78%', y: '63%' },
];

function CommitmentOrbit({ committed, threshold, hasCommitted }) {
  const degrees = Math.min((committed / threshold) * 360, 360);

  return (
    <div className="relative mx-auto h-[290px] w-[290px] sm:h-[340px] sm:w-[340px]">
      <div className="absolute inset-0 rounded-full p-[11px] shadow-[0_0_0_20px_rgba(239,193,75,0.06),0_30px_80px_rgba(0,0,0,0.32)]" style={{ background: `conic-gradient(#efc14b 0deg ${degrees}deg, rgba(246,240,230,0.12) ${degrees}deg 360deg)` }}>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-bone/10 bg-ink text-center"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">Commitment orbit</p><p className="mt-2 font-display text-6xl leading-none text-bone">{committed}/{threshold}</p><p className="mt-2 max-w-[150px] text-xs leading-5 text-bone/55">{hasCommitted ? 'Your place is held in this forming Circle.' : 'Two more commitments close the Circle.'}</p></div>
      </div>
      {people.map((person, index) => {
        const visible = index < committed;
        return <span key={person.initials} className={`absolute flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-[10px] font-bold shadow-lg transition-all ${visible ? person.tone : 'border-dashed border-bone/35 bg-ink text-bone/45'} ${person.initials === 'MN' && !hasCommitted ? 'opacity-45' : ''}`} style={{ left: person.x, top: person.y }}>{visible ? person.initials : '+'}</span>;
      })}
    </div>
  );
}

export default function AppCommitPage() {
  const { id } = useParams();
  const opportunity = findOpportunity(id);
  const initialCommitments = Number(opportunity.people.split(' ')[0]);
  const [hasCommitted, setHasCommitted] = useState(false);
  const committed = initialCommitments + (hasCommitted ? 1 : 0);
  const remaining = Math.max(opportunity.threshold - committed, 0);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-ink px-4 py-7 text-bone dark:bg-plum sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1060px]">
        <Link to={`/app/opportunities/${opportunity.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-bone/60 transition hover:text-secondary-200"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the opening</Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-200">Make it real together</p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.035em] sm:text-7xl">A place is more meaningful when people mean it.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-bone/65">Your commitment gives {opportunity.title.toLowerCase()} a genuine chance to happen. The Circle only closes when the group is ready.</p>
            <div className="mt-9 border-y border-bone/10 py-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-moss" aria-hidden="true" /><p className="text-sm leading-6 text-bone/65">This is a visual prototype. No card is charged and no reservation is created here. A production version must show payment, refunds, and timing from verified records.</p></div></div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-bone/10 bg-bone/[0.045] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7">
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-secondary-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">{opportunity.time}</p><h2 className="mt-2 font-display text-3xl leading-none">{opportunity.title}</h2></div>
            <div className="relative mt-5"><CommitmentOrbit committed={committed} threshold={opportunity.threshold} hasCommitted={hasCommitted} /></div>
            <div className="relative mt-5 space-y-3 border-t border-bone/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-bone/60"><CircleDollarSign className="h-4 w-4 text-secondary-200" aria-hidden="true" />One place</span><strong className="font-display text-2xl">{opportunity.price}</strong></div>
              <div className="flex items-center gap-2 text-xs leading-5 text-bone/60"><Clock3 className="h-4 w-4 shrink-0 text-secondary-200" aria-hidden="true" />In the real flow, the charge timing is disclosed here—before commitment.</div>
              <div className="flex items-center gap-2 text-xs leading-5 text-bone/60"><MapPin className="h-4 w-4 shrink-0 text-secondary-200" aria-hidden="true" />{opportunity.place} · detailed meeting point after confirmation</div>
            </div>
            {!hasCommitted ? <button type="button" onClick={() => setHasCommitted(true)} className="relative mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-4 text-sm font-bold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">Hold my place at {opportunity.price} <ArrowRight className="h-4 w-4" aria-hidden="true" /></button> : <div className="relative mt-6 rounded-2xl border border-moss/40 bg-moss/15 p-4"><p className="flex items-center gap-2 text-sm font-bold text-bone"><Check className="h-4 w-4 text-secondary-200" aria-hidden="true" /> Your commitment is visible in the Circle.</p><p className="mt-1 text-xs leading-5 text-bone/60">{remaining > 0 ? `${remaining} more ${remaining === 1 ? 'person' : 'people'} make it real.` : 'The Circle is real.'}</p><Link to={`/app/circles/${opportunity.id}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-secondary-200 hover:text-secondary-100">Enter Circle Room <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div>}
          </section>
        </div>

        <section className="mt-12 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-3">
          <div className="bg-ink p-5 dark:bg-plum"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-200">01 · Commit</p><p className="mt-2 text-sm leading-6 text-bone/65">You choose a place because the details work for your life.</p></div>
          <div className="bg-ink p-5 dark:bg-plum"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-200">02 · Circle closes</p><p className="mt-2 text-sm leading-6 text-bone/65">Enough people make a real commitment, with clear terms.</p></div>
          <div className="bg-ink p-5 dark:bg-plum"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-200">03 · Meet</p><p className="mt-2 text-sm leading-6 text-bone/65">The Circle becomes a real-world moment, then Proof.</p></div>
        </section>
      </div>
    </div>
  );
}
