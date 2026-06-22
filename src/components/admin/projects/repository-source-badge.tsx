import type { GitHubRepositoryWithCuration } from "@/types/github";

const labels: Record<GitHubRepositoryWithCuration["displaySource"], string> = {
  github: "GitHub",
  fallback: "Fallback",
  supabase: "Supabase",
  mixed: "Fallback + Supabase",
};

const classes: Record<GitHubRepositoryWithCuration["displaySource"], string> = {
  github: "bg-dev ink-on-accent border-[#111111]",
  fallback: "bg-muted",
  supabase: "bg-card",
  mixed: "bg-design ink-on-accent border-[#111111]",
};

export function RepositorySourceBadge({
  source,
}: {
  source: GitHubRepositoryWithCuration["displaySource"];
}) {
  return (
    <span
      className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${classes[source]}`}
    >
      {labels[source]}
    </span>
  );
}
