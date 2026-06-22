import { mockGitHubRepositories } from "@/data/mock-github-repositories";
import { siteConfig } from "@/config/site";
import type { GitHubRepository, GitHubRepositoryResult } from "@/types/github";

type GitHubApiRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const MAX_REPOSITORIES = 8;
const REVALIDATE_SECONDS = 3600;

function fallbackResult(error?: string): GitHubRepositoryResult {
  return {
    repositories: mockGitHubRepositories,
    source: "fallback",
    error,
  };
}

function mapRepository(repository: GitHubApiRepository): GitHubRepository {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    htmlUrl: repository.html_url,
    homepage: repository.homepage,
    language: repository.language,
    stargazersCount: repository.stargazers_count,
    forksCount: repository.forks_count,
    topics: repository.topics ?? [],
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    isFork: repository.fork,
    isArchived: repository.archived,
  };
}

export async function getGitHubRepositories(): Promise<GitHubRepositoryResult> {
  const username = process.env.GITHUB_USERNAME?.trim() || siteConfig.githubUsername;
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!username) {
    return fallbackResult("GITHUB_USERNAME nao configurado.");
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = new URL(`https://api.github.com/users/${username}/repos`);
  url.searchParams.set("type", "owner");
  url.searchParams.set("sort", "updated");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", "30");

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return fallbackResult(`GitHub respondeu com status ${response.status}.`);
    }

    const data = (await response.json()) as GitHubApiRepository[];

    const repositories = data
      .filter((repository) => !repository.fork && !repository.archived)
      .map(mapRepository)
      .sort(
        (a, b) =>
          new Date(b.pushedAt || b.updatedAt).getTime() -
          new Date(a.pushedAt || a.updatedAt).getTime()
      )
      .slice(0, MAX_REPOSITORIES);

    if (repositories.length === 0) {
      return fallbackResult("Nenhum repositorio publico elegivel encontrado.");
    }

    return {
      repositories,
      source: "github",
    };
  } catch {
    return fallbackResult("Nao foi possivel carregar repositorios do GitHub.");
  }
}
