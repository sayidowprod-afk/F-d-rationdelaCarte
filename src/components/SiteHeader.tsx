import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import MobileNav from "./MobileNav";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const associationName =
    process.env.NEXT_PUBLIC_ASSOCIATION_NAME || "Association de collectionneurs";

  return (
    <header className="relative z-30 bg-brand-blue text-white shadow-md">
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

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/actus" className="text-white/85 transition-colors hover:text-white">
            Actus
          </Link>
          {user ? (
            <>
              <Link
                href="/membres"
                className="text-white/85 transition-colors hover:text-white"
              >
                Espace membre
              </Link>
              <Link
                href="/membres/annuaire"
                className="text-white/85 transition-colors hover:text-white"
              >
                Annuaire
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/adhesion"
                className="text-white/85 transition-colors hover:text-white"
              >
                Créer un compte
              </Link>
              <Link href="/connexion" className="btn-primary">
                Connexion
              </Link>
            </>
          )}
        </nav>

        <MobileNav isLoggedIn={!!user} />
      </div>
    </header>
  );
}
