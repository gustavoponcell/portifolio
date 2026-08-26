# TASK-011 — CI simples no GitHub Actions

## Objetivo

Criar workflow simples de CI no GitHub Actions para validar pull requests e
pushes em `main`.

## Escopo

- `npm ci`
- `npm.cmd` não deve ser usado no Linux do CI; usar `npm`.
- `npm run lint`
- `npm run build`
- `npm audit --omit=dev` como job ou etapa adequada.

## Restrições

- Não adicionar secrets ao workflow.
- Não fazer deploy pelo CI nesta tarefa.
- Não quebrar builds sem envs reais; o projeto deve continuar buildando sem
  `.env.local`.

## Critérios de Aceite

- Workflow em `.github/workflows/`.
- CI roda em push e pull request.
- Node compatível com o projeto.
- `npm run lint`, `npm run build` e audit funcionam no CI.
- `docs/handoff.md` registra arquivo criado e validações locais.
