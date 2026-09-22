import Page from "../../../views/ShopPage";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/shop");
  return <Page />;
}
