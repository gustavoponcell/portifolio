-- Portfolio Supabase schema
-- Apply manually in the Supabase SQL Editor after reviewing the project settings.
-- This file plans the initial public content model and admin security strategy.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  display_name text,
  headline text,
  bio text,
  avatar_url text,
  email_public text,
  phone_public text,
  whatsapp_url text,
  github_url text,
  behance_url text,
  linkedin_url text,
  instagram_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type text not null,
  description text not null,
  summary text,
  status text not null default 'draft',
  featured boolean not null default false,
  cover_url text,
  year text,
  role text,
  external_url text,
  repository_url text,
  live_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_type_check check (type in ('design', 'dev')),
  constraint projects_status_check check (status in ('draft', 'published', 'archived', 'mock')),
  constraint projects_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.project_tags (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  constraint project_tags_name_check check (length(trim(name)) > 0),
  constraint project_tags_project_name_unique unique (project_id, name)
);

create table if not exists public.project_tools (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  constraint project_tools_name_check check (length(trim(name)) > 0),
  constraint project_tools_project_name_unique unique (project_id, name)
);

create table if not exists public.project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  constraint project_gallery_title_check check (length(trim(title)) > 0),
  constraint project_gallery_project_title_unique unique (project_id, title)
);

create table if not exists public.project_highlights (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0,
  constraint project_highlights_content_check check (length(trim(content)) > 0),
  constraint project_highlights_project_content_unique unique (project_id, content)
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  description text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  type text not null default 'general',
  sort_order integer not null default 0,
  visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint experiences_dates_check check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  institution text,
  description text,
  year text,
  certificate_url text,
  visible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  type text not null,
  url text not null,
  visible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_links_url_check check (url ~ '^https?://')
);

create table if not exists public.github_repository_curations (
  id uuid primary key default gen_random_uuid(),
  repository_name text not null unique,
  custom_title text,
  custom_description text,
  custom_summary text,
  custom_tags text[] not null default '{}'::text[],
  custom_tools text[] not null default '{}'::text[],
  custom_status text not null default 'published',
  visible boolean not null default true,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint github_repository_name_check check (length(trim(repository_name)) > 0),
  constraint github_repository_custom_status_check check (custom_status in ('draft', 'published', 'archived', 'mock'))
);

alter table public.github_repository_curations
  add column if not exists custom_summary text;

alter table public.github_repository_curations
  add column if not exists custom_tags text[] not null default '{}'::text[];

alter table public.github_repository_curations
  add column if not exists custom_tools text[] not null default '{}'::text[];

alter table public.github_repository_curations
  add column if not exists custom_status text not null default 'published';

do $$
begin
  alter table public.github_repository_curations
    add constraint github_repository_custom_status_check
    check (custom_status in ('draft', 'published', 'archived', 'mock'));
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_key_check check (length(trim(key)) > 0)
);

create index if not exists projects_type_status_idx on public.projects(type, status);
create index if not exists projects_featured_idx on public.projects(featured) where featured = true;
create index if not exists projects_sort_order_idx on public.projects(sort_order, created_at desc);
create index if not exists project_tags_project_id_idx on public.project_tags(project_id);
create index if not exists project_tools_project_id_idx on public.project_tools(project_id);
create index if not exists project_gallery_project_order_idx on public.project_gallery(project_id, sort_order);
create index if not exists project_highlights_project_order_idx on public.project_highlights(project_id, sort_order);
create index if not exists experiences_visible_order_idx on public.experiences(visible, sort_order);
create index if not exists courses_visible_order_idx on public.courses(visible, sort_order);
create index if not exists contact_links_visible_order_idx on public.contact_links(visible, sort_order);
create index if not exists github_repository_curations_visible_order_idx on public.github_repository_curations(visible, sort_order);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists experiences_set_updated_at on public.experiences;
create trigger experiences_set_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
before update on public.courses
for each row execute function public.set_updated_at();

drop trigger if exists contact_links_set_updated_at on public.contact_links;
create trigger contact_links_set_updated_at
before update on public.contact_links
for each row execute function public.set_updated_at();

drop trigger if exists github_repository_curations_set_updated_at on public.github_repository_curations;
create trigger github_repository_curations_set_updated_at
before update on public.github_repository_curations
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.site_settings
    where key = 'admin_user_id'
      and value ->> 'user_id' = auth.uid()::text
  );
