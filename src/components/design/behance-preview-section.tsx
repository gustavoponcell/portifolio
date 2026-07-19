import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

export function BehancePreviewSection() {
  return (
    <section id="behance" className="brutal-section">
      <BrutalCard className="grid gap-8 bg-design brutal-card-accent ink-on-accent lg:grid-cols-[1fr_auto] lg:items-center">
        <SectionHeading
          eyebrow="Cases visuais"
          title="Mais detalhes dos meus projetos visuais"
          description="Quando um projeto tiver uma apresentação externa disponível, deixo o acesso por aqui para você conhecer o processo com mais profundidade."
          accent="neutral"
          level={2}
        />

        <span
          aria-disabled="true"
          className="surface-on-accent inline-flex w-fit px-5 py-3 text-sm font-black uppercase tracking-wide"
        >
          Novos materiais em breve
        </span>
      </BrutalCard>
    </section>
  );
}
