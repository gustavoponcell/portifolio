# Backlog Inicial Priorizado

Atualizado em: 2026-08-26.

## P0 — Bloqueia Produção

### TASK-001 — Corrigir vulnerabilidades de dependências

- Status: concluída e aprovada por ChatGPT/Codex.
- Especificação: `docs/tasks/task-001-dependency-audit.md`.
- Resultado: `npm audit --omit=dev`, `npm.cmd run lint` e `npm.cmd run build`
  passaram após atualização controlada de dependências.

### TASK-002 — Validar deploy Vercel em produção

- Status: concluída e aprovada por ChatGPT/Codex.
- Especificação: `docs/tasks/task-002-vercel-production-validation.md`.
- Resultado: deploy Production `Ready`, commit `04e0e9d` confirmado pelo usuário,
  rotas públicas validadas, `/admin` protegido, login/admin e console checados
  manualmente pelo usuário.

### TASK-003 — Auditoria de secrets e exposição client/server

- Status: concluída e aprovada por ChatGPT/Codex.
- Especificação: `docs/tasks/task-003-secrets-client-server-audit.md`.
- Objetivo: confirmar que tokens Supabase/GitHub não entram no client bundle,
  endpoints não retornam dados sensíveis e `.env*` segue protegido.
- Resultado: nenhum vazamento objetivo encontrado; `.env*` protegido; secrets
  usados apenas no servidor; `npm.cmd audit --omit=dev` sem vulnerabilidades.

### TASK-004 — Teste visual e responsivo manual

- Status: concluída (auditoria de código; sem verificação visual real em
  navegador nesta sessão — ver pendência em `docs/handoff.md`).
- Especificação: `docs/tasks/task-004-visual-responsive-check.md`.
- Objetivo: verificar celular pequeno, celular grande, tablet, notebook e
  desktop; registrar screenshots/problemas; corrigir layout sem patches
  aleatórios.
- Resultado: nenhum problema objetivo de layout/responsividade encontrado na
  revisão estrutural de `globals.css`, `Container`, `SiteHeader`,
  `ModeSwitcher`, `SiteFooter` e das seções de home/design/dev/projeto. Sem
  Claude in Chrome conectado nem Playwright instalado nesta sessão, então não
  houve captura de screenshots reais — recomenda-se checagem visual manual
  quando conveniente.

## P1 — Qualidade Para Lançamento

### TASK-005 — Auditoria de acessibilidade básica

- Status: concluída (auditoria de código; sem teste real com leitor de tela
  nesta sessão — ver pendência em `docs/handoff.md`).
- Especificação: `docs/tasks/task-005-accessibility-basic-audit.md`.

- Navegação por teclado.
- Contraste.
- Foco visível.
- Labels de formulários.
- Textos alternativos.
- Landmarks.
- Resultado: nenhum problema objetivo encontrado. Foco visível global via
  `:focus-visible` em `globals.css`, labels associados em todos os
  formulários admin, contraste calculado acima do mínimo AA nos principais
  pares de token, alt text presente em todas as imagens, nenhum controle
  interativo sem semântica nativa (`button`/`Link`/`input`/`select`).

### TASK-006 — Auditoria SEO e compartilhamento

- Status: concluída e aprovada por revisão Codex objetiva.
- Especificação: `docs/tasks/task-006-seo-sharing-audit.md`.

- Validar titles, descriptions, Open Graph, Twitter card, canonical, sitemap,
  robots e JSON-LD.
- Definir imagem OG final.
- Resultado: robots/sitemap/metadata/JSON-LD já estavam corretos. Único
  achado objetivo: `siteConfig.ogImage` apontava para o `/window.svg`
  padrão do `create-next-app`. Corrigido com uma rota `/og`
  (`src/app/og/route.tsx`) que gera uma imagem 1200x630 on-brand via
  `next/og` (`ImageResponse`), sem dependências novas.

### TASK-007 — Checagem de links quebrados

- Status: concluída e aprovada por revisão Codex objetiva.
- Especificação: `docs/tasks/task-007-broken-links-check.md`.

