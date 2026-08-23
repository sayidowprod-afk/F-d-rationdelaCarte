import ConnexionForm from "./ConnexionForm";

export default async function ConnexionPage(props: PageProps<"/connexion">) {
  const searchParams = await props.searchParams;
  const next = typeof searchParams.next === "string" ? searchParams.next : "/membres";

  return (
    <main className="mx-auto w-full max-w-sm flex-1 px-4 py-16">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Connexion</h1>
      <ConnexionForm next={next} />
      <p className="mt-6 text-center text-sm text-zinc-500">
        Pas encore membre ?{" "}
        <a href="/adhesion" className="underline">
          Demander l&apos;adhésion
        </a>
      </p>
    </main>
  );
}
