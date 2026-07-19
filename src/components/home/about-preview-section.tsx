import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

export function AboutPreviewSection() {
  return (
    <section id="sobre" className="brutal-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <SectionHeading
        eyebrow="Sobre mim"
        title="Olhar visual, organização e raciocínio técnico"
        description="Gustavo Poncell atua na interseção entre design gráfico e desenvolvimento web."
        level={2}
      />

      <BrutalCard className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <ModeBadge mode="design" />
          <ModeBadge mode="dev" />
        </div>
        <p className="text-xl font-bold leading-9">
          Gustavo Poncell é um profissional em formação que combina design
          gráfico, criação visual e desenvolvimento de sistemas para construir
          experiências digitais claras, funcionais e visualmente marcantes.
        </p>
        <p className="leading-8">
          Sua abordagem une organização da informação, senso estético e
          raciocínio técnico para transformar ideias em interfaces, sistemas web
          e materiais visuais com personalidade.
        </p>
      </BrutalCard>
    </section>
  );
}
