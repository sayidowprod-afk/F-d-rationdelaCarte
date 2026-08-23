"use client";

import { useActionState } from "react";
import { createNews, type NewsState } from "./actions";

const initialState: NewsState = {};

export default function NewsForm() {
  const [state, formAction, pending] = useActionState(createNews, initialState);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
      <input
        name="title"
        placeholder="Titre"
        required
        className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
      />
      <textarea
        name="content"
        placeholder="Contenu"
        rows={3}
        required
        className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
      />
      <input
        name="event_date"
        type="date"
        className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
      />
      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Publication..." : "Publier"}
      </button>
    </form>
  );
}
