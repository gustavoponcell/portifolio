import { siteConfig } from "@/config/site";
import type { PublicContactLink, PublicProfile } from "@/lib/public-profile";
import { absoluteUrl } from "@/lib/seo/urls";
import type { Project } from "@/types/project";

export function createPersonJsonLd(
  profile: PublicProfile,
  contactLinks: PublicContactLink[]
) {
  const name = profile.displayName || profile.fullName || siteConfig.author;
  const sameAs = contactLinks
    .filter((link) => link.kind !== "email" && link.kind !== "phone")
    .map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: siteConfig.url,
    jobTitle: profile.headline || siteConfig.shortTitle,
    description: profile.bio || siteConfig.description,
    sameAs,
  };
}

export function createProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary || project.description,
    url: absoluteUrl(`/projetos/${project.slug}`),
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    keywords: project.tags.join(", "),
  };
}
