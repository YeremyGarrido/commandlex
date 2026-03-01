-- ============================================================
-- CommandLex — Schema v1.0
-- Pegar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Extensión para UUIDs
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLA: profiles
-- Se crea automáticamente cuando un usuario hace OAuth.
-- Vinculada 1:1 con auth.users de Supabase.
-- ============================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text,
  avatar_url  text,
  github_url  text,
  created_at  timestamptz default now()
);

-- Trigger: crear perfil automáticamente al registrar usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, github_url)
  values (
    new.id,
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'html_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- TABLA: repos
-- Repositorios de GitHub vinculados por el usuario.
-- ============================================================
create table if not exists public.repos (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  github_owner  text not null,
  github_repo   text not null,
  display_name  text,
  description   text,
  default_branch text default 'main',
  last_synced   timestamptz,
  created_at    timestamptz default now(),
  unique (user_id, github_owner, github_repo)
);

-- ============================================================
-- TABLA: workspaces
-- Agrupaciones personales de comandos + repos por proyecto.
-- ============================================================
create table if not exists public.workspaces (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  description text,
  color       text default '#1a73e8',
  created_at  timestamptz default now()
);

-- ============================================================
-- TABLA: workspace_items
-- Comandos o repos vinculados a un workspace.
-- ============================================================
create table if not exists public.workspace_items (
  id            uuid primary key default uuid_generate_v4(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  item_type     text not null check (item_type in ('command', 'repo')),
  item_id       text not null,  -- command.id del JSON o repo.id UUID
  added_at      timestamptz default now(),
  unique (workspace_id, item_type, item_id)
);

-- ============================================================
-- TABLA: progress
-- Progreso por usuario en comandos y quizzes.
-- ============================================================
create table if not exists public.progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  item_id       text not null,      -- command.id del JSON o card UUID
  item_type     text not null check (item_type in ('command', 'flashcard', 'quiz')),
  status        text not null check (status in ('seen', 'learning', 'mastered')),
  score         smallint,           -- 0-100, solo para quizzes
  -- Datos para repetición espaciada (algoritmo SM-2 simplificado)
  ease_factor   real default 2.5,   -- dificultad percibida
  interval_days smallint default 1, -- días hasta próxima revisión
  next_review   date default current_date,
  review_count  smallint default 0,
  last_reviewed timestamptz,
  completed_at  timestamptz,
  created_at    timestamptz default now(),
  unique (user_id, item_id, item_type)
);

-- ============================================================
-- TABLA: notes
-- Notas personales sobre comandos o páginas de repo.
-- ============================================================
create table if not exists public.notes (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  item_id     text not null,   -- command.id o "owner/repo/path"
  item_type   text not null check (item_type in ('command', 'doc')),
  content     text not null,
  updated_at  timestamptz default now(),
  created_at  timestamptz default now(),
  unique (user_id, item_id, item_type)
);

-- ============================================================
-- RLS (Row Level Security) — cada usuario solo ve sus datos
-- ============================================================
alter table public.profiles        enable row level security;
alter table public.repos           enable row level security;
alter table public.workspaces      enable row level security;
alter table public.workspace_items enable row level security;
alter table public.progress        enable row level security;
alter table public.notes           enable row level security;

-- Profiles: solo el propio usuario
create policy "profiles: own" on public.profiles
  for all using (auth.uid() = id);

-- Repos: solo el propio usuario
create policy "repos: own" on public.repos
  for all using (auth.uid() = user_id);

-- Workspaces: solo el propio usuario
create policy "workspaces: own" on public.workspaces
  for all using (auth.uid() = user_id);

-- Workspace items: a través del workspace del usuario
create policy "workspace_items: own" on public.workspace_items
  for all using (
    exists (
      select 1 from public.workspaces w
      where w.id = workspace_id and w.user_id = auth.uid()
    )
  );

-- Progress: solo el propio usuario
create policy "progress: own" on public.progress
  for all using (auth.uid() = user_id);

-- Notes: solo el propio usuario
create policy "notes: own" on public.notes
  for all using (auth.uid() = user_id);

-- ============================================================
-- ÍNDICES para queries frecuentes
-- ============================================================
create index if not exists idx_progress_user_next_review
  on public.progress (user_id, next_review);

create index if not exists idx_progress_user_item
  on public.progress (user_id, item_id);

create index if not exists idx_repos_user
  on public.repos (user_id);

create index if not exists idx_notes_user_item
  on public.notes (user_id, item_id);
