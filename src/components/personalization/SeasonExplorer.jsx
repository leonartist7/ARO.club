'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Heart, List, Map, Sparkles, Sun, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { experienceCopy } from '../../i18n/experience/copy';
import { chapters, getItem } from '../../data/personalization/catalog';
const icons = [Compass, Users, Heart, Sparkles];
const objects = ['plant','lantern','bag','spark'];
const destinations = ['/app/opportunities/river-photo-walk','/app/opportunities/shared-stories','/app/opportunities/repair-table','/app/create'];

export default function SeasonExplorer({ c, Art, onChapter, onPlus, onItem }) {
  const t = experienceCopy(useLanguage().language);
  const [view,setView] = useState('world');
  const [selected,setSelected] = useState(0);
  const chapter = chapters[selected];
  const Icon = icons[selected];
  return <>
    <header className="sx-heading"><div><p className="pv-eyebrow"><Sun size={16} aria-hidden="true" />{c('seasonEyebrow')}</p><h1>{c('seasonTitle')}</h1><p className="pv-intro">{c('seasonIntro')}</p></div><span className="sx-edition" aria-hidden="true">01</span></header>
    <div className="sx-toolbar"><p>{t('choose')}</p><div className="pv-tabs" role="group" aria-label={t('view')}>
      <button type="button" aria-pressed={view==='world'} className={view==='world'?'is-active':''} onClick={()=>setView('world')}><Map size={16} aria-hidden="true" />{t('worldView')}</button>
      <button type="button" aria-pressed={view==='list'} className={view==='list'?'is-active':''} onClick={()=>setView('list')}><List size={16} aria-hidden="true" />{t('listView')}</button>
    </div></div>
    <section className="sx-journey" aria-label={t('chapters')}>
      <div className="sx-world-column">
        {view==='world' && <div className="sx-world"><Art name="season" size={960} alt={c('sceneAlt')} c={c} eager /><div className="sx-world-caption"><span>{t('seasonLabel')}</span><strong>{t('next')}</strong></div>
          <div className="sx-world-points" aria-label={t('choose')}>{chapters.map((entry,i)=><button type="button" key={entry.id} className={`sx-point sx-point-${i}`} aria-label={`${entry.number} · ${c(entry.title)}`} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{entry.number}</button>)}</div>
        </div>}
        <ol className={`sx-chapters ${view==='list'?'sx-list':''}`}>{chapters.map((entry,i)=>{const ChapterIcon=icons[i];return <li key={entry.id}><button type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="sx-chapter-index">{entry.number}</span><ChapterIcon size={20} aria-hidden="true" /><span><strong>{c(entry.title)}</strong>{view==='list'&&<small>{c(entry.detail)}</small>}</span></button></li>;})}</ol>
      </div>
      <div className="sx-selected" aria-live="polite" aria-atomic="true">
        <div className="sx-selected-top"><span className="sx-symbol"><Icon size={24} aria-hidden="true" /></span><span className="pv-eyebrow">{t('chapter')} {chapter.number}</span></div>
        <h2>{c(chapter.title)}</h2><p>{c(chapter.detail)}</p>
        <div className="sx-invitation"><h3>{t('invitation')}</h3><p>{c(chapter.invitation)}</p></div>
        <Link className="pv-action" href={destinations[selected]}>{t(selected===3?'seed':'sampleQuest')}<ArrowRight size={18} aria-hidden="true" /></Link>
        <button className="pv-text-button" type="button" onClick={()=>onChapter(chapter)}>{t('details')}<ArrowRight size={16} aria-hidden="true" /></button>
        <small className="sx-concept">{t('concept')}</small>
      </div>
    </section>
    <section className="sx-keepsakes"><div className="sx-section-heading"><div><p className="pv-eyebrow">{c('collection')}</p><h2>{t('keepsakes')}</h2></div><p>{t('keepsakeBody')}</p></div>
      <div className="sx-object-grid">{chapters.map((entry,i)=><button type="button" key={entry.id} onClick={()=>onItem(getItem(objects[i]))} aria-label={`${t('previewItem')}: ${c(objects[i])}`}><span className="sx-object-number">{entry.number}</span><Art name={objects[i]} size={256} alt="" c={c} /><strong>{c(objects[i])}</strong><span>{c(entry.title)}<ArrowRight size={15} aria-hidden="true" /></span></button>)}</div>
    </section>
    <div className="sx-bottom"><section className="sx-pace"><Compass size={24} aria-hidden="true" /><h2>{t('pace')}</h2><p>{t('paceBody')}</p></section>
      <aside className="sx-plus"><div><p className="pv-eyebrow">{c('seasonPlus')}</p><h2>{c('plusTitle')}</h2><p>{c('plusBody')}</p><button className="pv-text-button" type="button" onClick={onPlus}>{c('compare')}<ArrowRight size={18} aria-hidden="true" /></button></div><Art name="hat" size={256} alt="" c={c} /></aside></div>
  </>;
}
