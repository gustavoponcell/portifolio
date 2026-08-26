# TASK-013 — Analytics leve e privacidade

## Objetivo

Definir se o portfólio deve usar analytics e, se sim, preparar uma solução leve
e compatível com privacidade.

## Escopo

- Avaliar Vercel Analytics, Speed Insights ou alternativa simples.
- Registrar trade-offs de privacidade.
- Implementar somente se não exigir consentimento complexo nem expor dados
  sensíveis.

## Restrições

- Não adicionar trackers invasivos.
- Não coletar dados pessoais desnecessários.
- Não adicionar cookies de marketing.
- Não criar banner de consentimento se a solução escolhida não exigir.

## Critérios de Aceite

- Decisão registrada em `docs/decisions.md`.
- Se implementado, `npm.cmd run lint` e `npm.cmd run build` passam.
- `docs/handoff.md` registra ferramenta, riscos e como desativar.
