import Image from "next/image";
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
    <main className="flex-1">
      <section className="hero-pattern relative overflow-hidden bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <Image
            src="/brand/logo.png"
            alt=""
            width={96}
            height={96}
            className="h-20 w-20 sm:h-24 sm:w-24"
            priority
          />
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            {associationName}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/85 sm:text-lg">
            Une communauté de passionné·e·s de cartes de collection (sport et
            autres thèmes). Rejoignez-nous pour échanger, exposer vos
            collections et participer à nos événements.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/adhesion" className="btn-primary">
              Créer un compte
            </Link>
            <Link
              href="/actus"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Voir les actus
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Pourquoi nous rejoindre ?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Feature
            title="Échangez"
            desc="Retrouvez d'autres collectionneurs, échangez vos cartes et partagez vos trouvailles."
          />
          <Feature
            title="Exposez"
            desc="Chaque membre a un profil avec un lien vers sa galerie Memorabilius."
          />
          <Feature
            title="Participez"
            desc="Bourses aux cartes, expositions, réunions : suivez toute l'actualité de l'association."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dernières actualités</h2>
          <Link href="/actus" className="text-sm text-zinc-500 hover:underline">
            Tout voir
          </Link>
        </div>
        {news && news.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-3">
            {(news as NewsItem[]).map((item) => (
              <li key={item.id} className="card card-hover">
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
          <div className="card text-center text-sm text-zinc-500">
            Aucune actualité pour le moment.
          </div>
        )}
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10">
        <span className="h-3 w-3 rounded-full bg-brand-red" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
    </div>
  );
}
