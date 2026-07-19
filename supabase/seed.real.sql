-- Real portfolio seed based on user-provided resumes and public GitHub data.
-- Review before running in Supabase SQL Editor.
-- This file does not create Auth users and does not store passwords or API keys.

begin;

do $$
begin
  if not exists (
    select 1
    from auth.users
    where lower(email) = lower('gustavo.poncell40@gmail.com')
  ) then
    raise notice 'Admin Auth user gustavo.poncell40@gmail.com was not found. Profile/site admin rows will be skipped.';
  end if;
end;
$$;

with admin_user as (
  select id
  from auth.users
  where lower(email) = lower('gustavo.poncell40@gmail.com')
  order by created_at desc
  limit 1
)
insert into public.site_settings (key, value)
select 'admin_user_id', jsonb_build_object('user_id', id::text)
from admin_user
on conflict (key) do update set
  value = excluded.value;

insert into public.site_settings (key, value) values
  (
    'seed_notice',
    jsonb_build_object(
      'message',
      'Seed real criada a partir dos curriculos enviados e de repositorios publicos do GitHub.',
      'source',
      'supabase/seed.real.sql'
    )
  )
on conflict (key) do update set
  value = excluded.value;

with admin_user as (
  select id
  from auth.users
  where lower(email) = lower('gustavo.poncell40@gmail.com')
  order by created_at desc
  limit 1
)
insert into public.profiles (
  id,
  full_name,
  display_name,
  headline,
  bio,
  email_public,
  phone_public,
  whatsapp_url,
  github_url,
  linkedin_url
)
select
  id,
  'Gustavo Poncell',
  'Gustavo Poncell',
  'Design + Desenvolvimento | Sistemas de Informacao - UFVJM',
  'Estudante de Sistemas de Informacao na UFVJM, designer com experiencia em comunicacao visual e social media, e desenvolvedor em formacao com projetos em Python, Java, TypeScript e web. Une olhar visual, organizacao de produto e implementacao pratica para criar interfaces, sistemas e experiencias digitais.',
  'gustavo.poncell40@gmail.com',
  '+55 38 99724-1391',
  'https://wa.me/5538997241391',
  'https://github.com/gustavoponcell',
  'https://www.linkedin.com/in/gustavo-poncell'
from admin_user
on conflict (id) do update set
  full_name = excluded.full_name,
  display_name = excluded.display_name,
  headline = excluded.headline,
  bio = excluded.bio,
  email_public = excluded.email_public,
  phone_public = excluded.phone_public,
  whatsapp_url = excluded.whatsapp_url,
  github_url = excluded.github_url,
  linkedin_url = excluded.linkedin_url;

insert into public.contact_links (
  id,
  label,
  type,
  url,
  visible,
  sort_order
) values
(
  '20000000-0000-4000-8000-000000000001',
  'GitHub',
  'github',
  'https://github.com/gustavoponcell',
  true,
  10
),
(
  '20000000-0000-4000-8000-000000000002',
  'LinkedIn',
  'linkedin',
  'https://www.linkedin.com/in/gustavo-poncell',
  true,
  20
),
(
  '20000000-0000-4000-8000-000000000003',
  'Portfolio',
  'website',
  'https://poncell-portifolio.vercel.app',
  true,
  30
)
on conflict (id) do update set
  label = excluded.label,
  type = excluded.type,
  url = excluded.url,
  visible = excluded.visible,
  sort_order = excluded.sort_order;

insert into public.experiences (
  id,
  title,
  organization,
  description,
  start_date,
  end_date,
  is_current,
  type,
  sort_order,
  visible
) values
(
  '30000000-0000-4000-8000-000000000001',
  'Designer estagiario',
  'Diretoria de Comunicacao Social - UFVJM',
  'Atuacao em criacao grafica, demandas recorrentes, briefing, feedback, padronizacao visual e organizacao de entregas com prazo. Experiencia que fortaleceu visao de produto, comunicacao e colaboracao.',
  null,
  null,
  false,
  'design',
  10,
  true
),
(
  '30000000-0000-4000-8000-000000000002',
  'Designer',
  'Nexter',
  'Primeira experiencia profissional na area, em agencia de marketing com clientes de segmentos variados. Execucao de projetos com multiplas demandas, organizacao de entregas e atencao a detalhes.',
  null,
  null,
  false,
  'design',
  20,
  true
),
(
  '30000000-0000-4000-8000-000000000003',
  'Planejador de conteudo e social media',
  'O Quarto Rec / K2L',
  'Planejamento de posts para diferentes plataformas, definicao de estrategia, frequencia e adaptacao de conteudo por canal em rotina de producao e organizacao de midia.',
  null,
  null,
  false,
  'marketing',
  30,
  true
)
on conflict (id) do update set
  title = excluded.title,
  organization = excluded.organization,
  description = excluded.description,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  is_current = excluded.is_current,
  type = excluded.type,
  sort_order = excluded.sort_order,
  visible = excluded.visible;

