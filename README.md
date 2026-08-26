# Portifolio

## Workflow ChatGPT + Claude Code

O desenvolvimento passa a usar um protocolo versionado no próprio repositório:

- `AGENTS.md`: regras gerais para agentes;
- `CLAUDE.md`: regras específicas para Claude Code;
- `docs/agent-workflow.md`: ciclo ChatGPT -> Claude -> revisão;
- `docs/claude-codex-continuous-loop.md`: prompt mestre para loop Claude + Codex;
- `docs/project-status.md`: diagnóstico atual;
- `docs/backlog.md`: tarefas priorizadas;
- `docs/handoff.md`: relatório entre agentes;
- `docs/automation.md`: loop local para Claude implementar e Codex revisar;
- `docs/tasks/`: especificações de tarefas.

Para continuar o projeto, comece lendo `docs/handoff.md` e a próxima tarefa em
`docs/backlog.md`.

## Revisão final antes do deploy

O Prompt 16.10 concluiu a revisão técnica local e a preparação do repositório:

- lint, TypeScript e build de produção validados;
- rotas públicas, login, redirecionamento do admin, 404, sitemap, robots e manifest testados localmente;
- projetos públicos confirmados como dados reais publicados;
- arquivos de ambiente locais, temporários, dumps e chaves privadas protegidos pelo `.gitignore`;
- `.env.example` mantido somente com placeholders;
- busca por secrets e referências sensíveis no client sem ocorrências reais;
- `npm audit` registrou duas vulnerabilidades moderadas no PostCSS interno do Next, sem correção segura disponível sem downgrade incompatível.

O próximo passo recomendado é o **Prompt 17 — Deploy Vercel**, com configuração das variáveis de ambiente diretamente no ambiente de produção.

## Atualização Prompt 16.9: somente projetos reais no site público

A interface pública não usa mais as seleções locais de projetos como conteúdo
do portfólio. As fontes públicas agora seguem estas regras:

- Design vem do Supabase pelo client público e inclui somente projetos do tipo
  `design` com status `published`;
- Dev vem de repositórios reais do GitHub e, quando o Supabase está configurado,
  respeita a curadoria visível com status `published`;
- a Home reúne somente projetos reais marcados como destaque;
- páginas individuais e sitemap incluem somente projetos Design publicados;
- quando nenhuma fonte real entrega conteúdo, a página mostra um estado vazio
  profissional, sem inventar projetos.

`src/data/portfolio-projects.ts` e
`src/data/portfolio-github-repositories.ts` permanecem apenas como referências
internas para histórico, testes e apoio ao painel. Eles não alimentam a
interface pública.

## Tom de voz público

Os textos públicos são escritos preferencialmente em primeira pessoa, como se
Gustavo Poncell estivesse conversando diretamente com quem visita o portfólio.
A voz combina leveza e profissionalismo: é jovem, direta, natural e evita tanto
o excesso de informalidade quanto frases genéricas de apresentação profissional.

Princípios principais:

- apresentar Design e Desenvolvimento como duas partes do mesmo trabalho;
- usar `eu`, `meu` e `minha` quando isso aproxima a conversa, sem repetição excessiva;
- explicar decisões visuais e técnicas em linguagem clara;
- não inventar clientes, resultados, cargos ou experiências;
- não expor termos internos de implementação na interface pública;
- manter a comunicação administrativa objetiva e operacional.

## Atualizacao Prompt 16.5: Modo escuro e nome publico

O modo escuro agora e a aparencia padrao do portfolio. A identidade visual
continua neobrutalista, com fundo preto, superficies escuras, bordas claras,
sombras duras e acentos fortes:

- amarelo para Design;
- verde para Dev;
- sem toggle de tema nesta etapa;
- sem `localStorage` ou preferencia automatica do sistema;
- nome publico atualizado para `Gustavo Poncell`.

## Atualizacao Prompt 16: Contato, SEO e performance

O site agora possui pagina publica de contato e base de SEO/performance.

Funcionalidades:

