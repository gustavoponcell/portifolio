# Auditoria de UI/UX — TASK-016

Data: 2026-08-27.

Diagnóstico de UI/UX do frontend público com evidência visual real (Claude in
Chrome, navegador Brave/Chrome via extensão), complementado por medição
objetiva de layout via DOM (`scrollWidth`/`clientWidth`) e consulta à skill
**UI/UX Pro Max** como lente de boas práticas (não como fonte de estilo).
Nenhuma linha de código foi alterada nesta fase — apenas leitura e medição.

**Nenhuma linha de código muda nesta etapa.** Este documento é o diagnóstico.
Aguardando aprovação explícita do usuário antes de implementar qualquer item
(FASE 4 — parada obrigatória, conforme `docs/tasks/task-016-frontend-ui-ux-review.md`).

## Cobertura de captura

Rotas testadas: `/`, `/design`, `/dev`, `/projetos/bacanal-da-dionisios`
(slug real publicado), `/contato`, `/login`.

Breakpoints alvo: 360, 390, 768, 1280, 1920.

| Rota | 360 | 390 | 768 | 1280 | 1920 |
|---|---|---|---|---|---|
| `/` (home) | ✅ | ✅ | ✅ | ✅ | ⚠️ parcial |
| `/design` | ✅ | ✅ | ✅ | ✅ | ⚠️ parcial |
| `/dev` | ✅ | ✅ | 🔬 sem overflow | 🔬 sem overflow | 🔬 sem overflow |
| `/projetos/bacanal-da-dionisios` | ✅ | ✅ | 🔬 sem overflow | 🔬 sem overflow | 🔬 sem overflow |
| `/contato` | ✅ | ✅ | 🔬 sem overflow | 🔬 sem overflow | 🔬 sem overflow |
| `/login` | ✅ | ✅ | 🔬 sem overflow | 🔬 sem overflow | 🔬 sem overflow |

Legenda: ✅ screenshot real salvo em `docs/ui-review/before/`. ⚠️ parcial =
screenshot salvo, mas recortado a ~1600px de largura visível (limite do
ambiente nesta sessão, ver "Limitação de ambiente" abaixo) em vez de 1920px
completos — o conteúdo capturado é fiel ao layout real, só a lateral direita
do canvas de 1920px não coube na captura. 🔬 sem overflow = sem screenshot
salvo (bloqueio de ambiente), mas a rota foi carregada num iframe com a
largura exata do breakpoint e o layout foi medido objetivamente via
`document.documentElement.scrollWidth` vs `clientWidth` diretamente no DOM —
todas retornaram `overflowX: false` (sem overflow horizontal) nesses
breakpoints/rotas.

### Limitação de ambiente (não é bug do site)

A ferramenta `resize_window` do Claude in Chrome não redimensionou a janela
real do navegador nesta sessão (sempre reportou sucesso, mas
`window.innerWidth` não mudava). A janela oscilou sozinha ao longo da sessão
(2552px → 3190px → 1600px → 450px), sem ação minha, provavelmente por algo no
ambiente Windows fora do alcance destas ferramentas. Depois de confirmar o
problema e perguntar ao usuário, a orientação foi seguir com a cobertura
possível. Para contornar, usei um iframe controlado por JavaScript dentro da
aba (largura/altura exatas por breakpoint, disparando os media queries reais
da página) e recortei a captura exatamente na região do iframe — técnica
validada visualmente contra capturas diretas antes de ser usada em escala.
Quando a janela real ficou pequena demais (450px) para caber os breakpoints
maiores na captura, mantive a medição objetiva de overflow (que não depende
do tamanho da janela, só da largura do iframe) e não force screenshots
recortados sem valor de evidência.

**Pendência:** capturar `docs/ui-review/before/{dev,projeto,contato,login}-{768,1280,1920}.png`
quando o ambiente permitir uma janela de navegador estável e grande o
suficiente. Como a medição de overflow já confirma ausência de quebra
estrutural nesses pontos, isso não bloqueia a aprovação dos achados abaixo,
mas fica registrado como lacuna de evidência visual.

