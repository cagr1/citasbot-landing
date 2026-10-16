"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

// Envía a Vercel Analytics los clics en elementos con el atributo data-track.
// Props opcionales: data-track-location y data-track-plan.
export default function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el?.dataset.track) return;
      const props: Record<string, string> = {};
      if (el.dataset.trackLocation) props.location = el.dataset.trackLocation;
      if (el.dataset.trackPlan) props.plan = el.dataset.trackPlan;
      track(el.dataset.track, props);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
