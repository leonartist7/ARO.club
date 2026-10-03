import Page from "../../../views/ChatPage";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/chat");
  return <Page />;
}
