# Arquitetura Inicial

## Atualização Prompt 16.9: fontes reais de projetos públicos

A leitura pública de projetos foi separada das referências locais:

- `src/lib/design-projects.ts` usa um client Supabase público e server-side para
  carregar apenas projetos `design` com status `published`, incluindo relações
  de tags, ferramentas, galeria e destaques;
- `src/lib/dev-repositories.ts` descarta a fonte local quando a API do GitHub
  falha e, com Supabase configurado, retorna apenas curadorias visíveis e
  publicadas associadas a repositórios reais;
- Home recebe somente projetos Design destacados e curadorias Dev destacadas;
- `/projetos/[slug]` e o sitemap consultam exclusivamente projetos Design
  publicados;
- ausência ou falha de configuração externa resulta em listas vazias e estados
  editoriais profissionais, sem quebrar o build;
- `src/data/portfolio-projects.ts` e
  `src/data/portfolio-github-repositories.ts` permanecem como referência interna
  e apoio ao painel, sem alimentar visitantes.

O client público não usa secret ou service role. Auth, Storage e operações do
admin não foram alterados.

## Atualizacao Prompt 16.5: Modo escuro padrao

O tema escuro agora e implementado como padrao global por tokens CSS em
`src/app/globals.css`.

Decisoes:

- Nao ha toggle de tema.
- Nao ha persistencia em `localStorage`.
- Nao ha leitura de preferencia do sistema.
- Os nomes dos tokens foram preservados para evitar refatoracao massiva.
- `--color-background`, `--color-foreground`, `--color-card`,
  `--color-border`, `--color-muted` e sombras passaram a valores escuros.
- Amarelo Design e verde Dev continuam como acentos com texto preto.
- Metadata, JSON-LD e manifest passam a usar `Gustavo Poncell`.
- A paleta clara antiga permanece apenas como referencia comentada para etapa futura.

## Atualizacao Prompt 16: Contato, SEO e performance

Foram adicionadas camadas publicas para contato e SEO:

- `src/app/contato/page.tsx`: pagina publica de contato.
- `src/components/contact/`: hero, lista de canais, cards, estado vazio e CTA.
- `src/lib/public-profile.ts`: leitura publica de `profiles` e `contact_links` via client Supabase publico, com fallback seguro local.
- `src/lib/seo/`: helpers para URLs absolutas, metadata e JSON-LD.
- `src/app/sitemap.ts`: sitemap gerado a partir de rotas publicas e projetos locais.
- `src/app/robots.ts`: bloqueia admin, login e API.
- `src/app/manifest.ts`: manifest basico.
- `src/app/api/site/health/route.ts`: diagnostico publico seguro sem secrets.
- `docs/performance-checklist.md`: checklist de revisao manual.

Estrategia:

- Contatos aparecem somente quando existem dados cadastrados.
- O fallback nao cria e-mail, telefone, WhatsApp ou rede social falsa.
- `NEXT_PUBLIC_SITE_URL` centraliza URL canonica para metadata, sitemap e robots.
- Rotas privadas ficam fora do sitemap e com `noindex`.
- Secrets Supabase/GitHub continuam server-only.

## Atualizacao Prompt 15: Upload de imagens

Foi adicionada a primeira camada real de Supabase Storage para imagens publicas do portfolio.

Arquivos e responsabilidades:

- `src/types/media.ts`: tipos de bucket, pastas, MIME permitido, asset e resultado de upload.
- `src/config/media.ts`: bucket `portfolio-media`, limite de 5 MB, tipos permitidos e labels.
- `src/lib/storage/validation.ts`: valida tipo MIME, tamanho e nome de arquivo.
- `src/lib/storage/paths.ts`: gera paths seguros para avatar, capa Design e galeria Design.
- `src/lib/storage/media.ts`: upload, delete e URL publica usando client admin server-side.
- `src/app/admin/actions/media-actions.ts`: Server Actions protegidas para avatar, capa e galeria.
- `src/components/admin/media/`: campos de upload, preview e status de Storage.
- `src/components/media/responsive-image.tsx`: imagem responsiva para URLs publicas sem depender de host Supabase no `next.config.ts`.
- `src/app/api/admin/storage/health/route.ts`: diagnostico seguro do bucket.

