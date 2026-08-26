# TASK-003 — Auditoria de secrets e exposição client/server

## ID

TASK-003

## Objetivo

Confirmar que tokens Supabase/GitHub não entram no client bundle, endpoints não
retornam dados sensíveis e arquivos `.env*` seguem protegidos.

## Contexto

A tarefa foi executada pelo Claude Code antes da criação formal deste arquivo,
usando a descrição existente em `docs/backlog.md` como escopo. Este documento
foi criado retroativamente por ChatGPT/Codex para manter o padrão de tarefas em
`docs/tasks/`.

## Arquivos Provavelmente Envolvidos

- `.gitignore`
- `.env.example`
- `next.config.ts`
- `src/lib/supabase/env.ts`
- `src/lib/supabase/admin.ts`
- `src/lib/supabase/public.ts`
- `src/lib/supabase/client.ts`
- `src/lib/auth/admin.ts`
- `src/lib/github.ts`
- `src/app/api/**`
- `src/app/admin/actions/**`
- `docs/handoff.md`

## Requisitos

- Confirmar que `.env*` está ignorado, exceto `.env.example`.
- Confirmar que `.env.local` não está rastreado pelo Git.
- Confirmar que `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `GITHUB_TOKEN` e `ADMIN_EMAIL` não aparecem em componentes client.
- Confirmar que secrets são lidos apenas em código server-side.
- Confirmar que endpoints de health/status retornam apenas booleanos,
  contagens ou metadados seguros.
- Confirmar que Server Actions administrativas exigem admin antes de escrita.
- Procurar padrões comuns de tokens hardcoded.

## Restrições

- Não criar nem editar `.env` real.
- Não imprimir nem commitar valores reais de chaves, tokens ou senhas.
- Não mover secrets para variáveis `NEXT_PUBLIC_*`.
- Não alterar schema, RLS, Auth, Storage ou dados reais.
- Não fazer mudanças de código especulativas se nenhum vazamento objetivo for
  encontrado.

## Critérios de Aceite

- Apenas `.env.example` aparece em `git ls-files` para arquivos `.env*`.
- Secrets não aparecem em arquivos marcados com `"use client"`.
- Secrets são lidos somente em módulos server-side ou em helpers usados no
  servidor.
- Health endpoints não expõem valores sensíveis.
- `npm.cmd audit --omit=dev` retorna 0 vulnerabilidades.
- `docs/handoff.md` registra achados, decisões e pendências.

## Testes Necessários

```powershell
git ls-files .env .env.local .env.production .env.development .env.example
rg -n "SUPABASE_SECRET_KEY|SUPABASE_SERVICE_ROLE_KEY|GITHUB_TOKEN|ADMIN_EMAIL|NEXT_PUBLIC_.*(SECRET|TOKEN|SERVICE_ROLE)" src next.config.ts .env.example
rg -n "use client" src
npm.cmd audit --omit=dev
```

Quando houver mudança de código, também rodar:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Resultado

Concluída sem mudança de código. Nenhum vazamento objetivo encontrado. A única
alteração foi documental em `docs/handoff.md`, corrigindo uma afirmação
imprecisa anterior sobre validação de envs Production.
