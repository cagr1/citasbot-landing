export default function CTABanner() {
  return (
    <section
      className="px-6 py-24 lg:px-8 lg:py-32"
      style={{ background: "#111218" }}
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Empieza hoy
        </p>

        <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
          Tu agenda llena.{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            Sin llamadas. Sin mensajes manuales.
          </span>
        </h2>

        <p
          className="mt-5 max-w-lg text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Conecta CitasBot a tu negocio esta semana y deja que tus clientes agenden
          solos desde WhatsApp — el canal que ya usan todos los días.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#precios"
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Empezar gratis
          </a>
          <a
            href="#precios"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Ver planes
          </a>
        </div>

        <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Sin tarjeta de crédito&ensp;·&ensp;Plan gratis disponible&ensp;·&ensp;Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}