Estrategia:

- Bucket publico de leitura: `portfolio-media`.
- Escrita feita somente no servidor com client admin, apos `requireAdmin()`.
- Arquivos aceitos: JPEG, PNG, WebP e GIF.
- Limite: 5 MB.
- Paths preservam apenas contexto seguro de pasta/slug e nao usam o nome
  original puro.
- Cada upload usa timestamp e UUID completo para nunca sobrescrever o mesmo
  path.
- Upload de avatar atualiza `profiles.avatar_url` com a nova URL publica e o
  query param de versao `v`.
- Upload de capa Design atualiza `projects.cover_url`.
- Upload de galeria cria linha em `project_gallery` com `image_url`.
- Componentes publicos exibem imagem quando existe URL e mantem fallback neobrutalista quando nao existe.

No fluxo de avatar, a mudanca do path invalida o cache do Supabase CDN e o
query param de versao invalida caches intermediarios e do navegador. Depois da
persistencia, o servidor revalida `/`, `/contato`, `/admin/perfil` e `/admin`.
Trocar manualmente o arquivo no Storage mantendo o mesmo path nao e um fluxo
suportado para atualizacao imediata: o CDN pode conservar a imagem anterior.
Uma troca manual deve criar outro path e atualizar `profiles.avatar_url`.

## Atualizacao Prompt 14: Curadoria de projetos Dev

O admin recebeu curadoria protegida de repositorios Dev baseada em GitHub + Supabase:

- `src/lib/github-curation.ts`: helpers compartilhados para mapear curadoria Supabase e combinar com repositorios.
- `src/lib/admin/dev-curation.ts`: camada admin server-side para listar, upsertar, alternar visibilidade/destaque e remover curadorias.
- `src/lib/dev-repositories.ts`: leitura publica server-side que aplica curadoria quando Supabase publico consegue ler itens visiveis.
- `src/app/admin/actions/dev-curation-actions.ts`: Server Actions protegidas para salvar/remover/alternar curadoria.
- `src/app/admin/projetos/dev/page.tsx`: rota protegida para curadoria Dev.
- `src/app/api/admin/projects/dev/health/route.ts`: diagnostico seguro do fluxo Dev.
- `src/components/admin/projects/`: formularios, lista, card e badge de origem para curadoria Dev.

Estrategia:

- O GitHub continua sendo buscado apenas no servidor por `src/lib/github.ts`.
- O admin cruza repositorios GitHub/fallback com `github_repository_curations`.
- Repositorios sem curadoria aparecem no admin como nao configurados.
- No publico, quando ha curadoria visivel lida do Supabase, somente itens `visible = true` e status `published`/`mock` aparecem.
- Sem Supabase, sem curadoria ou em falha de leitura, `/dev` conserva o comportamento anterior com GitHub/fallback.
- A curadoria nao apaga, edita ou cria repositorios reais no GitHub.
- Nenhum token GitHub ou chave Supabase e retornado ao client.

## Atualizacao Prompt 13: CRUD de projetos Design

O admin recebeu CRUD protegido e server-side para projetos Design:

- `src/types/admin.ts`: tipos de projeto Design administrativo, galeria, destaques e status.
- `src/lib/admin/design-projects.ts`: leitura e escrita em `projects`, `project_tags`, `project_tools`, `project_gallery` e `project_highlights`.
- `src/app/admin/actions/design-project-actions.ts`: Server Actions com validacao de FormData, slug, URLs opcionais, status e revalidacao de rotas.
- `src/app/admin/projetos/design/page.tsx`: rota protegida por `requireAdmin()`.
- `src/components/admin/projects/`: formulario, lista, card e badge de status para projetos Design.
- `src/app/api/admin/projects/design/health/route.ts`: diagnostico seguro para a area Design admin.

