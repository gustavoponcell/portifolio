# AGENTS.md

Instruções permanentes para qualquer agente de IA trabalhando neste repositório.

Este arquivo é a camada comum. Regras específicas do Claude Code ficam em
`CLAUDE.md`. O estado vivo do projeto fica em `docs/project-status.md`,
`docs/backlog.md` e `docs/handoff.md`.

## Papel do Projeto

Site pessoal de portfólio, currículo e contato de Gustavo Poncell, com identidade
híbrida de Designer + Desenvolvedor.

Objetivo final:

- site funcional, responsivo, seguro, performático e pronto para produção;
- sem erros de build, lint ou console relevantes;
- sem links quebrados;
- sem secrets no repositório;
- sem dados falsos no site público;
- documentação e GitHub atualizados.

## Stack Atual

- Next.js App Router.
- TypeScript.
- Tailwind CSS 4.
- shadcn/ui e componentes próprios.
- Supabase Auth, Database e Storage.
- GitHub API server-side para dados Dev.
- Vercel como alvo de produção.

## Divisão de Papéis

### ChatGPT / Codex

Atua como orquestrador principal: Product Manager, arquiteto, tech lead, QA,
revisor de segurança e gestor de documentação.

Responsabilidades:

- analisar estado atual antes de planejar;
- escolher próxima tarefa;
- escrever especificações pequenas e revisáveis para Claude Code;
- revisar diffs, segurança, acessibilidade, SEO, performance e arquitetura;
- atualizar documentação viva;
- organizar commits e GitHub quando solicitado.

### Claude Code

Atua como agente principal de implementação.

Responsabilidades:

- implementar somente a tarefa recebida;
- editar código, executar testes e corrigir falhas;
- registrar relatório curto em `docs/handoff.md`;
- não tomar decisões arquiteturais grandes sem registrar bloqueio.

## Fonte Única de Verdade

- `AGENTS.md`: regras gerais para todos os agentes.
- `CLAUDE.md`: regras específicas para Claude Code.
- `docs/agent-workflow.md`: protocolo ChatGPT -> Claude -> revisão.
- `docs/project-status.md`: diagnóstico e estado atual.
- `docs/backlog.md`: tarefas priorizadas.
- `docs/handoff.md`: passagem de contexto entre agentes.
- `docs/decisions.md`: decisões técnicas importantes.
- `docs/tasks/`: especificações de tarefas individuais.
- `docs/architecture.md`, `docs/requirements.md`, `docs/roadmap.md`: documentação de produto e arquitetura.

Não use memória de conversa como fonte final. Se algo precisa sobreviver ao
próximo ciclo, registre nos arquivos acima.

## Ciclo de Trabalho

1. ChatGPT lê status, backlog, handoff e Git.
2. ChatGPT escolhe a próxima tarefa.
3. ChatGPT escreve ou atualiza `docs/tasks/TASK-XXX-*.md`.
4. Claude Code implementa somente essa tarefa.
5. Claude executa validações e registra relatório em `docs/handoff.md`.
6. ChatGPT revisa diff, testes e riscos.
7. Se houver problema, ChatGPT devolve correções para Claude.
8. Se aprovado, documentação é atualizada e o GitHub recebe o commit/push.

## Ciclo Contínuo Claude + Codex

Quando o usuário solicitar execução em looping, use
`docs/claude-codex-continuous-loop.md` como protocolo operacional.

Regras adicionais:

- Claude Code pode ser o piloto principal do loop.
- Codex, via plugin oficial no Claude Code, deve atuar como revisor objetivo
  depois de cada tarefa.
- Cada tarefa aprovada deve terminar em commit pequeno e push para `main`.
- O loop deve parar em caso de teste falhando, review Codex bloqueante, ausência
  de especificação, risco de secret, necessidade de decisão de produto ou
  qualquer ação que exija credencial/sistema externo do usuário.
- `/codex:adversarial-review` é recomendado para tarefas sensíveis, mas depende
  de invocação direta do usuário quando o plugin não permitir chamada pelo
  agente.

## Controle de Concorrência

- Apenas um agente implementa código por tarefa.
- ChatGPT pode editar documentação/protocolo enquanto Claude não está rodando.
- Claude deve iniciar com `git status -sb` e parar se houver mudanças não
  relacionadas à tarefa.
- Não use `git reset --hard`, `git checkout --` ou comandos destrutivos sem
  pedido explícito do usuário.
- Se houver conflito entre tarefa e estado do repositório, registre bloqueio em
  `docs/handoff.md` e pare.

## Regras de Implementação

- Leia a estrutura existente antes de alterar arquivos.
- Preserve conteúdo útil já existente.
- Prefira padrões e helpers locais.
- Mantenha mudanças pequenas, revisáveis e diretamente relacionadas à tarefa.
- Não crie abstrações prematuras.
- Não implemente integrações reais sem tarefa explícita.
- Não crie dados pessoais inventados.
- Não reintroduza dados mockados no site público.
- Use português do Brasil na documentação e na interface pública.
- Use `kebab-case` para arquivos e pastas.
- Use `PascalCase` para componentes React.
- Use `camelCase` para funções, variáveis e hooks.

## Dados Públicos

Regras atuais:

- Design público vem de projetos `design` com status `published` no Supabase.
- Dev público vem do GitHub real e da curadoria visível/publicada quando Supabase
  está configurado.
- Estados vazios profissionais são preferíveis a conteúdo fictício.
- `src/data/portfolio-projects.ts` e `src/data/portfolio-github-repositories.ts`
  são referências internas e apoio de desenvolvimento, não fonte do site público.

## Segurança

- Nunca commitar `.env`, `.env.local`, tokens, chaves, dumps privados ou credenciais.
- `NEXT_PUBLIC_*` somente para valores realmente públicos.
- `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `GITHUB_TOKEN` são server-only.
- Server Actions administrativas devem validar admin antes de qualquer escrita.
- Supabase deve respeitar RLS.
- Uploads devem validar tipo, tamanho e path.

## Acessibilidade e Qualidade

- Manter contraste adequado.
- Garantir foco visível e navegação por teclado.
- Usar HTML semântico e textos alternativos úteis.
- Não depender apenas de cor para comunicar estado.
- Considerar responsividade em mobile, tablet e desktop.
- Evitar animações excessivas.

## Comandos de Validação

Use os scripts reais do `package.json`:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit
```

Não existe script de teste automatizado neste momento. Se uma tarefa exigir
testes específicos, registre a lacuna ou crie teste como parte da tarefa.

## Checklist Antes de Finalizar Uma Tarefa

- Escopo solicitado foi atendido.
- Não houve mudança fora da tarefa.
- Não há secrets ou dados sensíveis.
- Lint/build foram executados ou a impossibilidade foi registrada.
- Documentação viva foi atualizada quando necessário.
- `docs/handoff.md` contém resultado, testes e pendências.
- Próximo passo recomendado está claro.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
