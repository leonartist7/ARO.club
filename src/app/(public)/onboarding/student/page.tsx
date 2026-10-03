import Page from "../../../../views/StudentOnboarding";
import { requireUser } from "../../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/onboarding/student");
  return <Page />;
}
