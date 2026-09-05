import { describe, expect, it } from 'vitest';
import { translations } from '../../i18n/translations';
import { BRINGS, CONTEXTS, WANTS } from './fixtures';

const requiredStaticKeys = [
  'prototypeAccess.label',
  'prototypeAccess.callbackTitle',
  'prototypeAccess.callbackBody',
  'prototypeAccess.backToPrototype',
  'home.formation.prototypeBadge',
  'home.formation.heading',
  'home.formation.hero.title',
  'home.formation.hero.highlight',
  'home.formation.instructions',
  'home.formation.anchors.want.title',
  'home.formation.anchors.bring.title',
  'home.formation.anchors.context.title',
  'home.formation.status.intro',
  'home.formation.status.partial',
  'home.formation.status.forming',
  'home.formation.status.formed',
  'home.formation.actions.clear',
  'home.formation.actions.edit',
  'home.formation.actions.reset',
  'home.formation.validation.chooseAgain',
  'home.formation.result.prototypeLabel',
  'home.formation.result.people',
  'home.formation.result.place',
  'home.formation.result.time',
  'home.formation.result.whyTitle',
  'home.formation.result.nextTitle',
  'home.formation.result.announcement',
  'home.formation.field.semanticEmpty',
  'home.formation.field.semanticOne',
  'home.formation.field.semanticTwo',
  'home.formation.field.semanticThree',
  'home.formation.editorial.imageAlt',
  'home.formation.editorial.imageCaption',
  'home.formation.truth.confirmed.body',
  'home.formation.truth.assumed.body',
  'home.formation.truth.missing.body',
];

const fixtureKeys = [
  ...WANTS.flatMap(({ labelKey, titleKey, needKey }) => [labelKey, titleKey, needKey]),
  ...BRINGS.flatMap(({ labelKey, contributionKey }) => [labelKey, contributionKey]),
  ...CONTEXTS.flatMap(({ labelKey, peopleKey, placeKey, timeKey, fitKey }) => [
    labelKey,
    peopleKey,
    placeKey,
    timeKey,
    fitKey,
  ]),
];

function readKey(locale, key) {
  return key.split('.').reduce((value, part) => value?.[part], translations[locale]);
}

describe('UX0 locale contract', () => {
  it.each(['en', 'fr', 'es'])('%s contains every control, result and fixture key', (locale) => {
    for (const key of [...requiredStaticKeys, ...fixtureKeys]) {
      expect(readKey(locale, key), `${locale} is missing ${key}`).toEqual(expect.any(String));
      expect(readKey(locale, key).trim(), `${locale} has an empty ${key}`).not.toBe('');
    }
  });

  it('keeps the visible prototype boundary in every locale', () => {
    for (const locale of ['en', 'fr', 'es']) {
      const label = readKey(locale, 'home.formation.result.prototypeLabel');
      expect(label.toLowerCase()).toMatch(/prototype|prototipo/);
    }
  });
});
