# Handoff Entre Agentes

Atualizado em: 2026-08-26.

## Último Handoff — TASK-009

- Status: pronto para revisão.
- Arquivos alterados:
  - `docs/decisions.md` (DEC-006 adicionada).
  - `docs/handoff.md`, `docs/backlog.md`, `docs/project-status.md`.
- O que foi feito:
  - `git status -sb` limpo antes de começar.
  - Especificação lida: `docs/tasks/task-009-decide-mock-status.md`.
  - Mapeei todo uso de `mock` no escopo pedido:
    - `src/types/project.ts`, `src/types/admin.ts`, `src/types/github.ts`:
      `"mock"` é um membro dos unions de status.
    - `supabase/schema.sql`: `projects_status_check` e
      `github_repository_custom_status_check` permitem `'mock'`.
    - `design-project-form.tsx`/`dev-curation-form.tsx`: `<option
      value="mock">Mock</option>` nos selects admin.
    - `project-status-badge.tsx`: label "Mock" e cor de badge (amarelo).
  - Confirmei em `src/lib/design-projects.ts` e
    `src/lib/dev-repositories.ts` que as únicas fontes de dados públicas
    filtram exclusivamente `status`/`custom_status = 'published'` — um
    valor `mock` não pode alcançar o público hoje, por construção da
    query, não por convenção.
  - Decisão registrada em `docs/decisions.md` (DEC-006): **manter** `mock`
    no schema/tipos/UI admin por enquanto, sem remover ou migrar nesta
    tarefa. Motivo: risco público já é zero (estrutural), e remover
    exigiria migração real em Supabase de produção (checar linhas
    existentes com `status/custom_status = 'mock'` antes de estreitar a
    constraint) — esta sessão não tem acesso ao banco de produção para
    fazer essa verificação com segurança, e a tarefa proíbe migração
    destrutiva sem necessidade clara.
  - Incluí em DEC-006 um plano de migração SQL completo (checagem
    read-only → reatribuição para `draft` → `ALTER TABLE`/`DROP
    CONSTRAINT`/`ADD CONSTRAINT`), **não executado**, para uma tarefa
    futura que decida remover `mock` de fato.
  - Não alterei nenhum tipo, componente, Server Action ou schema — a
    decisão foi manter o estado atual.
  - **Correção de um problema apontado pela revisão Codex**: minha
    primeira versão do DEC-006 dizia que o default da coluna continuava
    `'draft'` para as duas tabelas; na verdade, `projects.status` tem
    default `'draft'`, mas `github_repository_curations.custom_status`
    tem default `'published'` (confirmado em `supabase/schema.sql:143`).
    Corrigido o texto para não confundir uma limpeza/migração futura.
- Decisões técnicas:
  - Não toquei em `src/lib/data-source.ts` (sinalizado como código morto
    na TASK-008) — está fora do escopo desta tarefa também, já que essa
    decisão é sobre o status `mock`, não sobre arquivos de referência
    locais não utilizados.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `/codex:review --background` (2 rodadas: a primeira encontrou 1
    problema P3, corrigido; a segunda não encontrou problemas).
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 18 rotas geradas (mudança
    é só documentação, sem impacto em código).
  - Codex review (1ª rodada): achado P3 sobre o default incorreto de
    `custom_status`. Corrigido.
  - Codex review (2ª rodada): nenhum problema encontrado.
- Problemas encontrados:
  - Nenhum problema de segurança ou exposição pública relacionado a
    `mock`. 1 imprecisão factual cometida por mim mesmo no primeiro
    rascunho da decisão, corrigida na mesma sessão.
- Pendências:
  - Se uma tarefa futura decidir remover `mock` de fato, seguir o plano
    SQL registrado em DEC-006 (`docs/decisions.md`), incluindo a checagem
    read-only obrigatória antes de qualquer `UPDATE`/`ALTER TABLE` em
    produção.
- Riscos:
  - Baixo. Nenhuma mudança de código/schema foi feita; a decisão foi
    documental, com um plano de migração explícito para o futuro caso
    necessário.
- Revisão pedida ao ChatGPT:
  - Confirmar se a decisão de manter `mock` por enquanto (em vez de
    remover agora) é aceitável, ou se preferem priorizar a remoção numa
    tarefa dedicada com acesso ao Supabase de produção.

## Último Handoff — TASK-008

- Status: pronto para revisão.
- Arquivos alterados:
  - `README.md`
  - `docs/architecture.md`
  - `docs/requirements.md`
  - `docs/roadmap.md`
  - `docs/performance-checklist.md`
  - `supabase/README.md`
  - `docs/prompts-log.md` (fora da lista original da tarefa, mas
    qualifica como "outro documento que confunda estado atual com
    histórico antigo").
  - `docs/handoff.md`, `docs/backlog.md`, `docs/project-status.md`.
- O que foi feito:
  - `git status -sb` limpo antes de começar.
  - Especificação lida: `docs/tasks/task-008-clean-legacy-mock-docs.md`.
  - Li os 6 documentos do escopo por completo. Todos seguem o mesmo
    padrão: changelog "Atualização Prompt N" em ordem cronológica
    reversa (mais recente primeiro), com seções antigas contendo
    afirmações como "a exibição pública continua usando mocks" que
    **já foram superadas** por TASK-001–007, mas nada no texto avisava
    disso a um agente lendo fora de ordem.
  - Também chequei `docs/decisions.md` e `docs/design-system.md`
    (mencionados como candidatos a "outros documentos"): ambos já
    afirmam a regra atual corretamente (`DEC-005` e a nota de
    "textos públicos não devem expor mock/fallback/placeholder"), sem
    necessidade de alteração.
  - Correção aplicada (sem apagar nenhum conteúdo histórico):
    - Adicionei um aviso curto no topo de cada um dos 6 arquivos do
      escopo + `docs/prompts-log.md`, explicando que as seções
      "Atualização Prompt N"/"Prompt N" são changelog histórico, não
      instrução ativa, e apontando para `docs/project-status.md`/
      `docs/backlog.md`/`docs/handoff.md` como fonte do estado atual.
    - Adicionei notas inline curtas ("histórico, superado: ...") logo
      depois das frases mais enganosas que afirmavam mock como fonte
      pública atual (README, architecture.md, requirements.md), sem
      remover a frase original.
    - Em `docs/performance-checklist.md`, anotei que a pendência de
      "imagem Open Graph final" já foi resolvida na TASK-006.
    - No README, corrigi também a linha `/login: placeholder do futuro
      login` (login é real desde a Fase 11) e a seção
      "Objetivo/Stack planejada/Status atual" (snapshot da Fase 1, que
      chamava Supabase/Vercel/GitHub API de "etapa futura").
  - **Correção de um problema apontado pela revisão Codex**: minha
    primeira versão do aviso no README dizia "tudo abaixo desta linha é
    histórico", mas isso incluía seções ainda válidas e ativas (Como
    instalar, Como rodar em dev/lint/build, Integração GitHub, Projetos
    individuais, Estrutura de rotas, Desenvolvimento com Codex,
    Repositório) intercaladas com o changelog. Reescrevi o aviso para
    citar especificamente que só as seções "Revisão final antes do
    deploy" e "Atualização Prompt N" são histórico, e que as demais
    seções continuam válidas — corrigindo a violação da restrição "não
    apagar/invalidar instruções ainda válidas".
  - Não toquei em `docs/automation.md` (loop PowerShell separado, sem
    menção a mock, fora do escopo desta tarefa — é mais um tema de
    TASK-015).
  - Não apaguei nenhuma linha histórica; toda correção foi aditiva
    (avisos + notas inline).
  - Não alterei nenhum arquivo de código.