- Validar links internos e externos.
- Validar GitHub, LinkedIn, WhatsApp, Behance se usado.
- Resultado: 1 link interno quebrado encontrado e corrigido (âncora
  `#projetos-dev` sem elemento com esse `id`; `GithubPreviewSection` usava
  `id="github"`). Links de contato (GitHub/LinkedIn/WhatsApp/Behance) são
  100% orientados a dados reais do Supabase, sem URLs fictícias no código;
  validação ao vivo das URLs de produção fica como pendência (fora do
  alcance desta sessão sem acesso à base de produção).

## P2 — Limpeza e Manutenção

### TASK-008 — Limpar documentação legada de mocks

- Status: concluída e aprovada por revisão Codex objetiva (2 rodadas).
- Especificação: `docs/tasks/task-008-clean-legacy-mock-docs.md`.

- Diferenciar histórico de instrução atual.
- Evitar que agentes futuros sigam trechos obsoletos.
- Resultado: adicionados avisos de "documento histórico" no topo de
  `README.md`, `docs/architecture.md`, `docs/requirements.md`,
  `docs/roadmap.md`, `docs/performance-checklist.md`,
  `supabase/README.md` e `docs/prompts-log.md`, mais notas inline nas
  frases que afirmavam mock como fonte pública atual. Nenhum conteúdo
  histórico foi removido. Pendência identificada (fora de escopo, código):
  `src/lib/data-source.ts` é código morto não importado por nada.

### TASK-009 — Decidir destino do status `mock`

- Status: concluída e aprovada por revisão Codex objetiva (2 rodadas).
- Especificação: `docs/tasks/task-009-decide-mock-status.md`.

- Avaliar se `mock` ainda precisa existir no schema/admin.
- Se não precisar, planejar migração segura.
- Resultado: decisão registrada em `docs/decisions.md` (DEC-006) —
  **manter** `mock` por enquanto. Risco público é zero (queries públicas
  filtram exclusivamente `= 'published'`). Plano de migração SQL completo
  registrado para remoção futura, se decidido, mas não executado (exige
  acesso ao Supabase de produção que esta sessão não tem).

### TASK-010 — Criar testes mínimos

- Status: concluída (revisada por Claude no papel de revisor objetivo,
  Codex indisponível por limite de uso da conta).
- Especificação: `docs/tasks/task-010-minimal-tests.md`.

- Avaliar Playwright para rotas públicas e login/admin básico.
- Avaliar testes unitários para helpers críticos.
- Resultado: Vitest escolhido (pequeno, sem browser, sem credenciais).
  16 testes em 4 arquivos cobrindo `absoluteUrl`, `validateImageFile`,
  paths de storage (anti path-traversal) e `getRelatedProjects`.
  `npm.cmd run test` roda a suíte. Playwright avaliado e adiado (exigiria
  browser + credenciais/mocks de login, fora do "mínimo" pedido).

### TASK-011 — CI simples no GitHub Actions

- Status: concluída (revisada por Claude, Codex indisponível).
- Especificação: `docs/tasks/task-011-github-actions-ci.md`.

- Rodar `npm ci`, `npm run lint`, `npm run build` em push/PR.
- Adicionar audit como warning ou job separado.
- Resultado: `.github/workflows/ci.yml` criado com job `build` (lint,
  test, build; Node 22) bloqueante e job `audit` (`npm audit --omit=dev`)
  não bloqueante. Validado localmente que o build funciona com e sem
  `.env.local`. Execução real do Actions ainda pendente do próximo
  push/PR no GitHub.

## P3 — Pós-Deploy

### TASK-012 — Configurar domínio final e Search Console

- Status: próxima tarefa recomendada (provavelmente exige decisão/conta
  externa do usuário — ver pendência que pode pausar o loop aqui).
- Especificação: `docs/tasks/task-012-domain-search-console.md`.

### TASK-013 — Analytics leve e privacidade

- Status: pendente.
- Especificação: `docs/tasks/task-013-analytics-privacy.md`.

### TASK-014 — Melhorias de performance fina

- Status: pendente.
- Especificação: `docs/tasks/task-014-performance-fine-tuning.md`.

### TASK-015 — Automação semi-automatizada do workflow

- Status: pendente.
- Especificação: `docs/tasks/task-015-agent-workflow-hardening.md`.

- GitHub Issues por tarefa.
- Branch por tarefa.
- PRs curtos.
- Hooks do Claude para lint/build ou notificação.
