import { ArrowRight, CalendarDays, MapPin, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { circles } from '../data/aroApp';
import { AppPanel, AppSectionHeading, SignalBar, StatusPill } from '../components/app/AppPrimitives';
import { getFv1FormationStatus, getFv1JourneyCopy } from '../i18n/fv1/journey';

function CircleRow({ circle, copy }) {
  const progress = (circle.members / circle.capacity) * 100;
  const status = getFv1FormationStatus(copy, { exampleCount: circle.members, minimum: circle.minimum, capacity: circle.capacity });

  return (
    <AppPanel className="p-6 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div><StatusPill tone={circle.state}>{copy.fictionalLabel}</StatusPill><h2 className="mt-4 font-display text-3xl leading-none">{circle.title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink/60 dark:text-bone/60">{status}</p></div>
        <Link to={`/app/opportunities/${circle.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-500 dark:text-primary-300">{copy.openOpportunity} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      <div className="mt-7 grid gap-4 border-t border-ink/10 pt-5 dark:border-bone/10 sm:grid-cols-[1fr_220px] sm:items-end">
        <div className="grid gap-3 text-sm text-ink/60 dark:text-bone/60 sm:grid-cols-2"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-secondary-600" aria-hidden="true" />{circle.time}</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />{circle.place}</span></div>
        <div><div className="mb-2 flex justify-between text-xs font-bold"><span>{copy.circleCapacity}</span><span>{circle.members}/{circle.capacity}</span></div><SignalBar value={progress} tone={circle.members >= circle.capacity ? 'moss' : 'secondary'} /><p className="mt-2 text-[11px] text-ink/50 dark:text-bone/50">{copy.exampleMinimum(circle.minimum)}</p></div>
      </div>
    </AppPanel>
  );
}

export default function AppCirclesPage() {
  const copy = getFv1JourneyCopy();

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
      <AppSectionHeading eyebrow={copy.circlesEyebrow} title={copy.circlesTitle}><p className="max-w-sm text-sm leading-6 text-ink/55 dark:text-bone/55 sm:text-right">{copy.circlesBody}</p></AppSectionHeading>
      <div className="mt-8 space-y-4">{circles.map((circle) => <CircleRow key={circle.id} circle={circle} copy={copy} />)}</div>
      <AppPanel className="mt-8 grid gap-4 bg-secondary-50 p-6 dark:bg-secondary-900/15 sm:grid-cols-[auto_1fr_auto] sm:items-center"><UsersRound className="h-6 w-6 text-secondary-700 dark:text-secondary-300" aria-hidden="true" /><div><p className="font-bold">{copy.circlesFooterTitle}</p><p className="mt-1 text-sm text-ink/60 dark:text-bone/60">{copy.circlesFooterBody}</p></div><Link to="/app/world" className="inline-flex min-h-11 items-center justify-center border border-ink/15 px-4 text-sm font-bold hover:border-primary-500 dark:border-bone/15">{copy.backToWorld}</Link></AppPanel>
    </div>
  );
}