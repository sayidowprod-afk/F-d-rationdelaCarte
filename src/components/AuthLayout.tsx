import Image from "next/image";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12">
      <div className="grid w-full overflow-hidden rounded-2xl border border-border-subtle shadow-sm md:grid-cols-2">
        <div className="hero-pattern hidden flex-col justify-center bg-gradient-to-br from-brand-blue to-brand-blue-dark p-10 text-white md:flex">
          <Image src="/brand/icon.png" alt="" width={56} height={56} className="h-14 w-14" />
          <p className="mt-6 text-xl font-semibold leading-snug">
            Rejoignez la communauté des passionné·e·s de cartes de collection.
          </p>
        </div>
        <div className="bg-background p-8 sm:p-10">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
