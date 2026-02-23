"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import MetalCalculator from "@/components/MetalCalculator";

export default function Home() {

  //Hier kommt jetzt alles mit Daten rein (Javascript) 
  //Const für Abläufe 
const steps = [
  {
    id: 1,
    title: "Anfrage",
    description: "Sie stellen eine unverbindliche Anfrage über unser Kontaktformular oder telefonisch.",
    status: "live"
  },
  {
    id: 2,
    title: "Abstimmung",
    description: "Gemeinsam definieren wir Verwahrart, Volumen und individuelle Anforderungen.",
    status: "live"
  },
  {
    id: 3,
    title: "Einlagerung",
    description: "Ihre Edelmetalle werden sicher übernommen und fachgerecht eingelagert.",
    status: "live"
  },
  {
    id: 4,
    title: "Dokumentation",
    description: "Sie erhalten eine transparente Bestätigung und vollständige Dokumentation.",
    status: "live"
  },

  //  Coming Soon
  {
    id: 5,
    title: "Online-Werteübersicht",
    description:
      "Über Ihr persönliches Dashboard erhalten Sie jederzeit eine transparente Übersicht über Bestand, Marktwert und Entwicklung Ihrer Einlagen – ähnlich wie im Online-Banking.",
    status: "soon",
    badge: "Coming Soon"
  },
  {
    id: 6,
    title: "Vermittlung",
    description:
      "Du brauchst Geld oder willst einfach liquide werden? Aurum vermittelt diskret an ein deutschlandweites Netzwerk geprüfter Partner.",
    status: "soon",
    badge: "Coming Soon"
  },
  {
    id: 7,
    title: "Vermögensnutzung",
    description:
      "Du willst dein Vermögen nutzen statt verkaufen? Perspektivisch schaffen wir Möglichkeiten, dein Edelmetallvermögen einzusetzen, ohne es dauerhaft abzugeben.",
    status: "soon",
    badge: "Coming Soon"
  }
  ];
  //Das hier ist alles für das Kontaktformular!
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (Spam-Schutz)
  const [company, setCompany] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, company }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Senden fehlgeschlagen.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCompany("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Senden fehlgeschlagen.");
    }
  }
  //Hier kommt alles für die Leistungen hin
  const services = [
  {
    id: "verwahrung",
    title: "Verwahrung",
    description:
      "Sichere Verwahrung Ihrer Edelmetalle mit klaren Prozessen und transparenter Struktur.",
    status: "live"
  },
  {
    id: "sonderloesungen",
    title: "Sonderlösungen",
    description:
      "Individuelle Verwahrarten und Lösungen – abgestimmt auf Volumen, Bedarf und Situation.",
    status: "live"
  },
  {
    id: "vermittlung",
    title: "Vermittlung",
    description:
      "Diskrete Vermittlung an geprüfte Partner, wenn Sie liquide werden möchten.",
    status: "soon"
  },
  {
    id: "vermoegensnutzung",
    title: "Vermögensnutzung",
    description:
      "Neue Möglichkeiten, Ihr Edelmetallvermögen strategisch zu nutzen statt es dauerhaft zu verkaufen.",
    status: "soon"
  },
  {
    id: "dashboard",
    title: "Online-Überblick",
    description:
      "Ein digitales Dashboard mit Bestands- und Marktwertübersicht – vergleichbar mit Online-Banking.",
    status: "soon"
  }
];
  return (
    <main className="min-h-screen text-neutral-50">
      {/* NAV */}
      <Header />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-16 md:pt-20">
        <p className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs text-amber-200">
          Edelmetallverwahrung • Prozesse • Transparenz 
        </p>

        <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight">
          Gold & Silber strukturiert verwahren.
          <br />
          <span className="text-neutral-300">Übersichtlich. Dokumentiert. Zukunftssicher.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-neutral-300 md:text-lg">
          Aurum steht für klare Abläufe, saubere Übergaben und nachvollziehbare Dokumentation – ohne
          unnötige Komplexität.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#kontakt"
            className="rounded-2xl bg-amber-400 px-6 py-3 text-center text-sm font-medium text-neutral-950 hover:opacity-95"
          >
            Beratung anfragen
          </a>
          <a
            href="#ablauf"
            className="rounded-2xl border border-neutral-800 px-6 py-3 text-center text-sm text-neutral-100 hover:bg-neutral-900"
          >
            Leistungen ansehen
          </a>
        </div>

        {/* Genau hier kommt der Rechner hin */}
        <div className="mt-10 sm:mt-14">
          <MetalCalculator />
        </div>

      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold">Leistungen</h2>

          {/*  LIVE LEISTUNGEN (größer) */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services
              .filter((s) => s.status === "live")
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8"
                >
                  <div className="text-lg font-semibold">
                    {item.title}
                  </div>
                  <div className="mt-4 text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              ))}
          </div>

          {/*  COMING SOON TRENNER */}
          <div className="mt-12 sm:mt-14">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                Coming Soon
              </span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>
          </div>

          {/* 🔜 COMING SOON LEISTUNGEN (kleiner) */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services
              .filter((s) => s.status === "soon")
              .map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-3xl border border-dashed border-neutral-700 bg-neutral-900/40 p-6"
                >
                  <div className="absolute right-4 top-4 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-200">
                    Coming Soon
                  </div>

                  <div className="font-medium text-neutral-100/90">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-neutral-300/80">
                    {item.description}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SICHERHEIT */}
      <section id="sicherheit" className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold">Sicherheit</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-800 p-6">
              <div className="font-medium">Grundprinzipien</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>• Vier-Augen-Prinzip bei kritischen Handlungen</li>
                <li>• Dokumentation & Protokollierung von Übergaben</li>
                <li>• Rollen & Verantwortlichkeiten klar definiert</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-800 p-6">
              <div className="font-medium">Transparenz ohne Risiko</div>
              <p className="mt-3 text-sm text-neutral-300">
                Öffentlich kommunizieren wir bewusst keine Details, die Sicherheitsrisiken erhöhen. Trotzdem bleibt
                der Ablauf für Kunden verständlich und strukturiert.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* ABLAUF */}
      <section id="ablauf" className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold">Ablauf</h2>

          {/* LIVE: Schritte 1–4 */}
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps
              .filter((s) => s.status === "live")
              .map((step) => (
                <div
                  key={step.id}
                  className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6"
                >
                  <div className="text-sm text-amber-200">Schritt {step.id}</div>
                  <div className="mt-2 font-medium">{step.title}</div>
                  <div className="mt-2 text-sm text-neutral-300">{step.description}</div>
                </div>
              ))}
          </div>

          {/* TRENNER + COMING SOON */}
          <div className="mt-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                Coming Soon
              </span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            <p className="mt-3 text-sm text-neutral-300 text-center">
              Diese Funktionen sind in Entwicklung und erweitern Aurum in Richtung Dashboard, Liquidität und Nutzungsmöglichkeiten.
            </p>

            {/* COMING SOON: Schritte 5–7 */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps
                .filter((s) => s.status === "soon")
                .map((step) => (
                  <div
                    key={step.id}
                    className="relative rounded-3xl border border-dashed border-neutral-700 bg-neutral-900/40 p-6"
                  >
                    <div className="absolute right-4 top-4 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-200">
                      {step.badge ?? "Coming Soon"}
                    </div>

                    <div className="text-sm text-amber-200/80">Schritt {step.id}</div>
                    <div className="mt-2 font-medium text-neutral-100/90">{step.title}</div>
                    <div className="mt-2 text-sm text-neutral-300/80">{step.description}</div>
                  </div>
                ))}
            </div>
             <div className="mt-6 text-center">
            <Link
              href="/zukunft"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-300 transition"
            >
              Erfahre mehr dazu →
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="mt-2 text-neutral-300">
            Kurze Anfrage genügt – wir melden uns persönlich zurück.
          </p>

          <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 md:max-w-xl">
            <input
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-amber-400/60"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-amber-400/60"
              placeholder="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9+]*"
              placeholder="Telefonnummer (optional)"
              value={phone}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/[^0-9+]/g, "");
                setPhone(cleaned);
              }}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-amber-400/60"
            />

            <textarea
              className="min-h-[140px] rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-amber-400/60"
              placeholder="Nachricht"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* Honeypot Feld (unsichtbar) */}
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-medium text-neutral-950 hover:opacity-95 disabled:opacity-60"
            >
              {status === "sending" ? "Senden..." : "Absenden"}
            </button>

            {status === "success" && (
              <p className="text-sm text-amber-200">Danke! Wir melden uns schnellstmöglich zurück.</p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-300">
                {errorMsg || "Leider hat das Senden nicht funktioniert. Bitte später erneut versuchen."}
              </p>
            )}
            <p className="text-xs text-neutral-500">
              Mit dem Absenden erklärst du dich damit einverstanden, dass wir deine Angaben zur Bearbeitung der Anfrage und für mögliche Rückfragen verarbeiten. Weitere Informationen findest du in unserer Datenschutzerklärung.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-800 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-neutral-400">
          © {new Date().getFullYear()} Aurum · Impressum · Datenschutz
        </div>
      </footer>
    </main>
  );
}