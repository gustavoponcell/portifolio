import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  accent?: "design" | "dev" | "neutral";
  level?: 1 | 2;
  className?: string;
};

const accentClasses = {
  design: "bg-design ink-on-accent border-[#111111]",
  dev: "bg-dev ink-on-accent border-[#111111]",
  neutral: "bg-muted text-foreground",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = "neutral",
  level = 1,
  className,
}: SectionHeadingProps) {
  const TitleTag = level === 1 ? "h1" : "h2";

  return (
    <section className={cn("space-y-4", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex brutal-border px-3 py-1 text-xs font-black uppercase tracking-[0.2em]",
            accentClasses[accent]
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className="max-w-4xl text-balance text-4xl font-black leading-none tracking-tight sm:text-6xl">
        {title}
      </TitleTag>
      {description ? (
        <p className="max-w-3xl text-lg leading-8 sm:text-xl">{description}</p>
      ) : null}
    </section>
  );
}
