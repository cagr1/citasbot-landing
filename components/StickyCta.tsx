"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { useEffect, useState } from "react";

export default function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting));
      o.observe(hero);
      observers.push(o);
    }
    if (contact) {
      const o = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting));
      o.observe(contact);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = heroGone && !contactVisible;

  return (
    <LazyMotion features={domAnimation}>
      <div className="pointer-events-none fixed bottom-6 left-4 right-20 z-40 md:left-1/2 md:right-auto md:-translate-x-1/2">
        <AnimatePresence>
          {show && (
            <m.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="pointer-events-auto flex items-center justify-end gap-4 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-white md:justify-start"
            >
              <span className="hidden whitespace-nowrap text-sm md:inline">
                ¿Lo vemos en tu negocio?
              </span>
              <a
                href="#contacto"
                data-track="demo_click"
                data-track-location="sticky"
                className="w-full whitespace-nowrap rounded-full bg-accent px-4 py-2 text-center text-sm font-medium hover:bg-accent-hover md:w-auto"
              >
                Solicitar demo
              </a>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
