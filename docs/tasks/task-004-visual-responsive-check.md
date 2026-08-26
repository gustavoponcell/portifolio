# TASK-004 — Teste visual e responsivo manual

## ID

TASK-004

## Objetivo

Validar visualmente o portfólio em diferentes tamanhos de tela e corrigir
problemas objetivos de layout, legibilidade, clipping, sobreposição, excesso de
quebra de texto ou estados visuais quebrados.

## Contexto

TASK-002 confirmou que a produção está saudável e TASK-003 confirmou que não há
exposição objetiva de secrets. A próxima etapa é garantir que a experiência
visual neobrutalista continue forte e utilizável em mobile, tablet e desktop.

## Arquivos Provavelmente Envolvidos

- `src/app/page.tsx`
- `src/app/design/page.tsx`
- `src/app/dev/page.tsx`
- `src/app/contato/page.tsx`
- `src/app/projetos/[slug]/page.tsx`
- `src/components/**`
- `src/app/globals.css`
- `docs/handoff.md`

## Rotas Para Verificar

- `/`
- `/design`
- `/dev`
- `/contato`
- `/login`
- `/projetos/bacanal-da-dionisios`
- `/projetos/jequitimuu-identidade-visual`
- `/projetos/xi-sintegra-tecnologia`

## Viewports Mínimos

- Mobile pequeno: `360x740`
- Mobile grande: `430x932`
- Tablet: `768x1024`
- Notebook: `1366x768`
- Desktop: `1440x900`

## Requisitos

- Rodar o projeto localmente.
- Inspecionar as rotas acima nos viewports definidos.
- Registrar problemas objetivos com rota, viewport e descrição curta.
- Corrigir apenas problemas reais encontrados.
- Preservar a identidade neobrutalista:
  - fundo escuro;
  - bordas grossas;
  - sombras duras;
  - amarelo para Design;
  - verde para Dev;
  - alto contraste.
- Não trocar a direção visual do projeto.
- Não mexer em Supabase, Auth, Storage, schema, dados reais ou secrets.
- Não criar novas seções ou features durante esta tarefa.

## Critérios de Aceite

- Não há conteúdo horizontalmente cortado em mobile.
- Cards, botões, badges, imagens e navegação não se sobrepõem.
- Textos principais continuam legíveis.
- Tags/badges têm contraste suficiente no modo escuro.
- Header e navegação funcionam em mobile e desktop.
- Páginas de projeto continuam com layout consistente.
- `npm.cmd run lint` passa.
- `npm.cmd run build` passa.
- `docs/handoff.md` registra rotas/viewports revisados, problemas corrigidos e
  pendências.

## Testes Necessários

```powershell
npm.cmd run lint
npm.cmd run build
```

Quando possível, usar navegador ou Playwright para capturar screenshots locais.

## Validação Pelo ChatGPT/Codex

ChatGPT/Codex deverá:

- revisar o diff visual e estrutural;
- conferir se não houve mudança fora de escopo;
- validar `lint` e `build`;
- decidir se precisa de nova rodada visual.

## Prompt Para Claude Code

Use exatamente esta tarefa como escopo. Leia `AGENTS.md`, `CLAUDE.md`,
`docs/project-status.md`, `docs/backlog.md`, `docs/handoff.md` e este arquivo.
Faça uma revisão visual/responsiva objetiva, corrija apenas problemas reais e
registre o resultado no topo de `docs/handoff.md`. Não faça commit.
