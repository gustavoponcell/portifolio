# TASK-001 — Corrigir vulnerabilidades de dependências

## ID

TASK-001

## Objetivo

Corrigir ou reduzir com segurança as vulnerabilidades reportadas por
`npm audit --omit=dev`, sem quebrar lint, TypeScript ou build de produção.

## Contexto

Em 2026-08-26, o comando:

```powershell
npm.cmd audit --omit=dev
```

reportou 11 vulnerabilidades:

- 2 moderadas;
- 9 altas;
- pacotes envolvidos incluem Next.js, PostCSS, sharp, undici, hono,
  brace-expansion, fast-uri, ip-address, js-yaml, nanoid e dependências
  transitivas.

Algumas correções indicam `npm audit fix`; outras indicam `npm audit fix --force`
e atualização do Next para versão fora do range atual. A correção deve ser
controlada, não automática e cega.

## Arquivos Provavelmente Envolvidos

- `package.json`
- `package-lock.json`
- possivelmente `next.config.ts`
- documentação apenas se a decisão de risco precisar ser registrada

## Requisitos

- Rodar `npm.cmd audit --omit=dev` antes de alterar para confirmar o estado.
- Atualizar dependências usando a menor mudança segura.
- Preferir atualização explícita de versões em `package.json` quando necessário.
- Não usar downgrade.
- Não aceitar `npm audit fix --force` sem entender o impacto.
- Se Next precisar subir de versão, manter compatibilidade com App Router,
  Server Actions e Tailwind 4.
- Manter o projeto compilando.

## Restrições

- Não alterar features, UI, banco, Supabase, Auth, Storage ou rotas.
- Não criar `.env`.
- Não commitar secrets.
- Não remover dependências sem confirmar que não são usadas.
- Não reformatar arquivos sem necessidade.

## Critérios de Aceite

- `npm.cmd run lint` passa.
- `npm.cmd run build` passa.
- `npm.cmd audit --omit=dev` fica sem vulnerabilidades ou com justificativa
  documentada para qualquer vulnerabilidade remanescente.
- `git diff` mostra apenas mudanças relacionadas a dependências e eventual
  nota documental curta.
- `docs/handoff.md` é atualizado com resultado e riscos.

## Testes Necessários

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --omit=dev
```

## Validação Pelo ChatGPT

ChatGPT deverá:

- revisar `package.json` e `package-lock.json`;
- conferir se não houve mudança funcional fora de dependências;
- verificar os comandos executados;
- revisar vulnerabilidades remanescentes;
- decidir se a tarefa está aprovada ou precisa de novo ciclo.

## Prompt Para Claude Code

Use exatamente esta tarefa como escopo. Leia `AGENTS.md`, `CLAUDE.md`,
`docs/project-status.md`, `docs/backlog.md` e `docs/handoff.md` antes de
implementar. Ao terminar, atualize `docs/handoff.md` e não faça commit.
