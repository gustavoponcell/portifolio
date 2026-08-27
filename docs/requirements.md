# Requisitos do Projeto

> **Aviso — documento histórico.** Este arquivo registra requisitos
> adicionados ao longo das fases 10 a 16.9, da mais recente para a mais
> antiga. A seção logo abaixo (Prompt 16.9) já é o requisito **atual e
> vigente**: dados públicos reais, sem mocks. Seções mais abaixo (Prompt 10 a
> 13) descrevem requisitos de fases anteriores, já superados nesse ponto —
> preservadas como histórico, não como regra ativa. Para o estado atual do
> projeto, use `docs/project-status.md`.

## Atualização Prompt 16.9: projetos públicos reais

- Home, Design, Dev, páginas individuais, metadata e sitemap não podem usar
  projetos locais fictícios.
- Design público deve vir do Supabase, com `type = "design"` e
  `status = "published"`.
- Dev público deve vir de repositórios reais do GitHub; quando houver Supabase,
  somente curadorias visíveis e publicadas podem aparecer.
- Status `mock`, `draft` e `archived` nunca podem aparecer para visitantes.
- Falhas de GitHub ou Supabase devem produzir lista vazia, não dados inventados.
- Seções sem projetos reais devem mostrar um estado vazio profissional.
- Slugs presentes apenas na referência local devem responder com 404.
- O sitemap deve listar somente rotas fixas e projetos Design publicados.
- Clients públicos não podem usar chave administrativa nem expor secrets.

## Atualização Prompt 16.8: primeira pessoa e tom de voz

Requisitos adicionados:

- Escrever a comunicação pública preferencialmente em primeira pessoa.
- Apresentar Gustavo Poncell como designer e desenvolvedor em formação.
- Usar linguagem jovem, direta, natural e profissional.
- Conectar estética, identidade, organização, estrutura e funcionalidade.
- Evitar clichês profissionais, exageros publicitários e repetição excessiva de `eu`.
- Não inventar clientes, cargos, métricas, certificados, experiências ou resultados.
- Não expor linguagem interna de implementação na interface pública.
- Manter metadata objetiva em terceira pessoa quando isso favorecer SEO.
- Diferenciar copy pública de textos operacionais da área administrativa.
- Preservar português do Brasil e acentuação em todos os textos visíveis.

## Atualizacao Prompt 16.5: Modo escuro e nome publico

Requisitos adicionados:

- Usar modo escuro como aparencia padrao.
- Manter nomes dos tokens CSS para evitar refatoracao ampla.
- Preservar amarelo para Design e verde para Dev.
- Nao criar toggle de tema.
- Nao usar `localStorage` para tema.
- Nao depender da preferencia do sistema operacional.
- Garantir cards, formularios, inputs e admin legiveis no escuro.
- Trocar nome publico para `Gustavo Poncell` em UI, metadata, JSON-LD, manifest, README e docs.
- Manter `github.com/gustavoponcell` e `GITHUB_USERNAME=gustavoponcell`.
- Manter admin protegido, rotas privadas noindex e secrets fora do client.

## Atualizacao Prompt 16: Contato, SEO e performance

Requisitos adicionados:

- Criar pagina publica `/contato`.
- Exibir somente dados publicos cadastrados em Supabase ou configuracoes publicas.
- Nao inventar e-mail, telefone, WhatsApp ou redes sociais.
- Nao implementar envio real de formulario, captcha, newsletter ou analytics.
- Atualizar links de Home, Header e Footer para contato.
- Criar metadata global e por pagina com canonical, Open Graph e Twitter Card.
- Criar metadata dinamica para projetos.
- Marcar `/admin` e `/login` como `noindex`.
- Criar `sitemap.xml` apenas com rotas publicas.
- Criar `robots.txt` bloqueando `/admin`, `/login` e `/api`.
- Criar manifest basico sem icones falsos.
- Criar health check publico seguro para status geral do site.
- Documentar checklist de performance, SEO e acessibilidade.
- Manter secrets fora do client e do bundle publico.

## Atualizacao Prompt 15: Upload de imagens

Requisitos adicionados:

- Permitir upload protegido de avatar do perfil.
- Permitir upload protegido de capa de projeto Design.
- Permitir upload protegido de imagens de galeria de projeto Design.
- Usar bucket publico `portfolio-media` apenas para leitura publica das imagens.
- Escrita no Storage deve ocorrer apenas server-side e apos validacao de admin.
- Validar MIME: JPEG, PNG, WebP e GIF.
- Validar tamanho maximo: 5 MB.
- Gerar paths seguros, sem depender do nome original puro.
- Salvar URLs publicas nos registros correspondentes.
- Exibir previews no admin.
- Exibir imagens publicamente quando houver URL e fallback visual quando nao houver.
- Upload de video, PDF, arquivos grandes/resumable, crop, CDN customizada e Behance real seguem fora desta etapa.

