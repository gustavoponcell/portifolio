import { redirect } from "next/navigation";

import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { ExperiencesList } from "@/components/admin/lists/experiences-list";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getExperiences } from "@/lib/admin/experiences";
import { requireAdmin } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

type AdminExperiencesPageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminExperiencesPage({
  searchParams,
}: AdminExperiencesPageProps) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const params = await searchParams;
  const experiencesResult = await getExperiences();

  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin / Experiencias"
        title="Gerenciar experiencias"
        description="Crie, edite, oculte ou remova experiencias. Use apenas registros reais quando for publicar."
      />

      <div className="flex flex-wrap gap-3">
        <BrutalButton href="/admin" variant="outline">
          Voltar ao admin
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

      {!experiencesResult.ok ? (
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Configuracao pendente</h2>
          <p className="leading-7">{experiencesResult.message}</p>
        </BrutalCard>
      ) : (
        <>
          <ExperienceForm />
          <ExperiencesList experiences={experiencesResult.data ?? []} />
        </>
      )}
    </div>
  );
}
