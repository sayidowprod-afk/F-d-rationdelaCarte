import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isMembershipActive, memberDisplayName, type Member, type NewsItem } from "@/lib/types";
import { setMembershipStart, renewMembershipOneYear, deleteNews } from "./actions";
import NewsForm from "./NewsForm";

function membershipStartDate(expiresAt: string | null) {
  if (!expiresAt) return "";
  const d = new Date(expiresAt);
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

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
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Administration</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Membres</h2>
        <ul className="space-y-3">
          {(members as Member[] | null)?.map((m) => (
            <li
              key={m.id}
              className="card flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">
                  {memberDisplayName(m)}{" "}
                  <span className="text-xs text-zinc-500">({m.email})</span>
                </p>
                <span
                  className={
                    "mt-1 inline-block rounded-full px-2 py-0.5 text-xs " +
                    (m.membership_expires_at
                      ? isMembershipActive(m)
                        ? "bg-green-600/10 text-green-700 dark:text-green-400"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      : "bg-zinc-500/10 text-zinc-500")
                  }
                >
                  {m.membership_expires_at
                    ? isMembershipActive(m)
                      ? `Valide jusqu'au ${new Date(m.membership_expires_at).toLocaleDateString("fr-FR")}`
                      : `Expirée depuis le ${new Date(m.membership_expires_at).toLocaleDateString("fr-FR")}`
                    : "Pas encore adhérent·e"}
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <form
                  action={async (fd: FormData) => {
                    "use server";
                    await setMembershipStart(m.id, String(fd.get("start_date") || ""));
                  }}
                  className="flex items-center gap-2"
                >
                  <label className="text-xs text-zinc-500" htmlFor={`start-${m.id}`}>
                    Début d&apos;adhésion
                  </label>
                  <input
                    id={`start-${m.id}`}
                    type="date"
                    name="start_date"
                    defaultValue={membershipStartDate(m.membership_expires_at)}
                    className="field-input py-1 text-xs"
                  />
                  <button className="btn-secondary px-3 py-1 text-xs">Enregistrer</button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await renewMembershipOneYear(m.id, m.membership_expires_at);
                  }}
                >
                  <button className="btn-primary px-3 py-1 text-xs">
                    Renouveler 1 an à partir d&apos;aujourd&apos;hui
                  </button>
                </form>
              </div>
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
              className="card flex items-center justify-between py-3 text-sm"
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
