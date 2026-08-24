"use client";

import { useActionState } from "react";
import { FormField, FormTextArea } from "@/components/FormField";
import { submitAdhesion, type AdhesionState } from "./actions";

const initialState: AdhesionState = {};

export default function AdhesionForm() {
  const [state, formAction, pending] = useActionState(submitAdhesion, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-600/30 bg-green-600/5 p-6 text-sm">
        <p className="font-medium text-green-700 dark:text-green-400">
          Votre compte a bien été créé !
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Vérifiez votre boîte mail et cliquez sur le lien de confirmation
          pour activer votre compte, puis{" "}
          <a href="/connexion" className="underline">
            connectez-vous
          </a>
          . Pour activer votre adhésion, réglez votre cotisation auprès du
          bureau.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <FormField label="Pseudo *" name="pseudo" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Prénom" name="first_name" />
        <FormField label="Nom" name="last_name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email *" name="email" type="email" required />
        <FormField label="Téléphone" name="phone" type="tel" />
      </div>
      <FormTextArea label="Présentez-vous (thèmes de collection, etc.)" name="bio" />
      <FormField
        label="Mot de passe (8 caractères min.) *"
        name="password"
        type="password"
        required
      />

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Création en cours..." : "Créer mon compte"}
      </button>
    </form>
  );
}
