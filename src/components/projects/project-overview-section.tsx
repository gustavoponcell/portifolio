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
        eyebrow="Visão geral"
        title="Como pensei este projeto"
        description={project.summary ?? project.description}
        accent={project.type}
        level={2}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {project.problem ? (
          <BrutalCard className="space-y-3">
            <h3 className="text-2xl font-black">O que eu quis resolver</h3>
            <p className="leading-7">{project.problem}</p>
          </BrutalCard>
        ) : null}

        {project.solution ? (
          <BrutalCard className="space-y-3">
            <h3 className="text-2xl font-black">Como eu resolvi</h3>
            <p className="leading-7">{project.solution}</p>
          </BrutalCard>
        ) : null}
      </div>
    </section>
  );
}