- Decisões técnicas:
  - Optei por avisos/notas inline em vez de reescrever ou apagar as
    seções antigas, conforme a restrição explícita "não apagar histórico
    útil sem substituição clara".
  - Não removi `src/lib/data-source.ts` (código morto, não importado por
    nada) porque a tarefa proíbe alterar código; deixei anotado nos docs
    e sinalizo como candidato de limpeza para TASK-009 (destino do status
    `mock`) ou uma tarefa de code cleanup futura.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `/codex:review --background` (2 rodadas: a primeira encontrou 1
    problema P2, corrigido; a segunda não encontrou problemas).
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 18 rotas geradas (mudança
    é só documentação, sem impacto em rotas).
  - Codex review (1ª rodada): 1 achado P2 — aviso do README rotulava
    seções ativas como histórico. Corrigido.
  - Codex review (2ª rodada): nenhum problema encontrado.
- Problemas encontrados:
  - Diversas afirmações desatualizadas sobre "mock" como fonte pública
    atual, espalhadas em 6+ documentos. Todas anotadas como históricas.
  - 1 erro cometido por mim mesmo (aviso do README overreaching) e
    corrigido na mesma sessão após revisão Codex.
- Pendências:
  - `src/lib/data-source.ts` é código morto (não importado); não removido
    por estar fora do escopo desta tarefa (não alterar código). Sinalizar
    para TASK-009 ou uma tarefa de limpeza de código.
  - `docs/automation.md` descreve um loop PowerShell separado do loop
    `/codex:review` usado neste protocolo; não fica claro qual é a fonte
    de verdade para automação — possível tema para TASK-015, não tratado
    aqui.
- Riscos:
  - Baixo. Mudança 100% documental e aditiva; nenhuma linha histórica foi
    removida; corrigida por revisão Codex antes de finalizar.
- Revisão pedida ao ChatGPT:
  - Confirmar se o nível de detalhe dos avisos/notas é suficiente ou se
    preferem uma reescrita mais agressiva de algum desses documentos.
  - Decidir se `src/lib/data-source.ts` deve ser removido em uma tarefa
    futura (TASK-009 ou nova tarefa de cleanup).
  - Decidir se `docs/automation.md` deve ser arquivado/atualizado para
    não conflitar com `docs/claude-codex-continuous-loop.md`.

## Último Handoff — TASK-007

- Status: pronto para revisão.
- Arquivos alterados:
  - `src/components/dev/github-preview-section.tsx` (id do `<section>`
    corrigido).
  - `docs/handoff.md`, `docs/backlog.md`, `docs/project-status.md`.
- O que foi feito:
  - `git status -sb` limpo antes de começar.
  - Especificação lida: `docs/tasks/task-007-broken-links-check.md`.
  - Verifiquei navegação (`siteConfig.mainNav`, `restrictedNav`, rodapé):
    todas as rotas (`/`, `/design`, `/dev`, `/contato`, `/admin`) existem.
  - Verifiquei todos os `href="/..."` internos em `src/components` e
    `src/app` (grep manual): nenhum aponta para rota inexistente ou com
    erro de digitação.
  - **Achado objetivo**: o botão "Ver projetos Dev" em `DevHeroSection`
    usa `href="#projetos-dev"`, mas nenhum elemento tinha
    `id="projetos-dev"` — a seção real de projetos Dev
    (`GithubPreviewSection`) usava `id="github"`, sem nenhuma outra
    referência a `#github` no código. Ou seja, o link âncora não levava a
    lugar nenhum (o padrão em Design/`#projetos-design` funciona
    corretamente, o de Dev não).
  - Corrigido: renomeei o `id` de `"github"` para `"projetos-dev"` em
    `src/components/dev/github-preview-section.tsx`, alinhando com o
    padrão já usado em Design (`#projetos-design` → seção com
    `id="projetos-design"`) e Home (`#projetos` → `id="projetos"`).
    Confirmei por grep que nenhuma outra parte do código referenciava
    `#github` antes de renomear.
  - Verifiquei `target="_blank"`: as duas ocorrências
    (`GitHubRepositoryCard`, `ProjectLinksSection`) já usam
    `rel="noreferrer"`. Correto.
  - Verifiquei links de contato (`ContactLinkCard`/`getPublicContactLinks`
    em `src/lib/public-profile.ts`): GitHub/LinkedIn/WhatsApp/
    Behance/Instagram só renderizam se houver valor real vindo do
    Supabase (perfil ou `contact_links`); nada hardcoded ou fictício no
    código. `rel`/`target` já condicionais a `link.external`.
  - Verifiquei `BehancePreviewSection`: é um placeholder intencional
    (`<span aria-disabled="true">Novos materiais em breve</span>`, sem
    `href`), não um link quebrado — consistente com "Behance real fica
    para próximas etapas" já documentado no admin.
  - Verifiquei `sitemap.ts`: só lista `publicRoutes` + slugs de projetos
    Design reais (`getPublicDesignProjects`), sem URLs inventadas.
- Decisões técnicas:
  - Não pude validar ao vivo se as URLs reais de GitHub/LinkedIn/WhatsApp/
    Behance cadastradas no Supabase de produção realmente resolvem (200),
    porque isso exigiria acesso à base de dados de produção, que esta
    sessão não tem e não deve simular/inventar. Ver pendência abaixo.
  - Não alterei nenhum dado real, apenas o `id` de um elemento HTML
    (correção de bug, sem efeito visual).
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `/codex:review --background`.
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 18 rotas geradas (sem
    mudança na lista, é uma correção de `id` interno).
  - Codex review: nenhum problema bloqueante encontrado; confirmou que o
    `id` da seção agora corresponde ao alvo do link já existente na
    página.
- Problemas encontrados:
  - 1 link interno quebrado (âncora `#projetos-dev` sem alvo). Corrigido.
- Pendências:
  - Validar manualmente (ou via `/api/site/health`/`/api/supabase/health`
    em produção, ou navegador) se os links reais de GitHub, LinkedIn,
    WhatsApp e Behance cadastrados no Supabase de produção resolvem sem
    erro 404/erro de DNS. Esta sessão não tem acesso à base de produção
    para checar valores reais.
- Riscos:
  - Baixo. Mudança de uma linha (renomear um `id` de `<section>`), sem
    alteração de conteúdo visível, validada por build e revisão Codex.
- Revisão pedida ao ChatGPT:
  - Confirmar se a correção do `id` (`github` → `projetos-dev`) é
    aceitável ou se preferem manter `id="github"` e corrigir o `href` do
    botão em vez disso (resultado visual é idêntico; só muda qual arquivo
    foi tocado).
  - Decidir se vale abrir uma tarefa/pendência específica para validar os
    links reais de redes sociais em produção.

## Último Handoff — TASK-006

- Status: pronto para revisão.
- Arquivos alterados:
  - `src/app/og/route.tsx` (novo).
  - `src/config/site.ts` (`ogImage` atualizado).
  - `docs/handoff.md`, `docs/backlog.md`, `docs/project-status.md`.
