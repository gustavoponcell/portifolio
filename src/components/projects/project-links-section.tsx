import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import type { Project } from "@/types/project";

type ProjectLinksSectionProps = {
  project: Project;
};

export function ProjectLinksSection({ project }: ProjectLinksSectionProps) {
  const links = [
    project.externalUrl ? { href: project.externalUrl, label: "Abrir link externo" } : null,
    project.repositoryUrl ? { href: project.repositoryUrl, label: "Ver repositorio" } : null,
    project.liveUrl ? { href: project.liveUrl, label: "Ver deploy" } : null,
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Links"
        title="Acessos publicos"
        accent={project.type}
        level={2}
      />

      <BrutalCard className="space-y-4">
        {links.length ? (
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <BrutalButton
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                variant={project.type}
              >
                {link.label} em nova aba
              </BrutalButton>
            ))}
          </div>
        ) : (
          <p className="leading-7">
            Links publicos serao adicionados futuramente quando houver curadoria,
            repositorio ou deploy real para este projeto.
          </p>
        )}
      </BrutalCard>
    </section>
  );
}