Regras importantes:

- Todas as operacoes exigem admin antes de acessar o client administrativo.
- A camada de dados sempre filtra `type = 'design'` em updates, deletes e listagens.
- Projeto Dev, curadoria GitHub, upload/Storage e leitura publica Supabase nao foram implementados.
- A exibicao publica usa `src/data/portfolio-projects.ts` via `src/lib/data-source.ts`.
- URLs de imagem/capa sao apenas texto; upload real fica para etapa futura.

## Atualizacao Prompt 12: CRUD inicial do admin

O painel protegido recebeu o primeiro conjunto de CRUDs reais com Supabase:

- `src/types/admin.ts`: tipos de perfil, experiencia, curso e resultado de CRUD.
- `src/lib/admin/profile.ts`: leitura e upsert de perfil usando client admin server-side.
- `src/lib/admin/experiences.ts`: listagem, criacao, atualizacao, exclusao e visibilidade de experiencias.
- `src/lib/admin/courses.ts`: listagem, criacao, atualizacao, exclusao e visibilidade de cursos/certificados.
- `src/app/admin/actions/`: Server Actions para validar FormData, exigir admin, chamar a camada de dados e revalidar rotas.
- `src/app/admin/perfil/page.tsx`: rota protegida para editar perfil.
- `src/app/admin/experiencias/page.tsx`: rota protegida para CRUD de experiencias.
- `src/app/admin/cursos/page.tsx`: rota protegida para CRUD de cursos e URL textual de certificado.
- `src/components/admin/forms/`: formularios server-side neobrutalistas.
- `src/components/admin/lists/`: listas de experiencias e cursos com editar, excluir e alternar visibilidade.
- `src/app/api/admin/health/route.ts`: diagnostico seguro do admin.

Todas as escritas validam admin antes de chamar o Supabase. O client administrativo continua server-only e exige `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`. As paginas publicas seguem usando mocks; a exibicao publica dos dados administrados sera refinada depois.

## Atualizacao Prompt 11: Login e Admin

O admin inicial agora usa Supabase Auth com autorizacao por `ADMIN_EMAIL`.

Pastas e arquivos:

- `src/lib/auth/`: helpers server-side de sessao, autorizacao admin e Server Actions de login/logout.
- `src/components/auth/`: formulario de login, botao de logout e card de status de configuracao.
- `src/components/admin/`: dashboard inicial protegido, cards de status, proximas etapas e usuario autenticado.
- `src/app/api/auth/status/route.ts`: diagnostico seguro de autenticacao.

Estrategia de protecao:

- `/admin` e Server Component protegido.
- A pagina chama `requireAdmin()` antes de renderizar.
- Sem Supabase configurado, sem `ADMIN_EMAIL`, sem sessao ou com e-mail nao autorizado, `/admin` redireciona para `/login`.
- `getCurrentUser()` usa `supabase.auth.getClaims()` e recorre a `getUser()` apenas para complementar o e-mail quando necessario.
- Server Actions fazem login com `signInWithPassword` e logout com `signOut`.
- Se o usuario autenticado nao corresponde a `ADMIN_EMAIL`, a action faz logout imediatamente.
- O proxy continua apenas atualizando cookies de sessao, sem bloquear rotas publicas.

Rotas publicas mantidas:

- `/`
- `/design`
- `/dev`
- `/projetos/[slug]`
- `/login`
- `/api/github/repositories`
- `/api/supabase/health`
- `/api/auth/status`

Rota protegida:

- `/admin`

## Atualizacao Prompt 10: Supabase

A base Supabase foi criada sem implementar login funcional, dashboard real, CRUD ou upload.

Arquivos e responsabilidades:

