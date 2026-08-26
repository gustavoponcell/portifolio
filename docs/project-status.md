# Status do Projeto

Atualizado em: 2026-08-26.

## Resumo Executivo

O portfólio está em fase avançada pré-produção. A base pública, admin, Supabase,
upload de imagens, curadoria Dev, SEO básico, sitemap, robots e manifest já
existem. A primeira revisão de dependências foi concluída com audit zerado. O
próximo bloco de trabalho deve focar em deploy Vercel, auditoria de secrets,
validação visual/manual e limpeza de documentação legada que ainda descreve
fases antigas com mocks.

## Stack Verificada

- Next.js `16.3.3`.
- React `19.2.4`.
- TypeScript `^5`, `strict: true`.
- Tailwind CSS `^4`.
- Supabase SSR/client/admin.
- shadcn/ui, Base UI, lucide-react.
- GitHub API server-side.
- Scripts disponíveis: `dev`, `build`, `start`, `lint`.

## Rotas Verificadas Por Estrutura

Públicas:

- `/`
- `/design`
- `/dev`
- `/contato`
- `/projetos/[slug]`
- `/login`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

Administrativas:

- `/admin`
- `/admin/perfil`
- `/admin/experiencias`
- `/admin/cursos`
- `/admin/projetos/design`
- `/admin/projetos/dev`

APIs:

- `/api/auth/status`
- `/api/github/repositories`
- `/api/site/health`
- `/api/supabase/health`
- `/api/admin/health`
- `/api/admin/storage/health`
- `/api/admin/projects/design/health`
- `/api/admin/projects/dev/health`

## Arquitetura Atual

- `src/app`: App Router, páginas, APIs e Server Actions admin.
- `src/components`: componentes por domínio.
- `src/lib`: camadas de dados, auth, Supabase, storage, SEO e GitHub.
- `supabase`: schema, seeds e SQL de importação.
- `docs`: documentação histórica e operacional.

## Fontes de Dados Públicas

- Perfil/contato: Supabase público com fallback seguro sem contatos falsos.
- Experiências: Supabase público.
- Design: Supabase público, apenas projetos `design` com status `published`.
- Dev: GitHub real e curadoria Supabase visível/publicada quando configurada.
- Estados vazios substituem conteúdo fictício.

## Pontos Fortes

- Separação clara entre client público e client admin server-only.
- Auth admin depende de Supabase Auth + `ADMIN_EMAIL`.
- Upload server-side com validação.
- RLS planejado em SQL.
- SEO básico e JSON-LD de projetos.
- `.gitignore` cobre `.env*`, dumps e chaves comuns.
- Build não depende de Supabase configurado.

## Problemas e Riscos Encontrados

### Segurança de Dependências

Resolvido em TASK-001.

Resultado atual: `npm audit --omit=dev` encontrou 0 vulnerabilidades após
atualização controlada de `next`, `eslint-config-next` e dependências
transitivas.

### Documentação Legada

Trechos em README, `docs/architecture.md`, `docs/requirements.md`,
`docs/roadmap.md`, `docs/performance-checklist.md` e `supabase/README.md`
ainda mencionam fases antigas com mock/fallback/placeholder. Parte é histórico,
mas parte pode confundir agentes.

### Mocks Internos

Existem tipos e status `mock` em:

- `src/types/project.ts`;
- `src/types/admin.ts`;
- `src/types/github.ts`;
- `supabase/schema.sql`;
- componentes admin de status.

Isso pode ser legítimo no admin/histórico, mas deve ser auditado antes do deploy
para garantir que nada público depende disso.

### Testes Automatizados

Não há script `test`. A validação atual depende de lint, build e testes manuais.

### Deploy

Vercel é o alvo, mas a validação final de produção ainda depende de configuração
manual de variáveis, domínio, Supabase e GitHub.

## Últimos Comandos Executados Nesta Análise

```powershell
git status -sb
npm.cmd audit --omit=dev
npm.cmd run lint
npm.cmd run build
```

Resultado:

- TASK-001 aprovada por ChatGPT/Codex.
- Audit sem vulnerabilidades.
- Lint sem erros.
- Build de produção concluído com Next.js 16.3.3.
