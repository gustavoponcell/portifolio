import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

export default function ProjectNotFound() {
  return (
    <section className="brutal-section flex min-h-[60vh] flex-col justify-center gap-8">
      <SectionHeading
        eyebrow="Projeto não encontrado"
        title="Este projeto não está disponível"
        description="O endereço acessado não corresponde a um case publicado no portfólio."
      />

      <BrutalCard className="space-y-5">
        <ModeBadge mode="hybrid" />
        <p className="max-w-2xl text-lg leading-8">
          Volte para uma das áreas principais e escolha um projeto disponível
          na seleção atual.
        </p>
        <div className="flex flex-wrap gap-3">
          <BrutalButton href="/" variant="outline">
            Ir para início
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
