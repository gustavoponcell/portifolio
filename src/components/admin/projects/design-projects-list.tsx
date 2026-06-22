import {
  deleteDesignProjectAction,
  toggleDesignProjectFeaturedAction,
  updateDesignProjectStatusAction,
} from "@/app/admin/actions/design-project-actions";
import { DesignProjectForm } from "@/components/admin/projects/design-project-form";
import { ProjectAdminCard } from "@/components/admin/projects/project-admin-card";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { AdminDesignProject, AdminProjectStatus } from "@/types/admin";

type DesignProjectsListProps = {
  projects: AdminDesignProject[];
};

function StatusAction({
  project,
  status,
  label,
}: {
  project: AdminDesignProject;
  status: AdminProjectStatus;
  label: string;
}) {
  return (
    <form action={updateDesignProjectStatusAction}>
      <input name="id" type="hidden" value={project.id} />
      <input name="slug" type="hidden" value={project.slug} />
      <input name="status" type="hidden" value={status} />
      <BrutalButton type="submit" variant="outline">
        {label}
      </BrutalButton>
    </form>
  );
}

export function DesignProjectsList({ projects }: DesignProjectsListProps) {
  if (!projects.length) {
    return (
      <BrutalCard>
        <p className="text-lg font-bold">Nenhum projeto Design cadastrado ainda.</p>
      </BrutalCard>
    );
  }

  return (
    <section className="space-y-5">
      {projects.map((project) => (
        <ProjectAdminCard key={project.id} project={project}>
          <div className="flex flex-wrap gap-3">
            {project.status !== "published" ? (
              <StatusAction project={project} status="published" label="Publicar" />
            ) : (
              <StatusAction project={project} status="draft" label="Ocultar" />
            )}

            {project.status !== "archived" ? (
              <StatusAction project={project} status="archived" label="Arquivar" />
            ) : (
              <StatusAction project={project} status="draft" label="Reabrir rascunho" />
            )}

            <form action={toggleDesignProjectFeaturedAction}>
              <input name="id" type="hidden" value={project.id} />
              <input name="slug" type="hidden" value={project.slug} />
              <input
                name="featured"
                type="hidden"
                value={String(!project.featured)}
              />
              <BrutalButton type="submit" variant="outline">
                {project.featured ? "Remover destaque" : "Destacar"}
              </BrutalButton>
            </form>

            <form action={deleteDesignProjectAction}>
              <input name="id" type="hidden" value={project.id} />
              <input name="slug" type="hidden" value={project.slug} />
              <BrutalButton type="submit" variant="outline">
                Excluir
              </BrutalButton>
            </form>
          </div>

          <DesignProjectForm project={project} title="Editar projeto Design" />
        </ProjectAdminCard>
      ))}
    </section>
  );
}
