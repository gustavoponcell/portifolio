import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import type {
  SupabaseProjectGalleryRow,
  SupabaseProjectHighlightRow,
  SupabaseProjectRow,
  SupabaseProjectTagRow,
  SupabaseProjectToolRow,
} from "@/lib/supabase/types";
import type {
  AdminCrudResult,
  AdminDesignProject,
  AdminDesignProjectInput,
  AdminProjectGalleryItem,
  AdminProjectHighlight,
} from "@/types/admin";

function empty(value: string | null | undefined) {
  return value ?? "";
}

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

function mapDesignProject(
  row: SupabaseProjectRow,
  tags: SupabaseProjectTagRow[],
  tools: SupabaseProjectToolRow[],
  gallery: SupabaseProjectGalleryRow[],
  highlights: SupabaseProjectHighlightRow[]
): AdminDesignProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    summary: empty(row.summary),
    status: row.status,
    featured: row.featured,
    coverUrl: empty(row.cover_url),
    year: empty(row.year),
    role: empty(row.role),
    externalUrl: empty(row.external_url),
    sortOrder: row.sort_order,
    tags: tags.map((tag) => tag.name),
    tools: tools.map((tool) => tool.name),
    gallery: gallery.map(
      (item): AdminProjectGalleryItem => ({
        id: item.id,
        title: item.title,
        description: empty(item.description),
        imageUrl: empty(item.image_url),
        sortOrder: item.sort_order,
      })
    ),
    highlights: highlights.map(
      (highlight): AdminProjectHighlight => ({
        id: highlight.id,
        content: highlight.content,
        sortOrder: highlight.sort_order,
      })
    ),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function loadRelations(projectIds: string[]) {
  if (!projectIds.length) {
    return {
      tags: [] as SupabaseProjectTagRow[],
      tools: [] as SupabaseProjectToolRow[],
      gallery: [] as SupabaseProjectGalleryRow[],
      highlights: [] as SupabaseProjectHighlightRow[],
      error: null as unknown,
    };
  }

  const supabase = createAdminClient();
  const [tags, tools, gallery, highlights] = await Promise.all([
    supabase.from("project_tags").select("*").in("project_id", projectIds).order("name"),
    supabase.from("project_tools").select("*").in("project_id", projectIds).order("name"),
    supabase
      .from("project_gallery")
      .select("*")
      .in("project_id", projectIds)
      .order("sort_order", { ascending: true }),
    supabase
      .from("project_highlights")
      .select("*")
      .in("project_id", projectIds)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    tags: (tags.data ?? []) as SupabaseProjectTagRow[],
    tools: (tools.data ?? []) as SupabaseProjectToolRow[],
    gallery: (gallery.data ?? []) as SupabaseProjectGalleryRow[],
    highlights: (highlights.data ?? []) as SupabaseProjectHighlightRow[],
    error: tags.error ?? tools.error ?? gallery.error ?? highlights.error,
  };
}

function groupByProjectId<T extends { project_id: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    acc[item.project_id] = [...(acc[item.project_id] ?? []), item];
    return acc;
  }, {});
}

async function saveProjectRelations(projectId: string, input: AdminDesignProjectInput) {
  const supabase = createAdminClient();

  const deleteResults = await Promise.all([
    supabase.from("project_tags").delete().eq("project_id", projectId),
    supabase.from("project_tools").delete().eq("project_id", projectId),
    supabase.from("project_gallery").delete().eq("project_id", projectId),
    supabase.from("project_highlights").delete().eq("project_id", projectId),
  ]);

  const deleteError = deleteResults.find((result) => result.error)?.error;

  if (deleteError) {
    return deleteError;
  }

  const inserts = [];

  if (input.tags.length) {
    inserts.push(
      supabase
        .from("project_tags")
        .insert(input.tags.map((name) => ({ project_id: projectId, name })))
    );
  }

  if (input.tools.length) {
    inserts.push(
      supabase
        .from("project_tools")
        .insert(input.tools.map((name) => ({ project_id: projectId, name })))
    );
  }

  if (input.gallery.length) {
    inserts.push(
      supabase.from("project_gallery").insert(
        input.gallery.map((item, index) => ({
          project_id: projectId,
          title: item.title,
          description: item.description || null,
          image_url: item.imageUrl || null,
          sort_order: item.sortOrder || (index + 1) * 10,
        }))
      )
    );
  }

  if (input.highlights.length) {
    inserts.push(
      supabase.from("project_highlights").insert(
        input.highlights.map((highlight, index) => ({
          project_id: projectId,
          content: highlight.content,
          sort_order: highlight.sortOrder || (index + 1) * 10,
        }))
      )
    );
  }

  if (!inserts.length) {
    return null;
  }

  const insertResults = await Promise.all(inserts);
  return insertResults.find((result) => result.error)?.error ?? null;
}

