import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { Badge } from "@/components/ui/badge";
import { getProjectsByType } from "@/lib/projects";

const designProjects = getProjectsByType("design");

export function DesignProjectsSection() {
  return (
    <section id="projetos-design" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Projetos mockados"
        title="Galeria inicial de cases visuais"
        description="Projetos temporarios para validar a apresentacao de cards, tags, destaques e paginas individuais."
        accent="design"
        level={2}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {designProjects.map((project) => {
          const coverUrl = project.cover ?? project.coverUrl;

          return (
            <BrutalCard key={project.id} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ModeBadge mode="design" />
                {project.featured ? (
                  <span className="brutal-border border-[#111111] bg-design px-2 py-1 text-xs font-black uppercase tracking-wide ink-on-accent">
                    Destaque
                  </span>
                ) : null}
              </div>

              {coverUrl ? (
                <ResponsiveImage
                  alt={`Capa do projeto ${project.title}`}
                  className="brutal-border h-36 w-full object-cover"
                  src={coverUrl}
                />
              ) : (
                <div className="brutal-border grid h-36 place-items-center border-[#111111] bg-design p-4 text-center ink-on-accent">
                  <p className="text-2xl font-black leading-none">{project.title}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em]">
                  {project.slug}
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
          );
        })}
      </div>
    </section>
  );
}
