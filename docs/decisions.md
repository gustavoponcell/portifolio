# Decisões Técnicas

## DEC-001 — Repositório como fonte de verdade

Data: 2026-08-26.

Decisão: todo estado durável do workflow ChatGPT + Claude fica em arquivos
versionados no repositório.

Motivo: conversas não são memória confiável, e Git permite revisar histórico,
diffs e decisões.

## DEC-002 — Começar com automação nível 1

Data: 2026-08-26.

Decisão: usar Markdown + Git manual antes de GitHub Issues, MCP, hooks ou PRs
automáticos.

Motivo: o projeto é individual e precisa de velocidade com controle. Automação
maior será adicionada depois que o ciclo manual estiver estável.

## DEC-003 — Um agente implementador por tarefa

Data: 2026-08-26.

Decisão: Claude Code implementa tarefas; ChatGPT/Codex planeja e revisa.

Motivo: reduz conflito de Git, duplicação de soluções e alterações simultâneas
nos mesmos arquivos.

## DEC-004 — Tarefas pequenas e especificadas

Data: 2026-08-26.

Decisão: cada tarefa deve ter ID, objetivo, contexto, arquivos prováveis,
requisitos, restrições, critérios de aceite e testes.

Motivo: documentação oficial de agentes de código recomenda tarefas claras e
bem delimitadas para melhor resultado.

## DEC-005 — Não depender de mock no público

Data: 2026-08-26.

Decisão: o site público deve exibir dados reais ou estados vazios profissionais.

Motivo: o portfólio final precisa ser confiável e não pode apresentar projetos,
experiências, números ou links fictícios.
