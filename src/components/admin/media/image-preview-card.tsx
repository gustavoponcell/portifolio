import { ResponsiveImage } from "@/components/media/responsive-image";

type ImagePreviewCardProps = {
  title: string;
  imageUrl?: string;
  alt: string;
  caption?: string;
};

export function ImagePreviewCard({
  title,
  imageUrl,
  alt,
  caption,
}: ImagePreviewCardProps) {
  return (
    <div className="brutal-border space-y-3 bg-muted p-4">
      <h3 className="text-xl font-black">{title}</h3>
      {imageUrl ? (
        <ResponsiveImage
          alt={alt}
          className="brutal-border aspect-video w-full object-cover"
          src={imageUrl}
        />
      ) : (
        <div className="brutal-border grid aspect-video place-items-center bg-card p-4 text-center font-black">
          Sem imagem cadastrada
        </div>
      )}
      {caption ?? imageUrl ? (
        <p className="break-all text-xs font-bold leading-5">{caption ?? imageUrl}</p>
      ) : null}
    </div>
  );
}
