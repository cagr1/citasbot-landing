import Brand from "@/components/Brand";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#precios", label: "Precios" },
];

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-10 lg:px-8"
      style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Brand />

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © 2025 CitasBot
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
          <div style={{ color: "var(--text-muted)" }}>Política de privacidad · Términos de servicio</div>
          <a
            href="https://www.carlosgallardo.dev/"
            target="_blank"
            rel="noreferrer"
            className="font-medium transition-colors hover:text-brand-from"
            style={{ color: "var(--text-secondary)" }}
          >
            Propiedad de Carlos Gallardo
          </a>
        </div>
      </div>
    </footer>
  );
}
