import { ArrowLeft, ArrowRight, CalendarDays, Camera, CheckCircle2, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findOpportunity } from '../data/aroApp';
import { AppAvatar, StatusPill } from '../components/app/AppPrimitives';
import { getFv1FormationStatus, getFv1JourneyCopy } from '../i18n/fv1/journey';

function buildConversation(opportunity) {
  const hostName = opportunity.host.split(' ')[0];
  const initials = opportunity.host.split(' ').map((part) => part[0]).join('');

  return [
    { initials, name: `${hostName} · host`, time: 'Now', tone: 'bg-primary-500', text: opportunity.circleWelcome },
    { initials: 'PL', name: 'Priya', time: 'Now', tone: 'bg-moss', text: opportunity.circleQuestion },
    { initials, name: `${hostName} · host`, time: 'Just now', tone: 'bg-primary-500', text: opportunity.circleReply },
  ];
}

function MissingExample({ copy }) {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center px-4 py-12 sm:px-8" aria-labelledby="circle-missing-title">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">{copy.fictionalLabel}</p>
      <h1 id="circle-missing-title" className="mt-3 font-display text-4xl text-ink dark:text-bone">{copy.missingTitle}</h1>
      <p className="mt-4 text-base leading-7 text-ink/65 dark:text-bone/65">{copy.missingBody}</p>
      <Link to="/app/world" className="mt-7 inline-flex min-h-11 w-fit items-center px-5 font-bold text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.backToWorld}</Link>
    </section>
  );
}

