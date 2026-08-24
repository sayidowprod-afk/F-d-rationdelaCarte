import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isMembershipActive, type Member } from "@/lib/types";
import { signOut } from "./actions";

export default async function MembresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user!.id)
    .single<Member>();

  return (
    <main className="flex-1">
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-10">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Bonjour {member?.first_name || member?.pseudo || ""}
          </h1>
          <form action={signOut}>
            <button className="text-sm text-white/80 hover:text-white hover:underline">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {member && !isMembershipActive(member) && (
          <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
            {member.membership_expires_at ? (
              <>
                Votre adhésion a expiré le{" "}
                <strong>
                  {new Date(member.membership_expires_at).toLocaleDateString("fr-FR")}
                </strong>
                .
              </>
            ) : (
              <>Vous n&apos;êtes pas encore adhérent·e.</>
            )}{" "}
            Contactez le bureau pour régler votre cotisation. Certaines
            fonctionnalités (annuaire, carte de membre) seront disponibles une
            fois votre adhésion active.
          </div>
        )}
        {member && isMembershipActive(member) && (
          <div className="mb-8 rounded-lg border border-green-600/30 bg-green-600/5 p-4 text-sm">
            Votre adhésion est valide jusqu&apos;au{" "}
            <strong>
              {new Date(member.membership_expires_at!).toLocaleDateString("fr-FR")}
            </strong>
            .
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <Card href="/membres/annuaire" title="Annuaire" desc="Voir les membres" />
          <Card href="/membres/carte" title="Ma carte" desc="Carte de membre" />
          <Card href="/membres/profil" title="Mon profil" desc="Modifier mes infos" />
        </div>

        {member?.is_admin && (
          <div className="mt-8">
            <Link href="/membres/admin" className="btn-secondary">
              Administration
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="card card-hover">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-zinc-500">{desc}</p>
    </Link>
  );
}
