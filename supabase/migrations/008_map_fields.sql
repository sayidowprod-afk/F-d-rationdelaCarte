-- À exécuter dans le SQL Editor de votre projet Supabase.
-- Ajoute les champs pour la carte des membres (opt-in par ville).

alter table public.members add column if not exists show_on_map boolean not null default false;
alter table public.members add column if not exists latitude double precision;
alter table public.members add column if not exists longitude double precision;