$$;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_tools enable row level security;
alter table public.project_gallery enable row level security;
alter table public.project_highlights enable row level security;
alter table public.experiences enable row level security;
alter table public.courses enable row level security;
alter table public.contact_links enable row level security;
alter table public.github_repository_curations enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects for select
using (status = 'published');

drop policy if exists "Public can read published project tags" on public.project_tags;
create policy "Public can read published project tags"
on public.project_tags for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_tags.project_id
      and projects.status = 'published'
  )
);

drop policy if exists "Public can read published project tools" on public.project_tools;
create policy "Public can read published project tools"
on public.project_tools for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_tools.project_id
      and projects.status = 'published'
  )
);

drop policy if exists "Public can read published project gallery" on public.project_gallery;
create policy "Public can read published project gallery"
on public.project_gallery for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_gallery.project_id
      and projects.status = 'published'
  )
);

drop policy if exists "Public can read published project highlights" on public.project_highlights;
create policy "Public can read published project highlights"
on public.project_highlights for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_highlights.project_id
      and projects.status = 'published'
  )
);

drop policy if exists "Public can read visible experiences" on public.experiences;
create policy "Public can read visible experiences"
on public.experiences for select
using (visible = true);

drop policy if exists "Public can read visible courses" on public.courses;
create policy "Public can read visible courses"
on public.courses for select
using (visible = true);

drop policy if exists "Public can read visible contact links" on public.contact_links;
create policy "Public can read visible contact links"
on public.contact_links for select
using (visible = true);

drop policy if exists "Public can read visible github repository curations" on public.github_repository_curations;
create policy "Public can read visible github repository curations"
on public.github_repository_curations for select
using (visible = true);

drop policy if exists "Public can read public profile" on public.profiles;
create policy "Public can read public profile"
on public.profiles for select
using (true);

-- Admin write/read policies.
-- The admin is intentionally not hardcoded by email here.
-- In a later auth prompt, insert site_settings key 'admin_user_id' with the authorized auth.users id.

drop policy if exists "Admin can manage profiles" on public.profiles;
create policy "Admin can manage profiles"
on public.profiles for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage projects" on public.projects;
create policy "Admin can manage projects"
on public.projects for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage project tags" on public.project_tags;
create policy "Admin can manage project tags"
on public.project_tags for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage project tools" on public.project_tools;
create policy "Admin can manage project tools"
on public.project_tools for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage project gallery" on public.project_gallery;
create policy "Admin can manage project gallery"
on public.project_gallery for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage project highlights" on public.project_highlights;
create policy "Admin can manage project highlights"
on public.project_highlights for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage experiences" on public.experiences;
create policy "Admin can manage experiences"
on public.experiences for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage courses" on public.courses;
create policy "Admin can manage courses"
on public.courses for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage contact links" on public.contact_links;
create policy "Admin can manage contact links"
on public.contact_links for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage github curations" on public.github_repository_curations;
create policy "Admin can manage github curations"
on public.github_repository_curations for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admin can manage site settings" on public.site_settings;
create policy "Admin can manage site settings"
on public.site_settings for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

-- TODO Prompt 11:
-- 1. Create the real admin user in Supabase Auth.
-- 2. Insert site_settings ('admin_user_id', '{"user_id":"..."}').
-- 3. Validate login and admin route protection using supabase.auth.getClaims().

-- Storage setup for Prompt 15.
-- The app writes images server-side with SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY
-- after validating the admin user. Do not allow anonymous/public writes.
--
-- Recommended bucket:
--   name: portfolio-media
--   public read: true
--   max file size: 5242880 bytes
--   allowed mime types: image/jpeg, image/png, image/webp, image/gif
--
-- You may create this bucket manually in the Supabase Dashboard:
-- Storage > New bucket > portfolio-media > Public bucket.
--
-- Optional SQL to review and run in Supabase SQL Editor:
--
-- insert into storage.buckets (
--   id,
--   name,
--   public,
--   file_size_limit,
--   allowed_mime_types
-- ) values (
--   'portfolio-media',
--   'portfolio-media',
--   true,
--   5242880,
--   array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
-- )
-- on conflict (id) do update set
--   public = excluded.public,
--   file_size_limit = excluded.file_size_limit,
--   allowed_mime_types = excluded.allowed_mime_types;
--
-- drop policy if exists "Public can read portfolio media" on storage.objects;
-- create policy "Public can read portfolio media"
-- on storage.objects for select
-- using (bucket_id = 'portfolio-media');
--
-- Writes are intentionally handled with the server-side admin client.
-- Do not create insert/update/delete policies for anon users.
