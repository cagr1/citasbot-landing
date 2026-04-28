import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  href?: string;
  size?: "sm" | "md";
};

const sizes = {
  sm: {
    icon: "h-9 w-9",
    text: "text-xl",
  },
  md: {
    icon: "h-11 w-11",
    text: "text-2xl",
  },
};

export default function Brand({ href = "/", size = "sm" }: BrandProps) {
  const current = sizes[size];

  return (
    <Link href={href} className="inline-flex items-center gap-3">
      <Image
        src="/logo_citasBot.png"
        alt="CitasBot"
        width={44}
        height={44}
        priority
        className={`${current.icon} object-contain`}
      />
      <span
        className={`${current.text} font-extrabold tracking-[-0.04em] transition-colors`}
        style={{ color: "var(--text-primary)" }}
      >
        CitasBot
      </span>
    </Link>
  );
}
