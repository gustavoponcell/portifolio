-- Importação em lote dos projetos de Design de Gustavo Poncell.
--
-- Fontes analisadas em C:\poncell\projetos:
--   - Bacanal Da Dionísio's.pdf
--   - Identidade Visal Izo Axé Ganga Zumga - Gustavo Poncell
--   - Jequitimuu apresentação.pdf
--   - lacap.pdf
--   - Apresentação - XI Sintegra
--
-- O script é idempotente: ao ser executado novamente, atualiza somente os
-- cinco slugs abaixo e recria suas tags, destaques e galeria.
-- Nenhum outro projeto da tabela public.projects é removido.
-- Ferramentas adicionadas depois pelo painel são preservadas, pois os arquivos
-- analisados não informam com segurança quais softwares foram utilizados.
--
-- Imagens ficam como NULL de propósito. Um caminho local do Windows não é uma
-- URL pública e não pode ser consumido pelo site. Depois de subir as imagens
-- no Storage, preencha cover_url e project_gallery.image_url com URLs públicas.

begin;

create temporary table _design_project_import (
  payload jsonb not null
) on commit drop;

insert into _design_project_import (payload)
values (
  $projects$
  [
    {
      "slug": "bacanal-da-dionisios",
      "title": "Bacanal da Dionísio’s — 2ª edição",
      "description": "Idealizei, planejei e dirigi a segunda edição da Bacanal da Dionísio’s, uma experiência universitária construída como um universo mitológico próprio. Transformei irreverência, teatralidade e referências dionisíacas em uma narrativa visual completa, conectando identidade, campanha, ambientação e organização do evento.",
      "summary": "Criei e conduzi a identidade de uma festa imersiva da República Dionísios, em Diamantina, unindo direção criativa, narrativa visual e execução do evento.",
      "featured": true,
      "year": null,
      "role": "Designer, diretor criativo e organizador geral",
      "sort_order": 10,
      "tags": [
        "Identidade visual",
        "Direção criativa",
        "Evento",
        "Social media",
        "Design narrativo"
      ],
      "tools": [],
      "highlights": [
        {
          "content": "Construí um universo visual noturno e ritualístico com vermelho, tons terrosos, cinza escuro e verde musgo, apoiado por elementos como videiras, colunas, barris e ânforas.",
          "sort_order": 10
        },
        {
          "content": "A campanha alcançou 130 mil contas, aumentou em mais de 500% as visitas ao perfil e registrou entre 7 mil e 11 mil visualizações médias nas peças.",
          "sort_order": 20
        },
        {
          "content": "Além da identidade visual, atuei no planejamento, na direção criativa e na organização geral da experiência.",
          "sort_order": 30
        }
      ],
      "gallery": [
        {
          "title": "Sistema visual dionisíaco",
          "description": "Paleta, tipografia e elementos gráficos que dão unidade ao universo ritualístico do evento.",
          "image_url": null,
          "sort_order": 10
        },
        {
          "title": "Campanha para redes sociais",
          "description": "Peças de divulgação para atrações, bebidas, comidas e informações do evento.",
          "image_url": null,
          "sort_order": 20
        },
        {
          "title": "Resultados e aprendizados",
          "description": "Síntese dos resultados de alcance, gestão criativa e construção coletiva do projeto.",
          "image_url": null,
          "sort_order": 30
        }
      ]
    },
    {
      "slug": "izo-axe-ganga-zumba",
      "title": "Izo Axé Ganga Zumba — identidade visual",
      "description": "Desenvolvi a identidade visual do Terreiro Izo Axé Ganga Zumba, em São João da Chapada, Diamantina. O sistema parte do Ibiri como símbolo central e traduz ancestralidade, acolhimento, continuidade e presença do axé por meio de traços orgânicos, cores profundas e texturas ligadas ao território e à construção coletiva.",
      "summary": "Criei uma identidade visual enraizada na ancestralidade do terreiro, tendo o Ibiri como centro simbólico e um sistema preparado para aplicações digitais, impressas e institucionais.",
      "featured": true,
      "year": "2026",
      "role": "Designer de identidade visual",
      "sort_order": 20,
      "tags": [
        "Identidade visual",
        "Branding",
        "Candomblé",
        "Design cultural",
        "Social media"
      ],
      "tools": [],
      "highlights": [
        {
          "content": "Escolhi o Ibiri como elemento central para dialogar com a trajetória espiritual da casa e com Nanã, representando ancestralidade, maturidade, acolhimento e continuidade.",
          "sort_order": 10
        },
        {
          "content": "Combinei roxo, bege, preto e branco com texturas orgânicas para equilibrar profundidade, sagrado, calor humano, contraste e versatilidade.",
          "sort_order": 20
        },
        {
          "content": "Estruturei aplicações para redes sociais, materiais impressos e comunicação institucional sem perder a força simbólica da marca.",
          "sort_order": 30
        }
      ],
      "gallery": [
        {
          "title": "Símbolo Ibiri",
          "description": "Construção orgânica do símbolo que representa a presença viva do axé, a ancestralidade e a continuidade.",
          "image_url": null,
          "sort_order": 10
        },
        {
          "title": "Sistema visual",
          "description": "Logo, paleta, tipografias Cormorant Garamond e Hello Eatery One, além das texturas da identidade.",
          "image_url": null,
          "sort_order": 20
        },
        {
          "title": "Aplicações da identidade",
          "description": "Desdobramentos para programação semanal, redes sociais e sinalização do terreiro.",
          "image_url": null,
          "sort_order": 30
        }
      ]
    },
    {
      "slug": "jequitimuu-identidade-visual",
      "title": "Jequitimuu — identidade visual",
      "description": "Criei a identidade da Jequitimuu para apresentar uma marca de laticínios 100% UFVJM de forma simpática, memorável e próxima. A vaca com capelo traduz a origem universitária e o aprendizado prático, enquanto a linguagem cremosa e descontraída aproxima a marca de produtos como queijo e doce de leite.",
      "summary": "Transformei a união entre qualidade acadêmica e sabor artesanal em uma marca leve, versátil e pronta para viver nas embalagens dos produtos.",
      "featured": true,
      "year": null,
      "role": "Designer de identidade visual",
      "sort_order": 30,
      "tags": [
        "Identidade visual",
        "Branding",
        "Laticínios",
        "Embalagem",
        "UFVJM"
      ],
      "tools": [],
      "highlights": [
        {
          "content": "Transformei a origem universitária da marca em uma vaca formada, com capelo e expressão divertida, criando um símbolo de leitura rápida e fácil memorização.",
          "sort_order": 10
        },
        {
          "content": "Combinei a tipografia Super Creamy nos destaques com Helvetica nos textos informativos para equilibrar personalidade, clareza e legibilidade.",
          "sort_order": 20
        },
        {
          "content": "Levei o sistema visual para rótulos de queijo, potes de doce de leite, sacolas e outras embalagens da marca.",
          "sort_order": 30
        }
      ],
      "gallery": [
        {
          "title": "Logo e personagem",
          "description": "A vaca universitária e o lettering curvo que formam a assinatura principal da Jequitimuu.",
          "image_url": null,
          "sort_order": 10
        },
        {
          "title": "Sistema tipográfico e cromático",
          "description": "Tipografia expressiva, fonte de apoio e paleta preparada para manter consistência e legibilidade.",
          "image_url": null,
          "sort_order": 20
        },
        {
          "title": "Aplicações em embalagens",
          "description": "Rótulos e embalagens que conectam a identidade aos queijos e doces de leite produzidos na UFVJM.",
          "image_url": null,
          "sort_order": 30
        }
      ]
    },
    {
      "slug": "lacap-identidade-visual",
      "title": "LACAP — identidade visual",
      "description": "Desenvolvi a identidade do LACAP — Lagartos, Anuros, Cobras, Aventuras & Pesquisas — para aproximar ciência, observação de campo e o território do Vale do Jequitinhonha. A marca combina um anfíbio de chapéu de palha e binóculos com traços de gravura científica, criando uma linguagem séria na pesquisa e, ao mesmo tempo, acessível na comunicação.",
      "summary": "Criei um sistema visual que une pesquisa, trabalho de campo e identidade regional para comunicar ciência com clareza e personalidade.",
      "featured": false,
      "year": null,
      "role": "Designer de identidade visual",
      "sort_order": 40,
      "tags": [
        "Identidade visual",
        "Design científico",
        "Comunicação ambiental",
        "Social media",
        "Vale do Jequitinhonha"
      ],
      "tools": [],
      "highlights": [
        {
          "content": "Uni o imaginário do pesquisador de campo à ilustração científica em uma marca protagonizada por um anfíbio com chapéu de palha e binóculos.",
          "sort_order": 10
        },
        {
          "content": "A paleta em verdes, areia, preto e branco e a textura de solo rachado conectam vegetação, rochas, seca e cerâmica do Vale do Jequitinhonha.",
          "sort_order": 20
        },
        {
          "content": "Desdobrei a identidade em modelos de conteúdo científico para Instagram, ícones de campo e materiais digitais.",
          "sort_order": 30
        }
      ],
      "gallery": [
        {
          "title": "Logo e sistema visual",
          "description": "Marca, versões positiva e negativa, paleta, tipografia e textura institucional.",
          "image_url": null,
          "sort_order": 10
        },
        {
          "title": "Conteúdo científico para redes",
          "description": "Modelos editoriais para apresentar espécies, nomes científicos e informações de campo.",
          "image_url": null,
          "sort_order": 20
        },
        {
          "title": "Ícones e aplicações de campo",
          "description": "Sistema de ícones para lagartos, anuros e cobras aplicado à comunicação do laboratório.",
          "image_url": null,
          "sort_order": 30
        }
      ]
    },
    {
      "slug": "xi-sintegra-tecnologia",
      "title": "XI Sintegra — Tecnologia: para quê e para quem?",
      "description": "Criei o sistema gráfico do XI Sintegra a partir da pergunta “Tecnologia: para quê e para quem?”. A linguagem retrofuturista conecta passado e futuro para provocar discussões sobre acesso, ética, inclusão e democratização do desenvolvimento científico e tecnológico.",
      "summary": "Desenvolvi uma identidade retrofuturista para um evento acadêmico que coloca tecnologia, ética e inclusão no centro da conversa.",
      "featured": false,
      "year": null,
      "role": "Designer gráfico",
      "sort_order": 50,
      "tags": [
        "Identidade visual",
        "Evento acadêmico",
        "Design gráfico",
        "Tecnologia",
        "Inclusão"
      ],
      "tools": [],
      "highlights": [
        {
          "content": "Usei uma linguagem retrofuturista para contrastar as promessas históricas da tecnologia com as escolhas éticas e sociais do presente.",
          "sort_order": 10
        },
        {
          "content": "Estruturei três eixos visuais: futuro e acesso, democratização da inovação e tecnoprogressismo orientado por valores inclusivos e democráticos.",
          "sort_order": 20
        },
        {
          "content": "A identidade foi desdobrada em banners, cabeçalhos, botões, certificado, peças para a plataforma Even3 e materiais de ambientação.",
          "sort_order": 30
        }
      ],
      "gallery": [
        {
          "title": "Banners temáticos",
          "description": "Peças que apresentam os três eixos conceituais do evento por meio de colagens retrofuturistas.",
          "image_url": null,
          "sort_order": 10
        },
        {
          "title": "Sistema gráfico do evento",
          "description": "Paleta, tipografia, cabeçalhos, botões e componentes para manter unidade entre os formatos.",
          "image_url": null,
          "sort_order": 20
        },
        {
          "title": "Certificado e ambientação",
          "description": "Aplicações institucionais e faixas de entrada que orientam o público e reforçam a identidade do XI Sintegra.",
          "image_url": null,
          "sort_order": 30
        }
      ]
    }
  ]
  $projects$::jsonb
);

