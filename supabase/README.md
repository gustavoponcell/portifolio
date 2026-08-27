# Supabase

> **Aviso — seções históricas abaixo.** Este arquivo mistura instruções
> ainda válidas (criar projeto, aplicar schema, configurar `.env.local`,
> bucket `portfolio-media`) com registros de fases já concluídas (Prompt 10
> a 15). Onde aparecer "mock"/"temporário"/"etapa futura", trata-se do
> estado da época, não do estado atual — dados públicos reais vêm de
> Supabase/GitHub (ver `docs/handoff.md`, TASK-001 a TASK-003). Os passos de
> configuração (criar projeto, `.env.local`, aplicar `schema.sql`) continuam
> válidos para configurar uma instância nova.

## Storage: portfolio-media

O upload de imagens usa Supabase Storage com o bucket:

```text
portfolio-media
```

Como criar pelo Dashboard:

1. Abra Storage no projeto Supabase.
2. Clique em New bucket.
3. Use o nome `portfolio-media`.
4. Marque como Public bucket para permitir leitura publica das imagens.
5. Nao habilite escrita publica anonima.

O app envia imagens apenas pelo servidor, usando `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` depois de validar o admin. Essas chaves nunca devem ir para componentes client ou variaveis `NEXT_PUBLIC_`.

Tipos aceitos:

- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

Limite atual: 5 MB por imagem.

Para testar:

1. Configure `.env.local` com Supabase publico, `ADMIN_EMAIL` e chave admin server-side.
2. Crie o bucket `portfolio-media`.
3. Entre em `/login`.
4. Acesse `/admin/perfil` e envie um avatar.
5. Acesse `/admin/projetos/design`, edite um projeto e envie capa/galeria.
6. Abra a URL publica salva para confirmar leitura publica.
7. Acesse `/api/admin/storage/health` para conferir `storageReady`.

Upload de PDF, video, arquivos grandes/resumable e crop/editor de imagem nao existem nesta etapa.

## Curadoria de projetos Dev

A rota `/admin/projetos/dev` usa a tabela `github_repository_curations` para controlar quais repositorios aparecem no modo Dev.

Campos principais:

- `repository_name`: nome unico do repositorio vindo do GitHub/fallback.
- `custom_title`
- `custom_description`
- `custom_summary`
- `custom_tags`
- `custom_tools`
- `custom_status`
- `visible`
- `featured`
- `sort_order`

Para aplicar:

1. Abra o SQL Editor do Supabase.
2. Execute `supabase/schema.sql`.
3. Se o projeto ja tinha a tabela antiga, os `alter table ... add column if not exists` adicionam os campos novos.
4. Execute `supabase/seed.sql` somente se quiser exemplos temporarios baseados nos mocks locais.

Configuracao GitHub em `.env.local`:

```env
GITHUB_USERNAME=gustavoponcell
GITHUB_TOKEN=
```

`GITHUB_TOKEN` e opcional, melhora limite de requisicoes e nunca deve ser prefixado com `NEXT_PUBLIC_`.

Para testar:

1. Configure Supabase publico, `ADMIN_EMAIL` e chave admin server-side.
2. Entre em `/login`.
3. Acesse `/admin/projetos/dev`.
4. Salve a curadoria de um repositorio.
5. Acesse `/dev`.

A curadoria nao cria, edita, oculta ou apaga repositorios reais no GitHub. Ela apenas controla a exibicao do portfolio. Upload real e Supabase Storage continuam fora desta etapa.

## CRUD de projetos Design

A rota `/admin/projetos/design` usa as tabelas ja previstas em `supabase/schema.sql`:

- `projects`
- `project_tags`
- `project_tools`
- `project_gallery`
- `project_highlights`

Para testar:

1. Aplique `supabase/schema.sql`.
2. Aplique `supabase/seed.sql` se quiser projetos temporarios.
3. Crie o usuario admin no Supabase Auth.
4. Configure `.env.local` com Supabase publico, `ADMIN_EMAIL` e `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`.
5. Acesse `/login`.
6. Acesse `/admin/projetos/design`.

