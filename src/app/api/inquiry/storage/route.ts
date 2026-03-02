import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, note, items, interestFuture } = body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Keine Edelmetalle übermittelt." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: (process.env.SMTP_SECURE || "false") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const lines = items.map((i: any) => `- ${i.metal}: ${i.amount} ${i.unit}`).join("\n");

    const text =
`Neue Verwahr-Anfrage (Dashboard)

Name: ${fullName || "-"}
Telefon: ${phone || "-"}
Notiz: ${note || "-"}
Interesse (Zukunft: Kaufen/Verwahren/Vermögensnutzung): ${interestFuture ? "Ja" : "Nein"}
Edelmetalle:
${lines}
`;

    await transporter.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: "Aurum Dashboard: Neue Verwahr-Anfrage",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Serverfehler beim Senden." }, { status: 500 });
  }
}