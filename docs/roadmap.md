# Roadmap

> **Aviso — documento histórico.** Este arquivo registra o roadmap original
> em fases (definido antes da criação do projeto Next.js) e o changelog de
> cada fase concluída, da mais recente para a mais antiga. Todas as 16 fases
> listadas em "Fase 1" a "Fase 16" já foram concluídas — incluindo TASK-001 a
> TASK-007, que vieram depois e não estão registradas aqui. Para o estado e
> backlog atuais, use `docs/project-status.md` e `docs/backlog.md`.

## Atualização Prompt 16.10

- Revisão final de segurança, conteúdo público, fontes de projetos e arquivos versionáveis concluída.
- Lint, TypeScript e build de produção passaram.
- Rotas principais, redirecionamento do admin, 404, sitemap, robots e manifest foram testados localmente.
- `.env.example` foi restaurado com placeholders e temporários passaram a ser ignorados.
- O audit mantém duas vulnerabilidades moderadas herdadas do PostCSS interno do Next; não foi aplicado downgrade nem `npm audit fix --force`.
- Próximo prompt recomendado: Prompt 17 — Deploy Vercel.

## Atualização Prompt 16.9

- Projetos fictícios deixaram de alimentar a interface pública.
- Design público agora lê somente projetos publicados no Supabase.
- Dev público agora exibe somente GitHub real ou curadoria visível e publicada.
- Home, detalhes e sitemap usam apenas fontes reais.
- Estados vazios profissionais substituem preenchimentos inventados.
- As seleções locais permanecem apenas como referência interna e apoio a testes
  ou ao painel.
- Próximo prompt recomendado: Prompt 17 — Deploy Vercel.

## Atualizacao Prompt 16.5

- O modo escuro passou a ser a aparencia padrao do portfolio.
- Tokens globais em `src/app/globals.css` foram ajustados para fundo preto, superficies escuras, borda clara e sombras duras claras.
- A paleta clara anterior fica apenas como referencia futura documentada, sem toggle.
- O nome publico oficial passou a ser `Gustavo Poncell`.
- O proximo prompt recomendado continua sendo Prompt 17 - Deploy Vercel.

## Atualizacao Prompt 16

- Fase 16 implementou contato publico, SEO base, sitemap, robots, manifest e health check publico seguro.
- `/contato` mostra apenas dados reais vindos do perfil publico ou links visiveis.
- Admin/login receberam `noindex`.
- Checklist de performance, SEO e acessibilidade foi registrado em `docs/performance-checklist.md`.
- Deploy, dominio, analytics, Search Console e formulario real seguem para proximas etapas.

## Atualizacao Prompt 15

- Fase 15 implementou upload protegido de imagens com Supabase Storage.
- Avatar de perfil, capa de projeto Design e galeria de projeto Design agora aceitam upload server-side.
- Bucket `portfolio-media` foi documentado para leitura publica e escrita restrita ao admin/server-side.
- Behance real, contato publico, SEO avancado, performance fina e deploy seguem para proximas etapas.

## Atualizacao Prompt 14

- Fase 14 implementou a curadoria protegida de projetos Dev em `/admin/projetos/dev`.
- Repositorios GitHub/fallback agora podem receber titulo, descricao, tags, ferramentas, ordem, visibilidade e destaque.
- `/dev` usa curadoria publica quando Supabase estiver configurado e houver itens visiveis, mantendo fallback quando nao houver.
- Upload, Storage, Behance real, SEO avancado e deploy seguem para etapas futuras.

## Atualizacao Prompt 13

- Fase 13 implementou o CRUD protegido de projetos Design em `/admin/projetos/design`.
- Projetos Design agora podem ser criados, editados, publicados, ocultados, arquivados, destacados e excluidos.
- Galeria e capa continuam como campos textuais; upload real segue pendente.
- CRUD de projetos Dev e curadoria GitHub ficam para o Prompt 14.

## Atualizacao Prompt 12

- Fase 12 iniciou com CRUD de perfil, experiencias e cursos/certificados.
- CRUD de projetos Design fica para o Prompt 13.
- CRUD de projetos Dev, curadoria GitHub, Behance real e upload seguem para etapas futuras.

## Atualizacao Prompt 11

