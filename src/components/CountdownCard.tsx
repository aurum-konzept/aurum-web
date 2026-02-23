"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownCard() {
  // ✅ Festes Ziel: 01.03.2026 16:00 Uhr (Europe/Berlin = +01:00)
  const target = useMemo(
    () => new Date("2026-03-03T16:00:00+01:00").getTime(),
    []
  );

  // ✅ Wichtig gegen Hydration mismatch:
  // Server rendert zunächst Platzhalter, echte Zeit erst nach Mount
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());

    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Solange nicht gemountet: keine echten Werte rendern (verhindert mismatch)
  const diff = mounted ? Math.max(0, target - now) : 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isLive = mounted && diff === 0;

  // Werte für Anzeige (Platzhalter bis mounted)
  const d = mounted ? String(days) : "--";
  const h = mounted ? pad(hours) : "--";
  const m = mounted ? pad(minutes) : "--";
  const s = mounted ? pad(seconds) : "--";

  return (
    <div className="w-full max-w-3xl">
      {/* BOX */}
      <section className="relative overflow-hidden rounded-xl border border-amber-400/30 bg-[#0f0d0a]/70 backdrop-blur-md p-10 text-white">
        {/* subtiler Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative text-center">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/aurum-logo.png"
              alt="Aurum Logo"
              width={130}
              height={130}
              priority
              className="opacity-95 drop-shadow-[0_0_25px_rgba(231,211,154,0.15)]"
            />
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-semibold [font-family:var(--font-display)] tracking-tight">
            Gold und Silber verdienen mehr als Lagerung.
          </h1>

          <p className="mt-3 text-white/75 max-w-2xl mx-auto">
            In wenigen Tagen startet eine Lösung für alle, die physische Werte nicht nur besitzen,
            sondern strategisch nutzen wollen.
          </p>

          {/* Countdown */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-5 md:gap-7">
              <Unit label="Tag" value={d} />
              <Colon />
              <Unit label="Std" value={h} />
              <Colon />
              <Unit label="Min" value={m} />
              <Colon />
              <Unit label="Sek" value={s} />
            </div>
          </div>

          <p className="mt-6 text-sm md:text-base text-white/70">
            {isLive ? "Wir sind live." : "Early Access öffnet sich in Kürze."}
          </p>

          {/* Optional: festes Datum klein (wirkt seriös, verhindert Verwirrung) */}
          <p className="mt-2 text-xs text-white/45">
            Launch: 01.03.2026 · 16:00 (Berlin)
          </p>
        </div>
      </section>

      {/* TEASER AUSSERHALB */}
      <div className="mt-10 text-center space-y-3">
        {["Verwahrung", "Vermittlung", "Vermögensüberblick"].map((t) => (
          <p
            key={t}
            className="text-3xl md:text-4xl font-extrabold tracking-[0.08em] bg-gradient-to-r from-[#F7E27A] via-[#F5D04E] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(247,226,122,0.25)]"
          >
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-4xl md:text-5xl font-extrabold text-amber-300/90">
      :
    </span>
  );
}

function Unit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-xs md:text-sm tracking-widest uppercase text-white/85">
        {label}
      </span>
      <span className="text-5xl md:text-6xl font-extrabold tabular-nums text-amber-300 drop-shadow-[0_0_12px_rgba(253,230,138,0.18)]">
        {value}
      </span>
    </div>
  );
}