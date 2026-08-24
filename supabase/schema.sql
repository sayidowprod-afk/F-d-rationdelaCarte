-- Schéma pour le site de l'association
-- À exécuter dans l'éditeur SQL de votre projet Supabase (nouveau projet dédié, distinct de memorabilius)

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
  -- null tant que la personne n'a pas payé sa première cotisation ; une fois
  -- réglée, l'admin fixe cette date (ex: +1 an). L'adhésion est active tant
  -- que membership_expires_at >= aujourd'hui.
  membership_expires_at date,
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

-- Tout membre connecté peut voir l'annuaire des membres à jour de cotisation
create policy "members_select_active" on public.members
  for select using (
    (membership_expires_at is not null and membership_expires_at >= current_date)
    or auth.uid() = id
  );

-- Un membre peut modifier son propre profil (pas son statut ni is_admin, appliqué côté appli)
create policy "members_update_self" on public.members
  for update using (auth.uid() = id);

-- Inscription : un utilisateur authentifié peut créer sa propre ligne
create policy "members_insert_self" on public.members
  for insert with check (auth.uid() = id);

-- Vérifie si l'utilisateur connecté est admin, en contournant RLS (security
-- definer) pour éviter la récursion infinie que provoquerait une sous-requête
-- directe sur members dans les règles ci-dessous.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.members where id = auth.uid()), false);
$$;

-- Les admins peuvent tout voir/modifier
create policy "members_admin_all" on public.members
  for all using (public.is_admin());

-- Actus : lecture publique, écriture réservée aux admins
create policy "news_select_all" on public.news
  for select using (true);

create policy "news_admin_write" on public.news
  for insert with check (public.is_admin());

create policy "news_admin_update" on public.news
  for update using (public.is_admin());

create policy "news_admin_delete" on public.news
  for delete using (public.is_admin());
