import {
  deleteDevRepositoryCurationAction,
  toggleDevRepositoryFeaturedAction,
  toggleDevRepositoryVisibilityAction,
} from "@/app/admin/actions/dev-curation-actions";
import { DevCurationForm } from "@/components/admin/projects/dev-curation-form";
import { DevRepositoryAdminCard } from "@/components/admin/projects/dev-repository-admin-card";
import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import type {
  GitHubRepositoryCurationResult,
  GitHubRepositoryWithCuration,
} from "@/types/github";

type DevCurationListProps = {
  repositories: GitHubRepositoryWithCuration[];
  source: GitHubRepositoryCurationResult["source"];
};

export function DevCurationList({ repositories, source }: DevCurationListProps) {
  if (!repositories.length) {
    return (
      <BrutalCard>
        <p className="text-lg font-bold">Nenhum repositório encontrado para curadoria.</p>
      </BrutalCard>
    );
  }

  return (
    <section className="space-y-5">
      <BrutalCard className="bg-dev brutal-card-accent ink-on-accent">
        <p className="font-black">
          Origem da listagem: {source}. Repositórios sem curadoria aparecem aqui
          como não configurados; publicamente a visibilidade deve ser controlada
          pela curadoria salva.
        </p>
      </BrutalCard>

      {repositories.map((repository) => (
        <DevRepositoryAdminCard key={repository.id} repository={repository}>
          <div className="flex flex-wrap gap-3">
            <form action={toggleDevRepositoryVisibilityAction}>
              <input name="repositoryName" type="hidden" value={repository.name} />
              <input name="visible" type="hidden" value={String(!repository.visible)} />
              <BrutalButton type="submit" variant="outline">
                {repository.visible ? "Ocultar" : "Mostrar"}
              </BrutalButton>
            </form>

            <form action={toggleDevRepositoryFeaturedAction}>
              <input name="repositoryName" type="hidden" value={repository.name} />
              <input
                name="featured"
                type="hidden"
                value={String(!repository.featured)}
              />
              <BrutalButton type="submit" variant="outline">
                {repository.featured ? "Remover destaque" : "Destacar"}
              </BrutalButton>
            </form>

            {repository.isConfigured ? (
              <form action={deleteDevRepositoryCurationAction}>
                <input name="repositoryName" type="hidden" value={repository.name} />
                <BrutalButton type="submit" variant="outline">
                  Remover curadoria
                </BrutalButton>
              </form>
            ) : null}
          </div>

          <DevCurationForm repository={repository} />
        </DevRepositoryAdminCard>
      ))}
    </section>
  );
}
