import {
  BUILDER_STEPS, SHARED_FIELDS, TEXT_LIMITS, VENUE_TYPES,
  getCategory, getExample,
} from './registry';

export function createBuilderState() {
  return {
    step: 'choose', categoryId: null, ideaSource: 'own',
    fields: { title: '', outcome: '', audience: '', placeDescription: '', venueType: 'to-decide', groupSize: '', durationMinutes: '' },
    categoryAnswers: {}, touched: {}, errors: {},
    guideMinimized: false, pendingCategory: null, pendingReset: false,
  };
}

export function hasSketchEdits(state) {
  return state.categoryId !== null || Object.values(state.categoryAnswers).some((value) => value.trim() !== '')
    || Object.entries(state.fields).some(([key, value]) => key === 'venueType' ? value !== 'to-decide' : value.trim() !== '');
}

export function validateSketch(state) {
  const errors = {};
  if (!getCategory(state.categoryId)) errors.categoryId = 'choose-category';
  for (const field of ['title', 'outcome']) {
    const value = state.fields[field].trim();
    if (!value) errors[field] = 'required';
    else if (value.length > TEXT_LIMITS[field]) errors[field] = 'too-long';
  }
  for (const field of ['audience', 'placeDescription']) {
    if (state.fields[field].trim().length > TEXT_LIMITS[field]) errors[field] = 'too-long';
  }
  for (const [field, ceiling] of [['groupSize', 50], ['durationMinutes', 240]]) {
    const value = state.fields[field].trim();
    if (value !== '' && (!/^[1-9]\d*$/.test(value) || Number(value) > ceiling)) errors[field] = 'positive-whole-number';
  }
  if (!VENUE_TYPES.includes(state.fields.venueType)) errors.venueType = 'public-venue-only';
  for (const [field, value] of Object.entries(state.categoryAnswers)) {
    if (!getCategory(state.categoryId)?.answerFields.includes(field)) errors[field] = 'unknown-answer';
    else if (value.trim().length > TEXT_LIMITS.categoryAnswer) errors[field] = 'too-long';
  }
  return errors;
}

function changeCategory(state, categoryId) {
  const changed = categoryId !== state.categoryId;
  const destinationFields = getCategory(categoryId).answerFields;
  const fields = { ...state.fields };
  if (changed && state.ideaSource === 'example') {
    for (const field of ['title', 'outcome', 'venueType']) {
      if (!state.touched[field]) fields[field] = field === 'venueType' ? 'to-decide' : '';
    }
  }
  return {
    ...state, categoryId, fields,
    categoryAnswers: changed ? Object.fromEntries(Object.entries(state.categoryAnswers).filter(([field]) => destinationFields.includes(field))) : state.categoryAnswers,
    touched: Object.fromEntries(Object.entries(state.touched).filter(([key]) => !key.startsWith('answer:') || destinationFields.includes(key.slice(7)))),
    errors: {}, pendingCategory: null, ideaSource: changed ? 'own' : state.ideaSource,
  };
}

function blockingErrors(state) {
  const errors = validateSketch(state);
  if (state.step === 'choose') return errors.categoryId ? { categoryId: errors.categoryId } : {};
  if (state.step === 'shape') {
    const keys = ['categoryId', 'title', 'outcome'];
    return Object.fromEntries(Object.entries(errors).filter(([key]) => keys.includes(key)));
  }
  return errors;
}

const locked = (state) => state.step === 'ready' || state.pendingCategory !== null || state.pendingReset;

