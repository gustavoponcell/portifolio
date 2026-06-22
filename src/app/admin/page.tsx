import { redirect } from "next/navigation";

import { AdminDashboardShell } from "@/components/admin/admin-dashboard-shell";
import { requireAdmin } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const adminStatus = await requireAdmin();

  if (!adminStatus.isAdmin) {
    redirect("/login");
  }

  return <AdminDashboardShell email={adminStatus.email} />;
}
