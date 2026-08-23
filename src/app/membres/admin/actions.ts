"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MembershipStatus } from "@/lib/types";

export async function setMemberStatus(memberId: string, status: MembershipStatus) {
  const supabase = await createClient();
  await supabase.from("members").update({ status }).eq("id", memberId);
  revalidatePath("/membres/admin");
  revalidatePath("/membres/annuaire");
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
