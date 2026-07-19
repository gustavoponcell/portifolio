import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type RelatedProjectsSectionProps = {
  projects: Project[];
};

export function RelatedProjectsSection({ projects }: RelatedProjectsSectionProps) {
  if (!projects.length) {
    return null;
  }

  return (
    <section className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Relacionados"
        title="Outros projetos que você pode conhecer"
        description="Separei trabalhos que se aproximam deste em linguagem, tecnologia ou área de atuação."
        level={2}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => {
          const accentClass =
            project.type === "design"
              ? "bg-design !text-[#111111] border-[#111111]"
              : "bg-dev !text-[#111111] border-[#111111]";

          return (
            <BrutalCard key={project.id} className="flex flex-col gap-4">
              <ModeBadge mode={project.type} />
              <div>
                <h3 className="text-2xl font-black">{project.title}</h3>
                <p className="mt-2 leading-7">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`border-2 ${accentClass} font-bold`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <BrutalButton
                href={`/projetos/${project.slug}`}
                variant="outline"
                className="mt-auto self-start"
              >
                Ver projeto
              </BrutalButton>
            </BrutalCard>
          );
        })}
      </div>
    </section>
  );
}
