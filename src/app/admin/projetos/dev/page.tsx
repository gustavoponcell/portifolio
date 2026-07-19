import { redirect } from "next/navigation";

import { DevCurationList } from "@/components/admin/projects/dev-curation-list";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getGitHubRepositoriesForAdmin } from "@/lib/admin/dev-curation";
import { requireAdmin } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

type AdminDevProjectsPageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminDevProjectsPage({
  searchParams,
}: AdminDevProjectsPageProps) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const params = await searchParams;
  const repositoriesResult = await getGitHubRepositoriesForAdmin();

  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin / Projetos / Dev"
        title="Curadoria de projetos Dev"
        description="Controle quais repositórios aparecem no modo Dev, personalize textos, tags, ferramentas, ordem, visibilidade e destaque. Nada aqui altera o GitHub real."
      />

      <div className="flex flex-wrap gap-3">
        <BrutalButton href="/admin" variant="outline">
          Voltar ao admin
        </BrutalButton>
        <BrutalButton href="/dev" variant="dev">
          Ver modo Dev público
        </BrutalButton>
      </div>

      {params.message ? (
        <BrutalCard
          className={
            params.type === "success"
              ? "bg-dev brutal-card-accent ink-on-accent"
              : "bg-design brutal-card-accent ink-on-accent"
          }
        >
          <p className="font-black">{params.message}</p>
        </BrutalCard>
      ) : null}

      {!repositoriesResult.ok ? (
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Configuração pendente</h2>
          <p className="leading-7">{repositoriesResult.message}</p>
        </BrutalCard>
      ) : (
        <>
          {repositoriesResult.data?.error ? (
            <BrutalCard className="bg-muted">
              <p className="font-bold">Observação: {repositoriesResult.data.error}</p>
            </BrutalCard>
          ) : null}

          <DevCurationList
            repositories={repositoriesResult.data?.repositories ?? []}
            source={repositoriesResult.data?.source ?? "fallback"}
          />
        </>
      )}
    </div>
  );
}
