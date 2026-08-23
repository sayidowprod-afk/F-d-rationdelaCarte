"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mx-auto mt-6 block rounded-full border border-black/10 px-6 py-2 text-sm hover:bg-black/[.03] print:hidden dark:border-white/15 dark:hover:bg-white/[.06]"
    >
      Imprimer ma carte
    </button>
  );
}
