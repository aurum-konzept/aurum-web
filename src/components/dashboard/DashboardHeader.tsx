"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import DashboardMobileMenu from "@/components/dashboard/DashboardMobileMenu";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-400/10 bg-[linear-gradient(to_bottom,rgba(20,16,12,0.92),rgba(12,10,8,0.85))] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">
          
          {/* Mobile Menü */}
          <div className="lg:hidden">
            <DashboardMobileMenu />
          </div>

          {/* Logo + Brand */}
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-2 text-white"
          >
            <Image
              src="/aurum-logo.png"
              alt="Aurum Logo"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
            />

            <span className="truncate text-base font-semibold tracking-wide sm:text-lg">
              Aurum<span className="text-amber-400">.</span>
            </span>

            {/* Dashboard Text */}
            <span className="hidden text-sm text-neutral-400 sm:inline">
              Dashboard
            </span>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Zur Website */}
          <Link
            href="/"
            className="hidden rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition hover:text-white sm:inline-flex"
          >
            Zur Website
          </Link>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-neutral-800 px-3 py-2 text-xs text-neutral-300 transition hover:text-white sm:px-4 sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}