insert into public.courses (
  id,
  title,
  institution,
  description,
  year,
  certificate_url,
  visible,
  sort_order
) values
(
  '40000000-0000-4000-8000-000000000001',
  'Bacharelado em Sistemas de Informacao',
  'Universidade Federal dos Vales do Jequitinhonha e Mucuri - UFVJM',
  'Graduacao em andamento, com estudos e projetos envolvendo desenvolvimento de software, modelagem de dominio, persistencia de dados, programacao orientada a objetos e documentacao tecnica.',
  '6o periodo',
  null,
  true,
  10
)
on conflict (id) do update set
  title = excluded.title,
  institution = excluded.institution,
  description = excluded.description,
  year = excluded.year,
  certificate_url = excluded.certificate_url,
  visible = excluded.visible,
  sort_order = excluded.sort_order;

insert into public.projects (
  id,
  slug,
  title,
  type,
  description,
  summary,
  status,
  featured,
  cover_url,
  year,
  role,
  external_url,
  repository_url,
  live_url,
  sort_order
) values
(
  '10000000-0000-4000-8000-000000000001',
  'portfolio-pessoal-nextjs',
  'Portfolio pessoal Design + Dev',
  'dev',
  'Portfolio pessoal em Next.js e TypeScript para unir identidade visual, projetos de design, projetos dev, admin, Supabase e deploy na Vercel.',
  'Base central do portfolio atual, com modo Design, modo Dev, curadoria de repositorios GitHub e administracao de conteudo.',
  'published',
  true,
  null,
  '2026',
  'Design de interface, frontend, integracao Supabase e deploy',
  null,
  'https://github.com/gustavoponcell/portifolio',
  'https://poncell-portifolio.vercel.app',
  10
),
(
  '10000000-0000-4000-8000-000000000002',
  'sinema-catalogo-web',
  'Sinema',
  'dev',
  'Aplicacao web local em Django para catalogo, busca, reproducao via providers externos, favoritos, historico, progresso de episodios e canais ao vivo.',
  'Projeto Python/Django focado em organizacao de catalogo, consumo de dados, navegacao e experiencia de uso para conteudo audiovisual.',
  'published',
  true,
  null,
  '2026',
  'Desenvolvimento web em Django',
  null,
  'https://github.com/gustavoponcell/sinema',
  null,
  20
),
(
  '10000000-0000-4000-8000-000000000003',
  'gestao-inteligente-locacao-eventos',
  'Gestao Inteligente',
  'dev',
  'Aplicacao desktop para gestao de pedidos de locacao, clientes, produtos, estoque, agenda operacional, pagamentos e geracao de documentos.',
  'Sistema pratico em Python com interface desktop, persistencia local, regras de negocio e documentos operacionais para uso em Windows.',
  'published',
  true,
  null,
  '2026',
  'Arquitetura em camadas, UI desktop, regras de negocio e persistencia',
  null,
  'https://github.com/gustavoponcell/sistema_de_aluguel',
  null,
  30
),
(
  '10000000-0000-4000-8000-000000000004',
  'clinicagenda',
  'ClinicAgenda',
  'dev',
  'Projeto TypeScript para estudar fluxos de agenda, organizacao de produto digital e estrutura de interface para atendimento clinico.',
  'Estudo de produto web com foco em agenda, organizacao de dados e interface administrativa.',
  'published',
  false,
  null,
  '2026',
  'Frontend e modelagem de fluxo',
  null,
  'https://github.com/gustavoponcell/ClinicAgenda',
  null,
  40
),
(
  '10000000-0000-4000-8000-000000000005',
  'sistema-barbearia-java',
  'Sistema de Barbearia',
  'dev',
  'Projeto academico em Java com modelagem de dominio, persistencia em JSON, CRUD, listagens, validacoes, extratos automaticos e snapshots persistidos.',
  'Sistema Java orientado a objetos com entidades, autorizacao, persistencia e relatorios.',
  'published',
  false,
  null,
  '2025',
  'Modelagem de dominio, POO e persistencia',
  null,
  'https://github.com/gustavoponcell/Barbearia',
  null,
  50
),
(
  '10000000-0000-4000-8000-000000000006',
  'oficina-mecanica-padroes-projeto',
  'Sistema POO - Oficina Mecanica',
  'dev',
  'Projeto academico em Java aplicando padroes Facade e Mediator para organizar responsabilidades e comunicacao entre componentes.',
  'Estudo de arquitetura orientada a objetos, padroes de projeto, documentacao e apresentacao tecnica.',
  'published',
  false,
  null,
  '2025',
  'POO, padroes de projeto e documentacao',
  null,
  'https://github.com/gustavoponcell/oficina',
  null,
  60
),
(
  '10000000-0000-4000-8000-000000000007',
  'rota-de-bares',
  'Rota de Bares',
  'dev',
  'Projeto em Python publicado no GitHub para explorar organizacao de informacoes, rotas e experiencia local.',
  'Experimento de aplicacao em Python com foco em estrutura de dados e apresentacao de informacoes.',
  'published',
  false,
  null,
  '2026',
  'Desenvolvimento Python',
  null,
  'https://github.com/gustavoponcell/rotadebares',
  null,
  70
),
(
  '10000000-0000-4000-8000-000000000008',
  'comunicacao-visual-dicom-ufvjm',
  'Comunicacao visual - UFVJM',
  'design',
  'Projetos e demandas de comunicacao visual desenvolvidos na Diretoria de Comunicacao Social da UFVJM, com foco em briefing, padronizacao, prazos e clareza visual.',
  'Experiencia real de design institucional, organizando demandas graficas recorrentes e entregas para comunicacao publica.',
  'published',
  true,
  null,
  '2024',
  'Criacao grafica, organizacao visual e execucao',
  null,
  null,
  null,
  80
),
(
  '10000000-0000-4000-8000-000000000009',
  'design-marketing-nexter',
  'Design e marketing - Nexter',
  'design',
  'Primeira experiencia profissional em agencia de marketing, criando e executando demandas visuais para clientes de segmentos variados.',
  'Trabalho de design aplicado a demandas reais, com organizacao de entregas, atencao a detalhes e adaptacao visual.',
  'published',
  false,
  null,
  '2023',
  'Design grafico e comunicacao visual',
  null,
  null,
  null,
  90
),
(
  '10000000-0000-4000-8000-000000000010',
  'planejamento-social-media-k2l',
  'Planejamento social media - K2L',
  'design',
  'Planejamento de conteudo e social media para diferentes plataformas, com estrategia, frequencia e adaptacao de conteudo por canal.',
  'Experiencia de planejamento e organizacao de conteudo, conectando objetivos de comunicacao, consistencia e execucao sob demanda.',
  'published',
  false,
  null,
  '2024',
  'Planejamento de conteudo e social media',
  null,
  null,
  null,
  100
)
on conflict (slug) do update set
  title = excluded.title,
  type = excluded.type,
  description = excluded.description,
  summary = excluded.summary,
  status = excluded.status,
  featured = excluded.featured,
  cover_url = excluded.cover_url,
  year = excluded.year,
  role = excluded.role,
  external_url = excluded.external_url,
  repository_url = excluded.repository_url,
  live_url = excluded.live_url,
  sort_order = excluded.sort_order;

