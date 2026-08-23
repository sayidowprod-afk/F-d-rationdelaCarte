"use server";

import { createClient } from "@/lib/supabase/server";

export type AdhesionState = {
  error?: string;
  success?: boolean;
};

export async function submitAdhesion(
  _prevState: AdhesionState,
  formData: FormData
): Promise<AdhesionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const bio = String(formData.get("bio") || "").trim();

  if (!email || !password || !firstName || !lastName) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }
  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const supabase = await createClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !signUpData.user) {
    return {
      error:
        signUpError?.message === "User already registered"
          ? "Un compte existe déjà avec cet email."
          : signUpError?.message || "Impossible de créer le compte.",
    };
  }

  const { error: insertError } = await supabase.from("members").insert({
    id: signUpData.user.id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    bio: bio || null,
    status: "pending",
  });

  if (insertError) {
    return { error: "Compte créé mais erreur lors de l'enregistrement du profil : " + insertError.message };
  }

  return { success: true };
}
