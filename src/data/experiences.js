import rawExperiences from './experiences.json';

/**
 * The experience catalogue, with dates kept fresh.
 *
 * The seed data was written with fixed dates in late 2025, so by 2026 every
 * one of the 35 experiences sat in the past: Explore looked like a dead
 * marketplace, "Upcoming Experiences" was always empty and sorting by date
 * meant nothing. Rather than rewrite the fixtures (which would go stale
 * again), the whole catalogue is shifted forward on load so it always starts
 * a few days from now, keeping the original spacing and times of day.
 *
 * Import this instead of `experiences.json`.
 */

/** How far ahead the earliest experience should sit. */
const LEAD_DAYS = 3;

const DAY = 86400000;

const buildCatalogue = () => {
  const times = rawExperiences
    .map((experience) => new Date(experience.date).getTime())
    .filter((time) => !Number.isNaN(time));

  if (times.length === 0) return rawExperiences;

  const earliest = Math.min(...times);
  const target = Date.now() + LEAD_DAYS * DAY;
  const shift = target - earliest;

  // Nothing to do if the fixtures are already in the future.
  if (shift <= 0) return rawExperiences;

  return rawExperiences.map((experience) => {
    const original = new Date(experience.date).getTime();
    if (Number.isNaN(original)) return experience;

    const moved = new Date(original + shift);

    // Keep the original time of day - a 10am café session should stay 10am.
    const source = new Date(experience.date);
    moved.setHours(source.getHours(), source.getMinutes(), 0, 0);

    const shiftedAvailability = experience.spotsAvailableByDate
      ? Object.fromEntries(
          Object.entries(experience.spotsAvailableByDate).map(([date, spots]) => {
            const movedDate = new Date(new Date(date).getTime() + shift);
            return [movedDate.toISOString().slice(0, 10), spots];
          })
        )
      : experience.spotsAvailableByDate;

    return {
      ...experience,
      date: moved.toISOString(),
      ...(shiftedAvailability && { spotsAvailableByDate: shiftedAvailability }),
    };
  });
};

const experiences = buildCatalogue();

export default experiences;
