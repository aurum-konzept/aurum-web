"use client";

import GoldSelect from "@/components/ui/GoldSelect";

import React, { useEffect, useMemo, useState } from "react";

type Metal = "gold" | "silver";
type Unit = "g" | "oz" | "kg";

const TROY_OZ_IN_G = 31.1034768;

function parseNumberDE(input: string): number | null {
  const normalized = input.replace(/\s/g, "").replace(",", ".");
  if (normalized === "") return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

export default function MetalCalculator() {
  const [metal, setMetal] = useState<Metal>("silver");
  const [unit, setUnit] = useState<Unit>("g");
  const [amountRaw, setAmountRaw] = useState("100");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [prices, setPrices] = useState<{
    gold?: { pricePerOz: number; timestamp?: number; bid?: number; ask?: number };
    silver?: { pricePerOz: number; timestamp?: number; bid?: number; ask?: number };
    fetchedAt?: number;
  }>({});

  async function loadPrices() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/metals");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPrices({ gold: data.gold, silver: data.silver, fetchedAt: data.fetchedAt });
    } catch (e: any) {
      setErr(e?.message ?? "Fehler beim Laden der Preise");
    } finally {
      setLoading(false);
    }
  }

    useEffect(() => {
    loadPrices();

    const TWO_HOURS = 120 * 60 * 1000; // 120 Minuten
    const t = setInterval(loadPrices, TWO_HOURS);

    return () => clearInterval(t);
    }, []);

  const amount = useMemo(() => parseNumberDE(amountRaw), [amountRaw]);

  const activePricePerOz = useMemo(() => {
    return metal === "gold" ? prices.gold?.pricePerOz ?? null : prices.silver?.pricePerOz ?? null;
  }, [metal, prices]);

  const result = useMemo(() => {
    if (!amount || amount <= 0) return null;
    if (!activePricePerOz) return null;

    const pricePerG = activePricePerOz / TROY_OZ_IN_G;
    const pricePerKg = pricePerG * 1000;

    const pricePerUnit =
      unit === "oz" ? activePricePerOz :
      unit === "g" ? pricePerG :
      pricePerKg;

    return {
      total: amount * pricePerUnit,
      pricePerUnit,
      spotPerOz: activePricePerOz,
    };
  }, [amount, unit, activePricePerOz]);

  return (
    <div className="rounded-3xl border border-amber-400/40 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(251,191,36,0.15)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Edelmetall-Rechner</h3>
          <p className="mt-1 text-sm text-white/70">
            Reiner Spot-Metallwert (ohne Gebühren, Aufschläge oder MwSt.)
          </p>
        </div>
        <button
          onClick={loadPrices}
          className="rounded-xl border border-amber-400/30 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
        >
          Aktualisieren
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="block">
            <GoldSelect
            label="Edelmetall"
            value={metal}
            onChange={(v) => setMetal(v as Metal)}
            options={[
                { value: "gold", label: "Gold (XAU)" },
                { value: "silver", label: "Silber (XAG)" },
            ]}
            />
        </label>

        <label className="block">
            <GoldSelect
            label="Einheit"
            value={unit}
            onChange={(v) => setUnit(v as Unit)}
            options={[
                { value: "g", label: "Gramm (g)" },
                { value: "oz", label: "Feinunze (oz)" },
                { value: "kg", label: "Kilogramm (kg)" },
            ]}
            />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Menge</span>
          <input
            value={amountRaw}
            onChange={(e) => setAmountRaw(e.target.value)}
            inputMode="decimal"
            placeholder="z.B. 500 oder 10,5"
            className="mt-1 w-full rounded-xl border border-amber-400/30 bg-black p-3 text-white outline-none focus:border-amber-400"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-400/30 bg-black/60 p-5">
        {loading ? (
          <p className="text-white/70">Lade Preise…</p>
        ) : err ? (
          <p className="text-red-300">Fehler: {err}</p>
        ) : !activePricePerOz ? (
          <p className="text-white/70">Keine Preisdaten verfügbar.</p>
        ) : (
          <>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm text-white/70">Spotpreis (pro Feinunze)</p>
                <p className="text-2xl font-semibold text-white">{formatEUR(activePricePerOz)} / oz</p>
                <p className="mt-1 text-xs text-white/40">
                  1 oz = {TROY_OZ_IN_G.toLocaleString("de-DE")} g
                </p>
              </div>

              {result && (
                <div className="text-right">
                  <p className="text-sm text-white/70">Metallwert</p>
                  <p className="text-3xl font-semibold text-white">{formatEUR(result.total)}</p>
                  <p className="mt-1 text-xs text-white/40">
                    ({formatEUR(result.pricePerUnit)} / {unit})
                  </p>
                </div>
              )}
            </div>

            {!result && <p className="mt-3 text-white/70">Bitte gültige Menge &gt; 0 eingeben.</p>}

            <div className="mt-4 text-xs text-white/40">
              Stand: {prices.fetchedAt ? new Date(prices.fetchedAt * 1000).toLocaleString("de-DE") : "unbekannt"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}