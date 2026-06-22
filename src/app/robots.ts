import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: siteConfig.noIndexRoutes,
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
