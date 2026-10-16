import Link from "next/link";

type BrandProps = {
  href?: string;
  size?: "sm" | "md";
};

const sizes = {
  sm: {
    icon: 28,
    text: "text-xl",
  },
  md: {
    icon: 34,
    text: "text-2xl",
  },
};

export default function Brand({ href = "/", size = "sm" }: BrandProps) {
  const current = sizes[size];

  return (
    <Link href={href} aria-label="CitasBot, inicio" className="inline-flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático */}
      <img
        src="/citasbot-simbolo.svg"
        alt=""
        aria-hidden
        width={current.icon}
        height={current.icon}
      />
      <span
        className={`${current.text} font-semibold tracking-[-0.02em]`}
        style={{ color: "var(--text-primary)" }}
      >
        CitasBot
      </span>
    </Link>
  );
}
