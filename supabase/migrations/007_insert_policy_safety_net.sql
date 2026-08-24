-- À exécuter dans le SQL Editor de votre projet Supabase.
-- Réintroduit une politique d'insertion en filet de sécurité : le
-- déclencheur (migration 006) crée normalement le profil automatiquement,
-- mais les comptes créés avant sa mise en place n'ont pas de ligne dans
-- members. Cette politique permet au site de la créer lui-même si besoin
-- (auto-réparation, ex: page profil).

drop policy if exists "members_insert_self" on public.members;
create policy "members_insert_self" on public.members
  for insert with check (auth.uid() = id);
