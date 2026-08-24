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
  const pseudo = String(formData.get("pseudo") || "").trim();
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const bio = String(formData.get("bio") || "").trim();

  if (!email || !password || !pseudo) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }
  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const supabase = await createClient();

  // Le profil (table members) est créé côté base par un déclencheur sur
  // auth.users, à partir de ces métadonnées : ça fonctionne même si la
  // confirmation d'email est activée et qu'aucune session n'existe encore.
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        pseudo,
        first_name: firstName,
        last_name: lastName,
        phone,
        bio,
      },
    },
  });

  if (signUpError || !signUpData.user) {
    const message = signUpError?.message || "";
    return {
      error: message.includes("already registered")
        ? "Un compte existe déjà avec cet email."
        : message.includes("duplicate key") || message.includes("members_pseudo_unique")
          ? "Ce pseudo est déjà pris, merci d'en choisir un autre."
          : message || "Impossible de créer le compte.",
    };
  }

  return { success: true };
}
