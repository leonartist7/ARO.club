import Page from "../../../views/StudentDashboard";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/student-dashboard");
  return <Page />;
}
