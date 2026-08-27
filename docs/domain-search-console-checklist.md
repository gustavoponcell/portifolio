# Checklist — Domínio Final e Search Console

Atualizado em: 2026-08-26.

## Decisão (TASK-012)

O usuário confirmou: por enquanto, o projeto **continua usando o domínio
padrão da Vercel**, sem comprar ou configurar domínio próprio.

URL de produção estável: **`https://poncell-portifolio.vercel.app`**.

O usuário também compartilhou `https://poncell-3qx2rovy7-poncell.vercel.app`
e pediu para verificar se era a URL estável. **Confirmado que não é**:
essa é uma URL de deployment específico (padrão
`{projeto}-{hash-do-build}-{time}.vercel.app`), não o alias estável do
projeto. Evidências checadas via HTTP nas duas URLs:

- `poncell-3qx2rovy7-poncell.vercel.app` respondeu com o header
  `X-Robots-Tag: noindex` — a Vercel adiciona esse header automaticamente
  em URLs de deployment/preview para impedir indexação, e não o adiciona
  no domínio de produção aliado.
- Os dois hosts serviram fingerprints de build diferentes (hashes de CSS
  e fontes distintos), confirmando que são deployments diferentes, não o
  mesmo alias.
- `poncell-portifolio.vercel.app` não tem `X-Robots-Tag: noindex` e já é o
  URL usado desde TASK-002 (validado então pelo usuário como produção
  `Ready`).

Por isso, `https://poncell-portifolio.vercel.app` é o URL correto a
manter como `NEXT_PUBLIC_SITE_URL`.

## Estado confirmado em produção (checado por HTTP nesta sessão)

- `curl https://poncell-portifolio.vercel.app/` → o HTML já traz
  `canonical`, `og:url` e `og:image` apontando para
  `https://poncell-portifolio.vercel.app` (`/og` incluído, da TASK-006).
- `curl https://poncell-portifolio.vercel.app/api/site/health` →
  `{"ok":true,"siteUrlConfigured":true,"supabasePublicConfigured":true,
  "githubUsernameConfigured":true,"publicRoutes":4,"publicProjects":10}`.
- Conclusão: `NEXT_PUBLIC_SITE_URL` **já está correto em Production**,
  apontando para `https://poncell-portifolio.vercel.app`. Nenhuma
  mudança de env var em Production foi necessária.
- `.env.example` atualizado para documentar esse valor atual como
  referência (em vez do placeholder genérico `https://seu-dominio.com`).

## Google Search Console — sem domínio próprio

Como o projeto usa um subdomínio de `vercel.app` (DNS que não pertence ao
projeto), a propriedade do Search Console **deve ser do tipo "Prefixo de
URL"**, não "Domínio" (o tipo "Domínio" exige um registro `TXT` na zona
raiz `vercel.app`, que só a Vercel controla).

Passos para o usuário (exigem login na conta Google do usuário; um agente
de IA não deve nem pode fazer isso):

1. Abrir <https://search.google.com/search-console>.
2. Adicionar propriedade → **Prefixo de URL** →
   `https://poncell-portifolio.vercel.app`.
3. Escolher o método de verificação **"Tag HTML"** (o mais simples aqui,
   já que o projeto não tem Google Analytics/Tag Manager configurado
   ainda — isso é escopo da TASK-013).
4. O Search Console gera um token parecido com
   `abcdefghijklmnopqrstuvwxyz0123456789ABCD`.
5. Definir esse token na env `GOOGLE_SITE_VERIFICATION` no painel da
   Vercel (Settings → Environment Variables → Production) e fazer
   redeploy. **Já preparei o código para isso** (ver abaixo) — nenhuma
   mudança de código é necessária depois que o usuário tiver o token, só
   configurar a env e redeployar.
6. Voltar ao Search Console e clicar em "Verificar".
7. Em **Sitemaps**, submeter:
   `https://poncell-portifolio.vercel.app/sitemap.xml`.
8. Conferir em Cobertura/Páginas que `/admin`, `/login` e `/api/*` não
   aparecem indexados (já garantido por `robots.txt`/`noindex` desde
   TASK-006/007).

## O que já foi implementado nesta tarefa (código)

- `src/app/layout.tsx`: adiciona `metadata.verification.google` lendo de
  `process.env.GOOGLE_SITE_VERIFICATION`, só quando a env existir (não
  gera `<meta name="google-site-verification">` vazio/quebrado quando não
  configurado).
- `.env.example`: documenta `GOOGLE_SITE_VERIFICATION` como opcional, com
  instruções de onde conseguir o valor e por que o tipo "Domínio" não se
  aplica aqui.

## Checklist resumido

- [x] Domínio final decidido: manter `poncell-portifolio.vercel.app`
      (sem domínio próprio por enquanto).
- [x] `NEXT_PUBLIC_SITE_URL` confirmado correto em Production (nenhuma
      mudança necessária).
- [x] Código preparado para verificação do Search Console via env
      (`GOOGLE_SITE_VERIFICATION`).
- [ ] Usuário cria a propriedade "Prefixo de URL" no Search Console
      (exige login Google do usuário).
- [ ] Usuário cola o token de verificação em `GOOGLE_SITE_VERIFICATION`
      na Vercel e faz redeploy.
- [ ] Usuário clica em "Verificar" no Search Console.
- [ ] Usuário submete `sitemap.xml` no Search Console.
- [ ] Confirmar que `/admin`, `/login` e `/api/*` não aparecem indexados.

## Fora de escopo / não feito nesta tarefa

- Comprar ou configurar domínio próprio (usuário optou por não fazer
  isso agora).
- Criar a propriedade no Google Search Console de fato (exige conta
  Google do usuário; um agente de IA não deve autenticar nessa conta).
- Qualquer alteração de DNS (não se aplica: domínio é gerenciado pela
  Vercel).

## Revisitar quando

- O usuário decidir comprar um domínio próprio no futuro — nesse caso,
  reabrir esta tarefa: adicionar o domínio em Vercel → Settings →
  Domains, configurar DNS (`A`/`ALIAS` para o domínio raiz, `CNAME` para
  `www`), atualizar `NEXT_PUBLIC_SITE_URL` para o novo domínio, redeploy,
  e trocar a propriedade do Search Console para o tipo "Domínio".
