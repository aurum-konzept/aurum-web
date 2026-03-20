"use client";

import { useState } from "react";

type Metal = "Silber" | "Gold";
type Unit = "g" | "kg" | "oz";

type Item = {
  metal: Metal;
  amount: string;
  unit: Unit;
};

const metalOptions: Metal[] = ["Silber", "Gold"];
const unitOptions: Unit[] = ["g", "kg", "oz"];

export default function StorageInquiryForm() {
  const [items, setItems] = useState<Item[]>([
    { metal: "Silber", amount: "", unit: "g" },
  ]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [interestFuture, setInterestFuture] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function updateItem(index: number, patch: Partial<Item>) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, ...patch } : it))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { metal: "Gold", amount: "", unit: "g" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const cleaned = items
      .map((it) => ({
        ...it,
        amountNum: Number(String(it.amount).replace(",", ".")),
      }))
      .filter((it) => Number.isFinite(it.amountNum) && it.amountNum > 0);

    if (cleaned.length === 0) {
      setMsg("Bitte mindestens ein Edelmetall mit einer gültigen Menge eintragen.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiry/storage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          note,
          interestFuture,
          items: cleaned.map(({ metal, unit, amountNum }) => ({
            metal,
            unit,
            amount: amountNum,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error ?? "Senden fehlgeschlagen.");
        return;
      }

      setMsg("Vielen Dank! Wir melden uns zeitnah mit einem Angebot.");

      setItems([{ metal: "Silber", amount: "", unit: "g" }]);
      setFullName("");
      setPhone("");
      setNote("");
      setInterestFuture(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 sm:space-y-5">

      {/* Name + Phone */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">Name (optional)</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
            placeholder="Vor- und Nachname"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Telefon (optional)</label>
          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^\d+ ]/g, ""))
            }
            className="mt-1 w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
            placeholder="+49 ..."
          />
        </div>
      </div>

      {/* Edelmetalle */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4">
        <p className="text-sm text-neutral-300 mb-3">Edelmetalle</p>

        <div className="space-y-3">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="grid gap-3 md:grid-cols-12 items-center"
            >
              <div className="md:col-span-4">
                <select
                  value={it.metal}
                  onChange={(e) =>
                    updateItem(idx, { metal: e.target.value as Metal })
                  }
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
                >
                  {metalOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5">
                <input
                  value={it.amount}
                  onChange={(e) =>
                    updateItem(idx, { amount: e.target.value })
                  }
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
                  placeholder="Menge (z.B. 1000)"
                  inputMode="decimal"
                />
              </div>

              <div className="flex gap-2 md:col-span-3">
                <select
                  value={it.unit}
                  onChange={(e) =>
                    updateItem(idx, { unit: e.target.value as Unit })
                  }
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
                >
                  {unitOptions.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 hover:text-red-300"
                    title="Entfernen"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200 hover:bg-amber-400/20 transition"
        >
          + Weiteres Edelmetall hinzufügen
        </button>
      </div>

      {/* Future Interest */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={interestFuture}
            onChange={(e) => setInterestFuture(e.target.checked)}
            className="mt-1 h-4 w-4 accent-amber-400"
          />

          <span className="text-sm text-neutral-300 leading-relaxed">
            In Zukunft Edelmetalle kaufen und direkt bei{" "}
            <span className="text-amber-200">Aurum</span> verwahren und Ihr
            Vermögen nutzen – statt verkaufen?
            <span className="block mt-1 text-xs text-neutral-400">
              (Wir informieren Sie, sobald diese Funktionen verfügbar sind.)
            </span>
          </span>
        </label>
      </div>

      {/* Note */}
      <div>
        <label className="text-sm text-neutral-300">Hinweis (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full min-h-[110px] rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50"
          placeholder="z.B. Verpackung, Abholung, gewünschte Laufzeit ..."
        />
      </div>

      {msg && <p className="text-sm text-neutral-200">{msg}</p>}

      <button
        disabled={loading}
        className="w-full rounded-xl border border-amber-400/40 bg-amber-400/10 py-3 text-sm text-amber-200 hover:bg-amber-400/20 transition disabled:opacity-50"
      >
        {loading ? "Sende..." : "Anfrage senden"}
      </button>
    </form>
  );
}