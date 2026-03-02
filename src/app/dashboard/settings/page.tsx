import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Einstellungen</h1>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8">
        <h2 className="text-xl font-semibold">Profil</h2>
        <p className="mt-2 text-neutral-300">
          Hier werden später Profildaten und Sicherheitseinstellungen verfügbar sein (z.B. Passwort ändern).
        </p>
      </div>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-8 opacity-80">
        <h2 className="text-xl font-semibold">Sicherheit (Coming soon)</h2>
        <p className="mt-2 text-neutral-300">
          Passwort ändern, 2FA und weitere Optionen folgen.
        </p>
      </div>
    </main>
  );
}