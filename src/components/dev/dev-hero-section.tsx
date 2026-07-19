import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";

export function DevHeroSection() {
  return (
    <section className="brutal-section grid min-h-[calc(100vh-12rem)] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-7">
        <ModeBadge mode="dev" />

        <div className="space-y-5">
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-none tracking-tight sm:text-7xl">
            Sistemas, interfaces e experiências digitais construídas com código.
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-8 sm:text-xl">
            Projetos que exploram front-end, organização de dados, integrações
            e produtos digitais com atenção à experiência de uso.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <BrutalButton href="#projetos-dev" variant="dev">
            Ver projetos dev
          </BrutalButton>
          <BrutalButton href="/design" variant="outline">
            Conhecer lado Design
          </BrutalButton>
        </div>
      </div>

      <BrutalCard className="relative overflow-hidden bg-card">
        <div className="absolute -right-10 -top-10 h-28 w-28 brutal-border bg-dev" />
        <div className="relative space-y-5">
          <p className="brutal-border inline-flex border-[#111111] bg-dev px-3 py-1 text-xs font-black uppercase tracking-[0.2em] !text-[#111111]">
            Fluxo de trabalho
          </p>
          <div className="brutal-border bg-background p-5 font-mono text-sm text-dev">
            <p>$ planejar interface</p>
            <p className="mt-3">OK Estrutura, conteúdo e navegação</p>
            <p>OK Design system neobrutalista</p>
            <p>OK Código organizado e revisável</p>
          </div>
          <div className="grid grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-12 brutal-border border-[#111111] bg-card" />
            <span className="h-12 brutal-border border-[#111111] bg-muted" />
            <span className="h-12 brutal-border border-[#111111] bg-background" />
            <span className="h-12 brutal-border border-[#111111] bg-dev" />
          </div>
        </div>
      </BrutalCard>
    </section>
  );
}
