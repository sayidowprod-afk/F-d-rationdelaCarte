-- Schéma pour le site de l'association
-- À exécuter dans l'éditeur SQL de votre projet Supabase (nouveau projet dédié, distinct de memorabilius)

create type membership_status as enum ('pending', 'active', 'expired');

create table public.members (
  id uuid primary key references auth.users(id) on delete cascade,
  membership_number serial unique,
  pseudo text not null unique,
  first_name text,
  last_name text,
  email text not null,
  phone text,
  city text,
  birth_date date,
  bio text,
  avatar_url text,
  memorabilius_pseudo text,
  memorabilius_url text,
  status membership_status not null default 'pending',
  is_admin boolean not null default false,
  joined_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  event_date date,
  author_id uuid references public.members(id),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
alter table public.news enable row level security;

-- Tout membre connecté peut voir l'annuaire des membres actifs
create policy "members_select_active" on public.members
  for select using (status = 'active' or auth.uid() = id);

-- Un membre peut modifier son propre profil (pas son statut ni is_admin, appliqué côté appli)
create policy "members_update_self" on public.members
  for update using (auth.uid() = id);

-- Inscription : un utilisateur authentifié peut créer sa propre ligne
create policy "members_insert_self" on public.members
  for insert with check (auth.uid() = id);

-- Les admins peuvent tout voir/modifier
create policy "members_admin_all" on public.members
  for all using (
    exists (select 1 from public.members m where m.id = auth.uid() and m.is_admin = true)
  );

-- Actus : lecture publique, écriture réservée aux admins
create policy "news_select_all" on public.news
  for select using (true);

create policy "news_admin_write" on public.news
  for insert with check (
    exists (select 1 from public.members m where m.id = auth.uid() and m.is_admin = true)
  );

create policy "news_admin_update" on public.news
  for update using (
    exists (select 1 from public.members m where m.id = auth.uid() and m.is_admin = true)
  );

create policy "news_admin_delete" on public.news
  for delete using (
    exists (select 1 from public.members m where m.id = auth.uid() and m.is_admin = true)
  );
