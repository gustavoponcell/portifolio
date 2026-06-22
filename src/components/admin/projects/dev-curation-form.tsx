import { upsertDevRepositoryCurationAction } from "@/app/admin/actions/dev-curation-actions";
import { BrutalButton } from "@/components/brand/brutal-button";
import type { GitHubRepositoryWithCuration } from "@/types/github";

type DevCurationFormProps = {
  repository: GitHubRepositoryWithCuration;
};

function Field({
  label,
  name,
  defaultValue,
  readonly = false,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  readonly?: boolean;
  type?: string;
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
        readOnly={readonly}
        type={type}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="brutal-border min-h-24 w-full bg-card px-4 py-3 font-bold leading-7 outline-none focus-visible:ring-4 focus-visible:ring-dev"
        defaultValue={defaultValue}
        id={name}
        name={name}
      />
    </div>
  );
}

export function DevCurationForm({ repository }: DevCurationFormProps) {
  return (
    <form action={upsertDevRepositoryCurationAction} className="space-y-5">
      <Field label="Repositorio" name="repositoryName" defaultValue={repository.name} readonly />

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Titulo customizado"
          name="customTitle"
          defaultValue={repository.curation?.customTitle}
        />
        <Field
          label="Ordem"
          name="sortOrder"
          defaultValue={repository.curation?.sortOrder ?? 0}
          type="number"
        />
      </div>

      <TextArea
        label="Descricao customizada"
        name="customDescription"
        defaultValue={repository.curation?.customDescription}
      />
      <TextArea
        label="Resumo customizado"
        name="customSummary"
        defaultValue={repository.curation?.customSummary}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea
          label="Tags customizadas"
          name="customTags"
          defaultValue={repository.curation?.customTags.join(", ")}
        />
        <TextArea
          label="Ferramentas customizadas"
          name="customTools"
          defaultValue={repository.curation?.customTools.join(", ")}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label
            className="text-sm font-black uppercase tracking-[0.18em]"
            htmlFor={`customStatus-${repository.name}`}
          >
            Status
          </label>
          <select
            className="brutal-border w-full bg-card px-4 py-3 font-bold outline-none focus-visible:ring-4 focus-visible:ring-dev"
            defaultValue={repository.curation?.customStatus ?? "published"}
            id={`customStatus-${repository.name}`}
            name="customStatus"
          >
            <option value="published">Publicado</option>
            <option value="draft">Rascunho</option>
            <option value="archived">Arquivado</option>
            <option value="mock">Mock</option>
          </select>
        </div>

        <label className="brutal-border bg-card px-4 py-3 font-bold">
          <input
            className="mr-2"
            defaultChecked={repository.curation?.visible ?? false}
            name="visible"
            type="checkbox"
          />
          Visivel no site
        </label>

        <label className="brutal-border bg-card px-4 py-3 font-bold">
          <input
            className="mr-2"
            defaultChecked={repository.curation?.featured ?? false}
            name="featured"
            type="checkbox"
          />
          Destaque Dev
        </label>
      </div>

      <BrutalButton type="submit" variant="dev">
        Salvar curadoria
      </BrutalButton>
    </form>
  );
}
