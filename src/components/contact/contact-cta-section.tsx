import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

export function ContactCtaSection() {
  return (
    <section className="brutal-section">
      <BrutalCard className="grid gap-8 bg-card text-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Antes do papo"
          title="Veja os dois lados do portfólio."
          description="Design mostra a frente visual. Dev mostra sistemas, interfaces e repositórios selecionados."
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
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
