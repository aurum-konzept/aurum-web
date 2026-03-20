import { NextResponse } from "next/server";

const BASE = "https://www.alphavantage.co/query";

const GOLD_SILVER_UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2 Stunden
const FX_UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 1 Tag

let cache: {
  goldUsd?: number;
  silverUsd?: number;
  usdEur?: number;
  lastGoldUpdate?: number;
  lastSilverUpdate?: number;
  lastFxUpdate?: number;
  fetchedAt?: number; // Sekunden-Timestamp
} = {};

let refreshInFlight: Promise<void> | null = null;

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API Fehler ${res.status} ${txt.slice(0, 200)}`);
  }

  return res.json();
}

async function getUsdEur(key: string): Promise<number> {
  const now = Date.now();

  if (
    typeof cache.usdEur === "number" &&
    cache.lastFxUpdate &&
    now - cache.lastFxUpdate < FX_UPDATE_INTERVAL
  ) {
    return cache.usdEur;
  }

  const url = `${BASE}?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${key}`;
  const data = await fetchJSON(url);

  const rate = Number(
    data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"]
  );

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("FX Kurs ungültig");
  }

  cache.usdEur = rate;
  cache.lastFxUpdate = now;

  return rate;
}

async function getGoldUsd(key: string): Promise<number> {
  const now = Date.now();

  if (
    typeof cache.goldUsd === "number" &&
    cache.lastGoldUpdate &&
    now - cache.lastGoldUpdate < GOLD_SILVER_UPDATE_INTERVAL
  ) {
    return cache.goldUsd;
  }

  const url = `${BASE}?function=GOLD_SILVER_SPOT&symbol=GOLD&apikey=${key}`;
  const data = await fetchJSON(url);

  const priceRaw = data?.price ?? data?.data?.price;
  const price = Number(priceRaw);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Goldpreis ungültig");
  }

  cache.goldUsd = price;
  cache.lastGoldUpdate = now;

  return price;
}

async function getSilverUsd(key: string): Promise<number> {
  const now = Date.now();

  if (
    typeof cache.silverUsd === "number" &&
    cache.lastSilverUpdate &&
    now - cache.lastSilverUpdate < GOLD_SILVER_UPDATE_INTERVAL
  ) {
    return cache.silverUsd;
  }

  const url = `${BASE}?function=GOLD_SILVER_SPOT&symbol=SILVER&apikey=${key}`;
  const data = await fetchJSON(url);

  const priceRaw = data?.price ?? data?.data?.price;
  const price = Number(priceRaw);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Silberpreis ungültig");
  }

  cache.silverUsd = price;
  cache.lastSilverUpdate = now;

  return price;
}

async function refreshAll() {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const key = process.env.ALPHAVANTAGE_KEY;
    if (!key) throw new Error("Kein API Key gesetzt");

    await Promise.all([
      getUsdEur(key),
      getGoldUsd(key),
      getSilverUsd(key),
    ]);

    cache.fetchedAt = Math.floor(Date.now() / 1000);
  })();

  try {
    await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

(async () => {
  try {
    await refreshAll();
  } catch {
    // Initialfehler ignorieren, GET behandelt den Fehlerfall
  }

  setInterval(() => {
    refreshAll().catch((e) => console.error("scheduled refresh error", e));
  }, GOLD_SILVER_UPDATE_INTERVAL);
})();

export async function GET() {
  try {
    await refreshAll();

    if (
      typeof cache.goldUsd !== "number" ||
      typeof cache.silverUsd !== "number" ||
      typeof cache.usdEur !== "number"
    ) {
      throw new Error("Keine vollständigen Preisdaten vorhanden");
    }

    const fetchedAt = cache.fetchedAt ?? Math.floor(Date.now() / 1000);

    const goldEurPerOz = cache.goldUsd * cache.usdEur;
    const silverEurPerOz = cache.silverUsd * cache.usdEur;

    return NextResponse.json({
      gold: {
        pricePerOz: goldEurPerOz,
        timestamp: fetchedAt,
      },
      silver: {
        pricePerOz: silverEurPerOz,
        timestamp: fetchedAt,
      },
      fetchedAt,
    });
  } catch (err: any) {
    console.error("/api/metals error:", err);

    const msg = err?.message ?? "Preis konnte nicht geladen werden";
    const body =
      process.env.NODE_ENV === "production"
        ? { error: "Preis konnte nicht geladen werden" }
        : { error: msg };

    return NextResponse.json(body, { status: 500 });
  }
}