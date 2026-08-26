# TASK-010 — Criar testes mínimos

## Objetivo

Adicionar uma base mínima de testes automatizados para reduzir regressões em
rotas públicas e helpers críticos.

## Escopo

- Avaliar ferramenta adequada ao projeto atual.
- Preferir testes pequenos e baratos.
- Cobrir pelo menos rotas públicas principais ou helpers críticos.
- Adicionar script de teste ao `package.json` somente se a ferramenta for
  realmente configurada.

## Restrições

- Não criar suíte grande ou frágil.
- Não depender de credenciais reais.
- Não testar dados privados.
- Não criar snapshots extensos difíceis de manter.

## Critérios de Aceite

- Existe comando documentado para rodar testes, ou decisão registrada de não
  criar ainda.
- Testes passam localmente.
- `npm.cmd run lint` e `npm.cmd run build` passam.
- `docs/handoff.md` registra ferramenta escolhida e cobertura inicial.
