import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProjects } from "@/lib/projects";

const featuredProjects = getFeaturedProjects().slice(0, 4);

export function FeaturedProjectsSection() {
  return (
    <section id="projetos" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Projetos em destaque"
        title="Trabalhos que conectam visual, estratégia e tecnologia"
        description="Uma seleção de projetos que mostram a atuação de Gustavo Poncell em identidade visual, interfaces e desenvolvimento web."
        level={2}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => {
          const accentClass =
            project.type === "design"
              ? "bg-design !text-[#111111] border-[#111111]"
              : "bg-dev !text-[#111111] border-[#111111]";
          const coverUrl = project.cover ?? project.coverUrl;

          return (
            <BrutalCard key={project.id} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ModeBadge mode={project.type} />
                <span className="brutal-border bg-muted px-2 py-1 text-xs font-black uppercase tracking-wide">
                  Destaque
                </span>
              </div>

              {coverUrl ? (
                <ResponsiveImage
                  alt={`Capa do projeto ${project.title}`}
                  className="brutal-border h-40 w-full object-cover"
                  src={coverUrl}
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
