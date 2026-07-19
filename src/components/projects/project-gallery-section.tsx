import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { ResponsiveImage } from "@/components/media/responsive-image";
import type { Project } from "@/types/project";

type ProjectGallerySectionProps = {
  project: Project;
};

export function ProjectGallerySection({ project }: ProjectGallerySectionProps) {
  const gallery = project.gallery ?? [];
  const accentClass =
    project.type === "design"
      ? "bg-design ink-on-accent border-[#111111]"
      : "bg-dev ink-on-accent border-[#111111]";

  if (!gallery.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Galeria"
        title="Materiais que ajudam a contar o projeto"
        description="Organizei estes registros para mostrar melhor o contexto, a linguagem e as aplicações que explorei."
        accent={project.type}
        level={2}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {gallery.map((item, index) => (
          <BrutalCard key={item.id} className="space-y-4">
            {item.imageUrl ? (
              <ResponsiveImage
                alt={item.title}
                className="aspect-[4/3] w-full brutal-border object-cover"
                src={item.imageUrl}
              />
            ) : (
              <div
                className={`brutal-border grid aspect-[4/3] place-items-center p-6 text-center ${accentClass}`}
              >
                <div>
                  <p className="font-mono text-sm font-black uppercase tracking-[0.2em]">
                    Material {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-3xl font-black leading-none">{item.title}</p>
                </div>
              </div>
            )}
            <div>
              <h3 className="text-2xl font-black">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 leading-7">{item.description}</p>
              ) : null}
            </div>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}
