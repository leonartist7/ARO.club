import React, { useReducer, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ChooseScreen from '../../features/circle-builder/ChooseScreen';
import ShapeScreen from '../../features/circle-builder/ShapeScreen';
import { builderReducer, createBuilderState } from '../../features/circle-builder/builderMachine';
import '../../index.css';

function Fixture() {
  const [state, dispatch] = useReducer(builderReducer, undefined, createBuilderState);
  const [navigated, setNavigated] = useState(false);
  const locale = new URLSearchParams(location.search).get('locale') ?? 'en';
  document.documentElement.lang = locale;
  const props = { state, dispatch, locale, focusHeading: navigated, onContinue: () => setNavigated(true) };
  return <main className="min-h-screen p-4 pb-8 sm:p-8">
    <p className="mx-auto mb-6 max-w-3xl text-base font-semibold">CB1-F2 · Isolated test fixture</p>
    {state.step === 'choose' ? <ChooseScreen {...props} /> : state.step === 'shape' ? <ShapeScreen {...props} /> : <section><h1 tabIndex={-1}>F2 handoff accepted</h1><p>Details is a later package. This is test evidence only.</p></section>}
  </main>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
