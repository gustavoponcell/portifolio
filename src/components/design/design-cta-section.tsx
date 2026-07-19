import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

export function DesignCtaSection() {
  return (
    <section className="brutal-section">
      <BrutalCard className="grid gap-8 bg-card text-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Próximo caminho"
          title="Meu lado visual também se conecta com código."
          description="Conheça meu lado Dev para ver como eu levo organização, interface e identidade para produtos digitais."
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <BrutalButton href="/" variant="outline">
            Voltar à Home
          </BrutalButton>
          <BrutalButton href="/dev" variant="dev">
            Ver meu lado Dev
          </BrutalButton>
        </div>
      </BrutalCard>
    </section>
  );
}
