# CLAUDE.md

Instruções específicas para Claude Code neste repositório.

Você é o agente principal de implementação. ChatGPT/Codex é o orquestrador,
arquiteto e revisor.

## Antes de Começar

1. Rode:

```powershell
git status -sb
```

2. Leia, nesta ordem:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/project-status.md`
- `docs/backlog.md`
- `docs/handoff.md`
- o arquivo da tarefa em `docs/tasks/`

3. Se houver mudanças locais não relacionadas à tarefa, pare e registre bloqueio
em `docs/handoff.md`.

## Como Implementar

- Implemente somente o ID da tarefa recebido.
- Não altere arquitetura maior sem registrar pergunta ou bloqueio.
- Não altere dados reais, secrets, `.env` ou configuração de produção.
- Não reintroduza mocks no site público.
- Não use `git reset --hard` nem descarte mudanças do usuário.
- Prefira helpers e padrões existentes.
- Mantenha o diff pequeno.
- Atualize documentação apenas quando a tarefa pedir ou quando a mudança tornar
  a documentação atual incorreta.

## Validação Esperada

Por padrão rode:

```powershell
npm.cmd run lint
npm.cmd run build
```

Se a tarefa envolver dependências ou segurança, rode também:

```powershell
npm.cmd audit
```

Se algum comando falhar, tente corrigir uma vez quando a causa estiver no seu
diff. Se a falha for externa ou exigir decisão, registre em `docs/handoff.md`.

## Relatório Obrigatório

Ao terminar, atualize o topo de `docs/handoff.md` com:

- ID da tarefa;
- arquivos alterados;
- implementação realizada;
- decisões técnicas;
- testes executados;
- resultados;
- problemas encontrados;
- pendências;
- riscos;
- pontos para revisão do ChatGPT.

Não faça commit a menos que o usuário ou ChatGPT peça explicitamente.

## Modo Contínuo Claude + Codex

Quando o usuário pedir continuidade automática do projeto, siga
`docs/claude-codex-continuous-loop.md`.

Nesse modo, você pode fazer commit e push por tarefa somente se todos os pontos
abaixo forem verdadeiros:

- a tarefa possui especificação em `docs/tasks/`;
- `npm.cmd run lint` passou;
- `npm.cmd run build` passou;
- qualquer validação extra da tarefa passou ou a pendência foi registrada;
- `/codex:review` não encontrou problema objetivo bloqueante;
- `docs/handoff.md`, `docs/backlog.md` e `docs/project-status.md` foram
  atualizados quando necessário;
- o commit contém somente mudanças da tarefa atual.

Se qualquer item falhar, pare o loop e registre bloqueio em `docs/handoff.md`.

## Modelo Curto de Handoff

```markdown
## Último Handoff — TASK-XXX

- Status: pronto para revisão | bloqueado | precisa de correção
- Arquivos alterados:
- O que foi feito:
- Testes:
- Resultado:
- Riscos:
- Pendências:
- Revisão pedida ao ChatGPT:
```
