import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Contact />
      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
