# TASK-005 — Auditoria de acessibilidade básica

## Objetivo

Revisar e corrigir problemas básicos de acessibilidade nas rotas públicas e
administrativas principais.

## Escopo

- Navegação por teclado.
- Estados de foco visíveis.
- Contraste de textos, botões, badges e cards.
- Labels de formulários.
- Textos alternativos em imagens relevantes.
- HTML semântico e landmarks.

## Rotas Prioritárias

- `/`
- `/design`
- `/dev`
- `/contato`
- `/login`
- `/admin`
- `/admin/perfil`
- `/admin/experiencias`
- `/admin/cursos`

## Restrições

- Não mudar identidade visual.
- Não criar features novas.
- Não alterar dados reais, Supabase, Auth, Storage ou secrets.
- Não depender só de cor para estado/categoria.

## Critérios de Aceite

- Elementos interativos são alcançáveis por teclado.
- Foco visível em links, botões, inputs e navegação.
- Formulários possuem labels ou nomes acessíveis.
- Imagens relevantes possuem `alt` adequado.
- Não há contraste obviamente insuficiente em textos principais.
- `npm.cmd run lint` e `npm.cmd run build` passam.
- `docs/handoff.md` registra achados e correções.
