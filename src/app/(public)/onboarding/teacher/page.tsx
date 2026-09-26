import Page from "../../../../views/TeacherOnboarding";
import { requireUser } from "../../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/onboarding/teacher");
  return <Page />;
}
