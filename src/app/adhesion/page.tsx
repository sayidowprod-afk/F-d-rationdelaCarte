import AuthLayout from "@/components/AuthLayout";
import AdhesionForm from "./AdhesionForm";

export default function AdhesionPage() {
  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Créez votre compte librement, sans engagement. Il vous donne accès à votre espace membre ; l'adhésion (cotisation annuelle) se règle ensuite en dehors du site et est activée par le bureau une fois réglée, pour un an renouvelable."
    >
      <AdhesionForm />
    </AuthLayout>
  );
}
