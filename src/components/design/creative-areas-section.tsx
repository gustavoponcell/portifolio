import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const creativeAreas = [
  {
    title: "Identidade visual",
    description: "Sistemas de marca, linguagem grafica e consistencia visual.",
  },
  {
    title: "Pecas graficas",
    description: "Composicoes para materiais digitais, editoriais e campanhas.",
  },
  {
    title: "Interfaces e UI",
    description: "Telas, hierarquia visual e organizacao de componentes.",
  },
  {
    title: "Social media",
    description: "Layouts, formatos e linhas visuais para conteudo digital.",
  },
  {
    title: "Direcao visual",
    description: "Referencias, paleta, ritmo e personalidade de projeto.",
  },
  {
    title: "Materiais digitais",
    description: "Apresentacoes, pecas institucionais e conteudos visuais.",
  },
];

export function CreativeAreasSection() {
  return (
    <section id="areas-criativas" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Areas criativas"
        title="O lado visual organizado em frentes claras"
        description="Cada bloco prepara uma categoria futura para projetos cadastrados manualmente."
        accent="design"
        level={2}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {creativeAreas.map((area, index) => (
          <BrutalCard key={area.title} className="bg-card">
            <span className="brutal-border inline-flex border-[#111111] bg-design px-3 py-1 text-xs font-black uppercase tracking-[0.2em] ink-on-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-2xl font-black">{area.title}</h3>
            <p className="mt-3 leading-7">{area.description}</p>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
