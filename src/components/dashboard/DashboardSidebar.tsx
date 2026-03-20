import Link from "next/link";

type DashboardSidebarProps = {
  onNavigate?: () => void;
  mobile?: boolean;
};

const navItems = [
  { label: "Verwahrung", href: "/dashboard#verwahrung", disabled: false },
  { label: "Sonderlösungen", href: "/dashboard#sonderloesungen", disabled: false },
  { label: "Vermittlung", href: "/dashboard#vermittlung", disabled: true },
  { label: "Vermögensnutzung", href: "/dashboard#vermoegensnutzung", disabled: true },
];

export default function DashboardSidebar({
  onNavigate,
  mobile = false,
}: DashboardSidebarProps) {
  return (
    <aside
      className={
        mobile
          ? "flex h-full flex-col"
          : "relative flex h-full flex-col rounded-3xl border border-amber-400/10 bg-[linear-gradient(180deg,rgba(18,14,10,0.95),rgba(10,8,6,0.98))] p-4 shadow-xl"
      }
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-amber-400/5 blur-2xl" />
      <div className="mb-6 px-2">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          Dashboard
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">
          Aurum<span className="text-amber-400">.</span>
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) =>
          item.disabled ? (
            <span
              key={item.label}
              className="cursor-not-allowed rounded-2xl border border-neutral-800/80 bg-black/30 px-4 py-3 text-sm text-neutral-500"
              title="Coming soon"
              aria-disabled="true"
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200 transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-white"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="mt-6 border-t border-neutral-800 pt-4">
        <Link
          href="/dashboard/settings"
          onClick={onNavigate}
          className="block rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 transition hover:bg-amber-400/20"
        >
          Einstellungen
        </Link>
      </div>

      <div className="mt-auto pt-6">
        <Link
          href="/"
          onClick={onNavigate}
          className="block rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-300 transition hover:text-white"
        >
          ← Zur Website
        </Link>
      </div>
    </aside>
  );
}