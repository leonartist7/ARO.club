export const ANCHORS = ['want', 'bring', 'context'];

export const WANTS = [
  {
    id: 'conversational-spanish',
    labelKey: 'home.formation.fixtures.wants.conversationalSpanish.label',
    titleKey: 'home.formation.fixtures.wants.conversationalSpanish.title',
    needKey: 'home.formation.fixtures.wants.conversationalSpanish.need',
  },
  {
    id: 'confidence-speaking',
    labelKey: 'home.formation.fixtures.wants.confidenceSpeaking.label',
    titleKey: 'home.formation.fixtures.wants.confidenceSpeaking.title',
    needKey: 'home.formation.fixtures.wants.confidenceSpeaking.need',
  },
  {
    id: 'new-city-connections',
    labelKey: 'home.formation.fixtures.wants.newCityConnections.label',
    titleKey: 'home.formation.fixtures.wants.newCityConnections.title',
    needKey: 'home.formation.fixtures.wants.newCityConnections.need',
  },
];

export const BRINGS = [
  {
    id: 'weeknight-energy',
    labelKey: 'home.formation.fixtures.brings.weeknightEnergy.label',
    contributionKey: 'home.formation.fixtures.brings.weeknightEnergy.contribution',
  },
  {
    id: 'cooking-stories',
    labelKey: 'home.formation.fixtures.brings.cookingStories.label',
    contributionKey: 'home.formation.fixtures.brings.cookingStories.contribution',
  },
  {
    id: 'patient-practice',
    labelKey: 'home.formation.fixtures.brings.patientPractice.label',
    contributionKey: 'home.formation.fixtures.brings.patientPractice.contribution',
  },
];

export const CONTEXTS = [
  {
    id: 'library-tuesday',
    labelKey: 'home.formation.fixtures.contexts.libraryTuesday.label',
    peopleKey: 'home.formation.fixtures.contexts.libraryTuesday.people',
    placeKey: 'home.formation.fixtures.contexts.libraryTuesday.place',
    timeKey: 'home.formation.fixtures.contexts.libraryTuesday.time',
    fitKey: 'home.formation.fixtures.contexts.libraryTuesday.fit',
  },
  {
    id: 'kitchen-saturday',
    labelKey: 'home.formation.fixtures.contexts.kitchenSaturday.label',
    peopleKey: 'home.formation.fixtures.contexts.kitchenSaturday.people',
    placeKey: 'home.formation.fixtures.contexts.kitchenSaturday.place',
    timeKey: 'home.formation.fixtures.contexts.kitchenSaturday.time',
    fitKey: 'home.formation.fixtures.contexts.kitchenSaturday.fit',
  },
  {
    id: 'riverside-sunday',
    labelKey: 'home.formation.fixtures.contexts.riversideSunday.label',
    peopleKey: 'home.formation.fixtures.contexts.riversideSunday.people',
    placeKey: 'home.formation.fixtures.contexts.riversideSunday.place',
    timeKey: 'home.formation.fixtures.contexts.riversideSunday.time',
    fitKey: 'home.formation.fixtures.contexts.riversideSunday.fit',
  },
];

export const FIXTURES_BY_ANCHOR = {
  want: WANTS,
  bring: BRINGS,
  context: CONTEXTS,
};

const INDEX = Object.fromEntries(
  ANCHORS.map((anchor) => [
    anchor,
    new Map(FIXTURES_BY_ANCHOR[anchor].map((fixture) => [fixture.id, fixture])),
  ])
);

export function fixtureFor(anchor, id) {
  return INDEX[anchor]?.get(id) ?? null;
}
export function createFormationResult(selection) {
  const recognized = Object.fromEntries(
    ANCHORS.map((anchor) => [anchor, fixtureFor(anchor, selection[anchor])?.id ?? null])
  );
  const missingAnchors = ANCHORS.filter((anchor) => !recognized[anchor]);

  if (missingAnchors.length > 0) {
    return { result: null, recognized, missingAnchors };
  }

  const want = fixtureFor('want', recognized.want);
  const bring = fixtureFor('bring', recognized.bring);
  const context = fixtureFor('context', recognized.context);

  return {
    result: {
      id: `${want.id}--${bring.id}--${context.id}`,
      titleKey: want.titleKey,
      peopleKey: context.peopleKey,
      placeKey: context.placeKey,
      timeKey: context.timeKey,
      rationaleKeys: [want.needKey, bring.contributionKey, context.fitKey],
    },
    recognized,
    missingAnchors: [],
  };
}
