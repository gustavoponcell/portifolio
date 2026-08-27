# TASK-016 — Revisão e melhoria de UI/UX do frontend público

Pré-requisito: TASK-015 concluída, aprovada e com `docs/handoff.md` atualizado.

## Objetivo

Fazer a primeira revisão de UI/UX do site público com evidência visual real
(screenshots em navegador), usando o plugin **Frontend Design** (Anthropic) e a
skill **UI/UX Pro Max**, sem descaracterizar a identidade neobrutalista já
definida em `docs/design-system.md`.

Esta tarefa fecha duas pendências explícitas registradas em
`docs/project-status.md`:

- TASK-004 (responsividade) foi auditoria de código, **sem navegador real**;
- TASK-005 (acessibilidade) foi auditoria de código, **sem teste ao vivo**.

## Escopo

Rotas públicas, nesta ordem de prioridade:

1. `/`
2. `/design`
3. `/dev`
4. `/projetos/[slug]`
5. `/contato`
6. `/login` (apenas layout e foco, sem mexer em auth)

Breakpoints obrigatórios: `360`, `390`, `768`, `1280`, `1920`.

Fora de escopo nesta tarefa: `/admin/*` (só entra se sobrar tempo e em tarefa
separada), lógica de dados, Supabase, autenticação, SEO e infra.

## Ferramentas

- Plugin oficial Anthropic — Frontend Design:
  - `/plugin marketplace add anthropics/claude-code`
  - `/plugin install frontend-design@claude-code-plugins`
- Skill UI/UX Pro Max:
  - `/plugin marketplace add nicohodt/claude-code-ui-ux-skill`
  - `/plugin install ui-ux-pro-max@claude-code-ui-ux-skill`
- Claude in Chrome conectado ao **Brave** (perfil já logado), para navegar em
  `http://localhost:3000` e capturar screenshots.

## Restrições (guard rails)

Estas restrições existem porque os dois plugins tendem a empurrar uma estética
própria — gradientes, blur, glassmorphism, animações longas — que **contraria**
o design system deste projeto.

- Identidade obrigatória: neobrutalismo moderno, dark mode padrão.
- Tokens de `src/app/globals.css` continuam sendo a fonte de verdade. Mudança de
  token só com justificativa escrita e aprovação do usuário.
- Paleta travada: `#111111` fundo, `#F7F3E8` texto, `#1C1C1C` card, `#242424`
  superfície elevada, `#FFD84D` Design, `#39FF88` Dev.
- Proibido: gradiente decorativo, blur ornamental, glassmorphism, sombra com
  blur, "estética genérica de template", biblioteca de animação nova.
- Bordas grossas (4px), sombras duras deslocadas, `--radius-brutal`, tipografia
  grande e direta continuam valendo.
- Sem dependência nova sem aprovação explícita.
- Sem alterar dados, secrets, `.env*`, schema Supabase ou Server Actions.
- Sem reintroduzir mock/placeholder no site público; estado vazio honesto
  continua sendo a regra.
- Copy pública em pt-BR, primeira pessoa, sem inventar cliente, cargo,
  resultado ou experiência.
- Contraste mínimo AA preservado ou melhorado; foco visível nunca removido.
- Respeitar `prefers-reduced-motion` em qualquer animação nova.
- `kebab-case` para arquivos, `PascalCase` para componentes.

## Entregáveis

- `docs/ui-review/before/<rota>-<breakpoint>.png` — captura antes.
- `docs/ui-review/after/<rota>-<breakpoint>.png` — captura depois.
- `docs/ui-ux-audit.md` — achados priorizados P0/P1/P2, cada um com rota,
  breakpoint, arquivo/componente, evidência (screenshot) e correção proposta.
- Diffs de código pequenos, agrupados por rota/componente.
- `docs/handoff.md`, `docs/backlog.md` e `docs/project-status.md` atualizados.

## Fluxo Obrigatório

1. Ler `AGENTS.md`, `CLAUDE.md`, `docs/design-system.md`,
   `docs/project-status.md`, `docs/backlog.md`, `docs/handoff.md` e este
   arquivo. Rodar `git status -sb` e parar se houver mudança não relacionada.
2. Subir `npm.cmd run dev` e capturar o "antes" em todas as rotas e
   breakpoints. Ler o console do navegador e registrar erros/warnings.
3. Diagnosticar com UI/UX Pro Max + Frontend Design e escrever
   `docs/ui-ux-audit.md`. **Nenhuma linha de código muda nesta etapa.**
4. **PARAR** e apresentar o plano priorizado ao usuário. Só implementar depois
   de aprovação explícita, e só o que foi aprovado.
5. Implementar em lotes pequenos (um lote = uma rota ou um componente
   compartilhado), rodando `npm.cmd run lint` a cada lote.
6. Capturar o "depois" nos mesmos breakpoints e comparar com o "antes".
7. Rodar `npm.cmd run lint`, `npm.cmd run test`, `npm.cmd run build`.
8. Atualizar documentação viva e `docs/handoff.md`.

## Critérios de Aceite

- Screenshots reais existem para todas as rotas em escopo, antes e depois.
- `docs/ui-ux-audit.md` lista os achados com evidência e prioridade.
- Nenhum achado P0 aberto sem correção ou sem justificativa registrada.
- Zero erro relevante no console do navegador nas rotas públicas.
- Sem overflow horizontal em 360px em nenhuma rota pública.
- Navegação por teclado percorre header, conteúdo e footer com foco visível.
- Identidade neobrutalista/dark preservada (o site continua reconhecível).
- `lint`, `test` e `build` passando.
- `docs/handoff.md` com arquivos alterados, decisões, testes, riscos e
  pendências.

## Decisão Pendente do Usuário

Screenshots versionados no Git aumentam o tamanho do repositório. Decidir antes
do commit: versionar `docs/ui-review/` ou adicionar ao `.gitignore` e manter
apenas local. Registrar a decisão em `docs/decisions.md`.