O CRUD de Design sempre grava `type = 'design'` e filtra updates/deletes por esse tipo. Galeria, capa e link externo sao campos textuais nesta etapa. Upload real, Storage, CRUD Dev e leitura publica pelo Supabase nao foram implementados.

## CRUD inicial do admin

As rotas abaixo usam Server Actions e client admin server-side:

- `/admin/perfil`
- `/admin/experiencias`
- `/admin/cursos`

Para testar:

1. Configure Supabase publico no `.env.local`.
2. Configure `ADMIN_EMAIL` com o e-mail do usuario criado em Auth.
3. Configure `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` somente no servidor.
4. Acesse `/login` e entre com o usuario admin.
5. Acesse `/admin/perfil`, `/admin/experiencias` e `/admin/cursos`.

Avatar URL e certificado URL sao campos textuais por enquanto. Upload real, Storage e processamento de arquivos ficam para prompt futuro.

## Login admin

Para habilitar o login do Prompt 11:

1. Crie o projeto no Supabase.
2. Aplique `supabase/schema.sql` manualmente no SQL Editor.
3. Aplique `supabase/seed.sql`, se desejar dados temporarios.
4. Abra Authentication > Users.
5. Crie manualmente o usuario administrador ou convide o usuario.
6. Defina o e-mail desse usuario em `ADMIN_EMAIL` no `.env.local`.
7. Configure tambem:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` apenas se precisar de operacoes server-side privilegiadas.
8. Rode o projeto localmente.
9. Acesse `/login`.

Nao coloque e-mail real, senha real ou tokens em arquivos versionados. Nao ha cadastro publico, recuperacao de senha ou OAuth nesta etapa.

Esta pasta guarda o planejamento inicial do banco e das seeds do portfolio. Nada aqui aplica migracao automaticamente em um banco remoto.

## Criar projeto

1. Crie um projeto no Supabase.
2. Abra o painel do projeto.
3. No Connect/API settings, copie:
   - Project URL.
   - Publishable key (`sb_publishable_...`) para uso publico.
   - Secret key (`sb_secret_...`) ou service role para uso somente servidor.

## Configurar `.env.local`

Crie `.env.local` na raiz do projeto, sem commitar o arquivo:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Opcional/legado, apenas se ainda usar anon key.
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Somente servidor. Nunca use NEXT_PUBLIC_ nestas chaves.
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GITHUB_USERNAME=gustavoponcell
GITHUB_TOKEN=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` pode ser usada no client. `SUPABASE_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` nunca devem ir para componentes client, bundle publico ou repositorio.

## Aplicar schema

1. Abra o SQL Editor do Supabase.
2. Cole o conteudo de `supabase/schema.sql`.
3. Revise as politicas RLS e a funcao `is_site_admin()`.
4. Execute manualmente.

O schema cria tabelas para perfil, projetos, tags, ferramentas, galeria, destaques, experiencias, cursos, contatos, curadoria GitHub e configuracoes do site.

## Aplicar seed

1. Depois do schema, abra um novo SQL Editor.
2. Cole o conteudo de `supabase/seed.sql`.
3. Execute manualmente.

As seeds sao temporarias e usam dados mockados. Elas nao inserem telefone, email real, clientes, certificados, experiencias profissionais ou repositorios reais.

## RLS e admin

O schema habilita RLS nas tabelas publicas. Conteudo publicado/visivel pode ser lido publicamente. Escrita fica restrita ao admin definido em etapa futura.

O admin nao esta hardcoded por email. No proximo prompt, depois de criar o usuario real em Supabase Auth, a configuracao deve inserir em `site_settings`:

```sql
insert into public.site_settings (key, value)
values ('admin_user_id', '{"user_id":"UUID_DO_AUTH_USER"}');
```

## Health check

Com o app rodando, acesse:

```text
/api/supabase/health
```

A rota retorna apenas flags booleanas e timestamp. Ela nao retorna URL, keys, tokens ou headers sensiveis.

## Proxima etapa

O login real, protecao de `/admin`, validacao de administrador e estrutura inicial de dashboard ficam para o Prompt 11.
