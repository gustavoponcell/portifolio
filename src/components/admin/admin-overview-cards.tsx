import { BrutalCard } from "@/components/brand/brutal-card";
import { BrutalButton } from "@/components/brand/brutal-button";

const adminSections = [
  {
    title: "Perfil",
    status: "Funcional",
    href: "/admin/perfil",
    description: "Editar dados públicos, links textuais e avatar por upload.",
  },
  {
    title: "Experiências",
    status: "Funcional",
    href: "/admin/experiencias",
    description: "Criar, editar, ocultar e excluir experiências.",
  },
  {
    title: "Cursos e certificados",
    status: "Funcional",
    href: "/admin/cursos",
    description: "Gerenciar cursos e URL textual de certificado.",
  },
  {
    title: "Projetos Design",
    status: "Funcional",
    href: "/admin/projetos/design",
    description: "Criar, editar, publicar, destacar e enviar capa/galeria.",
  },
  {
    title: "Projetos Dev",
    status: "Funcional",
    href: "/admin/projetos/dev",
    description: "Curadoria GitHub para ocultar, destacar e personalizar repositórios.",
  },
  {
    title: "Upload de imagens",
    status: "Funcional",
    href: "/api/admin/storage/health",
    description: "Diagnóstico seguro do bucket portfolio-media no Supabase Storage.",
  },
  {
    title: "Behance real",
    status: "Pendente",
    description: "Integração real não existe; Design usa links curados manualmente.",
  },
];

export function AdminOverviewCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {adminSections.map((section, index) => (
        <BrutalCard key={section.title} className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-2xl font-black">{section.title}</h3>
            <span
              className={`brutal-border px-2 py-1 text-xs font-black uppercase tracking-wide ${
                section.status === "Funcional"
                  ? "bg-dev ink-on-accent border-[#111111]"
                  : index % 2 === 0
                    ? "bg-design ink-on-accent border-[#111111]"
                    : "bg-muted"
              }`}
            >
              {section.status}
            </span>
          </div>
          <p className="leading-7">{section.description}</p>
          {section.href ? (
            <BrutalButton href={section.href} variant="outline" className="mt-auto self-start">
              Abrir área
            </BrutalButton>
          ) : null}
        </BrutalCard>
      ))}
    </section>
  );
}
