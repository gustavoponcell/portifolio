import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/urls";
import type { Project } from "@/types/project";

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function createProjectMetadata(project: Project): Metadata {
  return createPageMetadata({
    title: project.title,
    description: project.summary || project.description,
    path: `/projetos/${project.slug}`,
    image: project.coverUrl || project.cover || siteConfig.ogImage,
  });
}

export const noIndexMetadata = createPageMetadata({
  title: "Área restrita",
  description: "Área restrita do portfólio.",
  path: "/login",
  noIndex: true,
});
