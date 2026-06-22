import type { ReactNode } from "react";

import { ProjectStatusBadge } from "@/components/admin/projects/project-status-badge";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { AdminDesignProject } from "@/types/admin";

type ProjectAdminCardProps = {
  project: AdminDesignProject;
  children: ReactNode;
};

function MetaList({ label, items }: { label: string; items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <p className="text-sm font-bold">
      <span className="font-black">{label}:</span> {items.join(", ")}
    </p>
  );
}

export function ProjectAdminCard({ project, children }: ProjectAdminCardProps) {
  return (
    <BrutalCard className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black">{project.title}</h2>
          <p className="mt-1 font-bold">/{project.slug}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ProjectStatusBadge status={project.status} />
          {project.featured ? (
            <span className="brutal-border border-[#111111] bg-design px-3 py-1 text-xs font-black uppercase tracking-wide ink-on-accent">
              Destaque
            </span>
          ) : null}
        </div>
      </div>

      <p className="leading-7">{project.summary || project.description}</p>

      <div className="grid gap-2 md:grid-cols-2">
        <MetaList label="Tags" items={project.tags} />
        <MetaList label="Ferramentas" items={project.tools} />
        <p className="text-sm font-bold">
          <span className="font-black">Ordem:</span> {project.sortOrder}
        </p>
        <p className="text-sm font-bold">
          <span className="font-black">Galeria:</span> {project.gallery.length} item(ns)
        </p>
      </div>

      {children}
    </BrutalCard>
  );
}
