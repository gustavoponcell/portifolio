# Loop Contínuo Claude + Codex

Este documento define como rodar Claude Code e Codex juntos até concluir a fila
do backlog, começando pela TASK-004.

## Pré-requisitos

No PowerShell:

```powershell
cd C:\portifolio
git pull origin main
git status -sb
claude
```

Dentro do Claude Code:

```text
/reload-plugins
/codex:setup
```

Opcional, mas recomendado enquanto você estiver monitorando:

```text
/codex:setup --enable-review-gate
```

O review gate pode consumir limite e criar loops longos. Use quando estiver
acompanhando a sessão.

## Prompt Mestre Para Claude Code

Cole este prompt dentro do Claude Code:

```text
Leia AGENTS.md, CLAUDE.md, docs/project-status.md, docs/backlog.md,
docs/handoff.md e docs/claude-codex-continuous-loop.md.

Trabalhe em modo contínuo Claude + Codex, começando pela TASK-004 e seguindo a
ordem numérica do backlog até TASK-015.

Para cada tarefa:

1. Rode git status -sb.
2. Se houver mudanças locais que não sejam da tarefa atual, pare e registre
   bloqueio em docs/handoff.md.
3. Leia a especificação correspondente em docs/tasks/.
4. Implemente somente a tarefa atual.
5. Não altere secrets, .env reais, dados reais, domínio ou configurações de
   produção sem instrução explícita.
6. Rode npm.cmd run lint.
7. Rode npm.cmd run build.
8. Rode npm.cmd audit --omit=dev quando a tarefa envolver segurança,
   dependências, deploy ou antes de finalizar um bloco P0/P1.
9. Rode /codex:review --background e acompanhe com /codex:status e
   /codex:result.
10. Corrija apenas problemas objetivos encontrados pelo Codex.
11. Se corrigir algo, rode lint/build novamente e repita /codex:review.
12. Atualize docs/handoff.md com resultado, arquivos alterados, testes,
   decisões, riscos e pendências.
13. Atualize docs/backlog.md marcando a tarefa atual como concluída e a próxima
   como próxima tarefa recomendada.
14. Atualize docs/project-status.md se o estado do projeto mudou.
15. Faça commit pequeno da tarefa aprovada e push para origin main.
16. Passe para a próxima tarefa.

Pare o loop se:

- não existir especificação em docs/tasks/ para a próxima tarefa;
- lint/build/audit falhar e a causa não estiver no seu diff;
- Codex apontar problema bloqueante que exija decisão humana;
- uma tarefa exigir credenciais, dashboard, compra de domínio, conta externa ou
  decisão de produto do usuário;
- houver risco de expor secret;
- você chegar ao fim da TASK-015.

Ao parar, registre claramente em docs/handoff.md o que foi concluído, o que ficou
pendente e o comando ou decisão necessária para continuar.
```

## Comandos Codex Dentro Do Claude

Use um comando por vez:

```text
/codex:review --background
```

Depois:

```text
/codex:status
```

Depois:

```text
/codex:result
```

Para revisões sensíveis, o usuário pode rodar manualmente:

```text
/codex:adversarial-review --base main --background foque em segurança, regressão, dados reais, Supabase, auth admin, client bundle, acessibilidade e deploy
```

## Política De Commits

Formato sugerido:

```text
task-004: valida responsividade visual
task-005: melhora acessibilidade básica
task-006: revisa SEO e metadados
```

Cada commit deve conter apenas a tarefa atual. Se uma tarefa for somente
auditoria sem mudança de código, o commit pode conter apenas documentação.

## Resultado Satisfatório

O loop termina satisfatório quando:

- TASK-004 a TASK-015 estão concluídas ou explicitamente encerradas por decisão;
- `npm.cmd run lint` passa;
- `npm.cmd run build` passa;
- `npm.cmd audit --omit=dev` retorna 0 vulnerabilidades;
- produção segue acessível;
- não há pendências P0/P1 sem justificativa;
- `docs/project-status.md`, `docs/backlog.md` e `docs/handoff.md` refletem o
  estado final.
