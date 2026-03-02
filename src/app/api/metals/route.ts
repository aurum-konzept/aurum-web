import { NextResponse } from "next/server";

const BASE = "https://www.alphavantage.co/query";

const GOLD_SILVER_UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2 Stunden
const FX_UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 1 Tag

let cache: {
  gold?: number;
  silver?: number;
  usdEur?: number;
  lastMetalUpdate?: number;
  lastFxUpdate?: number;
  // fetchedAt stores last refresh timestamp (seconds)
  fetchedAt?: number;
} = {};

// promise to coalesce concurrent refreshes
let refreshInFlight: Promise<void> | null = null;

async function refreshAll() {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    const key = process.env.ALPHAVANTAGE_KEY;
    if (!key) throw new Error("Kein API Key gesetzt");

    // ensure we have a fresh FX rate first
    const usdEur = await getUsdEur(key);
    const goldUsd = await getMetalPrice("GOLD", key);
    const silverUsd = await getMetalPrice("SILVER", key);

    cache.gold = goldUsd * usdEur;
    cache.silver = silverUsd * usdEur;
    cache.usdEur = usdEur;
    const nowSec = Math.floor(Date.now() / 1000);
    cache.fetchedAt = nowSec;
    cache.lastMetalUpdate = Date.now();
  })();
  try {
    await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
  return;
}

// initial background refresh + schedule
(async () => {
  try {
    await refreshAll();
  } catch {
    // ignore; GET will handle if requests come in
  }
  setInterval(() => {
    refreshAll().catch((e) => console.error("scheduled refresh error", e));
  }, GOLD_SILVER_UPDATE_INTERVAL);
})();

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`API Fehler ${res.status} ${txt.slice(0,200)}`);
    }
  return res.json();
}

async function getUsdEur(key: string) {
  const now = Date.now();

  if (
    cache.usdEur &&
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

  if (!rate) throw new Error("FX Kurs ungültig");

  cache.usdEur = rate;
  cache.lastFxUpdate = now;

  return rate;
}

async function getMetalPrice(symbol: "GOLD" | "SILVER", key: string): Promise<number> {
  const now = Date.now();

  const cacheKey = symbol === "GOLD" ? "gold" : "silver";

  const cached = cache[cacheKey];
  if (
    typeof cached === "number" &&
    cache.lastMetalUpdate &&
    now - cache.lastMetalUpdate < GOLD_SILVER_UPDATE_INTERVAL
  ) {
    return cached;
  }

  const url = `${BASE}?function=GOLD_SILVER_SPOT&symbol=${symbol}&apikey=${key}`;
  const data = await fetchJSON(url);

  const priceRaw = data?.price ?? data?.data?.price;
  const price = Number(priceRaw);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Metallpreis ungültig");
  }

  cache[cacheKey] = price;
  cache.lastMetalUpdate = now;

  return price;
}

export async function GET() {
  try {
    const now = Date.now();
    if (
      typeof cache.gold === "number" &&
      typeof cache.silver === "number" &&
      cache.lastMetalUpdate &&
      now - cache.lastMetalUpdate < GOLD_SILVER_UPDATE_INTERVAL
    ) {
      const fetchedAt = cache.fetchedAt ?? Math.floor(cache.lastMetalUpdate / 1000);
      return NextResponse.json({
        gold: { pricePerOz: cache.gold, timestamp: fetchedAt },
        silver: { pricePerOz: cache.silver, timestamp: fetchedAt },
        fetchedAt,
      });
    }

    await refreshAll();
    if (typeof cache.gold !== "number" || typeof cache.silver !== "number") {
      throw new Error("Keine Preisdaten nach Refresh");
    }
    const fetchedAt = cache.fetchedAt ?? Math.floor(Date.now() / 1000);
    return NextResponse.json({
      gold: { pricePerOz: cache.gold, timestamp: fetchedAt },
      silver: { pricePerOz: cache.silver, timestamp: fetchedAt },
      fetchedAt,
    });
  } catch (err: any) {
    console.error("/api/metals error:", err);
    const msg = err?.message ?? "Preis konnte nicht geladen werden";
    const body = process.env.NODE_ENV === "production" ? { error: "Preis konnte nicht geladen werden" } : { error: msg };
    return NextResponse.json(body, { status: 500 });
  }
}