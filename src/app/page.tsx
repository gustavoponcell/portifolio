import type { Metadata } from "next";

import { AboutPreviewSection } from "@/components/home/about-preview-section";
import { ContactPreviewSection } from "@/components/home/contact-preview-section";
import { ExperiencePreviewSection } from "@/components/home/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { ModeCardsSection } from "@/components/home/mode-cards-section";
import { getPublicExperiences } from "@/lib/public-experiences";
import { getPublicProfile } from "@/lib/public-profile";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata();
export const revalidate = 300;

export default async function Home() {
  const [profile, experiences] = await Promise.all([
    getPublicProfile(),
    getPublicExperiences(),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <ModeCardsSection />
      <FeaturedProjectsSection />
      <AboutPreviewSection />
      <ExperiencePreviewSection experiences={experiences} />
      <ContactPreviewSection />
    </>
  );
}
