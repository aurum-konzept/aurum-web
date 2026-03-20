import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StorageInquiryForm from "@/components/dashboard/StorageInquiryForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  const name = (session.user as any)?.name?.trim();

  return (
    <main className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Hero / Welcome */}
      <section className="relative overflow-hidden rounded-[28px] border border-amber-400/15 bg-[linear-gradient(135deg,rgba(251,191,36,0.10),rgba(20,18,16,0.88)_22%,rgba(12,10,8,0.96)_70%)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-200 sm:text-xs">
            Aurum Dashboard
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Willkommen bei Aurum<span className="text-amber-400">.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {name ? <>Schön, dass Sie da sind, {name}. </> : <>Schön, dass Sie da sind. </>}
            Dieser Bereich wird Schritt für Schritt erweitert und bündelt künftig
            Verwahrung, Übersicht, Dokumentation und weitere Funktionen an einem Ort.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Status
              </p>
              <p className="mt-2 text-sm text-neutral-100">
                Verwahrung aktiv
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                Anfrage senden und Angebot erhalten.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Nächster Ausbau
              </p>
              <p className="mt-2 text-sm text-neutral-100">
                Vermittlung
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                Coming soon – strukturierte Weiterentwicklung.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Perspektive
              </p>
              <p className="mt-2 text-sm text-neutral-100">
                Vermögensnutzung
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                Weitere Funktionen folgen in späteren Phasen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verwahrung */}
      <section
        id="verwahrung"
        className="rounded-[28px] border border-neutral-800/90 bg-[rgba(18,15,12,0.88)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:p-8"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-amber-400/15 bg-amber-400/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-200">
              Aktiv
            </div>

            <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
              Verwahrung anfragen
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-neutral-300 sm:text-base">
              Übermitteln Sie uns die Eckdaten Ihrer gewünschten Verwahrung.
              Wir melden uns mit einem strukturierten Angebot zurück.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800/80 bg-black/20 p-4 sm:p-5">
          <StorageInquiryForm />
        </div>
      </section>

      {/* Sonderlösungen */}
      <section
        id="sonderloesungen"
        className="rounded-[28px] border border-neutral-800/90 bg-[rgba(18,15,12,0.82)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.22)] sm:p-8"
      >
        <div className="inline-flex rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
          Individuell
        </div>

        <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
          Sonderlösungen
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-neutral-300 sm:text-base">
          Besondere Anforderungen, abweichende Abläufe oder individuelle Wünsche
          können im Formular ergänzt werden. Wir prüfen die Machbarkeit persönlich.
        </p>
      </section>

      {/* Coming soon grid */}
      <section className="grid gap-4 lg:grid-cols-2">
        <section
          id="vermittlung"
          className="rounded-[28px] border border-dashed border-amber-400/15 bg-[rgba(18,15,12,0.72)] p-5 opacity-90 sm:p-8"
        >
          <div className="inline-flex rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            Coming soon
          </div>

          <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
            Vermittlung
          </h2>

          <p className="mt-2 text-sm text-neutral-300 sm:text-base">
            Perspektivisch bieten wir strukturierte Vermittlungsprozesse an –
            transparent, nachvollziehbar und mit klaren Abläufen.
          </p>
        </section>

        <section
          id="vermoegensnutzung"
          className="rounded-[28px] border border-dashed border-amber-400/15 bg-[rgba(18,15,12,0.72)] p-5 opacity-90 sm:p-8"
        >
          <div className="inline-flex rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            Coming soon
          </div>

          <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
            Vermögensnutzung
          </h2>

          <p className="mt-2 text-sm text-neutral-300 sm:text-base">
            Später werden hier Optionen für Vermögensüberblick, erweiterte Nutzung
            und weitere Funktionen sichtbar.
          </p>
        </section>
      </section>
    </main>
  );
}