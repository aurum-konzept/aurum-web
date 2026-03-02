import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StorageInquiryForm from "@/components/dashboard/StorageInquiryForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  const name = (session.user as any)?.name?.trim();

  return (
    <main className="space-y-10">
      {/* Welcome */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Willkommen bei Aurum<span className="text-amber-400">.</span>
        </h1>
        <p className="mt-3 text-neutral-300">
          {name
            ? <>Schön, dass Sie da sind, {name}. </>
            : <>Schön, dass Sie da sind. </>}
          Wir freuen uns, Sie künftig bei der sicheren Verwahrung Ihrer Edelmetalle
          zu unterstützen. Dieser Bereich wird Schritt für Schritt erweitert.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-5">
            <p className="text-sm text-neutral-300">
              <span className="text-neutral-100 font-medium">Verwahrung:</span> Anfrage senden, Angebot erhalten.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-5 opacity-80">
            <p className="text-sm text-neutral-300">
              <span className="text-neutral-100 font-medium">Vermittlung:</span> Coming soon.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-5 opacity-80">
            <p className="text-sm text-neutral-300">
              <span className="text-neutral-100 font-medium">Vermögensnutzung:</span> Coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Verwahrung */}
      <section id="verwahrung" className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8">
        <h2 className="text-2xl font-semibold">Verwahrung anfragen</h2>
        <p className="mt-2 text-neutral-300">
          Wie möchten Sie Ihre Edelmetalle verwahren und ein Angebot erhalten? Übermitteln Sie uns die Daten –
          wir melden uns mit einem Angebot zurück.
        </p>

        <div className="mt-6">
          <StorageInquiryForm />
        </div>
      </section>

      {/* Sonderlösungen */}
      <section id="sonderloesungen" className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8">
        <h2 className="text-2xl font-semibold">Sonderlösungen</h2>
        <p className="mt-2 text-neutral-300">
          Individuelle Anforderungen? Schreiben Sie uns im Formular einen Hinweis – wir klären das persönlich.
        </p>
      </section>

      {/* Zukunft / Coming soon */}
      <section id="vermittlung" className="rounded-3xl border border-neutral-800 bg-neutral-950/40 p-8 opacity-80">
        <h2 className="text-2xl font-semibold">Vermittlung (Coming soon)</h2>
        <p className="mt-2 text-neutral-300">
          Perspektivisch bieten wir strukturierte Vermittlungsprozesse an – transparent und nachvollziehbar.
        </p>
      </section>

      <section id="vermoegensnutzung" className="rounded-3xl border border-neutral-800 bg-neutral-950/40 p-8 opacity-80">
        <h2 className="text-2xl font-semibold">Vermögensnutzung (Coming soon)</h2>
        <p className="mt-2 text-neutral-300">
          Später werden hier Optionen für Vermögensüberblick und weitere Funktionen sichtbar.
        </p>
      </section>
    </main>
  );
}