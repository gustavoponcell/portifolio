# Design System Inicial

## Atualizacao Prompt 16.5: Dark mode padrao

O modo escuro agora e a identidade principal do portfolio.

Paleta padrao ativa:

```text
Fundo principal: #111111
Texto principal: #F7F3E8
Cards/superficies: #1C1C1C
Superficie elevada: #242424
Borda principal: #F7F3E8
Muted/texto secundario: #B8B8B8
Cinza de apoio: #3A3A3A
Amarelo Design: #FFD84D
Verde Dev: #39FF88
Preto para texto em acentos: #111111
```

Regras:

- Nao existe toggle de tema nesta etapa.
- A paleta clara anterior fica apenas como referencia futura.
- Sombras duras usam off-white para aparecer no fundo escuro.
- Cards padrao usam superficie escura, borda clara e texto claro.
- Cards amarelos/verdes usam texto preto.
- Formularios usam fundo escuro/elevado, texto claro, placeholder secundario e foco visivel.
- O nome publico exibido pelo design system e `Gustavo Poncell`.

## Atualizacao Prompt 16: Contato publico

A pagina `/contato` usa a linguagem neobrutalista existente:

- Hero com badge verde e card informativo.
- Cards de contato com borda grossa, sombra dura e area clicavel clara.
- Estado vazio honesto quando nao ha dados publicos cadastrados.
- CTA final reutiliza botoes Design e Dev.
- Nenhum dado de contato e desenhado como placeholder falso.
- Foco, contraste e texto de acao devem permanecer visiveis em teclado e mobile.

## Atualizacao Prompt 15: Previews e upload

O admin agora usa blocos de upload e preview de imagem com a mesma linguagem neobrutalista:

- Campos de upload usam label explicito, borda grossa, foco visivel e texto de ajuda.
- Previews mostram a imagem quando existe URL publica.
- Sem imagem, o preview usa fallback textual com borda grossa e fundo neutro.
- Uploads de Design mantem amarelo como cor de acento nos botoes.
- Uploads de perfil/admin usam verde como acento operacional.
- Imagens publicas usam `object-cover`, borda grossa e fallback visual quando ausentes.

## Conceito visual

O design system do projeto usa neobrutalismo moderno: visual direto, forte, editorial e memorável, com alto contraste, bordas grossas, sombras duras e tipografia expressiva. A proposta deve parecer jovem e criativa, mas ainda organizada e profissional.

Esta etapa configura a base visual. Ela não representa o design final completo das páginas.

## Compatibilidade com Tailwind 4

O projeto usa Tailwind CSS 4 com configuração via `@tailwindcss/postcss`, `src/app/globals.css` e tokens CSS. Não há necessidade de criar `tailwind.config.*` enquanto a configuração atual atender ao projeto.

Os tokens globais e classes utilitárias ficam em:

```text
src/app/globals.css
```

## Paleta clara de referencia futura

```text
Preto principal: #111111
Off-white / fundo claro: #F7F3E8
Cinza de apoio: #D9D9D9
Amarelo Design: #FFD84D
Verde Dev: #39FF88
Branco: #FFFFFF
```

## Tokens globais

Tokens definidos em `src/app/globals.css`:

```css
--color-background: #F7F3E8;
--color-foreground: #111111;
--color-card: #FFFFFF;
--color-border: #111111;
--color-muted: #D9D9D9;
--color-design: #FFD84D;
--color-dev: #39FF88;
--shadow-brutal: 8px 8px 0 #111111;
--shadow-brutal-sm: 4px 4px 0 #111111;
--radius-brutal: 6px;
```

## Uso das cores

- Use amarelo (`#FFD84D`) para destaque do modo Design.
- Use verde (`#39FF88`) para destaque do modo Dev.
- Use preto para texto principal, bordas, outlines e sombras.
- Use off-white como fundo principal.
- Use branco para cards e superfícies internas.
- Use cinza de apoio para áreas secundárias, separadores e estados neutros.
- Não dependa apenas da cor para comunicar modo ou categoria; mantenha texto claro como "Design", "Dev" ou "Design + Dev".

## Regras de neobrutalismo

- Bordas grossas, preferencialmente 4px.
- Sombras duras e deslocadas, sem blur.
- Pouco arredondamento, usando `--radius-brutal`.
- Tipografia grande, pesada e direta.
- Cards com aparência editorial.
- Hover simples, com deslocamento ou redução de sombra.
- Alto contraste em botões, cards, badges e links.
- Evitar gradientes decorativos, blur ornamental e estética genérica de template.

## Classes utilitárias globais

