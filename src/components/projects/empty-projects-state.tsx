import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";

type EmptyProjectsStateProps = {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
};

export function EmptyProjectsState({
  title,
  description,
  href = "/contato",
  actionLabel = "Conhecer outras áreas",
}: EmptyProjectsStateProps) {
  return (
    <BrutalCard className="space-y-5 bg-card">
      <div>
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-3 max-w-3xl leading-7">{description}</p>
      </div>
      <BrutalButton href={href} variant="outline">
        {actionLabel}
      </BrutalButton>
    </BrutalCard>
  );
}
