import { MEDIA_FOLDERS } from "@/config/media";

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function randomId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createSafeFileName(fileName: string, contentType?: string) {
  const extension =
    contentType && extensionByMimeType[contentType]
      ? extensionByMimeType[contentType]
      : fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "img";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const safeBase = slugify(baseName).slice(0, 48) || "imagem";

  return `${safeBase}-${Date.now()}-${randomId()}.${extension}`;
}

export function createProfileAvatarPath(fileName: string, contentType?: string) {
  return `${MEDIA_FOLDERS.profile}/avatar/${createSafeFileName(fileName, contentType)}`;
}

export function createDesignProjectCoverPath(
  projectSlug: string,
  fileName: string,
  contentType?: string
) {
  const safeSlug = slugify(projectSlug) || "projeto";
  return `${MEDIA_FOLDERS.designCover}/${safeSlug}/${createSafeFileName(
    fileName,
    contentType
  )}`;
}

export function createDesignProjectGalleryPath(
  projectSlug: string,
  fileName: string,
  contentType?: string
) {
  const safeSlug = slugify(projectSlug) || "projeto";
  return `${MEDIA_FOLDERS.designGallery}/${safeSlug}/${createSafeFileName(
    fileName,
    contentType
  )}`;
}
