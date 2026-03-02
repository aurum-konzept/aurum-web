"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
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

        {/* Right Buttons */}
        <div className="ml-4 flex items-center gap-3">
          
          {/* Login Button */}
          {status !== "loading" && (
            session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:border-amber-400/40 hover:text-white transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:border-amber-400/40 hover:text-white transition"
              >
                Anmelden
              </Link>
            )
          )}

          {/* Beratung Button */}
          <Link
            href="/#kontakt"
            className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 hover:bg-amber-400/20 transition"
          >
            Beratung anfragen
          </Link>

        </div>
      </div>
    </header>
  );
}