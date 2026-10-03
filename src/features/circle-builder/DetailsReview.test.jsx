import React, { useReducer } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { builderReducer, createBuilderState, hasSketchEdits, sketchSummary, validateSketch, validSketchDate, validSketchZone } from './builderMachine';
import { CATEGORY_REGISTRY, DETAILS_GROUPS, getExample } from './registry';
import { getCircleBuilderCopy } from '../../i18n/circleBuilder';
import ChooseScreen from './ChooseScreen';
import ShapeScreen from './ShapeScreen';
import DetailsScreen from './DetailsScreen';
import ReviewScreen from './ReviewScreen';
import ReadyScreen from './ReadyScreen';

beforeAll(() => {
  vi.stubGlobal('React', React);
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () { this.open = false; };
});
afterEach(cleanup);
afterAll(() => vi.unstubAllGlobals());
const reduce = (state, type, rest = {}) => builderReducer(state, { type, ...rest });
function filled(categoryId = 'languages', step = 'details') {
  const base = createBuilderState();
  return { ...base, categoryId, step, fields: { ...base.fields, title: 'A small practice', outcome: 'Practice together.' } };
}
const set = (state, field, value) => reduce(state, 'SET_FIELD', { field, value });
const copy = getCircleBuilderCopy('en');
function Harness({ initial = filled(), locale = 'en' }) {
  const [state, dispatch] = useReducer(builderReducer, initial);
  const Component = { choose: ChooseScreen, shape: ShapeScreen, details: DetailsScreen, review: ReviewScreen, ready: ReadyScreen }[state.step];
  return <Component state={state} dispatch={dispatch} locale={locale} focusHeading />;
}
const click = name => { const button = screen.getByRole('button', { name, exact: true }); button.focus(); fireEvent.click(button); };
const type = (name, value) => fireEvent.change(screen.getByLabelText(name, { exact: true }), { target: { value } });

