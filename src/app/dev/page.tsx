import type { Metadata } from "next";

import { DevCtaSection } from "@/components/dev/dev-cta-section";
import { DevHeroSection } from "@/components/dev/dev-hero-section";
import { DevelopmentProcessSection } from "@/components/dev/development-process-section";
import { GithubPreviewSection } from "@/components/dev/github-preview-section";
import { TechStackSection } from "@/components/dev/tech-stack-section";
import { getPublicDevRepositories } from "@/lib/dev-repositories";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dev",
  description:
    "Projetos de Gustavo Poncell em desenvolvimento web, interfaces, sistemas, organização de código e produtos digitais.",
  path: "/dev",
});

export const revalidate = 300;

export default async function DevPage() {
  const result = await getPublicDevRepositories();

  return (
    <>
      <DevHeroSection />
      <TechStackSection />
      <DevelopmentProcessSection />
      <GithubPreviewSection repositories={result.repositories} />
      <DevCtaSection />
    </>
  );
}
