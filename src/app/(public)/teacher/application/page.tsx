import Page from "../../../../views/teacher/TeacherApplicationStatus";
import { requireUser } from "../../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/teacher/application");
  return <Page />;
}
