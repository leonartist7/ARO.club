import { describe, expect, it } from 'vitest';
import { BRINGS, CONTEXTS, WANTS, createFormationResult } from './fixtures';
import {
  FORMATION_STATUS,
  createInitialFormationState,
  formationReducer,
} from './formationMachine';

const select = (state, anchor, id) => formationReducer(state, { type: 'SELECT_SIGNAL', anchor, id });

function form(selection) {
  let state = createInitialFormationState();
  state = select(state, 'want', selection.want);
  state = select(state, 'bring', selection.bring);
  state = select(state, 'context', selection.context);
  state = formationReducer(state, { type: 'BEGIN_FORM' });
  return formationReducer(state, { type: 'COMPLETE_FORM' });
}

describe('UX0 fixture mapping', () => {
  it('maps the complete 3 × 3 × 3 contract to 27 stable unique results', () => {
    const ids = new Set();

    for (const want of WANTS) {
      for (const bring of BRINGS) {
        for (const context of CONTEXTS) {
          const { result, missingAnchors } = createFormationResult({
            want: want.id,
            bring: bring.id,
            context: context.id,
          });
          expect(missingAnchors).toEqual([]);
          expect(result.id).toBe(`${want.id}--${bring.id}--${context.id}`);
          expect(result.rationaleKeys).toEqual([want.needKey, bring.contributionKey, context.fitKey]);
          ids.add(result.id);
        }
      }
    }

    expect(ids.size).toBe(27);
  });

  it('produces the locked shared-stories example', () => {
    const { result } = createFormationResult({
      want: 'conversational-spanish',
      bring: 'cooking-stories',
      context: 'kitchen-saturday',
    });

    expect(result).toMatchObject({
      id: 'conversational-spanish--cooking-stories--kitchen-saturday',
      titleKey: 'home.formation.fixtures.wants.conversationalSpanish.title',
      peopleKey: 'home.formation.fixtures.contexts.kitchenSaturday.people',
      placeKey: 'home.formation.fixtures.contexts.kitchenSaturday.place',
      timeKey: 'home.formation.fixtures.contexts.kitchenSaturday.time',
    });
  });

  it('preserves recognized selections and rejects an unknown fixture', () => {
    const mapped = createFormationResult({
      want: 'confidence-speaking',
      bring: 'not-a-fixture',
      context: 'library-tuesday',
    });

    expect(mapped.result).toBeNull();
    expect(mapped.recognized).toEqual({
      want: 'confidence-speaking',
      bring: null,
      context: 'library-tuesday',
    });
    expect(mapped.missingAnchors).toEqual(['bring']);
  });
});
describe('UX0 formation state machine', () => {
  it('moves intro → partial → ready → forming → formed without a submit action', () => {
    let state = createInitialFormationState();
    expect(state.status).toBe(FORMATION_STATUS.INTRO);

    state = select(state, 'want', 'conversational-spanish');
    expect(state.status).toBe(FORMATION_STATUS.SIGNALS_PARTIAL);
    state = select(state, 'bring', 'cooking-stories');
    expect(state.status).toBe(FORMATION_STATUS.SIGNALS_PARTIAL);
    state = select(state, 'context', 'kitchen-saturday');
    expect(state.status).toBe(FORMATION_STATUS.READY_TO_FORM);
    state = formationReducer(state, { type: 'BEGIN_FORM' });
    expect(state.status).toBe(FORMATION_STATUS.FORMING);
    state = formationReducer(state, { type: 'COMPLETE_FORM' });

    expect(state.status).toBe(FORMATION_STATUS.FORMED);
    expect(state.result.id).toBe('conversational-spanish--cooking-stories--kitchen-saturday');
  });

  it('edits a formed result and recomputes deterministically', () => {
    let state = form({
      want: 'conversational-spanish',
      bring: 'cooking-stories',
      context: 'kitchen-saturday',
    });

    state = formationReducer(state, { type: 'START_EDIT' });
    expect(state.status).toBe(FORMATION_STATUS.EDITING);
    state = select(state, 'bring', 'patient-practice');
    expect(state.status).toBe(FORMATION_STATUS.READY_TO_FORM);
    state = formationReducer(state, { type: 'BEGIN_FORM' });
    state = formationReducer(state, { type: 'COMPLETE_FORM' });

    expect(state.result.id).toBe('conversational-spanish--patient-practice--kitchen-saturday');
  });

  it('clears one signal without losing the other recognized choices', () => {
    const formed = form({
      want: 'new-city-connections',
      bring: 'weeknight-energy',
      context: 'riverside-sunday',
    });
    const state = formationReducer(formed, { type: 'CLEAR_SIGNAL', anchor: 'context' });

    expect(state.status).toBe(FORMATION_STATUS.SIGNALS_PARTIAL);
    expect(state.result).toBeNull();
    expect(state.selection).toEqual({
      want: 'new-city-connections',
      bring: 'weeknight-energy',
      context: null,
    });
    expect(state.validationAnchor).toBe('context');
  });

  it('fails boundedly on an unknown edit and resets ephemeral state', () => {
    const formed = form({
      want: 'confidence-speaking',
      bring: 'patient-practice',
      context: 'library-tuesday',
    });
    const fallback = select(formed, 'want', 'unknown');

    expect(fallback.status).toBe(FORMATION_STATUS.SIGNALS_PARTIAL);
    expect(fallback.result).toBeNull();
    expect(fallback.selection.bring).toBe('patient-practice');
    expect(fallback.validationAnchor).toBe('want');
    expect(formationReducer(fallback, { type: 'RESET' })).toEqual(createInitialFormationState());
  });
});
