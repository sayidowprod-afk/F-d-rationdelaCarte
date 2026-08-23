import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/lib/types";
import ProfilForm from "./ProfilForm";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user!.id)
    .single<Member>();

  if (!member) return null;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Mon profil</h1>
      <ProfilForm member={member} />
    </main>
  );
}
