import "server-only";

import { MEDIA_BUCKET } from "@/config/media";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import { validateImageFile } from "@/lib/storage/validation";
import type { MediaAsset, MediaUploadResult } from "@/types/media";

export function isStorageConfigured() {
  return hasSupabaseAdminEnv();
}

export function getPublicImageUrl(path: string) {
  const supabase = createAdminClient();
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImageToStorage(
  file: File,
  path: string
): Promise<MediaUploadResult> {
  if (!isStorageConfigured()) {
    return {
      ok: false,
      message:
        "Supabase Storage nao configurado. Defina as envs Supabase e a chave admin no servidor.",
    };
  }

  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    return {
      ok: false,
      message: "Caminho de upload invalido.",
    };
  }

  const validation = validateImageFile(file);

  if (!validation.ok) {
    return validation;
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
      cacheControl: "3600",
      contentType: validation.contentType,
      upsert: false,
    });

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel enviar a imagem para o Supabase Storage.",
      };
    }

    const publicUrl = getPublicImageUrl(path);
    const asset: MediaAsset = {
      path,
      publicUrl,
      bucket: MEDIA_BUCKET,
      contentType: validation.contentType,
      size: file.size,
      fileName: file.name,
    };

    return {
      ok: true,
      message: "Imagem enviada com sucesso.",
      asset,
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase Storage.",
    };
  }
}

export async function deleteImageFromStorage(path: string) {
  if (!isStorageConfigured()) {
    return {
      ok: false,
      message:
        "Supabase Storage nao configurado. Defina as envs Supabase e a chave admin no servidor.",
    };
  }

  if (!path || path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    return {
      ok: false,
      message: "Caminho de imagem invalido.",
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);

    if (error) {
      return {
        ok: false,
        message: "Nao foi possivel remover a imagem do Storage.",
      };
    }

    return {
      ok: true,
      message: "Imagem removida do Storage.",
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel conectar ao Supabase Storage.",
    };
  }
}
