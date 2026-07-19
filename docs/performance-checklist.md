# Checklist de SEO, performance e acessibilidade

## Prompt 16.10

Validações automatizadas concluídas:

- `npm run lint`: aprovado.
- `npm run build`: aprovado, incluindo TypeScript e geração das páginas de projetos reais.
- Home, Design, Dev, Contato, Login, sitemap, robots, manifest e projeto real: HTTP 200.
- `/admin` sem sessão: redirecionamento HTTP 307 para `/login`.
- Rota inexistente: HTTP 404.
- Sitemap sem `/admin`, `/login` ou `/api` e com projeto real publicado.
- Robots bloqueando `/admin`, `/login` e `/api`.
- Manifest com nome público `Gustavo Poncell`.
- `npm audit`: duas vulnerabilidades moderadas no PostCSS distribuído internamente pelo Next; a correção sugerida exige downgrade incompatível e não foi aplicada.

Pendências para o deploy:

- configurar as variáveis de ambiente no projeto da Vercel;
- confirmar `NEXT_PUBLIC_SITE_URL` com a URL definitiva;
- executar Lighthouse em mobile após a publicação;
- revisar a imagem final de Open Graph no domínio de produção.

## Prompt 16.6

Status atual:

- Contraste do modo escuro refinado em tokens globais.
- Cards amarelos/verdes com texto usam preto sobre acento.
- Blocos internos escuros dentro de cards de acento usam texto claro.
- Login/admin nao exibem nomes crus de variaveis de ambiente na UI.
- Sem toggle de tema, sem `localStorage`, sem preferencia do sistema e sem mudanca de fluxo protegido.

Revisao manual recomendada:

- Conferir Home, Design, Dev, Contato, detalhes de projeto, Login e Admin em telas pequenas e grandes.
- Verificar estados de erro/sucesso em formularios administrativos.
- Confirmar foco visivel em campos, botoes, links e cards clicaveis.

## Prompt 16.5

Status atual:

- Modo escuro ativo por padrao.
- `themeColor`, manifest e metadata usam identidade escura.
- Nome publico oficial: `Gustavo Poncell`.
- Sem toggle de tema, sem `localStorage` e sem dependencia de preferencia do sistema.
- Cards amarelos/verdes preservam texto preto para contraste.
- Inputs, textareas e selects usam fundo escuro, texto claro, borda clara e foco visivel.

Revisao manual recomendada:

- Conferir contraste em Home, Design, Dev, Contato e detalhes de projeto.
- Conferir admin/login em dark mode, incluindo formularios.
- Testar foco por teclado em links, botoes, cards clicaveis e inputs.
- Conferir se superficies escuras continuam com borda e sombra visiveis.

## Prompt 16

Status atual:

- Metadata global com `metadataBase`, canonical, Open Graph e Twitter Card.
- Metadata especifica em `/`, `/design`, `/dev`, `/contato` e `/projetos/[slug]`.
- `/admin` e `/login` marcados como `noindex`.
- `sitemap.xml` gerado apenas com rotas publicas e projetos publicos mockados.
- `robots.txt` libera o site publico e bloqueia `/admin`, `/login` e `/api`.
- `manifest.webmanifest` basico criado sem icones falsos.
- `/api/site/health` retorna apenas flags booleanas, contagens e timestamp.
- Pagina `/contato` nao renderiza dados pessoais inexistentes.
- Imagens publicas continuam com fallback quando nao ha URL real.

## Revisao manual recomendada

- Conferir Lighthouse em mobile para Performance, Accessibility, Best Practices e SEO.
- Validar foco visivel no Header, Footer, cards de contato e botoes.
- Testar navegacao por teclado nas rotas publicas.
- Conferir contraste dos cards com fundo preto, amarelo, verde e cinza.
- Confirmar que `NEXT_PUBLIC_SITE_URL` aponta para a URL final antes do deploy.
- Confirmar que `sitemap.xml` nao lista `/admin`, `/login` ou `/api`.
- Confirmar que `robots.txt` bloqueia rotas privadas.
- Conferir se a imagem Open Graph final deve substituir o placeholder atual.

## Fora desta etapa

- Deploy na Vercel.
- Dominio customizado.
- Analytics.
- Search Console.
- Formulario com envio real.
- Captcha.
- Newsletter.
