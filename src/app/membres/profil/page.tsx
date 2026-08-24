import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/lib/types";
import ProfilForm from "./ProfilForm";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user!.id)
    .single<Member>();

  // Filet de sécurité : un compte créé avant la mise en place du
  // déclencheur automatique peut ne pas avoir de ligne. On la crée ici.
  if (!member) {
    const { data: created } = await supabase
      .from("members")
      .insert({
        id: user!.id,
        pseudo: user!.email?.split("@")[0] || `membre-${user!.id.slice(0, 8)}`,
        email: user!.email!,
      })
      .select("*")
      .single<Member>();
    member = created ?? null;
  }

  if (!member) {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">Mon profil</h1>
        <div className="card text-sm text-zinc-500">
          Impossible de charger votre profil pour le moment. Contactez le
          bureau si le problème persiste.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Mon profil</h1>
      <div className="card">
        <ProfilForm member={member} />
      </div>
    </main>
  );
}
