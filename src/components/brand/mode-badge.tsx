import { cn } from "@/lib/utils";

type ModeBadgeMode = "design" | "dev" | "hybrid";

type ModeBadgeProps = {
  mode: ModeBadgeMode;
  className?: string;
};

const modeConfig: Record<ModeBadgeMode, { label: string; className: string }> = {
  design: {
    label: "Design",
    className: "bg-design ink-on-accent border-[#111111]",
  },
  dev: {
    label: "Dev",
    className: "bg-dev ink-on-accent border-[#111111]",
  },
  hybrid: {
    label: "Design + Dev",
    className: "bg-card",
  },
};

export function ModeBadge({ mode, className }: ModeBadgeProps) {
  const config = modeConfig[mode];

  return (
    <span
      className={cn(
        "brutal-border inline-flex w-fit items-center px-3 py-1 text-xs font-black uppercase tracking-[0.18em]",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
