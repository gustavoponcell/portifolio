# Checklist — Domínio Final e Search Console

Atualizado em: 2026-08-26.

Este documento é um guia reutilizável, independente do domínio final
escolhido. Nenhum passo aqui foi executado — é planejamento, conforme
TASK-012.

## Pendência bloqueante

O domínio final ainda não foi confirmado pelo usuário. Nenhum passo desta
seção pode ser concluído sem essa resposta:

- Qual é o domínio final desejado (ex.: `gustavopon cell.com`,
  `gustavoponcell.dev`, um subdomínio, ou manter
  `poncell-portifolio.vercel.app`)?
- O domínio já foi comprado em algum registrador (Registro.br, Namecheap,
  GoDaddy, Cloudflare, etc.), ou ainda precisa ser comprado?
- Quem tem acesso ao painel de DNS desse domínio?

## Passo 1 — Adicionar o domínio na Vercel

1. Abrir o projeto na Vercel → **Settings → Domains**.
2. Adicionar o domínio final (ex.: `seu-dominio.com` e, se quiser,
   `www.seu-dominio.com`).
3. A Vercel mostra os registros DNS exatos exigidos para aquele domínio
   específico (variam por caso, por isso não há valores fixos aqui).
4. Definir qual dos dois (`seu-dominio.com` ou `www.seu-dominio.com`) é o
   domínio primário; o outro deve redirecionar (a própria Vercel oferece
   essa opção).

## Passo 2 — Configurar DNS (padrão geral, confirmar valores exatos na Vercel)

- **Domínio raiz/apex** (`seu-dominio.com`): normalmente um registro `A`
  apontando para o IP da Vercel, ou `ALIAS`/`ANAME` se o provedor de DNS
  suportar.
- **Subdomínio `www`**: normalmente um registro `CNAME` apontando para
  `cname.vercel-dns.com`.
- Propagação de DNS pode levar de minutos a até 48h dependendo do
  registrador/TTL.
- A Vercel verifica automaticamente e emite certificado SSL (Let's
  Encrypt) assim que o DNS propaga — nenhuma ação manual de certificado é
  necessária.

## Passo 3 — Atualizar `NEXT_PUBLIC_SITE_URL`

Só depois que o domínio estiver ativo e confirmado pelo usuário:

1. Atualizar a env `NEXT_PUBLIC_SITE_URL` no painel da Vercel
   (Settings → Environment Variables, ambiente Production) para a URL
   final (ex.: `https://seu-dominio.com`).
2. Fazer um novo deploy (redeploy) para que `metadata`, `sitemap.xml`,
   `robots.txt` e `/og` passem a usar a URL final.
3. Confirmar `sitemap.xml`/`robots.txt` na nova URL antes de prosseguir
   para o Search Console.

Esta sessão **não** deve alterar `NEXT_PUBLIC_SITE_URL` real (Vercel) nem
`.env.local` sem confirmação explícita do usuário sobre o domínio final.

## Passo 4 — Google Search Console

1. Criar/abrir a propriedade em <https://search.google.com/search-console>.
2. Escolher tipo de propriedade:
   - **Domínio** (recomendado): cobre `http`/`https` e todos os
     subdomínios, mas exige verificação via registro `TXT` no DNS.
   - **Prefixo de URL**: verifica só `https://seu-dominio.com` (ou
     `www`), com mais opções de verificação (arquivo HTML, tag
     meta, Google Analytics/Tag Manager já configurado).
3. Verificar a propriedade pelo método escolhido.
4. Em **Sitemaps**, submeter `https://seu-dominio.com/sitemap.xml`.
5. Conferir em **Cobertura/Páginas** que `/admin`, `/login` e `/api/*`
   não aparecem indexados (já bloqueados por `robots.txt` e `noindex`,
   confirmado nas TASK-006/007).

## Checklist resumido

- [ ] Domínio final confirmado pelo usuário.
- [ ] Domínio comprado (se ainda não foi).
- [ ] Domínio adicionado em Vercel → Settings → Domains.
- [ ] Registros DNS configurados conforme exigido pela Vercel.
- [ ] DNS propagado e certificado SSL emitido (automático pela Vercel).
- [ ] `NEXT_PUBLIC_SITE_URL` atualizada em Production (só após confirmação).
- [ ] Redeploy feito após atualizar a env.
- [ ] `sitemap.xml`/`robots.txt` conferidos na URL final.
- [ ] Propriedade criada e verificada no Google Search Console.
- [ ] Sitemap submetido no Search Console.
- [ ] Confirmado que `/admin`, `/login` e `/api/*` não aparecem indexados.

## Fora de escopo desta tarefa

- Comprar o domínio.
- Alterar DNS de fato.
- Alterar `NEXT_PUBLIC_SITE_URL` em Production sem confirmação.
- Qualquer decisão de qual domínio usar — isso é do usuário.
