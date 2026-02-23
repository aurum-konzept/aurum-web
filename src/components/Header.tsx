"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-6 z-50 flex justify-center">
      <div className="flex items-center gap-8 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur px-8 py-3 shadow-lg">
        
        {/* Logo */}
        <Link
        href="/"
        scroll={false}
        onClick={() => {
            if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }}
        className="flex items-center gap-2 text-lg font-semibold tracking-wide"
        >
          <img
            src="/aurum-logo.png"
            alt="Aurum Logo"
            className="h-8 w-8 object-contain"
          />
          <span>
            Aurum<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-6 text-sm text-neutral-300 md:flex">
          <a href="/#leistungen" className="hover:text-white">Leistungen</a>
          <a href="/#sicherheit" className="hover:text-white">Sicherheit</a>
          <Link href="/zukunft" className="hover:text-white">
            Zukunft
          </Link>
        </nav>

        <Link
          href="/#kontakt"
          className="ml-4 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 hover:bg-amber-400/20 transition"
        >
          Beratung anfragen
        </Link>

      </div>
    </header>
  );
}