-- À exécuter dans le SQL Editor de votre projet Supabase : ajoute un pseudo
-- obligatoire et unique, et rend prénom/nom facultatifs.

alter table public.members add column if not exists pseudo text;
update public.members set pseudo = split_part(email, '@', 1) where pseudo is null;
alter table public.members alter column pseudo set not null;
alter table public.members add constraint members_pseudo_unique unique (pseudo);

alter table public.members alter column first_name drop not null;
alter table public.members alter column last_name drop not null;
