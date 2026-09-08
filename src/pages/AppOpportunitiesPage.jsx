import { useMemo, useState } from 'react';
import { ArrowRight, Clock3, MapPin, Search, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { opportunities } from '../data/aroApp';
import { AppPanel, AppSectionHeading, StatusPill } from '../components/app/AppPrimitives';

const filters = ['All', 'Forming', 'Open', 'Confirmed'];

function OpportunityCard({ opportunity }) {
  return (
    <Link to={`/app/opportunities/${opportunity.id}`} className="group block">
      <AppPanel className="overflow-hidden transition-colors hover:border-primary-500/50">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-52 shrink-0 overflow-hidden sm:h-auto sm:w-52">
            <img src={opportunity.image} alt={opportunity.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent sm:bg-gradient-to-r" />
            <div className="absolute bottom-3 left-3"><StatusPill tone={opportunity.status}>{opportunity.status}</StatusPill></div>
          </div>
          <div className="min-w-0 flex-1 p-5 sm:p-7">
            <div className="flex items-start gap-4"><div className="min-w-0 flex-1"><p className="text-xs text-ink/45 dark:text-bone/45">{opportunity.area} · {opportunity.distance}</p><h2 className="mt-3 font-display text-3xl leading-none transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300">{opportunity.title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60 dark:text-bone/60">{opportunity.summary}</p></div><ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-primary-500 dark:text-bone/35" aria-hidden="true" /></div>
            <div className="mt-5 flex flex-wrap gap-2">{opportunity.tags.map((tag) => <span key={tag} className="border border-ink/10 px-2.5 py-1 text-[11px] font-semibold text-ink/55 dark:border-bone/10 dark:text-bone/55">{tag}</span>)}</div>
            <div className="mt-6 grid gap-3 border-t border-ink/10 pt-4 text-xs text-ink/60 dark:border-bone/10 dark:text-bone/60 sm:grid-cols-3">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />{opportunity.place}</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-secondary-600" aria-hidden="true" />{opportunity.time}</span>
              <span className="flex items-center gap-2"><UsersRound className="h-4 w-4 text-moss" aria-hidden="true" />{opportunity.people}</span>
            </div>
          </div>
        </div>
      </AppPanel>
    </Link>
  );
}

export default function AppOpportunitiesPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => opportunities.filter((opportunity) => {
    const matchesFilter = filter === 'All' || opportunity.status.toLowerCase() === filter.toLowerCase();
    const haystack = `${opportunity.title} ${opportunity.summary} ${opportunity.tags.join(' ')}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query]);

  return (
    <div className="mx-auto max-w-[1260px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
      <AppSectionHeading eyebrow="Opportunity field" title="What is taking shape?">
        <div className="relative w-full sm:w-64"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 dark:text-bone/40" aria-hidden="true" /><label htmlFor="opportunity-search" className="sr-only">Search opportunities</label><input id="opportunity-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the field" className="min-h-11 w-full border border-ink/15 bg-white/50 pl-10 pr-3 text-sm outline-none placeholder:text-ink/35 focus:border-primary-500 dark:border-bone/15 dark:bg-gray-900/50 dark:placeholder:text-bone/35" /></div>
      </AppSectionHeading>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-4 dark:border-bone/10" role="tablist" aria-label="Opportunity status">{filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`min-h-11 px-4 text-sm font-bold transition-colors ${filter === item ? 'bg-ink text-bone dark:bg-bone dark:text-ink' : 'text-ink/55 hover:bg-ink/5 hover:text-ink dark:text-bone/55 dark:hover:bg-bone/5 dark:hover:text-bone'}`}>{item}</button>)}</div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_270px]"><div className="space-y-4">{filtered.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}{filtered.length === 0 && <AppPanel className="p-10 text-center"><p className="font-display text-3xl">Nothing lines up yet.</p><p className="mt-2 text-sm text-ink/60 dark:text-bone/60">Try a wider search or add a new signal to your field.</p></AppPanel>}</div>
        <aside className="space-y-4"><AppPanel className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-700 dark:text-secondary-300">How this works</p><ol className="mt-5 space-y-5">{['Signals stay coarse until you choose to share more.', 'A forming opportunity is not a promise or a booking.', 'A Circle becomes real when people commit and the host confirms.'].map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-ink/65 dark:text-bone/65"><span className="font-bold text-primary-600 dark:text-primary-300">0{index + 1}</span><span>{step}</span></li>)}</ol></AppPanel><AppPanel className="p-6" dark><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-300">Your field</p><p className="mt-3 font-display text-3xl">3 wants · 3 capabilities</p><p className="mt-3 text-sm leading-6 text-bone/65">Update your signals when your season changes. ARO should reflect your real life, not trap you in an old profile.</p><Link to="/app/profile#signals" className="mt-5 inline-flex text-sm font-bold text-bone hover:text-secondary-300">Visit your field <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></AppPanel></aside>
      </div>
    </div>
  );
}
