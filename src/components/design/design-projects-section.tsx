import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { EmptyProjectsState } from "@/components/projects/empty-projects-state";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type DesignProjectsSectionProps = {
  projects: Project[];
};

export function DesignProjectsSection({ projects }: DesignProjectsSectionProps) {
  return (
    <section id="projetos-design" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Projetos visuais"
        title="Projetos que mostram minha forma de pensar visualmente"
        description="Reuni trabalhos publicados em que exploro marca, linguagem, composição, hierarquia e apresentação."
        accent="design"
        level={2}
      />

      {projects.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <BrutalCard key={project.id} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ModeBadge mode="design" />
                {project.featured ? (
                  <span className="brutal-border border-[#111111] bg-design px-2 py-1 text-xs font-black uppercase tracking-wide ink-on-accent">
                    Destaque
                  </span>
                ) : null}
              </div>

              {project.coverUrl ? (
                <ResponsiveImage
                  alt={`Capa do projeto ${project.title}`}
                  className="brutal-border h-36 w-full object-cover"
                  src={project.coverUrl}
                />
              ) : (
                <div className="brutal-border grid h-36 place-items-center border-[#111111] bg-design p-4 text-center ink-on-accent">
                  <p className="text-2xl font-black leading-none">{project.title}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em]">
                  Projeto visual
                </p>
                <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
                <p className="mt-3 leading-7">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-2 border-[#111111] bg-design font-bold !text-[#111111]"
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
          ))}
        </div>
      ) : (
        <EmptyProjectsState
          title="Ainda não publiquei projetos de design por aqui."
          description="Estou selecionando os trabalhos que melhor representam meu processo. Em breve, esta área vai reunir identidades visuais, interfaces e peças gráficas reais."
          href="/dev"
          actionLabel="Conhecer meu lado Dev"
        />
      )}
    </section>
  );
}
