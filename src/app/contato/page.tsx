import type { Metadata } from "next";

import { ContactCtaSection } from "@/components/contact/contact-cta-section";
import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactLinksSection } from "@/components/contact/contact-links-section";
import {
  getPublicContactLinks,
  getPublicProfile,
} from "@/lib/public-profile";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createPersonJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Contato",
  description:
    "Entre em contato com Gustavo Poncell para conversar sobre oportunidades, projetos, parcerias, design e desenvolvimento.",
  path: "/contato",
});

export const revalidate = 300;

export default async function ContactPage() {
  const profile = await getPublicProfile();
  const links = await getPublicContactLinks(profile);
  const jsonLd = createPersonJsonLd(profile, links);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHeroSection profile={profile} />
      <ContactLinksSection links={links} />
      <ContactCtaSection />
    </>
  );
}
