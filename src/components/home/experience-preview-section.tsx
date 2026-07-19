import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import type { PublicExperience } from "@/lib/public-experiences";

const areas = [
  "Design gráfico",
  "UI e interfaces",
  "Desenvolvimento front-end",
  "Sistemas web",
  "Organização de projetos digitais",
  "Identidade visual",
];

type ExperiencePreviewSectionProps = {
  experiences: PublicExperience[];
};

function formatExperiencePeriod(experience: PublicExperience) {
  if (experience.isCurrent) {
    return experience.startDate ? `Desde ${experience.startDate}` : "Atual";
  }

  if (experience.startDate && experience.endDate) {
    return `${experience.startDate} - ${experience.endDate}`;
  }

  if (experience.startDate) {
    return experience.startDate;
  }

  return "";
}

export function ExperiencePreviewSection({
  experiences,
}: ExperiencePreviewSectionProps) {
  const hasExperiences = experiences.length > 0;

  return (
    <section className="brutal-section space-y-8">
      <SectionHeading
        eyebrow={hasExperiences ? "Experiências" : "Áreas de atuação"}
        title={
          hasExperiences
            ? "Experiências que construíram meu repertório"
            : "Áreas que fazem parte do meu trabalho"
        }
        description={
          hasExperiences
            ? "Passei por experiências que me aproximaram de criação visual, organização de demandas, comunicação e projetos digitais. Cada uma ajudou a formar meu jeito de trabalhar: visual, prático e atento aos detalhes."
            : "Estas frentes resumem como eu conecto criação visual, interfaces, sistemas e organização de projetos digitais."
        }
        level={2}
      />

      {hasExperiences ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {experiences.map((experience) => {
            const period = formatExperiencePeriod(experience);

            return (
              <BrutalCard key={experience.id} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.2em]">
                    {experience.type}
                  </p>
                  {period ? (
                    <span className="brutal-border bg-muted px-2 py-1 text-xs font-black uppercase tracking-wide">
                      {period}
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-2xl font-black">{experience.title}</h3>
                  {experience.organization ? (
                    <p className="mt-1 font-bold muted-copy">
                      {experience.organization}
                    </p>
                  ) : null}
                </div>

                {experience.description ? (
                  <p className="leading-7">{experience.description}</p>
                ) : null}
              </BrutalCard>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <BrutalCard
              key={area}
              className={index % 2 === 0 ? "bg-card" : "bg-muted"}
            >
              <p className="text-sm font-black uppercase tracking-[0.2em]">
                Área {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-black">{area}</h3>
            </BrutalCard>
          ))}
        </div>
      )}
    </section>
  );
}
