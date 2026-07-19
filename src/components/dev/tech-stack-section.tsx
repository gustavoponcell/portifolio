import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Package,
  Server,
  Terminal,
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
    name: "Python",
    category: "Linguagem",
    context: "Aplicações desktop e web, regras de negócio, automações e geração de documentos.",
    icon: Terminal,
  },
  {
    name: "Java e C++",
    category: "Linguagens",
    context: "Modelagem de domínio, estruturas de dados e desenvolvimento orientado a objetos.",
    icon: Braces,
  },
  {
    name: "PySide6",
    category: "Desktop",
    context: "Construção de interfaces e fluxos operacionais para aplicações desktop em Python.",
    icon: Globe2,
  },
  {
    name: "Django, HTML, CSS e JavaScript",
    category: "Web",
    context: "Desenvolvimento de aplicações e páginas web com backend, estrutura, estilos e interação.",
    icon: Code2,
  },
  {
    name: "SQLite e JSON",
    category: "Dados",
    context: "Persistência local, versionamento de schema, backup e troca estruturada de dados.",
    icon: Database,
  },
  {
    name: "POO, arquitetura e padrões",
    category: "Fundamentos",
    context: "Estruturas de dados, Design Patterns, arquitetura em camadas e documentação técnica.",
    icon: Server,
  },
  {
    name: "Git e GitHub",
    category: "Versionamento",
    context: "Histórico de código, repositórios e evolução dos projetos.",
    icon: GitBranch,
  },
  {
    name: "Maven e PyInstaller",
    category: "Build e entrega",
    context: "Organização de projetos Java e empacotamento de aplicações Python para Windows.",
    icon: Package,
  },
];

export function TechStackSection() {
  return (
    <section id="stack" className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Stack e tecnologias"
        title="Ferramentas que uso para construir minhas ideias"
        description="Estas tecnologias fazem parte da minha experiência prática com aplicações desktop e web, persistência de dados, arquitetura em camadas e organização de código."
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
