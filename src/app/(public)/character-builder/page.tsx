import Page from "../../../views/CharacterBuilder";
import { requireUser } from "../../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function RoutePage() {
  await requireUser("/character-builder");
  return <Page />;
}
