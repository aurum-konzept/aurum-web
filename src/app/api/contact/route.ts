import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // Honeypot gegen Bots (muss im Frontend als verstecktes Feld existieren)
    const company = String(body?.company ?? "").trim();
    if (company) {
      return NextResponse.json({ ok: true }); // Bots "erfolgreich" beantworten
    }

    // Basic Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Bitte Namen angeben." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Bitte gültige E-Mail angeben." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "Bitte Nachricht (mind. 10 Zeichen) angeben." }, { status: 400 });
    }

    // SMTP Config aus ENV
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const to = process.env.CONTACT_TO; // eure Aurum Empfängeradresse
    const from = process.env.CONTACT_FROM || user; // Absender (z.B. info@...)
    const secure = String(process.env.SMTP_SECURE || "false") === "true";

    if (!host || !user || !pass || !to) {
      return NextResponse.json(
        { ok: false, error: "Server-Mail-Konfiguration fehlt (ENV)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true bei 465, sonst false
      auth: { user, pass },
    });

    const subject = `Aurum Kontaktanfrage von ${name}`;
    const text = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : `Telefon: (nicht angegeben)`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: from!,
      to,
      subject,
      text,
      replyTo: email, // Antworten gehen direkt an den Absender
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 500 }
    );
  }
}