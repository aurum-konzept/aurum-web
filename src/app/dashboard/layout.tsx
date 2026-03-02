import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Dashboard Header Nav */}
      <div className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-neutral-300 hover:text-white">
            ← Zur Website
          </Link>

          <nav className="flex gap-2">
            <a
              href="/dashboard#verwahrung"
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-200 hover:border-amber-400/40 hover:bg-amber-400/10 transition"
            >
              Verwahrung
            </a>
            <a
              href="/dashboard#sonderloesungen"
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-200 hover:border-amber-400/40 hover:bg-amber-400/10 transition"
            >
              Sonderlösungen
            </a>
            <a
              href="#vermittlung"
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-500 cursor-not-allowed"
              aria-disabled="true"
              title="Coming soon"
            >
              Vermittlung
            </a>
            <a
              href="#vermoegensnutzung"
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-500 cursor-not-allowed"
              aria-disabled="true"
              title="Coming soon"
            >
              Vermögensnutzung
            </a>

            <Link
              href="/dashboard/settings"
              className="ml-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 hover:bg-amber-400/20 transition"
            >
              Einstellungen
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}