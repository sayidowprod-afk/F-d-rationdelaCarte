import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/lib/types";

export default async function ActusPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Actualités & événements
      </h1>
      {news && news.length > 0 ? (
        <ul className="space-y-6">
          {(news as NewsItem[]).map((item) => (
            <li key={item.id} className="card">
              <p className="text-xs text-zinc-500">
                {new Date(item.event_date || item.created_at).toLocaleDateString(
                  "fr-FR",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </p>
              <h2 className="mt-1 text-lg font-medium">{item.title}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card text-center text-sm text-zinc-500">
          Aucune actualité publiée pour le moment.
        </div>
      )}
    </main>
  );
}
