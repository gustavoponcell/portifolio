import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { GitHubRepositoryCard } from "@/components/github/github-repository-card";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { EmptyProjectsState } from "@/components/projects/empty-projects-state";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepositoryWithCuration } from "@/types/github";
import type { Project } from "@/types/project";

type FeaturedProjectsSectionProps = {
  designProjects: Project[];
  devRepositories: GitHubRepositoryWithCuration[];
};

export function FeaturedProjectsSection({
  designProjects,
  devRepositories,
}: FeaturedProjectsSectionProps) {
  const projects = designProjects.slice(0, 4);
  const repositories = devRepositories.slice(0, Math.max(0, 4 - projects.length));
  const hasProjects = projects.length > 0 || repositories.length > 0;

  return (
    <section id="projetos" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Projetos em destaque"
        title="Projetos que mostram meu jeito de criar"
        description="Aqui reúno trabalhos publicados que representam como conecto visual, estratégia e tecnologia."
        level={2}
      />

      {hasProjects ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <BrutalCard key={project.id} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ModeBadge mode="design" />
                <span className="brutal-border bg-muted px-2 py-1 text-xs font-black uppercase tracking-wide">
                  Destaque
                </span>
              </div>

              {project.coverUrl ? (
                <ResponsiveImage
                  alt={`Capa do projeto ${project.title}`}
                  className="brutal-border h-40 w-full object-cover"
                  src={project.coverUrl}
                />
              ) : null}

              <div>
                <h3 className="text-2xl font-black">{project.title}</h3>
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

          {repositories.map((repository) => (
            <GitHubRepositoryCard key={repository.id} repository={repository} />
          ))}
        </div>
      ) : (
        <EmptyProjectsState
          title="Ainda estou organizando os projetos que quero destacar por aqui."
          description="Enquanto preparo essa seleção, você pode conhecer minhas frentes de atuação em Design e Dev."
          href="/design"
          actionLabel="Conhecer meu trabalho"
        />
      )}
    </section>
  );
}
