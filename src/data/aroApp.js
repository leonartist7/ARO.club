export const aroUser = {
  name: 'Maya Nguyen',
  initials: 'MN',
  location: 'Calgary, AB',
  memberSince: 'Joined March 2026',
};

export const appNavItems = [
  { label: 'Home', shortLabel: 'Home', to: '/app', icon: 'home' },
  { label: 'World', shortLabel: 'World', to: '/app/world', icon: 'world' },
  { label: 'Insights', shortLabel: 'Insights', to: '/app/insights', icon: 'insights' },
  { label: 'Library', shortLabel: 'Library', to: '/app/library', icon: 'library' },
];

export const opportunityFormation = Object.freeze({
  'shared-stories': Object.freeze({ exampleCount: 6, minimum: 6, capacity: 8 }),
  'river-photo-walk': Object.freeze({ exampleCount: 3, minimum: 6, capacity: 10 }),
  'repair-table': Object.freeze({ exampleCount: 8, minimum: 6, capacity: 8 }),
});

function opportunityWithFormation(opportunity) {
  const formation = opportunityFormation[opportunity.id];
  if (!formation) throw new Error(`Missing formation fixture for ${opportunity.id}`);

  return {
    ...opportunity,
    ...formation,
    // Compatibility values for existing F4-owned discovery surfaces. Both are
    // derived from the single numeric formation fixture above.
    get people() {
      return `${this.exampleCount} of ${this.capacity} places`;
    },
    get threshold() {
      return this.minimum;
    },
  };
}

export const opportunities = [
  opportunityWithFormation({
    id: 'shared-stories',
    status: 'forming',
    title: 'Spanish through shared stories',
    summary: 'A small, relaxed conversation circle built around food and the stories behind it.',
    place: 'Community Kitchen',
    area: 'Inglewood',
    time: 'Saturday · 11:00 AM',
    distance: '2.4 km away',
    host: 'Lina Ortega',
    hostRole: 'Language host · verified',
    image: '/aro-shared-stories-table-v1.png',
    imageAlt: 'A small group sharing food and stories around a sunlit community table',
    price: '$22',
    duration: '2 hours',
    signal: 'You want to practice Spanish. Lina brings patient facilitation. The kitchen has a table ready.',
    fitTitle: 'A gentle way to find your Spanish in good company.',
    fitBody: 'Bring one story, a little curiosity, and no pressure to perform. Lina will shape the pace around the people at the table.',
    circleWelcome: 'Glad you’re here. We’ll begin with the stories already on the table—no perfect Spanish needed.',
    circleQuestion: 'I know a few words, but I am nervous about speaking. Is that okay?',
    circleReply: 'More than okay. Listening, asking, and trying a small sentence all count. Bring the words you have.',
    tags: ['Language', 'Food', 'Low pressure'],
    color: 'clay',
  }),
  opportunityWithFormation({
    id: 'river-photo-walk',
    status: 'open',
    title: 'River light photo walk',
    summary: 'An early evening walk for people who want to notice the city differently.',
    place: 'Bow River Pathway',
    area: 'Sunnyside',
    time: 'Sunday · 6:30 PM',
    distance: '4.1 km away',
    host: 'Jon Bell',
    hostRole: 'Photographer · verified',
    image: '/aro-river-light-circle-v1.png',
    imageAlt: 'A small photography group gathering beside a river at golden hour',
    price: '$28',
    duration: '90 minutes',
    signal: 'You have a camera, and several people nearby want a reason to get outside.',
    fitTitle: 'A gentle way to see your own city differently.',
    fitBody: 'Bring any camera or phone. Jon will shape the pace around the group, not a perfect shot.',
    circleWelcome: 'Glad you’re here. We’ll begin by looking for the light already in the city—no camera confidence needed.',
    circleQuestion: 'I only have my phone camera. That is okay, right?',
    circleReply: 'Perfect. A phone is a great place to start. Bring something warm for the river path.',
    tags: ['Photography', 'Outdoors', 'Beginner friendly'],
    color: 'sky',
  }),
  opportunityWithFormation({
    id: 'repair-table',
    status: 'confirmed',
    title: 'Repair table: small things, useful hands',
    summary: 'Bring one object that needs care and learn a repair alongside neighbours.',
    place: 'The Commons Workshop',
    area: 'East Village',
    time: 'Wednesday · 7:00 PM',
    distance: '3.8 km away',
    host: 'Amir Haddad',
    hostRole: 'Maker · verified',
    image: '/aro-repair-table-v1.png',
    imageAlt: 'Neighbours repairing practical objects together around a workshop table',
    price: '$15',
    duration: '2 hours',
    signal: 'You want to learn practical repair and already know how to make people feel welcome.',
    fitTitle: 'A practical evening that makes small things useful again.',
    fitBody: 'Bring one object that needs care. Amir will help the table move at the speed of the repair, not the speed of expertise.',
    circleWelcome: 'Bring the small thing you have been meaning to mend. We will start by seeing what it needs together.',
    circleQuestion: 'Mine is only a loose lamp switch. Is that too small to bring?',
    circleReply: 'Small repairs are exactly right. A simple object is a good way to learn the table and the tools.',
    tags: ['Making', 'Community', 'Practical'],
    color: 'moss',
  }),
];

export const findOpportunity = (id) => opportunities.find((opportunity) => opportunity.id === id);

const circleDefinitions = [
  { id: 'shared-stories', state: 'forming' },
  { id: 'repair-table', state: 'confirmed' },
];

export const circles = circleDefinitions.map(({ id, state }) => {
  const opportunity = findOpportunity(id);
  return {
    id,
    state,
    title: opportunity.title,
    time: opportunity.time,
    place: opportunity.place,
    members: opportunity.exampleCount,
    minimum: opportunity.minimum,
    capacity: opportunity.capacity,
  };
});

export const passportEntries = [
  { month: 'AUG', day: '24', title: 'Hosted a neighbourhood dinner', meta: 'Contribution · 9 people · Inglewood', tone: 'clay', image: '/aro-shared-stories-table-v1.png', imagePosition: 'object-center' },
  { month: 'JUL', day: '18', title: 'Practiced street photography', meta: 'Skill · Bow River · 2 hours', tone: 'sky', image: '/aro-river-light-circle-v1.png', imagePosition: 'object-center' },
  { month: 'JUN', day: '03', title: 'Helped a new neighbour find their feet', meta: 'Connection · East Village', tone: 'moss', image: '/aro-passport-life-map-v1.png', imagePosition: 'object-[80%_center]' },
];

export const profileSignals = {
  wants: ['Practice conversational Spanish', 'Make more time for making things', 'Meet people outside my usual circles'],
  brings: ['A warm table and good questions', 'Beginner photography', 'Patient facilitation'],
  boundaries: ['Show my first name only', 'Keep precise location private', 'Ask before sharing contact details'],
};