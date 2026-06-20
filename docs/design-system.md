# Design System Inicial

## Conceito visual

O design system será baseado em neobrutalismo moderno: forte, direto, editorial e memorável. A interface deve parecer jovem e criativa, mas ainda profissional o suficiente para recrutadores, clientes e parceiros.

## Paleta de cores

Cores principais:

- Design: amarelo.
- Dev: verde.
- Base: preto, off-white, branco e cinza.

Sugestão inicial de tokens:

```text
Preto: #111111
Branco: #FFFFFF
Off-white: #F7F3E8
Cinza claro: #E5E5E5
Cinza médio: #8A8A8A
Amarelo Design: #FFD21E
Verde Dev: #2BE56B
Vermelho de alerta: #FF4D4D
Azul de informação: #3B82F6
```

Os valores podem ser ajustados na etapa de implementação visual, desde que preservem contraste e identidade.

## Uso correto das cores

- Use amarelo para chamadas, destaques, badges e estados ativos do modo Design.
- Use verde para chamadas, destaques, badges e estados ativos do modo Dev.
- Use preto para texto principal, bordas fortes e sombras.
- Use off-white como fundo principal para reduzir dureza visual.
- Use branco em cards, áreas internas e contraste editorial.
- Use cinzas para metadados, descrições secundárias e divisórias.
- Não use amarelo e verde como fundos extensos com texto sem validar contraste.

## Regras de neobrutalismo

- Bordas grossas e visíveis.
- Sombras duras, sem blur ou com blur mínimo.
- Formas simples e geométricas.
- Alto contraste entre fundo, texto e elementos interativos.
- Elementos com presença visual forte.
- Evitar efeitos excessivamente suaves, gradientes decorativos ou estética genérica.
- Preferir composições editoriais com ritmo, escala e assimetria controlada.

## Botões

- Botões primários devem ter borda preta espessa.
- Sombras deslocadas podem indicar profundidade.
- Hover pode mover o botão levemente ou reduzir a sombra.
- Focus deve ser visível e acessível.
- O texto do botão deve ser direto e orientado à ação.
- Botões do modo Design usam amarelo como cor de destaque.
- Botões do modo Dev usam verde como cor de destaque.

## Cards

- Cards devem parecer blocos editoriais.
- Usar borda preta forte.
- Usar sombra dura deslocada.
- Evitar cantos muito arredondados.
- Incluir hierarquia clara: título, descrição, metadados, tags e ação.
- Cards de projeto devem suportar imagem, status de destaque, tecnologias ou categoria.

## Badges

- Badges devem indicar categoria, tecnologia, status ou modo.
- Usar bordas visíveis.
- Manter texto curto.
- Não depender apenas da cor: sempre incluir texto compreensível.
- Badges Design usam amarelo quando houver destaque.
- Badges Dev usam verde quando houver destaque.

## Tipografia

- Títulos grandes, expressivos e diretos.
- Corpo de texto legível em mobile e desktop.
- Evitar espaçamento negativo entre letras.
- Usar peso tipográfico para hierarquia.
- Manter linhas curtas em textos longos.
- A tipografia deve sustentar personalidade sem prejudicar leitura.

## Grid

- Layout responsivo desde o início.
- Usar grids simples de 1, 2 ou 3 colunas conforme largura.
- Evitar sobreposição e cortes em telas pequenas.
- Cards devem manter espaçamento consistente.
- Seções devem ter largura máxima legível.

## Estados de hover e focus

- Hover deve ser perceptível, mas não depender exclusivamente de cor.
- Focus deve ter outline ou tratamento visual forte.
- Estados ativos devem indicar claramente o modo atual.
- Elementos clicáveis precisam ter área de toque confortável.

## Acessibilidade e contraste

- Validar contraste de texto sobre amarelo e verde.
- Não usar cinza claro para texto importante.
- Links devem ser distinguíveis por texto, sublinhado, ícone ou tratamento visual além da cor.
- Imagens relevantes devem ter texto alternativo.
- Animações devem respeitar redução de movimento quando implementadas.

## Diferenciação entre Design e Dev

Design e Dev devem compartilhar a mesma estrutura visual: bordas, sombras, tipografia, grid e componentes. A diferenciação deve vir de:

- Cor de destaque: amarelo para Design, verde para Dev.
- Conteúdo e vocabulário.
- Badges e tags.
- Ícones e metadados.
- Projetos e chamadas específicas.

A experiência não deve parecer dois sites diferentes. Deve parecer um único portfólio com duas lentes complementares.

