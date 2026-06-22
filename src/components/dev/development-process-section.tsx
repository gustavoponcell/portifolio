import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const processSteps = [
  "Entender o problema",
  "Planejar a estrutura",
  "Criar interface e componentes",
  "Integrar dados e regras",
  "Testar, revisar e publicar",
];

export function DevelopmentProcessSection() {
  return (
    <section id="processo-dev" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Processo de desenvolvimento"
        title="Da ideia ao produto digital"
        description="Um fluxo simples para organizar projetos web antes de conectar APIs, banco ou deploy."
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
              Step {index + 1}
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight">{step}</h3>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
