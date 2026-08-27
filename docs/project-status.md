# Status do Projeto

Atualizado em: 2026-08-26.

## Resumo Executivo

O portfólio está publicado em produção na Vercel e validado para continuidade.
A base pública, admin, Supabase, upload de imagens, curadoria Dev, SEO básico,
sitemap, robots e manifest já existem. TASK-001 a TASK-009 zeraram
vulnerabilidades de dependências, validaram produção, auditaram secrets,
responsividade, acessibilidade e SEO (corrigindo a imagem OG e um link
quebrado), limparam a documentação legada de mocks e decidiram manter o
status `mock` por enquanto (detalhes de cada uma no histórico deste arquivo
e em `docs/handoff.md`). TASK-010 adicionou uma base mínima de testes
automatizados (Vitest, 16 testes) e TASK-011 criou CI no GitHub Actions
(lint, test, build bloqueantes; audit não bloqueante). A partir da
TASK-010, com o Codex indisponível por limite de uso da conta, as revisões
objetivas passaram a ser feitas por Claude Code no mesmo papel crítico, a
pedido do usuário. TASK-012 confirmou `https://poncell-portifolio.vercel.app`
como a URL estável de produção (o usuário decidiu não comprar domínio
próprio por enquanto) e preparou a verificação do Google Search Console via
env (`GOOGLE_SITE_VERIFICATION`). O próximo bloco de trabalho é o restante
de P3: TASK-013 (analytics), TASK-014 (performance) e TASK-015
(hardening do workflow de agentes).

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

Outras rotas geradas:

- `/og`: imagem Open Graph/Twitter gerada sob demanda (`next/og`), fora de
  `/api` de propósito para não ser bloqueada pelo `disallow` de `robots.ts`.

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

Resolvido em TASK-008.

Trechos em README, `docs/architecture.md`, `docs/requirements.md`,
`docs/roadmap.md`, `docs/performance-checklist.md`, `supabase/README.md` e
`docs/prompts-log.md` ainda mencionam fases antigas com
mock/fallback/placeholder. Parte é histórico, mas parte pode confundir
agentes.

