-- À exécuter dans le SQL Editor de votre projet Supabase pour mettre à jour
-- la table members existante : remplace "adresse" par "ville" + "date de
-- naissance", ces infos étant désormais renseignées depuis le profil membre
-- plutôt qu'à l'adhésion.

alter table public.members drop column if exists address;
alter table public.members add column if not exists city text;
alter table public.members add column if not exists birth_date date;
