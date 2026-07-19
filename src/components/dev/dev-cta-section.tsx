import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

export function DevCtaSection() {
  return (
    <section className="brutal-section">
      <BrutalCard className="grid gap-8 bg-card text-foreground lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Próximo caminho"
          title="Meu código também nasce de um olhar visual."
          description="Conheça meu lado Design para entender como identidade, composição e interface completam meu trabalho técnico."
          level={2}
          className="[&>h2]:text-foreground [&>p:last-child]:text-muted-foreground"
        />

        <div className="flex flex-wrap gap-4 lg:justify-end">
          <BrutalButton href="/" variant="outline">
            Voltar à Home
          </BrutalButton>
          <BrutalButton href="/design" variant="design">
            Ver meu lado Design
          </BrutalButton>
        </div>
      </BrutalCard>
    </section>
  );
}
