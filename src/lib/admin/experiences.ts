import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import type { SupabaseExperienceRow } from "@/lib/supabase/types";
import type { AdminCrudResult, Experience, ExperienceInput } from "@/types/admin";

function empty(value: string | null | undefined) {
  return value ?? "";
}

function mapExperience(row: SupabaseExperienceRow): Experience {
  return {
    id: row.id,
    title: row.title,
    organization: empty(row.organization),
    description: empty(row.description),
    startDate: empty(row.start_date),
    endDate: empty(row.end_date),
    isCurrent: row.is_current,
    type: row.type,
    sortOrder: row.sort_order,
    visible: row.visible,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function ensureWritableAdmin() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    return {
      ok: false,
      message: "Acesso negado. Entre com o usuário administrador.",
    };
  }

  if (!hasSupabaseAdminEnv()) {
    return {
      ok: false,
      message:
        "A conexão administrativa com o Supabase ainda não está configurada no servidor.",
    };
  }

  return { ok: true, message: "OK" };
}

export async function getExperiences(): Promise<AdminCrudResult<Experience[]>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return {
        ok: false,
        message: "Não foi possível carregar experiências.",
      };
    }

    return {
      ok: true,
      message: "Experiencias carregadas.",
      data: (data ?? []).map(mapExperience),
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function createExperience(
  input: ExperienceInput
): Promise<AdminCrudResult<Experience>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("experiences")
      .insert({
        title: input.title,
        organization: input.organization || null,
        description: input.description || null,
        start_date: input.startDate || null,
        end_date: input.isCurrent ? null : input.endDate || null,
        is_current: input.isCurrent,
        type: input.type || "general",
        sort_order: input.sortOrder,
        visible: input.visible,
      })
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Não foi possível criar a experiência.",
      };
    }

    return {
      ok: true,
      message: "Experiencia criada com sucesso.",
      data: mapExperience(data),
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function updateExperience(
  id: string,
  input: ExperienceInput
): Promise<AdminCrudResult<Experience>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("experiences")
      .update({
        title: input.title,
        organization: input.organization || null,
        description: input.description || null,
        start_date: input.startDate || null,
        end_date: input.isCurrent ? null : input.endDate || null,
        is_current: input.isCurrent,
        type: input.type || "general",
        sort_order: input.sortOrder,
        visible: input.visible,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Não foi possível atualizar a experiência.",
      };
    }

    return {
      ok: true,
      message: "Experiencia atualizada com sucesso.",
      data: mapExperience(data),
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function deleteExperience(id: string): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("experiences").delete().eq("id", id);

    if (error) {
      return {
        ok: false,
        message: "Não foi possível excluir a experiência.",
      };
    }

    return {
      ok: true,
      message: "Experiencia excluida com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function toggleExperienceVisibility(
  id: string,
  visible: boolean
): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("experiences")
      .update({ visible })
      .eq("id", id);

    if (error) {
      return {
        ok: false,
        message: "Não foi possível alterar a visibilidade da experiência.",
      };
    }

    return {
      ok: true,
      message: "Visibilidade atualizada.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}
