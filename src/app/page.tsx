import type { Metadata } from "next";

import { AboutPreviewSection } from "@/components/home/about-preview-section";
import { ContactPreviewSection } from "@/components/home/contact-preview-section";
import { ExperiencePreviewSection } from "@/components/home/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { ModeCardsSection } from "@/components/home/mode-cards-section";
import { getFeaturedPublicDesignProjects } from "@/lib/design-projects";
import { getPublicDevRepositories } from "@/lib/dev-repositories";
import { getPublicExperiences } from "@/lib/public-experiences";
import { getPublicProfile } from "@/lib/public-profile";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata();
export const revalidate = 300;

export default async function Home() {
  const [profile, experiences, designProjects, devResult] = await Promise.all([
    getPublicProfile(),
    getPublicExperiences(),
    getFeaturedPublicDesignProjects(),
    getPublicDevRepositories(),
  ]);

  const devRepositories = devResult.repositories.filter(
    (repository) => repository.featured
  );

  return (
    <>
      <HeroSection profile={profile} />
      <ModeCardsSection />
      <FeaturedProjectsSection
        designProjects={designProjects}
        devRepositories={devRepositories}
      />
      <AboutPreviewSection />
      <ExperiencePreviewSection experiences={experiences} />
      <ContactPreviewSection />
    </>
  );
}
