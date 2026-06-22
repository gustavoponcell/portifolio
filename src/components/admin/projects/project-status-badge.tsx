import type { AdminProjectStatus } from "@/types/admin";

const labels: Record<AdminProjectStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
  mock: "Mock",
};

const classes: Record<AdminProjectStatus, string> = {
  draft: "bg-muted",
  published: "bg-dev ink-on-accent border-[#111111]",
  archived: "bg-card",
  mock: "bg-design ink-on-accent border-[#111111]",
};

export function ProjectStatusBadge({ status }: { status: AdminProjectStatus }) {
  return (
    <span
      className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${classes[status]}`}
    >
      {labels[status]}
    </span>
  );
}
