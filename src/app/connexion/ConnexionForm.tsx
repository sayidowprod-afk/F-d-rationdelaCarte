"use client";

import { useActionState } from "react";
import { submitConnexion, type ConnexionState } from "./actions";

const initialState: ConnexionState = {};

export default function ConnexionForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(submitConnexion, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