export default function AppCircleRoomPage() {
  const { id } = useParams();
  const copy = getFv1JourneyCopy();
  const opportunity = findOpportunity(id);
  const baselineMessages = opportunity ? buildConversation(opportunity) : [];
  const [localChat, setLocalChat] = useState(() => ({ id, messages: baselineMessages, draft: '' }));
  const activeChat = localChat.id === id ? localChat : { id, messages: baselineMessages, draft: '' };

  if (!opportunity) return <MissingExample copy={copy} />;

  const members = opportunity.exampleCount;
  const status = getFv1FormationStatus(copy, opportunity);

  const sendMessage = () => {
    const text = activeChat.draft.trim();
    if (!text) return;
    setLocalChat({
      id,
      messages: [...activeChat.messages, { initials: 'LV', local: true, time: 'Local', tone: 'bg-secondary-500', text }],
      draft: '',
    });
  };

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-8 sm:py-9">
      <Link to={`/app/opportunities/${opportunity.id}/commit`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink/55 transition hover:text-ink dark:text-bone/55 dark:hover:text-bone"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.backToExample}</Link>

      <section className="mt-4 overflow-hidden rounded-[2rem] bg-ink text-bone shadow-[0_22px_60px_rgba(40,36,32,0.22)]">
        <div className="relative min-h-[350px] sm:min-h-[420px]"><img src={opportunity.image} alt={opportunity.imageAlt} className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,13,0.18)_0%,rgba(12,15,13,0.18)_30%,rgba(12,15,13,0.9)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 sm:p-7"><div className="rounded-full border border-white/20 bg-ink/45 px-3 py-2 backdrop-blur-xl"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-100"><span className="h-1.5 w-1.5 rounded-full bg-secondary-300" /> {copy.directCircle}</p></div><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-secondary-100 backdrop-blur-xl"><Camera className="h-5 w-5" aria-hidden="true" /></span></div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8"><div className="max-w-2xl"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-200">{copy.roomEyebrow}</p><h1 className="mt-3 font-display text-4xl leading-[0.9] tracking-[-0.035em] sm:text-6xl">{opportunity.title}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-bone/70">{copy.roomBody}</p></div></div>
        </div>
      </section>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">
        <section className="overflow-hidden border border-ink/10 bg-white/60 dark:border-bone/10 dark:bg-gray-900/60">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 dark:border-bone/10"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">{copy.conversationLabel}</p><p className="mt-1 font-display text-2xl">{copy.conversationTitle}</p></div><MessageCircle className="h-5 w-5 text-ink/35 dark:text-bone/35" aria-hidden="true" /></div>
          <div className="space-y-5 p-5 sm:p-6">{activeChat.messages.map((message, index) => <article key={`${message.name ?? 'local'}-${index}`} className="flex items-start gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${message.tone}`}>{message.initials}</span><div className="min-w-0"><div className="flex items-baseline gap-2"><p className="text-xs font-bold">{message.local ? copy.localVisitor : message.name}</p><span className="text-[10px] text-ink/40 dark:text-bone/40">{message.time}</span></div><p className="mt-1 max-w-xl text-sm leading-6 text-ink/65 dark:text-bone/65">{message.text}</p></div></article>)}</div>
          <p className="border-t border-ink/10 px-4 pt-3 text-xs leading-5 text-ink/55 dark:border-bone/10 dark:text-bone/55" role="status">{copy.unsentChat}</p>
          <div className="flex gap-2 p-4"><input value={activeChat.draft} onChange={(event) => setLocalChat({ ...activeChat, draft: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }} aria-label={copy.messageLabel} placeholder={copy.messagePlaceholder} className="min-h-11 min-w-0 flex-1 rounded-full border border-ink/10 bg-transparent px-4 text-sm text-ink placeholder:text-ink/40 focus:border-primary-500 focus:outline-none dark:border-bone/10 dark:text-bone dark:placeholder:text-bone/40" /><button type="button" onClick={sendMessage} disabled={!activeChat.draft.trim()} aria-label={copy.addLocalMessage} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-bone transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-35 dark:bg-bone dark:text-ink"><Send className="h-4 w-4" aria-hidden="true" /></button></div>
        </section>

        <aside className="space-y-4">
          <section className="border border-ink/10 bg-secondary-50 p-5 dark:border-bone/10 dark:bg-secondary-900/10"><StatusPill tone={opportunity.status}>{copy.fictionalLabel}</StatusPill><p className="mt-4 font-display text-4xl leading-none">{copy.examplePlaces(members, opportunity.capacity)}</p><p className="mt-2 text-sm leading-6 text-ink/65 dark:text-bone/65">{status}</p><p className="mt-2 text-xs text-ink/50 dark:text-bone/50">{copy.exampleMinimum(opportunity.minimum)} · {copy.directCircle}</p><div className="mt-5 flex -space-x-2" aria-hidden="true"><AppAvatar initials="JB" size="sm" /><AppAvatar initials="PL" size="sm" /><AppAvatar initials="KM" size="sm" />{members > 3 && <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary-50 bg-ink text-[9px] font-bold text-bone dark:border-secondary-900">+{members - 3}</span>}</div></section>
          <section className="border border-ink/10 p-5 dark:border-bone/10"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45 dark:text-bone/45">{copy.exampleMoment}</p><div className="mt-4 space-y-4 text-sm"><p className="flex gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-secondary-600" aria-hidden="true" /><span><strong className="block">{opportunity.time}</strong><span className="text-ink/55 dark:text-bone/55">{opportunity.duration}</span></span></p><p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" /><span><strong className="block">{opportunity.place}</strong><span className="text-ink/55 dark:text-bone/55">{copy.examplePlaceOnly}</span></span></p></div></section>
          <section className="bg-ink p-5 text-bone dark:bg-plum"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-200"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {copy.afterLabel}</p><p className="mt-3 font-display text-2xl leading-[1.02]">{copy.afterTitle}</p><p className="mt-3 text-xs leading-5 text-bone/55">{copy.afterBody}</p></section>
        </aside>
      </div>

      <section className="mt-8 flex flex-col gap-4 border-t border-ink/10 py-6 text-sm dark:border-bone/10 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2 text-ink/60 dark:text-bone/60"><CheckCircle2 className="h-4 w-4 text-moss" aria-hidden="true" /> {copy.noMembership}</p><Link to="/app/world" className="inline-flex items-center gap-2 font-bold text-primary-700 hover:text-primary-500 dark:text-primary-300">{copy.returnWorld} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
    </div>
  );
}