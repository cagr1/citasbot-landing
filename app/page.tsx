import { cookies, headers } from "next/headers";

import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { REGION_COOKIE, resolveRegion } from "@/lib/region";

export default async function Home() {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const region = resolveRegion({
    cookie: cookieStore.get(REGION_COOKIE)?.value,
    country: headerStore.get("x-vercel-ip-country"),
    acceptLanguage: headerStore.get("accept-language"),
  });

  return (
    <main style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navbar region={region} />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing region={region} />
      <Contact region={region} />
      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
