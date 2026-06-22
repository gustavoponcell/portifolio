import type { SupabaseGitHubRepositoryCurationRow } from "@/lib/supabase/types";
import type {
  GitHubRepository,
  GitHubRepositoryCuration,
  GitHubRepositoryCurationStatus,
  GitHubRepositoryWithCuration,
} from "@/types/github";

function empty(value: string | null | undefined) {
  return value ?? "";
}

function cleanList(value: string[] | null | undefined) {
  return Array.from(new Set((value ?? []).map((item) => item.trim()).filter(Boolean)));
}

export function mapGitHubCurationRow(
  row: SupabaseGitHubRepositoryCurationRow
): GitHubRepositoryCuration {
  return {
    id: row.id,
    repositoryName: row.repository_name,
    customTitle: empty(row.custom_title),
    customDescription: empty(row.custom_description),
    customSummary: empty(row.custom_summary),
    customTags: cleanList(row.custom_tags),
    customTools: cleanList(row.custom_tools),
    customStatus: row.custom_status as GitHubRepositoryCurationStatus,
    visible: row.visible,
    featured: row.featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function combineRepositoryWithCuration(
  repository: GitHubRepository,
  source: "github" | "fallback",
  curation?: GitHubRepositoryCuration
): GitHubRepositoryWithCuration {
  const displayTitle = curation?.customTitle || repository.name;
  const displayDescription =
    curation?.customDescription ||
    repository.description ||
    "Repositorio sem descricao publica.";
  const displayTags = curation?.customTags.length
    ? curation.customTags
    : repository.topics;
  const displayTools = curation?.customTools.length
    ? curation.customTools
    : ([repository.language].filter(Boolean) as string[]);

  return {
    ...repository,
    curation,
    displayTitle,
    displayDescription,
    displaySummary: curation?.customSummary || displayDescription,
    displayTags,
    displayTools,
    displayStatus: curation?.customStatus ?? "draft",
    visible: curation?.visible ?? false,
    featured: curation?.featured ?? false,
    sortOrder: curation?.sortOrder ?? 0,
    isConfigured: Boolean(curation),
    source,
    displaySource: curation ? (source === "fallback" ? "mixed" : "supabase") : source,
  };
}
