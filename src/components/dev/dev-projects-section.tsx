import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";
import { Badge } from "@/components/ui/badge";
import { getProjectsByType } from "@/lib/projects";

const devProjects = getProjectsByType("dev");

export function DevProjectsSection() {
  return (
    <section id="projetos-dev" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Projetos dev mockados"
        title="Sistemas e interfaces em estrutura inicial"
        description="Projetos temporarios para validar cards, tecnologias e futuras paginas individuais."
        accent="dev"
        level={2}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {devProjects.map((project) => (
          <BrutalCard key={project.id} className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ModeBadge mode="dev" />
              {project.featured ? (
                <span className="brutal-border border-[#111111] bg-dev px-2 py-1 text-xs font-black uppercase tracking-wide ink-on-accent">
                  Destaque
                </span>
              ) : null}
            </div>

            <div className="brutal-border bg-background p-4 font-mono text-sm text-dev">
              <p>{">"} project.slug</p>
              <p className="mt-2 break-words">{project.slug}</p>
            </div>

            <div>
              <h3 className="text-2xl font-black">{project.title}</h3>
              <p className="mt-3 leading-7">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-2 border-[#111111] bg-dev font-bold !text-[#111111]"
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
    </section>
  );
}
