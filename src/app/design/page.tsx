import type { Metadata } from "next";

import { BehancePreviewSection } from "@/components/design/behance-preview-section";
import { CreativeAreasSection } from "@/components/design/creative-areas-section";
import { CreativeProcessSection } from "@/components/design/creative-process-section";
import { DesignCtaSection } from "@/components/design/design-cta-section";
import { DesignHeroSection } from "@/components/design/design-hero-section";
import { DesignProjectsSection } from "@/components/design/design-projects-section";
import { DesignToolsSection } from "@/components/design/design-tools-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Design",
  description:
    "Projetos visuais, identidade, UI e experimentos graficos do portfolio de Gustavo Poncell.",
  path: "/design",
});

export default function DesignPage() {
  return (
    <>
      <DesignHeroSection />
      <DesignToolsSection />
      <CreativeAreasSection />
      <DesignProjectsSection />
      <CreativeProcessSection />
      <BehancePreviewSection />
      <DesignCtaSection />
    </>
  );
}
