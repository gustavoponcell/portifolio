import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { DevProjectsSection } from "@/components/dev/dev-projects-section";
import type { GitHubRepositoryWithCuration } from "@/types/github";

type GithubPreviewSectionProps = {
  repositories: GitHubRepositoryWithCuration[];
};

export function GithubPreviewSection({ repositories }: GithubPreviewSectionProps) {

  return (
    <section id="projetos-dev" className="brutal-section space-y-8">
      <BrutalCard className="bg-dev brutal-card-accent ink-on-accent">
        <SectionHeading
          eyebrow="Repositórios"
          title="Onde registro meus estudos e projetos em desenvolvimento"
          description="Meu GitHub reúne parte do que venho construindo, estudando e organizando como desenvolvedor, com foco em estrutura, interface e código claro."
          accent="neutral"
          level={2}
        />
      </BrutalCard>

      <DevProjectsSection repositories={repositories} />
    </section>
  );
}
