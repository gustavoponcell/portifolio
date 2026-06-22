import type { Metadata } from "next";

import { AboutPreviewSection } from "@/components/home/about-preview-section";
import { ContactPreviewSection } from "@/components/home/contact-preview-section";
import { ExperiencePreviewSection } from "@/components/home/experience-preview-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { ModeCardsSection } from "@/components/home/mode-cards-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata();
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <HeroSection />
      <ModeCardsSection />
      <FeaturedProjectsSection />
      <AboutPreviewSection />
      <ExperiencePreviewSection />
      <ContactPreviewSection />
    </>
  );
}
