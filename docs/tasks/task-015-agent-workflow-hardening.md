# TASK-015 — Automação semi-automatizada do workflow

## Objetivo

Consolidar o fluxo Claude Code + Codex Plugin + GitHub para manutenção futura do
portfólio.

## Escopo

- Revisar `AGENTS.md`, `CLAUDE.md`, `docs/agent-workflow.md`,
  `docs/automation.md` e `docs/claude-codex-continuous-loop.md`.
- Decidir se `scripts/agent-loop.ps1` continua útil ou deve ficar marcado como
  legado.
- Avaliar GitHub Issues por tarefa.
- Avaliar branch/PR por tarefa para trabalhos futuros.
- Registrar fluxo final recomendado.

## Restrições

- Não criar automação perigosa que faça deploy ou altere secrets.
- Não instalar plugins adicionais sem necessidade.
- Não remover histórico útil.

## Critérios de Aceite

- Fluxo recomendado para trabalhos futuros está claro.
- Limites do plugin Codex estão documentados.
- Se houver mudança em scripts/docs, ela está coerente com o fluxo real usado.
- `docs/handoff.md` registra decisão final e estado da fila.