delete from public.project_tags
using public.projects
where public.project_tags.project_id = public.projects.id
  and public.projects.slug in (
    'portfolio-pessoal-nextjs',
    'sinema-catalogo-web',
    'gestao-inteligente-locacao-eventos',
    'clinicagenda',
    'sistema-barbearia-java',
    'oficina-mecanica-padroes-projeto',
    'rota-de-bares',
    'comunicacao-visual-dicom-ufvjm',
    'design-marketing-nexter',
    'planejamento-social-media-k2l'
  );

delete from public.project_tools
using public.projects
where public.project_tools.project_id = public.projects.id
  and public.projects.slug in (
    'portfolio-pessoal-nextjs',
    'sinema-catalogo-web',
    'gestao-inteligente-locacao-eventos',
    'clinicagenda',
    'sistema-barbearia-java',
    'oficina-mecanica-padroes-projeto',
    'rota-de-bares',
    'comunicacao-visual-dicom-ufvjm',
    'design-marketing-nexter',
    'planejamento-social-media-k2l'
  );

delete from public.project_highlights
using public.projects
where public.project_highlights.project_id = public.projects.id
  and public.projects.slug in (
    'portfolio-pessoal-nextjs',
    'sinema-catalogo-web',
    'gestao-inteligente-locacao-eventos',
    'clinicagenda',
    'sistema-barbearia-java',
    'oficina-mecanica-padroes-projeto',
    'rota-de-bares',
    'comunicacao-visual-dicom-ufvjm',
    'design-marketing-nexter',
    'planejamento-social-media-k2l'
  );

