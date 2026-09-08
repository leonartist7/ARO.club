import { ArrowLeft, ArrowRight, Camera, Clock3, MapPin, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { findOpportunity } from '../data/aroApp';
import { AppAvatar, AppPanel, SignalBar, StatusPill } from '../components/app/AppPrimitives';

const orbitMembers = [
  { initials: 'JB', color: 'bg-primary-500', x: '18%', y: '22%' },
  { initials: 'PL', color: 'bg-moss', x: '70%', y: '16%' },
  { initials: 'KM', color: 'bg-sky', x: '76%', y: '67%' },
];

function FormationOrbit({ committed, threshold }) {
  const progress = Math.min((committed / threshold) * 360, 360);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[310px] rounded-full p-4" style={{ background: `conic-gradient(#efc14b 0deg ${progress}deg, rgba(246,240,230,0.12) ${progress}deg 360deg)` }}>
      <div className="relative flex h-full w-full items-center justify-center rounded-full border border-bone/15 bg-ink/95 text-center shadow-[inset_0_0_50px_rgba(239,193,75,0.1)]">
        {orbitMembers.map((member) => <span key={member.initials} className={`absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-[10px] font-bold text-white ${member.color}`} style={{ left: member.x, top: member.y }}>{member.initials}</span>)}
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">Committed</p><p className="mt-1 font-display text-5xl leading-none">{committed}/{threshold}</p><p className="mt-2 text-xs text-bone/55">The Circle is forming</p></div>
      </div>
    </div>
  );
}

export default function AppOpportunityDetailPage() {
  const { id } = useParams();
  const opportunity = findOpportunity(id);
  const committed = Number(opportunity.people.split(' ')[0]);

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-8 sm:py-9">
      <Link to="/app/world" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink/55 transition hover:text-ink dark:text-bone/55 dark:hover:text-bone"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to your World</Link>

      <section className="mt-5 overflow-hidden rounded-[2rem] bg-ink text-bone shadow-[0_22px_60px_rgba(40,36,32,0.22)]">
        <div className="relative min-h-[430px] sm:min-h-[510px]">
          <img src={opportunity.image} alt={opportunity.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,13,0.26)_0%,rgba(12,15,13,0.04)_38%,rgba(12,15,13,0.88)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 sm:p-7">
            <div className="rounded-full border border-white/20 bg-ink/45 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-100 backdrop-blur-xl"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary-300" />A small opening</div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-secondary-100 backdrop-blur-xl"><Camera className="h-5 w-5" aria-hidden="true" /></span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <div className="max-w-3xl"><div className="flex flex-wrap items-center gap-2"><StatusPill tone={opportunity.status}>{opportunity.status}</StatusPill><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-bone/65">{opportunity.area} · {opportunity.distance}</span></div><h1 className="mt-4 font-display text-4xl leading-[0.9] tracking-[-0.035em] sm:text-6xl">{opportunity.title}</h1><p className="mt-4 max-w-xl text-base leading-7 text-bone/75 sm:text-lg">{opportunity.summary}</p></div>
          </div>
        </div>
      </section>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
        <div className="space-y-7">
          <section className="grid gap-4 border-y border-ink/10 py-5 dark:border-bone/10 sm:grid-cols-3">
            <span className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-primary-500" aria-hidden="true" /><span><strong className="block text-sm">{opportunity.place}</strong><span className="text-xs text-ink/55 dark:text-bone/55">Exact meeting point after confirmation</span></span></span>
            <span className="flex items-start gap-3"><Clock3 className="mt-0.5 h-5 w-5 text-secondary-600" aria-hidden="true" /><span><strong className="block text-sm">{opportunity.time}</strong><span className="text-xs text-ink/55 dark:text-bone/55">{opportunity.duration}</span></span></span>
            <span className="flex items-start gap-3"><UsersRound className="mt-0.5 h-5 w-5 text-moss" aria-hidden="true" /><span><strong className="block text-sm">{opportunity.people}</strong><span className="text-xs text-ink/55 dark:text-bone/55">Minimum Circle: {opportunity.threshold}</span></span></span>
          </section>

          <section className="grid gap-6 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-ink p-6 text-bone dark:bg-plum"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Why it fits</p><p className="mt-4 font-display text-3xl leading-[0.98]">{opportunity.fitTitle}</p></div>
            <div className="px-1 py-2 sm:p-5"><p className="text-base leading-7 text-ink/70 dark:text-bone/70">{opportunity.signal}</p><p className="mt-5 text-sm leading-6 text-ink/55 dark:text-bone/55">{opportunity.fitBody}</p><div className="mt-6 flex items-center gap-3"><AppAvatar initials={opportunity.host.split(' ').map((part) => part[0]).join('')} /><div><p className="text-sm font-bold">{opportunity.host}</p><p className="text-xs text-ink/55 dark:text-bone/55">{opportunity.hostRole}</p></div><ShieldCheck className="ml-auto h-5 w-5 text-moss" aria-label="Verified host" /></div></div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <AppPanel dark className="overflow-hidden rounded-[1.75rem] border-bone/10 p-5 shadow-[0_18px_40px_rgba(40,36,32,0.18)]">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-200">A Circle is forming</p><p className="mt-2 font-display text-3xl leading-none">{committed} people have made time.</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary-300/35 text-secondary-200"><UsersRound className="h-4 w-4" aria-hidden="true" /></span></div>
            <div className="mt-6"><div className="mb-2 flex justify-between text-xs font-bold text-bone/70"><span>Minimum commitment</span><span>{committed}/{opportunity.threshold}</span></div><SignalBar value={(committed / opportunity.threshold) * 100} tone="secondary" /><p className="mt-3 text-xs leading-5 text-bone/55">See the price and exactly when it is charged before you make your commitment.</p></div>
            <Link to={`/app/opportunities/${opportunity.id}/commit`} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-4 text-sm font-bold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300">Continue to commitment <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <p className="mt-3 text-center text-[11px] text-bone/45">{opportunity.price} · One place · No charge on this preview</p>
          </AppPanel>
        </aside>
      </div>
    </div>
  );
}
