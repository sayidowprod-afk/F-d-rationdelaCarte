"use client";

import { useActionState } from "react";
import { FormField, FormTextArea } from "@/components/FormField";
import type { Member } from "@/lib/types";
import { updateProfil, type ProfilState } from "./actions";

const initialState: ProfilState = {};

export default function ProfilForm({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState(updateProfil, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <FormField label="Pseudo" name="pseudo" defaultValue={member.pseudo} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Prénom" name="first_name" defaultValue={member.first_name ?? ""} />
        <FormField label="Nom" name="last_name" defaultValue={member.last_name ?? ""} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Téléphone"
          name="phone"
          type="tel"
          defaultValue={member.phone ?? ""}
        />
        <FormField label="Ville" name="city" defaultValue={member.city ?? ""} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="show_on_map"
          defaultChecked={member.show_on_map}
          className="h-4 w-4 accent-brand-red"
        />
        M&apos;afficher sur la carte des membres (ville uniquement, visible
        par les autres membres)
      </label>
      <FormField
        label="Date de naissance"
        name="birth_date"
        type="date"
        defaultValue={member.birth_date ?? ""}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Pseudo Memorabilius"
          name="memorabilius_pseudo"
          defaultValue={member.memorabilius_pseudo ?? ""}
        />
        <FormField
          label="Lien galerie Memorabilius"
          name="memorabilius_url"
          type="url"
          defaultValue={member.memorabilius_url ?? ""}
          placeholder="https://www.memorabilius.fr/galerie/..."
        />
      </div>
      <FormTextArea label="Présentation" name="bio" defaultValue={member.bio ?? ""} />

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      {state.success && (
        <p className="text-sm text-green-700 dark:text-green-400">
          Profil mis à jour.
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
