'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import { getGuide, getGuidance } from './registry';

function GuideArtwork({ guide, copy }) {
  const [failed, setFailed] = useState(false);
  const base = '/brand/circle-builder/' + guide.id + '-welcome-';
  return <div className="flex h-24 w-24 shrink-0 items-center justify-center lg:h-40 lg:w-40">
    {failed ? <span role="img" aria-label={guide.name + ': ' + copy.guideFallback}><Sparkles aria-hidden="true" className="h-10 w-10 text-primary-500 dark:text-primary-300" /></span>
      : <img src={base + '192.webp'} srcSet={base + '192.webp 192w, ' + base + '384.webp 384w'} sizes="(min-width: 1024px) 160px, 96px" width="192" height="192" alt="" onError={() => setFailed(true)} className="h-full w-full object-contain" />}
  </div>;
}
export default function BuilderGuide({ state, dispatch, locale, copy, step = 'shape' }) {
  const guide = getGuide(state.categoryId);
  if (!guide) return null;
  const prompt = getGuidance(state.categoryId, step, locale)?.prompt;
  return <aside aria-label={copy.guide} className="mt-6 rounded-2xl border border-control-border bg-surface-canvas p-4 dark:bg-surface-darkCard">
    <Button type="button" variant="ghost" aria-expanded={!state.guideMinimized} onClick={() => dispatch({ type: 'MINIMIZE_GUIDE', minimized: !state.guideMinimized })} className="motion-reduce:transition-none">{state.guideMinimized ? copy.showGuide : copy.hideGuide}</Button>
    {!state.guideMinimized && <div className="mt-3 flex items-center gap-4">
      <GuideArtwork key={guide.id} guide={guide} copy={copy} />
      <div className="min-w-0"><p className="font-bold">{guide.name}</p><p className="mt-1 break-words text-base">{prompt}</p></div>
    </div>}
  </aside>;
}
