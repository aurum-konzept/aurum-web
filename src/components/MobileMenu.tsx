"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type MobileMenuItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  items: MobileMenuItem[];
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-white transition hover:border-amber-400/40"
      >
        <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-0 right-0 top-20 z-50 px-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/95 p-4 shadow-2xl">
              <nav className="flex flex-col gap-2">
                {items.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-neutral-900 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}