# Importação dos projetos de Design no Supabase

O arquivo [`supabase/import-design-projects.sql`](../supabase/import-design-projects.sql) importa, de uma só vez, os cinco projetos analisados em `C:\poncell\projetos`:

1. Bacanal da Dionísio’s — 2ª edição;
2. Izo Axé Ganga Zumba — identidade visual;
3. Jequitimuu — identidade visual;
4. LACAP — identidade visual;
5. XI Sintegra — Tecnologia: para quê e para quem?.

O conteúdo foi escrito em primeira pessoa a partir das apresentações existentes. Informações que não aparecem nos materiais, como ano de alguns projetos, links externos e softwares utilizados, foram deixadas vazias para não inventar dados.

## Como executar

Antes de importar, o banco precisa estar com o esquema atual do projeto aplicado, incluindo as tabelas `projects`, `project_tags`, `project_tools`, `project_highlights` e `project_gallery`. Se o site e o painel administrativo já usam essas tabelas, esse requisito já foi atendido.

1. Entre no painel do projeto no Supabase.
2. Abra **SQL Editor** e clique em **New query**.
3. Abra `supabase/import-design-projects.sql` neste repositório.
4. Copie todo o conteúdo do arquivo, cole no SQL Editor e clique em **Run**.
5. Confira a tabela exibida ao final. Ela deve retornar cinco projetos com `status = published`; todos são gravados com `type = design`.
6. Abra o site e atualize a página de Design. Em desenvolvimento local, use a URL indicada pelo `npm.cmd run dev`. Em produção, uma atualização feita diretamente no banco pode depender da janela de revalidação da página.

O script usa os slugs como identificadores. Ele pode ser executado novamente para atualizar esses cinco projetos sem criar duplicatas. Projetos com outros slugs não são apagados nem modificados. Ferramentas incluídas depois pelo painel e URLs de galeria associadas aos mesmos títulos são preservadas em novas execuções.

## Imagens e capas

O SQL importa textos, ordem, destaques, tags e a estrutura da galeria. Ele não envia os PDFs e JPGs do computador para o Supabase Storage. Caminhos como `C:\poncell\projetos\lacap.pdf` só existem no computador local e não funcionam como imagem pública no navegador.

Por segurança, `cover_url` e `project_gallery.image_url` são inseridos como `NULL`. Os cards continuam disponíveis no site com a apresentação textual. Para exibir imagens:

1. Exporte as páginas escolhidas como JPG ou WebP.
2. Envie cada arquivo ao bucket público usado pelo projeto, preferencialmente pelo painel administrativo do próprio site.
3. Use um caminho único para cada arquivo, sem sobrescrever imagens antigas.
4. Salve a URL pública gerada em `projects.cover_url` ou no item correspondente de `project_gallery.image_url`.

Não coloque `SUPABASE_SERVICE_ROLE_KEY`, tokens ou outras credenciais dentro do SQL, do Git ou de arquivos públicos. Se uma automação futura fizer o envio das imagens em lote, ela deve ler a chave apenas de uma variável de ambiente no servidor ou no computador local.

## Ajustes rápidos antes da importação

- Para não publicar imediatamente, troque `'published'` por `'draft'` no `insert into public.projects`.
- Para alterar os destaques da Home, edite o valor `featured` no bloco JSON. Bacanal, Izo Axé Ganga Zumba e Jequitimuu estão destacados inicialmente.
- Para adicionar ano, ferramenta ou link confirmado, preencha o respectivo campo no JSON e execute o arquivo novamente.
- Não altere um slug depois que o projeto já estiver publicado sem antes planejar o redirecionamento da URL antiga.
