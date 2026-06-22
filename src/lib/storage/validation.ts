import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  getAllowedImageTypesLabel,
  getMaxImageSizeLabel,
} from "@/config/media";
import type { AllowedImageMimeType } from "@/types/media";

export type ImageValidationResult =
  | { ok: true; contentType: AllowedImageMimeType }
  | { ok: false; message: string };

export function isAllowedImageMimeType(type: string): type is AllowedImageMimeType {
  return ALLOWED_IMAGE_TYPES.includes(type as AllowedImageMimeType);
}

export function validateImageFile(file: File | null | undefined): ImageValidationResult {
  if (!file || file.size === 0) {
    return {
      ok: false,
      message: "Envie uma imagem antes de continuar.",
    };
  }

  if (!isAllowedImageMimeType(file.type)) {
    return {
      ok: false,
      message: `Tipo de arquivo invalido. Use ${getAllowedImageTypesLabel()}.`,
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      ok: false,
      message: `Imagem muito grande. O limite atual e ${getMaxImageSizeLabel()}.`,
    };
  }

  if (file.name.includes("..") || file.name.includes("/") || file.name.includes("\\")) {
    return {
      ok: false,
      message: "Nome do arquivo contem caracteres invalidos.",
    };
  }

  return {
    ok: true,
    contentType: file.type,
  };
}