## Atualizacao Prompt 14: Curadoria de projetos Dev

Requisitos adicionados:

- `/admin/projetos/dev` deve ser rota protegida.
- Administrador pode curar repositorios Dev vindos do GitHub/fallback.
- Curadoria deve controlar visibilidade, destaque, titulo, descricao, resumo, tags, ferramentas, status e ordem.
- Remover curadoria nao deve apagar repositorio no GitHub.
- Escritas devem validar admin antes de chamar Supabase.
- `GITHUB_TOKEN`, `SUPABASE_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` devem permanecer somente no servidor.
- O modo `/dev` deve continuar funcionando sem Supabase e sem `.env.local`.
- Publicamente, curadorias visiveis devem ter prioridade quando disponiveis.
- Upload, Storage, CRUD Dev manual independente do GitHub, Behance real e cadastro publico seguem fora desta etapa.

## Atualizacao Prompt 13: CRUD de projetos Design

Requisitos adicionados:

- `/admin/projetos/design` deve ser rota protegida.
- Administrador pode criar, editar, publicar, ocultar, arquivar, destacar, remover destaque e excluir projetos Design.
- O cadastro deve aceitar campos principais, tags, ferramentas, destaques, galeria placeholder textual e links externos opcionais.
- Todas as escritas devem validar admin antes de chamar Supabase.
- O client admin do Supabase deve continuar server-only e fora de Client Components.
- Publico continua lendo mocks ate a etapa propria de publicacao Supabase.
  (Histórico, superado: veja Prompt 16.9 no topo do arquivo.)
- CRUD Dev, upload, Behance real, curadoria GitHub e contato publico seguem fora desta etapa.

## Atualizacao Prompt 12: CRUD inicial do admin

Requisitos adicionados:

- CRUD de perfil para dados publicos e links textuais.
- CRUD de experiencias com visibilidade, ordem e datas.
- CRUD de cursos/certificados com URL textual de certificado.
- Escrita restrita ao administrador autenticado.
- Operacoes administrativas devem exigir chave admin somente no servidor.
- Rotas `/admin/perfil`, `/admin/experiencias` e `/admin/cursos` devem ser protegidas.
- Upload real, Storage, projetos, curadoria GitHub e Behance continuam fora desta etapa.

## Atualizacao Prompt 11: Login e Admin

Requisitos adicionados:

- Implementar login restrito ao administrador com Supabase Auth.
- Autorizar acesso ao admin por `ADMIN_EMAIL`.
- Bloquear `/admin` quando Supabase, ADMIN_EMAIL, sessao ou permissao estiverem ausentes.
- Nao oferecer cadastro publico, OAuth ou recuperacao de senha nesta etapa.
- Exibir dashboard inicial protegido, sem CRUD.
- Implementar logout seguro.
- Expor `/api/auth/status` sem tokens, cookies, service role ou e-mail completo.
- Manter build funcionando sem `.env.local`.

## Atualizacao Prompt 10: Supabase

Requisitos adicionados para a fundacao Supabase:

- Preparar autenticacao futura com Supabase Auth para um unico administrador.
- Preparar banco Supabase para perfil, projetos, tags, ferramentas, galeria, destaques, experiencias, cursos, contatos, curadoria GitHub e configuracoes.
- Manter fallback seguro por mocks enquanto CRUD/admin nao estiverem prontos.
- Exibir health check seguro em `/api/supabase/health` sem vazar URL, keys, tokens ou headers sensiveis.
- Permitir build sem `.env.local` e sem projeto Supabase real configurado.
- Usar `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` apenas como chave publica.
- Usar `SUPABASE_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` somente no servidor.
- Nao liberar escrita publica em RLS.

## Visão geral

O projeto é um site pessoal de portfólio, currículo e contato com duas frentes principais: Design e Desenvolvimento. A experiência deve apresentar uma identidade híbrida, permitindo que visitantes entendam rapidamente a atuação criativa e técnica do proprietário do site.

## Objetivo do produto

Criar uma presença digital profissional, memorável e fácil de atualizar, reunindo trabalhos visuais, projetos de desenvolvimento, experiências, cursos, certificados e canais de contato.

## Público-alvo

- Recrutadores e empresas buscando perfil júnior ou estágio em tecnologia.
- Clientes ou parceiros interessados em serviços de design.
- Professores, colegas e contatos profissionais.
- Visitantes vindos de GitHub, Behance, LinkedIn ou currículo.

## Requisitos funcionais

