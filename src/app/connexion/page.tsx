import AuthLayout from "@/components/AuthLayout";
import ConnexionForm from "./ConnexionForm";

export default async function ConnexionPage(props: PageProps<"/connexion">) {
  const searchParams = await props.searchParams;
  const next = typeof searchParams.next === "string" ? searchParams.next : "/membres";

  return (
    <AuthLayout title="Connexion" subtitle="Accédez à votre espace membre.">
      <ConnexionForm next={next} />
      <p className="mt-6 text-center text-sm text-zinc-500">
        Pas encore de compte ?{" "}
        <a href="/adhesion" className="underline">
          Créez-en un
        </a>
      </p>
    </AuthLayout>
  );
}
