"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Verwahrung", href: "/dashboard#verwahrung", disabled: false },
  { label: "Sonderlösungen", href: "/dashboard#sonderloesungen", disabled: false },
  { label: "Vermittlung", href: "/dashboard#vermittlung", disabled: true },
  { label: "Vermögensnutzung", href: "/dashboard#vermoegensnutzung", disabled: true },
];

export default function DashboardMobileMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative lg:hidden">
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
        <div className="absolute left-0 top-12 z-50 w-[260px] rounded-2xl border border-neutral-800 bg-[#0e0c0a] p-3 shadow-2xl">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.disabled ? (
                <span
                  key={item.label}
                  className="cursor-not-allowed rounded-xl border border-neutral-800 px-4 py-3 text-sm text-neutral-500"
                  aria-disabled="true"
                  title="Coming soon"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-neutral-800 px-4 py-3 text-sm text-neutral-200 transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="my-1 h-px bg-neutral-800" />

            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 transition hover:bg-amber-400/20"
            >
              Einstellungen
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-neutral-800 px-4 py-3 text-sm text-neutral-300 transition hover:text-white"
            >
              ← Zur Website
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}