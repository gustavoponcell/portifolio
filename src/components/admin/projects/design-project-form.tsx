import {
  createDesignProjectAction,
  updateDesignProjectAction,
} from "@/app/admin/actions/design-project-actions";
import {
  uploadDesignProjectCoverAction,
  uploadDesignProjectGalleryImageAction,
} from "@/app/admin/actions/media-actions";
import { ImagePreviewCard } from "@/components/admin/media/image-preview-card";
import { ImageUploadField } from "@/components/admin/media/image-upload-field";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type { AdminDesignProject } from "@/types/admin";

type DesignProjectFormProps = {
  project?: AdminDesignProject;
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
        className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none focus-visible:ring-4 focus-visible:ring-design"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  hint,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="brutal-border min-h-28 w-full bg-card px-4 py-3 font-bold leading-7 outline-none focus-visible:ring-4 focus-visible:ring-design"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required={required}
      />
      {hint ? <p className="text-sm font-bold leading-6 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function galleryValue(project?: AdminDesignProject) {
  return project?.gallery
    .map((item) => [item.title, item.description, item.imageUrl].filter(Boolean).join(" | "))
    .join("\n");
}

export function DesignProjectForm({
  project,
  title = "Novo projeto Design",
}: DesignProjectFormProps) {
  const action = project ? updateDesignProjectAction : createDesignProjectAction;

  return (
    <BrutalCard className="space-y-5">
      <h2 className="text-2xl font-black">{title}</h2>

      <form action={action} className="space-y-5">
        {project ? (
          <>
            <input name="id" type="hidden" value={project.id} />
            <input name="previousSlug" type="hidden" value={project.slug} />
          </>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Titulo" name="title" defaultValue={project?.title} required />
          <Field label="Slug" name="slug" defaultValue={project?.slug} />
        </div>

        <TextArea
          label="Descricao"
          name="description"
          defaultValue={project?.description}
          required
        />
        <TextArea label="Resumo" name="summary" defaultValue={project?.summary} />

        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor="status">
              Status
            </label>
            <select
              className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none focus-visible:ring-4 focus-visible:ring-design"
              defaultValue={project?.status ?? "draft"}
              id="status"
              name="status"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
              <option value="mock">Mock</option>
            </select>
          </div>
          <Field label="Ano" name="year" defaultValue={project?.year} />
          <Field label="Papel" name="role" defaultValue={project?.role} />
          <Field
            label="Ordem"
            name="sortOrder"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="URL de capa textual" name="coverUrl" defaultValue={project?.coverUrl} />
          <Field
            label="Link externo / Behance"
            name="externalUrl"
            defaultValue={project?.externalUrl}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextArea
            label="Tags"
            name="tags"
            defaultValue={project?.tags.join(", ")}
            hint="Separe por virgulas."
          />
          <TextArea
            label="Ferramentas"
            name="tools"
            defaultValue={project?.tools.join(", ")}
            hint="Separe por virgulas."
          />
        </div>

        <TextArea
          label="Destaques"
          name="highlights"
          defaultValue={project?.highlights.map((item) => item.content).join("\n")}
          hint="Um destaque por linha."
        />

        <TextArea
          label="Galeria placeholder"
          name="gallery"
          defaultValue={galleryValue(project)}
          hint="Um item por linha no formato: Titulo | Descricao | URL opcional. Upload real fica para depois."
        />

        <label className="brutal-border inline-flex bg-card px-4 py-3 font-bold">
          <input
            className="mr-2"
            defaultChecked={project?.featured}
            name="featured"
            type="checkbox"
          />
          Destacar projeto
        </label>

        <BrutalButton type="submit" variant={project ? "outline" : "design"}>
          {project ? "Atualizar projeto Design" : "Criar projeto Design"}
        </BrutalButton>
      </form>

      {project ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-4">
            <ImagePreviewCard
              alt={`Capa atual do projeto ${project.title}`}
              imageUrl={project.coverUrl}
              title="Capa atual"
            />

            <div className="brutal-border space-y-4 bg-card p-4">
              <h3 className="text-xl font-black">Enviar nova capa</h3>
              <form action={uploadDesignProjectCoverAction} className="space-y-4">
                <input name="projectId" type="hidden" value={project.id} />
                <input name="projectSlug" type="hidden" value={project.slug} />
                <ImageUploadField
                  helpText="A imagem enviada substitui a URL de capa do projeto."
                  label="Imagem de capa"
                />
                <BrutalButton type="submit" variant="design">
                  Enviar capa
                </BrutalButton>
              </form>
            </div>
          </div>

          <div className="brutal-border space-y-4 bg-card p-4">
            <h3 className="text-xl font-black">Adicionar imagem na galeria</h3>
            <form action={uploadDesignProjectGalleryImageAction} className="space-y-4">
              <input name="projectId" type="hidden" value={project.id} />
              <input name="projectSlug" type="hidden" value={project.slug} />
              <Field label="Titulo da imagem" name="galleryTitle" required />
              <TextArea label="Descricao da imagem" name="galleryDescription" />
              <ImageUploadField
                helpText="Cria um novo item de galeria com URL publica do Storage."
                label="Imagem da galeria"
              />
              <BrutalButton type="submit" variant="design">
                Enviar para galeria
              </BrutalButton>
            </form>

            {project.gallery.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {project.gallery.map((item) => (
                  <ImagePreviewCard
                    alt={item.title}
                    caption={item.title}
                    imageUrl={item.imageUrl}
                    key={item.id}
                    title="Item de galeria"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="brutal-border bg-muted p-4">
          <p className="font-bold leading-7">
            Salve o projeto uma vez para liberar upload de capa e imagens de galeria.
          </p>
        </div>
      )}
    </BrutalCard>
  );
}
