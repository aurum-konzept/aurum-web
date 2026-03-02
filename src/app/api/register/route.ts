import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const cleanEmail = String(email || "").toLowerCase().trim();
    const cleanPassword = String(password || "");

    if (!cleanEmail || cleanPassword.length < 8) {
      return NextResponse.json(
        { error: "Bitte gültige E-Mail und ein Passwort (mind. 8 Zeichen) eingeben." },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (exists) {
      return NextResponse.json({ error: "Diese E-Mail ist bereits registriert." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(cleanPassword, 12);

    await prisma.user.create({
      data: { email: cleanEmail, passwordHash, name: name ? String(name).trim() : null },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Registrierung fehlgeschlagen." }, { status: 500 });
  }
}