export function builderReducer(state, action) {
  if (!action || typeof action.type !== 'string') return state;
  switch (action.type) {
    case 'SELECT_CATEGORY': {
      if (locked(state) || !getCategory(action.categoryId) || action.categoryId === state.categoryId) return state;
      const destinationFields = getCategory(action.categoryId).answerFields;
      const affectedFields = Object.entries(state.categoryAnswers).filter(([field, value]) => !destinationFields.includes(field) && value.trim() !== '').map(([key]) => key);
      if (affectedFields.length) return { ...state, pendingCategory: { categoryId: action.categoryId, affectedFields } };
      return changeCategory(state, action.categoryId);
    }
    case 'CONFIRM_CATEGORY':
      return state.pendingCategory ? changeCategory(state, state.pendingCategory.categoryId) : state;
    case 'CANCEL_CATEGORY':
      return state.pendingCategory ? { ...state, pendingCategory: null } : state;
    case 'SET_FIELD': {
      if (locked(state) || !SHARED_FIELDS.includes(action.field) || typeof action.value !== 'string') return state;
      const errors = { ...state.errors };
      delete errors[action.field];
      return { ...state, fields: { ...state.fields, [action.field]: action.value }, touched: { ...state.touched, [action.field]: true }, errors };
    }
    case 'SET_ANSWER': {
      if (locked(state) || !getCategory(state.categoryId)?.answerFields.includes(action.field) || typeof action.value !== 'string') return state;
      const errors = { ...state.errors };
      delete errors[action.field];
      return { ...state, categoryAnswers: { ...state.categoryAnswers, [action.field]: action.value }, touched: { ...state.touched, ['answer:' + action.field]: true }, errors };
    }
    case 'USE_EXAMPLE': {
      if (locked(state) || !['choose', 'shape'].includes(state.step)) return state;
      const example = getExample(state.categoryId, action.exampleId, action.locale);
      if (!example) return state;
      const fields = { ...state.fields };
      const errors = { ...state.errors };
      let changed = false;
      for (const field of ['title', 'outcome', 'venueType']) {
        const empty = field === 'venueType' ? fields[field] === 'to-decide' : fields[field].trim() === '';
        if (empty && !state.touched[field]) {
          fields[field] = example[field];
          delete errors[field];
          changed = true;
        }
      }
      return changed ? { ...state, fields, errors, ideaSource: 'example' } : state;
    }
    case 'NEXT': {
      if (locked(state)) return state;
      const errors = blockingErrors(state);
      if (Object.keys(errors).length) return { ...state, errors };
      const index = BUILDER_STEPS.indexOf(state.step);
      if (index < 0 || index >= BUILDER_STEPS.length - 1) return state;
      return { ...state, step: BUILDER_STEPS[index + 1], errors: {} };
    }
    case 'BACK': {
      if (state.pendingCategory || state.pendingReset) return state;
      const index = BUILDER_STEPS.indexOf(state.step);
      return index > 0 ? { ...state, step: BUILDER_STEPS[index - 1], errors: {} } : state;
    }
    case 'EDIT':
      return !state.pendingCategory && !state.pendingReset && ['review', 'ready'].includes(state.step) && ['shape', 'details'].includes(action.step)
        ? { ...state, step: action.step, errors: {} } : state;
    case 'MINIMIZE_GUIDE':
      return typeof action.minimized === 'boolean' ? { ...state, guideMinimized: action.minimized } : state;
    case 'REQUEST_RESET':
      return hasSketchEdits(state) ? { ...state, pendingReset: true, pendingCategory: null } : createBuilderState();
    case 'CANCEL_RESET':
      return state.pendingReset ? { ...state, pendingReset: false } : state;
    case 'CONFIRM_RESET':
      return state.pendingReset ? createBuilderState() : state;
    default:
      return state;
  }
}

export function sketchSummary(state) {
  const category = getCategory(state.categoryId);
  return {
    kind: 'local-sketch',
    categoryId: category?.id ?? null,
    guideId: category?.guideId ?? null,
    title: state.fields.title.trim(), outcome: state.fields.outcome.trim(),
    audience: state.fields.audience.trim() || null,
    placeDescription: state.fields.placeDescription.trim() || null,
    venueType: VENUE_TYPES.includes(state.fields.venueType) && state.fields.venueType !== 'to-decide' ? state.fields.venueType : null,
    groupSize: /^[1-9]\d*$/.test(state.fields.groupSize.trim()) && Number(state.fields.groupSize) <= 50 ? Number(state.fields.groupSize) : null,
    durationMinutes: /^[1-9]\d*$/.test(state.fields.durationMinutes.trim()) && Number(state.fields.durationMinutes) <= 240 ? Number(state.fields.durationMinutes) : null,
    categoryAnswers: Object.fromEntries(Object.entries(state.categoryAnswers).map(([key, value]) => [key, value.trim()])),
  };
}
