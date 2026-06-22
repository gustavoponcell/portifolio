/* eslint-disable @next/next/no-img-element */

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ResponsiveImage({ src, alt, className }: ResponsiveImageProps) {
  return <img alt={alt} className={className} loading="lazy" src={src} />;
}
