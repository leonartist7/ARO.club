const freeze = (value) => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};

export const BUILDER_STEPS = freeze(['choose', 'shape', 'details', 'review', 'ready']);
export const GUIDE_REGISTRY = freeze([
  { id: 'tonguee', name: 'Tonguee', species: 'chameleon', categoryId: 'languages' },
  { id: 'squilly', name: 'Squilly', species: 'squirrel', categoryId: 'skills' },
  { id: 'rockatoo', name: 'Rockatoo', species: 'white-cockatoo', categoryId: 'music' },
]);

export const CATEGORY_REGISTRY = freeze([
  {
    id: 'languages', guideId: 'tonguee',
    label: { en: 'Languages', fr: 'Langues', es: 'Idiomas' },
    answerFields: ['targetLanguage', 'practiceLevel', 'activity'],
    prompts: {
      shape: { en: 'What would you like people to feel ready to say?', fr: 'Que pourront dire les participants avec plus de confiance ?', es: '¿Qué te gustaría que las personas se animaran a decir?' },
      details: { en: 'A public indoor place can make conversation easier. What would work for your group?', fr: 'Un lieu public en intérieur peut faciliter la conversation. Quel lieu conviendrait au groupe ?', es: 'Un lugar público bajo techo puede facilitar la conversación. ¿Qué funcionaría para tu grupo?' },
      review: { en: 'Does the activity match the language level you have in mind?', fr: 'L’activité correspond-elle au niveau de langue prévu ?', es: '¿La actividad corresponde al nivel de idioma que tienes en mente?' },
    },
    examples: [{
      id: 'coffee-conversation',
      title: { en: 'French over coffee', fr: 'Le français autour d’un café', es: 'Francés entre cafés' },
      outcome: { en: 'Practice ordering and introducing yourself in French.', fr: 'S’entraîner à commander et à se présenter en français.', es: 'Practicar cómo pedir y presentarse en francés.' },
      venueType: 'indoor-cafe',
    }],
  },
  {
    id: 'skills', guideId: 'squilly',
    label: { en: 'Skills', fr: 'Savoir-faire', es: 'Habilidades' },
    answerFields: ['skill', 'experienceLevel', 'materials'],
    prompts: {
      shape: { en: 'What will people make or be able to do by the end?', fr: 'Que pourront créer ou faire les participants à la fin ?', es: '¿Qué podrán crear o hacer las personas al terminar?' },
      details: { en: 'What materials should people bring, and what will you provide?', fr: 'Quel matériel faut-il apporter, et que fournirez-vous ?', es: '¿Qué materiales deben traer y cuáles vas a proporcionar?' },
      review: { en: 'Is the outcome achievable with the time and materials you chose?', fr: 'Le résultat est-il réalisable avec le temps et le matériel prévus ?', es: '¿Se puede lograr el resultado con el tiempo y los materiales elegidos?' },
    },
    examples: [{
      id: 'drawing-practice',
      title: { en: 'Draw your first city sketch', fr: 'Dessiner sa première scène de ville', es: 'Dibuja tu primer boceto de la ciudad' },
      outcome: { en: 'Practice simple shapes and leave with a small drawing.', fr: 'Pratiquer des formes simples et repartir avec un petit dessin.', es: 'Practicar formas sencillas y llevarse un pequeño dibujo.' },
      venueType: 'public-studio',
    }],
  },
  {
    id: 'music', guideId: 'rockatoo',
    label: { en: 'Music', fr: 'Musique', es: 'Música' },
    answerFields: ['instrument', 'experienceLevel', 'practiceFormat', 'equipment'],
    prompts: {
      shape: { en: 'What small musical moment would you like people to play or sing?', fr: 'Quel petit moment musical aimeriez-vous faire jouer ou chanter ?', es: '¿Qué pequeño momento musical te gustaría que tocaran o cantaran?' },
      details: { en: 'Choose a public space where the sound and equipment fit the session.', fr: 'Choisissez un lieu public adapté au son et au matériel de la séance.', es: 'Elige un espacio público adecuado para el sonido y el equipo de la sesión.' },
      review: { en: 'Does everyone know the starting level and equipment they will need?', fr: 'Le niveau de départ et le matériel nécessaire sont-ils clairs ?', es: '¿Queda claro el nivel inicial y el equipo que van a necesitar?' },
    },
    examples: [{
      id: 'first-guitar-rhythm',
      title: { en: 'Your first guitar rhythm', fr: 'Votre premier rythme à la guitare', es: 'Tu primer ritmo de guitarra' },
      outcome: { en: 'Practice a simple rhythm and play it together.', fr: 'Pratiquer un rythme simple et le jouer ensemble.', es: 'Practicar un ritmo sencillo y tocarlo juntos.' },
      venueType: 'public-rehearsal-space',
    }],
  },
]);

export const VENUE_TYPES = freeze(['to-decide', 'indoor-cafe', 'public-studio', 'public-rehearsal-space', 'public-library', 'other-public-venue']);
export const DETAILS_GROUPS = freeze({ people: ['audience', 'groupSize'], place: ['venueType', 'placeDescription'], time: ['durationMinutes', 'date', 'time', 'timeZone'] });
export const getDetailsGroupForField = field => Object.keys(DETAILS_GROUPS).find(group => DETAILS_GROUPS[group].includes(field)) ?? null;
export const SHARED_FIELDS = freeze(['title', 'outcome', 'audience', 'placeDescription', 'venueType', 'groupSize', 'durationMinutes', 'date', 'time', 'timeZone']);
export const TEXT_LIMITS = freeze({ title: 80, outcome: 240, audience: 160, placeDescription: 160, timeZone: 80, categoryAnswer: 160 });
export const SUPPORTED_LOCALES = freeze(['en', 'fr', 'es']);

export function builderLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
}
export function getCategory(categoryId) {
  return CATEGORY_REGISTRY.find((category) => category.id === categoryId) ?? null;
}
export function getGuide(categoryId) {
  const category = getCategory(categoryId);
  return GUIDE_REGISTRY.find((guide) => guide.id === category?.guideId) ?? null;
}
export function getExample(categoryId, exampleId, locale = 'en') {
  const category = getCategory(categoryId);
  const example = category?.examples.find((item) => item.id === exampleId);
  if (!example) return null;
  const language = builderLocale(locale);
  return { id: example.id, title: example.title[language], outcome: example.outcome[language], venueType: example.venueType };
}
export function getGuidance(categoryId, step, locale = 'en') {
  const category = getCategory(categoryId);
  if (!category || typeof step !== 'string' || !Object.hasOwn(category.prompts, step)) return null;
  const prompt = category.prompts[step];
  return { guide: getGuide(categoryId), prompt: prompt[builderLocale(locale)] };
}
export function searchCategories(query = '', locale = 'en') {
  if (typeof query !== 'string') return [];
  const language = builderLocale(locale);
  const normalized = query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(language);
  return CATEGORY_REGISTRY.filter((category) => {
    const label = category.label[language].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(language);
    return label.includes(normalized);
  });
}
