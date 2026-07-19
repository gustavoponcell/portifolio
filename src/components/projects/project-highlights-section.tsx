import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import type { Project } from "@/types/project";

type ProjectHighlightsSectionProps = {
  project: Project;
};

export function ProjectHighlightsSection({ project }: ProjectHighlightsSectionProps) {
  const highlights = project.highlights ?? [];
  const accentClass =
    project.type === "design"
      ? "bg-design ink-on-accent border-[#111111]"
      : "bg-dev ink-on-accent border-[#111111]";

  if (!highlights.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Destaques"
        title="Decisões e aprendizados que levo comigo"
        accent={project.type}
        level={2}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((highlight, index) => (
          <BrutalCard key={highlight} className="space-y-4">
            <span
              className={`brutal-border inline-grid size-12 place-items-center text-lg font-black ${accentClass}`}
            >
              {index + 1}
            </span>
            <p className="text-lg font-bold leading-7">{highlight}</p>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