- `src/lib/supabase/env.ts`: leitura segura das variaveis Supabase, sem quebrar build quando env nao existe.
- `src/lib/supabase/client.ts`: client browser com `createBrowserClient`.
- `src/lib/supabase/server.ts`: client server com `createServerClient` e cookies do Next.
- `src/lib/supabase/admin.ts`: client administrativo com `import "server-only"`, usando apenas secret/service role.
- `src/lib/supabase/proxy.ts` e `proxy.ts`: refresh de sessao via cookies quando Supabase estiver configurado.
- `src/lib/supabase/types.ts`: tipos temporarios de tabelas planejadas.
- `src/lib/data-source.ts`: centraliza a origem dos dados publicos; nesta etapa continua em mock.
- `src/app/api/supabase/health/route.ts`: retorna apenas flags booleanas e timestamp.
- `supabase/schema.sql`: planejamento inicial de tabelas, constraints, indices, triggers e RLS.
- `supabase/seed.sql`: seeds temporarios baseados nos mocks atuais.

Estrategia:

- Dados publicos continuam vindo de mocks ate CRUD/admin.
- Build publico nao depende de Supabase remoto.
- Conteudo publicado/visivel podera ser lido publicamente via RLS.
- Escrita publica nao e liberada.
- Admin nao e hardcoded por e-mail; a configuracao futura usa `site_settings.admin_user_id`.
- Secret key, service role e token GitHub permanecem somente servidor.

## Stack recomendada

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth.
- Supabase Database.
- Supabase Storage.
- Vercel.
- GitHub API.
- Behance por links curados manualmente.

A implementação real será feita em prompts futuros. Este documento define a direção arquitetural inicial.

## Estrutura visual e componentes

A base visual inicial usa Tailwind CSS 4 com tokens em `src/app/globals.css`.

Pastas relevantes:

```text
src/app/
src/components/ui/
src/components/brand/
src/components/layout/
src/components/home/
src/components/design/
src/components/dev/
src/components/github/
src/components/projects/
src/config/
src/data/
src/types/
src/lib/
```

- `src/components/ui/`: componentes gerados pelo shadcn/ui.
- `src/components/brand/`: componentes próprios da identidade neobrutalista do projeto.
- `src/components/layout/`: componentes globais de estrutura, navegação e composição do site.
- `src/components/home/`: seções específicas da Home, mantendo `src/app/page.tsx` apenas como composição.
- `src/components/design/`: seções específicas do Modo Design, mantendo `src/app/design/page.tsx` apenas como composição.
- `src/components/dev/`: seções específicas do Modo Dev, mantendo `src/app/dev/page.tsx` apenas como composição.
- `src/components/github/`: componentes de apresentação de repositórios vindos da integração server-side com GitHub.
- `src/components/projects/`: componentes das páginas individuais de projeto, como hero, visão geral, galeria, links, sidebar de detalhes e relacionados.
- `src/config/site.ts`: configuração central com nome, descrição e links internos principais.
- `src/data/portfolio-projects.ts`: seleção local de projetos para Home, Design e Dev.
- `src/data/portfolio-github-repositories.ts`: seleção local de repositórios para apoio à seção GitHub.
- `src/types/project.ts`: tipo compartilhado para projetos mockados e futuros dados curados.
- `src/types/github.ts`: tipos normalizados da integração GitHub.
- `src/lib/github.ts`: serviço server-side para buscar, normalizar e cachear repositórios públicos.
- `src/lib/projects.ts`: camada local de leitura dos projetos, preparando evolução de fonte de dados.
- `src/app/globals.css`: tokens globais, base do Tailwind 4, estilos shadcn/ui e classes utilitárias como `.brutal-card`, `.brutal-button` e `.accent-design`.

Componentes de layout:

- `Container`: centraliza conteúdo, aplica largura máxima e padding responsivo.
- `ModeSwitcher`: navegação visual entre modo Design e modo Dev, com estado ativo definido pela rota.
- `SiteHeader`: header global com marca, navegação principal, link para área restrita e alternância entre modos.
- `SiteFooter`: footer global com nome, posicionamento e links internos principais.
- `SiteShell`: organiza `SiteHeader`, área principal `main` e `SiteFooter` em todas as páginas.

Componentes da Home:

