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

- Status: próxima tarefa recomendada.
- Especificação: `docs/tasks/task-004-visual-responsive-check.md`.
- Objetivo: verificar celular pequeno, celular grande, tablet, notebook e
  desktop; registrar screenshots/problemas; corrigir layout sem patches
  aleatórios.

## P1 — Qualidade Para Lançamento

### TASK-005 — Auditoria de acessibilidade básica

- Status: pendente.

- Navegação por teclado.
- Contraste.
- Foco visível.
- Labels de formulários.
- Textos alternativos.
- Landmarks.

### TASK-006 — Auditoria SEO e compartilhamento

- Status: pendente.

- Validar titles, descriptions, Open Graph, Twitter card, canonical, sitemap,
  robots e JSON-LD.
- Definir imagem OG final.

### TASK-007 — Checagem de links quebrados

- Status: pendente.

- Validar links internos e externos.
- Validar GitHub, LinkedIn, WhatsApp, Behance se usado.

## P2 — Limpeza e Manutenção

### TASK-008 — Limpar documentação legada de mocks

- Status: pendente.

- Diferenciar histórico de instrução atual.
- Evitar que agentes futuros sigam trechos obsoletos.

### TASK-009 — Decidir destino do status `mock`

- Status: pendente.

- Avaliar se `mock` ainda precisa existir no schema/admin.
- Se não precisar, planejar migração segura.

### TASK-010 — Criar testes mínimos

- Status: pendente.

- Avaliar Playwright para rotas públicas e login/admin básico.
- Avaliar testes unitários para helpers críticos.

### TASK-011 — CI simples no GitHub Actions

- Status: pendente.

- Rodar `npm ci`, `npm run lint`, `npm run build` em push/PR.
- Adicionar audit como warning ou job separado.

## P3 — Pós-Deploy

### TASK-012 — Configurar domínio final e Search Console

- Status: pendente.

### TASK-013 — Analytics leve e privacidade

- Status: pendente.

### TASK-014 — Melhorias de performance fina

- Status: pendente.

### TASK-015 — Automação semi-automatizada do workflow

- Status: pendente.

- GitHub Issues por tarefa.
- Branch por tarefa.
- PRs curtos.
- Hooks do Claude para lint/build ou notificação.
