import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/lib/types";
import PrintButton from "./PrintButton";

export default async function CartePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user!.id)
    .single<Member>();

  const associationName =
    process.env.NEXT_PUBLIC_ASSOCIATION_NAME || "Association de collectionneurs";

  if (!member || member.status !== "active") {
    return (
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">
          Ma carte de membre
        </h1>
        <p className="text-sm text-zinc-500">
          Votre carte sera disponible dès que votre adhésion sera validée par
          le bureau.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12 print:py-0">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight print:hidden">
        Ma carte de membre
      </h1>

      <div className="mx-auto aspect-[1.586/1] w-full max-w-sm rounded-2xl border border-black/10 bg-gradient-to-br from-zinc-900 to-zinc-700 p-6 text-white shadow-lg dark:border-white/10">
        <p className="text-xs uppercase tracking-wider text-zinc-300">
          {associationName}
        </p>
        <p className="mt-6 text-lg font-semibold">
          {member.first_name} {member.last_name}
        </p>
        <p className="text-sm text-zinc-300">
          Membre n° {member.membership_number}
        </p>
        <p className="mt-4 text-xs text-zinc-400">
          Adhérent·e depuis le{" "}
          {new Date(member.joined_at).toLocaleDateString("fr-FR")}
        </p>
      </div>

      <PrintButton />
    </main>
  );
}
