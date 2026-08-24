-- À exécuter dans le SQL Editor de votre projet Supabase.
-- Remplace le statut pending/active/expired par une date d'expiration
-- d'adhésion : un compte peut désormais exister sans être adhérent (la
-- colonne reste vide tant que la cotisation n'a pas été réglée et
-- enregistrée par un admin). L'adhésion est active tant que
-- membership_expires_at >= aujourd'hui, ce qui permet de gérer le
-- renouvellement annuel.

alter table public.members add column if not exists membership_expires_at date;

drop policy if exists "members_select_active" on public.members;
create policy "members_select_active" on public.members
  for select using (
    (membership_expires_at is not null and membership_expires_at >= current_date)
    or auth.uid() = id
  );

alter table public.members drop column if exists status;
drop type if exists membership_status;
