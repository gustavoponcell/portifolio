import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import type { SupabaseCourseRow } from "@/lib/supabase/types";
import type { AdminCrudResult, Course, CourseInput } from "@/types/admin";

function empty(value: string | null | undefined) {
  return value ?? "";
}

function mapCourse(row: SupabaseCourseRow): Course {
  return {
    id: row.id,
    title: row.title,
    institution: empty(row.institution),
    description: empty(row.description),
    year: empty(row.year),
    certificateUrl: empty(row.certificate_url),
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

export async function getCourses(): Promise<AdminCrudResult<Course[]>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel carregar cursos.",
      };
    }

    return {
      ok: true,
      message: "Cursos carregados.",
      data: (data ?? []).map(mapCourse),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function createCourse(input: CourseInput): Promise<AdminCrudResult<Course>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("courses")
      .insert({
        title: input.title,
        institution: input.institution || null,
        description: input.description || null,
        year: input.year || null,
        certificate_url: input.certificateUrl || null,
        sort_order: input.sortOrder,
        visible: input.visible,
      })
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel criar o curso.",
      };
    }

    return {
      ok: true,
      message: "Curso criado com sucesso.",
      data: mapCourse(data),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function updateCourse(
  id: string,
  input: CourseInput
): Promise<AdminCrudResult<Course>> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("courses")
      .update({
        title: input.title,
        institution: input.institution || null,
        description: input.description || null,
        year: input.year || null,
        certificate_url: input.certificateUrl || null,
        sort_order: input.sortOrder,
        visible: input.visible,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel atualizar o curso.",
      };
    }

    return {
      ok: true,
      message: "Curso atualizado com sucesso.",
      data: mapCourse(data),
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function deleteCourse(id: string): Promise<AdminCrudResult> {
  const guard = await ensureWritableAdmin();

  if (!guard.ok) {
    return guard;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel excluir o curso.",
      };
    }

    return {
      ok: true,
      message: "Curso excluido com sucesso.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}

export async function toggleCourseVisibility(
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
      .from("courses")
      .update({ visible })
      .eq("id", id);

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel alterar a visibilidade do curso.",
      };
    }

    return {
      ok: true,
      message: "Visibilidade atualizada.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase admin.",
    };
  }
}
