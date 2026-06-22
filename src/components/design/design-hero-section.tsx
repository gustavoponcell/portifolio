import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";

export function DesignHeroSection() {
  return (
    <section className="brutal-section grid min-h-[calc(100vh-12rem)] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-7">
        <ModeBadge mode="design" />

        <div className="space-y-5">
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-none tracking-tight sm:text-7xl">
            Projetos visuais, identidade e interfaces com personalidade.
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-8 sm:text-xl">
            Esta area reune trabalhos criativos, experimentos visuais, pecas
            graficas, interfaces e cases preparados para uma futura curadoria
            completa.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <BrutalButton href="#projetos-design" variant="design">
            Ver projetos de design
          </BrutalButton>
          <BrutalButton href="/dev" variant="outline">
            Conhecer lado Dev
          </BrutalButton>
        </div>
      </div>

      <BrutalCard className="relative overflow-hidden bg-card">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <p className="brutal-border inline-flex border-[#111111] bg-design px-3 py-1 text-xs font-black uppercase tracking-[0.2em] !text-[#111111]">
              Cartaz visual
            </p>
            <span
              className="h-10 w-10 brutal-border border-[#111111] bg-design"
              aria-hidden="true"
            />
          </div>
          <div className="brutal-border border-[#111111] bg-design p-6 ink-on-accent shadow-[6px_6px_0_#f7f3e8]">
            <p className="max-w-sm text-4xl font-black leading-none">
              Direcao visual, contraste e linguagem grafica.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <span className="h-16 brutal-border border-[#111111] bg-card" />
              <span className="h-16 brutal-border border-[#111111] bg-muted" />
              <span className="h-16 brutal-border border-[#111111] bg-background" />
            </div>
          </div>
        </div>
      </BrutalCard>
    </section>
  );
}
