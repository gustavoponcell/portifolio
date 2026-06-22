-- Temporary seed data for local/manual Supabase setup.
-- These rows are mock content only. They do not include real personal contacts,
-- real clients, certificates, jobs, private URLs, or real repositories.

insert into public.projects (
  id,
  slug,
  title,
  type,
  description,
  summary,
  status,
  featured,
  year,
  role,
  sort_order
) values
(
  '11111111-1111-4111-8111-111111111111',
  'identidade-visual-experimental',
  'Identidade visual experimental',
  'design',
  'Projeto temporario para representar futuros estudos de marca, composicao visual e linguagem editorial.',
  'Estudo conceitual de identidade visual criado para testar uma linguagem grafica forte, modular e preparada para aplicacoes digitais.',
  'mock',
  true,
  '2026',
  'Direcao visual e composicao',
  10
),
(
  '22222222-2222-4222-8222-222222222222',
  'interface-visual-para-produto-digital',
  'Interface visual para produto digital',
  'design',
  'Mock de interface para validar telas, hierarquia visual e componentes de produto digital.',
  'Estudo visual de UI para organizar componentes, estados, cards e uma linguagem de produto digital.',
  'mock',
  true,
  '2026',
  'UI design e sistema visual',
  20
),
(
  '33333333-3333-4333-8333-333333333333',
  'sistema-web-de-portfolio',
  'Sistema web de portfolio',
  'dev',
  'Projeto temporario para representar a base do portfolio com rotas, layout global e componentes reutilizaveis.',
  'Estudo tecnico mockado para representar a arquitetura de um portfolio em Next.js com rotas publicas e componentes reutilizaveis.',
  'mock',
  true,
  '2026',
  'Frontend e arquitetura inicial',
  30
),
(
  '44444444-4444-4444-8444-444444444444',
  'dashboard-administrativo-conceitual',
  'Dashboard administrativo conceitual',
  'dev',
  'Mock de painel futuro para organizar conteudo, projetos, experiencias e informacoes principais.',
  'Conceito de dashboard para planejar o futuro admin do portfolio sem implementar autenticacao, CRUD ou Supabase nesta etapa.',
  'mock',
  true,
  '2026',
  'Planejamento de interface e fluxo',
  40
)
on conflict (slug) do update set
  title = excluded.title,
  type = excluded.type,
  description = excluded.description,
  summary = excluded.summary,
  status = excluded.status,
  featured = excluded.featured,
  year = excluded.year,
  role = excluded.role,
  sort_order = excluded.sort_order;

insert into public.project_tags (project_id, name) values
  ('11111111-1111-4111-8111-111111111111', 'Branding'),
  ('11111111-1111-4111-8111-111111111111', 'Editorial'),
  ('11111111-1111-4111-8111-111111111111', 'Visual'),
  ('22222222-2222-4222-8222-222222222222', 'UI'),
  ('22222222-2222-4222-8222-222222222222', 'Interfaces'),
  ('22222222-2222-4222-8222-222222222222', 'Produto digital'),
  ('33333333-3333-4333-8333-333333333333', 'Next.js'),
  ('33333333-3333-4333-8333-333333333333', 'TypeScript'),
  ('33333333-3333-4333-8333-333333333333', 'App Router'),
  ('44444444-4444-4444-8444-444444444444', 'Dashboard'),
  ('44444444-4444-4444-8444-444444444444', 'Admin futuro'),
  ('44444444-4444-4444-8444-444444444444', 'UI')
on conflict (project_id, name) do nothing;

insert into public.project_tools (project_id, name) values
  ('11111111-1111-4111-8111-111111111111', 'Figma'),
  ('11111111-1111-4111-8111-111111111111', 'Illustrator'),
  ('22222222-2222-4222-8222-222222222222', 'Figma'),
  ('22222222-2222-4222-8222-222222222222', 'Componentes'),
  ('33333333-3333-4333-8333-333333333333', 'Next.js'),
  ('33333333-3333-4333-8333-333333333333', 'TypeScript'),
  ('33333333-3333-4333-8333-333333333333', 'Tailwind CSS'),
  ('44444444-4444-4444-8444-444444444444', 'Next.js'),
  ('44444444-4444-4444-8444-444444444444', 'UI mockada')