- O que foi feito:
  - `git status -sb` limpo antes de começar.
  - Especificação lida: `docs/tasks/task-006-seo-sharing-audit.md`.
  - Auditoria do estado atual de SEO/compartilhamento:
    - `robots.ts`: `disallow` cobre `siteConfig.noIndexRoutes`
      (`/admin`, `/login`, `/api`) e aponta `sitemap` para `/sitemap.xml`.
      Correto.
    - `sitemap.ts`: gera apenas `siteConfig.publicRoutes` (`/`, `/design`,
      `/dev`, `/contato`) + slugs de projetos Design públicos. Não inclui
      `/admin`/`/login`/`/api`. Correto.
    - Metadata por rota (`createPageMetadata`): `/`, `/design`, `/dev`,
      `/contato` e `/projetos/[slug]` têm title/description/canonical
      próprios via `absoluteUrl`. Todas as páginas `/admin/*` e `/login`
      usam `noIndexMetadata` (`robots: { index: false, follow: false }`).
      Correto.
    - Open Graph/Twitter Card: já configurados em `createPageMetadata`
      (`summary_large_image`, título, descrição, imagem).
    - JSON-LD: `Person` em `/contato`, `CreativeWork` em
      `/projetos/[slug]`. Presentes.
    - `manifest.webmanifest`: nome, short_name, description, cores e
      `lang="pt-BR"` corretos; sem `icons` explícito, mas `favicon.ico`
      já existe via convenção do App Router — não é um problema objetivo
      dentro do escopo desta tarefa.
    - **Achado objetivo**: `siteConfig.ogImage` apontava para
      `/window.svg` — o ícone padrão gerado pelo `create-next-app`,
      não uma imagem de compartilhamento real. Isso é usado como
      `og:image`/`twitter:image` em toda página que não tem capa própria
      (home, `/design`, `/dev`, `/contato`).
  - Correção aplicada: criei `src/app/og/route.tsx`, um Route Handler que
    usa `ImageResponse` de `next/og` (já incluso no Next.js, nenhuma
    dependência nova) para gerar uma imagem 1200x630 PNG on-brand
    (fundo `#0f0f0f`, badges "DESIGN"/"DEV" com as cores de acento
    `#ffd84d`/`#39ff88`, nome e tagline do site). Atualizei
    `siteConfig.ogImage` de `/window.svg` para `/og`.
  - Decisão de path: coloquei a rota em `/og` (não em `/api/og`) de
    propósito, porque `robots.ts` bloqueia todo o prefixo `/api` via
    `siteConfig.noIndexRoutes`; um `og:image` sob `/api` correria o risco
    de ser recusado por crawlers que respeitam `robots.txt` também para
    fetch de imagem, quebrando o preview de compartilhamento. `/og` não
    cai em nenhuma regra de `disallow` nem aparece no sitemap (que só lista
    `publicRoutes` + slugs de projeto), então fica acessível para
    crawlers de social sem virar uma página indexável.
  - Testado localmente: subi `npm.cmd run dev`, fiz `curl` em
    `http://localhost:3000/og` → HTTP 200, `Content-Type: image/png`,
    imagem 1200x630 válida (verifiquei abrindo o PNG). Encerrei o processo
    ao final.
  - Efeito colateral de novo: `next dev` reescreveu o bloco automático em
    `AGENTS.md` (mesmo comportamento documentado em TASK-004); revertido
    de novo com `git checkout -- AGENTS.md` antes de seguir.
- Decisões técnicas:
  - Não criei `icons` no manifest nem novo favicon: `favicon.ico` já existe
    e não está nos critérios de aceite da tarefa; registrando como possível
    melhoria futura, não como bug.
  - Não toquei em domínio, Search Console ou qualquer conta externa (isso é
    escopo de TASK-012).
  - Não alterei identidade visual das páginas, só adicionei um recurso de
    imagem gerada programaticamente.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - Teste manual via `curl` na rota `/og` gerada.
  - `/codex:review --background`.
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 18 rotas geradas (nova rota
    `/og` dinâmica).
  - `/og`: HTTP 200, PNG 1200x630 válido.
  - Codex review: nenhum problema de correção, segurança ou manutenção
    encontrado.
- Problemas encontrados:
  - 1 problema objetivo: imagem OG placeholder (`/window.svg`). Corrigido.
- Pendências:
  - Nenhuma pendência bloqueante. Melhoria futura opcional: adicionar
    `icons` explícitos no `manifest.ts` (192x192/512x512) se quiser suporte
    PWA mais completo — fora do escopo desta tarefa.
- Riscos:
  - Baixo. Mudança aditiva (nova rota, uma linha de config), sem alteração
    de rotas existentes, sem novas dependências, validada por build e teste
    manual da imagem gerada.
- Revisão pedida ao ChatGPT:
  - Confirmar se a nova imagem OG gerada (`/og`) está no padrão visual
    esperado (posso ajustar cores/layout se pedido).
  - Decidir se vale abrir uma tarefa futura para `icons` no manifest.

## Último Handoff — TASK-005

- Status: pronto para revisão.
- Arquivos alterados:
  - Nenhum arquivo de código. Apenas `docs/handoff.md` (este registro);
    `docs/backlog.md` e `docs/project-status.md` serão atualizados em
    seguida, como de costume no loop.
