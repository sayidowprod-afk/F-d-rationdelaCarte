import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { isMembershipActive, memberDisplayName, type Member } from "@/lib/types";
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

  if (!member || !isMembershipActive(member)) {
    return (
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">
          Ma carte de membre
        </h1>
        <div className="card text-sm text-zinc-500">
          Votre carte sera disponible dès que votre adhésion sera validée par
          le bureau.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12 print:py-0">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight print:hidden">
        Ma carte de membre
      </h1>

      <div className="mx-auto aspect-[1.586/1] w-full max-w-sm rounded-2xl bg-gradient-to-br from-brand-blue to-[#12295c] p-6 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <Image src="/brand/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
          <p className="text-xs uppercase tracking-wider text-white/70">
            {associationName}
          </p>
        </div>
        <p className="mt-6 text-lg font-semibold">
          {memberDisplayName(member)}
        </p>
        <p className="mt-4 text-xs text-white/60">
          Valide jusqu&apos;au{" "}
          {new Date(member.membership_expires_at!).toLocaleDateString("fr-FR")}
        </p>
      </div>

      <PrintButton />
    </main>
  );
}
