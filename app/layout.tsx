import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Plus_Jakarta_Sans } from "next/font/google";
import TrackClicks from "@/components/TrackClicks";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="es" suppressHydrationWarning className={plusJakartaSans.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <TrackClicks />
      </body>
    </html>
  );
}