delete from public.project_gallery
using public.projects
where public.project_gallery.project_id = public.projects.id
  and public.projects.slug in (
    'portfolio-pessoal-nextjs',
    'sinema-catalogo-web',
    'gestao-inteligente-locacao-eventos',
    'clinicagenda',
    'sistema-barbearia-java',
    'oficina-mecanica-padroes-projeto',
    'rota-de-bares',
    'comunicacao-visual-dicom-ufvjm',
    'design-marketing-nexter',
    'planejamento-social-media-k2l'
  );

insert into public.project_tags (project_id, name)
select projects.id, seed.name
from (
  values
    ('portfolio-pessoal-nextjs', 'Next.js'),
    ('portfolio-pessoal-nextjs', 'TypeScript'),
    ('portfolio-pessoal-nextjs', 'Supabase'),
    ('portfolio-pessoal-nextjs', 'Vercel'),
    ('sinema-catalogo-web', 'Django'),
    ('sinema-catalogo-web', 'Python'),
    ('sinema-catalogo-web', 'Catalogo'),
    ('gestao-inteligente-locacao-eventos', 'Desktop'),
    ('gestao-inteligente-locacao-eventos', 'Gestao'),
    ('gestao-inteligente-locacao-eventos', 'SQLite'),
    ('clinicagenda', 'TypeScript'),
    ('clinicagenda', 'Agenda'),
    ('clinicagenda', 'Produto digital'),
    ('sistema-barbearia-java', 'Java'),
    ('sistema-barbearia-java', 'POO'),
    ('sistema-barbearia-java', 'Persistencia'),
    ('oficina-mecanica-padroes-projeto', 'Java'),
    ('oficina-mecanica-padroes-projeto', 'Design Patterns'),
    ('oficina-mecanica-padroes-projeto', 'POO'),
    ('rota-de-bares', 'Python'),
    ('rota-de-bares', 'Experimento'),
    ('comunicacao-visual-dicom-ufvjm', 'Design institucional'),
    ('comunicacao-visual-dicom-ufvjm', 'Comunicacao visual'),
    ('comunicacao-visual-dicom-ufvjm', 'Pecas graficas'),
    ('design-marketing-nexter', 'Marketing'),
    ('design-marketing-nexter', 'Design grafico'),
    ('design-marketing-nexter', 'Clientes'),
    ('planejamento-social-media-k2l', 'Social media'),
    ('planejamento-social-media-k2l', 'Planejamento'),
    ('planejamento-social-media-k2l', 'Conteudo')
) as seed(slug, name)
join public.projects on public.projects.slug = seed.slug
on conflict (project_id, name) do nothing;