create temporary table _design_project_rows on commit drop as
select
  project.item,
  project.ordinality
from _design_project_import as source
cross join lateral jsonb_array_elements(source.payload)
  with ordinality as project(item, ordinality);

do $validation$
begin
  if exists (
    select 1
    from _design_project_rows
    where coalesce(item->>'slug', '') = ''
       or coalesce(item->>'title', '') = ''
  ) then
    raise exception 'Todos os projetos precisam ter slug e title.';
  end if;

  if exists (
    select item->>'slug'
    from _design_project_rows
    group by item->>'slug'
    having count(*) > 1
  ) then
    raise exception 'Existem slugs duplicados no lote de importação.';
  end if;

  if exists (
    select 1
    from public.projects as existing_project
    join _design_project_rows as imported_project
      on imported_project.item->>'slug' = existing_project.slug
    where existing_project.type <> 'design'
  ) then
    raise exception 'Um dos slugs já pertence a um projeto que não é de Design.';
  end if;
end
$validation$;

insert into public.projects (
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
)
select
  item->>'slug',
  item->>'title',
  'design',
  nullif(item->>'description', ''),
  nullif(item->>'summary', ''),
  'published',
  coalesce((item->>'featured')::boolean, false),
  null,
  nullif(item->>'year', ''),
  nullif(item->>'role', ''),
  null,
  null,
  null,
  coalesce((item->>'sort_order')::integer, ordinality::integer * 10)
