import AdhesionForm from "./AdhesionForm";

export default function AdhesionPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        Créer un compte
      </h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        Créez votre compte librement, sans engagement. Il vous donne accès à
        votre espace membre ; l&apos;adhésion (cotisation annuelle) se règle
        ensuite en dehors du site et est activée par le bureau une fois
        réglée, pour un an renouvelable.
      </p>
      <AdhesionForm />
    </main>
  );
}
