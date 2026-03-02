import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aurum-Konzept | Edelmetallverwahrer & Vermittler",
  description:
    "Aurum-Konzept bietet sichere Edelmetallverwahrung, transparente Prozesse und perspektivische Vermittlungslösungen.",
  icons: {
    icon: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${playfair.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0e0c0a] text-neutral-50`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