from _design_project_rows
on conflict (slug) do update
set
  title = excluded.title,
  type = excluded.type,
  description = excluded.description,
  summary = excluded.summary,
  status = excluded.status,
  featured = excluded.featured,
  year = excluded.year,
  role = excluded.role,
  sort_order = excluded.sort_order,
  updated_at = now()
where public.projects.type = 'design';

-- Preserva as URLs de imagens adicionadas após a primeira importação quando o
-- título do item da galeria continuar igual.
create temporary table _existing_gallery_images on commit drop as
select
  project.slug,
  gallery.title,
  gallery.image_url
from public.project_gallery as gallery
join public.projects as project
  on project.id = gallery.project_id
join _design_project_rows as imported
  on imported.item->>'slug' = project.slug
where gallery.image_url is not null;

-- A nova execução substitui apenas os relacionamentos editoriais dos projetos.
delete from public.project_tags
where project_id in (
  select project.id
  from public.projects as project
  join _design_project_rows as imported
    on imported.item->>'slug' = project.slug
);

delete from public.project_highlights
where project_id in (
  select project.id
  from public.projects as project
  join _design_project_rows as imported
    on imported.item->>'slug' = project.slug
);

delete from public.project_gallery
where project_id in (
  select project.id
  from public.projects as project
  join _design_project_rows as imported
    on imported.item->>'slug' = project.slug
);