- `HeroSection`: apresentação principal de Gustavo e chamadas para Design, Dev e projetos.
- `ModeCardsSection`: explica a identidade híbrida e cria portas de entrada para os modos.
- `FeaturedProjectsSection`: exibe projetos marcados como destaque.
- `AboutPreviewSection`: apresenta um resumo institucional sem dados inventados.
- `ExperiencePreviewSection`: lista áreas de atuação sem criar timeline formal.
- `ContactPreviewSection`: apresenta chamada para os canais de contato.

Componentes do Modo Design:

- `DesignHeroSection`: hero do modo Design com destaque amarelo e chamadas para projetos e modo Dev.
- `CreativeAreasSection`: cards de áreas criativas como identidade visual, UI e social media.
- `DesignProjectsSection`: galeria de projetos filtrados por `type: "design"`.
- `CreativeProcessSection`: etapas simples do processo criativo.
- `BehancePreviewSection`: seção editorial para cases visuais e referências externas.
- `DesignCtaSection`: chamada final para Home e Modo Dev.

Componentes do Modo Dev:

- `DevHeroSection`: hero do modo Dev com destaque verde, pseudo-terminal e chamadas para projetos e Design.
- `TechStackSection`: cards de tecnologias e áreas técnicas planejadas.
- `DevProjectsSection`: galeria de projetos filtrados por `type: "dev"`.
- `DevelopmentProcessSection`: etapas simples do processo técnico.
- `GithubPreviewSection`: seção de repositórios, tecnologias e links curados.
- `DevCtaSection`: chamada final para Home e Modo Design.

Componentes de páginas individuais de projeto:

- `ProjectHeroSection`: apresenta badge Design/Dev, título, resumo, tags, ano, papel e bloco visual do projeto.
- `ProjectOverviewSection`: organiza resumo, problema, solução e contexto do projeto.
- `ProjectDetailsSidebar`: mostra ficha estruturada com tipo, ano, papel, status, ferramentas, tags e links disponíveis.
- `ProjectGallerySection`: renderiza galeria responsiva com materiais visuais do projeto.
- `ProjectHighlightsSection`: lista decisões, aprendizados e melhorias do projeto.
- `ProjectLinksSection`: exibe apenas links reais existentes ou uma mensagem discreta quando não houver links.
- `RelatedProjectsSection`: sugere até três projetos, priorizando o mesmo tipo e sem repetir o projeto atual.

Integração GitHub inicial:

- A busca de repositórios acontece em `src/lib/github.ts`, somente no servidor.
- O endpoint usado é a API pública de repositórios de usuário do GitHub.
- `GITHUB_USERNAME` define o usuário público; se ausente, usa `gustavoponcell`.
- `GITHUB_TOKEN` é opcional, melhora limite de requisições e nunca deve ser exposto ao client.
- O serviço ignora forks e repositórios arquivados por padrão.
- O resultado é limitado e normalizado antes de chegar aos componentes.
- Falhas de busca externa retornam a seleção local de `src/data/portfolio-github-repositories.ts`.
- A rota `src/app/api/github/repositories/route.ts` expõe apenas dados normalizados e nunca retorna token ou headers sensíveis.

Páginas individuais de projeto:

- A rota `src/app/projetos/[slug]/page.tsx` usa `getProjectBySlug` para buscar o projeto.
- `generateStaticParams` gera páginas estáticas para todos os slugs cadastrados em `src/data/portfolio-projects.ts`.
- `generateMetadata` cria título e descrição básicos por projeto.
- Slugs inexistentes usam `notFound()` e uma experiência neobrutalista em `src/app/projetos/[slug]/not-found.tsx`.
- A camada `src/lib/projects.ts` centraliza consultas como destaques, filtros por tipo e relacionados para facilitar a futura troca por Supabase.

## Rotas planejadas

Rotas públicas previstas:

```text
/
/design
/dev
/projetos
/projetos/[slug]
/sobre
/contato
```

Rotas administrativas previstas:

```text
/admin/login
/admin
/admin/perfil
/admin/contatos
/admin/experiencias
/admin/cursos
/admin/certificados
/admin/projetos
```

