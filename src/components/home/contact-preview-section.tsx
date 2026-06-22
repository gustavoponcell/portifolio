import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import {
  getPublicContactLinks,
  getPublicProfile,
} from "@/lib/public-profile";

export async function ContactPreviewSection() {
  const profile = await getPublicProfile();
  const links = await getPublicContactLinks(profile);
  const hasLinks = links.length > 0;

  return (
    <section id="contato" className="brutal-section">
      <BrutalCard className="grid gap-8 bg-card text-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos construir algo?"
          description={
            hasLinks
              ? "Os canais publicos ja estao organizados em uma pagina simples e direta."
              : "A pagina de contato esta pronta e exibira apenas dados reais quando forem cadastrados."
          }
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <BrutalButton href="/contato" variant="outline">
            Abrir contato
          </BrutalButton>
          <BrutalButton href="/design" variant="design">
            Ver Design
          </BrutalButton>
          <BrutalButton href="/dev" variant="dev">
            Ver Dev
          </BrutalButton>
        </div>
      </BrutalCard>
    </section>
  );
}
