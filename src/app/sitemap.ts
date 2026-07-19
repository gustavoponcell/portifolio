import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublicDesignProjects } from "@/lib/design-projects";
import { absoluteUrl } from "@/lib/seo/urls";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await getPublicDesignProjects();
  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/projetos/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  const publicRoutes = siteConfig.publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));

  return [...publicRoutes, ...projectRoutes];
}
