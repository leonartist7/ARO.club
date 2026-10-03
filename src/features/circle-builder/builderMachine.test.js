import { describe, expect, it } from 'vitest';
import { CATEGORY_REGISTRY, GUIDE_REGISTRY, getCategory, getGuide, getGuidance, getExample, searchCategories } from './registry';
import { builderReducer, createBuilderState, hasSketchEdits, sketchSummary, validateSketch } from './builderMachine';

const dispatch = (state, type, rest = {}) => builderReducer(state, { type, ...rest });
const select = (id = 'languages') => dispatch(createBuilderState(), 'SELECT_CATEGORY', { categoryId: id });
const set = (state, field, value) => dispatch(state, 'SET_FIELD', { field, value });
function filled(id = 'languages') {
  return set(set(select(id), 'title', 'A shared moment'), 'outcome', 'Practice together.');
}
function frozen(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(frozen);
    Object.freeze(value);
  }
  return value;
}

describe('Circle Builder category and guide foundation', () => {
  it('keeps founder names/species and unique mappings', () => {
    expect(GUIDE_REGISTRY.map(({ name, species }) => [name, species])).toEqual([
      ['Tonguee', 'chameleon'], ['Squilly', 'squirrel'], ['Rockatoo', 'white-cockatoo'],
    ]);
    expect(new Set(CATEGORY_REGISTRY.map((category) => category.id)).size).toBe(3);
    CATEGORY_REGISTRY.forEach((category) => expect(getGuide(category.id).id).toBe(category.guideId));
  });
  it('freezes nested public registry data', () => {
    expect(Object.isFrozen(CATEGORY_REGISTRY[0].examples[0].title)).toBe(true);
    expect(Object.isFrozen(GUIDE_REGISTRY[0])).toBe(true);
  });
  it('fails closed for unknown and prototype-like IDs', () => {
    for (const id of ['unknown', '__proto__', 'constructor', null]) {
      expect(getCategory(id)).toBeNull();
      expect(getGuide(id)).toBeNull();
      expect(getExample(id, 'anything')).toBeNull();
    }
  });
  it('provides indoor examples and guidance in EN/FR/ES', () => {
    for (const category of CATEGORY_REGISTRY) {
      for (const locale of ['en', 'fr', 'es']) {
        const example = getExample(category.id, category.examples[0].id, locale);
        expect(example.title.length > 0).toBe(true);
        expect(['indoor-cafe', 'public-studio', 'public-rehearsal-space'].includes(example.venueType)).toBe(true);
        expect(getGuidance(category.id, 'shape', locale).guide.id).toBe(category.guideId);
        expect(getGuidance(category.id, 'details', locale).prompt.length > 0).toBe(true);
      }
    }
  });
  it('searches local labels with accents and empty results', () => {
    expect(searchCategories('  MUSICA ', 'es').map((category) => category.id)).toEqual(['music']);
    expect(searchCategories('langues', 'fr').map((category) => category.id)).toEqual(['languages']);
    expect(searchCategories('unlikely category').length).toBe(0);
    expect(searchCategories('', 'en').length).toBe(3);
    expect(searchCategories(null).length).toBe(0);
  });
  it('rejects inherited guidance step names for every category', () => {
    for (const category of CATEGORY_REGISTRY) {
      for (const step of ['constructor', '__proto__', 'toString', 'valueOf', 'hasOwnProperty']) {
        expect(getGuidance(category.id, step)).toBeNull();
      }
      expect(getGuidance(category.id, 'review').prompt.length > 0).toBe(true);
    }
  });
  it('rejects non-string steps without invoking object conversion', () => {
    const coercionAttempt = { toString() { throw new Error('Step conversion must not run'); } };
    for (const category of CATEGORY_REGISTRY) {
      for (const step of [null, undefined, 42, {}, ['shape'], coercionAttempt]) {
        expect(getGuidance(category.id, step)).toBeNull();
      }
    }
  });
  it('falls back to English and rejects unknown examples/steps', () => {
    expect(getExample('languages', 'coffee-conversation', 'de')).toEqual(getExample('languages', 'coffee-conversation', 'en'));
    expect(getExample('music', 'coffee-conversation')).toBeNull();
    expect(getGuidance('music', 'not-a-step')).toBeNull();
  });
});