Classes criadas em `globals.css`:

- `.brutal-border`: borda preta grossa com raio padrão.
- `.brutal-shadow`: sombra dura grande.
- `.brutal-shadow-sm`: sombra dura menor.
- `.brutal-card`: card branco com borda grossa e sombra dura.
- `.brutal-button`: base de botão com borda, sombra e hover deslocado.
- `.brutal-section`: largura e espaçamento padrão para seções.
- `.accent-design`: fundo amarelo com texto preto.
- `.accent-dev`: fundo verde com texto preto.
- `.text-balance`: equilíbrio de quebra de linha para títulos.

## Componentes shadcn/ui

Componentes adicionados em `src/components/ui/`:

- `button`
- `card`
- `badge`
- `separator`

Eles servem como base de UI reutilizável para etapas futuras. Os componentes próprios de marca podem usar ou complementar esses componentes conforme a necessidade.

## Componentes próprios de marca

Componentes criados em `src/components/brand/`:

- `BrutalCard`: wrapper visual com fundo branco, borda grossa e sombra dura.
- `BrutalButton`: botão ou link com variantes `default`, `design`, `dev` e `outline`.
- `SectionHeading`: título de seção com eyebrow opcional, descrição e acento visual.
- `ModeBadge`: badge para identificar Design, Dev ou Design + Dev.

## Botões

- Devem ter borda preta grossa.
- Devem usar sombra dura menor.
- Hover pode deslocar levemente o elemento.
- Estados de foco devem ser fortes e visíveis.
- Botões Design usam amarelo.
- Botões Dev usam verde.
- Botões neutros usam preto, branco ou off-white.

## Cards

- Cards devem usar fundo branco, borda preta grossa e sombra dura.
- Devem ter hierarquia clara: título, descrição, tags e ação.
- Devem continuar legíveis em mobile.
- Evite cards aninhados sem necessidade.

## Badges

- Badges devem identificar modo, categoria, tecnologia ou status.
- Devem ter texto curto e compreensível.
- Design usa amarelo; Dev usa verde; híbrido usa base neutra.
- Não use apenas cor: o texto precisa indicar o significado.

## Tipografia

- Títulos devem ser grandes, pesados e expressivos.
- Texto corrido deve priorizar legibilidade.
- Não usar letter spacing negativo.
- Eyebrows e badges podem usar uppercase com espaçamento positivo.

## Acessibilidade

- Manter contraste alto.
- Garantir foco visível.
- Usar HTML semântico.
- Não comunicar informações apenas por cor.
- Manter áreas clicáveis confortáveis.
- Evitar animações excessivas.

## Diferença entre Design e Dev

Design e Dev devem parecer partes de um único portfólio. A estrutura, bordas, sombras, tipografia e componentes permanecem consistentes. A diferença vem principalmente do acento de cor, conteúdo, badges e linguagem de cada modo.

## Header global

- Deve usar fundo off-white ou branco.
- Deve ter borda inferior preta grossa.
- Deve exibir a marca/nome do site e o posicionamento "Design + Desenvolvimento".
- Deve conter navegação para Início, Design e Dev.
- Deve conter link visível para Admin, sem autenticação real nesta etapa.
- Em telas pequenas, a navegação pode quebrar linha e permanecer compacta, sem menu hambúrguer complexo.
- O link ativo deve receber reforço visual além de cor, como sombra, fundo ou `aria-current`.

## Footer global

- Deve ter borda superior preta grossa.
- Pode usar fundo preto com texto claro, desde que mantenha contraste.
- Deve repetir nome, posicionamento e links internos principais.
- Deve informar que contato e redes sociais serão configurados futuramente quando dados reais ainda não estiverem documentados.
- Não deve inventar telefone, e-mail ou links externos.

## Navegação entre modos

- A alternância visual entre Design e Dev é definida pela rota, não por estado global.
- `/design` e rotas filhas devem ativar o modo Design.
- `/dev` e rotas filhas devem ativar o modo Dev.
- Design usa amarelo.
- Dev usa verde.
- O estado ativo deve ser indicado por cor e também por texto/estrutura acessível.
- Não implementar troca de tema real, dark mode ou persistência em `localStorage` nesta etapa.

## Home

- A Home deve usar seções amplas, com respiro e hierarquia forte.
- O Hero deve ter apenas um `h1`; seções internas usam `h2`.
- Cards de modo funcionam como portas de entrada para Design e Dev.
- O modo Design deve usar amarelo em badges, botões e blocos de destaque.
- O modo Dev deve usar verde em badges, botões e blocos de destaque.
- Projetos em destaque usam cards brancos com borda grossa, sombra dura, badge de tipo, tags e link interno para `/projetos/[slug]`.
- Seções de sobre, áreas de atuação e contato futuro devem ser claras sem inventar dados pessoais.
- O contato da Home é apenas uma chamada visual até que dados reais sejam cadastrados.