- `/contato` exibe apenas contatos reais cadastrados no perfil publico ou em `contact_links` visiveis.
- Home, Header e Footer apontam para a pagina de contato.
- Metadata global e por pagina com canonical, Open Graph e Twitter Card.
- Metadata dinamica para `/projetos/[slug]`.
- `/sitemap.xml`, `/robots.txt` e `/manifest.webmanifest`.
- `/admin` e `/login` marcados como `noindex`.
- Diagnostico publico seguro em `/api/site/health`.
- Checklist criado em `docs/performance-checklist.md`.

Configure `NEXT_PUBLIC_SITE_URL` antes do deploy:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Em producao, troque para a URL final do site. Nao foi criado formulario de envio, captcha, newsletter, analytics ou deploy nesta etapa.

## Atualizacao Prompt 15: Upload de imagens

O admin agora possui upload protegido de imagens usando Supabase Storage.

Funcionalidades:

- Upload de avatar em `/admin/perfil`.
- Upload de capa de projeto Design em `/admin/projetos/design`.
- Upload de imagens de galeria de projeto Design.
- Validacao server-side de tipo e tamanho.
- Preview de imagens no admin.
- Exibicao publica usa imagem quando a URL existir e fallback neobrutalista quando nao houver.
- Diagnostico seguro em `/api/admin/storage/health`.

Cada novo upload de avatar cria um arquivo em um path exclusivo, composto por
timestamp e UUID, e salva em `profiles.avatar_url` uma URL publica com versao.
Isso evita reutilizar a resposta antiga no navegador, no CDN do Supabase, no
cache do Next.js ou no deploy da Vercel. As rotas `/`, `/contato` e
`/admin/perfil` sao revalidadas depois da atualizacao.

Nao substitua manualmente o conteudo de um arquivo existente no mesmo path do
Storage. O CDN pode continuar entregando a versao anterior durante o periodo de
cache. Para trocar o avatar, use o upload do admin, que cria um novo path e uma
nova URL; se uma alteracao manual for inevitavel, use outro nome/path e atualize
`profiles.avatar_url`.

Bucket esperado:

```text
portfolio-media
```

Configure no Supabase Dashboard em Storage:

1. Crie o bucket `portfolio-media`.
2. Marque como publico para leitura.
3. Mantenha escrita publica desativada.
4. Use o app/admin para upload server-side.

Tipos aceitos: JPEG, PNG, WebP e GIF. Limite atual: 5 MB por imagem. Upload de video, PDF, arquivos grandes/resumable e crop ficam fora desta etapa.

## Atualizacao Prompt 14: Curadoria de projetos Dev

O admin agora possui curadoria protegida de projetos Dev em `/admin/projetos/dev`.

Funcionalidades:

- Listar repositorios vindos da integracao GitHub server-side ou fallback local.
- Salvar curadoria Supabase por `repository_name`.
- Personalizar titulo, descricao, resumo, tags, ferramentas, status, ordem, visibilidade e destaque.
- Ocultar/exibir repositorios no modo Dev publico.
- Remover curadoria sem apagar ou alterar o repositorio real no GitHub.

Para funcionar contra Supabase real, configure `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
ADMIN_EMAIL=
SUPABASE_SECRET_KEY=
# ou
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_USERNAME=gustavoponcell
GITHUB_TOKEN=
```

`GITHUB_TOKEN` é opcional e fica somente no servidor. Sem Supabase, `/dev`
exibe repositórios públicos reais do GitHub. Com Supabase configurado, a página
exibe somente a curadoria visível e publicada. Se nenhuma fonte real estiver
disponível, apresenta um estado vazio.

## Atualizacao Prompt 13: CRUD de projetos Design

O admin agora possui CRUD protegido para projetos Design em `/admin/projetos/design`.

Funcionalidades:

- Criar e editar projetos com titulo, slug, descricao, resumo, ano, papel, ordem e destaque.
- Publicar, ocultar como rascunho, arquivar, destacar/remover destaque e excluir.
- Cadastrar tags, ferramentas, destaques textuais e galeria placeholder textual.
- Cadastrar URL textual de capa e link externo/Behance opcional.

