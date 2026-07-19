import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/admin/forms/profile-form";
import { StorageStatusCard } from "@/components/admin/media/storage-status-card";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { requireAdmin } from "@/lib/auth/admin";
import { getProfile } from "@/lib/admin/profile";
import { noIndexMetadata } from "@/lib/seo/metadata";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

type AdminProfilePageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminProfilePage({ searchParams }: AdminProfilePageProps) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const params = await searchParams;
  const profileResult = await getProfile();

  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin / Perfil"
        title="Editar perfil público"
        description="Gerencie as informações base do portfólio. O avatar pode ser uma URL textual ou uma imagem enviada ao Supabase Storage."
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

      <StorageStatusCard configured={hasSupabaseAdminEnv()} />

      {!profileResult.ok ? (
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Configuração pendente</h2>
          <p className="leading-7">{profileResult.message}</p>
        </BrutalCard>
      ) : (
        <ProfileForm profile={profileResult.data ?? null} />
      )}
    </div>
  );
}