function projectPayload(input: AdminDesignProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    type: "design",
    description: input.description,
    summary: input.summary || null,
    status: input.status,
    featured: input.featured,
    cover_url: input.coverUrl || null,
    year: input.year || null,
    role: input.role || null,
    external_url: input.externalUrl || null,
    repository_url: null,
    live_url: null,
    sort_order: input.sortOrder,
  };
}

export async function getDesignProjects(): Promise<
  AdminCrudResult<AdminDesignProject[]>
> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("type", "design")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel carregar projetos Design.",
      };
    }

    const rows = (data ?? []) as SupabaseProjectRow[];
    const relations = await loadRelations(rows.map((row) => row.id));

    if (relations.error) {
      return {
        ok: false,
        message: "Nao foi possivel carregar dados relacionados dos projetos.",
      };
    }

    const tagsByProject = groupByProjectId(relations.tags);
    const toolsByProject = groupByProjectId(relations.tools);
    const galleryByProject = groupByProjectId(relations.gallery);
    const highlightsByProject = groupByProjectId(relations.highlights);

    return {
      ok: true,
      message: "Projetos Design carregados.",
      data: rows.map((row) =>
        mapDesignProject(
          row,
          tagsByProject[row.id] ?? [],
          toolsByProject[row.id] ?? [],
          galleryByProject[row.id] ?? [],
          highlightsByProject[row.id] ?? []
        )
      ),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function createDesignProject(
  input: AdminDesignProjectInput
): Promise<AdminCrudResult<AdminDesignProject>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .insert(projectPayload(input))
      .select("*")
      .single();

    if (error || !data) {
      return {
        ok: false,
        message: "Nao foi possivel criar o projeto Design.",
      };
    }

    const relationError = await saveProjectRelations(data.id, input);

    if (relationError) {
      return {
        ok: false,
        message: "Projeto criado, mas os dados relacionados nao foram salvos.",
      };
    }

    return {
      ok: true,
      message: "Projeto Design criado com sucesso.",
      data: mapDesignProject(data, [], [], [], []),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function updateDesignProject(
  id: string,
  input: AdminDesignProjectInput
): Promise<AdminCrudResult<AdminDesignProject>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .update(projectPayload(input))
      .eq("id", id)
      .eq("type", "design")
      .select("*")
      .single();

    if (error || !data) {
      return {
        ok: false,
        message: "Nao foi possivel atualizar o projeto Design.",
      };
    }

    const relationError = await saveProjectRelations(id, input);

    if (relationError) {
      return {
        ok: false,
        message: "Projeto atualizado, mas os dados relacionados nao foram salvos.",
      };
    }

    return {
      ok: true,
      message: "Projeto Design atualizado com sucesso.",
      data: mapDesignProject(data, [], [], [], []),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function deleteDesignProject(id: string): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("type", "design");

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel excluir o projeto Design.",
      };
    }

    return {
      ok: true,
      message: "Projeto Design excluido com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function updateDesignProjectStatus(
  id: string,
  status: AdminDesignProject["status"]
): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", id)
      .eq("type", "design");

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel alterar o status do projeto Design.",
      };
    }

    return {
      ok: true,
      message: "Status do projeto atualizado.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function toggleDesignProjectFeatured(
  id: string,
  featured: boolean
): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("projects")
      .update({ featured })
      .eq("id", id)
      .eq("type", "design");

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel alterar o destaque do projeto Design.",
      };
    }

    return {
      ok: true,
      message: "Destaque do projeto atualizado.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}
