import {
  createExperienceAction,
  updateExperienceAction,
} from "@/app/admin/actions/experience-actions";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { Experience } from "@/types/admin";

type ExperienceFormProps = {
  experience?: Experience;
  title?: string;
};

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor={name}>
        {label}
      </label>
      <input
        className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none focus-visible:ring-4 focus-visible:ring-dev"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}

export function ExperienceForm({ experience, title = "Nova experiencia" }: ExperienceFormProps) {
  const action = experience ? updateExperienceAction : createExperienceAction;

  return (
    <BrutalCard className="space-y-5">
      <h2 className="text-2xl font-black">{title}</h2>

      <form action={action} className="space-y-4">
        {experience ? <input name="id" type="hidden" value={experience.id} /> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Titulo" name="title" defaultValue={experience?.title} required />
          <Field
            label="Organizacao"
            name="organization"
            defaultValue={experience?.organization}
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-black uppercase tracking-[0.18em]"
            htmlFor={`description-${experience?.id ?? "new"}`}
          >
            Descricao
          </label>
          <textarea
            className="brutal-border min-h-28 w-full bg-card px-4 py-3 font-bold leading-7 outline-none focus-visible:ring-4 focus-visible:ring-dev"
            defaultValue={experience?.description}
            id={`description-${experience?.id ?? "new"}`}
            name="description"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Field
            label="Data de inicio"
            name="startDate"
            type="date"
            defaultValue={experience?.startDate}
          />
          <Field
            label="Data de fim"
            name="endDate"
            type="date"
            defaultValue={experience?.endDate}
          />
          <Field label="Tipo" name="type" defaultValue={experience?.type ?? "general"} />
          <Field
            label="Ordem"
            name="sortOrder"
            type="number"
            defaultValue={experience?.sortOrder ?? 0}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="brutal-border bg-card px-4 py-3 font-bold">
            <input
              className="mr-2"
              defaultChecked={experience?.isCurrent}
              name="isCurrent"
              type="checkbox"
            />
            Atual
          </label>
          <label className="brutal-border bg-card px-4 py-3 font-bold">
            <input
              className="mr-2"
              defaultChecked={experience?.visible}
              name="visible"
              type="checkbox"
            />
            Visivel
          </label>
        </div>

        <BrutalButton type="submit" variant={experience ? "outline" : "dev"}>
          {experience ? "Atualizar experiencia" : "Criar experiencia"}
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