describe('Circle Builder local state foundation', () => {
  it('requires category then meaningful title/outcome', () => {
    let state = dispatch(createBuilderState(), 'NEXT');
    expect(state.errors).toEqual({ categoryId: 'choose-category' });
    state = dispatch(select(), 'NEXT');
    expect(state.step).toBe('shape');
    state = dispatch(set(state, 'title', '   '), 'NEXT');
    expect(state.step).toBe('shape');
    expect(state.errors).toEqual({ title: 'required', outcome: 'required' });
  });
  it('completes all four steps for each category without publishing', () => {
    for (const category of CATEGORY_REGISTRY) {
      let state = filled(category.id);
      for (const step of ['shape', 'details', 'review', 'ready']) {
        state = dispatch(state, 'NEXT');
        expect(state.step).toBe(step);
      }
      expect(sketchSummary(state).kind).toBe('local-sketch');
      expect(sketchSummary(state).guideId).toBe(category.guideId);
      expect(Object.keys(sketchSummary(state)).includes('published')).toBe(false);
    }
  });
  it('represents undecided logistics without invented numbers', () => {
    const summary = sketchSummary(filled());
    expect([summary.groupSize, summary.durationMinutes, summary.venueType, summary.placeDescription]).toEqual([null, null, null, null]);
  });
  it('trims review text and validates length without truncating', () => {
    let state = set(filled(), 'title', '  Hello  ');
    expect(sketchSummary(state).title).toBe('Hello');
    state = set(state, 'outcome', 'x'.repeat(241));
    expect(validateSketch(state).outcome).toBe('too-long');
    expect(state.fields.outcome.length).toBe(241);
  });
  it('rejects invalid size/duration including numeric-looking text', () => {
    for (const value of ['0', '-1', '1.5', '1e1', 'Infinity', '51', 'words']) {
      expect(validateSketch(set(filled(), 'groupSize', value)).groupSize).toBe('positive-whole-number');
    }
    expect(validateSketch(set(filled(), 'durationMinutes', '241')).durationMinutes).toBe('positive-whole-number');
    expect(validateSketch(set(filled(), 'groupSize', '4')).groupSize).toBeUndefined();
    expect(validateSketch(set(filled(), 'durationMinutes', '240')).durationMinutes).toBeUndefined();
  });
  it('blocks review on invalid numeric or private venue values', () => {
    let state = { ...set(filled(), 'groupSize', '51'), step: 'details' };
    state = dispatch(set(state, 'venueType', 'private-home'), 'NEXT');
    expect(state.step).toBe('details');
    expect(state.errors).toEqual({ groupSize: 'positive-whole-number', venueType: 'public-venue-only' });
    expect(sketchSummary(state).venueType).toBeNull();
  });
  it('ignores unknown/prototype fields and non-string input', () => {
    const initial = frozen(select());
    for (const field of ['__proto__', 'constructor', 'price', 'userId']) {
      expect(dispatch(initial, 'SET_FIELD', { field, value: 'bad' })).toBe(initial);
      expect(dispatch(initial, 'SET_ANSWER', { field, value: 'bad' })).toBe(initial);
    }
    expect(dispatch(initial, 'SET_FIELD', { field: 'title', value: 1 })).toBe(initial);
    expect(dispatch(initial, 'SELECT_CATEGORY', { categoryId: 'unknown' })).toBe(initial);
  });
  it('scopes category answers and bounds their length', () => {
    const state = dispatch(select(), 'SET_ANSWER', { field: 'targetLanguage', value: 'x'.repeat(161) });
    expect(validateSketch(state).targetLanguage).toBe('too-long');
    expect(dispatch(state, 'SET_ANSWER', { field: 'instrument', value: 'guitar' })).toBe(state);
  });
  it('confirms incompatible category changes without losing shared edits', () => {
    const initial = frozen(dispatch(filled(), 'SET_ANSWER', { field: 'targetLanguage', value: 'French' }));
    const pending = dispatch(initial, 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(pending.categoryId).toBe('languages');
    expect(pending.pendingCategory).toEqual({ categoryId: 'music', affectedFields: ['targetLanguage'] });
    expect(dispatch(pending, 'CANCEL_CATEGORY').categoryAnswers).toEqual({ targetLanguage: 'French' });
    const changed = dispatch(pending, 'CONFIRM_CATEGORY');
    expect(changed.categoryId).toBe('music');
    expect(changed.categoryAnswers).toEqual({});
    expect(changed.fields.title).toBe(initial.fields.title);
    expect(changed.fields.outcome).toBe(initial.fields.outcome);
  });
  it('keeps a shared experience answer without a destructive confirmation', () => {
    const initial = frozen(dispatch(filled('skills'), 'SET_ANSWER', { field: 'experienceLevel', value: 'beginner' }));
    const changed = dispatch(initial, 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(changed.categoryId).toBe('music');
    expect(changed.pendingCategory).toBeNull();
    expect(changed.categoryAnswers).toEqual({ experienceLevel: 'beginner' });
    expect(changed.touched['answer:experienceLevel']).toBe(true);
    expect(changed.fields).toEqual(initial.fields);
  });
  it('confirms only incompatible answers and retains compatible answers', () => {
    let initial = dispatch(filled('skills'), 'SET_ANSWER', { field: 'skill', value: 'portrait drawing' });
    initial = frozen(dispatch(initial, 'SET_ANSWER', { field: 'experienceLevel', value: 'beginner' }));
    const pending = dispatch(initial, 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(pending.pendingCategory).toEqual({ categoryId: 'music', affectedFields: ['skill'] });
    expect(dispatch(pending, 'CANCEL_CATEGORY').categoryAnswers).toEqual(initial.categoryAnswers);
    const changed = dispatch(pending, 'CONFIRM_CATEGORY');
    expect(changed.categoryAnswers).toEqual({ experienceLevel: 'beginner' });
    expect(changed.touched['answer:experienceLevel']).toBe(true);
    expect(changed.touched['answer:skill']).toBeUndefined();
  });
  it('keeps a cleared compatible answer and its touched marker through switches', () => {
    let state = dispatch(filled('skills'), 'SET_ANSWER', { field: 'experienceLevel', value: '' });
    state = dispatch(state, 'SET_ANSWER', { field: 'materials', value: 'pencils' });
    state = dispatch(state, 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(state.pendingCategory.affectedFields).toEqual(['materials']);
    state = dispatch(state, 'CONFIRM_CATEGORY');
    expect(state.categoryAnswers).toEqual({ experienceLevel: '' });
    expect(state.touched['answer:experienceLevel']).toBe(true);
    expect(state.touched['answer:materials']).toBeUndefined();
    state = dispatch(state, 'SELECT_CATEGORY', { categoryId: 'skills' });
    expect(state.pendingCategory).toBeNull();
    expect(state.categoryAnswers).toEqual({ experienceLevel: '' });
    expect(state.touched['answer:experienceLevel']).toBe(true);
  });
  it('locks editing/navigation during category confirmation', () => {
    const state = dispatch(dispatch(filled(), 'SET_ANSWER', { field: 'targetLanguage', value: 'French' }), 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(dispatch(state, 'NEXT')).toBe(state);
    expect(set(state, 'title', 'Lost edit')).toBe(state);
    expect(dispatch(state, 'BACK')).toBe(state);
  });
  it('applies examples only to untouched empty fields', () => {
    let state = set(select(), 'title', 'My title');
    state = dispatch(set(state, 'outcome', ''), 'USE_EXAMPLE', { exampleId: 'coffee-conversation', locale: 'fr' });
    expect(state.fields.title).toBe('My title');
    expect(state.fields.outcome).toBe('');
    expect(state.fields.venueType).toBe('indoor-cafe');
  });
  it('removes obsolete example defaults on category switch while preserving edits', () => {
    let state = dispatch(select(), 'USE_EXAMPLE', { exampleId: 'coffee-conversation' });
    state = dispatch(set(state, 'title', 'My own title'), 'SELECT_CATEGORY', { categoryId: 'music' });
    expect(state.fields.title).toBe('My own title');
    expect(state.fields.outcome).toBe('');
    expect(state.fields.venueType).toBe('to-decide');
    expect(state.ideaSource).toBe('own');
  });
  it('preserves answers through Back and edit from Review/Ready', () => {
    let state = dispatch({ ...filled(), step: 'review' }, 'EDIT', { step: 'shape' });
    expect(state.fields.title).toBe('A shared moment');
    state = dispatch(state, 'BACK');
    expect(state.step).toBe('review');
    state = dispatch({ ...state, step: 'ready' }, 'EDIT', { step: 'details' });
    expect(state.step).toBe('details');
    expect(state.fields.outcome).toBe('Practice together.');
  });
  it('minimizes guidance without altering the sketch', () => {
    const initial = filled('music');
    const state = dispatch(initial, 'MINIMIZE_GUIDE', { minimized: true });
    expect(state.guideMinimized).toBe(true);
    expect(sketchSummary(state)).toEqual(sketchSummary(initial));
  });
  it('confirms reset and supports cancellation without lost edits', () => {
    const initial = frozen(filled());
    expect(hasSketchEdits(initial)).toBe(true);
    const requested = dispatch(initial, 'REQUEST_RESET');
    expect(requested.pendingReset).toBe(true);
    expect(dispatch(requested, 'NEXT')).toBe(requested);
    expect(dispatch(requested, 'CANCEL_RESET').fields).toEqual(initial.fields);
    expect(dispatch(requested, 'CONFIRM_RESET')).toEqual(createBuilderState());
    expect(dispatch(initial, 'CONFIRM_RESET')).toBe(initial);
  });
  it('keeps state immutable and ignores unknown actions', () => {
    const state = frozen(filled());
    const next = dispatch(state, 'NEXT');
    expect(state.step).toBe('choose');
    expect(next.step).toBe('shape');
    expect(dispatch(state, 'UNRECOGNIZED')).toBe(state);
    expect(builderReducer(state, null)).toBe(state);
    expect(createBuilderState()).toEqual(createBuilderState());
  });
});