- Exibir uma Home geral com a identidade Designer + Desenvolvedor.
- Permitir navegação para modo Design.
- Permitir navegação para modo Dev.
- Exibir projetos em destaque.
- Exibir seção Sobre mim.
- Exibir experiências profissionais ou acadêmicas.
- Exibir cursos e certificados quando houver conteúdo cadastrado.
- Ocultar cursos e certificados quando não houver conteúdo cadastrado.
- Exibir contatos: WhatsApp, e-mail, telefone e links sociais.
- Permitir área administrativa para um único usuário.
- Permitir edição de bio, foto, contatos e informações principais do site.
- Permitir cadastro e edição de experiências.
- Permitir cadastro e edição de cursos e certificados.
- Permitir cadastro e edição de projetos de design.
- Permitir cadastro e edição de projetos dev.
- Permitir definição manual de projetos em destaque.
- Exibir uma página individual para cada projeto Design real, publicado e cadastrado.
- Exibir detalhes de projeto com resumo, problema, solução, tags, ferramentas, galeria e links quando existirem.
- Gerar metadados básicos por página individual de projeto.
- Permitir ocultar repositórios ou projetos do modo Dev.
- Permitir editar descrições exibidas para projetos dev.
- Permitir cadastrar links de projetos completos no Behance.
- Futuramente integrar com GitHub para buscar projetos, repositórios e tecnologias.
- Exibir repositórios públicos do GitHub no Modo Dev usando integração server-side.

## Requisitos não funcionais

- Interface responsiva.
- Boa performance inicial.
- SEO básico.
- Acessibilidade mínima.
- Segurança adequada para não expor tokens no client.
- Código em TypeScript.
- Estilo visual consistente com neobrutalismo moderno.
- Estrutura preparada para deploy na Vercel.
- Conteúdo administrável sem necessidade de alterar código para cada atualização.
- Páginas individuais de projeto devem ser responsivas, acessíveis e preparadas para futura origem Supabase/Admin.

## Regras de negócio

- O site terá apenas um administrador.
- O modo Design usa amarelo como cor principal.
- O modo Dev usa verde como cor principal.
- Behance será tratado por curadoria manual: projetos internos podem ter link para Behance, mas o site não dependerá obrigatoriamente da API do Behance.
- Projetos dev poderão ser importados ou consultados via GitHub no futuro, mas devem aceitar curadoria manual.
- Repositórios ocultos não devem aparecer publicamente.
- Projetos em destaque devem ser definidos manualmente.
- Se uma seção opcional não tiver conteúdo, ela deve ficar oculta.
- Dados sensíveis e tokens nunca devem ser enviados para o navegador.
- `GITHUB_TOKEN` é opcional e deve ser usado apenas no servidor para aumentar limite de requisições da API.

## Perfis de usuário

- Visitante: acessa o site público, visualiza informações, projetos e contatos.
- Administrador: único usuário autorizado a gerenciar conteúdo, projetos e informações pessoais.

## MVP

O MVP deve conter:

- Home pública.
- Modo Design com projetos cadastrados manualmente.
- Modo Dev com projetos reais vindos do GitHub e da curadoria.
- Projetos em destaque.
- Sobre mim.
- Contatos.
- Estrutura visual neobrutalista responsiva.
- SEO básico.
- Admin simples e seguro para manutenção de conteúdo.

## Fora de escopo nesta fase

Nesta fase documental, estão fora de escopo:

- Inicializar Next.js.
- Criar páginas ou componentes.
- Instalar dependências.
- Configurar Supabase.
- Configurar Vercel.
- Implementar autenticação.
- Implementar integração com GitHub.
- Implementar upload de imagens.
- Criar banco de dados.
- Criar arquivos `.env` reais.

## Critérios de aceite gerais

- Documentação em português do Brasil.
- Escopo do produto descrito com clareza.
- Stack planejada registrada.
- Regras de segurança registradas.
- Caminho de evolução documentado.
- Próxima etapa claramente indicada: criação do projeto base Next.js.

## Complemento Prompt 16.6

- O modo escuro fixo deve manter contraste legivel em paginas publicas, login e admin.
- Cards de acento amarelo/verde devem ter texto preto, exceto blocos internos escuros que devem usar texto claro.
- A interface visivel nao deve expor nomes crus de variaveis de ambiente ou mensagens com aparencia de codigo.
- Mensagens tecnicas detalhadas devem ficar restritas a documentacao, exemplos de ambiente, codigo servidor ou logs seguros.

## Complemento Prompt 16.7

- A comunicação pública deve ser finalista, profissional e externa, evitando linguagem de obra, teste ou implementação.
- Áreas públicas não devem mencionar dados mockados, fallback, placeholders, cadastro futuro, admin futuro, Supabase, API futura, deploy, CRUD ou variáveis de ambiente.
- A área protegida continua existindo, mas a navegação pública deve usar o rótulo "Área restrita".
- Projetos de design e dev devem ser exibidos como seleção de portfólio, mesmo quando a fonte ainda for local ou editável.
- O arquivo de dados público passa a ser `src/data/portfolio-projects.ts`.
- Os repositórios de apoio passam a usar `src/data/portfolio-github-repositories.ts` quando não houver dados externos disponíveis.
- O próximo passo recomendado é revisar o deploy de produção na Vercel e validar as variáveis de ambiente do ambiente Production.