insert into public.project_tools (project_id, name)
select projects.id, seed.name
from (
  values
    ('portfolio-pessoal-nextjs', 'Next.js'),
    ('portfolio-pessoal-nextjs', 'TypeScript'),
    ('portfolio-pessoal-nextjs', 'Supabase'),
    ('portfolio-pessoal-nextjs', 'Vercel'),
    ('portfolio-pessoal-nextjs', 'GitHub'),
    ('sinema-catalogo-web', 'Python'),
    ('sinema-catalogo-web', 'Django'),
    ('sinema-catalogo-web', 'HTML'),
    ('sinema-catalogo-web', 'CSS'),
    ('gestao-inteligente-locacao-eventos', 'Python'),
    ('gestao-inteligente-locacao-eventos', 'PySide6'),
    ('gestao-inteligente-locacao-eventos', 'SQLite'),
    ('gestao-inteligente-locacao-eventos', 'ReportLab'),
    ('gestao-inteligente-locacao-eventos', 'PyInstaller'),
    ('clinicagenda', 'TypeScript'),
    ('clinicagenda', 'Web'),
    ('sistema-barbearia-java', 'Java'),
    ('sistema-barbearia-java', 'Maven'),
    ('sistema-barbearia-java', 'JSON'),
    ('oficina-mecanica-padroes-projeto', 'Java'),
    ('oficina-mecanica-padroes-projeto', 'Facade'),
    ('oficina-mecanica-padroes-projeto', 'Mediator'),
    ('rota-de-bares', 'Python'),
    ('comunicacao-visual-dicom-ufvjm', 'Figma'),
    ('comunicacao-visual-dicom-ufvjm', 'Design grafico'),
    ('design-marketing-nexter', 'Figma'),
    ('design-marketing-nexter', 'Adobe Photoshop'),
    ('design-marketing-nexter', 'Adobe Illustrator'),
    ('planejamento-social-media-k2l', 'Social media'),
    ('planejamento-social-media-k2l', 'Planejamento editorial')
) as seed(slug, name)
join public.projects on public.projects.slug = seed.slug
on conflict (project_id, name) do nothing;

insert into public.project_highlights (project_id, content, sort_order)
select projects.id, seed.content, seed.sort_order
from (
  values
    ('portfolio-pessoal-nextjs', 'Integra modo Design e modo Dev em uma mesma identidade visual.', 10),
    ('portfolio-pessoal-nextjs', 'Inclui Supabase, login admin, curadoria GitHub e deploy na Vercel.', 20),
    ('sinema-catalogo-web', 'Organiza catalogo, busca, favoritos, historico e progresso de episodios.', 10),
    ('sinema-catalogo-web', 'Explora experiencia web local com Django e conteudo audiovisual.', 20),
    ('gestao-inteligente-locacao-eventos', 'Estrutura em camadas com UI, services e repository.', 10),
    ('gestao-inteligente-locacao-eventos', 'Gera contratos, recibos e comprovantes em PDF para operacao.', 20),
    ('clinicagenda', 'Estudo de agenda e fluxo administrativo em TypeScript.', 10),
    ('sistema-barbearia-java', 'Modelagem de entidades, CRUD, autorizacao e snapshots em JSON.', 10),
    ('oficina-mecanica-padroes-projeto', 'Aplicacao de Facade e Mediator para organizar responsabilidades.', 10),
    ('rota-de-bares', 'Experimento Python publicado no GitHub.', 10),
    ('comunicacao-visual-dicom-ufvjm', 'Demandas reais com briefing, feedback, padronizacao e prazos.', 10),
    ('design-marketing-nexter', 'Primeira experiencia profissional em agencia com clientes variados.', 10),
    ('planejamento-social-media-k2l', 'Planejamento de conteudo por plataforma, frequencia e estrategia.', 10)
) as seed(slug, content, sort_order)
join public.projects on public.projects.slug = seed.slug
on conflict (project_id, content) do nothing;

insert into public.project_gallery (project_id, title, description, image_url, sort_order)
select projects.id, seed.title, seed.description, null, seed.sort_order
from (
  values
    ('portfolio-pessoal-nextjs', 'Home Design + Dev', 'Visao principal do portfolio com duas frentes conectadas.', 10),
    ('portfolio-pessoal-nextjs', 'Admin e Supabase', 'Base para administracao de perfil, experiencias, cursos, projetos e curadoria.', 20),
    ('sinema-catalogo-web', 'Catalogo e navegacao', 'Estrutura de busca, favoritos, historico e progresso.', 10),
    ('gestao-inteligente-locacao-eventos', 'Operacao desktop', 'Fluxo de clientes, produtos, pedidos, estoque e documentos.', 10),
    ('clinicagenda', 'Fluxo de agenda', 'Organizacao inicial de uma experiencia para atendimento clinico.', 10),
    ('sistema-barbearia-java', 'Modelo de dominio', 'Entidades, regras, persistencia e relatorios do projeto academico.', 10),
    ('oficina-mecanica-padroes-projeto', 'Padroes de projeto', 'Organizacao tecnica com Facade e Mediator.', 10),
    ('rota-de-bares', 'Experimento Python', 'Projeto publico em evolucao no GitHub.', 10),
    ('comunicacao-visual-dicom-ufvjm', 'Demandas institucionais', 'Registro textual para futuras imagens de pecas graficas.', 10),
    ('design-marketing-nexter', 'Pecas de marketing', 'Registro textual para futuras imagens de trabalhos de agencia.', 10),
    ('planejamento-social-media-k2l', 'Planejamento editorial', 'Registro textual para futuras imagens de conteudo e calendario.', 10)
) as seed(slug, title, description, sort_order)
join public.projects on public.projects.slug = seed.slug
on conflict (project_id, title) do nothing;

