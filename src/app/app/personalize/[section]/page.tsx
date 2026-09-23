import { notFound } from "next/navigation";
import PersonalizationPage from "../../../../components/personalization/PersonalizationPage";
export const metadata = {
  title: "Your little world — ARO",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!["character", "shop", "space", "season"].includes(section)) notFound();
  return <PersonalizationPage key={section} section={section} />;
}
