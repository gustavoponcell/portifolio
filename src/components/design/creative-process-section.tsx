import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const processSteps = [
  "Entender o problema",
  "Organizar referências",
  "Criar direção visual",
  "Prototipar ou montar peças",
  "Refinar e entregar",
];

export function CreativeProcessSection() {
  return (
    <section id="processo-criativo" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Processo criativo"
        title="Da ideia ao visual com intenção"
        description="Meu processo começa entendendo a ideia, passa pela organização visual e termina em uma entrega que faça sentido para quem vê e para quem usa."
        accent="design"
        level={2}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <BrutalCard
            key={step}
            className={
              index % 2 === 0
                ? "bg-design ink-on-accent"
                : "bg-card"
            }
          >
            <p className="text-sm font-black uppercase tracking-[0.2em]">
              Etapa {index + 1}
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight">{step}</h3>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
