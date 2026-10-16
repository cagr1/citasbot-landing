"use client";

import { useRouter } from "next/navigation";
import type { Region } from "@/lib/region";

const options: { value: Region; label: string }[] = [
  { value: "eu", label: "España / Europa (€)" },
  { value: "latam", label: "Latinoamérica (US$)" },
];

export default function RegionSwitch({
  region,
  dark = false,
}: {
  region: Region;
  dark?: boolean;
}) {
  const router = useRouter();

  function choose(value: Region) {
    if (value === region) return;
    document.cookie = `cb_region=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      role="group"
      aria-label="Región y moneda"
      className="inline-flex rounded-full p-0.5 text-xs font-medium"
      style={{
        border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "var(--border-strong)"}`,
      }}
    >
      {options.map((o) => {
        const active = o.value === region;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => choose(o.value)}
            className="rounded-full px-3 py-1 transition-colors"
            style={{
              background: active
                ? dark
                  ? "rgba(255,255,255,0.12)"
                  : "var(--bg-subtle)"
                : "transparent",
              color: active
                ? dark
                  ? "#fff"
                  : "var(--text-primary)"
                : dark
                  ? "rgba(255,255,255,0.45)"
                  : "var(--text-muted)",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