O CRUD usa Server Components, Server Actions e client admin do Supabase apenas no servidor, sempre depois de validar o administrador. A exibicao publica continua usando mocks nesta etapa; upload real, Storage, CRUD Dev, curadoria GitHub real e leitura publica Supabase ficam para prompts futuros.

Para testar localmente contra Supabase real, configure `.env.local` com Supabase publico, `ADMIN_EMAIL` e `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`, entre em `/login` e acesse `/admin/projetos/design`.

## Atualizacao Prompt 12: CRUD inicial do admin

O admin agora possui CRUD funcional para:

- `/admin/perfil`
- `/admin/experiencias`
- `/admin/cursos`

Para funcionar contra Supabase real, configure no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
ADMIN_EMAIL=
SUPABASE_SECRET_KEY=
# ou
SUPABASE_SERVICE_ROLE_KEY=
```

O build continua funcionando sem `.env.local`, mas as operacoes de CRUD exigem Supabase publico, usuario admin autenticado e chave admin server-side. Avatar e certificado sao apenas URLs textuais nesta etapa; upload real ainda nao existe.

## Atualizacao Prompt 11: Login e Admin

O login funcional com Supabase Auth foi implementado para um unico administrador autorizado por `ADMIN_EMAIL`.

Configuracao minima em `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
ADMIN_EMAIL=
```

Passos:

1. Crie o usuario manualmente no Supabase em Authentication > Users.
2. Use o mesmo e-mail em `ADMIN_EMAIL`.
3. Rode o projeto e acesse `/login`.
4. Depois do login, `/admin` renderiza o dashboard inicial protegido.

Rotas novas:

- `/login`: formulario de acesso restrito.
- `/admin`: dashboard inicial protegido.
- `/api/auth/status`: diagnostico seguro de auth sem tokens, cookies ou e-mail completo.

Nao ha cadastro publico, recuperacao de senha, OAuth, CRUD ou upload nesta etapa.

## Atualizacao Prompt 10: Supabase

A fundacao Supabase foi preparada com `@supabase/supabase-js` e `@supabase/ssr`, clients browser/server/admin, proxy de sessao, health check seguro, schema SQL e seeds temporarios.

Arquivos principais:

- `src/lib/supabase/`: helpers de env, client browser, client server, client admin server-only e proxy de sessao.
- `src/lib/data-source.ts`: ponto atual de origem dos dados publicos, mantendo fallback por mocks.
- `src/app/api/supabase/health/route.ts`: diagnostico seguro sem retornar URL, keys ou tokens.
- `supabase/schema.sql`: tabelas, constraints, indices, triggers e RLS planejado.
- `supabase/seed.sql`: seeds temporarios sem dados pessoais reais.
- `supabase/README.md`: instrucoes de aplicacao manual.

Exemplo de `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_USERNAME=gustavoponcell
GITHUB_TOKEN=
```

Nunca commite `.env.local`. `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `GITHUB_TOKEN` sao somente servidor. O health check fica em `/api/supabase/health` e funciona mesmo sem Supabase configurado.

Site pessoal de portfólio, currículo e contato para apresentar a atuação híbrida de Gustavo Poncell como Designer e Desenvolvedor.

## Objetivo

Criar uma presença digital profissional, visualmente marcante e fácil de atualizar, reunindo projetos de design, projetos de desenvolvimento, experiências, cursos, certificados e canais de contato.

## Stack planejada

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase para autenticação, banco e storage em etapa futura.
- Vercel para deploy em etapa futura.
- GitHub API para modo Dev em etapa futura.
- Behance por curadoria manual no modo Design.

## Status atual

Base Next.js criada, design system inicial configurado, layout global implementado, Home completa estruturada, modos Design/Dev criados, integração GitHub server-side configurada e páginas individuais de projetos Design publicados implementadas.

