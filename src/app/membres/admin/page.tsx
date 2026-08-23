import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Member, NewsItem } from "@/lib/types";
import { setMemberStatus, deleteNews } from "./actions";
import NewsForm from "./NewsForm";

const statusLabel: Record<string, string> = {
  pending: "En attente",
  active: "Actif",
  expired: "Expiré",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: me } = await supabase
    .from("members")
    .select("is_admin")
    .eq("id", user!.id)
    .single<{ is_admin: boolean }>();

  if (!me?.is_admin) {
    redirect("/membres");
  }

  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Administration</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Membres</h2>
        <ul className="space-y-2">
          {(members as Member[] | null)?.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-lg border border-black/10 p-3 text-sm dark:border-white/10"
            >
              <div>
                <p className="font-medium">
                  {m.first_name} {m.last_name}{" "}
                  <span className="text-xs text-zinc-500">({m.email})</span>
                </p>
                <p className="text-xs text-zinc-500">{statusLabel[m.status]}</p>
              </div>
              <form
                action={async (fd: FormData) => {
                  "use server";
                  await setMemberStatus(
                    m.id,
                    fd.get("status") as "pending" | "active" | "expired"
                  );
                }}
                className="flex items-center gap-2"
              >
                <select
                  name="status"
                  defaultValue={m.status}
                  className="rounded-md border border-black/10 bg-transparent px-2 py-1 text-xs dark:border-white/15"
                >
                  <option value="pending">En attente</option>
                  <option value="active">Actif</option>
                  <option value="expired">Expiré</option>
                </select>
                <button className="rounded-full border border-black/10 px-3 py-1 text-xs hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.06]">
                  Mettre à jour
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Actualités</h2>
        <NewsForm />
        <ul className="mt-4 space-y-2">
          {(news as NewsItem[] | null)?.map((n) => (
            <li
              key={n.id}
              className="flex items-center justify-between rounded-lg border border-black/10 p-3 text-sm dark:border-white/10"
            >
              <span>{n.title}</span>
              <form
                action={async () => {
                  "use server";
                  await deleteNews(n.id);
                }}
              >
                <button className="text-xs text-red-600 hover:underline dark:text-red-400">
                  Supprimer
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
