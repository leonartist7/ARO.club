// Opt in only for the English/light release build. Existing language and theme
// preferences remain available in preview builds and are not overwritten.
export const englishLightRelease = process.env.NEXT_PUBLIC_ARO_RELEASE_SCOPE === 'english-light';
