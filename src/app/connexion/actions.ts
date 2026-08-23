"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ConnexionState = {
  error?: string;
};

export async function submitConnexion(
  _prevState: ConnexionState,
  formData: FormData
): Promise<ConnexionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/membres");

  if (!email || !password) {
    return { error: "Merci de renseigner votre email et mot de passe." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email ou mot de passe incorrect." };
  }

  redirect(next);
}
