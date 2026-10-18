"use client";

import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current === null) {
        frame.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full w-0 bg-accent transition-[width] duration-150 ease-out"
      />
    </div>
  );
};

export default ScrollProgress;