## Console do navegador

Console lido (via `read_console_messages`) depois de recarregar cada uma das
6 rotas. **Zero erros, zero exceptions.** Mensagens presentes são só logs
esperados de ambiente de desenvolvimento: aviso do React DevTools, `[HMR]
connected` (Turbopack), e logs de debug do Vercel Web Analytics/Speed
Insights (que só aparecem em dev, não enviam dados reais — comportamento
documentado em TASK-013). Nenhum warning de hidratação, nenhum erro de rede,
nenhum `404` de asset.

## Navegação por teclado e foco

Testado ao vivo na Home: clique fora de qualquer elemento + `Tab` move o foco
corretamente para o primeiro link interativo em ordem de leitura (ex.: "Ver
meu lado Design"). O elemento focado recebe contorno verde sólido de
`3.75px` com offset de `3.75px`, mais a `box-shadow` própria do componente —
foco fortemente visível, consistente com a regra do design system
(`:focus-visible` global). Nenhum indício de foco removido ou suprimido.

## Achados

### P0 — quebra ou bloqueia uso

Nenhum achado P0. Nenhuma rota está quebrada, inacessível ou com erro de
console/build.

### P1 — prejudica qualidade, legibilidade ou responsividade

#### P1-1 — Overflow horizontal real em `/contato` (360px e 390px) — ✅ corrigido

- **Rota:** `/contato`
- **Breakpoint:** 360, 390 (confirmado sem overflow a partir de 768)
- **Arquivo/componente:** `src/components/contact/contact-links-section.tsx:22`
  (grid container) + `src/components/contact/contact-link-card.tsx` (card
  sem `min-w-0`)
- **Evidência:** `docs/ui-review/before/contato-360.png`,
  `docs/ui-review/before/contato-390.png` — barra de rolagem horizontal
  visível na parte inferior da viewport. Medição DOM: em 360px,
  `scrollWidth: 446` vs `clientWidth: 341` (105px de overflow); em 390px,
  `scrollWidth: 446` vs `clientWidth: 371` (75px de overflow).
- **Problema:** a grade "Canais disponíveis" (`grid gap-5 md:grid-cols-2
  xl:grid-cols-3`) não força os cards a respeitar a largura da coluna única
  abaixo de `md` (768px). Os cards de contato (e-mail, telefone, WhatsApp
  etc.) ficam com ~430px de largura de conteúdo, maior que a viewport,
  gerando rolagem horizontal real e cortando texto/bordas do card.
  Confirmado via inspeção de elemento que o filho (`<a class="brutal-card
  ...">`) excede o container mesmo com a classe `break-words` no texto do
  valor — comportamento clássico de grid item sem `min-width: 0`, que herda
  o tamanho de conteúdo máximo (`min-content`) da grade antes de quebrar
  linha.
- **Correção proposta:** adicionar `min-w-0` ao `div` da grade
  (`contact-links-section.tsx:22`) e/ou ao card (`contact-link-card.tsx:10`)
  — padrão conhecido para este bug de CSS Grid no Tailwind. Não deve afetar
  o layout em `md:`/`xl:`, onde já não há overflow.
- **Esforço estimado:** baixo (1 classe utilitária, 1–2 arquivos).
- **Implementado:** `min-w-0` adicionado ao container grid
  (`contact-links-section.tsx:22`) e ao card (`contact-link-card.tsx:10`).
  Confirmado via medição DOM: `scrollWidth === clientWidth` em 360px e 390px
  depois da correção (antes: 446 vs 341/371). Evidência "depois":
  `docs/ui-review/after/contato-360.jpg`, `docs/ui-review/after/contato-390.jpg`.

#### P1-2 — Overflow horizontal residual em `/dev` (360px) — ❌ revertido: falso positivo do ambiente de teste

- **Rota:** `/dev`
- **Breakpoint:** 360.
- **Status final: não é um bug real do site.** Achado revertido depois da
  revisão Codex e de investigação adicional — ver histórico abaixo.
- **O que aconteceu:** o diagnóstico inicial mediu `scrollWidth: 345` vs
  `clientWidth: 341` (4px) dentro do iframe de teste usado para emular os
  breakpoints, e uma barra de rolagem horizontal ficou visível no
  screenshot `docs/ui-review/before/dev-360.png`. Concluí (incorretamente)
  que era um overflow real e apliquei `overflow-x: hidden` em `html` e
  `body` (`src/app/globals.css`) como correção.
- **Revisão Codex (`/codex:review`) encontrou 2 problemas objetivos nessa
  correção:**
  1. `overflow-x: hidden` em `html`/`body` força o navegador a computar
     `overflow-y` como `auto` quando ele não é `visible`/`clip` nos dois
     eixos ao mesmo tempo — comportamento documentado da spec de CSS
     Overflow que é causa conhecida de `position: sticky` parar de
     funcionar (principalmente Safari). O header do site
     (`src/components/layout/site-header.tsx:23`) é
     `sticky top-0 z-40`, então a correção tinha risco real de quebrar a
     navegação fixa no topo em produção.
  2. A correção tratava sintoma, não causa raiz, e duplicava proteção que
     o fix de `/contato` (`min-w-0`, esse sim root-cause) já cobria —
     mascarando silenciosamente qualquer overflow horizontal legítimo
     futuro (ex.: uma tabela larga) em vez de deixá-lo aparente.
- **Investigação adicional após o alerta do Codex:** revertido
  `overflow-x: hidden` de `src/app/globals.css` imediatamente. Reproduzi o
  teste com uma altura de iframe realista (800px, como um celular real) e
  medi `window.innerWidth` (largura real do viewport, 360) contra
  `document.documentElement.clientWidth` (345) e `scrollWidth` (346):
  `clientWidth` estava **15px menor que o innerWidth real**, porque o
  conteúdo de `/dev` é mais alto que 800px e isso força uma barra de
  rolagem vertical *dentro do iframe de teste* — e iframes no Chrome
  desktop usam barra de rolagem clássica (reserva espaço), diferente de
  navegadores mobile reais, que usam barra de rolagem sobreposta (não
  reserva espaço). Ou seja: `clientWidth` (345) já vinha reduzido pela
  barra de rolagem vertical do meu próprio ambiente de teste, não do site.
  Comparando contra a largura real do viewport (`innerWidth: 360`), o
  conteúdo (`scrollWidth: 346`) **cabe com folga** — não há overflow real.
- **Conclusão:** `/dev` nunca teve um bug de overflow horizontal real. O
  achado original foi um falso positivo causado por testar dentro de um
  iframe aninhado no Chrome desktop (barra de rolagem clássica) em vez de
  um viewport de topo real ou um dispositivo móvel real (barra de rolagem
  sobreposta). **Nenhuma mudança de código foi mantida para este item.**
  `src/app/globals.css` voltou ao estado original.
- **Lição para próximas rodadas desta auditoria:** ao usar a técnica de
  iframe para emular breakpoints, comparar overflow contra
  `iframe.contentWindow.innerWidth` (largura real do viewport), não contra
  `document.documentElement.clientWidth` (que pode vir reduzido pela barra
  de rolagem vertical clássica do iframe aninhado). O achado de `/contato`
  (105px/75px de diferença) está muito acima dessa margem de erro de ~15px
  e continua válido e corrigido.

### P2 — refinamento

#### P2-1 — Linha órfã no título de `/design` em telas médias — ✅ implementado

- **Rota:** `/design`
- **Breakpoint:** 390, 768 (mais sutil em 1280)
- **Arquivo/componente:** `src/components/design/design-hero-section.tsx:12-13`
- **Evidência:** `docs/ui-review/before/design-390.png`,
  `docs/ui-review/before/design-768.png`.
- **Problema:** mesmo com a classe `text-balance` já aplicada ao `h1`, a
  palavra "e" fica isolada em uma linha própria em alguns breakpoints ("...a
  ideias, marcas / e experiências / digitais." em 390px), quebrando o ritmo
  visual do título de maior destaque da página. `text-wrap: balance`
  minimiza o desequilíbrio geral de linhas, mas não impede especificamente
  uma conjunção órfã.
- **Correção proposta:** ajustar `max-w-*` do `h1` especificamente em
  `sm:`/`md:` para mudar os pontos de quebra, ou aceitar como comportamento
  do algoritmo do navegador (baixo risco, mas comprometido com identidade
  editorial do design system). Não requer mudança de token/cor.
- **Esforço estimado:** baixo (ajuste de classe, precisa validação visual
  manual nos breakpoints intermediários).
- **Implementado:** inserido um espaço não separável (`&nbsp;`/` `)
  entre "e" e "experiências" no texto do `h1`
  (`design-hero-section.tsx:13`), forçando as duas palavras a permanecerem
  na mesma linha independente de onde `text-wrap: balance` decidir quebrar
  as demais linhas. Não altera nenhum token, cor ou classe de layout —
  só o texto. Confirmado visualmente em 390px e 768px (via captura de tela
  real): "marcas e experiências" agora sempre fica na mesma linha, sem
  palavra isolada.

#### P2-2 — Ausência de link "pular para o conteúdo" — ✅ implementado

- **Rota:** todas (header compartilhado)
- **Breakpoint:** N/A (funcional, não visual)
- **Arquivo/componente:** `src/components/layout/site-shell.tsx`,
  `src/components/layout/site-header.tsx`
- **Evidência:** leitura de código + navegação por teclado ao vivo
  confirmada funcional, mas sem atalho.
- **Problema:** usuário de teclado/leitor de tela precisa tabular por todos
  os itens de navegação do header (marca, Design, Dev, Início, Design, Dev,
  Contato, Área restrita) em **toda página** antes de alcançar o conteúdo
  principal. Não é um bloqueio (a navegação funciona e o foco é visível),
  mas é fricção evitável.
- **Correção proposta:** adicionar um link "Pular para o conteúdo",
  visualmente oculto e visível apenas no foco (`sr-only focus:not-sr-only`
  ou padrão equivalente do projeto), apontando para o `id` do `<main>` em
  `site-shell.tsx`.
- **Esforço estimado:** baixo.
- **Implementado:** adicionado link "Pular para o conteúdo" em
  `site-shell.tsx`, primeiro elemento focável da página, usando `sr-only`
  (Tailwind) + `focus:not-sr-only` com o mesmo vocabulário visual do
  design system (borda grossa, sombra dura, tipografia maiúscula) em vez
  das classes `.brutal-*` customizadas (que não suportam variante
  `focus:` por serem definidas em `@layer components`, não como
  `@utility`). `<main>` recebeu `id="main-content"` como alvo.
  **Correção adicional depois da revisão Codex**: o `<main>` não tinha
  `tabIndex={-1}`, então, pela especificação de HTML, a navegação por
  fragmento (`#main-content`) não move o foco de teclado de verdade — só
  rola a página, dando a falsa impressão de que funcionava (o teste
  anterior só confirmava que o `<a>` do skip-link em si era focável, não
  que ativar o link movia o foco para o `<main>`). Corrigido com
  `tabIndex={-1}` + `focus:outline-none` (para não desenhar um contorno de
  foco ao redor de todo o conteúdo da página) em `site-shell.tsx`.
  Confirmado via `document.querySelector('a[href="#main-content"]').click()`
  seguido de `document.activeElement` retornando o `<main id="main-content"
  tabIndex="-1">` — o fluxo real de skip-link agora funciona de ponta a
  ponta, não só o link em si.

#### P2-3 — Alvos de toque abaixo do recomendado no seletor Design/Dev — ✅ implementado

- **Rota:** `/` (e presumivelmente `/design`, `/dev`, que compartilham o
  header)
- **Breakpoint:** 360
- **Arquivo/componente:** componente do seletor de modo no header (pílulas
  "Design"/"Dev" no topo, distintas dos itens de navegação principal)
- **Evidência:** medição DOM em 360px — pílulas "Design"/"Dev" do seletor de
  modo com 32px de altura; itens de navegação principal ("Início", "Design",
  "Dev", "Contato", "Área restrita") com 43px de altura.
- **Problema:** 32px está abaixo da recomendação de alvo de toque confortável
  de 44×44px (ainda dentro do mínimo AA de 24×24px do WCAG 2.5.8, portanto
  não é uma falha de conformidade, só um refinamento de conforto de toque).
  Os itens de navegação principal, a 43px, já estão praticamente no alvo
  recomendado (diferença de 1px, imperceptível).
- **Correção proposta:** aumentar levemente o padding vertical do seletor de
  modo Design/Dev no header em mobile, se não comprometer a hierarquia visual
  com os itens de navegação principal.
- **Esforço estimado:** baixo.
- **Implementado:** `py-2` → `py-3.5` em `mode-switcher.tsx`. Confirmado
  por medição DOM: altura das pílulas "Design"/"Dev" passou de 32px para
  exatamente **44px**, alinhado com a recomendação de alvo de toque
  confortável. Mudança aplicada em todos os breakpoints (não só mobile),
  já que o seletor não fica maior o suficiente para comprometer a
  hierarquia visual com os itens de navegação principal (43px).

## Sugestões descartadas (fora da identidade do projeto)

Nenhuma sugestão de estética genérica (gradiente decorativo, blur, vidro
fosco, sombra suave, animação elaborada) foi levantada durante este
diagnóstico — a consulta à UI/UX Pro Max foi direcionada a boas práticas de
UX (overflow, alvo de toque, foco, movimento), não a paletas ou efeitos
visuais, então não houve nada a rejeitar nesta rodada. Caso apareçam
sugestões desse tipo durante a implementação, serão registradas aqui como
"rejeitada" com justificativa, sem implementação, conforme a regra da
tarefa.

## Itens fora de escopo confirmados

- Contraste de cor: não foi remedido nesta sessão (TASK-005 já validou os
  principais pares de token acima do mínimo AA; nenhuma mudança de cor foi
  encontrada ou proposta nesta auditoria).
- `next/image` para fotos/capas reais: pendência já registrada em TASK-014,
  não é um achado novo desta tarefa.
- `/admin/*`: fora de escopo desta tarefa por definição.
- Dados, Supabase, autenticação, SEO, infraestrutura: não tocados.

## Resumo para aprovação

| Prioridade | Quantidade | Status |
|---|---|---|
| P0 | 0 | — |
| P1 | 2 (`/contato` overflow, `/dev` overflow) | `/contato` ✅ corrigido e validado. `/dev` ❌ revertido — revisão Codex + investigação adicional confirmaram falso positivo do ambiente de teste, não um bug real. |
| P2 | 3 (linha órfã, skip-link, alvo de toque) | ✅ Os 3 implementados e validados (aprovados pelo usuário numa segunda rodada). |

**Status final:** `/contato` (P1-1), a linha órfã do `h1` de `/design`
(P2-1), o skip-link (P2-2) e o alvo de toque do seletor Design/Dev (P2-3)
estão implementados, validados por `lint`/`test`/`build` e confirmados
visualmente/por medição DOM. `/dev` (P1-2) não teve nenhuma mudança de
código mantida — nunca foi um bug real. `docs/ui-review/` não é versionado
no Git (DEC-009 em `docs/decisions.md`). Ver `docs/handoff.md` para o
relatório completo desta rodada (testes, build, riscos, pendências).
