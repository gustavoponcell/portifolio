import { AdminNextSteps } from "@/components/admin/admin-next-steps";
import { AdminOverviewCards } from "@/components/admin/admin-overview-cards";
import { AdminUserCard } from "@/components/admin/admin-user-card";
import { SectionHeading } from "@/components/brand/section-heading";

type AdminDashboardShellProps = {
  email: string | null;
};

export function AdminDashboardShell({ email }: AdminDashboardShellProps) {
  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin"
        title="Painel inicial do portfólio"
        description="Acesso protegido com Supabase Auth. Perfil, experiências, cursos, projetos Design, curadoria Dev e upload de imagens já podem ser gerenciados; Behance real fica para próximas etapas."
      />

      <AdminUserCard email={email} />
      <AdminOverviewCards />
      <AdminNextSteps />
    </div>
  );
}
