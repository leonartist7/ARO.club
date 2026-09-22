'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { experienceCopy } from '../../i18n/experience/copy';
import { AppImage } from '../app/AppImage';

export function ExperienceHeading({ eyebrow, title, intro }) {
  return <header className="ef-heading"><p className="ef-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header>;
}
function Filters({ values, value, onChange, c, label }) {
  return <div className="ef-filters" role="group" aria-label={label}>{values.map(id => <button key={id} type="button" aria-pressed={value === id} onClick={() => onChange(id)}>{c(id)}</button>)}</div>;
}
export function MessagesPage() {
  const c = experienceCopy(useLanguage().language);
  const [tab, setTab] = useState('circles');
  return <div className="ef-page">
    <ExperienceHeading eyebrow={c('messages')} title={c('messageTitle')} intro={c('messageIntro')} />
    <div className="ef-tools"><Filters values={['circles','direct']} value={tab} onChange={setTab} c={c} label={c('messages')} /></div>
    {tab === 'circles' ? <article className="ef-idea ef-circle">
      <AppImage src="/aro-shared-stories-table-v1.png" alt="" variant="card" className="h-full w-full object-cover" />
      <div className="ef-idea-copy"><small>{c('sample')}</small><h2>{c('sampleCircle')}</h2><p>{c('circleBody')}</p><Link className="ef-link" href="/app/circles/shared-stories">{c('openCircle')}<ArrowRight size={18} aria-hidden="true" /></Link></div>
    </article> : <section className="ef-empty"><MessageCircle size={36} aria-hidden="true" /><h2>{c('noMessages')}</h2><p>{c('noMessagesBody')}</p><Link href="/app/world" className="ef-link">{c('search')}<ArrowRight size={18} aria-hidden="true" /></Link></section>}
  </div>;
}
const ideas = [
  { id:'river-photo-walk', title:'photo', body:'photoBody', category:'outdoors', image:'/aro-river-light-circle-v1.png' },
  { id:'shared-stories', title:'stories', body:'storiesBody', category:'together', image:'/aro-shared-stories-table-v1.png' },
];
export function SavedPage() {
  const c = experienceCopy(useLanguage().language);
  const [filter,setFilter] = useState('all');
  const [query,setQuery] = useState('');
  const visible = ideas.filter(item => (filter === 'all' || item.category === filter) && `${c(item.title)} ${c(item.body)}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className="ef-page">
    <ExperienceHeading eyebrow={c('saved')} title={c('savedTitle')} intro={c('savedIntro')} />
    <div className="ef-tools"><Filters values={['all','outdoors','together']} value={filter} onChange={setFilter} c={c} label={c('saved')} />
      <label className="ef-search"><Search size={18} aria-hidden="true" /><input type="search" aria-label={c('searchSaved')} placeholder={c('searchSaved')} value={query} onChange={e=>setQuery(e.target.value)} /></label>
    </div>
    <div className="ef-grid">{visible.length ? visible.map(item => <article className="ef-idea" key={item.id}>
      <AppImage src={item.image} alt="" variant="card" className="w-full object-cover" />
      <div className="ef-idea-copy"><small>{c('sample')}</small><h2>{c(item.title)}</h2><p>{c(item.body)}</p><Link className="ef-link" href={`/app/opportunities/${item.id}`}>{c('open')}<ArrowRight size={18} aria-hidden="true" /></Link></div>
    </article>) : <section className="ef-empty"><Search size={32} aria-hidden="true" /><h2>{c('empty')}</h2><button className="ef-link" type="button" onClick={()=>{setFilter('all');setQuery('');}}>{c('clear')}<ArrowRight size={18} aria-hidden="true" /></button></section>}</div>
  </div>;
}