## Modo Design

- O amarelo `#FFD84D` deve ser a cor dominante de destaque.
- Verde pode aparecer apenas como ponte para o Modo Dev ou elemento secundário.
- A página deve ter aparência de cartaz, peça gráfica ou composição editorial, sem depender de imagens reais.
- O Hero do Design deve ter apenas um `h1`; seções internas usam `h2`.
- Cards de áreas criativas usam bordas grossas, sombra dura e marcadores visuais.
- Projetos de design são exibidos a partir de `src/data/mock-projects.ts`, filtrados por `type: "design"`.
- Cards de projeto devem mostrar badge Design, título, descrição, tags e link interno para `/projetos/[slug]`.
- A seção Behance futura deve comunicar "Em breve" sem link falso, API ou integração real.
- Não inventar clientes, métricas, empresas, imagens externas ou links de Behance.

## Modo Dev

- O verde `#39FF88` deve ser a cor dominante de destaque.
- Amarelo pode aparecer apenas como ponte para o Modo Design ou elemento secundário.
- A página deve parecer técnica e de produto digital, usando blocos, grids, badges, pseudo-terminal e cards estruturados.
- O Hero do Dev deve ter apenas um `h1`; seções internas usam `h2`.
- Cards de stack e tecnologias usam borda grossa, sombra dura, badges e descrição curta.
- Projetos dev são exibidos a partir de `src/data/mock-projects.ts`, filtrados por `type: "dev"`.
- Cards de projeto devem mostrar badge Dev, título, descrição, tags e link interno para `/projetos/[slug]`.
- A seção GitHub futura deve comunicar "Integração futura" sem token, API, busca real ou link falso.
- Não inventar repositórios, métricas, clientes, imagens externas ou URLs de GitHub.
- Design e Dev devem manter a mesma base estrutural; a diferença visual vem de acento de cor e vocabulário.

## Cards de Repositório GitHub

- Devem usar a base neobrutalista: card branco, borda grossa e sombra dura.
- Devem manter verde como destaque principal em linguagem, badges e metadados.
- Devem exibir nome, descrição, linguagem, tópicos, estrelas, forks e atualização.
- Links externos só aparecem quando a URL real começa com `https://github.com/`.
- Quando a origem for fallback, a interface deve avisar que os dados são temporários.
- Nunca exibir token, headers sensíveis ou detalhes internos da requisição.

## Páginas individuais de projeto

- A página de detalhe deve ter apenas um `h1`, localizado no hero do projeto.
- Projetos Design usam amarelo em hero, tags, galeria placeholder e botões principais.
- Projetos Dev usam verde em hero, tags, galeria placeholder e botões principais.
- O bloco visual do hero pode ser um placeholder neobrutalista quando `cover` ainda não existir.
- A sidebar de detalhes aparece lateralmente em desktop e como bloco empilhado no mobile.
- Galerias sem imagem real devem usar cards placeholder com título e descrição, sem inventar imagens externas.
- Links externos só aparecem quando `externalUrl`, `repositoryUrl` ou `liveUrl` existirem.
- Quando não houver links, a interface deve explicar de forma discreta que acessos públicos serão adicionados futuramente.
- Projetos relacionados devem manter cards com badge de modo, descrição curta, tags e link interno.

## Prompt 16.6: modo escuro e contraste

- O modo escuro usa base global `#0f0f0f`, cards `#181818`, superficies `#222222`, texto principal claro e texto secundario suavizado.
- Cards amarelos (`bg-design`) e verdes (`bg-dev`) com texto devem aplicar `ink-on-accent` para garantir texto preto e borda preta.
- Blocos escuros dentro de cards amarelos ou verdes devem aplicar `surface-on-accent`, preservando fundo escuro, texto claro e borda visivel.
- A interface nao deve depender de regra global que force texto preto em todo filho de `bg-design` ou `bg-dev`, pois isso quebra terminais, blocos tecnicos e mensagens internas.
- Mensagens de login/admin devem ser amigaveis: nao exibir nomes crus de variaveis, caminhos de ambiente ou strings com aparencia de codigo.
- Nomes tecnicos continuam permitidos em documentacao, `.env.example`, rotas internas e codigo servidor, mas nao como copy visivel da interface.
