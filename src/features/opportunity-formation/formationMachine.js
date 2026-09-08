import { ANCHORS, createFormationResult, fixtureFor } from './fixtures';

export const FORMATION_STATUS = {
  INTRO: 'INTRO',
  SIGNALS_PARTIAL: 'SIGNALS_PARTIAL',
  READY_TO_FORM: 'READY_TO_FORM',
  FORMING: 'FORMING',
  FORMED: 'FORMED',
  EDITING: 'EDITING',
};

export function createInitialFormationState() {
  return {
    status: FORMATION_STATUS.INTRO,
    selection: { want: null, bring: null, context: null },
    result: null,
    missingAnchors: [...ANCHORS],
    validationAnchor: null,
    revision: 0,
  };
}
function evaluateSelection(selection, revision, validationAnchor = null) {
  const { result, recognized, missingAnchors } = createFormationResult(selection);

  return {
    status: result ? FORMATION_STATUS.READY_TO_FORM : FORMATION_STATUS.SIGNALS_PARTIAL,
    selection: recognized,
    result: null,
    missingAnchors,
    validationAnchor,
    revision,
  };
}

export function formationReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SIGNAL': {
      if (!ANCHORS.includes(action.anchor)) return state;

      const recognized = fixtureFor(action.anchor, action.id);
      const selection = {
        ...state.selection,
        [action.anchor]: recognized?.id ?? null,
      };

      return evaluateSelection(
        selection,
        state.revision + 1,
        recognized ? null : action.anchor
      );
    }

    case 'CLEAR_SIGNAL': {
      if (!ANCHORS.includes(action.anchor)) return state;
      return evaluateSelection(
        { ...state.selection, [action.anchor]: null },
        state.revision + 1,
        action.anchor
      );
    }

    case 'BEGIN_FORM':
      return state.status === FORMATION_STATUS.READY_TO_FORM
        ? { ...state, status: FORMATION_STATUS.FORMING }
        : state;

    case 'COMPLETE_FORM': {
      if (state.status !== FORMATION_STATUS.FORMING) return state;
      const { result, recognized, missingAnchors } = createFormationResult(state.selection);

      if (!result) {
        return {
          ...state,
          status: FORMATION_STATUS.SIGNALS_PARTIAL,
          selection: recognized,
          result: null,
          missingAnchors,
          validationAnchor: missingAnchors[0] ?? null,
        };
      }

      return {
        ...state,
        status: FORMATION_STATUS.FORMED,
        result,
        missingAnchors: [],
        validationAnchor: null,
      };
    }

    case 'START_EDIT':
      return state.status === FORMATION_STATUS.FORMED
        ? { ...state, status: FORMATION_STATUS.EDITING }
        : state;

    case 'RESET':
      return createInitialFormationState();

    default:
      return state;
  }
}
