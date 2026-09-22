import PersonalizationPage from "../../../components/personalization/PersonalizationPage";
export const metadata = {
  title: "Your little world — ARO",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <PersonalizationPage section="profile" />;
}