O projeto já possui App Router, TypeScript, Tailwind CSS 4, ESLint, shadcn/ui, estrutura com `src/`, componentes visuais neobrutalistas, Header, Footer, navegação entre modos, Home completa, página Design com projetos publicados no Supabase, página Dev com repositórios reais e curadoria, processo técnico e detalhes de projeto em `/projetos/[slug]`.

## Como instalar

```bash
npm install
```

## Como rodar em desenvolvimento

```bash
npm run dev
```

Depois acesse `http://localhost:3000`.

## Como rodar lint

```bash
npm run lint
```

## Como gerar build

```bash
npm run build
```

## Integração GitHub

A seção GitHub do Modo Dev busca repositórios públicos no servidor. O site continua funcionando sem `.env.local`; quando a fonte real não está disponível, a seção apresenta um estado vazio.

Para configurar localmente, crie `.env.local` com:

```env
GITHUB_USERNAME=gustavoponcell
GITHUB_TOKEN=
```

- `GITHUB_USERNAME`: usuário público do GitHub usado para buscar repositórios.
- `GITHUB_TOKEN`: opcional, usado apenas no servidor para aumentar limite de requisições.
- Nunca use `NEXT_PUBLIC_GITHUB_TOKEN`.
- Nunca commite `.env.local`.

Para testar:

```bash
npm run dev
```

Depois acesse `http://localhost:3000/dev`.

## Projetos individuais

As páginas em `/projetos/[slug]` são geradas somente para projetos Design publicados, consultados por `src/lib/design-projects.ts`.

Cada projeto pode exibir resumo, problema, solução, ferramentas, tags, destaques, materiais visuais, links públicos quando existirem e projetos relacionados. A origem dos dados foi organizada para evoluir sem expor linguagem interna na interface pública.

## Estrutura básica de rotas

- `/`: Home com apresentação inicial.
- `/design`: modo Design.
- `/dev`: modo Dev.
- `/projetos/[slug]`: página individual de projeto gerada a partir da seleção atual.
- `/admin`: área restrita protegida.
- `/login`: placeholder do futuro login com Supabase Auth.

## Roadmap resumido

1. Documentação e estruturação.
2. Criação do projeto Next.js.
3. Design system neobrutalista.
4. Layout global.
5. Home.
6. Modo Design com dados mockados.
7. Modo Dev com dados mockados.
8. Integração GitHub.
9. Páginas individuais de projeto.
10. Supabase.
11. Login e área administrativa.
12. CRUDs.
13. Upload de imagens.
14. SEO, performance e acessibilidade.
15. Deploy.
16. Revisão final.

## Desenvolvimento com Codex

O projeto será desenvolvido em etapas usando prompts específicos. O arquivo `AGENTS.md` contém instruções permanentes para orientar o Codex neste repositório, incluindo escopo, stack, segurança, acessibilidade, estilo visual e checklist de pronto.

Cada prompt deve manter escopo controlado e registrar decisões importantes na documentação quando necessário.

## Repositório

[github.com/gustavoponcell/portifolio](https://github.com/gustavoponcell/portifolio)

## Atualizacao Prompt 16.6: correcao visual do modo escuro

- O modo escuro permanece fixo por padrao, sem toggle, `localStorage` ou preferencia do sistema.
- Cards de acento amarelo e verde usam texto preto por padrao para manter contraste.
- Blocos internos escuros dentro desses cards usam texto claro por meio de utilitarios especificos.
- Login e admin nao exibem nomes crus de variaveis de ambiente, caminhos ou trechos com aparencia de codigo para visitantes ou administradores.
- A protecao das rotas administrativas foi preservada.

## Atualização Prompt 16.7: comunicação pública

- A interface pública foi revisada para linguagem profissional, sem termos internos de implementação.
- Textos públicos não devem mencionar mock, fallback, placeholder, Supabase, API futura, deploy, CRUD, admin futuro ou variáveis de ambiente.
- A rota protegida continua existindo, mas o rótulo visível passou a ser "Área restrita".
- Os dados públicos locais agora ficam em `src/data/portfolio-projects.ts` e `src/data/portfolio-github-repositories.ts`.
- Próximo passo recomendado: Prompt 17 — Deploy Vercel.