on conflict (project_id, name) do nothing;

insert into public.project_highlights (project_id, content, sort_order) values
  ('11111111-1111-4111-8111-111111111111', 'Exploracao de hierarquia visual com alto contraste.', 10),
  ('11111111-1111-4111-8111-111111111111', 'Sistema flexivel para cartazes, capas e pecas digitais.', 20),
  ('22222222-2222-4222-8222-222222222222', 'Padrao visual preparado para evoluir para design system.', 10),
  ('22222222-2222-4222-8222-222222222222', 'Boa ponte entre o modo Design e o modo Dev.', 20),
  ('33333333-3333-4333-8333-333333333333', 'App Router com paginas publicas organizadas.', 10),
  ('33333333-3333-4333-8333-333333333333', 'Estrutura pronta para trocar mock por dados do backend.', 20),
  ('44444444-4444-4444-8444-444444444444', 'Preparacao para CRUDs futuros.', 10),
  ('44444444-4444-4444-8444-444444444444', 'Sem login, permissao ou escrita em banco nesta fase.', 20)
on conflict (project_id, content) do nothing;

insert into public.project_gallery (project_id, title, description, sort_order) values
  ('11111111-1111-4111-8111-111111111111', 'Direcao visual', 'Placeholder textual para painel de referencias e composicao.', 10),
  ('22222222-2222-4222-8222-222222222222', 'Tela principal', 'Placeholder para uma visao geral do produto e seus componentes.', 10),
  ('33333333-3333-4333-8333-333333333333', 'Arquitetura de rotas', 'Placeholder textual para representar Home, modos e detalhe de projeto.', 10),
  ('44444444-4444-4444-8444-444444444444', 'Visao geral', 'Placeholder para tela inicial do painel com metricas temporarias.', 10)
on conflict (project_id, title) do nothing;

insert into public.site_settings (key, value) values
  ('seed_notice', '{"message":"Temporary mock seed. Replace with curated admin content later."}'::jsonb)
on conflict (key) do update set value = excluded.value;

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
  'portfolio-next',
  'Portfolio Next.js',
  'Curadoria temporaria para representar a base tecnica do portfolio em Next.js.',
  'Projeto mockado para testar como a curadoria Dev aparece publicamente.',
  array['Next.js', 'Portfolio', 'Mock'],
  array['TypeScript', 'Tailwind CSS'],
  'mock',
  true,
  true,
  10
),
(
  'dashboard-admin',
  'Dashboard admin',
  'Curadoria temporaria para validar o controle de visibilidade e destaque no modo Dev.',
  'Exemplo seguro baseado no fallback mockado, sem repositorio real inventado.',
  array['Dashboard', 'Admin', 'Mock'],
  array['TypeScript', 'UI mockada'],
  'mock',
  false,
  false,
  20
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

-- Profile seed is intentionally not inserted here because profiles.id references
-- auth.users(id). Create the Auth user first, then edit the profile in /admin/perfil.

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
) values (
  '55555555-5555-4555-8555-555555555555',
  'Experiencia temporaria',
  'Organizacao temporaria',
  'Registro generico para testar o CRUD de experiencias sem representar uma experiencia real.',
  null,
  null,
  false,
  'mock',
  10,
  false
)
on conflict (id) do update set
  title = excluded.title,
  organization = excluded.organization,
  description = excluded.description,
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
) values (
  '66666666-6666-4666-8666-666666666666',
  'Curso temporario',
  'Instituicao temporaria',
  'Registro generico para testar o CRUD de cursos sem representar certificacao real.',
  '2026',
  null,
  false,
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
