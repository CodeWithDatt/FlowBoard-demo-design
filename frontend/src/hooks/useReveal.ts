"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/**
 * Animates every element carrying `data-reveal` inside `scope` with a
 * single restrained fade + rise, once, the first time it enters the
 * viewport. Intentionally the *only* scroll animation primitive used
 * across the landing page, so motion stays consistent instead of every
 * section inventing its own entrance.
 */
export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      if (!registered) {
        gsap.registerPlugin(ScrollTrigger);
        registered = true;
      }

      if (!scope.current) return;

      const targets = scope.current.querySelectorAll<HTMLElement>(
        "[data-reveal]",
      );
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { autoAlpha: 0, y: 18 });

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return scope;
}
