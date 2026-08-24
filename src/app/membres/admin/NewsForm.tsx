"use client";

import { useActionState } from "react";
import { createNews, type NewsState } from "./actions";

const initialState: NewsState = {};

export default function NewsForm() {
  const [state, formAction, pending] = useActionState(createNews, initialState);

  return (
    <form action={formAction} className="card space-y-3">
      <input name="title" placeholder="Titre" required className="field-input" />
      <textarea
        name="content"
        placeholder="Contenu"
        rows={3}
        required
        className="field-input"
      />
      <input name="event_date" type="date" className="field-input" />
      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary"
      >
        {pending ? "Publication..." : "Publier"}
      </button>
    </form>
  );
}
