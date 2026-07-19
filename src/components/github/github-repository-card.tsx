import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepository, GitHubRepositoryWithCuration } from "@/types/github";

type GitHubRepositoryCardProps = {
  repository: GitHubRepository | GitHubRepositoryWithCuration;
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data indisponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function isExternalUrl(value: string) {
  return value.startsWith("https://github.com/");
}

export function GitHubRepositoryCard({
  repository,
}: GitHubRepositoryCardProps) {
  const displayTitle =
    "displayTitle" in repository ? repository.displayTitle : repository.name;
  const displayDescription =
    "displayDescription" in repository
      ? repository.displayDescription
      : repository.description ?? "Repositório em desenvolvimento.";
  const displayTags =
    "displayTags" in repository ? repository.displayTags : repository.topics;
  const featured = "featured" in repository ? repository.featured : false;
  const topics = displayTags.slice(0, 4);
  const hasRealUrl = isExternalUrl(repository.htmlUrl);

  return (
    <BrutalCard className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em]">
            Repositório
          </p>
          <h3 className="mt-2 break-words text-2xl font-black">
            {displayTitle}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {repository.language ? (
            <Badge
              variant="outline"
              className="border-2 border-[#111111] bg-dev font-bold !text-[#111111]"
            >
              {repository.language}
            </Badge>
          ) : null}
          {featured ? (
            <Badge
              variant="outline"
              className="border-2 border-[#111111] bg-design font-bold !text-[#111111]"
            >
              Destaque
            </Badge>
          ) : null}
        </div>
      </div>

      <p className="leading-7">{displayDescription}</p>

      <div className="grid grid-cols-2 gap-3 text-sm font-bold">
        <span className="brutal-border bg-muted px-3 py-2">
          Stars: {repository.stargazersCount}
        </span>
        <span className="brutal-border bg-muted px-3 py-2">
          Forks: {repository.forksCount}
        </span>
      </div>

      <p className="text-sm font-bold">
        Atualizado em {formatDate(repository.updatedAt)}
      </p>

      {topics.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="border-2 border-[#111111] bg-dev font-bold !text-[#111111]"
            >
              {topic}
            </Badge>
          ))}
        </div>
      ) : null}

      {hasRealUrl ? (
        <BrutalButton
          href={repository.htmlUrl}
          variant="outline"
          className="mt-auto self-start"
          target="_blank"
          rel="noreferrer"
        >
          Ver repositório
        </BrutalButton>
      ) : (
        <span className="brutal-border mt-auto inline-flex w-fit bg-muted px-3 py-2 text-sm font-black uppercase tracking-wide">
          Link indisponível no momento
        </span>
      )}
    </BrutalCard>
  );
}
