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
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {associationName}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/actus" className="hover:underline">
            Actus
          </Link>
          {user ? (
            <>
              <Link href="/membres" className="hover:underline">
                Espace membre
              </Link>
              <Link href="/membres/annuaire" className="hover:underline">
                Annuaire
              </Link>
            </>
          ) : (
            <>
              <Link href="/adhesion" className="hover:underline">
                Adhérer
              </Link>
              <Link
                href="/connexion"
                className="rounded-full bg-foreground px-4 py-1.5 text-background hover:opacity-90"
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
