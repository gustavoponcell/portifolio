import { redirect } from "next/navigation";

import { DesignProjectForm } from "@/components/admin/projects/design-project-form";
import { DesignProjectsList } from "@/components/admin/projects/design-projects-list";
import { StorageStatusCard } from "@/components/admin/media/storage-status-card";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getDesignProjects } from "@/lib/admin/design-projects";
import { requireAdmin } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

type AdminDesignProjectsPageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminDesignProjectsPage({
  searchParams,
}: AdminDesignProjectsPageProps) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const params = await searchParams;
  const projectsResult = await getDesignProjects();

  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin / Projetos / Design"
        title="Gerenciar projetos Design"
        description="Crie, edite, publique, arquive, destaque ou exclua projetos de Design. Capas e imagens de galeria podem ser enviadas ao Supabase Storage."
      />

      <div className="flex flex-wrap gap-3">
        <BrutalButton href="/admin" variant="outline">
          Voltar ao admin
        </BrutalButton>
        <BrutalButton href="/design" variant="design">
          Ver modo Design público
        </BrutalButton>
      </div>

      {params.message ? (
        <BrutalCard
          className={
            params.type === "success"
              ? "bg-dev brutal-card-accent ink-on-accent"
              : "bg-design brutal-card-accent ink-on-accent"
          }
        >
          <p className="font-black">{params.message}</p>
        </BrutalCard>
      ) : null}

      <StorageStatusCard configured={hasSupabaseAdminEnv()} />

      {!projectsResult.ok ? (
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Configuração pendente</h2>
          <p className="leading-7">{projectsResult.message}</p>
        </BrutalCard>
      ) : (
        <>
          <DesignProjectForm />
          <DesignProjectsList projects={projectsResult.data ?? []} />
        </>
      )}
    </div>
  );
}
