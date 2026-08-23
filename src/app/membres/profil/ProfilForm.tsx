"use client";

import { useActionState } from "react";
import type { Member } from "@/lib/types";
import { updateProfil, type ProfilState } from "./actions";

const initialState: ProfilState = {};

export default function ProfilForm({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState(updateProfil, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" name="first_name" defaultValue={member.first_name} required />
        <Field label="Nom" name="last_name" defaultValue={member.last_name} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Téléphone" name="phone" type="tel" defaultValue={member.phone ?? ""} />
        <Field label="Ville" name="city" defaultValue={member.city ?? ""} />
      </div>
      <Field
        label="Date de naissance"
        name="birth_date"
        type="date"
        defaultValue={member.birth_date ?? ""}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Pseudo Memorabilius"
          name="memorabilius_pseudo"
          defaultValue={member.memorabilius_pseudo ?? ""}
        />
        <Field
          label="Lien galerie Memorabilius"
          name="memorabilius_url"
          type="url"
          defaultValue={member.memorabilius_url ?? ""}
          placeholder="https://www.memorabilius.fr/galerie/..."
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Présentation</label>
        <textarea
          name="bio"
          rows={3}
          defaultValue={member.bio ?? ""}
          className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      {state.success && (
        <p className="text-sm text-green-700 dark:text-green-400">
          Profil mis à jour.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Enregistrement..." : "Enregistrer"}
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
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
      />
    </div>
  );
}
