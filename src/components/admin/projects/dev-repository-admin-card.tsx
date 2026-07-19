import { RepositorySourceBadge } from "@/components/admin/projects/repository-source-badge";
import { BrutalCard } from "@/components/brand/brutal-card";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepositoryWithCuration } from "@/types/github";

type DevRepositoryAdminCardProps = {
  repository: GitHubRepositoryWithCuration;
  children: React.ReactNode;
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data indisponivel";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function DevRepositoryAdminCard({
  repository,
  children,
}: DevRepositoryAdminCardProps) {
  return (
    <BrutalCard className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em]">
            {repository.fullName}
          </p>
          <h2 className="mt-2 break-words text-2xl font-black">
            {repository.displayTitle}
          </h2>
          <p className="mt-1 font-bold">Repositório base: {repository.name}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <RepositorySourceBadge source={repository.displaySource} />
          <span
            className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${
              repository.isConfigured
                ? "bg-dev ink-on-accent border-[#111111]"
                : "bg-muted"
            }`}
          >
            {repository.isConfigured ? "Configurado" : "Não configurado"}
          </span>
          <span
            className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${
              repository.visible ? "bg-dev ink-on-accent border-[#111111]" : "bg-muted"
            }`}
          >
            {repository.visible ? "Visível" : "Oculto"}
          </span>
          {repository.featured ? (
            <span className="brutal-border border-[#111111] bg-design px-3 py-1 text-xs font-black uppercase tracking-wide ink-on-accent">
              Destaque
            </span>
          ) : null}
        </div>
      </div>

      <p className="leading-7">{repository.displayDescription}</p>

      <div className="grid gap-3 text-sm font-bold md:grid-cols-4">
        <span className="brutal-border bg-muted px-3 py-2">
          Linguagem: {repository.language ?? "N/A"}
        </span>
        <span className="brutal-border bg-muted px-3 py-2">
          Stars: {repository.stargazersCount}
        </span>
        <span className="brutal-border bg-muted px-3 py-2">
          Forks: {repository.forksCount}
        </span>
        <span className="brutal-border bg-muted px-3 py-2">
          Atualizado: {formatDate(repository.updatedAt)}
        </span>
      </div>

      {repository.topics.length ? (
        <div className="flex flex-wrap gap-2">
          {repository.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="border-2 font-bold">
              {topic}
            </Badge>
          ))}
        </div>
      ) : null}

      {repository.isConfigured ? (
        <div className="grid gap-2 md:grid-cols-2">
          <p className="text-sm font-bold">
            <span className="font-black">Tags curadas:</span>{" "}
            {repository.displayTags.join(", ") || "Nenhuma"}
          </p>
          <p className="text-sm font-bold">
            <span className="font-black">Ferramentas curadas:</span>{" "}
            {repository.displayTools.join(", ") || "Nenhuma"}
          </p>
          <p className="text-sm font-bold">
            <span className="font-black">Status:</span> {repository.displayStatus}
          </p>
          <p className="text-sm font-bold">
            <span className="font-black">Ordem:</span> {repository.sortOrder}
          </p>
        </div>
      ) : null}

      {children}
    </BrutalCard>
  );
}
