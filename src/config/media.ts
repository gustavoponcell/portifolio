import type { AllowedImageMimeType, MediaBucket, MediaFolder } from "@/types/media";

export const MEDIA_BUCKET: MediaBucket = "portfolio-media";
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES: AllowedImageMimeType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MEDIA_FOLDERS: Record<string, MediaFolder> = {
  profile: "profile",
  designCover: "projects/design/covers",
  designGallery: "projects/design/gallery",
  shared: "projects/shared",
};

export const MEDIA_FOLDER_LABELS: Record<MediaFolder, string> = {
  profile: "Perfil",
  "projects/design/covers": "Capas de projetos Design",
  "projects/design/gallery": "Galeria de projetos Design",
  "projects/shared": "Imagens compartilhadas",
};

export function getAllowedImageTypesLabel() {
  return "JPEG, PNG, WebP ou GIF";
}

export function getMaxImageSizeLabel() {
  return "5 MB";
}
