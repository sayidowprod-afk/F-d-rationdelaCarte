import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/lib/types";

export default async function Home() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const associationName =
    process.env.NEXT_PUBLIC_ASSOCIATION_NAME || "Notre association";

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {associationName}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Une communauté de passionné·e·s de cartes de collection (sport et
          autres thèmes). Rejoignez-nous pour échanger, exposer vos
          collections et participer à nos événements.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/adhesion"
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Devenir membre
          </Link>
          <Link
            href="/actus"
            className="rounded-full border border-black/10 px-6 py-2.5 text-sm font-medium hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.06]"
          >
            Voir les actus
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dernières actualités</h2>
          <Link href="/actus" className="text-sm text-zinc-500 hover:underline">
            Tout voir
          </Link>
        </div>
        {news && news.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-3">
            {(news as NewsItem[]).map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <p className="text-xs text-zinc-500">
                  {new Date(item.event_date || item.created_at).toLocaleDateString(
                    "fr-FR"
                  )}
                </p>
                <h3 className="mt-1 font-medium">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Aucune actualité pour le moment.
          </p>
        )}
      </section>
    </main>
  );
}
