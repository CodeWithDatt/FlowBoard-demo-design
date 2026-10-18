"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Dashboard and workspace screens use native scrolling.
    // Lenis is intentionally disabled there so nested sidebars and
    // application panels can scroll independently.
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/workspace")) {
      return;
    }
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
    // Re-run on every route change: without `pathname` here, this effect
    // only ever runs once for the life of the tab (this provider lives in
    // the root layout and never remounts), so a Lenis instance created on
    // "/" would keep hijacking scroll after navigating into "/dashboard".
  }, [pathname]);

  return <>{children}</>;
}
