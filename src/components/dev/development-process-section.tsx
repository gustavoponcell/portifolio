import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const processSteps = [
  "Entender o problema",
  "Planejar a estrutura",
  "Criar interface e fluxos",
  "Integrar dados e regras",
  "Testar, revisar e publicar",
];

export function DevelopmentProcessSection() {
  return (
    <section id="processo-dev" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Processo de desenvolvimento"
        title="Como eu organizo uma ideia até ela funcionar"
        description="Quando desenvolvo, começo pela estrutura, penso nos componentes, organizo os dados e só então refino a experiência e a entrega."
        accent="dev"
        level={2}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <BrutalCard
            key={step}
            className={
              index % 2 === 0
                ? "bg-dev brutal-card-accent ink-on-accent"
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
