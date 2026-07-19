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
              ? "Se você tem uma oportunidade, projeto ou ideia que combina com design e desenvolvimento, eu vou gostar de conversar."
              : "Meus canais de contato ainda não foram publicados por aqui. Enquanto isso, você pode conhecer melhor meu trabalho em Design e Dev."
          }
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <BrutalButton href="/contato" variant="outline">
            Falar comigo
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
