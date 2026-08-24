"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-20 bg-brand-blue px-4 pb-4 shadow-lg">
          <nav className="flex flex-col gap-1 pt-2 text-sm">
            <MobileLink href="/actus" onClick={() => setOpen(false)}>
              Actus
            </MobileLink>
            {isLoggedIn ? (
              <>
                <MobileLink href="/membres" onClick={() => setOpen(false)}>
                  Espace membre
                </MobileLink>
                <MobileLink href="/membres/annuaire" onClick={() => setOpen(false)}>
                  Annuaire
                </MobileLink>
              </>
            ) : (
              <>
                <MobileLink href="/adhesion" onClick={() => setOpen(false)}>
                  Créer un compte
                </MobileLink>
                <MobileLink href="/connexion" onClick={() => setOpen(false)}>
                  Connexion
                </MobileLink>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
