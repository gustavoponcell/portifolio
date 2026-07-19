import { requireAdmin } from "@/lib/auth/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import type { SupabaseProfileRow } from "@/lib/supabase/types";
import type { AdminCrudResult, Profile, ProfileInput } from "@/types/admin";

function empty(value: string | null | undefined) {
  return value ?? "";
}

function mapProfile(row: SupabaseProfileRow): Profile {
  return {
    id: row.id,
    fullName: empty(row.full_name),
    displayName: empty(row.display_name),
    headline: empty(row.headline),
    bio: empty(row.bio),
    avatarUrl: empty(row.avatar_url),
    emailPublic: empty(row.email_public),
    phonePublic: empty(row.phone_public),
    whatsappUrl: empty(row.whatsapp_url),
    githubUrl: empty(row.github_url),
    behanceUrl: empty(row.behance_url),
    linkedinUrl: empty(row.linkedin_url),
    instagramUrl: empty(row.instagram_url),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function ensureAdminDatabase() {
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

export async function getProfile(): Promise<AdminCrudResult<Profile | null>> {
  const guard = await ensureAdminDatabase();

  if (!guard.ok) {
    return guard;
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
      message: "Usuário autenticado não encontrado.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return {
        ok: false,
        message: "Não foi possível carregar o perfil.",
      };
    }

    return {
      ok: true,
      message: "Perfil carregado.",
      data: data ? mapProfile(data) : null,
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function upsertProfile(
  input: ProfileInput
): Promise<AdminCrudResult<Profile>> {
  const guard = await ensureAdminDatabase();

  if (!guard.ok) {
    return guard;
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
      message: "Usuário autenticado não encontrado.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: input.fullName,
        display_name: input.displayName || null,
        headline: input.headline || null,
        bio: input.bio || null,
        avatar_url: input.avatarUrl || null,
        email_public: input.emailPublic || null,
        phone_public: input.phonePublic || null,
        whatsapp_url: input.whatsappUrl || null,
        github_url: input.githubUrl || null,
        behance_url: input.behanceUrl || null,
        linkedin_url: input.linkedinUrl || null,
        instagram_url: input.instagramUrl || null,
      })
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Não foi possível salvar o perfil.",
      };
    }

    return {
      ok: true,
      message: "Perfil salvo com sucesso.",
      data: mapProfile(data),
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível conectar ao Supabase admin.",
    };
  }
}

export async function updateProfileAvatar(
  avatarUrl: string
): Promise<AdminCrudResult<Profile>> {
  const guard = await ensureAdminDatabase();

  if (!guard.ok) {
    return guard;
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
      message: "Usuário autenticado não encontrado.",
    };
  }

  const nextAvatarUrl = avatarUrl.trim();

  if (!nextAvatarUrl) {
    return {
      ok: false,
      message: "URL pública do avatar não encontrada.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, avatar_url: nextAvatarUrl })
      .select("*")
      .single();

    if (error) {
      return {
        ok: false,
        message: "Imagem enviada, mas não foi possível atualizar o perfil.",
      };
    }

    return {
      ok: true,
      message: "Avatar atualizado com sucesso.",
      data: mapProfile(data),
    };
  } catch {
    return {
      ok: false,
      message: "Imagem enviada, mas não foi possível conectar ao perfil.",
    };
  }
}
