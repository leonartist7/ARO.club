import LegacyFixtureState from "../../../../components/features/LegacyFixtureState";
import legacyTeachers from "../../../../data/teachers.json";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export function generateStaticParams() {
  return legacyTeachers.map(({ id }) => ({ id }));
}

export default async function RoutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!legacyTeachers.some((teacher) => teacher.id === id)) notFound();
  return <LegacyFixtureState kind="teacher" />;
}
