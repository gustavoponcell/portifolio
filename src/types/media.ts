export type MediaBucket = "portfolio-media";

export type MediaFolder =
  | "profile"
  | "projects/design/covers"
  | "projects/design/gallery"
  | "projects/shared";

export type AllowedImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif";

export type MediaAsset = {
  path: string;
  publicUrl: string;
  bucket: MediaBucket;
  contentType: AllowedImageMimeType;
  size: number;
  fileName: string;
};

export type MediaUploadResult = {
  ok: boolean;
  message: string;
  asset?: MediaAsset;
};
