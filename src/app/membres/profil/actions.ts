"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfilState = {
  error?: string;
  success?: boolean;
};

export async function updateProfil(
  _prevState: ProfilState,
  formData: FormData
): Promise<ProfilState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Non connecté." };
  }

  const pseudo = String(formData.get("pseudo") || "").trim();
  if (!pseudo) {
    return { error: "Le pseudo est obligatoire." };
  }

  const { error } = await supabase
    .from("members")
    .update({
      pseudo,
      first_name: String(formData.get("first_name") || "").trim() || null,
      last_name: String(formData.get("last_name") || "").trim() || null,
      phone: String(formData.get("phone") || "").trim() || null,
      city: String(formData.get("city") || "").trim() || null,
      birth_date: String(formData.get("birth_date") || "").trim() || null,
      bio: String(formData.get("bio") || "").trim() || null,
      memorabilius_pseudo:
        String(formData.get("memorabilius_pseudo") || "").trim() || null,
      memorabilius_url:
        String(formData.get("memorabilius_url") || "").trim() || null,
    })
    .eq("id", user.id);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Ce pseudo est déjà pris, merci d'en choisir un autre."
          : error.message,
    };
  }

  revalidatePath("/membres");
  revalidatePath("/membres/annuaire");
  return { success: true };
}
