const items = [
  "Clínicas dentales",
  "Barberías",
  "Fisioterapia",
  "Centros de estética",
  "Psicología",
  "Veterinarias",
  "Peluquerías",
  "Nutrición",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center">
          <span
            className="whitespace-nowrap text-2xl font-medium lg:text-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </span>
          <span
            aria-hidden
            className="mx-8 h-2 w-2 shrink-0 rounded-full"
            style={{ background: "var(--accent-soft)" }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section
      className="border-y py-10"
      style={{ borderColor: "var(--border)" }}
      aria-label="Tipos de negocio"
    >
      <div
        className="marquee overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
