import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Aurum – Zukunft & Roadmap",
  description:
    "Geplante Leistungen und zukünftige Schritte: Verwahrung, Online-Übersicht, Netzwerk für Verkäufe und spätere Nutzung von Edelmetallen.",
};

export default function ZukunftPage() {
  return (
    <>
      <Header /> 

      <main className="min-h-screen text-neutral-50">
        <section className="mx-auto max-w-6xl px-4 pt-18 pb-14 sm:px-6 sm:pt-20 sm:pb-16">
          <p className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-[11px] text-amber-200 sm:text-xs">
            Roadmap • Ausblick • Aufbauphase
          </p>

          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Zukünftige Schritte von Aurum
            <br />
            <span className="text-neutral-300">
              Was wir anbieten wollen – und wohin wir uns entwickeln.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm text-neutral-300 sm:text-base md:mt-6 md:text-lg">
            Aurum befindet sich im Aufbau. Auf dieser Seite zeigen wir transparent,
            welche Leistungen wir planen und welche Funktionen sich in Entwicklung befinden.
            Unser Fokus: verständliche Prozesse, verlässliche Abläufe und echte Nutzbarkeit.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Phase 1", "Verwahrung & klare Prozesse"],
              ["Phase 2", "Online-Übersicht & digitale Transparenz"],
              ["Phase 3", "Netzwerk & Liquidation/Verkauf"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-3xl border border-neutral-800 p-5 sm:p-6"
              >
                <div className="text-sm text-amber-200">{t}</div>
                <div className="mt-2 font-medium">{d}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-semibold sm:text-2xl">
              1) Geplante Verwahrungsleistung
            </h2>

            <p className="mt-4 max-w-3xl text-sm text-neutral-300 sm:text-base">
              Wir planen eine strukturierte Verwahrung von Gold und Silber, bei der
              Abläufe nachvollziehbar bleiben: Einlagerung, Dokumentation, Übergaben
              und organisatorische Standards. Öffentlich kommunizieren wir bewusst
              keine sicherheitskritischen Details.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-800 p-5 sm:p-6">
                <div className="font-medium">Was Kunden davon haben</div>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>• Klarer Ablauf &amp; planbare Schritte</li>
                  <li>• Saubere Dokumentation &amp; Nachvollziehbarkeit</li>
                  <li>• Transparente Kommunikation (ohne Risiko)</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-neutral-800 p-5 sm:p-6">
                <div className="font-medium">Wichtig (Hinweis)</div>
                <p className="mt-3 text-sm text-neutral-300">
                  Aurum gibt keine Rendite- oder Wertversprechen. Verwahrung ist eine
                  organisatorische Leistung – der Wert von Edelmetallen hängt vom Markt ab.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-semibold sm:text-2xl">
              2) Online-Übersicht der Verwahrsumme
            </h2>

            <p className="mt-4 max-w-3xl text-sm text-neutral-300 sm:text-base">
              In Arbeit ist eine Online-Übersicht, die den Bestand bzw. die Verwahrsumme
              nachvollziehbar darstellt. Geplant ist eine regelmäßige Aktualisierung
              (z. B. täglich). Diese Anzeige dient ausschließlich der Orientierung.
            </p>

            <div className="mt-6 rounded-3xl border border-neutral-800 p-5 sm:p-6">
              <div className="font-medium">Transparenz ohne Versprechen</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>• Anzeige als Schätzwert/Orientierung, keine Garantie</li>
                <li>• Marktwerte können schwanken (Preis, Spread, Verfügbarkeit)</li>
                <li>• Ziel: Übersicht und Verständnis – nicht „Performance“</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-semibold sm:text-2xl">
              3) Netzwerk für Verkäufe (Liquidation)
            </h2>

            <p className="mt-4 max-w-3xl text-sm text-neutral-300 sm:text-base">
              Eins unserer großen Ziele ist der Aufbau eines Netzwerks aus Ankäufern, um private
              Verkäufe von Edelmetallen schneller und einfacher zu machen. Aurum soll
              dabei stark in der Vermittlung unterstützen: Kommunikation, Koordination,
              Standardisierung von Abläufen und Verlässlichkeit – damit Liquidation
              für Privatkunden unkomplizierter wird.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Schnell", "Strukturierte Vermittlung & Terminierung"],
                ["Flexibel", "Mehr Optionen durch Netzwerk-Abdeckung"],
                ["Verlässlich", "Standardisierte Schritte & klare Rollen"],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-3xl border border-neutral-800 p-5 sm:p-6"
                >
                  <div className="font-medium">{t}</div>
                  <div className="mt-2 text-sm text-neutral-300">{d}</div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm text-neutral-400">
              Hinweis: Die konkrete Ausgestaltung (Partner, Abläufe, Gebühren, rechtliche Rahmenbedingungen)
              wird transparent kommuniziert, sobald sie final definiert ist.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-semibold sm:text-2xl">
              4) Edelmetalle nutzen statt verkaufen
            </h2>

            <p className="mt-4 max-w-3xl text-sm text-neutral-300 sm:text-base">
              Perspektivisch wollen wir Möglichkeiten schaffen, Edelmetalle nicht nur
              zu verwahren oder zu verkaufen, sondern sie potenziell auch „nutzen“ zu können
              (z. B. über strukturierte Modelle, Anleihen/ähnliche Konzepte oder andere
              Formen der Liquiditätsnutzung).
            </p>

            <div className="mt-6 rounded-3xl border border-neutral-800 p-5 sm:p-6">
              <div className="font-medium">Wichtig</div>
              <p className="mt-3 text-sm text-neutral-300">
                Dieses Feld ist ausdrücklich Zukunftsthema. Ob und wie solche Modelle umgesetzt werden,
                hängt von Machbarkeit, Partnern und insbesondere rechtlichen/regulatorischen Anforderungen ab.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-400 sm:px-6">
          © {new Date().getFullYear()} Aurum ·{" "}
          <a className="hover:text-white" href="/#kontakt">
            Kontakt
          </a>
        </div>
      </footer>
    </>
  );
}