"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import MobileMenu, { MobileMenuItem } from "@/components/MobileMenu";

type HeaderProps = {
  mobileItems?: MobileMenuItem[];
};

export default function Header({ mobileItems }: HeaderProps) {
  const { data: session, status } = useSession();

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Ganz oben immer sichtbar
      if (currentScrollY <= 20) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // Kleine Bewegungen ignorieren, damit der Header nicht flackert
      if (scrollDifference < 8) return;

      if (scrollingDown) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const defaultMobileItems: MobileMenuItem[] = [
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Sicherheit", href: "/#sicherheit" },
    { label: "Zukunft", href: "/zukunft" },
    { label: "Kontakt", href: "/#kontakt" },
  ];

  const items = mobileItems ?? defaultMobileItems;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 transition-transform duration-300 ease-out sm:px-4 sm:pt-6 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-neutral-800 bg-neutral-950/80 px-4 py-3 shadow-lg backdrop-blur sm:gap-4 sm:px-5 md:gap-8 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          scroll={false}
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex min-w-0 items-center gap-2 text-base font-semibold tracking-wide text-white sm:text-lg"
        >
          <img
            src="/aurum-logo.png"
            alt="Aurum Logo"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="truncate">
            Aurum<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <Link href="/zukunft" className="hover:text-white">
            Zukunft
          </Link>
          <a href="/#leistungen" className="hover:text-white">
            Leistungen
          </a>
          <a href="/#sicherheit" className="hover:text-white">
            Sicherheit
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="ml-4 hidden items-center gap-3 md:flex">
          {status !== "loading" &&
            (session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-amber-400/40 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-amber-400/40 hover:text-white"
              >
                Anmelden
              </Link>
            ))}

          <Link
            href="/#kontakt"
            className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 transition hover:bg-amber-400/20"
          >
            Beratung anfragen
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="ml-2 flex items-center gap-2 md:hidden">
          {status !== "loading" &&
            (session ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-neutral-700 px-3 py-2 text-xs text-neutral-200 transition hover:border-amber-400/40 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full border border-neutral-800 px-3 py-2 text-xs text-neutral-300 transition hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="rounded-full border border-neutral-700 px-3 py-2 text-xs text-neutral-200 transition hover:border-amber-400/40 hover:text-white"
              >
                Anmelden
              </Link>
            ))}

          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}