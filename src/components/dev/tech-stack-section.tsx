import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Server,
  Terminal,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";

type StackItem = {
  name: string;
  category: string;
  context: string;
  icon: LucideIcon;
};

const stackItems: StackItem[] = [
  {
    name: "HTML, CSS e JavaScript",
    category: "Base web",
    context: "Estrutura, estilos, interação e construção de páginas responsivas.",
    icon: Code2,
  },
  {
    name: "TypeScript",
    category: "Código",
    context: "Tipagem, contratos de dados e interfaces mais previsíveis.",
    icon: Braces,
  },
  {
    name: "React",
    category: "Interface",
    context: "Organização de telas, estados e experiências reutilizáveis.",
    icon: Globe2,
  },
  {
    name: "Next.js",
    category: "Front-end",
    context: "Estrutura de páginas, performance, SEO e renderização do portfólio.",
    icon: Terminal,
  },
  {
    name: "Tailwind CSS",
    category: "Estilo",
    context: "Tokens visuais, responsividade e consistência da interface.",
    icon: Wind,
  },
  {
    name: "Banco e autenticação",
    category: "Back-end",
    context: "Estrutura para login, armazenamento de imagens e dados do portfólio.",
    icon: Database,
  },
  {
    name: "Git e GitHub",
    category: "Versionamento",
    context: "Histórico de código, repositórios e evolução dos projetos.",
    icon: GitBranch,
  },
  {
    name: "Serviços e servidor",
    category: "Conexões",
    context: "Consumo de serviços, regras de negócio e conexões entre sistemas.",
    icon: Server,
  },
];

export function TechStackSection() {
  return (
    <section id="stack" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Stack e tecnologias"
        title="Tecnologias usadas para construir interfaces e sistemas"
        description="Ferramentas e práticas presentes em projetos web, produtos digitais e organização de código."
        accent="dev"
        level={2}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stackItems.map((item) => {
          const Icon = item.icon;

          return (
            <BrutalCard key={item.name} className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <span className="brutal-border grid h-14 w-14 place-items-center border-[#111111] bg-dev !text-[#111111]">
                  <Icon aria-hidden="true" size={28} strokeWidth={3} />
                </span>
                <span className="brutal-border border-[#111111] bg-dev px-2 py-1 text-xs font-black uppercase tracking-wide !text-[#111111]">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black">{item.name}</h3>
                <p className="mt-3 leading-7">{item.context}</p>
              </div>
            </BrutalCard>
          );
        })}
      </div>
    </section>
  );
}
