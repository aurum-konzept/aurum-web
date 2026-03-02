"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registrierung fehlgeschlagen.");
        return;
      }

      // Direkt einloggen nach Registrierung
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (login?.ok) router.push("/dashboard");
    } catch {
      setError("Unerwarteter Fehler.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("E-Mail oder Passwort falsch.");
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "login") await handleLogin();
    else await handleRegister();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl p-8 shadow-2xl">

          {/* Tabs */}
          <div className="flex mb-8 rounded-full border border-neutral-800 overflow-hidden">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm transition ${
                mode === "login"
                  ? "bg-amber-400/10 text-amber-300"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm transition ${
                mode === "register"
                  ? "bg-amber-400/10 text-amber-300"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Registrieren
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {mode === "login"
              ? "Willkommen zurück"
              : "Erstellen Sie Ihr Konto"}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === "register" && (
              <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition"
              />
            )}

            <input
              type="email"
              placeholder="E-Mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition"
            />

            <input
              type="password"
              placeholder="Passwort"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition"
            />

            {error && (
              <div className="text-sm text-red-400 text-center">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-amber-400/10 border border-amber-400/40 py-3 text-sm text-amber-200 hover:bg-amber-400/20 transition disabled:opacity-50"
            >
              {loading
                ? "Bitte warten..."
                : mode === "login"
                ? "Einloggen"
                : "Account erstellen"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}