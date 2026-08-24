import { createClient } from "@/lib/supabase/server";
import { todayIso, type Member } from "@/lib/types";
import MembersMapLoader from "./MembersMapLoader";

export default async function CarteMembresPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("show_on_map", true)
    .not("latitude", "is", null)
    .not("longitude", "is", null)
    .gte("membership_expires_at", todayIso());

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        Carte des membres
      </h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        Localisation (par ville) des membres qui ont choisi d&apos;apparaître
        sur la carte. Vous pouvez activer votre affichage depuis{" "}
        <a href="/membres/profil" className="underline">
          votre profil
        </a>
        .
      </p>
      {members && members.length > 0 ? (
        <MembersMapLoader members={members as Member[]} />
      ) : (
        <div className="card text-center text-sm text-zinc-500">
          Aucun membre ne s&apos;affiche sur la carte pour l&apos;instant.
        </div>
      )}
    </main>
  );
}