insert into public.project_tags (project_id, name)
select
  project.id,
  btrim(tag.value)
from _design_project_rows as imported
join public.projects as project
  on project.slug = imported.item->>'slug'
cross join lateral jsonb_array_elements_text(
  coalesce(imported.item->'tags', '[]'::jsonb)
) as tag(value)
where btrim(tag.value) <> ''
on conflict (project_id, name) do nothing;

insert into public.project_tools (project_id, name)
select
  project.id,
  btrim(tool.value)
from _design_project_rows as imported
join public.projects as project
  on project.slug = imported.item->>'slug'
cross join lateral jsonb_array_elements_text(
  coalesce(imported.item->'tools', '[]'::jsonb)
) as tool(value)
where btrim(tool.value) <> ''
on conflict (project_id, name) do nothing;

insert into public.project_highlights (project_id, content, sort_order)
select
  project.id,
  highlight.item->>'content',
  coalesce(
    (highlight.item->>'sort_order')::integer,
    highlight.ordinality::integer * 10
  )
from _design_project_rows as imported
join public.projects as project
  on project.slug = imported.item->>'slug'
cross join lateral jsonb_array_elements(
  coalesce(imported.item->'highlights', '[]'::jsonb)
) with ordinality as highlight(item, ordinality)
where nullif(highlight.item->>'content', '') is not null
on conflict (project_id, content) do update
set sort_order = excluded.sort_order;

insert into public.project_gallery (
  project_id,
  title,
  description,
  image_url,
  sort_order
)
select
  project.id,
  gallery.item->>'title',
  nullif(gallery.item->>'description', ''),
  coalesce(
    nullif(gallery.item->>'image_url', ''),
    existing_image.image_url
  ),
  coalesce(
    (gallery.item->>'sort_order')::integer,
    gallery.ordinality::integer * 10
  )
from _design_project_rows as imported
join public.projects as project
  on project.slug = imported.item->>'slug'
cross join lateral jsonb_array_elements(
  coalesce(imported.item->'gallery', '[]'::jsonb)
) with ordinality as gallery(item, ordinality)
left join _existing_gallery_images as existing_image
  on existing_image.slug = project.slug
 and existing_image.title = gallery.item->>'title'
where nullif(gallery.item->>'title', '') is not null
on conflict (project_id, title) do update
set
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;

commit;

-- Conferência final: o resultado esperado é uma linha para cada um dos
-- cinco projetos, todos com type=design e status=published.
select
  project.slug,
  project.title,
  project.status,
  project.featured,
  project.year,
  count(distinct tag.id) as total_tags,
  count(distinct highlight.id) as total_destaques,
  count(distinct gallery.id) as total_itens_galeria
from public.projects as project
left join public.project_tags as tag
  on tag.project_id = project.id
left join public.project_highlights as highlight
  on highlight.project_id = project.id
left join public.project_gallery as gallery
  on gallery.project_id = project.id
where project.slug in (
  'bacanal-da-dionisios',
  'izo-axe-ganga-zumba',
  'jequitimuu-identidade-visual',
  'lacap-identidade-visual',
  'xi-sintegra-tecnologia'
)
group by project.id
order by project.sort_order, project.title;
