import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { GitHubRepositoriesGrid } from "@/components/github/github-repositories-grid";
import { getPublicDevRepositories } from "@/lib/dev-repositories";

export async function GithubPreviewSection() {
  const result = await getPublicDevRepositories();

  return (
    <section id="github" className="brutal-section space-y-8">
      <BrutalCard className="bg-dev brutal-card-accent ink-on-accent">
        <SectionHeading
          eyebrow="Repositórios"
          title="Projetos e estudos em desenvolvimento"
          description="Uma seleção de repositórios que mostram prática em desenvolvimento web, organização de código e construção de interfaces."
          accent="neutral"
          level={2}
        />
      </BrutalCard>

      <GitHubRepositoriesGrid repositories={result.repositories} />
    </section>
  );
}
