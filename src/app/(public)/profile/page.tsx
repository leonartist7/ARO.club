import Page from "../../../views/StudentProfilePage";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/profile");
  return <Page />;
}