As rotas podem ser consolidadas ou ajustadas conforme a experiência final.

## Modelo geral de dados futuro

Entidades previstas:

- Perfil: nome, bio, foto, resumo, cargo, localização opcional.
- Contatos: e-mail, telefone, WhatsApp, LinkedIn, GitHub, Behance e outros links.
- Experiências: título, organização, período, descrição, tipo e ordem.
- Cursos: nome, instituição, período, descrição, link opcional e ordem.
- Certificados: nome, emissor, data, link, imagem opcional e ordem.
- Projetos: título, slug, tipo, descrição, imagem, tags, tecnologias, links, destaque, visível e ordem.
- Configurações do site: textos principais, modo em destaque, SEO e preferências visuais.

Campos específicos de projeto:

- Design: imagens, categoria visual, link Behance, contexto criativo.
- Dev: repositório, link GitHub, deploy, tecnologias, descrição curada e status de destaque.

## Integração GitHub

A integração com GitHub deve ser feita de forma server-side. O token do GitHub nunca deve ser exposto ao client.

Estratégia prevista:

- Usar `GITHUB_USERNAME` para identificar o perfil.
- Usar `GITHUB_TOKEN` somente no servidor quando necessário.
- Buscar repositórios e metadados relevantes.
- Salvar ou combinar os dados com curadoria manual.
- Permitir ocultar repositórios.
- Permitir destacar projetos.
- Permitir sobrescrever descrição exibida.

## Estratégia Behance

O Behance será tratado por curadoria manual. O site deve permitir cadastrar projetos de design com links para Behance, mas não depender obrigatoriamente de API do Behance.

Essa decisão reduz risco de autenticação, limites de API e exposição desnecessária de credenciais.

## Supabase Auth

Uso planejado:

- Autenticação de um único administrador.
- Proteção de rotas administrativas.
- Sessão segura.
- Verificação server-side quando necessário.

O modelo final deve impedir que visitantes acessem operações administrativas.

## Supabase Storage

Uso planejado:

- Foto de perfil.
- Imagens de projetos.
- Imagens de certificados quando necessário.

Cuidados:

- Validar tipo e tamanho de arquivo.
- Separar buckets públicos e privados quando fizer sentido.
- Não permitir upload anônimo irrestrito.

## Vercel

Uso planejado:

- Deploy do projeto Next.js.
- Configuração de variáveis de ambiente pelo painel da Vercel.
- Build de produção a cada push na branch principal, quando configurado.

## Segurança básica

- Nunca expor tokens no client.
- Nunca commitar `.env` real.
- Usar RLS no Supabase.
- Validar permissões em rotas administrativas.
- Tratar erros de API sem vazar detalhes sensíveis.
- Usar placeholders em documentação e exemplos.
- Revisar qualquer variável com prefixo `NEXT_PUBLIC_`.

## Variáveis de ambiente previstas

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_TOKEN=
GITHUB_USERNAME=
NEXT_PUBLIC_SITE_URL=
```

Valores reais devem existir apenas em ambiente local seguro ou na configuração da Vercel/Supabase, nunca no repositório.

## Observação de implementação

Este documento não implementa a arquitetura. Ele registra as decisões iniciais para orientar prompts futuros. A próxima etapa recomendada é criar o projeto base Next.js com TypeScript e Tailwind CSS.

## Atualizacao Prompt 16.6

- A correcao foi limitada a camada visual/copy de interface, sem alterar Auth, banco, Storage, CRUD, deploy ou contratos de dados.
- Os tokens globais do modo escuro foram refinados em `src/app/globals.css`.
- A legibilidade de cards amarelos/verdes passou a ser controlada por utilitarios explicitos: `ink-on-accent`, `surface-on-accent` e `brutal-card-accent`.
- Login, admin e mensagens de erro agora usam textos amigaveis em vez de expor nomes crus de variaveis de ambiente na UI.
- Rotas administrativas continuam protegidas por redirecionamento para `/login` quando nao ha sessao autorizada.
