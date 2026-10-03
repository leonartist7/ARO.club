import {
  BUILDER_STEPS, SHARED_FIELDS, TEXT_LIMITS, VENUE_TYPES,
  getCategory, getExample, DETAILS_GROUPS, getDetailsGroupForField,
} from './registry';

export function createBuilderState() {
  return {
    step: 'choose', categoryId: null, ideaSource: 'own',
    fields: { title: '', outcome: '', audience: '', placeDescription: '', venueType: 'to-decide', groupSize: '', durationMinutes: '', date: '', time: '', timeZone: '' },
    categoryAnswers: {}, touched: {}, errors: {},
    guideMinimized: false, pendingCategory: null, pendingReset: false,
    detailsGroup: 'people', reviewReturnTarget: null, reviewFocusTarget: null,
  };
}

export function validSketchDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1];
}
export function validSketchZone(value) {
  if (!value || value.length > TEXT_LIMITS.timeZone || /^[+-]/.test(value)) return false;
  try { new Intl.DateTimeFormat('en', { timeZone: value }); return true; } catch { return false; }
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
  for (const [field, ceiling] of [['groupSize', 4], ['durationMinutes', 240]]) {
    const value = state.fields[field].trim();
    if (value !== '' && (!/^[1-9]\d*$/.test(value) || Number(value) > ceiling)) errors[field] = 'positive-whole-number';
  }
  if (!VENUE_TYPES.includes(state.fields.venueType)) errors.venueType = 'public-venue-only';
  const date = state.fields.date.trim(), time = state.fields.time.trim(), zone = state.fields.timeZone.trim();
  if (date && !validSketchDate(date)) errors.date = 'invalid-date';
  if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) errors.time = 'invalid-time';
  if (zone && !validSketchZone(zone)) errors.timeZone = zone.length > TEXT_LIMITS.timeZone ? 'too-long' : 'invalid-zone';
  if (date && time && !zone) errors.timeZone = 'zone-required';
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
    ...state, categoryId, fields, step: changed ? 'choose' : state.step,
    categoryAnswers: changed ? Object.fromEntries(Object.entries(state.categoryAnswers).filter(([field]) => destinationFields.includes(field))) : state.categoryAnswers,
    touched: Object.fromEntries(Object.entries(state.touched).filter(([key]) => !key.startsWith('answer:') || destinationFields.includes(key.slice(7)))),
    errors: {}, pendingCategory: null, ideaSource: changed ? 'own' : state.ideaSource,
    reviewReturnTarget: changed ? null : state.reviewReturnTarget,
    reviewFocusTarget: changed ? null : state.reviewFocusTarget,
  };
}

function blockingErrors(state) {
  const errors = validateSketch(state);
  if (state.step === 'choose') return errors.categoryId ? { categoryId: errors.categoryId } : {};
  if (state.step === 'shape') {
    const keys = ['categoryId', 'title', 'outcome', ...(getCategory(state.categoryId)?.answerFields ?? [])];
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
      const fields = { ...state.fields, [action.field]: action.value };
      if (['date', 'time'].includes(action.field) && errors.timeZone === 'zone-required' && (!fields.date.trim() || !fields.time.trim())) delete errors.timeZone;
      return { ...state, fields, touched: { ...state.touched, [action.field]: true }, errors };
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
    case 'START_OWN_IDEA':
      return !locked(state) && state.step === 'choose' && getCategory(state.categoryId)
        ? { ...state, ideaSource: 'own' } : state;
    case 'ACCEPT_SUGGESTION': {
      if (locked(state) || state.step !== 'shape' || !['title', 'outcome'].includes(action.field)) return state;
      const example = getExample(state.categoryId, action.exampleId, action.locale);
      if (!example) return state;
      const errors = { ...state.errors };
      delete errors[action.field];
      return { ...state, fields: { ...state.fields, [action.field]: example[action.field] },
        touched: { ...state.touched, [action.field]: true }, errors };
    }
    case 'NEXT': {
      if (locked(state)) return state;
      const errors = blockingErrors(state);
      if (Object.keys(errors).length) {
        const first = Object.keys(errors)[0], group = getDetailsGroupForField(first);
        const step = ['details', 'review'].includes(state.step) ? first === 'categoryId' ? 'choose' : group ? 'details' : 'shape' : state.step;
        return { ...state, step, errors, detailsGroup: group ?? state.detailsGroup,
          reviewReturnTarget: state.step === 'review' || (state.reviewReturnTarget && step !== state.step) ? group ? 'details:' + group : 'shape' : state.reviewReturnTarget };
      }
      const index = BUILDER_STEPS.indexOf(state.step);
      if (index < 0 || index >= BUILDER_STEPS.length - 1) return state;
      return { ...state, step: state.reviewReturnTarget && ['shape', 'details'].includes(state.step) ? 'review' : BUILDER_STEPS[index + 1], errors: {},
        reviewFocusTarget: state.reviewReturnTarget, reviewReturnTarget: null };
    }
    case 'BACK': {
      if (state.pendingCategory || state.pendingReset) return state;
      if (state.reviewReturnTarget && ['shape', 'details'].includes(state.step)) return { ...state, step: 'review', errors: {}, reviewFocusTarget: state.reviewReturnTarget, reviewReturnTarget: null };
      const index = BUILDER_STEPS.indexOf(state.step);
      return index > 0 ? { ...state, step: BUILDER_STEPS[index - 1], errors: {} } : state;
    }
    case 'EDIT': {
      if (state.pendingCategory || state.pendingReset || !['review', 'ready'].includes(state.step) || !['shape', 'details'].includes(action.step)) return state;
      const group = action.group ?? 'people';
      if (action.step === 'details' && !Object.hasOwn(DETAILS_GROUPS, group)) return state;
      return { ...state, step: action.step, detailsGroup: action.step === 'details' ? group : state.detailsGroup,
        reviewReturnTarget: action.step === 'details' ? 'details:' + group : 'shape', reviewFocusTarget: null, errors: {} };
    }
    case 'OPEN_DETAILS_GROUP':
      return !locked(state) && state.step === 'details' && (action.group === null || Object.hasOwn(DETAILS_GROUPS, action.group))
        ? { ...state, detailsGroup: action.group } : state;
    case 'EDIT_SKETCH':
      return state.step === 'ready' && !state.pendingReset && !state.pendingCategory ? { ...state, step: 'review', errors: {}, reviewReturnTarget: null, reviewFocusTarget: null } : state;
    case 'MINIMIZE_GUIDE':
      return typeof action.minimized === 'boolean' ? { ...state, guideMinimized: action.minimized } : state;
    case 'REQUEST_RESET':
      if (state.pendingCategory || state.pendingReset) return state;
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
    groupSize: /^[1-9]\d*$/.test(state.fields.groupSize.trim()) && Number(state.fields.groupSize) <= 4 ? Number(state.fields.groupSize) : null,
    durationMinutes: /^[1-9]\d*$/.test(state.fields.durationMinutes.trim()) && Number(state.fields.durationMinutes) <= 240 ? Number(state.fields.durationMinutes) : null,
    date: state.fields.date.trim() || null, time: state.fields.time.trim() || null, timeZone: state.fields.timeZone.trim() || null,
    categoryAnswers: Object.fromEntries(Object.entries(state.categoryAnswers).filter(([key]) => category?.answerFields.includes(key)).map(([key, value]) => [key, value.trim()])),
  };
}
