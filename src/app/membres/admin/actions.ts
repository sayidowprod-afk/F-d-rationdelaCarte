"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { todayIso } from "@/lib/types";

export async function setMembershipExpiry(memberId: string, expiresAt: string | null) {
  const supabase = await createClient();
  await supabase
    .from("members")
    .update({ membership_expires_at: expiresAt || null })
    .eq("id", memberId);
  revalidatePath("/membres/admin");
  revalidatePath("/membres/annuaire");
  revalidatePath("/membres");
}

export async function renewMembershipOneYear(memberId: string, currentExpiresAt: string | null) {
  const base = currentExpiresAt && currentExpiresAt > todayIso() ? currentExpiresAt : todayIso();
  await setMembershipExpiry(memberId, addOneYear(base));
}

// L'admin saisit la date à laquelle l'adhérent a réglé sa cotisation ;
// l'expiration (+1 an) est calculée automatiquement.
export async function setMembershipStart(memberId: string, startDate: string) {
  if (!startDate) {
    await setMembershipExpiry(memberId, null);
    return;
  }
  await setMembershipExpiry(memberId, addOneYear(startDate));
}

function addOneYear(dateStr: string) {
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export type NewsState = {
  error?: string;
};

export async function createNews(
  _prevState: NewsState,
  formData: FormData
): Promise<NewsState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const eventDate = String(formData.get("event_date") || "").trim();

  if (!title || !content) {
    return { error: "Titre et contenu requis." };
  }

  const { error } = await supabase.from("news").insert({
    title,
    content,
    event_date: eventDate || null,
    author_id: user?.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/actus");
  revalidatePath("/membres/admin");
  return {};
}

export async function deleteNews(newsId: string) {
  const supabase = await createClient();
  await supabase.from("news").delete().eq("id", newsId);
  revalidatePath("/");
  revalidatePath("/actus");
  revalidatePath("/membres/admin");
}
