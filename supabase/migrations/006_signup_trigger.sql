-- À exécuter dans le SQL Editor de votre projet Supabase.
-- Avec la confirmation d'email activée, l'utilisateur n'a pas de session
-- juste après signUp() : impossible pour le site d'insérer sa ligne dans
-- members (RLS). On délègue donc la création du profil à un déclencheur
-- côté base de données, qui s'exécute dès la création du compte (avant
-- même la confirmation), avec les infos passées en métadonnées du signUp.

create or replace function public.handle_new_member()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.members (id, pseudo, first_name, last_name, email, phone, bio)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'pseudo', split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data->>'first_name', ''),
    nullif(new.raw_user_meta_data->>'last_name', ''),
    new.email,
    nullif(new.raw_user_meta_data->>'phone', ''),
    nullif(new.raw_user_meta_data->>'bio', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_member();

-- Remarque : l'insertion normale se fait désormais via ce déclencheur.
-- La politique members_insert_self (migration 007) reste néanmoins en place
-- comme filet de sécurité pour les comptes créés avant ce déclencheur — ne
-- pas la supprimer ici.
