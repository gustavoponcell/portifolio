import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import type { Project } from "@/types/project";

type ProjectOverviewSectionProps = {
  project: Project;
};

export function ProjectOverviewSection({ project }: ProjectOverviewSectionProps) {
  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Visao geral"
        title="Contexto do projeto"
        description={project.summary ?? project.description}
        accent={project.type}
        level={2}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {project.problem ? (
          <BrutalCard className="space-y-3">
            <h3 className="text-2xl font-black">Problema</h3>
            <p className="leading-7">{project.problem}</p>
          </BrutalCard>
        ) : null}

        {project.solution ? (
          <BrutalCard className="space-y-3">
            <h3 className="text-2xl font-black">Solucao</h3>
            <p className="leading-7">{project.solution}</p>
          </BrutalCard>
        ) : null}
      </div>

      {project.status === "mock" ? (
        <p className="brutal-border bg-muted px-4 py-3 text-sm font-bold">
          Conteudo temporario: este case usa dados mockados e sera substituido por
          conteudo curado quando o admin e o Supabase forem implementados.
        </p>
      ) : null}
    </section>
  );
}
