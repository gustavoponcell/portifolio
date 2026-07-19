import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";

export function ContactEmptyState() {
  return (
    <BrutalCard className="space-y-5 bg-muted">
      <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Canais de contato
        </p>
        <h2 className="text-3xl font-black">Meus canais de contato ainda não foram publicados por aqui.</h2>
        <p className="max-w-3xl leading-7">
          Enquanto isso, você pode conhecer melhor meu trabalho nas áreas de
          Design e Dev.
        </p>
      </div>

      <BrutalButton href="/" variant="outline">
        Voltar à Home
      </BrutalButton>
    </BrutalCard>
  );
}