Resultado atual: cada um desses arquivos agora tem um aviso no topo
deixando explícito o que é changelog histórico (seções "Atualização Prompt
N") versus instrução ativa, e as frases mais enganosas ganharam uma nota
inline apontando que foram superadas por TASK-001/003/006. Nenhum conteúdo
histórico foi apagado. Achado colateral (não corrigido, fora de escopo de
código): `src/lib/data-source.ts` é código morto, não importado por
nenhuma página.

### Mocks Internos

Decidido em TASK-009 (DEC-006 em `docs/decisions.md`).

Existem tipos e status `mock` em:

- `src/types/project.ts`;
- `src/types/admin.ts`;
- `src/types/github.ts`;
- `supabase/schema.sql`;
- componentes admin de status.

Isso pode ser legítimo no admin/histórico, mas deve ser auditado antes do deploy
para garantir que nada público depende disso.

Resultado atual: auditado. `getPublicDesignProjects`/`getPublicDevRepositories`
filtram exclusivamente `status`/`custom_status = 'published'`, então `mock`
nunca alcança o público, por construção da query. Decisão: manter `mock`
por enquanto (não remover/migrar); plano de migração SQL completo fica
registrado em DEC-006 para uma tarefa futura, caso decidam removê-lo — exige
acesso ao Supabase de produção que esta sessão não tem.

### Testes Automatizados

Resolvido parcialmente em TASK-010.

Resultado atual: existe `npm.cmd run test` (Vitest), com 16 testes cobrindo
`absoluteUrl`, `validateImageFile`, os helpers de path de Storage
(anti path-traversal) e `getRelatedProjects`. Cobertura ainda é mínima —
não há testes de rota pública nem E2E de login/admin (Playwright foi
avaliado e adiado por exigir browser e credenciais/mocks, fora do escopo
de "mínimo"). Build e lint continuam sendo a validação principal.

### CI (GitHub Actions)

Resolvido em TASK-011.

Resultado atual: `.github/workflows/ci.yml` roda em push para `main` e em
todo pull request. Job `build` (bloqueante): `npm ci`, `npm run lint`,
`npm run test`, `npm run build` em Node 22. Job `audit` (não bloqueante):
`npm audit --omit=dev` com `continue-on-error: true`. Validado localmente
que o build funciona com e sem `.env.local`. Sem secrets no workflow, sem
step de deploy. Execução real no Actions ainda depende do próximo
push/PR.

### Layout Responsivo

Revisado em TASK-004 (auditoria de código, sem navegador real conectado nesta
sessão nem Playwright instalado).

Resultado atual: `.brutal-section`, `Container`, `SiteHeader`, `ModeSwitcher`,
`SiteFooter` e as seções de hero/projeto usam larguras fluidas
(`max-w-*`, `flex-wrap`, `min(...)`, breakpoints `sm:`/`md:`/`lg:`), sem
larguras fixas que quebrem em 360px. Nenhum problema objetivo encontrado.
Pendência: validação visual real (navegador ou Playwright) ainda recomendada
quando houver ferramenta disponível.

### Acessibilidade Básica

Revisado em TASK-005 (auditoria de código, sem leitor de tela real nesta
sessão).

Resultado atual: foco visível global via `:focus-visible` em `globals.css`;
labels associados (`htmlFor`/`id`) em todos os formulários admin e no login;
alt text descritivo em todas as imagens; badges de status sempre combinam
cor com texto; nenhum controle interativo depende de `onClick` em elemento
não semântico. Nenhum problema objetivo encontrado. Pendência: teste manual
com leitor de tela (NVDA/VoiceOver) e navegação por teclado ao vivo ainda
recomendado quando houver ferramenta disponível.

### SEO e Compartilhamento

Resolvido em TASK-006.

Resultado atual: `robots.ts`, `sitemap.ts`, metadata por rota (title,
description, canonical), Open Graph/Twitter Card e JSON-LD (`Person`,
`CreativeWork`) já estavam corretos. Único achado: `siteConfig.ogImage`
usava o `/window.svg` padrão do `create-next-app`. Corrigido com uma imagem
OG gerada sob demanda em `/og` (`next/og`/`ImageResponse`, sem dependência
nova), com as cores de marca (design `#ffd84d`, dev `#39ff88`, fundo
`#0f0f0f`).

### Links Quebrados

Resolvido em TASK-007.

Resultado atual: navegação, rodapé e todos os `href` internos apontam para
rotas existentes. Corrigido 1 link âncora quebrado: `#projetos-dev` (botão
em `DevHeroSection`) não tinha elemento correspondente — `id` da seção
renomeado de `github` para `projetos-dev` em `GithubPreviewSection`. Links
de contato (GitHub/LinkedIn/WhatsApp/Behance) dependem 100% de dados reais
do Supabase (perfil/`contact_links`), sem URL fictícia no código. Pendência:
validar ao vivo se as URLs reais cadastradas em produção resolvem sem
erro — fora do alcance desta sessão sem acesso à base de produção.

### Deploy

Resolvido em TASK-002.

Resultado atual:

- Produção Vercel confirmada pelo usuário como `Ready`.
- Commit em produção confirmado pelo usuário:
  `04e0e9dbf5e2dc9b566ca26b57019defdcbeb238`.
- URL pública validada: `https://poncell-portifolio.vercel.app/`.
- Rotas públicas principais responderam HTTP 200.
- `/admin` sem sessão respondeu HTTP 307 para `/login`.
- Login admin, rotas administrativas e Console do navegador foram confirmados
  manualmente pelo usuário como funcionando.

### Domínio e Search Console

Resolvido em TASK-012 (dentro do possível sem domínio próprio).

Resultado atual: usuário decidiu manter o domínio padrão da Vercel, sem
comprar domínio próprio por enquanto. `https://poncell-portifolio.vercel.app`
confirmado por HTTP como a URL estável de produção (headers e fingerprint
de build distintos de uma URL de deployment específico que o usuário
havia colado). `NEXT_PUBLIC_SITE_URL` já estava correto em Production.
Preparado `GOOGLE_SITE_VERIFICATION` (env opcional) +
`metadata.verification.google` em `src/app/layout.tsx` para viabilizar a
verificação do Google Search Console sem mudança de código futura.
Checklist completo em `docs/domain-search-console-checklist.md`.
Pendências restantes (criar propriedade, verificar, submeter sitemap)
exigem login na conta Google do usuário.

## Últimos Comandos Executados Nesta Análise

```powershell
git status -sb
npm.cmd audit --omit=dev
npm.cmd run lint
npm.cmd run build
```

Resultado:

- TASK-001 aprovada por ChatGPT/Codex.
- TASK-002 aprovada por ChatGPT/Codex após validação automática e confirmação
  manual do usuário.
- TASK-003 aprovada por ChatGPT/Codex sem exposição objetiva de secrets.
- Audit sem vulnerabilidades.
- Lint sem erros.
- Build de produção concluído com Next.js 16.3.3.