insert into public.github_repository_curations (
  repository_name,
  custom_title,
  custom_description,
  custom_summary,
  custom_tags,
  custom_tools,
  custom_status,
  visible,
  featured,
  sort_order
) values
(
  'portifolio',
  'Portfolio pessoal Design + Dev',
  'Portfolio em Next.js e TypeScript com Supabase, admin autenticado, curadoria de repositorios e deploy na Vercel.',
  'Projeto principal atual para apresentar identidade visual, projetos de design, projetos dev e dados reais do portfolio.',
  array['Portfolio', 'Next.js', 'Supabase', 'Vercel'],
  array['TypeScript', 'Next.js', 'Supabase', 'Vercel'],
  'published',
  true,
  true,
  10
),
(
  'sinema',
  'Sinema',
  'Aplicacao web local em Django para catalogo, busca, reproducao via providers externos, favoritos, historico, progresso de episodios e canais ao vivo.',
  'Projeto Python/Django voltado a catalogo, navegacao e experiencia de uso para conteudo audiovisual.',
  array['Django', 'Catalogo', 'Web app'],
  array['Python', 'Django', 'HTML', 'CSS'],
  'published',
  true,
  true,
  20
),
(
  'sistema_de_aluguel',
  'Gestao Inteligente',
  'Sistema de gerenciamento de alugueis e locacao, conectado ao projeto pratico de desktop descrito no curriculo.',
  'Aplicacao para clientes, produtos, estoque, agenda, pagamentos e documentos operacionais.',
  array['Gestao', 'Locacao', 'Desktop'],
  array['Python', 'PySide6', 'SQLite', 'ReportLab'],
  'published',
  true,
  true,
  30
),
(
  'ClinicAgenda',
  'ClinicAgenda',
  'Projeto TypeScript para estudar agenda, fluxos administrativos e organizacao de produto digital.',
  'Estudo de agenda e interface para contexto clinico.',
  array['Agenda', 'Produto digital', 'TypeScript'],
  array['TypeScript'],
  'published',
  true,
  false,
  40
),
(
  'Barbearia',
  'Sistema de Barbearia',
  'Projeto academico em Java com POO, persistencia em JSON, CRUD, validacoes, extratos automaticos e snapshots.',
  'Sistema Java com modelagem de dominio e rotinas de persistencia.',
  array['Java', 'POO', 'Persistencia'],
  array['Java', 'Maven', 'JSON'],
  'published',
  true,
  false,
  50
),
(
  'oficina',
  'Sistema POO - Oficina Mecanica',
  'Projeto academico em Java aplicando Facade e Mediator para organizar responsabilidades e comunicacao entre componentes.',
  'Estudo de padroes de projeto, arquitetura orientada a objetos e documentacao tecnica.',
  array['Java', 'Design Patterns', 'POO'],
  array['Java', 'Facade', 'Mediator'],
  'published',
  true,
  false,
  60
),
(
  'rotadebares',
  'Rota de Bares',
  'Projeto em Python publicado no GitHub para explorar organizacao de informacoes, rotas e experiencia local.',
  'Experimento Python para organizar e apresentar informacoes.',
  array['Python', 'Experimento', 'Rotas'],
  array['Python'],
  'published',
  true,
  false,
  70
)
on conflict (repository_name) do update set
  custom_title = excluded.custom_title,
  custom_description = excluded.custom_description,
  custom_summary = excluded.custom_summary,
  custom_tags = excluded.custom_tags,
  custom_tools = excluded.custom_tools,
  custom_status = excluded.custom_status,
  visible = excluded.visible,
  featured = excluded.featured,
  sort_order = excluded.sort_order;

commit;
