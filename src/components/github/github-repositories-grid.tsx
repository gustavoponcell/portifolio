import { GitHubRepositoryCard } from "@/components/github/github-repository-card";
import type { GitHubRepository, GitHubRepositoryWithCuration } from "@/types/github";

type GitHubRepositoriesGridProps = {
  repositories: Array<GitHubRepository | GitHubRepositoryWithCuration>;
};

export function GitHubRepositoriesGrid({
  repositories,
}: GitHubRepositoriesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {repositories.map((repository) => (
        <GitHubRepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  );
}
