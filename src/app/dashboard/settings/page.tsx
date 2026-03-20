import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  return (
    <main className="space-y-5 sm:space-y-6 lg:space-y-8">
      <section className="rounded-[28px] border border-amber-400/15 bg-[linear-gradient(135deg,rgba(251,191,36,0.08),rgba(20,18,16,0.88)_22%,rgba(12,10,8,0.96)_70%)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Einstellungen
        </div>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
          Einstellungen
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
          Hier werden später Profildaten, Sicherheitseinstellungen und weitere
          persönliche Optionen zentral verwaltet.
        </p>
      </section>

      <section className="rounded-[28px] border border-neutral-800/90 bg-[rgba(18,15,12,0.88)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:p-8">
        <h2 className="text-lg font-semibold sm:text-xl">Profil</h2>
        <p className="mt-2 text-sm text-neutral-300 sm:text-base">
          Hier werden später Profildaten und Sicherheitseinstellungen verfügbar
          sein, zum Beispiel Passwort ändern oder persönliche Stammdaten pflegen.
        </p>
      </section>

      <section className="rounded-[28px] border border-dashed border-amber-400/15 bg-[rgba(18,15,12,0.72)] p-5 opacity-90 sm:p-8">
        <div className="inline-flex rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
          Coming soon
        </div>

        <h2 className="mt-3 text-lg font-semibold sm:text-xl">
          Sicherheit
        </h2>

        <p className="mt-2 text-sm text-neutral-300 sm:text-base">
          Passwort ändern, 2FA und weitere Sicherheitsoptionen folgen in einer
          späteren Ausbaustufe.
        </p>
      </section>
    </main>
  );
}