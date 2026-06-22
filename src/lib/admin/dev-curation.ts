import { requireAdmin } from "@/lib/auth/admin";
import {
  combineRepositoryWithCuration,
  mapGitHubCurationRow,
} from "@/lib/github-curation";
import { getGitHubRepositories } from "@/lib/github";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import type { SupabaseGitHubRepositoryCurationRow } from "@/lib/supabase/types";
import type { AdminCrudResult } from "@/types/admin";
import type {
  GitHubRepositoryCuration,
  GitHubRepositoryCurationInput,
  GitHubRepositoryCurationResult,
} from "@/types/github";

async function ensureWritableAdmin() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    return {
      ok: false,
      message: "Acesso negado. Entre com o usuario administrador.",
    };
  }

  if (!hasSupabaseAdminEnv()) {
    return {
      ok: false,
      message:
        "A conexao administrativa com o Supabase ainda nao esta configurada no servidor.",
    };
  }

  return { ok: true, message: "OK" };
}

export async function getDevRepositoryCurations(): Promise<
  AdminCrudResult<GitHubRepositoryCuration[]>
> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("github_repository_curations")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("repository_name", { ascending: true });

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel carregar curadorias Dev.",
      };
    }

    return {
      ok: true,
      message: "Curadorias Dev carregadas.",
      data: ((data ?? []) as SupabaseGitHubRepositoryCurationRow[]).map(
        mapGitHubCurationRow
      ),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function getDevRepositoryCurationByName(
  repositoryName: string
): Promise<AdminCrudResult<GitHubRepositoryCuration | null>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("github_repository_curations")
      .select("*")
      .eq("repository_name", repositoryName)
      .maybeSingle();

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel carregar a curadoria Dev.",
      };
    }

    return {
      ok: true,
      message: "Curadoria Dev carregada.",
      data: data ? mapGitHubCurationRow(data as SupabaseGitHubRepositoryCurationRow) : null,
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

function curationPayload(input: GitHubRepositoryCurationInput) {
  return {
    repository_name: input.repositoryName,
    custom_title: input.customTitle || null,
    custom_description: input.customDescription || null,
    custom_summary: input.customSummary || null,
    custom_tags: input.customTags,
    custom_tools: input.customTools,
    custom_status: input.customStatus,
    visible: input.visible,
    featured: input.featured,
    sort_order: input.sortOrder,
  };
}

export async function upsertDevRepositoryCuration(
  input: GitHubRepositoryCurationInput
): Promise<AdminCrudResult<GitHubRepositoryCuration>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("github_repository_curations")
      .upsert(curationPayload(input), { onConflict: "repository_name" })
      .select("*")
      .single();

    if (error || !data) {
      return {
        ok: false,
        message: "Nao foi possivel salvar a curadoria Dev.",
      };
    }

    return {
      ok: true,
      message: "Curadoria Dev salva com sucesso.",
      data: mapGitHubCurationRow(data as SupabaseGitHubRepositoryCurationRow),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function deleteDevRepositoryCuration(
  repositoryName: string
): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("github_repository_curations")
      .delete()
      .eq("repository_name", repositoryName);

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel remover a curadoria Dev.",
      };
    }

    return {
      ok: true,
      message: "Curadoria removida. O repositorio no GitHub nao foi alterado.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

async function patchCuration(
  repositoryName: string,
  patch: Partial<GitHubRepositoryCurationInput>
) {
  const current = await getDevRepositoryCurationByName(repositoryName);

  if (!current.ok) {
    return current;
  }

  const base: GitHubRepositoryCurationInput = current.data
    ? {
        repositoryName: current.data.repositoryName,
        customTitle: current.data.customTitle,
        customDescription: current.data.customDescription,
        customSummary: current.data.customSummary,
        customTags: current.data.customTags,
        customTools: current.data.customTools,
        customStatus: current.data.customStatus,
        visible: current.data.visible,
        featured: current.data.featured,
        sortOrder: current.data.sortOrder,
      }
    : {
        repositoryName,
        customTitle: "",
        customDescription: "",
        customSummary: "",
        customTags: [],
        customTools: [],
        customStatus: "published",
        visible: false,
        featured: false,
        sortOrder: 0,
      };

  return upsertDevRepositoryCuration({ ...base, ...patch });
}

export async function toggleDevRepositoryVisibility(
  repositoryName: string,
  visible: boolean
): Promise<AdminCrudResult> {
  const result = await patchCuration(repositoryName, { visible });

  return {
    ok: result.ok,
    message: result.ok ? "Visibilidade da curadoria atualizada." : result.message,
  };
}

export async function toggleDevRepositoryFeatured(
  repositoryName: string,
  featured: boolean
): Promise<AdminCrudResult> {
  const result = await patchCuration(repositoryName, { featured });

  return {
    ok: result.ok,
    message: result.ok ? "Destaque da curadoria atualizado." : result.message,
  };
}

export async function getGitHubRepositoriesForAdmin(): Promise<
  AdminCrudResult<GitHubRepositoryCurationResult>
> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  const githubResult = await getGitHubRepositories();
  const curationsResult = await getDevRepositoryCurations();

  if (!curationsResult.ok) {
    return {
      ok: false,
      message: curationsResult.message,
    };
  }

  const curations = curationsResult.data ?? [];
  const curationByName = new Map(
    curations.map((curation) => [curation.repositoryName, curation])
  );

  const repositories = githubResult.repositories
    .map((repository) =>
      combineRepositoryWithCuration(
        repository,
        githubResult.source,
        curationByName.get(repository.name)
      )
    )
    .sort((a, b) => {
      if (a.isConfigured !== b.isConfigured) {
        return a.isConfigured ? -1 : 1;
      }

      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }

      return a.name.localeCompare(b.name);
    });

  return {
    ok: true,
    message: "Repositorios Dev carregados para curadoria.",
    data: {
      repositories,
      source: githubResult.source,
      error: githubResult.error,
    },
  };
}
