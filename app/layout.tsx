import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    locale: "es_EC",
    type: "website",
  },
};

function GoogleTagManager() {
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!tagManagerId || !/^GTM-[A-Z0-9]+$/.test(tagManagerId)) {
    return null;
  }

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          var firstScript = document.getElementsByTagName('script')[0];
          var tagManagerScript = document.createElement('script');
          tagManagerScript.async = true;
          tagManagerScript.src = 'https://www.googletagmanager.com/gtm.js?id=${tagManagerId}';
          firstScript.parentNode.insertBefore(tagManagerScript, firstScript);
        `}
      </Script>
    </>
  );
}

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
        {process.env.NEXT_PUBLIC_GTM_ID &&
          /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID) && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          )}
        {children}
        <Analytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
