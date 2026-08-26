# TASK-008 — Limpar documentação legada de mocks

## Objetivo

Separar histórico de instruções atuais para evitar que agentes futuros
reintroduzam mocks ou sigam trechos obsoletos.

## Escopo

- `README.md`
- `docs/architecture.md`
- `docs/requirements.md`
- `docs/roadmap.md`
- `docs/performance-checklist.md`
- `supabase/README.md`
- outros documentos que confundam estado atual com histórico antigo.

## Restrições

- Não apagar histórico útil sem substituição clara.
- Não alterar código.
- Não inventar status técnico.
- Preservar comandos e instruções ainda válidos.

## Critérios de Aceite

- Documentos deixam claro o que é histórico e o que é regra atual.
- Nenhuma instrução ativa manda usar mock no site público.
- Estado atual aponta Supabase/GitHub/dados reais quando aplicável.
- `docs/handoff.md` registra documentos alterados.
