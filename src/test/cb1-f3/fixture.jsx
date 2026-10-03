import React, { useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import ChooseScreen from '../../features/circle-builder/ChooseScreen';
import ShapeScreen from '../../features/circle-builder/ShapeScreen';
import DetailsScreen from '../../features/circle-builder/DetailsScreen';
import ReviewScreen from '../../features/circle-builder/ReviewScreen';
import ReadyScreen from '../../features/circle-builder/ReadyScreen';
import { builderReducer, createBuilderState } from '../../features/circle-builder/builderMachine';
import '../../index.css';

function Fixture() {
  const [state, dispatch] = useReducer(builderReducer, undefined, createBuilderState);
  const locale = new URLSearchParams(location.search).get('locale') ?? 'en';
  document.documentElement.lang = locale;
  const Component = { choose: ChooseScreen, shape: ShapeScreen, details: DetailsScreen, review: ReviewScreen, ready: ReadyScreen }[state.step];
  return <main className="min-h-screen p-4 pb-8 sm:p-8"><p className="mx-auto mb-6 max-w-6xl text-base font-semibold">CB1-F3 · Isolated component verification</p><Component state={state} dispatch={dispatch} locale={locale} focusHeading /></main>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
