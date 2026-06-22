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
          eyebrow="GitHub server-side"
          title="GitHub e repositorios"
          description="Projetos, estudos e sistemas em desenvolvimento aparecem aqui a partir do GitHub, com fallback seguro para dados temporarios."
          accent="neutral"
          level={2}
        />

        <div className="mt-6 grid gap-3">
          {result.source === "curated" || result.source === "curated-fallback" ? (
            <p className="surface-on-accent px-4 py-3 font-bold">
              Repositorios exibidos com curadoria Supabase aplicada.
            </p>
          ) : result.source === "fallback" ? (
            <p className="surface-on-accent px-4 py-3 font-bold">
              Exibindo dados temporarios. Configure o GitHub para carregar
              repositorios reais.
            </p>
          ) : (
            <p className="surface-on-accent px-4 py-3 font-bold">
              Repositorios carregados via GitHub API no servidor.
            </p>
          )}

          {result.error ? (
            <p className="surface-on-accent px-4 py-3 text-sm font-bold">
              Observacao: {result.error}
            </p>
          ) : null}
        </div>
      </BrutalCard>

      <GitHubRepositoriesGrid repositories={result.repositories} />
    </section>
  );
}
