import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

export function DesignCtaSection() {
  return (
    <section className="brutal-section">
      <BrutalCard className="grid gap-8 bg-card text-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Proximo caminho"
          title="Design e desenvolvimento caminham juntos por aqui."
          description="Continue pela Home ou conheca o lado Dev do portfolio."
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <BrutalButton href="/" variant="outline">
            Voltar a Home
          </BrutalButton>
          <BrutalButton href="/dev" variant="dev">
            Ver Modo Dev
          </BrutalButton>
        </div>
      </BrutalCard>
    </section>
  );
}
