import { createCourseAction, updateCourseAction } from "@/app/admin/actions/course-actions";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { Course } from "@/types/admin";

type CourseFormProps = {
  course?: Course;
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

export function CourseForm({ course, title = "Novo curso" }: CourseFormProps) {
  const action = course ? updateCourseAction : createCourseAction;

  return (
    <BrutalCard className="space-y-5">
      <h2 className="text-2xl font-black">{title}</h2>

      <form action={action} className="space-y-4">
        {course ? <input name="id" type="hidden" value={course.id} /> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Titulo" name="title" defaultValue={course?.title} required />
          <Field label="Instituicao" name="institution" defaultValue={course?.institution} />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-black uppercase tracking-[0.18em]"
            htmlFor={`course-description-${course?.id ?? "new"}`}
          >
            Descricao
          </label>
          <textarea
            className="brutal-border min-h-28 w-full bg-card px-4 py-3 font-bold leading-7 outline-none focus-visible:ring-4 focus-visible:ring-dev"
            defaultValue={course?.description}
            id={`course-description-${course?.id ?? "new"}`}
            name="description"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Ano" name="year" defaultValue={course?.year} />
          <Field
            label="URL do certificado"
            name="certificateUrl"
            defaultValue={course?.certificateUrl}
          />
          <Field
            label="Ordem"
            name="sortOrder"
            type="number"
            defaultValue={course?.sortOrder ?? 0}
          />
        </div>

        <label className="brutal-border inline-flex bg-card px-4 py-3 font-bold">
          <input
            className="mr-2"
            defaultChecked={course?.visible}
            name="visible"
            type="checkbox"
          />
          Visivel
        </label>

        <BrutalButton type="submit" variant={course ? "outline" : "dev"}>
          {course ? "Atualizar curso" : "Criar curso"}
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
