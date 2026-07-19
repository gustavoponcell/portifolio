import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

export function AboutPreviewSection() {
  return (
    <section id="sobre" className="brutal-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <SectionHeading
        eyebrow="Sobre mim"
        title="Um olhar visual com raciocínio técnico"
        description="Eu transito entre design gráfico, criação visual e desenvolvimento web."
        level={2}
      />

      <BrutalCard className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <ModeBadge mode="design" />
          <ModeBadge mode="dev" />
        </div>
        <p className="text-xl font-bold leading-9">
          Eu gosto de criar coisas que funcionam bem e têm identidade. Minha
          trajetória mistura design gráfico, comunicação visual e desenvolvimento
          de sistemas, então penso tanto na aparência quanto na estrutura de cada projeto.
        </p>
        <p className="leading-8">
          Meu jeito de trabalhar une organização da informação, senso estético e
          raciocínio técnico para construir interfaces, sistemas web e materiais
          visuais claros, úteis e com personalidade.
        </p>
      </BrutalCard>
    </section>
  );
}
