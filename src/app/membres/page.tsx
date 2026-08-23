import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/lib/types";
import { signOut } from "./actions";

const statusLabel: Record<string, string> = {
  pending: "En attente de validation",
  active: "Actif",
  expired: "Expiré",
};

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
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bonjour {member?.first_name || member?.pseudo || ""}
        </h1>
        <form action={signOut}>
          <button className="text-sm text-zinc-500 hover:underline">
            Se déconnecter
          </button>
        </form>
      </div>

      {member?.status !== "active" && (
        <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          Statut de votre adhésion :{" "}
          <strong>{statusLabel[member?.status || "pending"]}</strong>. Certaines
          fonctionnalités (annuaire, carte de membre) seront disponibles une
          fois votre adhésion validée par le bureau.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card href="/membres/annuaire" title="Annuaire" desc="Voir les membres" />
        <Card href="/membres/carte" title="Ma carte" desc="Carte de membre" />
        <Card href="/membres/profil" title="Mon profil" desc="Modifier mes infos" />
      </div>

      {member?.is_admin && (
        <div className="mt-8">
          <Link
            href="/membres/admin"
            className="inline-block rounded-full border border-black/10 px-5 py-2 text-sm hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.06]"
          >
            Administration
          </Link>
        </div>
      )}
    </main>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-black/10 p-5 hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.06]"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-zinc-500">{desc}</p>
    </Link>
  );
}
