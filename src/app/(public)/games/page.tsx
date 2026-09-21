import Page from "../../../views/GamesPage";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/games");
  return <Page />;
}
