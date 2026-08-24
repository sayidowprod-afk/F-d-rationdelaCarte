import { createClient } from "@/lib/supabase/server";
import { memberDisplayName, todayIso, type Member } from "@/lib/types";

export default async function AnnuairePage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .gte("membership_expires_at", todayIso())
    .order("pseudo", { ascending: true });

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Annuaire des membres
      </h1>
      {members && members.length > 0 ? (
        <ul className="space-y-3">
          {(members as Member[]).map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-lg border border-black/10 p-4 dark:border-white/10"
            >
              <div>
                <p className="font-medium">
                  {memberDisplayName(m)}
                  <span className="ml-2 text-xs text-zinc-500">
                    #{m.membership_number}
                  </span>
                </p>
                {m.bio && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {m.bio}
                  </p>
                )}
              </div>
              {m.memorabilius_url && (
                <a
                  href={m.memorabilius_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-sm hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.06]"
                >
                  Voir la galerie
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500">Aucun membre actif pour l&apos;instant.</p>
      )}
    </main>
  );
}
