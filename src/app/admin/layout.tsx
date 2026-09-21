import AdminLayout from "../../components/admin/AdminLayout";
import { requireUser } from "../../lib/auth/server";
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/admin", "admin");
  return <AdminLayout>{children}</AdminLayout>;
}
