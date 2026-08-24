"use client";

import { useActionState } from "react";
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
      <Field label="Pseudo *" name="pseudo" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" name="first_name" />
        <Field label="Nom" name="last_name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email *" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          Présentez-vous (thèmes de collection, etc.)
        </label>
        <textarea
          name="bio"
          rows={3}
          className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
        />
      </div>
      <Field
        label="Mot de passe (8 caractères min.) *"
        name="password"
        type="password"
        required
      />

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-red px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Création en cours..." : "Créer mon compte"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
      />
    </div>
  );
}
