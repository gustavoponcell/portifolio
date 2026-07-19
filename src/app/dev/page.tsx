import type { Metadata } from "next";

import { DevCtaSection } from "@/components/dev/dev-cta-section";
import { DevHeroSection } from "@/components/dev/dev-hero-section";
import { DevProjectsSection } from "@/components/dev/dev-projects-section";
import { DevelopmentProcessSection } from "@/components/dev/development-process-section";
import { GithubPreviewSection } from "@/components/dev/github-preview-section";
import { TechStackSection } from "@/components/dev/tech-stack-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dev",
  description:
    "Projetos de desenvolvimento, interfaces, sistemas e repositórios selecionados do portfólio de Gustavo Poncell.",
  path: "/dev",
});

export default function DevPage() {
  return (
    <>
      <DevHeroSection />
      <TechStackSection />
      <DevProjectsSection />
      <DevelopmentProcessSection />
      <GithubPreviewSection />
      <DevCtaSection />
    </>
  );
}
