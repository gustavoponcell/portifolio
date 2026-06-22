import { BrutalCard } from "@/components/brand/brutal-card";

const nextSteps = [
  "Conectar exibicao publica dos projetos Design ao Supabase quando a curadoria estiver pronta.",
  "Criar curadoria manual de links Behance, sem API real.",
  "Revisar SEO, performance e acessibilidade antes do deploy.",
  "Preparar contato publico funcional com validacao e anti-spam.",
];

export function AdminNextSteps() {
  return (
    <BrutalCard className="space-y-5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em]">
          Proximas etapas
        </p>
        <h2 className="mt-2 text-3xl font-black">O que vem depois</h2>
      </div>

      <ol className="grid gap-3 md:grid-cols-2">
        {nextSteps.map((step, index) => (
          <li key={step} className="brutal-border bg-muted p-4 font-bold leading-7">
            <span className="mr-2 font-black">{index + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </BrutalCard>
  );
}
