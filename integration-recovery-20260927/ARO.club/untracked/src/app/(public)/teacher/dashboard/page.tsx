import Page from "../../../../views/TeacherDashboardPage";
import { requireUser } from "../../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/teacher/dashboard");
  return <Page />;
}
