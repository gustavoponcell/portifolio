export type GitHubRepository = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  isFork: boolean;
  isArchived: boolean;
};

export type GitHubRepositoryCurationStatus =
  | "draft"
  | "published"
  | "archived"
  | "mock";

export type GitHubRepositoryCuration = {
  id?: string;
  repositoryName: string;
  customTitle: string;
  customDescription: string;
  customSummary: string;
  customTags: string[];
  customTools: string[];
  customStatus: GitHubRepositoryCurationStatus;
  visible: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

export type GitHubRepositoryCurationInput = Omit<
  GitHubRepositoryCuration,
  "id" | "createdAt" | "updatedAt"
>;

export type GitHubRepositoryWithCuration = GitHubRepository & {
  curation?: GitHubRepositoryCuration;
  displayTitle: string;
  displayDescription: string;
  displaySummary: string;
  displayTags: string[];
  displayTools: string[];
  displayStatus: GitHubRepositoryCurationStatus;
  visible: boolean;
  featured: boolean;
  sortOrder: number;
  isConfigured: boolean;
  source: "github" | "fallback";
  displaySource: "github" | "fallback" | "supabase" | "mixed";
};

export type GitHubRepositoryResult = {
  repositories: GitHubRepository[];
  source: "github" | "fallback";
  error?: string;
};

export type GitHubRepositoryCurationResult = {
  repositories: GitHubRepositoryWithCuration[];
  source: "github" | "fallback" | "curated" | "curated-fallback";
  error?: string;
};