- Fase 11 agora cobre login com Supabase Auth, logout, protecao inicial de `/admin`, autorizacao por `ADMIN_EMAIL`, dashboard inicial e rota `/api/auth/status`.
- CRUDs continuam na Fase 12.
- Upload real de imagens continua na Fase 13.
- Curadoria GitHub, Behance real e formularios publicos seguem para etapas futuras.

## Atualizacao Prompt 10

- Fase 10 agora cobre a base Supabase: dependencias, clients, proxy, health check, schema SQL, seed SQL e documentacao.
- Login funcional, protecao real de `/admin`, dashboard inicial e validacao de administrador seguem para a Fase 11.
- CRUDs continuam na Fase 12.
- Upload real de imagens continua na Fase 13.

## Fase 1: documentação e estruturação

- Criar `AGENTS.md`.
- Criar documentação inicial em `docs/`.
- Registrar requisitos, arquitetura, design system e roadmap.
- Preparar o repositório para a criação do projeto Next.js.

## Fase 2: criação do projeto Next.js

- Inicializar Next.js com App Router e TypeScript.
- Configurar Tailwind CSS.
- Definir estrutura inicial de pastas.
- Configurar scripts básicos.
- Validar build inicial.

## Fase 3: design system neobrutalista

- Definir tokens de cores, tipografia, espaçamentos, bordas e sombras.
- Configurar shadcn/ui.
- Criar componentes base quando solicitado.
- Documentar padrões visuais.

## Fase 4: layout global

- Criar estrutura global de layout.
- Definir navegação principal.
- Preparar alternância conceitual entre Design e Dev.
- Definir footer com contatos e links sociais.

## Fase 5: Home

- Criar apresentação da identidade híbrida.
- Exibir chamada para Design e Dev.
- Exibir destaques iniciais.
- Garantir responsividade e acessibilidade.

## Fase 6: modo Design com dados mockados

- Criar página ou modo Design.
- Exibir projetos visuais mockados.
- Preparar campos para imagem, descrição, tags, destaque e link Behance.
- Validar uso do amarelo como cor principal.

## Fase 7: modo Dev com dados mockados

- Criar página ou modo Dev.
- Exibir projetos dev mockados.
- Preparar campos para tecnologias, links, destaque e repositório.
- Validar uso do verde como cor principal.

## Fase 8: integração GitHub

- Criar estratégia server-side para consumir GitHub API.
- Garantir que `GITHUB_TOKEN` nunca vá para o client.
- Permitir curadoria manual dos projetos exibidos.
- Tratar erros e limites da API.

## Fase 9: páginas individuais de projeto

- Criar páginas detalhadas para projetos.
- Suportar projetos de Design e Dev.
- Exibir imagens, links, tecnologias, descrição e contexto.
- Preparar SEO por projeto.

## Fase 10: Supabase

- Configurar projeto Supabase.
- Modelar banco inicial.
- Configurar políticas de segurança.
- Preparar acesso server-side.

## Fase 11: login/admin

- Criar autenticação para um único administrador.
- Proteger rotas administrativas.
- Criar painel administrativo inicial.

## Fase 12: CRUDs

- Implementar CRUD de bio e informações principais.
- Implementar CRUD de contatos.
- Implementar CRUD de experiências.
- Implementar CRUD de cursos e certificados.
- Implementar CRUD de projetos Design e Dev.
- Implementar controle de destaques e visibilidade.

## Fase 13: upload de imagens

- Configurar Supabase Storage.
- Permitir upload seguro de imagens.
- Validar tamanho, formato e uso público.
- Associar imagens a projetos e perfil.

## Fase 14: SEO, performance e acessibilidade

- Revisar metadados.
- Ajustar sitemap e robots quando necessário.
- Otimizar imagens.
- Auditar contraste, foco e navegação por teclado.
- Revisar performance em mobile.

## Fase 15: deploy

- Configurar Vercel.
- Definir variáveis de ambiente.
- Validar build de produção.
- Testar domínio e URLs públicas.

## Fase 16: revisão final

- Revisar conteúdo.
- Testar fluxos principais.
- Corrigir bugs.
- Validar acessibilidade mínima.
- Registrar pendências para evolução pós-MVP.

### Ajuste Prompt 16.6

- Refinar contraste do modo escuro.
- Corrigir legibilidade de cards amarelos/verdes e blocos internos escuros.
- Remover nomes crus de variaveis de ambiente da interface de login/admin.
- Validar lint, build, audit, buscas de seguranca e rotas publicas/protegidas.
