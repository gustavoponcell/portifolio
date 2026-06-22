import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectRoutes = getAllProjects().map((project) => ({
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
