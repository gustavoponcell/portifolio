import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailsSidebar } from "@/components/projects/project-details-sidebar";
import { ProjectGallerySection } from "@/components/projects/project-gallery-section";
import { ProjectHeroSection } from "@/components/projects/project-hero-section";
import { ProjectHighlightsSection } from "@/components/projects/project-highlights-section";
import { ProjectLinksSection } from "@/components/projects/project-links-section";
import { ProjectOverviewSection } from "@/components/projects/project-overview-section";
import { RelatedProjectsSection } from "@/components/projects/related-projects-section";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { createPageMetadata, createProjectMetadata } from "@/lib/seo/metadata";
import { createProjectJsonLd } from "@/lib/seo/structured-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: "Projeto não encontrado",
      description: "Projeto não encontrado no portfólio.",
      path: `/projetos/${slug}`,
      noIndex: true,
    });
  }

  return createProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project, 3);
  const jsonLd = createProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectHeroSection project={project} />

      <section className="brutal-section grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <ProjectOverviewSection project={project} />
          <ProjectHighlightsSection project={project} />
          <ProjectGallerySection project={project} />
          <ProjectLinksSection project={project} />
        </div>

        <ProjectDetailsSidebar project={project} />
      </section>

      <RelatedProjectsSection projects={relatedProjects} />
    </>
  );
}
