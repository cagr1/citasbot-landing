import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Instrument_Sans } from "next/font/google";
import TrackClicks from "@/components/TrackClicks";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://citasbot.app"),
  title: "CitasBot - Gestion de citas por WhatsApp",
  description: "Automatiza tus citas y recordatorios por WhatsApp. Sin apps extra para tus clientes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CitasBot - Gestion de citas por WhatsApp",
    description: "Automatiza tus citas y recordatorios por WhatsApp. Sin apps extra para tus clientes.",
    url: "https://citasbot.app",
    siteName: "CitasBot",
    locale: "es_ES",
    alternateLocale: ["es_419"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={instrumentSans.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <TrackClicks />
      </body>
    </html>
  );
}
