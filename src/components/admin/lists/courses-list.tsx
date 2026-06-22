import {
  deleteCourseAction,
  toggleCourseVisibilityAction,
} from "@/app/admin/actions/course-actions";
import { CourseForm } from "@/components/admin/forms/course-form";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { Course } from "@/types/admin";

type CoursesListProps = {
  courses: Course[];
};

export function CoursesList({ courses }: CoursesListProps) {
  if (!courses.length) {
    return (
      <BrutalCard>
        <p className="text-lg font-bold">Nenhum curso cadastrado ainda.</p>
      </BrutalCard>
    );
  }

  return (
    <section className="space-y-5">
      {courses.map((course) => (
        <BrutalCard key={course.id} className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">{course.title}</h2>
              <p className="mt-1 font-bold">{course.institution || "Sem instituicao"}</p>
            </div>
            <span
              className={`brutal-border px-3 py-1 text-xs font-black uppercase tracking-wide ${
                course.visible ? "bg-dev ink-on-accent border-[#111111]" : "bg-muted"
              }`}
            >
              {course.visible ? "Visivel" : "Oculto"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <form action={toggleCourseVisibilityAction}>
              <input name="id" type="hidden" value={course.id} />
              <input name="visible" type="hidden" value={String(!course.visible)} />
              <BrutalButton type="submit" variant="outline">
                {course.visible ? "Ocultar" : "Mostrar"}
              </BrutalButton>
            </form>

            <form action={deleteCourseAction}>
              <input name="id" type="hidden" value={course.id} />
              <BrutalButton type="submit" variant="outline">
                Excluir
              </BrutalButton>
            </form>
          </div>

          <CourseForm course={course} title="Editar curso" />
        </BrutalCard>
      ))}
    </section>
  );
}