- O que foi feito:
  - `git status -sb` limpo antes de começar.
  - Especificação lida: `docs/tasks/task-005-accessibility-basic-audit.md`.
  - Auditoria de código (sem navegador; ver limitação já registrada em
    TASK-004) cobrindo o escopo pedido:
    - Landmarks: `src/app/layout.tsx` define `lang="pt-BR"`;
      `SiteShell` usa `<header>`, `<main>` e `<footer>` semânticos; nav
      principal e nav do rodapé têm `aria-label`.
    - Foco visível: `globals.css` define `:focus-visible { outline: 4px
      solid var(--color-dev); outline-offset: 4px; }` globalmente, aplicado
      de forma consistente (inputs/textareas/selects também usam
      `focus-visible:ring-4` nos formulários admin).
    - Labels de formulário: revisado `LoginForm`, `ProfileForm`,
      `DevCurationForm`, `DesignProjectForm`, `ImageUploadField` — todo
      input/textarea/select usa `<label htmlFor>` + `id` correspondente;
      checkboxes ficam envolvidos pelo próprio `<label>` com texto
      (“Visível no site”, “Destacar projeto”); campos obrigatórios usam o
      atributo nativo `required` (accessible por padrão em leitores de tela).
    - Texto alternativo: todo uso de `<img>`/`ResponsiveImage` no client
      recebe `alt` descritivo (`alt` é prop obrigatória no tipo de
      `ResponsiveImage`); nenhuma imagem com `alt=""` genérico ou ausente
      encontrada.
    - Contraste: calculei manualmente a razão de contraste (WCAG) dos pares
      de token mais usados em `globals.css`: texto `--muted-foreground`
      (#a8a29a) sobre `--background` (#0f0f0f) ≈ 7.6:1; texto principal
      (#f7f3e8) sobre `--muted` (#2e2e2e) ≈ 12.3:1; texto `#111111` sobre
      accent design (#ffd84d) e dev (#39ff88) é muito alto contraste. Todos
      acima do mínimo AA (4.5:1) para texto normal.
    - Estado sem depender só de cor: badges de status em
      `DevRepositoryAdminCard`, `AdminOverviewCards` e
      `DesignProjectForm`/`DevCurationForm` sempre combinam cor com texto
      (“Visível”/“Oculto”, “Configurado”/“Não configurado”,
      “Funcional”/“Pendente”), nunca só cor.
    - Navegação por teclado: nenhum elemento interativo usa `onClick` em
      `div`/`span` sem semântica (`grep` não encontrou `onClick=` em todo
      `src/`); todos os controles usam `<button>`, `<Link>`/`<a>`, `<input>`
      ou `<select>` nativos, que já recebem foco e ativação por teclado
      nativamente. Nenhum ícone isolado sem texto/rótulo foi encontrado como
      botão interativo (`lucide-react` só aparece ao lado de rótulos de
      texto em `design-tools-section.tsx`/`tech-stack-section.tsx`).
  - Nenhum problema objetivo de acessibilidade foi encontrado nos critérios
    de aceite da tarefa. Não houve, portanto, alteração de código.
- Decisões técnicas:
  - Não adicionei um link "pular para o conteúdo" (skip link): é uma boa
    prática comum, mas não está nos critérios de aceite desta tarefa nem
    corrige um problema existente — registrando como sugestão de melhoria
    futura, não como bug.
  - Não alterei identidade visual, não criei features novas e não toquei em
    Supabase/Auth/Storage/secrets.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `/codex:review --background`.
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 17 rotas geradas.
- Problemas encontrados:
  - Nenhum problema objetivo de acessibilidade básica encontrado no código
    revisado.
- Pendências:
  - Assim como em TASK-004, esta auditoria foi feita por leitura de código,
    não por teste real com leitor de tela (NVDA/VoiceOver) ou navegação por
    teclado ao vivo. Recomenda-se uma passada manual quando conveniente,
    especialmente nas páginas `/admin/projetos/design` e
    `/admin/projetos/dev`, que têm formulários mais longos.
  - Sugestão não bloqueante: considerar um "skip to content" link no
    `SiteShell` em uma tarefa futura de acessibilidade avançada.
- Riscos:
  - Baixo. Nenhuma mudança de código foi feita.
- Revisão pedida ao ChatGPT:
  - Confirmar se a auditoria de código (sem leitor de tela real) é suficiente
    para aprovar TASK-005 ou se é necessária verificação manual adicional.

## Último Handoff — TASK-004

- Status: pronto para revisão.
- Arquivos alterados:
  - Nenhum arquivo de código. Apenas `docs/handoff.md` (este registro).
    `docs/backlog.md` e `docs/project-status.md` serão atualizados em seguida,
    como parte do procedimento padrão do loop (passos 13-14), mas ainda não
    estavam alterados no momento em que a revisão Codex rodou (achado P3
    corrigido aqui).
- O que foi feito:
  - `git status -sb` limpo antes de começar (`## main...origin/main`).
  - Especificação lida: `docs/tasks/task-004-visual-responsive-check.md`.
  - Tentei usar a skill `claude-in-chrome` para navegar e capturar screenshots
    reais nos viewports pedidos (360x740, 430x932, 768x1024, 1366x768,
    1440x900). A extensão não está conectada nesta sessão (usuário optou por
    não usar); sem navegador real disponível. Não há Playwright instalado no
    projeto (isso é escopo da TASK-010, não desta).
  - Diante disso, registrei a limitação e fiz uma auditoria estrutural/código
    (não visual) das rotas e componentes listados na especificação, como
    aproximação razoável ao objetivo da tarefa:
    - Subi o servidor local (`npm.cmd run dev`) e confirmei HTTP 200 em `/`
      via `curl`, só para validar que a árvore de componentes renderiza sem
      erro de servidor; encerrei o processo ao final.
    - Revisei `src/app/globals.css`: `.brutal-section` usa
      `width: min(100% - 2rem, 72rem)`, garantindo margem mínima de 2rem e
      sem overflow horizontal por essa regra.
    - Revisei `Container` (`max-w-7xl` + `px-4 sm:px-6 lg:px-8`), `SiteHeader`
      e `ModeSwitcher`: navegação usa `flex-wrap`/`w-full sm:w-auto`, sem
      largura fixa que quebre em 360px; links quebram em várias linhas em
      vez de cortar horizontalmente.
    - Revisei `SiteFooter`: grid `md:grid-cols-[1.2fr_1fr_1fr]` (1 coluna até
      `md`), links em `flex-wrap`.
    - Procurei por padrões de risco em todo `src/`: `grid-cols-N` fixo sem
      prefixo responsivo, `whitespace-nowrap`, larguras fixas em `px`/`w-[…]`.
      Encontrei 3 grids fixos (`design-hero-section.tsx` 3 colunas,
      `dev-hero-section.tsx` 4 colunas, `github-repository-card.tsx` 2
      colunas) — todos contêm apenas blocos decorativos vazios ou rótulos
      curtos ("Stars: N"/"Forks: N"), sem risco real de overflow em 360px.
    - Revisei `HeroSection` (home), `DesignHeroSection`, `DevHeroSection`,
      `ProjectDetailsSidebar`, páginas `/contato` e `/login`: textos usam
      `max-w-*` + `text-balance` + tamanhos responsivos (`sm:`/`lg:`), tags e
      badges usam `flex-wrap`, imagem (`ResponsiveImage`) sempre recebe
      `w-full`/`max-w-[75%]` do container, nunca largura fixa maior que a
      tela.
    - Nenhum problema objetivo de clipping, sobreposição ou largura fixa
      quebrando em mobile foi encontrado nos arquivos revisados.
  - Como nenhum bug objetivo foi encontrado, não houve alteração de código
    nesta tarefa.
  - Efeito colateral detectado e revertido: rodar `npm.cmd run dev`
    localmente fez o Next.js 16.3.3 anexar automaticamente um bloco
    `<!-- BEGIN:nextjs-agent-rules -->` em `AGENTS.md` (feature nativa do
    `next dev`, desativável via `agentRules: false` em `next.config.ts`).
    Isso não tem relação com a tarefa, então revertido com
    `git checkout -- AGENTS.md` antes de seguir. Registrando aqui para que
    sessões futuras não estranhem esse comportamento ao rodar `next dev`.
- Decisões técnicas:
  - Não instalei Playwright nem qualquer dependência nova só para esta
    tarefa (fora de escopo; TASK-010 trata disso explicitamente).
  - Não alterei a direção visual nem criei novas seções/features.
  - Não toquei em Supabase, Auth, Storage, schema, dados reais ou secrets.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `/codex:review --background` (ver resultado abaixo/registro seguinte).
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 17 rotas geradas.
- Problemas encontrados:
  - Nenhum problema objetivo de layout/responsividade encontrado na revisão
    de código. Ver limitação abaixo.
- Pendências:
  - Esta tarefa **não incluiu verificação visual real em navegador** (sem
    Claude in Chrome conectado, sem Playwright). Recomendo uma passada manual
    rápida do usuário nas rotas/viewports da especificação quando conveniente,
    já que revisão estática de código não substitui 100% o rendering real
    (métricas de fonte, imagens reais, comportamento de navegador).
  - Rotas verificadas apenas por código-fonte, não por rendering real:
    `/`, `/design`, `/dev`, `/contato`, `/login`,
    `/projetos/bacanal-da-dionisios`, `/projetos/jequitimuu-identidade-visual`,
    `/projetos/xi-sintegra-tecnologia`.
- Riscos:
  - Baixo-médio. Nenhuma mudança de código foi feita (risco de regressão
    zero), mas a cobertura de verificação é menor que o pedido original
    (visual real) por falta de ferramenta de navegador nesta sessão.
- Revisão pedida ao ChatGPT:
  - Decidir se a auditoria estrutural/código é suficiente para aprovar
    TASK-004 ou se é necessária uma rodada com verificação visual real
    (navegador do usuário ou Playwright via TASK-010 adiantada).

## Revisão ChatGPT/Codex — Fechamento TASK-002 e TASK-003

- Status: aprovadas.
- Confirmações recebidas do usuário para TASK-002:
  - Vercel Production está tudo ok.
  - Commit mais recente em produção confirmado:
    `04e0e9dbf5e2dc9b566ca26b57019defdcbeb238`.
  - Variáveis Production conferidas no painel da Vercel, incluindo chaves
    públicas, admin/server-side e GitHub.
  - Login admin em produção, rotas administrativas e Console do navegador:
    tudo ok.
- Revisão ChatGPT/Codex:
  - TASK-002 pode ser aprovada. As pendências manuais registradas foram
    satisfeitas pelo usuário e as validações automatizáveis já tinham passado:
    rotas públicas HTTP 200, `/admin` HTTP 307 para `/login`, lint, build e
    audit.
  - TASK-003 também pode ser aprovada. Revalidei localmente que `.env.example`
    é o único `.env*` rastreado, que `SUPABASE_SECRET_KEY`,
    `SUPABASE_SERVICE_ROLE_KEY`, `GITHUB_TOKEN` e `ADMIN_EMAIL` aparecem
    apenas em helpers server-side ou `.env.example`, e que
    `npm.cmd audit --omit=dev` retorna 0 vulnerabilidades.
  - A revisão adversarial manual do plugin Codex continua útil antes de
    mudanças sensíveis, mas não bloqueia a aprovação de TASK-003 porque a
    revisão objetiva já encontrou e corrigiu a única imprecisão documental.
- Arquivos/documentação atualizados:
  - `docs/backlog.md`: TASK-002 e TASK-003 marcadas como concluídas; TASK-004
    definida como próxima tarefa recomendada.
  - `docs/project-status.md`: produção e auditoria de secrets registradas como
    resolvidas.
  - `docs/tasks/task-003-secrets-client-server-audit.md`: especificação formal
    criada retroativamente para manter o padrão do fluxo.
- Próxima ação:
  - Entregar TASK-004 ao Claude Code: teste visual e responsivo manual.

## Último Handoff — TASK-003

- Status: pronto para revisão.
- Arquivos alterados:
  - `docs/handoff.md` (este registro e correção de uma afirmação incorreta no
    bloco anterior de TASK-002, apontada pela revisão Codex).
- O que foi feito:
  - `git status -sb` mostrou apenas `docs/handoff.md` modificado (bloco de
    TASK-002 já registrado, não commitado, de sessão anterior). Não é uma
    mudança de código nem conflita com esta tarefa, então segui em frente sem
    bloquear, e preservei o conteúdo existente.
  - Não existe `docs/tasks/task-003-*.md`. Só há especificação formal para
    TASK-001 e TASK-002. Usei a descrição do próprio `docs/backlog.md` como
    escopo: "confirmar que tokens Supabase/GitHub não entram no client
    bundle, endpoints não retornam dados sensíveis e `.env*` segue
    protegido."
  - TASK-002 continua com os mesmos bloqueios de sessões anteriores (acesso
    ao dashboard da Vercel, login admin real, DevTools em navegador) — nada
    mudou que esta sessão pudesse resolver, então não tentei reexecutá-la e
    segui para TASK-003, que é totalmente auditável sem acesso externo.
  - Auditoria de secrets/exposição client-server (leitura de código, sem
    alterações):
    - `.gitignore` cobre `.env*` com exceção explícita de `.env.example`;
      `.env.local` existe localmente mas não está rastreado
      (`git ls-files` só lista `.env.example`).
    - `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GITHUB_TOKEN` e
      `ADMIN_EMAIL` só são lidos em `src/lib/supabase/env.ts`,
      `src/lib/auth/admin.ts` e `src/lib/github.ts` — nenhum arquivo
      `"use client"` (`login-form.tsx`, `site-header.tsx`,
      `mode-switcher.tsx`, `ui/separator.tsx`) referencia essas variáveis.
    - `src/lib/supabase/admin.ts` e `src/lib/supabase/public.ts` têm
      `import "server-only"`, impedindo bundling acidental no client.
    - `src/lib/supabase/client.ts` (browser client) só usa a chave
      pública/publishable via `requireSupabasePublicEnv()` — e hoje não está
      sequer importado por nenhum componente (código não utilizado
      atualmente, não é um risco de exposição real).
    - `next.config.ts` não tem `env`/passthrough customizado, então só
      `NEXT_PUBLIC_*` é inlined no client (comportamento padrão do Next).
    - Todas as rotas de health (`/api/site/health`, `/api/supabase/health`,
      `/api/auth/status`, `/api/admin/health`,
      `/api/admin/projects/{design,dev}/health`, `/api/admin/storage/health`)
      só retornam booleanos/contagens/timestamps, nunca valores de secret.
    - Todas as Server Actions administrativas em `src/app/admin/actions/*.ts`
      chamam `requireAdmin()`/`ensureAdminAction()` e fazem `redirect` para
      `/login` quando não é admin, antes de qualquer escrita.
    - `src/lib/storage/media.ts` já valida path traversal (rejeita `..`,
      `/` inicial e `\`) e tipo/tamanho de arquivo (`validateImageFile`)
      antes de upload/delete no Storage.
    - Nenhuma string com formato de credencial (`eyJ...`, `ghp_...`, `sk-...`,
      `AKIA...`) encontrada em `src/`.
  - Considerei adicionar `import "server-only"` também em
    `src/lib/supabase/env.ts`, mas essa mudança quebraria o uso futuro
    pretendido de `client.ts` (que precisa da função pública do mesmo
    módulo) e não corrige nenhum problema hoje existente — decidi não fazer
    essa alteração especulativa, por não ser um "problema objetivo
    encontrado".
  - Revisão Codex objetiva (`/codex:review --background`) rodou sobre a
    working tree e encontrou 1 achado real (P2): o bloco de handoff de
    TASK-002 (linhas ~46-50, já existente antes desta sessão) afirmava que os
    endpoints de health "confirmam presença e funcionamento" da chave
    admin do Supabase e do `GITHUB_TOKEN`, quando na verdade
    `/api/supabase/health` só confirma que a env não está vazia (não que a
    chave é válida), e `/api/github/repositories` responde 200 mesmo sem
    `GITHUB_TOKEN` (repositórios públicos não exigem token). Corrigi o texto
    desse bloco e adicionei a pendência correspondente.
  - Revisão adversarial (`/codex:adversarial-review`, foco em segurança,
    regressão e dados reais): **não executada nesta sessão**. Essa skill tem
    `disable-model-invocation` e só pode ser disparada pelo usuário
    diretamente, não por mim. Pedi ao usuário para rodá-la.
- Decisões técnicas:
  - Tratei TASK-003 como tarefa de auditoria/confirmação (conforme o próprio
    backlog descreve), não de mudança de código. Como nenhum problema
    objetivo de exposição de secrets foi encontrado, não houve diff de
    código — só a correção textual no handoff apontada pela revisão Codex.
  - Não criei `docs/tasks/task-003-*.md` (não é papel do Claude Code criar
    especificação; isso é responsabilidade do ChatGPT/Codex conforme
    `AGENTS.md`), apenas registrei que a especificação formal está ausente.
- Testes executados:
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd audit --omit=dev`
  - `/codex:review --background` (revisão objetiva do working tree).
- Resultado dos testes:
  - Lint: sem erros/avisos.
  - Build: sucesso (Next.js 16.3.3, Turbopack), 17 rotas geradas, mesma lista
    das tarefas anteriores.
  - Audit: 0 vulnerabilidades.
  - Codex review: 1 achado P2 (ver acima), corrigido nesta mesma sessão.
- Problemas encontrados:
  - Nenhuma exposição objetiva de secrets no client bundle, em endpoints ou
    em Server Actions.
  - 1 imprecisão factual no handoff de TASK-002 (corrigida).
- Pendências:
  - Rodar `/codex:adversarial-review` focado em segurança, regressão e dados
    reais (o usuário precisa disparar; não posso fazer por eles).
  - Criar `docs/tasks/task-003-*.md` formal, se o ChatGPT quiser manter o
    padrão de especificação por arquivo para tarefas futuras.
  - Validar `SUPABASE_SECRET_KEY`/`SUPABASE_SERVICE_ROLE_KEY` e
    `GITHUB_TOKEN` em Production (pendência já registrada no bloco de
    TASK-002 corrigido acima).
  - TASK-002 continua bloqueada pelos mesmos motivos de sessões anteriores
    (acesso à Vercel, login admin real, DevTools) — nada resolvido aqui.
- Riscos:
  - Baixo. Nenhuma mudança de código foi feita; a única edição é textual em
    documentação, corrigindo uma afirmação que poderia levar a uma aprovação
    equivocada de TASK-002.
- Revisão pedida ao ChatGPT:
  - Confirmar se o escopo de auditoria adotado para TASK-003 (sem arquivo de
    especificação formal) é aceitável, ou se preferem que eu pare tarefas
    futuras sem spec em `docs/tasks/`.
  - Decidir se `docs/tasks/task-003-*.md` deve ser criado retroativamente.
  - Rodar (ou pedir ao usuário) `/codex:adversarial-review` para TASK-003,
    já que esta sessão não pôde disparar essa skill.
  - Revisar a correção textual aplicada ao bloco de TASK-002 e decidir se as
    pendências de validação de chave admin/GitHub token bloqueiam a aprovação
    dessa tarefa.

## Último Handoff — TASK-002

- Status: pronto para revisão (com pendências que exigem acesso fora desta sessão).
- Arquivos alterados:
  - `docs/handoff.md` (este registro).
- O que foi feito:
  - `git status -sb` confirmado limpo (`## main...origin/main`) antes de
    começar; HEAD local igual a `origin/main`
    (`04e0e9dbf5e2dc9b566ca26b57019defdcbeb238`), que já contém o bump de
    dependências da TASK-001 (`next` e `eslint-config-next` em `16.3.3` no
    `package.json` atual).
  - Rodado localmente com sucesso:
    - `npm.cmd run lint`: sem erros/avisos.
    - `npm.cmd audit --omit=dev`: 0 vulnerabilidades.
    - `npm.cmd run build`: build de produção concluído (Next.js 16.3.3,
      Turbopack), 17 rotas geradas, mesma lista da TASK-001.
  - Testada via HTTP a URL pública de produção informada pelo usuário
    (`https://poncell-portifolio.vercel.app/`):
    - `/` → 200
    - `/design` → 200 (título "Design | Gustavo Poncell", HTML ~93 KB, não é
      estado vazio)
    - `/dev` → 200 (título "Dev | Gustavo Poncell", HTML ~115 KB)
    - `/contato` → 200
    - `/login` → 200
    - `/sitemap.xml` → 200, `Content-Type: application/xml`
    - `/robots.txt` → 200, `Content-Type: text/plain; charset=utf-8`
    - `/admin` sem autenticação → **307** com `Location: /login` (protegido
      corretamente, sem seguir redirect automaticamente para confirmar o
      código HTTP real).
  - Checadas as rotas de health/status (sem imprimir nenhum segredo, apenas
    os campos booleanos/contagens que elas expõem por design):
    - `/api/site/health` → `{"ok":true,"siteUrlConfigured":true,
      "supabasePublicConfigured":true,"githubUsernameConfigured":true,
      "publicRoutes":4,"publicProjects":10}`
    - `/api/supabase/health` → `{"configured":true,"publicEnv":true,
      "adminEnv":true}`
    - `/api/auth/status` → `{"supabaseConfigured":true,
      "adminEmailConfigured":true,"authenticated":false,"isAdmin":false}`
    - `/api/github/repositories` → 200, retornando repositório real do
      GitHub (`gustavoponcell/portifolio`) com `pushedAt` recente, confirmando
      chamada real à API do GitHub (não mock).
  - Interpretação (corrigida após revisão Codex): os flags acima confirmam
    apenas **presença** (não vazio) em Production de `NEXT_PUBLIC_SITE_URL`,
    da chave pública do Supabase e de `ADMIN_EMAIL`, sem que nenhum valor de
    variável tenha sido lido ou escrito neste documento. `adminEnv: true` em
    `/api/supabase/health` só indica que `SUPABASE_SECRET_KEY` ou
    `SUPABASE_SERVICE_ROLE_KEY` está definida e não vazia — **não** confirma
    que a chave é válida ou funcional (isso exigiria uma escrita/leitura real
    autenticada, não feita aqui). `/api/github/repositories` retornar 200 com
    dados reais também **não** confirma presença de `GITHUB_TOKEN`, já que
    esse endpoint funciona sem token para repositórios públicos (rate limit
    menor, mas sem erro); `GITHUB_USERNAME` está confirmado por
    `githubUsernameConfigured: true`, mas `GITHUB_TOKEN` permanece não
    verificado por esta sessão.
  - `publicProjects: 10` e o tamanho real das páginas `/design` e `/dev`
    confirmam que dados públicos reais do Supabase/GitHub estão aparecendo em
    produção, não estados vazios nem mocks.
- Decisões técnicas:
  - Não tentei login admin nem manuseei credenciais reais — nesta sessão não
    tenho (e não devo obter) usuário/senha do Supabase; login administrativo
    continua exigindo teste manual pelo usuário.
  - Não acessei CLI/dashboard da Vercel (sem `.vercel/`, sem token
    autenticado nesta sessão), então não disparei redeploy nem confirmei
    literalmente o rótulo "Ready" na Vercel. Como o domínio já responde 200 em
    todas as rotas públicas com dados reais e HEAD local == `origin/main`, a
    inferência prática é de que o deploy Production está saudável e
    atualizado, mas isso não substitui a confirmação visual no dashboard.
  - Não usei navegador real, então não verifiquei o Console DevTools das
    páginas principais; validei apenas HTTP status, headers e tamanho/HTML
    retornado.
  - Não alterei código, schema, variáveis de ambiente ou domínio.
- Testes executados:
  - `npm.cmd run lint`, `npm.cmd audit --omit=dev`, `npm.cmd run build`
    (local).
  - Requisições HTTP (`curl`) contra a URL pública de produção para todas as
    rotas listadas nos critérios de aceite, mais as rotas de health/status e
    `/api/github/repositories`.
- Resultado dos testes:
  - Lint, audit e build: sem erros.
  - Todas as rotas públicas exigidas: HTTP 200.
  - `/admin`: HTTP 307 → `/login` (protegido).
  - Health/status endpoints: todos `ok`/`configured: true`, sem exposição de
    valores sensíveis no corpo da resposta.
- Problemas encontrados:
  - Nenhum erro HTTP, 404 ou falha de build/lint/audit encontrado.
- Pendências:
  - Confirmar manualmente no dashboard da Vercel que o deploy Production mais
    recente está com status "Ready" e corresponde ao commit
    `04e0e9dbf5e2dc9b566ca26b57019defdcbeb238` (não confirmável por esta
    sessão sem CLI/token da Vercel).
  - Testar login admin em produção com o usuário autorizado real (precisa ser
    feito por quem tem as credenciais; não deve ser feito por um agente de
    IA).
  - Verificar manualmente o Console do DevTools nas páginas principais em um
    navegador real (esta sessão não tem acesso a navegador).
  - Confirmar que `SUPABASE_SECRET_KEY`/`SUPABASE_SERVICE_ROLE_KEY` é válida
    (não só presente) e que `GITHUB_TOKEN` está de fato configurado em
    Production — nenhum dos dois foi provado por esta sessão (ver correção
    acima após revisão Codex).
- Riscos:
  - Baixo. Todas as validações automatizáveis sem credenciais/dashboard
    passaram. O risco residual é apenas não confirmado por falta de acesso a
    ferramentas específicas (Vercel dashboard/CLI e navegador), não por falha
    detectada.
- Revisão pedida ao ChatGPT:
  - Confirmar se as evidências indiretas de variáveis de ambiente (via
    `/api/site/health`, `/api/supabase/health`, `/api/auth/status`) são
    suficientes para o critério de aceite ou se ainda é necessária a
    confirmação manual no dashboard da Vercel.
  - Decidir se TASK-002 pode ser aprovada com as pendências de login manual e
    verificação de Console/DevTools delegadas ao usuário, ou se precisa de
    nova rodada.

## Revisão ChatGPT/Codex — Correção Do Loop TASK-002

- Status: correção aplicada, precisa reexecutar.
- Problema identificado:
  - `codex exec` passou a rodar sem `-a`, mas o Codex CLI imprime alguns avisos
    internos em `stderr`.
  - Como `scripts/agent-loop.ps1` usava `$ErrorActionPreference = "Stop"` junto
    de `2>&1 | Tee-Object`, o PowerShell tratou esses avisos como erro fatal
    antes de considerar o exit code real do Codex.
- Correção aplicada:
  - `Invoke-LoggedCommand` agora relaxa temporariamente o tratamento de
    `stderr`, grava stdout/stderr no log e só falha quando o exit code do
    comando for diferente de zero.
  - O modo padrão do Claude no loop passou de `acceptEdits` para `auto`, porque
    `acceptEdits` bloqueou comandos/WebFetch dentro do Claude.
  - `scripts/agent-loop.ps1` agora testa rotas públicas por HTTP quando
    `-ProductionUrl` é informado, reduzindo dependência de WebFetch dentro do
    Claude para TASK-002.
- Validação feita:
  - Parse do script PowerShell passou.
  - `git diff --check` passou.
- Próxima ação:
  - Reexecutar:
    `.\scripts\agent-loop.ps1 -TaskId TASK-002 -ProductionUrl "https://poncell-portifolio.vercel.app/" -MaxCycles 1 -MaxFixAttempts 1 -RunAudit -AutoCommit -AutoPush`.

## Revisão ChatGPT/Codex — TASK-002 Tentativa Automática

- Status: precisa de nova execução.
- Resultado:
  - Claude executou a tarefa, mas registrou bloqueio por falta de acesso direto
    à Vercel e por não receber URL pública de produção no prompt.
  - O próprio loop local conseguiu rodar depois:
    - `npm.cmd run lint`: passou.
    - `npm.cmd run build`: passou com Next.js `16.3.3` e 17 rotas geradas.
    - `npm.cmd audit --omit=dev`: 0 vulnerabilidades.
  - A revisão Codex não rodou por bug no script: a versão local do `codex exec`
    não aceita o argumento `-a`.
- Correção aplicada:
  - `scripts/agent-loop.ps1` deixou de usar `-a never` no `codex exec`.
  - O loop passou a aceitar `-ProductionUrl` para tarefas de deploy/produção.
- Próxima ação:
  - Reexecutar TASK-002 informando a URL pública de produção, por exemplo:
    `.\scripts\agent-loop.ps1 -TaskId TASK-002 -ProductionUrl "https://poncell-portifolio.vercel.app/" -MaxCycles 1 -MaxFixAttempts 1 -RunAudit -AutoCommit -AutoPush`.
  - Se ainda faltar acesso à Vercel Dashboard, aceitar que a validação de
    variáveis Production será manual/reportada pelo usuário; testes públicos
    podem ser feitos via URL.

## Último Handoff — TASK-002

- Status: bloqueado.
- Arquivos alterados:
  - `docs/handoff.md` (este registro).
- O que foi feito:
  - `git status -sb` confirmado limpo (`## main...origin/main`, sem mudanças
    pendentes) antes de iniciar.
  - Lidos `AGENTS.md`, `CLAUDE.md`, `docs/project-status.md`,
    `docs/backlog.md`, `docs/handoff.md` e a especificação da tarefa.
  - Verificado no repositório: não existe pasta `.vercel/` (projeto não está
    vinculado localmente via Vercel CLI), não há CLI da Vercel disponível
    nesta sessão, e nenhum arquivo do repositório (README, `docs/`,
    `src/config/site.ts`, `.env.example`) documenta a URL real de produção —
    `NEXT_PUBLIC_SITE_URL` aparece apenas como placeholder
    (`https://seu-dominio.com` / `http://localhost:3000`).
  - Tentativas de rodar `npm.cmd run lint` (via Bash e via PowerShell, com e
    sem `dangerouslyDisableSandbox`) foram recusadas nesta sessão com "This
    command requires approval", sem retorno de saída. Não foi possível
    executar lint/build/audit locais nesta sessão.
- Decisões técnicas:
  - Não tentei adivinhar ou construir uma URL de produção (proibido pelas
    instruções gerais: nunca gerar/adivinhar URLs).
  - Não tentei login admin nem qualquer teste de credenciais reais, pois não
    tenho acesso a usuário/senha do Supabase nem à conta/dashboard da Vercel
    nesta sessão — testar isso exigiria as credenciais reais, que não devem
    ser expostas ou manuseadas por mim.
  - Não alterei nenhum arquivo de código, configuração, schema ou variável de
    ambiente.
- Testes executados:
  - Apenas `git status -sb` (leitura). `npm.cmd run lint` / `run build` /
    `audit --omit=dev` foram tentados e bloqueados por aprovação nesta
    sessão (ver acima).
- Resultado dos testes:
  - Não disponível — comandos de validação local não puderam ser executados
    nesta sessão.
- Problemas encontrados:
  - Bloqueio 1: esta sessão não tem acesso ao dashboard/CLI da Vercel
    (sem `.vercel/`, sem `vercel` no PATH acessível, sem token). Não é
    possível confirmar presença das variáveis de ambiente em Production,
    nem disparar redeploy, nem checar status "Ready" do deploy.
  - Bloqueio 2: a URL final de produção não está documentada em nenhum
    arquivo do repositório. Preciso que ChatGPT/usuário informe a URL real
    (não vou adivinhar) para que rotas públicas possam ser checadas.
  - Bloqueio 3: comandos `npm.cmd run lint` / `run build` / `audit` foram
    recusados por aprovação nesta sessão, então nem a etapa local da tarefa
    pôde ser concluída.
  - Login admin em produção não foi testado (sem credenciais e sem acesso à
    URL real).
- Pendências:
  - Repetir `npm.cmd run lint`, `npm.cmd run build` e
    `npm.cmd audit --omit=dev` localmente em uma sessão/ambiente com
    permissão para executar esses comandos.
  - Usuário ou ChatGPT precisa fornecer: (a) acesso/CLI autenticado da Vercel
    ou confirmação manual das variáveis de Production, e (b) a URL final de
    produção, para que as rotas públicas, `/admin` e login possam ser
    validados.
  - Após obter acesso, refazer TASK-002 cobrindo os critérios de aceite ainda
    não verificados (deploy Ready, rotas públicas, redirecionamento
    `/admin`, login admin, console sem erros).
- Riscos:
  - Médio: TASK-002 é P0 (bloqueia produção) e permanece não validada. Não há
    confirmação de que o deploy atual da Vercel está saudável nem de que as
    variáveis de ambiente estão corretas.
- Revisão pedida ao ChatGPT:
  - Decidir como destravar acesso à Vercel (token/CLI vinculado ou validação
    manual reportada por texto) e informar a URL de produção real para a
    próxima tentativa.
  - Confirmar se comandos `npm.cmd` podem ser liberados nesta sessão/ambiente
    ou se a validação local deve ser feita em outro contexto.

## Revisão ChatGPT/Codex — TASK-001

- Status: aprovada.
- Revisão:
  - `package.json` alterou apenas `next` e `eslint-config-next` de `16.2.9`
    para `16.3.3`.
  - `package-lock.json` foi atualizado conforme o bump e a correção transitiva
    de dependências vulneráveis.
  - Não identifiquei alteração funcional fora do escopo da tarefa.
- Validação executada por ChatGPT/Codex:
  - `npm.cmd audit --omit=dev`: 0 vulnerabilidades.
  - `npm.cmd run lint`: passou.
  - `npm.cmd run build`: passou com 17 rotas geradas.
- Decisão:
  - TASK-001 concluída.
  - Próxima tarefa recomendada: TASK-002 — Validar deploy Vercel em produção.

## Último Handoff — TASK-001

- Status: pronto para revisão.
- Arquivos alterados:
  - `package.json`
  - `package-lock.json`
- O que foi feito:
  - Confirmado baseline com `npm audit --omit=dev`: 11 vulnerabilidades (2
    moderadas, 9 altas) em `@hono/node-server`, `hono`, `brace-expansion`,
    `fast-uri`, `ip-address`, `js-yaml`, `nanoid`, `undici`, `next`, `postcss`
    e `sharp`.
  - Rodado `npm audit fix` (sem `--force`): resolveu 8 das 11 vulnerabilidades
    dentro dos ranges já declarados (todas transitivas de `shadcn`, dependência
    de produção usada como CLI). Não houve mudança em `package.json` nesse
    passo, apenas no lockfile.
  - As 3 vulnerabilidades altas restantes (`next`, `postcss`, `sharp`) só
    tinham correção via `npm audit fix --force`, que instalaria
    `next@16.3.3`. Em vez de aceitar o force cegamente, atualizei
    explicitamente `next` de `16.2.9` para `16.3.3` em `package.json` (mesma
    major version, dentro do range estável do App Router/Server
    Actions/Tailwind 4) e rodei `npm install` para aplicar. `postcss` e
    `sharp` são dependências transitivas do próprio `next` e foram resolvidas
    junto.
  - Também atualizei `eslint-config-next` de `16.2.9` para `16.3.3` para
    manter a versão do plugin de lint alinhada com a versão do `next` (não
    era exigido pelo audit, mas evita desalinhamento entre o Next e o
    conjunto de regras de lint oficial).
- Decisões técnicas:
  - Não usei `npm audit fix --force` diretamente; preferi editar
    `package.json` de forma explícita para `next@16.3.3` e deixar o
    `npm install` resolver `postcss`/`sharp` como consequência, conforme
    pedido na tarefa ("preferir atualização explícita de versões").
  - Não houve downgrade de nenhuma dependência.
  - Nenhuma feature, UI, rota, Supabase, Auth ou Storage foi alterada.
- Testes executados:
  - `npm.cmd audit --omit=dev` (antes e depois).
  - `npm.cmd run lint`.
  - `npm.cmd run build`.
- Resultado dos testes:
  - `npm audit --omit=dev`: **0 vulnerabilidades** (antes: 11 — 2 moderadas,
    9 altas).
  - `npm run lint`: passou sem erros ou warnings.
  - `npm run build`: build de produção concluído com sucesso (Next.js 16.3.3,
    Turbopack); todas as 17 rotas foram geradas normalmente (estáticas,
    dinâmicas e SSG de `/projetos/[slug]`), sem mudança na lista de rotas.
- Problemas encontrados:
  - Nenhum. O upgrade do Next de `16.2.9` para `16.3.3` não exigiu nenhuma
    mudança de código.
- Pendências:
  - Nenhuma pendência técnica para esta tarefa.
- Riscos:
  - Baixo. A mudança fica restrita a `package.json`/`package-lock.json`; o
    Next subiu apenas de patch/minor dentro da mesma major (16), sem
    mudanças de API usadas no projeto. Build e lint validam o resultado, mas
    a tarefa não incluiu testes automatizados de funcionalidade (não existem
    no projeto) nem verificação manual em navegador — recomenda-se validação
    visual/manual antes do deploy, como já previsto em TASK-004.
- Revisão pedida ao ChatGPT:
  - Confirmar que a atualização do `next`/`eslint-config-next` para `16.3.3`
    é aceitável como escopo de TASK-001.
  - Revisar `package-lock.json` para confirmar que não há dependências novas
    inesperadas além do esperado pelo bump de versão.
  - Decidir se TASK-001 pode ser marcada como concluída no backlog.

## Último Handoff — Setup do Workflow

- Status: pronto para uso.
- Autor: ChatGPT/Codex.
- O que foi feito:
  - criado protocolo ChatGPT + Claude;
  - definido fluxo de tarefas;
  - criado diagnóstico inicial;
  - criado backlog inicial;
  - criada primeira tarefa para Claude.
- Próxima ação:
  - entregar `docs/tasks/task-001-dependency-audit.md` ao Claude Code.

## Como Claude Deve Atualizar Este Arquivo

Ao terminar uma tarefa, coloque um novo bloco acima deste, usando:

```markdown
## Último Handoff — TASK-XXX

- Status: pronto para revisão | bloqueado | precisa de correção
- Arquivos alterados:
- O que foi feito:
- Decisões técnicas:
- Testes executados:
- Resultado dos testes:
- Problemas encontrados:
- Pendências:
- Riscos:
- Revisão pedida ao ChatGPT:
```

## Histórico

- 2026-08-26: protocolo inicial criado.
