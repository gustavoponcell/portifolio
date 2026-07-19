"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateProfileAvatar } from "@/lib/admin/profile";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import {
  createDesignProjectCoverPath,
  createDesignProjectGalleryPath,
  createProfileAvatarPath,
} from "@/lib/storage/paths";
import { deleteImageFromStorage, uploadImageToStorage } from "@/lib/storage/media";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function fileValue(formData: FormData, key = "image") {
  const file = formData.get(key);
  return file instanceof File ? file : null;
}

function goProfile(message: string, type: "success" | "error"): never {
  redirect(`/admin/perfil?type=${type}&message=${encodeURIComponent(message)}`);
}

function goDesign(message: string, type: "success" | "error"): never {
  redirect(`/admin/projetos/design?type=${type}&message=${encodeURIComponent(message)}`);
}

async function ensureAdminAction() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  if (!hasSupabaseAdminEnv()) {
    return {
      ok: false,
      message:
        "A conexão administrativa com o Supabase Storage ainda não está configurada no servidor.",
    };
  }

  return { ok: true, message: "OK" };
}

function refreshProfile() {
  revalidatePath("/admin");
  revalidatePath("/admin/perfil");
  revalidatePath("/");
  revalidatePath("/contato");
}

function refreshDesign(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/projetos/design");
  revalidatePath("/");
  revalidatePath("/design");

  if (slug) {
    revalidatePath(`/projetos/${slug}`);
  }
}

export async function uploadProfileAvatarAction(formData: FormData) {
  const guard = await ensureAdminAction();

  if (!guard.ok) {
    goProfile(guard.message, "error");
  }

  const file = fileValue(formData);

  if (!file) {
    goProfile("Envie uma imagem antes de continuar.", "error");
  }

  const uploadVersion = Date.now();
  const upload = await uploadImageToStorage(
    file,
    createProfileAvatarPath(file.name, file.type),
    { cacheVersion: uploadVersion }
  );

  if (!upload.ok || !upload.asset) {
    goProfile(upload.message, "error");
  }

  const profileResult = await updateProfileAvatar(upload.asset.publicUrl);

  if (!profileResult.ok) {
    goProfile(profileResult.message, "error");
  }

  refreshProfile();
  goProfile("Avatar enviado e perfil atualizado.", "success");
}

export async function uploadDesignProjectCoverAction(formData: FormData) {
  const guard = await ensureAdminAction();

  if (!guard.ok) {
    goDesign(guard.message, "error");
  }

  const projectId = value(formData, "projectId");
  const projectSlug = value(formData, "projectSlug");
  const file = fileValue(formData);

  if (!projectId || !projectSlug) {
    goDesign("Projeto Design não encontrado.", "error");
  }

  if (!file) {
    goDesign("Envie uma imagem antes de continuar.", "error");
  }

  const upload = await uploadImageToStorage(
    file,
    createDesignProjectCoverPath(projectSlug, file.name, file.type)
  );

  if (!upload.ok || !upload.asset) {
    goDesign(upload.message, "error");
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("projects")
      .update({ cover_url: upload.asset.publicUrl })
      .eq("id", projectId)
      .eq("type", "design");

    if (error) {
      goDesign("Imagem enviada, mas não foi possível atualizar a capa.", "error");
    }
  } catch {
    goDesign("Imagem enviada, mas não foi possível conectar ao projeto.", "error");
  }

  refreshDesign(projectSlug);
  goDesign("Capa enviada e projeto atualizado.", "success");
}

export async function uploadDesignProjectGalleryImageAction(formData: FormData) {
  const guard = await ensureAdminAction();

  if (!guard.ok) {
    goDesign(guard.message, "error");
  }

  const projectId = value(formData, "projectId");
  const projectSlug = value(formData, "projectSlug");
  const title = value(formData, "galleryTitle");
  const description = value(formData, "galleryDescription");
  const file = fileValue(formData);

  if (!projectId || !projectSlug) {
    goDesign("Projeto Design não encontrado.", "error");
  }

  if (!title) {
    goDesign("Título da imagem de galeria é obrigatório.", "error");
  }

  if (!file) {
    goDesign("Envie uma imagem antes de continuar.", "error");
  }

  const upload = await uploadImageToStorage(
    file,
    createDesignProjectGalleryPath(projectSlug, file.name, file.type)
  );

  if (!upload.ok || !upload.asset) {
    goDesign(upload.message, "error");
  }

  try {
    const supabase = createAdminClient();
    const { data: currentGallery } = await supabase
      .from("project_gallery")
      .select("sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: false })
      .limit(1);
    const nextSortOrder = ((currentGallery?.[0]?.sort_order as number | undefined) ?? 0) + 10;
    const { error } = await supabase.from("project_gallery").insert({
      project_id: projectId,
      title,
      description: description || null,
      image_url: upload.asset.publicUrl,
      sort_order: nextSortOrder,
    });

    if (error) {
      goDesign("Imagem enviada, mas não foi possível criar o item de galeria.", "error");
    }
  } catch {
    goDesign("Imagem enviada, mas não foi possível conectar à galeria.", "error");
  }

  refreshDesign(projectSlug);
  goDesign("Imagem enviada e adicionada a galeria.", "success");
}

export async function deleteMediaAction(formData: FormData) {
  const guard = await ensureAdminAction();

  if (!guard.ok) {
    goDesign(guard.message, "error");
  }

  const path = value(formData, "path");
  const requestedRedirect = value(formData, "redirectTo");
  const redirectTo =
    requestedRedirect.startsWith("/") && !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/admin";

  if (!path) {
    redirect(`${redirectTo}?type=error&message=${encodeURIComponent("Imagem não encontrada.")}`);
  }

  const result = await deleteImageFromStorage(path);
  revalidatePath("/admin");

  redirect(
    `${redirectTo}?type=${result.ok ? "success" : "error"}&message=${encodeURIComponent(
      result.message
    )}`
  );
}
