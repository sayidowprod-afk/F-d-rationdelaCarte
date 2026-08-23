import AdhesionForm from "./AdhesionForm";

export default function AdhesionPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        Devenir membre
      </h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        Remplissez ce formulaire pour demander votre adhésion. Votre
        inscription sera validée par le bureau de l&apos;association
        (l&apos;adhésion se règle en dehors du site).
      </p>
      <AdhesionForm />
    </main>
  );
}
