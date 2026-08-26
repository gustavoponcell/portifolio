# TASK-007 — Checagem de links quebrados

## Objetivo

Verificar links internos e externos do portfólio e corrigir URLs quebradas,
ausentes ou inconsistentes.

## Escopo

- Links de navegação.
- Links de contato.
- Links GitHub, LinkedIn, WhatsApp e Behance quando existirem.
- Links de projetos.
- Links em botões e CTAs.
- Links em sitemap quando aplicável.

## Restrições

- Não inventar URLs pessoais.
- Se um link real estiver faltando, registrar pendência em vez de inventar.
- Não alterar dados reais sem necessidade.

## Critérios de Aceite

- Links internos apontam para rotas existentes.
- Links externos reais respondem ou têm pendência documentada.
- Links externos usam `rel` apropriado quando abrem nova aba.
- `npm.cmd run lint` e `npm.cmd run build` passam.
- `docs/handoff.md` registra links verificados e correções.
