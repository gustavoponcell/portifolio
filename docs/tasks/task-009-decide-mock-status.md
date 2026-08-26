# TASK-009 — Decidir destino do status mock

## Objetivo

Auditar o uso do status `mock` no schema, tipos e admin, decidindo se deve ser
mantido, migrado ou removido.

## Escopo

- `src/types/project.ts`
- `src/types/admin.ts`
- `src/types/github.ts`
- `supabase/schema.sql`
- componentes e Server Actions admin relacionados a status.

## Restrições

- Não rodar migração destrutiva sem necessidade clara.
- Não alterar dados reais sem confirmação.
- Se a decisão exigir migração em Supabase real, criar plano SQL seguro e
  registrar pendência.

## Critérios de Aceite

- Uso atual de `mock` está mapeado.
- Decisão registrada em `docs/decisions.md`.
- Se houver mudança de código/schema, `npm.cmd run lint` e
  `npm.cmd run build` passam.
- `docs/handoff.md` registra riscos e próximos passos.
