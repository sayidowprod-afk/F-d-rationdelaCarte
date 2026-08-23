import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const associationName =
    process.env.NEXT_PUBLIC_ASSOCIATION_NAME || "Association de collectionneurs";

  return (
    <header className="bg-brand-blue text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <Image
            src="/brand/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span>{associationName}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/actus" className="text-white/85 hover:text-white">
            Actus
          </Link>
          {user ? (
            <>
              <Link href="/membres" className="text-white/85 hover:text-white">
                Espace membre
              </Link>
              <Link href="/membres/annuaire" className="text-white/85 hover:text-white">
                Annuaire
              </Link>
            </>
          ) : (
            <>
              <Link href="/adhesion" className="text-white/85 hover:text-white">
                Adhérer
              </Link>
              <Link
                href="/connexion"
                className="rounded-full bg-brand-red px-4 py-1.5 font-medium text-white hover:opacity-90"
              >
                Connexion
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
