import {
  combineRepositoryWithCuration,
  mapGitHubCurationRow,
} from "@/lib/github-curation";
import { getGitHubRepositories } from "@/lib/github";
import { createPublicClient } from "@/lib/supabase/public";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import type { SupabaseGitHubRepositoryCurationRow } from "@/lib/supabase/types";
import type { GitHubRepositoryCurationResult } from "@/types/github";

export async function getPublicDevRepositories(): Promise<GitHubRepositoryCurationResult> {
  const githubResult = await getGitHubRepositories();

  if (githubResult.source !== "github") {
    return {
      repositories: [],
      source: "fallback",
      error: githubResult.error,
    };
  }

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
    const supabase = createPublicClient();

    if (!supabase) {
      return {
        repositories: [],
        source: "fallback",
      };
    }

    const { data, error } = await supabase
      .from("github_repository_curations")
      .select("*")
      .eq("visible", true)
      .eq("custom_status", "published")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return {
        repositories: [],
        source: error ? "fallback" : "curated",
        error: error ? "Não foi possível carregar os projetos selecionados." : undefined,
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

    return {
      repositories,
      source: "curated",
    };
  } catch {
    return {
      repositories: [],
      source: "fallback",
      error: "Não foi possível carregar os projetos selecionados.",
    };
  }
}