describe('Phase 4 domain constraints', () => {
  it('allows optional logistics and validates planned seats1–4 / duration1–240 without truncating', () => {
    expect(validateSketch(filled())).toEqual({});
    for (const value of ['5', '50', '0', '-1', '1.5', '1e1', '01', 'Infinity']) expect(validateSketch(set(filled(), 'groupSize', value)).groupSize).toBeTruthy();
    for (const value of ['1', '4', ' 4 ']) expect(validateSketch(set(filled(), 'groupSize', value)).groupSize).toBeUndefined();
    expect(sketchSummary(set(filled(), 'groupSize', '5')).groupSize).toBeNull();
    expect(validateSketch(set(filled(), 'durationMinutes', '241')).durationMinutes).toBeTruthy();
    expect(validateSketch(set(filled(), 'durationMinutes', '240')).durationMinutes).toBeUndefined();
    const long = set(filled(), 'audience', '😀'.repeat(81)); expect(long.fields.audience.length).toBe(162); expect(validateSketch(long).audience).toBe('too-long');
  });
  it('checks actual calendar days, century leap years, exact24h time and explicit IANA zones', () => {
    for (const value of ['2024-02-29', '2000-02-29', '0001-01-01', '9999-12-31']) expect(validSketchDate(value)).toBe(true);
    for (const value of ['1900-02-29', '2025-02-29', '2024-04-31', '0000-01-01', '2024-00-01', '2024-1-01']) expect(validSketchDate(value)).toBe(false);
    for (const value of ['24:00', '09:60', '9:30', '00:00:00']) expect(validateSketch(set(filled(), 'time', value)).time).toBe('invalid-time');
    expect(validateSketch(set(filled(), 'time', '23:59')).time).toBeUndefined();
    expect(validSketchZone('Europe/Paris')).toBe(true); expect(validSketchZone('UTC')).toBe(true);
    for (const value of ['Missing/Zone', '+01:00', '-05:00', 'x'.repeat(81)]) expect(validSketchZone(value)).toBe(false);
  });
  it('allows individual partial schedule values but requires zone for date+time', () => {
    const date = set(filled(), 'date', '2026-10-03'); expect(validateSketch(date)).toEqual({});
    const pair = set(date, 'time', '10:30'); expect(validateSketch(pair).timeZone).toBe('zone-required');
    const explicit = set(pair, 'timeZone', 'Europe/Paris'); expect(validateSketch(explicit)).toEqual({});
    expect(sketchSummary(explicit)).toMatchObject({ date: '2026-10-03', time: '10:30', timeZone: 'Europe/Paris' });
    expect(Object.keys(sketchSummary(explicit)).some(key => /instant|booking|capacity|published|saved/i.test(key))).toBe(false);
  });
  it('targets all named edit groups, returns directly and retains current edits on Back', () => {
    for (const group of Object.keys(DETAILS_GROUPS)) {
      const edited = reduce(filled('skills', 'review'), 'EDIT', { step: 'details', group });
      expect(edited.detailsGroup).toBe(group); expect(edited.reviewReturnTarget).toBe('details:' + group);
      const returned = reduce(set(edited, 'audience', 'Current edit'), 'NEXT'); expect(returned.step).toBe('review'); expect(returned.reviewFocusTarget).toBe('details:' + group);
      const back = reduce(set(edited, 'audience', 'Retained'), 'BACK'); expect(back.step).toBe('review'); expect(back.fields.audience).toBe('Retained');
    }
    const shape = reduce(filled('music', 'review'), 'EDIT', { step: 'shape' }); expect(reduce(shape, 'NEXT').step).toBe('review');
    expect(reduce(filled('music', 'review'), 'EDIT', { step: 'details', group: '__proto__' }).step).toBe('review');
  });
  it('routes invalid review values to editable target and rejects inherited group keys', () => {
    const bad = reduce(set(filled('skills', 'review'), 'groupSize', '5'), 'NEXT');
    expect(bad.step).toBe('details'); expect(bad.detailsGroup).toBe('people'); expect(bad.reviewReturnTarget).toBe('details:people');
    const shape = reduce(set(filled('skills', 'review'), 'title', ''), 'NEXT'); expect(shape.step).toBe('shape');
    for (const group of ['constructor', '__proto__', 'bad']) expect(reduce(filled(), 'OPEN_DETAILS_GROUP', { group }).detailsGroup).toBe('people');
  });
  it('locks confirmation, never replaces a pending dialog and ignores UI-only edits for reset', () => {
    const empty = { ...createBuilderState(), guideMinimized: true, detailsGroup: 'time', touched: { title: true } };
    expect(hasSketchEdits(empty)).toBe(false); expect(reduce(empty, 'REQUEST_RESET')).toEqual(createBuilderState());
    const pending = reduce(filled('music', 'ready'), 'REQUEST_RESET');
    for (const type of ['NEXT', 'EDIT_SKETCH', 'REQUEST_RESET', 'OPEN_DETAILS_GROUP']) expect(reduce(pending, type, { group: 'time' })).toBe(pending);
    expect(set(pending, 'title', 'Lost')).toBe(pending);
    expect(reduce(pending, 'CANCEL_RESET').fields).toEqual(pending.fields);
    expect(reduce(pending, 'CONFIRM_RESET')).toEqual(createBuilderState());
    const categoryPending = reduce({ ...filled(), categoryAnswers: { targetLanguage: 'French' } }, 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(reduce(categoryPending, 'REQUEST_RESET')).toBe(categoryPending);
    expect(reduce(categoryPending, 'CONFIRM_CATEGORY').step).toBe('choose');
  });
});

describe('Details, Review and Ready components', () => {
  it.each(CATEGORY_REGISTRY)('completes with undecided logistics for $id and uses actual guide', category => {
    render(<Harness initial={filled(category.id)} />); click(copy.detailsNext);
    expect(screen.getByText(category.label.en)).toBeTruthy(); expect(screen.getAllByText(copy.toDecide).length).toBeGreaterThan(0);
    expect(screen.getByText({ languages: 'Tonguee', skills: 'Squilly', music: 'Rockatoo' }[category.id])).toBeTruthy();
    click(copy.finishSketch); expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(copy.readyTitle); expect(screen.getByText(copy.readyBody)).toBeTruthy();
  });
  it.each(['en', 'fr', 'es'])('supports localized exact fields, venue labels and completion: %s', locale => {
    const local = getCircleBuilderCopy(locale); expect(Object.keys(local)).toEqual(Object.keys(copy));
    render(<Harness locale={locale} />); type(local.detailFields.audience, 'Adult beginners'); click(local.place);
    expect(screen.queryByLabelText(local.detailFields.audience, { exact: true })).toBeNull();
    type(local.detailFields.venueType, 'public-library'); click(local.detailsNext);
    expect(screen.getByText('Adult beginners')).toBeTruthy(); expect(screen.getByText(local.venueLabels['public-library'])).toBeTruthy(); click(local.finishSketch); expect(screen.getByText(local.readyBody)).toBeTruthy();
  });
  it('opens only one group, preserves answers, shows actual live text and keeps typing focus', () => {
    render(<Harness />); type(copy.detailFields.audience, '<script>synthetic</script>'); click(copy.place);
    expect(screen.queryByLabelText(copy.detailFields.audience, { exact: true })).toBeNull(); type(copy.detailFields.placeDescription, 'A public library'); click(copy.people);
    expect(screen.getByLabelText(copy.detailFields.audience, { exact: true }).value).toBe('<script>synthetic</script>');
    click(copy.showSketch); expect(screen.getByText('<script>synthetic</script>')).toBeTruthy(); expect(document.querySelector('script')).toBeNull(); expect(screen.getByText('A public library')).toBeTruthy();
  });
  it('opens closed invalid group, focuses first invalid, does not truncate or steal typing focus', () => {
    render(<Harness />); type(copy.detailFields.groupSize, '5'); type(copy.detailFields.audience, 'x'.repeat(161)); click(copy.place); click(copy.detailsNext);
    expect(document.activeElement.id).toBe('builder-audience'); const audience = screen.getByLabelText(copy.detailFields.audience, { exact: true }); expect(audience.value.length).toBe(161);
    type(copy.detailFields.audience, 'Adults'); expect(document.activeElement.id).toBe('builder-audience');
    click(copy.detailsNext); expect(document.activeElement.id).toBe('builder-groupSize'); expect(screen.getByText(copy.sizeError)).toBeTruthy();
  });
  it('requires explicit timezone, retains invalid date and supports a partial plan', () => {
    render(<Harness />); click(copy.timeGroup); type(copy.detailFields.date, '2025-02-29'); type(copy.detailFields.time, '09:30'); click(copy.detailsNext);
    expect(document.activeElement.id).toBe('builder-date'); expect(screen.getByLabelText(copy.detailFields.date, { exact: true }).value).toBe('2025-02-29');
    type(copy.detailFields.date, '2024-02-29'); click(copy.detailsNext); expect(document.activeElement.id).toBe('builder-timeZone'); expect(screen.getByText(copy.zoneRequired)).toBeTruthy();
    type(copy.detailFields.time, ''); click(copy.detailsNext); expect(screen.getByText('2024-02-29')).toBeTruthy(); expect(screen.getAllByText(copy.toDecide).length).toBeGreaterThan(0);
  });
  it('edits all named sections with direct return and summary focus; Back retains edits', () => {
    render(<Harness initial={filled('music', 'review')} />);
    for (const [edit, target, field] of [[copy.editPeople, 'details-people', 'audience'], [copy.editPlace, 'details-place', 'placeDescription'], [copy.editTime, 'details-time', 'durationMinutes']]) {
      click(edit); type(copy.detailFields[field], field === 'durationMinutes' ? '45' : 'My current edit'); click(copy.returnReview);
      expect(document.activeElement.id).toBe('builder-summary-' + target);
    }
    click(copy.editShape); type(copy.title, 'Changed title'); click(copy.returnReview); expect(document.activeElement.id).toBe('builder-summary-shape');
    click(copy.editPeople); type(copy.detailFields.audience, 'Retained on Back'); click(copy.backReview); expect(screen.getByText('Retained on Back')).toBeTruthy();
  });
  it('truthful Ready edit returns Review; reset cancels/restores trigger or clears confirmed sketch', () => {
    render(<Harness initial={filled('skills', 'ready')} />); click(copy.editSketch); expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(copy.reviewTitle); click(copy.finishSketch);
    click(copy.startAnother); expect(document.activeElement.textContent).toBe(copy.keepEditing); click(copy.keepEditing); expect(document.activeElement.textContent).toBe(copy.startAnother); expect(screen.getByText('A small practice')).toBeTruthy();
    click(copy.startAnother); const dialog = screen.getByRole('dialog'); fireEvent.click(within(dialog).getByRole('button', { name: copy.startAnother }));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(copy.chooseTitle); expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(0);
  });
  it('repairs retained invalid edits in the correct screen after entering a different editor', () => {
    render(<Harness initial={filled('skills', 'review')} />); click(copy.editShape); type(copy.title, ''); click(copy.backReview); click(copy.editPeople); click(copy.returnReview);
    expect(document.activeElement.id).toBe('builder-title'); type(copy.title, 'Repaired'); click(copy.returnReview);
    click(copy.editPeople); type(copy.detailFields.groupSize, '5'); click(copy.backReview); click(copy.editShape); type(copy.title, 'Still mine'); click(copy.returnReview); click(copy.finishSketch);
    expect(document.activeElement.id).toBe('builder-groupSize'); type(copy.detailFields.groupSize, '4'); click(copy.returnReview); click(copy.finishSketch); expect(screen.getByText(copy.readyBody)).toBeTruthy();
  });
  it('preserves transient data with guide hidden without persistence/transmission', () => {
    const storage = [localStorage.length, sessionStorage.length], send = vi.spyOn(globalThis, 'fetch');
    render(<Harness />); type(copy.detailFields.audience, 'F3-SYNTHETIC-CANARY'); click(copy.hideGuide); click(copy.detailsNext); click(copy.finishSketch);
    expect(screen.getByText('F3-SYNTHETIC-CANARY')).toBeTruthy(); expect([localStorage.length, sessionStorage.length]).toEqual(storage); expect(send).not.toHaveBeenCalled(); send.mockRestore();
    expect(getExample('music', 'first-guitar-rhythm').title).toBeTruthy();
  });
});
