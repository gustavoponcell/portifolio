# TASK-006 — Auditoria SEO e compartilhamento

## Objetivo

Validar e melhorar SEO técnico básico, metadados sociais e arquivos públicos de
indexação.

## Escopo

- Titles e descriptions por rota.
- Open Graph e Twitter Card.
- Canonical e `NEXT_PUBLIC_SITE_URL`.
- `sitemap.xml`.
- `robots.txt`.
- `manifest.webmanifest`.
- JSON-LD quando aplicável.
- Imagem OG final ou plano claro para adicioná-la.

## Rotas Prioritárias

- `/`
- `/design`
- `/dev`
- `/contato`
- `/projetos/[slug]`

## Restrições

- Não criar conteúdo falso para SEO.
- Não expor rotas admin em sitemap.
- Não indexar `/admin` ou `/login`.
- Não mexer em domínio sem confirmação do usuário.

## Critérios de Aceite

- Rotas públicas possuem metadata coerente.
- `/admin` e `/login` permanecem `noindex`.
- Sitemap contém apenas URLs públicas apropriadas.
- Robots aponta corretamente para sitemap.
- `npm.cmd run lint` e `npm.cmd run build` passam.
- `docs/handoff.md` registra alterações e pendências.
