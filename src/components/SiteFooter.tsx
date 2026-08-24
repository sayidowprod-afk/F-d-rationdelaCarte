import Image from "next/image";

export default function SiteFooter() {
  const associationName =
    process.env.NEXT_PUBLIC_ASSOCIATION_NAME || "Association de collectionneurs";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-zinc-500 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/brand/icon.png" alt="" width={20} height={20} className="h-5 w-5" />
          <span>
            {associationName} · {year}
          </span>
        </div>
        <p>Association de passionné·e·s de cartes de collection.</p>
      </div>
    </footer>
  );
}
