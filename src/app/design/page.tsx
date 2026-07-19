import type { Metadata } from "next";

import { BehancePreviewSection } from "@/components/design/behance-preview-section";
import { CreativeAreasSection } from "@/components/design/creative-areas-section";
import { CreativeProcessSection } from "@/components/design/creative-process-section";
import { DesignCtaSection } from "@/components/design/design-cta-section";
import { DesignHeroSection } from "@/components/design/design-hero-section";
import { DesignProjectsSection } from "@/components/design/design-projects-section";
import { DesignToolsSection } from "@/components/design/design-tools-section";
import { getPublicDesignProjects } from "@/lib/design-projects";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Design",
  description:
    "Projetos de Gustavo Poncell em identidade visual, composição, peças gráficas, interfaces e direção criativa.",
  path: "/design",
});

export const revalidate = 300;

export default async function DesignPage() {
  const projects = await getPublicDesignProjects();

  return (
    <>
      <DesignHeroSection />
      <DesignToolsSection />
      <CreativeAreasSection />
      <DesignProjectsSection projects={projects} />
      <CreativeProcessSection />
      <BehancePreviewSection />
      <DesignCtaSection />
    </>
  );
}
