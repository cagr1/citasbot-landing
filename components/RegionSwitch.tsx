"use client";

import { useRouter } from "next/navigation";
import type { Region } from "@/lib/region";

export default function RegionLink({ region }: { region: Region }) {
  const router = useRouter();

  function choose() {
    const value = region === "eu" ? "latam" : "eu";
    document.cookie = `cb_region=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={choose}
      className="underline-offset-2 hover:underline"
    >
      {region === "eu" ? "¿Fuera de Europa? Ver precios en USD" : "¿Estás en Europa? Ver precios en €"}
    </button>
  );
}
