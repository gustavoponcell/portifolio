import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

export function AboutPreviewSection() {
  return (
    <section id="sobre" className="brutal-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <SectionHeading
        eyebrow="Sobre mim"
        title="Um olhar visual com raciocinio de sistema"
        description="Uma apresentacao resumida, sem dados profissionais inventados."
        level={2}
      />

      <BrutalCard className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <ModeBadge mode="design" />
          <ModeBadge mode="dev" />
        </div>
        <p className="text-xl font-bold leading-9">
          Sou Gustavo Poncell, um profissional em formacao que une design
          grafico, criacao visual e desenvolvimento de sistemas para
          construir experiencias digitais mais claras, bonitas e funcionais.
        </p>
        <p className="leading-8">
          A proposta deste portfolio e organizar projetos digitais, interfaces,
          sistemas web e materiais visuais em uma experiencia unica, com
          curadoria e administracao futuras.
        </p>
      </BrutalCard>
    </section>
  );
}
