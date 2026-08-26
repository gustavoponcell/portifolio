# Automacao Local ChatGPT + Claude

Este projeto pode rodar um ciclo semi-automatico entre Claude Code e Codex CLI
usando `scripts/agent-loop.ps1`.

## O Que O Loop Faz

1. le `docs/backlog.md`;
2. encontra a primeira tarefa pronta com especificacao em `docs/tasks/`;
3. chama Claude Code para implementar a tarefa;
4. roda `npm.cmd run lint` e `npm.cmd run build`;
5. opcionalmente roda `npm.cmd audit --omit=dev`;
6. chama Codex CLI em modo somente leitura para revisar o diff;
7. se Codex pedir correcao, devolve a revisao para Claude;
8. se Codex aprovar, registra a tarefa em `.agent-loop/state.json`;
9. opcionalmente faz commit e push.

Os logs ficam em `.agent-loop/logs/`, que nao entra no Git.

## Comando Recomendado

Antes do primeiro ciclo automatico, deixe o Git limpo:

```powershell
cd C:\portifolio
git status -sb
git add AGENTS.md CLAUDE.md README.md docs .gitignore scripts package.json package-lock.json
git commit -m "chore: configura workflow automatico de agentes"
git push origin main
```

Testar qual tarefa o loop pegaria, sem chamar Claude ou Codex:

```powershell
cd C:\portifolio
.\scripts\agent-loop.ps1 -DryRun
```

Rodar um ciclo, sem commit automatico:

```powershell
cd C:\portifolio
.\scripts\agent-loop.ps1 -MaxCycles 1 -RunAudit
```

Rodar ate duas tarefas em sequencia, com uma rodada automatica de correcao por
tarefa:

```powershell
cd C:\portifolio
.\scripts\agent-loop.ps1 -MaxCycles 2 -MaxFixAttempts 1 -RunAudit
```

Rodar com commit e push automaticos apos aprovacao do Codex:

```powershell
cd C:\portifolio
.\scripts\agent-loop.ps1 -MaxCycles 2 -MaxFixAttempts 1 -RunAudit -AutoCommit -AutoPush
```

## Regras De Seguranca

- O script nao faz deploy.
- O script nao altera variaveis de ambiente.
- Claude e instruido a nao fazer commit, push ou mexer em secrets.
- Codex revisa em `read-only`.
- Commit e push so acontecem com `-AutoCommit` e `-AutoPush`.
- Por padrao, o loop exige working tree limpo antes de comecar.

Se for necessario iniciar com arquivos modificados, use `-AllowDirtyStart`, mas
isso mistura a proxima tarefa com o diff ja existente.

## Como A Proxima Tarefa Comeca

O loop procura a primeira tarefa do backlog com status:

- `proxima tarefa recomendada`;
- `próxima tarefa recomendada`;
- `pronta para Claude`;
- `pendente`.

Tarefas ja aprovadas na execucao local ficam registradas em
`.agent-loop/state.json`, para evitar que o script repita a mesma tarefa no
mesmo fluxo.

Para o fluxo funcionar bem, cada tarefa precisa ter uma especificacao em
`docs/tasks/`.

## Quando Parar

O loop para sozinho quando:

- nao encontra proxima tarefa pronta;
- lint/build/audit falham;
- Codex marca `AGENT_REVIEW: BLOCKED`;
- Codex ainda pede mudancas apos o limite de tentativas.
