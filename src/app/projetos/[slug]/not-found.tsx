import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

export default function ProjectNotFound() {
  return (
    <section className="brutal-section flex min-h-[60vh] flex-col justify-center gap-8">
      <SectionHeading
        eyebrow="Projeto nao encontrado"
        title="Esse slug ainda nao tem case publicado"
        description="O projeto pode estar aguardando curadoria, cadastro no admin futuro ou ajuste de URL."
      />

      <BrutalCard className="space-y-5">
        <ModeBadge mode="hybrid" />
        <p className="max-w-2xl text-lg leading-8">
          Volte para uma das areas principais e escolha um projeto listado nos
          dados mockados atuais.
        </p>
        <div className="flex flex-wrap gap-3">
          <BrutalButton href="/" variant="outline">
            Ir para inicio
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
