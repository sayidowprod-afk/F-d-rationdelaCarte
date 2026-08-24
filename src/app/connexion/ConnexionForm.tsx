"use client";

import { useActionState } from "react";
import { FormField } from "@/components/FormField";
import { submitConnexion, type ConnexionState } from "./actions";

const initialState: ConnexionState = {};

export default function ConnexionForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(submitConnexion, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <FormField label="Email" name="email" type="email" required />
      <FormField label="Mot de passe" name="password" type="password" required />

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
