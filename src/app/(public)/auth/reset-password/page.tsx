import { requireUser } from "../../../../lib/auth/server";
import ResetPassword from "./reset-password";
export const dynamic = "force-dynamic";
export default async function Page() {
  await requireUser("/auth/reset-password");
  return <ResetPassword />;
}
