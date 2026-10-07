'use client';
import { useReducer } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from '../lib/navigation';
import { getFv1DiscoveryCopy } from '../i18n/fv1/discovery';
import { getCircleBuilderCopy } from '../i18n/circleBuilder';
import ChooseScreen from '../features/circle-builder/ChooseScreen';
import ShapeScreen from '../features/circle-builder/ShapeScreen';
import DetailsScreen from '../features/circle-builder/DetailsScreen';
import ReviewScreen from '../features/circle-builder/ReviewScreen';
import ReadyScreen from '../features/circle-builder/ReadyScreen';
import BuilderExitGuard from '../features/circle-builder/BuilderExitGuard';
import LiveSketch from '../features/circle-builder/SketchSummary';
import { builderReducer, createBuilderState, hasSketchEdits } from '../features/circle-builder/builderMachine';

export function createEntryState(search) {
  const state = createBuilderState();
  const mode = new URLSearchParams(search).get('mode');
  const categoryId = { learn: 'languages', share: 'skills' }[mode];
  return categoryId ? builderReducer(state, { type: 'SELECT_CATEGORY', categoryId }) : state;
}

const screens = { choose: ChooseScreen, shape: ShapeScreen, details: DetailsScreen, review: ReviewScreen, ready: ReadyScreen };
const linkClass = 'inline-flex min-h-11 items-center gap-2 px-1 text-base font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export default function AppCreatePage() {
  const { language } = useLanguage(), location = useLocation();
  const [state, dispatch] = useReducer(builderReducer, location.search, createEntryState);
  const copy = getCircleBuilderCopy(language), discovery = getFv1DiscoveryCopy(language);
  const Screen = screens[state.step];
  const sideSketch = ['choose', 'shape'].includes(state.step);
  return <div lang={language} className="min-h-[calc(100vh-5rem)] bg-bone px-4 py-5 text-ink dark:bg-plum dark:text-bone sm:px-8 sm:py-10">
    <Link to="/app/world" aria-label={discovery.create.closeToWorld} className={linkClass}><ArrowLeft className="h-4 w-4" aria-hidden="true" />{discovery.create.backToWorld}</Link>
    <div className={'mt-6 grid min-w-0 gap-8 ' + (sideSketch ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]' : '')}>
      <Screen key={state.step} state={state} dispatch={dispatch} locale={language} focusHeading />
      {sideSketch && <LiveSketch state={state} copy={copy} locale={language} />}
    </div>
    <footer className="mt-8 border-t border-control-border pt-5"><Link to="/app/world" className={linkClass}>{discovery.create.returnWorld}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></footer>
    <BuilderExitGuard meaningful={hasSketchEdits(state)} copy={copy} onDiscard={() => { dispatch({ type: 'REQUEST_RESET' }); dispatch({ type: 'CONFIRM_RESET' }); }} />
  </div>;
}
