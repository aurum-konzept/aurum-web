"use client";

import AuthHeader from "@/components/auth/AuthHeader";
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
    <>
      <AuthHeader />

      <main className="min-h-screen px-4 pb-12 pt-10 text-neutral-50 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
          <section
            aria-labelledby="auth-title"
            className="w-full rounded-3xl border border-neutral-800 bg-neutral-950/70 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            {/* Tabs */}
            <div className="mb-6 flex overflow-hidden rounded-full border border-neutral-800 sm:mb-8">
              <button
                type="button"
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
                type="button"
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
            <h1
              id="auth-title"
              className="mb-2 text-center text-xl font-semibold sm:text-2xl"
            >
              {mode === "login"
                ? "Willkommen zurück"
                : "Erstellen Sie Ihr Konto"}
            </h1>

            <p className="mb-6 text-center text-sm text-neutral-400 sm:mb-7">
              {mode === "login"
                ? "Melden Sie sich an, um Ihr Dashboard zu öffnen."
                : "Registrieren Sie sich, um Ihren Aurum-Zugang einzurichten."}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm transition focus:border-amber-400/50 focus:outline-none"
                />
              )}

              <input
                type="email"
                placeholder="E-Mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm transition focus:border-amber-400/50 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Passwort"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm transition focus:border-amber-400/50 focus:outline-none"
              />

              {error && (
                <div className="text-center text-sm text-red-400">{error}</div>
              )}

              <button
                disabled={loading}
                className="w-full rounded-xl border border-amber-400/40 bg-amber-400/10 py-3 text-sm text-amber-200 transition hover:bg-amber-400/20 disabled:opacity-50"
              >
                {loading
                  ? "Bitte warten..."
                  : mode === "login"
                  ? "Einloggen"
                  : "Account erstellen"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}