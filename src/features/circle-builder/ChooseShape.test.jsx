import React, { useReducer } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { builderReducer, createBuilderState } from './builderMachine';
import ChooseScreen from './ChooseScreen';
import ShapeScreen from './ShapeScreen';
import { CATEGORY_REGISTRY, getExample } from './registry';
import { circleBuilderCopy, getCircleBuilderCopy } from '../../i18n/circleBuilder';

beforeAll(() => {
  vi.stubGlobal('React', React); // Existing Vitest uses classic JSX; Next uses automatic JSX.
  // jsdom does not implement native dialog. Real trapping/Escape/inertness are browser assertions.
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () { this.open = false; };
});
afterEach(cleanup);
afterAll(() => vi.unstubAllGlobals());
function Harness({ initial = createBuilderState(), locale = 'en', onContinue = () => {} }) {
  const [state, dispatch] = useReducer(builderReducer, initial);
  const Component = state.step === 'choose' ? ChooseScreen : ShapeScreen;
  return <><Component state={state} dispatch={dispatch} locale={locale} focusHeading={state.step === 'shape'} onContinue={onContinue} /><output data-testid="step">{state.step}</output></>;
}
function shape(categoryId = 'languages') { return { ...createBuilderState(), step: 'shape', categoryId }; }
const click = name => { const button = screen.getByRole('button', { name }); button.focus(); fireEvent.click(button); };
const type = (name, value) => fireEvent.change(screen.getByLabelText(name), { target: { value } });

