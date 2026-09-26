import { redirect } from "next/navigation";
import { accountsEnabled } from "../../../lib/auth/config";
import { requireUser } from "../../../lib/auth/server";
import Page from "../../../views/ChooseRolePage";
export default async function RoutePage() {
  if (!accountsEnabled) redirect("/login");
  await requireUser('/choose-role');
  return <Page />;
}
