import Page from "../../../views/PassportPage";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/passport");
  return <Page />;
}
