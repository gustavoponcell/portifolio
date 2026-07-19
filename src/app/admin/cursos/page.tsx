import { redirect } from "next/navigation";

import { CourseForm } from "@/components/admin/forms/course-form";
import { CoursesList } from "@/components/admin/lists/courses-list";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getCourses } from "@/lib/admin/courses";
import { requireAdmin } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

type AdminCoursesPageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminCoursesPage({ searchParams }: AdminCoursesPageProps) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const params = await searchParams;
  const coursesResult = await getCourses();

  return (
    <div className="brutal-section space-y-8">
      <SectionHeading
        eyebrow="Admin / Cursos"
        title="Gerenciar cursos e certificados"
        description="Cadastre cursos e uma URL textual de certificado. Upload real de arquivo fica para a etapa de Storage."
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

      {!coursesResult.ok ? (
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Configuração pendente</h2>
          <p className="leading-7">{coursesResult.message}</p>
        </BrutalCard>
      ) : (
        <>
          <CourseForm />
          <CoursesList courses={coursesResult.data ?? []} />
        </>
      )}
    </div>
  );
}
