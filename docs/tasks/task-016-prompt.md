# Prompt pronto — TASK-016 (colar no Claude Code depois da TASK-015)

## Antes de colar (uma vez só)

No Claude Code, dentro de `C:\portifolio`:

```
/plugin marketplace add anthropics/claude-code
/plugin install frontend-design@claude-code-plugins

/plugin marketplace add nicohodt/claude-code-ui-ux-skill
/plugin install ui-ux-pro-max@claude-code-ui-ux-skill
```

E deixe o **Brave** aberto com a extensão Claude in Chrome instalada e
conectada, com permissão para `localhost`.

---

## O prompt

```text
Vamos executar a TASK-016 — revisão e melhoria de UI/UX do frontend público.
A especificação completa está em docs/tasks/task-016-frontend-ui-ux-review.md.
Leia esse arquivo antes de qualquer coisa e trate-o como fonte de verdade.

CONTEXTO DO PROJETO
- Portfólio de Gustavo Poncell: Next.js 16 App Router, React 19, TypeScript
  strict, Tailwind CSS 4 (tokens em src/app/globals.css, sem tailwind.config),
  shadcn/ui + Base UI + lucide-react, Supabase, deploy na Vercel.
- Identidade visual: neobrutalismo moderno em dark mode. Fundo #111111, texto
  #F7F3E8, card #1C1C1C, superfície elevada #242424, amarelo Design #FFD84D,
  verde Dev #39FF88. Bordas grossas de 4px, sombras duras sem blur, pouco
  arredondamento, tipografia grande e direta. Detalhes em docs/design-system.md.
- TASK-001 a TASK-015 já foram concluídas. TASK-004 (responsividade) e TASK-005
  (acessibilidade) foram feitas só por leitura de código, sem navegador. Esta
  tarefa existe para fechar essa lacuna com evidência visual real.

REGRA MAIS IMPORTANTE
Os plugins Frontend Design e UI/UX Pro Max vão sugerir uma estética própria:
gradientes, blur, glassmorphism, sombras suaves, animações elaboradas. Isso
CONTRARIA o design system deste projeto. Use os plugins como lente de
diagnóstico e como fonte de boas práticas de hierarquia, espaçamento,
tipografia, contraste, estados e acessibilidade — NÃO como fonte de estilo
visual. O site tem que continuar reconhecível como o mesmo site no final.
Se um plugin sugerir algo que quebre a identidade, registre a sugestão em
docs/ui-ux-audit.md como "rejeitada" e explique o porquê, mas não implemente.

FASE 1 — PREPARAÇÃO
1. Rode `git status -sb`. Se houver mudança local não relacionada, pare e
   registre bloqueio em docs/handoff.md.
2. Leia AGENTS.md, CLAUDE.md, docs/design-system.md, docs/project-status.md,
   docs/backlog.md, o topo de docs/handoff.md e src/app/globals.css.
3. Suba o servidor de desenvolvimento (`npm.cmd run dev`, localhost:3000).
4. Conecte o Claude in Chrome ao Brave (perfil já logado no Supabase/admin).

FASE 2 — CAPTURA DO "ANTES" (sem alterar código)
Para cada rota — /, /design, /dev, /projetos/[slug] (use um slug publicado
real), /contato e /login — e para cada largura — 360, 390, 768, 1280, 1920 —
capture screenshot e salve em docs/ui-review/before/<rota>-<largura>.png.
Em cada rota, leia também o console do navegador e anote erros e warnings.
Nesta fase NENHUMA linha de código muda.

FASE 3 — DIAGNÓSTICO
Analise as capturas + o código dos componentes correspondentes em
src/components/ e src/app/. Avalie, no mínimo:
- overflow horizontal e quebra de layout em 360px;
- hierarquia visual, escala tipográfica e ritmo de espaçamento entre seções;
- densidade e alinhamento de grid nos cards de projeto, tech stack e contato;
- consistência entre as três "vozes" (home, Design amarelo, Dev verde);
- estados de hover, focus, active, disabled, loading e vazio;
- contraste real medido nos pares de cor usados (mínimo AA);
- ordem de tabulação, foco visível e navegação por teclado ao vivo;
- header, mode-switcher e footer em mobile;
- imagens: proporção, object-fit, fallback, e se cabe usar next/image;
- microcopy em pt-BR e primeira pessoa, sem inventar dado nenhum.

Escreva docs/ui-ux-audit.md com os achados priorizados em P0 (quebra ou
bloqueia uso), P1 (prejudica percepção de qualidade) e P2 (refino). Cada achado
precisa de: rota, breakpoint, arquivo/componente, o que está errado, evidência
(nome do screenshot) e correção proposta com esforço estimado.

FASE 4 — PARADA OBRIGATÓRIA
Apresente o plano priorizado e PARE. Não implemente nada antes de eu aprovar
explicitamente quais itens entram. Se eu aprovar só parte, implemente só essa
parte.

FASE 5 — IMPLEMENTAÇÃO
- Um lote = uma rota ou um componente compartilhado. Diff pequeno e revisável.
- Rode `npm.cmd run lint` ao fim de cada lote.
- Prefira ajustar tokens e componentes compartilhados a repetir correção
  pontual em cada página.
- Não instale dependência nova sem me perguntar antes.
- Não toque em Supabase, secrets, .env*, Server Actions, auth ou schema.
- Não reintroduza mock ou placeholder no site público; estado vazio honesto.
- Qualquer animação nova precisa respeitar prefers-reduced-motion.

FASE 6 — CAPTURA DO "DEPOIS"
Repita as capturas nas mesmas rotas e larguras, salvando em
docs/ui-review/after/<rota>-<largura>.png. Compare com o "antes" e resuma o que
mudou visualmente em cada rota.

FASE 7 — VALIDAÇÃO E RELATÓRIO
1. `npm.cmd run lint`
2. `npm.cmd run test`
3. `npm.cmd run build`
4. Confira os critérios de aceite da spec, um a um, e diga quais passaram.
5. Atualize docs/handoff.md (ID da tarefa, arquivos alterados, o que foi feito,
   decisões, testes, resultados, riscos, pendências), docs/backlog.md e
   docs/project-status.md.
6. Me pergunte se docs/ui-review/ deve ser versionado no Git ou ir para o
   .gitignore, e registre a decisão em docs/decisions.md.

Não faça commit sem eu pedir.
```
