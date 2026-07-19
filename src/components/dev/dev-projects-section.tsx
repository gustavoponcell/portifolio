import { GitHubRepositoriesGrid } from "@/components/github/github-repositories-grid";
import { EmptyProjectsState } from "@/components/projects/empty-projects-state";
import type { GitHubRepositoryWithCuration } from "@/types/github";

type DevProjectsSectionProps = {
  repositories: GitHubRepositoryWithCuration[];
};

export function DevProjectsSection({ repositories }: DevProjectsSectionProps) {
  if (!repositories.length) {
    return (
      <EmptyProjectsState
        title="Meus repositórios não estão disponíveis agora."
        description="Você pode tentar novamente em alguns instantes. Assim que a conexão for restabelecida, meus projetos publicados voltam a aparecer por aqui."
        href="/contato"
        actionLabel="Falar comigo"
      />
    );
  }

  return <GitHubRepositoriesGrid repositories={repositories} />;
}
