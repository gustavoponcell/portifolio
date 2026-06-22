import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const areas = [
  "Design grafico",
  "UI e interfaces",
  "Desenvolvimento front-end",
  "Sistemas web",
  "Organizacao de projetos digitais",
  "Identidade visual",
];

export function ExperiencePreviewSection() {
  return (
    <section className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Areas de atuacao"
        title="Experiencias futuras, organizadas por frente"
        description="Esta ainda nao e uma timeline formal. As experiencias detalhadas serao cadastradas futuramente pelo admin."
        level={2}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, index) => (
          <BrutalCard
            key={area}
            className={index % 2 === 0 ? "bg-card" : "bg-muted"}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em]">
              Area {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-2xl font-black">{area}</h3>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
