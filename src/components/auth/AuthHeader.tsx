"use client";

import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="flex justify-center pt-6">
      <div className="flex items-center justify-between w-full max-w-6xl px-4 sm:px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <img
            src="/aurum-logo.png"
            alt="Aurum Logo"
            className="h-8 w-8"
          />
          <span>
            Aurum<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-white transition"
        >
          Zur Startseite
        </Link>

      </div>
    </header>
  );
}