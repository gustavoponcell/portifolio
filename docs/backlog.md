# Backlog Inicial Priorizado

Atualizado em: 2026-08-26.

## P0 — Bloqueia Produção

### TASK-001 — Corrigir vulnerabilidades de dependências

- Status: concluída e aprovada por ChatGPT/Codex.
- Especificação: `docs/tasks/task-001-dependency-audit.md`.
- Resultado: `npm audit --omit=dev`, `npm.cmd run lint` e `npm.cmd run build`
  passaram após atualização controlada de dependências.

### TASK-002 — Validar deploy Vercel em produção

- Status: próxima tarefa recomendada.
- Especificação: `docs/tasks/task-002-vercel-production-validation.md`.
- Objetivo: configurar variáveis no Vercel, redeploy, validar rotas e login/admin.
- Depende de: concluída.

### TASK-003 — Auditoria de secrets e exposição client/server

- Status: pendente.
- Objetivo: confirmar que tokens Supabase/GitHub não entram no client bundle,
  endpoints não retornam dados sensíveis e `.env*` segue protegido.

## P1 — Qualidade Para Lançamento

### TASK-004 — Teste visual e responsivo manual

- Verificar celular pequeno, celular grande, tablet, notebook e desktop.
- Registrar screenshots/problemas.
- Corrigir layout sem patches aleatórios.

### TASK-005 — Auditoria de acessibilidade básica

- Navegação por teclado.
- Contraste.
- Foco visível.
- Labels de formulários.
- Textos alternativos.
- Landmarks.

### TASK-006 — Auditoria SEO e compartilhamento

- Validar titles, descriptions, Open Graph, Twitter card, canonical, sitemap,
  robots e JSON-LD.
- Definir imagem OG final.

### TASK-007 — Checagem de links quebrados

- Validar links internos e externos.
- Validar GitHub, LinkedIn, WhatsApp, Behance se usado.

## P2 — Limpeza e Manutenção

### TASK-008 — Limpar documentação legada de mocks

- Diferenciar histórico de instrução atual.
- Evitar que agentes futuros sigam trechos obsoletos.

### TASK-009 — Decidir destino do status `mock`

- Avaliar se `mock` ainda precisa existir no schema/admin.
- Se não precisar, planejar migração segura.

### TASK-010 — Criar testes mínimos

- Avaliar Playwright para rotas públicas e login/admin básico.
- Avaliar testes unitários para helpers críticos.

### TASK-011 — CI simples no GitHub Actions

- Rodar `npm ci`, `npm run lint`, `npm run build` em push/PR.
- Adicionar audit como warning ou job separado.

## P3 — Pós-Deploy

### TASK-012 — Configurar domínio final e Search Console

### TASK-013 — Analytics leve e privacidade

### TASK-014 — Melhorias de performance fina

### TASK-015 — Automação semi-automatizada do workflow

- GitHub Issues por tarefa.
- Branch por tarefa.
- PRs curtos.
- Hooks do Claude para lint/build ou notificação.
