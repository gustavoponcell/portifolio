import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { SectionHeading } from "@/components/brand/section-heading";

const identityColumns = [
  {
    title: "Design",
    mode: "design" as const,
    className: "bg-design",
    items: [
      "Identidade visual",
      "Peças gráficas",
      "Interfaces",
      "Projetos visuais",
      "Campanhas e materiais digitais",
    ],
  },
  {
    title: "Dev",
    mode: "dev" as const,
    className: "bg-dev",
    items: [
      "Desenvolvimento web",
      "Projetos em Next.js/TypeScript",
      "Integrações",
      "Repositórios selecionados",
      "Sistemas e produtos digitais",
    ],
  },
];

const modeCards = [
  {
    title: "Modo Design",
    mode: "design" as const,
    href: "/design",
    buttonLabel: "Entrar no Design",
    className: "bg-design",
    description:
      "Trabalhos visuais, direção criativa, interfaces e projetos com foco em clareza, consistência e personalidade.",
    items: ["Artes e peças visuais", "Projetos em destaque", "Identidade e comunicação"],
  },
  {
    title: "Modo Dev",
    mode: "dev" as const,
    href: "/dev",
    buttonLabel: "Entrar no Dev",
    className: "bg-dev",
    description:
      "Projetos de programação, tecnologias, sistemas web e soluções digitais organizadas para uso real.",
    items: ["Projetos web", "Tecnologias usadas", "Repositórios selecionados"],
  },
];

export function ModeCardsSection() {
  return (
    <section id="modos" className="brutal-section space-y-10">
      <SectionHeading
        eyebrow="Modos do portfólio"
        title="Design + Desenvolvimento"
        description="Conheça as duas frentes de atuação de Gustavo Poncell: design visual e desenvolvimento de soluções digitais."
        level={2}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {identityColumns.map((column) => (
          <BrutalCard
            key={column.title}
            className={`${column.className} brutal-card-accent ink-on-accent`}
          >
            <ModeBadge
              mode={column.mode}
              className="border-[#111111] bg-[#f7f3e8] !text-[#111111]"
            />
            <h2 className="mt-4 text-3xl font-black">{column.title}</h2>
            <ul className="mt-5 grid gap-2">
              {column.items.map((item) => (
                <li key={item} className="surface-on-accent px-3 py-2 font-bold">
                  {item}
                </li>
              ))}
            </ul>
          </BrutalCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {modeCards.map((card) => (
          <BrutalCard key={card.title} className="flex flex-col gap-6">
            <div>
              <ModeBadge mode={card.mode} />
              <h2 className="mt-4 text-4xl font-black">{card.title}</h2>
              <p className="mt-4 text-lg leading-8">{card.description}</p>
            </div>
            <ul className="grid gap-2">
              {card.items.map((item) => (
                <li key={item} className="border-l-4 border-foreground pl-3 font-bold">
                  {item}
                </li>
              ))}
            </ul>
            <BrutalButton
              href={card.href}
              variant={card.mode}
              className="mt-auto self-start"
            >
              {card.buttonLabel}
            </BrutalButton>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
