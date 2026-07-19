import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

const creativeAreas = [
  {
    title: "Identidade visual",
    description: "Sistemas de marca, linguagem gráfica e consistência visual.",
  },
  {
    title: "Peças gráficas",
    description: "Composições para materiais digitais, editoriais e campanhas.",
  },
  {
    title: "Interfaces e UI",
    description: "Telas, hierarquia visual e organização de experiências digitais.",
  },
  {
    title: "Social media",
    description: "Layouts, formatos e linhas visuais para conteúdo digital.",
  },
  {
    title: "Direção visual",
    description: "Referências, paleta, ritmo e personalidade de projeto.",
  },
  {
    title: "Materiais digitais",
    description: "Apresentações, peças institucionais e conteúdos visuais.",
  },
];

export function CreativeAreasSection() {
  return (
    <section id="areas-criativas" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Áreas criativas"
        title="As frentes que fazem parte do meu olhar visual"
        description="Estas são algumas áreas em que costumo trabalhar identidade visual, composição, interfaces e comunicação digital."
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