describe('Choose and Shape', () => {
  it('starts with disclosure and no selected group; validates/focuses selection', () => {
    render(<Harness />);
    expect(screen.getByText(circleBuilderCopy.en.disclosure)).toBeTruthy();
    const search = screen.getByLabelText(circleBuilderCopy.en.search);
    for (const text of [circleBuilderCopy.en.disclosure, circleBuilderCopy.en.boundary]) {
      expect(screen.getByText(text).compareDocumentPosition(search) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(0);
    click('Shape my idea');
    expect(document.activeElement.textContent).toBe('Languages');
    expect(screen.getByText(circleBuilderCopy.en.categoryError)).toBeTruthy();
  });
  it.each(CATEGORY_REGISTRY)('offers example and manual paths for $id', category => {
    render(<Harness />); click(category.label.en); click('Use this example'); click('Shape my idea');
    const example = getExample(category.id, category.examples[0].id);
    expect(screen.getByLabelText('Title').value).toBe(example.title);
    expect(screen.getByLabelText(circleBuilderCopy.en.outcome).value).toBe(example.outcome);
    expect(document.activeElement.tagName).toBe('H1');
    click('Back to Choose'); click('Start with my own idea'); click('Shape my idea');
    expect(screen.getByLabelText('Title').value).toBe(example.title);
  });
  it.each(['en', 'fr', 'es'])('has complete localized dictionary and example path: %s', locale => {
    const copy = getCircleBuilderCopy(locale);
    expect(Object.keys(copy)).toEqual(Object.keys(circleBuilderCopy.en));
    render(<Harness locale={locale} />); click(CATEGORY_REGISTRY[2].label[locale]); click(copy.useExample); click(copy.chooseNext);
    expect(screen.getByLabelText(copy.title).value).toBe(getExample('music', 'first-guitar-rhythm', locale).title);
  });
  it('searches case/accent tolerant labels; clears empty result with focus', () => {
    render(<Harness locale="es" />); type('Buscar un grupo', 'MUSICA');
    expect(screen.getByRole('button', { name: 'Música' })).toBeTruthy();
    type('Buscar un grupo', 'zzz'); expect(screen.getByText(circleBuilderCopy.es.noResults)).toBeTruthy();
    click('Borrar búsqueda'); expect(document.activeElement.id).toBe('builder-search');
    expect(screen.getByRole('button', { name: 'Idiomas' })).toBeTruthy();
  });
  it('blocks empty and overlong answers without truncating; focuses first invalid', () => {
    const onContinue = vi.fn(); render(<Harness initial={shape()} onContinue={onContinue} />);
    click('Add the details'); expect(document.activeElement.id).toBe('builder-title');
    type('Title', 'x'.repeat(81)); type(circleBuilderCopy.en.outcome, 'Practice'); click('Add the details');
    expect(screen.getByLabelText('Title').value.length).toBe(81); expect(onContinue).not.toHaveBeenCalled();
    type('Title', 'My idea'); type('Language to practice', 'x'.repeat(161)); click('Add the details');
    expect(document.activeElement.id).toBe('builder-targetLanguage'); expect(onContinue).not.toHaveBeenCalled();
  });
  it('validates trimmed UTF-16 limits including surrogate pairs and optional answers', () => {
    let state = shape(); state = builderReducer(state, { type: 'SET_FIELD', field: 'title', value: '😀'.repeat(41) });
    state = builderReducer(state, { type: 'SET_FIELD', field: 'outcome', value: 'Practice' });
    expect(builderReducer(state, { type: 'NEXT' }).errors.title).toBe('too-long');
  });
  it('preserves manual and explicitly cleared fields when using an example', () => {
    render(<Harness initial={shape()} />); type('Title', 'Mine'); type(circleBuilderCopy.en.outcome, 'Draft'); type(circleBuilderCopy.en.outcome, ''); click('Back to Choose'); click('Use this example'); click('Shape my idea');
    expect(screen.getByLabelText('Title').value).toBe('Mine'); expect(screen.getByLabelText(circleBuilderCopy.en.outcome).value).toBe('');
  });
  it('shows current/proposed answer; cancel and explicit accept retain focus and other fields', () => {
    render(<Harness initial={shape()} />); type('Title', 'Mine'); type(circleBuilderCopy.en.outcome, 'My outcome');
    click('Use suggested title'); expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Mine')).toBeTruthy(); expect(document.activeElement.textContent).toBe('Keep my answer');
    click('Keep my answer'); expect(screen.getByLabelText('Title').value).toBe('Mine'); expect(document.activeElement.textContent).toBe('Use suggested title');
    click('Use suggested title'); click('Apply suggestion'); expect(screen.getByLabelText('Title').value).toBe('French over coffee');
    expect(screen.getByLabelText(circleBuilderCopy.en.outcome).value).toBe('My outcome');
  });
  it('confirms incompatible category answers with labels and preserves shared edits', () => {
    render(<Harness initial={{ ...shape(), categoryAnswers: { targetLanguage: 'French' }, fields: { ...shape().fields, title: 'Mine' } }} />);
    click('Back to Choose'); click('Music'); expect(screen.getByRole('dialog')).toBeTruthy(); expect(screen.getByText('Language to practice')).toBeTruthy();
    click('Keep category'); expect(screen.getByRole('button', { name: 'Languages' }).getAttribute('aria-pressed')).toBe('true');
    click('Music'); click('Change category'); click('Shape my idea'); expect(screen.getByLabelText('Title').value).toBe('Mine'); expect(screen.queryByLabelText('Language to practice')).toBeNull();
  });
  it('hide/show guide preserves editing and artwork failure keeps guide text', () => {
    render(<Harness initial={shape('music')} />); type('Title', 'Mine'); click('Hide guide');
    expect(screen.queryByText('Rockatoo')).toBeNull(); expect(screen.getByLabelText('Title').value).toBe('Mine');
    click('Show guide'); fireEvent.error(document.querySelector('img')); expect(screen.getByRole('img', { name: /Rockatoo/ })).toBeTruthy(); expect(screen.getByText('Rockatoo')).toBeTruthy();
  });
  it('explicit acceptance is allowlisted, pending-state locked and protects against future example fills', () => {
    const original = shape();
    expect(builderReducer(original, { type: 'ACCEPT_SUGGESTION', field: 'audience', exampleId: 'coffee-conversation' })).toBe(original);
    expect(builderReducer(original, { type: 'ACCEPT_SUGGESTION', field: 'title', exampleId: 'missing' })).toBe(original);
    expect(builderReducer({ ...original, pendingReset: true }, { type: 'ACCEPT_SUGGESTION', field: 'title', exampleId: 'coffee-conversation' }).fields.title).toBe('');
    const accepted = builderReducer(original, { type: 'ACCEPT_SUGGESTION', field: 'title', exampleId: 'coffee-conversation' });
    expect(accepted.touched.title).toBe(true); expect(accepted.fields.outcome).toBe('');
  });
  it('does not persist or transmit synthetic field values; ignores unknown locale', () => {
    const stored = localStorage.length, send = vi.spyOn(globalThis, 'fetch');
    render(<Harness initial={shape()} locale="unknown" />); type('Title', 'F2-SYNTHETIC-CANARY'); click('Back to Choose'); click('Shape my idea');
    expect(screen.getByLabelText('Title').value).toBe('F2-SYNTHETIC-CANARY'); expect(localStorage.length).toBe(stored); expect(send).not.toHaveBeenCalled(); send.mockRestore();
  });
});
