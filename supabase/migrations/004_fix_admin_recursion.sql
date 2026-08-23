-- À exécuter dans le SQL Editor de votre projet Supabase.
-- Corrige "infinite recursion detected in policy for relation members" :
-- les règles qui vérifiaient is_admin en interrogeant la table members
-- déclenchaient leurs propres règles en boucle. On passe par une fonction
-- security definer qui contourne RLS pour cette vérification précise.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.members where id = auth.uid()), false);
$$;

drop policy if exists "members_admin_all" on public.members;
create policy "members_admin_all" on public.members
  for all using (public.is_admin());

drop policy if exists "news_admin_write" on public.news;
create policy "news_admin_write" on public.news
  for insert with check (public.is_admin());

drop policy if exists "news_admin_update" on public.news;
create policy "news_admin_update" on public.news
  for update using (public.is_admin());

drop policy if exists "news_admin_delete" on public.news;
create policy "news_admin_delete" on public.news
  for delete using (public.is_admin());
