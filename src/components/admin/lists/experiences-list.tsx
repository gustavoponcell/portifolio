import {
  deleteExperienceAction,
  toggleExperienceVisibilityAction,
} from "@/app/admin/actions/experience-actions";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { Experience } from "@/types/admin";

type ExperiencesListProps = {
  experiences: Experience[];
};

export function ExperiencesList({ experiences }: ExperiencesListProps) {
  if (!experiences.length) {
    return (
      <BrutalCard>
        <p className="text-lg font-bold">Nenhuma experiencia cadastrada ainda.</p>
      </BrutalCard>
    );
  }

  return (
    <section className="space-y-5">
      {experiences.map((experience) => (
        <BrutalCard key={experience.id} className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">{experience.title}</h2>
              <p className="mt-1 font-bold">{experience.organization || "Sem organizacao"}</p>
            </div>
            <span
              className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                experience.visible
                  ? "bg-dev ink-on-accent border-[#111111]"
                  : "bg-muted"
              }`}
            >
              {experience.visible ? "Visivel" : "Oculta"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <form action={toggleExperienceVisibilityAction}>
              <input name="id" type="hidden" value={experience.id} />
              <input
                name="visible"
                type="hidden"
                value={String(!experience.visible)}
              />
              <BrutalButton type="submit" variant="outline">
                {experience.visible ? "Ocultar" : "Mostrar"}
              </BrutalButton>
            </form>

            <form action={deleteExperienceAction}>
              <input name="id" type="hidden" value={experience.id} />
              <BrutalButton type="submit" variant="outline">
                Excluir
              </BrutalButton>
            </form>
          </div>

          <ExperienceForm experience={experience} title="Editar experiencia" />
        </BrutalCard>
      ))}
    </section>
  );
}
