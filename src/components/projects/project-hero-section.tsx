import { BrutalButton } from "@/components/brand/brutal-button";
import { ModeBadge } from "@/components/brand/mode-badge";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type ProjectHeroSectionProps = {
  project: Project;
};

export function ProjectHeroSection({ project }: ProjectHeroSectionProps) {
  const isDesign = project.type === "design";
  const accentClass = isDesign
    ? "bg-design !text-[#111111] border-[#111111]"
    : "bg-dev !text-[#111111] border-[#111111]";
  const buttonVariant = isDesign ? "design" : "dev";
  const modeHref = isDesign ? "/design" : "/dev";
  const modeLabel = isDesign ? "Voltar para Design" : "Voltar para Dev";
  const summary = project.summary ?? project.description;
  const coverUrl = project.cover ?? project.coverUrl;

  return (
    <section className="brutal-section grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <div className="flex flex-col justify-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <ModeBadge mode={project.type} />
          {project.year ? (
            <span className="brutal-border bg-card px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
              {project.year}
            </span>
          ) : null}
        </div>

        <div className="space-y-4">
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 sm:text-xl">{summary}</p>
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

        <div className="flex flex-wrap items-center gap-3">
          <BrutalButton href={modeHref} variant={buttonVariant}>
            {modeLabel}
          </BrutalButton>
          {project.role ? (
            <span className="font-bold">Papel: {project.role}</span>
          ) : null}
        </div>
      </div>

      <div
        className={`brutal-border brutal-shadow grid min-h-80 place-items-center p-6 text-center ${accentClass}`}
      >
        {coverUrl ? (
          <ResponsiveImage
            alt={`Capa do projeto ${project.title}`}
            className="h-full min-h-72 w-full brutal-border object-cover"
            src={coverUrl}
          />
        ) : (
          <div className="space-y-5">
            <p className="font-mono text-sm font-black uppercase tracking-[0.25em]">
              Projeto / {project.type}
            </p>
            <p className="text-4xl font-black leading-none sm:text-6xl">
              {project.title}
            </p>
            <p className="mx-auto max-w-sm font-bold">
              Recorte visual do projeto com foco em contraste, composição e identidade.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
