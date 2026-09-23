import { PersonalizationProvider } from "../../../components/personalization/PreviewContext";
import "../../../components/personalization/personalization.css";
export default function PersonalizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PersonalizationProvider>{children}</PersonalizationProvider>;
}
