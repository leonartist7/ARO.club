import LegacyFixtureState from "../../../../components/features/LegacyFixtureState";
import legacyExperiences from "../../../../data/experiences.json";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return legacyExperiences.map(({ id }) => ({ id }));
}

export default async function RoutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!legacyExperiences.some((experience) => experience.id === id)) notFound();
  return <LegacyFixtureState kind="experience" />;
}
