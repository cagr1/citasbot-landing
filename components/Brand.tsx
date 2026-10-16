import Link from "next/link";

type BrandProps = {
  href?: string;
  size?: "sm" | "md";
};

const sizes = {
  sm: {
    text: "text-xl",
  },
  md: {
    text: "text-2xl",
  },
};

export default function Brand({ href = "/", size = "sm" }: BrandProps) {
  const current = sizes[size];

  return (
    <Link href={href} className="inline-flex items-center">
      <span
        className={`${current.text} font-semibold tracking-[-0.02em]`}
        style={{ color: "var(--text-primary)" }}
      >
        CitasBot<span style={{ color: "var(--accent-soft)" }}>.</span>
      </span>
    </Link>
  );
}
