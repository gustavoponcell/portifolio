import {
  combineRepositoryWithCuration,
  mapGitHubCurationRow,
} from "@/lib/github-curation";
import { getGitHubRepositories } from "@/lib/github";
import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import type { SupabaseGitHubRepositoryCurationRow } from "@/lib/supabase/types";
import type { GitHubRepositoryCurationResult } from "@/types/github";

export async function getPublicDevRepositories(): Promise<GitHubRepositoryCurationResult> {
  const githubResult = await getGitHubRepositories();

  if (!hasSupabasePublicEnv()) {
    return {
      repositories: githubResult.repositories.map((repository) =>
        combineRepositoryWithCuration(repository, githubResult.source)
      ),
      source: githubResult.source,
      error: githubResult.error,
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("github_repository_curations")
      .select("*")
      .eq("visible", true)
      .in("custom_status", ["published", "mock"])
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return {
        repositories: githubResult.repositories.map((repository) =>
          combineRepositoryWithCuration(repository, githubResult.source)
        ),
        source: githubResult.source,
        error: githubResult.error,
      };
    }

    const curationByName = new Map(
      ((data ?? []) as SupabaseGitHubRepositoryCurationRow[]).map((row) => {
        const curation = mapGitHubCurationRow(row);
        return [curation.repositoryName, curation];
      })
    );

    const repositories = githubResult.repositories
      .map((repository) =>
        combineRepositoryWithCuration(
          repository,
          githubResult.source,
          curationByName.get(repository.name)
        )
      )
      .filter((repository) => repository.isConfigured && repository.visible)
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }

        return a.name.localeCompare(b.name);
      });

    if (!repositories.length) {
      return {
        repositories: githubResult.repositories.map((repository) =>
          combineRepositoryWithCuration(repository, githubResult.source)
        ),
        source: githubResult.source,
        error: githubResult.error,
      };
    }

    return {
      repositories,
      source: githubResult.source === "fallback" ? "curated-fallback" : "curated",
      error: githubResult.error,
    };
  } catch {
    return {
      repositories: githubResult.repositories.map((repository) =>
        combineRepositoryWithCuration(repository, githubResult.source)
      ),
      source: githubResult.source,
      error:
        githubResult.error ??
        "Nao foi possivel carregar curadoria publica; exibindo GitHub ou fallback.",
    };
  }
}
