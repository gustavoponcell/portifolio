import { BrutalCard } from "@/components/brand/brutal-card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

type ProjectDetailsSidebarProps = {
  project: Project;
};

const statusLabels: Partial<Record<NonNullable<Project["status"]>, string>> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

export function ProjectDetailsSidebar({ project }: ProjectDetailsSidebarProps) {
  const statusLabel = project.status ? statusLabels[project.status] : null;
  const accentClass =
    project.type === "design"
      ? "bg-design !text-[#111111] border-[#111111]"
      : "bg-dev !text-[#111111] border-[#111111]";
  const links = [
    project.externalUrl ? "Link externo" : null,
    project.repositoryUrl ? "Repositório" : null,
    project.liveUrl ? "Site publicado" : null,
  ].filter(Boolean);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <BrutalCard className="space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em]">Detalhes</p>
          <h2 className="mt-2 text-3xl font-black">Ficha do projeto</h2>
        </div>

        <dl className="space-y-4">
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.18em]">Tipo</dt>
            <dd className="mt-1 font-bold">{project.type === "design" ? "Design" : "Dev"}</dd>
          </div>

          {project.year ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.18em]">Ano</dt>
              <dd className="mt-1 font-bold">{project.year}</dd>
            </div>
          ) : null}

          {project.role ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.18em]">Papel</dt>
              <dd className="mt-1 font-bold">{project.role}</dd>
            </div>
          ) : null}

          {statusLabel ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.18em]">Status</dt>
              <dd className="mt-1 font-bold">{statusLabel}</dd>
            </div>
          ) : null}

          {links.length > 0 ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.18em]">Links</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {links.map((link) => (
                  <Badge
                    key={link}
                    variant="outline"
                    className="border-2 border-foreground bg-card font-bold"
                  >
                    {link}
                  </Badge>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>

        {project.tools?.length ? (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-[0.18em]">
              Ferramentas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className={`border-2 ${accentClass} font-bold`}
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">Tags</h3>
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
        </div>
      </BrutalCard>
    </aside>
  );
}
