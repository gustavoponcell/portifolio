import {
  Brush,
  FileImage,
  LayoutTemplate,
  Palette,
  PenTool,
  type LucideIcon,
} from "lucide-react";

import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

type DesignTool = {
  name: string;
  category: string;
  context: string;
  icon: LucideIcon;
};

const designTools: DesignTool[] = [
  {
    name: "Figma",
    category: "UI e protótipo",
    context: "Interfaces, fluxos e organização visual de telas.",
    icon: LayoutTemplate,
  },
  {
    name: "Photoshop",
    category: "Imagem",
    context: "Tratamento, composição, recortes e peças visuais digitais.",
    icon: FileImage,
  },
  {
    name: "Illustrator",
    category: "Vetor",
    context: "Marcas, ícones, lettering, formas vetoriais e identidade visual.",
    icon: PenTool,
  },
  {
    name: "Canva",
    category: "Peças rápidas",
    context: "Posts, apresentações e variações gráficas para comunicação.",
    icon: Brush,
  },
  {
    name: "Direção visual",
    category: "Processo",
    context: "Paleta, contraste, hierarquia, moodboard e linguagem gráfica.",
    icon: Palette,
  },
];

export function DesignToolsSection() {
  return (
    <section id="ferramentas-design" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Ferramentas de design"
        title="Programas e práticas presentes no processo visual"
        description="Ferramentas usadas para criar interfaces, imagens, vetores, composições e direções criativas."
        accent="design"
        level={2}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {designTools.map((tool) => {
          const Icon = tool.icon;

          return (
            <BrutalCard key={tool.name} className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <span className="brutal-border grid h-14 w-14 place-items-center border-[#111111] bg-design !text-[#111111]">
                  <Icon aria-hidden="true" size={28} strokeWidth={3} />
                </span>
                <span className="brutal-border border-[#111111] bg-design px-2 py-1 text-xs font-black uppercase tracking-wide !text-[#111111]">
                  {tool.category}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black">{tool.name}</h3>
                <p className="mt-3 leading-7">{tool.context}</p>
              </div>
            </BrutalCard>
          );
        })}
      </div>
    </section>
  );
}
